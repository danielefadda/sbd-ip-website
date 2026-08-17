# SoBigData IP Website

Sito web Jekyll per il progetto SoBigData Implementation Phase.

## Struttura del sito

```
sbd-ip-website/
├── _config.yml              # Configurazione principale (tema, navbar, colori, footer)
├── _build_config.yml        # Override per build locale (tema locale, path relativi)
├── _data/                   # Dati strutturati (YAML)
│   ├── consortium.yml       # Partner del consorzio (27 istituzioni)
│   ├── deliverables.yml     # Deliverables del progetto
│   ├── team.yml             # Team di gestione e leader WP
│   └── wps.yml              # Work Packages (6)
├── _pages/                  # Pagine del sito
│   ├── index.markdown       # Homepage
│   ├── the-project.md       # The Project (accordion WP + timeline)
│   ├── consortium.md        # Consorzio (griglia partner)
│   ├── team.md              # Team (card + modali)
│   ├── deliverables.md      # Deliverables (tabella)
│   └── communication.md     # Comunicazione e loghi
├── _layouts/                # Template HTML
│   ├── default.html         # Layout base (2 colonne)
│   ├── default-full.html    # Layout full-width
│   ├── project.html         # Layout The Project (accordion + gantt)
│   ├── consortium.html      # Layout griglia partner
│   ├── team.html            # Layout card team
│   └── deliverables.html    # Layout tabella deliverables
├── _includes/               # Componenti riutilizzabili
│   ├── navbar.html          # Barra di navigazione
│   ├── footer.html          # Footer con disclaimer EU
│   └── components/          # Headers, griglie, ecc.
├── _plugins/                # Plugin personalizzati
│   ├── pure_relative_url.rb # Genera path relativi puri
│   └── post_render_fix_relative_assets.rb
└── assets/
    ├── css/custom.scss      # Stili personalizzati
    ├── images/              # Immagini, loghi, foto
    └── favicon/             # Favicon del sito
```

## Dove modificare i contenuti

### `_data/consortium.yml` — Consorzio
Modifica questo file per aggiungere/modificare partner:
```yaml
- pic: "0000000000"
  name: "Nome Istituzione"
  acronym: "ACRONIMO"
  country: "Italy"
  role: "Beneficiary"          # oppure "Coordinator"
  logo: "assets/images/consortium/logo.png"
  url: "https://example.com"
```

### `_data/team.yml` — Team
Due sezioni:
- `project_management_team`: card del team di gestione (con bio e modale)
- `wp_leaders`: leader dei Work Package

### `_data/wps.yml` — Work Package
Ogni WP ha: `id`, `title`, `leader`, `months`, `description`. Questi dati alimentano l'accordion e la timeline nella pagina The Project.

### `_data/deliverables.yml` — Deliverables
Ogni deliverable ha: `id`, `title`, `wp`, `type`, `month`, `visible` (mostra/nascondi), `pdf` (path al PDF).

### Pagine singole

| Pagina | File | Dove modificare |
|--------|------|-----------------|
| Homepage | `_pages/index.markdown` | Testo inline + card Bootstrap. Conteggio WP e partner generato da Liquid (`site.data.wps`, `site.data.consortium`). |
| The Project | `_pages/the-project.md` | Testo introduttivo nel file. Accordion WP e timeline sono generati dal layout `project.html` dai dati in `wps.yml`. |
| Consortium | `_pages/contortium.md` | Il file contiene solo una frase. La griglia partner è generata dal layout `consortium.html` da `consortium.yml`. |
| Team | `_pages/team.md` | Front matter vuota. Tutte le card e le modali sono generate dal layout `team.html` da `team.yml`. |
| Deliverables | `_pages/deliverables.md` | Solo heading. La tabella è generata dal layout `deliverables.html` da `deliverables.yml`. |
| Communication | `_pages/communication.md` | Tutti i contenuti sono inline nel file (loghi, link download, testo acknowledgement, contatti). |

### Navigazione e aspetto
- **Navbar**: `_config.yml` → `navbar.nav`
- **Footer**: `_config.yml` → `footer.links` e `footer.copyright`
- **Colori e font**: `_config.yml` → `chulapa-skin.vars` e `googlefonts`
- **Stili custom**: `assets/css/custom.scss`

## Sviluppo locale

### Prerequisiti
```bash
bundle install
```

### Preview in locale (consigliato)
```bash
bundle exec jekyll serve --config _config.yml,_config.dev.yml --livereload
```
Il sito sarà disponibile su `http://localhost:4000` con live reload. Usa il tema locale `chulapa-jekyll` senza connessione a GitHub.

### Build per server personale
```bash
bundle exec jekyll build --config _config.yml,_build_config.yml
```
Output nella cartella `localserver/`. Differenze rispetto alla preview:
- `pure_relative_paths: true` (link relativi, compatibile con hosting non-root)
- `destination: "localserver"`

### Deploy su GitHub Pages [da verificare]
La GitHub Action (`.github/workflows/publish-cert-2-pages.yml`) builda e pubblica sul branch `cert`. Si attiva manualmente da GitHub → Actions → "Publish site to cert and pages" → "Run workflow".

## Note sugli URL e link

- **Tag `<img>` e `<a>` HTML**: usa il filtro Liquid `relative_url` per gli attributi `src` e `href`:
  ```html
  <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Logo">
  <a href="{{ '/team/' | relative_url }}">Team</a>
  ```
- **Link Markdown**: il plugin `jekyll-relative-links` riscrive automaticamente i link `[testo](/path/)`.
- **Link esterni**: lasciare l'URL completo senza filtri.
- **Non usare** percorsi hardcoded con `/` iniziale (es. `/assets/...`) negli attributi `src`.
