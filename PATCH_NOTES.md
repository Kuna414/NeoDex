# NeoDex 0.4 — Vite Build and GitHub Actions

Dieses Patch-Paket ersetzt die einfache GitHub-Pages-Weiterleitung durch eine professionelle Build-Struktur.

Enthalten:

- Vite
- `src/` und `public/`
- Produktionsordner `dist/`
- GitHub-Actions-Workflow
- automatischer Test vor Veröffentlichung
- freigegebenes Masterdesign als Startseite
- funktionierende Touch-Flächen
- erste Pokédex-, NeoUI- und Einstellungsseiten

## Upload

ZIP entpacken und den gesamten Inhalt ins Repository hochladen. Vorhandene `index.html`, `package.json` und `tsconfig.json` dürfen ersetzt werden.

Commit-Nachricht:

```text
Add Vite build and automatic Pages deployment
```

## Danach

GitHub → Settings → Pages → Source auf **GitHub Actions** ändern.
