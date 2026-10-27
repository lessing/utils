# My Home: a custom LG TV home screen

A webOS app that shows a big clock, a time-of-day sky, and rows of your apps and inputs. Use the remote's arrows and OK to move around (the Magic Remote pointer works too). After 2 idle minutes it fades to an ambient clock that drifts slowly, which is easier on OLED panels.

LG doesn't let third-party apps take over the Home button. Pin **My Home** to the front of the app row (**Home → Edit App List**) so it's one press away.

## Preview on your computer

Open `app/index.html` in a browser. Use the arrow keys and Enter.
Add `?hour=7` (or 13, 20, 23) to the URL to preview the dawn, day, dusk or night sky.

## Make it yours

Everything you're likely to change is in the `CONFIG` block at the top of the script in `app/index.html`:

- **name**: adds your name to the greeting
- **clock24h**: `false` for a 12-hour clock
- **rows**: the apps and inputs. Each tile needs a `name`, a webOS app `id` and either a `color` (apps) or an `icon` (`tv`, `hdmi`, `globe`, `sliders`).

If a tile says "Couldn't open", that app probably has a different ID on your TV, or it isn't installed.

## Put it on the TV (one-time setup)

1. Create a free account at [webostv.developer.lge.com](https://webostv.developer.lge.com).
2. On the TV, install **Developer Mode** from the LG Content Store. Open it, sign in, and turn on **Dev Mode Status** (the TV restarts). Then open the app again and turn on **Key Server**.
3. On your computer (on the same Wi-Fi as the TV), from the repo root, run:
   ```sh
   npm run tv:setup
   ```
   Choose **add** and name the device `tv`. Use the IP address shown in the Developer Mode app, port `9922` and user `prisoner`. When asked, enter the passphrase shown in the Developer Mode app.

## Deploy (every time you change something)

```sh
npm run tv:deploy
```

This packages `app/` into `dist/*.ipk`, installs it on the TV, and opens it.

Developer Mode sessions expire after a while, and apps installed through it are removed when that happens. Open the Developer Mode app now and then and press **Extend**.
