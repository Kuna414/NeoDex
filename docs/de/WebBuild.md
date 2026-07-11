# Web-Build und GitHub Pages

NeoDex verwendet Vite für lokale Entwicklung und Produktions-Builds.

## Lokal starten

```bash
npm install
npm run dev
```

## Produktions-Build

```bash
npm run build
```

Das Ergebnis liegt in `dist/`.

## Veröffentlichung

Der Workflow `.github/workflows/deploy-pages.yml`:

1. installiert Abhängigkeiten,
2. führt Tests aus,
3. erstellt `dist/`,
4. veröffentlicht den Ordner über GitHub Pages.

In den GitHub-Pages-Einstellungen muss die Quelle auf **GitHub Actions** gestellt werden.
