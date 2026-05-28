# Guida Operativa: Nuova Edizione del Master

Questa guida descrive il nuovo flusso semplificato per gestire una nuova edizione del master.

Obiettivo del refactor:
- avere **una sola sorgente di verita** per scegliere l'edizione corrente e l'edizione mostrata in evidenza sul sito;
- evitare file JSON per anno con chiavi hardcoded;
- mantenere comunque i **file dati annuali** e le **pagine annuali** separate.

## Concetto base

Da ora in poi le due informazioni globali si impostano solo in `_config.yml`:

```yml
current_year: "25_26"
info_edition: "26_27"
```

Significato:
- `current_year`: edizione corrente reale del master
- `info_edition`: edizione che il sito deve mettere in evidenza per box informativi, iscrizioni e comunicazione principale

Scenario tipico:
- il master `25_26` e ancora l'edizione corrente
- vuoi gia aprire e pubblicizzare le iscrizioni `26_27`

In questo caso:

```yml
current_year: "25_26"
info_edition: "26_27"
```

Quando `26_27` diventa davvero l'edizione corrente, basta allineare entrambe:

```yml
current_year: "26_27"
info_edition: "26_27"
```

## Cosa si aggiorna automaticamente

Con questa impostazione centralizzata:

- la home legge `current_year` e `info_edition` da `_config.yml`
- il payload `assets/data/master-info.json` espone tutte le edizioni e le due chiavi globali
- le pagine iscrizione scelgono automaticamente i dati corretti in base all'URL della pagina, senza dover dichiarare un file JSON specifico nel markup

Quindi non devi piu aggiornare:
- `_pages/index.markdown` con chiavi annuali
- `_data/master_info/current.json`
- `assets/data/master-info-XX-YY.json`
- attributi `data-master-info-url` negli include iscrizione

## Cosa resta annuale

Il sito continua a usare file distinti per ogni edizione. Quando prepari una nuova annualita, devi comunque creare o duplicare i file dedicati.

### Dati annuali del master

Per ogni edizione serve un file in:

- `_data/master_info/25_26.json`
- `_data/master_info/26_27.json`
- ecc.

Questo file contiene:
- dati generali
- statistiche
- scadenze
- configurazione sidebar

Esempio:

```text
_data/master_info/26_27.json
```

### Dati annuali didattica

Per ogni edizione serve un file in:

```text
_data/didattica/didattica_26_27.yml
```

### Dati annuali docenti

Per ogni edizione serve un file in:

```text
_data/docenti/docenti_26_27.yml
```

### Pagine annuali

Per ogni edizione vanno create o duplicate le pagine markdown dedicate, per esempio:

- `_pages/iscrizione/iscrizione_26_27.markdown`
- `_pages/didattica/didattica_26_27.markdown`
- `_pages/docenti/docenti_26_27.markdown`
- `_pages/direttivo/direttivo_26_27.markdown`

Gli include HTML annuali di iscrizione restano possibili, per esempio:

- `_includes/iscrizione/iscrizione-content-2026-2027.html`

## Procedura minima per aprire una nuova edizione

Scenario:
- `25_26` e l'edizione corrente
- vuoi aprire `26_27`

### 1. Preparare i dati della nuova edizione

Duplicare e aggiornare:

- `_data/master_info/25_26.json` -> `_data/master_info/26_27.json`
- `_data/didattica/didattica_25_26.yml` -> `_data/didattica/didattica_26_27.yml`
- `_data/docenti/docenti_25_26.yml` -> `_data/docenti/docenti_26_27.yml`

### 2. Preparare le pagine della nuova edizione

Duplicare e aggiornare:

- `_pages/iscrizione/iscrizione_25_26.markdown` -> `_pages/iscrizione/iscrizione_26_27.markdown`
- `_pages/didattica/didattica_25_26.markdown` -> `_pages/didattica/didattica_26_27.markdown`
- `_pages/docenti/docenti_25_26.markdown` -> `_pages/docenti/docenti_26_27.markdown`
- `_pages/direttivo/direttivo_25_26.markdown` -> `_pages/direttivo/direttivo_26_27.markdown`

Se necessario, duplicare anche il contenuto specifico della pagina iscrizione:

- `_includes/iscrizione/iscrizione-content-2025-2026.html` -> `_includes/iscrizione/iscrizione-content-2026-2027.html`

Nota importante:
- nell'include iscrizione non devi piu impostare manualmente il file JSON della nuova edizione;
- lo script prende i dati giusti in automatico dall'URL `/iscrizione/26-27/`.

### 3. Aggiornare i registri delle edizioni pubbliche

Aggiornare:
- `_data/iscrizioni.yml`
- `_data/edizioni.yml`

Qui continui a dichiarare la nuova edizione in testa alla lista, cosi i redirect generici del sito puntano all'ultima annualita pubblicata.

Questo passaggio resta necessario perche:
- `/iscrizione` punta alla prima voce di `_data/iscrizioni.yml`
- `/didattica`, `/docenti` e `/direttivo` puntano alla prima voce di `_data/edizioni.yml`

### 4. Impostare la configurazione globale

In `_config.yml` impostare:

```yml
current_year: "25_26"
info_edition: "26_27"
```

Risultato:
- il master corrente resta `25_26`
- il sito mette in evidenza la nuova edizione `26_27`
- la home e le iscrizioni leggono i dati coerenti senza altre modifiche strutturali

## Procedura minima quando la nuova edizione diventa corrente

Quando `26_27` inizia davvero, non devi cambiare file sparsi nel sito. Basta aggiornare `_config.yml`:

```yml
current_year: "26_27"
info_edition: "26_27"
```

Questo e l'unico passaggio necessario per promuovere la nuova annualita a edizione corrente globale.

## Checklist rapida

Per aprire `26_27` mentre `25_26` e ancora corrente:

- creare `_data/master_info/26_27.json`
- creare `_data/didattica/didattica_26_27.yml`
- creare `_data/docenti/docenti_26_27.yml`
- creare le pagine markdown `26_27`
- aggiornare `_data/iscrizioni.yml`
- aggiornare `_data/edizioni.yml`
- impostare in `_config.yml`:

```yml
current_year: "25_26"
info_edition: "26_27"
```

Per rendere `26_27` l'edizione corrente:

- aggiornare solo `_config.yml`:

```yml
current_year: "26_27"
info_edition: "26_27"
```

## Verifica finale

Dopo ogni aggiornamento eseguire:

```bash
bundle exec jekyll build
```

Poi controllare almeno questi percorsi:

- `/`
- `/iscrizione`
- `/iscrizione/26-27/`
- `/didattica`
- `/docenti`
- `/direttivo`

## Vantaggi della nuova struttura

- una sola configurazione globale da aggiornare
- niente JSON annuali da mantenere in parallelo dentro `assets/data/`
- niente chiavi annuali hardcoded negli include HTML
- minore rischio di incoerenza tra home, iscrizione e dati del master
- restano intatti i file annuali dati/markdown, quindi la gestione editoriale per anno non cambia