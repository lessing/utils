# utils

Diverse småverktyg.

## download-hogskoleprov.mjs

Laddar ner **de tio senaste högskoleproven** (provhäften + facit) från den
officiella källan [studera.nu](https://www.studera.nu/) (Universitets- och
högskolerådet, UHR).

```bash
node download-hogskoleprov.mjs            # alla tio proven -> ./hogskoleprov
node download-hogskoleprov.mjs --count 4  # bara de fyra senaste
node download-hogskoleprov.mjs --out ./prov
# eller:
npm run download-hp
```

Kräver Node 18+ (inbyggda `fetch`, inga npm-beroenden). Redan nedladdade filer
hoppas över, så skriptet kan köras om för att fortsätta en avbruten nedladdning.

### Vad som hämtas

De tio senaste proven, nyast först:

| # | Datum | Prov |
|---|-------|------|
| 1 | 2026-04-18 | Vår 2026 |
| 2 | 2025-10-19 | Höst 2025 |
| 3 | 2025-04-05 | Vår 2025 |
| 4 | 2024-10-20 | Höst 2024 |
| 5 | 2024-04-13 | Vår 2024 |
| 6 | 2023-10-22 | Höst 2023 |
| 7 | 2023-03-25 | Vår 2023 |
| 8 | 2022-10-23 | Höst 2022 |
| 9 | 2022-05-07 | Vår 2022 (extra provtillfälle) |
| 10 | 2022-03-12 | Vår 2022 |

Våren 2022 gavs vid två tillfällen, som här räknas som två separata prov. Vill
man i stället ha ett prov per termin räcker det att justera `EXAMS`-listan högst
upp i skriptet.

För varje prov hämtas de fyra rättade provpassen (två kvantitativa + två
verbala) samt facit. Det femte, oredovisade utprövningspasset publiceras inte,
och de verbala passen publiceras "utan ELF" (utan den engelska läsdelen) av
upphovsrättsskäl.

### Nätverkskrav (Claude Code på webben)

Skriptet hämtar från `www.studera.nu`. I en fjärrmiljö med begränsad utgående
nätverkspolicy måste den värden läggas till i miljöns **egress-allowlist**
innan nedladdningen fungerar (annars svarar proxyn `403 host_not_allowed`).
Kört lokalt fungerar det direkt. Se
<https://code.claude.com/docs/en/claude-code-on-the-web> om nätverkspolicyer.
