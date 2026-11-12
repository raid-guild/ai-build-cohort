# RaidGuild AI Build Cohort

A single-page introduction to RaidGuild's guided applied-AI build cohort. The page is statically exported with Next.js and served by a small Node process that also accepts intro requests. It uses the Louchi brand system from the local RaidGuild brand Storybook, vendored as a package archive for repeatable builds.

## Run locally

Use Node 22.

```sh
npm ci
npm run build
PORT=8080 npm start
```

Open `http://localhost:8080`. The page works without email configuration; form submissions need the environment variables below.

## Inquiry email

Copy `.env.example` values to your deployment environment. `SENDGRID_API_KEY` is required. `SENDGRID_FROM_EMAIL` must be a verified SendGrid sender; `SENDGRID_TO_EMAILS` is a comma-separated recipient list. The default sender and recipient are `clerics@raidguild.org`. The key stays on the server and is never included in the static export.

The form asks for an intro call. A successful submission means SendGrid accepted the message; RaidGuild follows up to schedule. Failed delivery gives the visitor the direct contact address. The endpoint limits request size and rate and includes a honeypot field.

## Brand source

`vendor/raidguild-brand-system-0.1.0.tgz` was built from the `feat/versioned-brand-reigns` branch at `~/Projects/raidguild/brand/brand`, commit `0ba4c878064f06bfaeb37161e6c47f27d6327c01`. The source brand instructions are copied to `RG_BRAND_AGENTS.md`. The site imports package tokens, fonts, theme provider, buttons and form fields. The package keeps Afacad Flux as its open fallback; this landing page supplies the authoritative Last Duel Bold Extended and Bold Extended Retalic cuts locally for its headings. The owner confirmed rights to publish these files in public repositories in the website branch’s November 4 STATUS record.

The applied-AI spear illustration, landscape image, and swords marks were copied from that brand checkout. The landscape was converted to a smaller WebP social preview. The 46-second video at `public/video/october-cohort-recap.mp4` is the user-supplied `/home/dekanjbrown/Downloads/october-cohort-recap.mp4` (updated November 12, 2026), preserved without re-encoding. `public/images/october-cohort-recap-poster.jpg` is its opening title frame extracted at 2 seconds with FFmpeg. Open font licences are retained under `public/fonts/`; `UbuntuMono-UFL.txt` is the Ubuntu Font Licence applicable to the included Ubuntu family files.

This deployment is intended for Railway's public HTTP ingress. Set `TRUST_RAILWAY_PROXY=true` only there: Railway's edge overwrites `X-Real-IP`, which the inquiry rate limiter accepts after IP syntax validation. Without that flag the server uses the socket peer address and ignores forwarded headers.

## Checks

```sh
npm test
npm run typecheck
npm run build
```

Dekan’s host portrait (`public/images/member-dekan.png`) comes from the public member image at `https://www.raidguild.org/images/member-dekan.png`, retrieved November 12, 2026.
