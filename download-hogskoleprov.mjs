#!/usr/bin/env node
// download-hogskoleprov.mjs
//
// Laddar ner de tio senaste högskoleproven (provhäften + facit) från den
// officiella källan studera.nu (Universitets- och högskolerådet, UHR).
//
// Varje prov består av fyra rättade provpass (två kvantitativa + två verbala)
// samt ett facit. Det femte, oredovisade utprövningspasset publiceras inte.
// De verbala passen publiceras "utan ELF" (utan den engelska läsdelen) av
// upphovsrättsskäl. Filnamnen varierar mellan proven, så skriptet provar en
// uppsättning kända namnvarianter och sparar de som faktiskt finns.
//
// Användning:
//   node download-hogskoleprov.mjs                 # alla tio proven -> ./hogskoleprov
//   node download-hogskoleprov.mjs --count 4       # bara de fyra senaste
//   node download-hogskoleprov.mjs --out ./prov    # annan målmapp
//
// Kräver Node 18+ (använder inbyggda fetch, inga npm-beroenden).

import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

// De tio senaste högskoleproven, nyast först. Mappdatumen är verifierade mot
// studera.nu:s publicerade PDF-adresser. Termkod: a = vår, b = höst.
// Våren 2022 gavs vid två tillfällen (12 mars = a1, 7 maj = a2), därav idx.
const EXAMS = [
  { date: '2026-04-18', label: 'var-2026',       yy: '26', term: 'a', idx: ''  },
  { date: '2025-10-19', label: 'host-2025',      yy: '25', term: 'b', idx: ''  },
  { date: '2025-04-05', label: 'var-2025',       yy: '25', term: 'a', idx: ''  },
  { date: '2024-10-20', label: 'host-2024',      yy: '24', term: 'b', idx: ''  },
  { date: '2024-04-13', label: 'var-2024',       yy: '24', term: 'a', idx: ''  },
  { date: '2023-10-22', label: 'host-2023',      yy: '23', term: 'b', idx: ''  },
  { date: '2023-03-25', label: 'var-2023',       yy: '23', term: 'a', idx: ''  },
  { date: '2022-10-23', label: 'host-2022',      yy: '22', term: 'b', idx: ''  },
  { date: '2022-05-07', label: 'var-2022-extra', yy: '22', term: 'a', idx: '2' },
  { date: '2022-03-12', label: 'var-2022',       yy: '22', term: 'a', idx: '1' },
];

const ROOT = 'https://www.studera.nu/globalassets';
// Proven ligger under en av dessa två basmappar beroende på ålder.
const BASES = ['05-hogskoleprovet', 'hogskoleprovet'];
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36';
const CONCURRENCY = 6;
const TIMEOUT_MS = 60_000;

function parseArgs(argv) {
  const opts = { count: EXAMS.length, out: 'hogskoleprov' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--count' || a === '-n') opts.count = Number(argv[++i]);
    else if (a === '--out' || a === '-o') opts.out = argv[++i];
    else if (a === '--help' || a === '-h') opts.help = true;
    else { console.error(`Okänt argument: ${a}`); opts.help = true; }
  }
  if (!Number.isInteger(opts.count) || opts.count < 1 || opts.count > EXAMS.length) {
    console.error(`--count måste vara 1..${EXAMS.length}`);
    opts.help = true;
  }
  return opts;
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

// Hämtar en URL och returnerar { ok, buf } endast om svaret är en riktig PDF.
// Sidor som svarar 200 med en HTML-felsida sorteras bort via PDF-magin "%PDF-".
async function get(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': UA, Accept: 'application/pdf,*/*' },
    });
    if (!res.ok) return { ok: false, status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return { ok: false, status: res.status, notPdf: true };
    }
    return { ok: true, buf };
  } catch (err) {
    return { ok: false, error: err.name === 'AbortError' ? 'timeout' : err.message };
  } finally {
    clearTimeout(timer);
  }
}

// Provpass: exakt ett publicerat pass per passnummer. Prova suffixen i tur och
// ordning över båda basmapparna och behåll det första som finns.
function passCandidates(folder, n) {
  const suffixes = ['kvant', 'verb-utan-elf', 'verb', 'kvant-utan-elf'];
  const urls = [];
  for (const s of suffixes)
    for (const base of BASES)
      urls.push(`${ROOT}/${base}/${folder}/provpass-${n}-${s}.pdf`);
  return urls;
}

// Facit: filnamnen har varierat kraftigt mellan åren (hp-25b.pdf,
// hogskoleprovet-facit-24b.pdf, hogskoleprovet-facit-21-b.pdf, ...-22a1.pdf).
function facitCandidates(folder, { yy, term, idx }) {
  const codes = new Set([`${yy}${term}`, `${yy}-${term}`]);
  if (idx) {
    codes.add(`${yy}${term}${idx}`);
    codes.add(`${yy}-${term}${idx}`);
    codes.add(`${yy}${term}-${idx}`);
  }
  const names = ['facit.pdf'];
  for (const c of codes) {
    names.push(`hp-${c}.pdf`, `hogskoleprovet-facit-${c}.pdf`, `facit-${c}.pdf`);
  }
  const urls = [];
  for (const name of names)
    for (const base of BASES)
      urls.push(`${ROOT}/${base}/${folder}/${name}`);
  return urls;
}

// Kör asynkrona jobb med begränsad samtidighet.
async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  const runner = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i], i);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, runner)
  );
  return results;
}

// Löser ett "slot" (en logisk fil) genom att prova dess kandidat-URL:er i
// ordning. Redan nedladdade filer hoppas över så att skriptet är återupptagbart.
async function resolveSlot(slot) {
  for (const url of slot.candidates) {
    const dest = join(slot.dir, url.split('/').pop());
    if (await exists(dest)) {
      return { ...slot, name: dest, skipped: true };
    }
  }
  for (const url of slot.candidates) {
    const r = await get(url);
    if (r.ok) {
      await mkdir(slot.dir, { recursive: true });
      const name = url.split('/').pop();
      await writeFile(join(slot.dir, name), r.buf);
      return { ...slot, name, url, bytes: r.buf.length };
    }
  }
  return { ...slot, missing: true };
}

function humanSize(bytes) {
  if (bytes >= 1 << 20) return `${(bytes / (1 << 20)).toFixed(1)} MB`;
  if (bytes >= 1 << 10) return `${(bytes / (1 << 10)).toFixed(0)} kB`;
  return `${bytes} B`;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(`Laddar ner de senaste högskoleproven från studera.nu.

  node download-hogskoleprov.mjs [--count N] [--out DIR]

  --count, -n   Antal prov att hämta (1..${EXAMS.length}), nyast först. Standard: ${EXAMS.length}.
  --out,   -o   Målmapp. Standard: hogskoleprov`);
    return;
  }

  const exams = EXAMS.slice(0, opts.count);
  console.log(`Laddar ner ${exams.length} senaste högskoleproven till ./${opts.out}\n`);

  // Bygg en slot per fil: provpass 1-5 + facit för varje prov.
  const slots = [];
  for (const ex of exams) {
    const folder = `hp-${ex.date}`;
    const dir = join(opts.out, `${ex.date}_${ex.label}`);
    for (let n = 1; n <= 5; n++) {
      slots.push({ ex, dir, kind: `provpass ${n}`, candidates: passCandidates(folder, n) });
    }
    slots.push({ ex, dir, kind: 'facit', candidates: facitCandidates(folder, ex) });
  }
  // Det generiska svarshäftet ligger direkt under basmappen (delas av alla prov).
  slots.push({
    ex: null,
    dir: opts.out,
    kind: 'svarshäfte',
    candidates: BASES.map((b) => `${ROOT}/${b}/hp-svarshafte.pdf`),
  });

  const results = await pool(slots, resolveSlot, CONCURRENCY);

  // Sammanfattning per prov.
  let files = 0;
  let bytes = 0;
  for (const ex of exams) {
    const rows = results.filter((r) => r.ex === ex);
    const got = rows.filter((r) => !r.missing);
    const passes = got.filter((r) => r.kind.startsWith('provpass')).length;
    const facit = got.some((r) => r.kind === 'facit');
    const flag = passes >= 4 && facit ? '✓' : '!';
    console.log(`${flag} ${ex.date} (${ex.label}): ${passes} provpass, facit: ${facit ? 'ja' : 'NEJ'}`);
    for (const r of got) {
      const tag = r.skipped ? '(finns)' : humanSize(r.bytes);
      console.log(`    ${String(r.name).split('/').pop()}  ${tag}`);
      if (!r.skipped) { files++; bytes += r.bytes; }
    }
  }
  const sheet = results.find((r) => r.kind === 'svarshäfte');
  if (sheet && !sheet.missing) console.log(`\nsvarshäfte: ${sheet.name}`);

  console.log(`\nKlart: ${files} nya filer (${humanSize(bytes)}) i ./${opts.out}`);
  const incomplete = exams.filter((ex) => {
    const got = results.filter((r) => r.ex === ex && !r.missing);
    return got.filter((r) => r.kind.startsWith('provpass')).length < 4
      || !got.some((r) => r.kind === 'facit');
  });
  if (incomplete.length) {
    console.log(`\nOfullständiga prov (kontrollera filnamn på studera.nu): ` +
      incomplete.map((e) => e.date).join(', '));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
