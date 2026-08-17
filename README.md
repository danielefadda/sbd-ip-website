# Boilerplate del Sito Web Progettone

## Istruzioni per l'integrazione del boilerplate del sito web nella cartella del progetto

Le istruzioni seguenti guidano l'integrazione di un boilerplate per un sito web Jekyll all'interno del vostro repository del progettone. Attraverso una serie di passaggi, aggiungeremo il boilerplate dalla repository remota al nostro progetto locale. Questo ci permetterà di avviare il nostro progetto con una struttura base già predefinita, risparmiando tempo e sforzi nella configurazione iniziale.

### The Git Way (consigliata)

1. Accedi alla directory del tuo progetto chiamato "my_progettone" e assicurati che non esista già una cartella chiamata `website` nella radice del progetto. In caso contrario, rinominala prima di procedere:
   - `cd my_progettone`

2. Aggiungi il repository "progettone-template" come remoto al tuo repository "my_progettone":
   - `git remote add progettone-template https://github.com/sobigdata-master/progettone-template`

3. Recupera i file dal repository "progettone-template":
   - `git fetch progettone-template`

4. Imposta "progettone-template" come repository remoto:
   - `git remote set-url origin https://github.com/sobigdata-master/progettone-template.git`

5. Mantieni il file README.md del repository locale e ignora quello remoto (il file che stai leggendo):
   - `git checkout --ours README.md`
   - `git add README.md`
   - `git commit -m "risolto conflitto nel README"`

6. Effettua il merge dei file dal repository "progettone-template" nel tuo repository "my_progettone":
   - `git merge progettone-template/main --allow-unrelated-histories`

7. Esegui il commit dei file aggiunti:
   - `git commit -m "aggiunto boilerplate di base"`

8. Rimuovi il collegamento con il repository "progettone-template" (non più necessario):
   - `git remote remove progettone-template`


### The Manual Way (sconsigliata)

1. Accedi alla directory del tuo progetto chiamato "my_progettone" e assicurati che non esista già una cartella chiamata `website` nella radice del progetto. In caso contrario, rinominala prima di procedere:
   - `cd my_progettone`

2. Scarica da questo repository (progettone-template) la cartella `website` e aggiungila alla root del tuo progettone

3. Fai commit e push dei file appena aggiunti

## La struttura della cartella dovrà essere simile a questa:


my_progettone/

├── code/

├── deliverables/

├── figures/

├── references/

├── *website*/

└── README.md (del tuo progetto locale, non di questo repository)

## Sviluppo locale e build deploy

Usare due comandi diversi:

- Sviluppo locale (preview standard Jekyll):
   - `bundle exec jekyll serve`
- Build per deploy su server personale (output in `docs`):
   - `bundle exec jekyll build --config _config.yml,_build_config.yml`

La build per server usa `pure_relative_paths: true` per compatibilità con hosting non-root.
Per GitHub Pages la build e il deploy sono gestiti dalla GitHub Action (branch `cert`).

## Nota: come scrivere URL e link correttamente

Regole pratiche:

- Per pagine e asset interni usare sempre `relative_url`:
   - `{{ '/didattica/' | relative_url }}`
   - `{{ '/assets/images/logo.png' | relative_url }}`
- Non usare percorsi hardcoded che iniziano con `/` dentro `href` o `src` (es. `/assets/...`, `/didattica/...`).
- Non usare `absolute_url` per risorse locali del sito.
- Per link esterni (`https://...`) lasciare l'URL completo senza filtri.

Esempi:

- Corretto: `<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">`
- Corretto: `<a href="{{ '/progetti/' | relative_url }}">Progetti</a>`
- Da evitare: `<link rel="stylesheet" href="/assets/css/main.css">`
- Da evitare: `<a href="/progetti/">Progetti</a>`
