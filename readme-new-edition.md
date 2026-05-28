# Guida Operativa: Nuova Edizione del Master

Questa guida descrive i passaggi da seguire per gestire una nuova edizione del master con il flusso reale del sito.

Scenario di riferimento:
- edizione attualmente in corso: `25_26`
- nuova edizione da pubblicare: `26_27`

La procedura e divisa in due momenti distinti:

1. **Apertura iscrizioni della nuova edizione**: il sito deve iniziare a mostrare le informazioni di iscrizione `26_27`, ma la home continua a considerare `25_26` come edizione corrente per statistiche e coorte in corso.
2. **Consolidamento della nuova edizione**: quando `26_27` inizia davvero, il sito passa a considerarla come anno corrente anche nella home e nei dati globali.

## Logica generale del sito

Prima di intervenire, e utile chiarire quali file guidano i comportamenti principali:

- `_data/iscrizioni.yml`: controlla quale pagina viene considerata l'iscrizione piu recente. Il redirect `/iscrizione` punta sempre al primo elemento del file.
- `_data/edizioni.yml`: controlla l'ordine delle edizioni di didattica, docenti e direttivo. I redirect `/didattica`, `/docenti` e `/direttivo` puntano al primo elemento del file.
- `_data/master_info/current.json`: definisce l'edizione corrente globale del sito.
- `_pages/index.markdown`: nella home separa due concetti:
  - `current_year`: edizione usata per statistiche e numeri della coorte corrente
  - `info_edition`: edizione usata per il box informativo con scadenze, lezioni e tirocinio

Questo permette di aprire le iscrizioni della nuova edizione senza promuoverla subito a edizione corrente del master.

## Step 1: Aprire le iscrizioni per la nuova edizione `26_27`

Obiettivo: pubblicare la nuova pagina iscrizione e, se necessario, le nuove pagine didattica/docenti/direttivo, lasciando la home ancora ancorata a `25_26` come edizione corrente.

### 1. Creare o aggiornare i dati della nuova edizione

File da preparare:
- `_data/master_info/26_27.json`

Operazione consigliata:
- duplicare `_data/master_info/25_26.json`
- aggiornare tutti i valori per `26_27`

Cosa verificare con attenzione:
- `edizione`
- `stats`
- `info_generali`
- tutte le voci dentro `scadenze`
- eventuali link presenti nella sidebar

Questo file e la sorgente principale per:
- box informativo in home
- sidebar e stato iscrizioni
- riepilogo date nella pagina iscrizione

### 2. Creare il JSON pubblico usato dagli script frontend

File da creare o aggiornare:
- `assets/data/master-info-26-27.json`

Operazione consigliata:
- duplicare `assets/data/master-info-25-26.json`
- aggiornare la riga Liquid che seleziona la chiave corretta:

```liquid
{% assign master_info = site.data.master_info['26_27'] %}
```

Questo file viene letto dal javascript della pagina iscrizione nuova.

Nota:
- `assets/data/master-info.json` non va modificato in questa fase, perche legge sempre l'edizione indicata in `_data/master_info/current.json`.

### 3. Aprire la nuova iscrizione nei redirect globali

File da modificare:
- `_data/iscrizioni.yml`

Operazione:
- aggiungere `26_27` in testa al file
- impostare `active: true` per `26_27`
- impostare `active: false` per `25_26`

Esempio:

```yaml
- label: "2026-2027"
  year: "26-27"
  year_label: "2026-2027"
  url: "/iscrizione/26-27/"
  data_file: "26_27"
  active: true

- label: "2025-2026"
  year: "25-26"
  year_label: "2025-2026"
  url: "/iscrizione/25-26/"
  data_file: "25_26"
  active: false
```

Effetto:
- `/iscrizione` redirige alla nuova pagina `26_27`
- il menu laterale delle pagine iscrizione mostra la nuova edizione come prima voce

### 4. Creare la pagina iscrizione della nuova edizione

File da creare:
- `_pages/iscrizione/iscrizione_26_27.markdown`

Operazione consigliata:
- duplicare `_pages/iscrizione/iscrizione_25_26.markdown`
- aggiornare:
  - `title`
  - `permalink`
  - include finale

Esempio:

```markdown
---
layout: iscrizione
title: Iscrizione 2026-2027
permalink: /iscrizione/26-27/
header_type: unipi
header_img: assets/images/unipi_segreterie_wide.jpg
header_title: " "
---

{% include iscrizione/iscrizione-content-2026-2027.html %}
```

### 5. Creare il contenuto HTML della nuova pagina iscrizione

File da creare:
- `_includes/iscrizione/iscrizione-content-2026-2027.html`

Operazione consigliata:
- duplicare `_includes/iscrizione/iscrizione-content-2025-2026.html`
- aggiornare tutto cio che contiene riferimenti espliciti all'anno nuovo

Controlli obbligatori:
- link al bando
- testo con anni e date
- eventuali riferimenti al nome file della nuova edizione
- script finale con il dataset corretto

Blocco da verificare sempre:

```html
<script src="{{ '/assets/js/status-iscrizioni.js' | relative_url }}" data-master-info-url="{{ '/assets/data/master-info-26-27.json' | relative_url }}"></script>
```

Se questo riferimento resta all'anno precedente, la pagina iscrizione mostra dati sbagliati.

### 6. Preparare didattica, docenti e direttivo della nuova edizione

Questo blocco e necessario se vuoi che i redirect generici `/didattica`, `/docenti` e `/direttivo` puntino gia alla nuova edizione durante la fase iscrizioni.

#### 6.1 Didattica

File da creare o aggiornare:
- `_data/didattica/didattica_26_27.yml`
- `_pages/didattica/didattica_26_27.markdown`

Operazione consigliata:
- duplicare i file `25_26`
- aggiornare contenuti, corsi, descrizioni e permalink

#### 6.2 Docenti

File da creare o aggiornare:
- `_data/docenti/docenti_26_27.yml`
- `_pages/docenti/docenti_26_27.markdown`

Operazione consigliata:
- duplicare i file `25_26`
- aggiornare `data_source`, permalink e contenuti

#### 6.3 Direttivo

File da creare o aggiornare:
- `_pages/direttivo/direttivo_26_27.markdown`

Operazione consigliata:
- duplicare `_pages/direttivo/direttivo_25_26.markdown`
- aggiornare titolo, permalink e `data_source`

### 7. Portare la nuova edizione in testa alle edizioni pubbliche

File da modificare:
- `_data/edizioni.yml`

Operazione:
- aggiungere `26_27` in testa al file
- impostare `active: true` per `26_27`
- impostare `active: false` per `25_26`

Esempio:

```yaml
- label: "2026-2027"
  year: "26-27"
  year_label: "2026-2027"
  url: "/didattica/26-27"
  data_file: didattica_26_27
  active: true

- label: "2025-2026"
  year: "25-26"
  year_label: "2025-2026"
  url: "/didattica/25-26"
  data_file: didattica_25_26
  active: false
```

Effetto:
- `/didattica` redirige a `26-27`
- `/docenti` redirige a `26-27`
- `/direttivo` redirige a `26-27`

Per questo motivo il blocco precedente su didattica/docenti/direttivo va preparato prima di modificare questo file.

### 8. Lasciare la home ancorata all'edizione corrente reale

Durante la fase di apertura iscrizioni, non bisogna ancora promuovere `26_27` a edizione corrente globale.

File da verificare:
- `_data/master_info/current.json`
- `_pages/index.markdown`

Configurazione attesa in questa fase:

`_data/master_info/current.json`

```json
{
  "year": "25_26"
}
```

`_pages/index.markdown`

```yaml
current_year: "25_26"
info_edition: "26_27"
```

Significato:
- la home continua a mostrare statistiche e numeri della coorte `25_26`
- il box informativo della home mostra le date e le informazioni della nuova edizione `26_27`

Questa e la configurazione corretta per il periodo in cui le iscrizioni sono aperte ma la nuova edizione non e ancora iniziata.

## Step 2: Consolidare `26_27` come anno corrente del sito

Obiettivo: quando la nuova edizione parte davvero, il sito deve considerare `26_27` come edizione corrente anche per home, dataset globali e redirect basati sul master corrente.

### 1. Aggiornare l'edizione corrente globale

File da modificare:
- `_data/master_info/current.json`

Nuovo contenuto:

```json
{
  "year": "26_27"
}
```

Effetto:
- `assets/data/master-info.json` inizia a esporre i dati di `26_27`
- tutti i componenti che dipendono dall'edizione corrente globale smettono di leggere `25_26`

### 2. Allineare la home alla nuova edizione

File da modificare:
- `_pages/index.markdown`

Nuova configurazione:

```yaml
current_year: "26_27"
info_edition: "26_27"
```

Effetto:
- statistiche, numeri e messaggio principale della home passano a `26_27`
- anche il box informativo della home resta coerente con `26_27`

### 3. Ricontrollare coerenza dei dati `26_27`

Prima di considerare chiuso il passaggio, verificare che in `_data/master_info/26_27.json` siano allineati:
- date lezioni
- date tirocinio
- scadenze rate
- eventuale iscrizione uditori
- statistiche mostrate in home

Questo e il momento in cui i dati della nuova edizione smettono di essere solo “di apertura iscrizioni” e diventano i dati ufficiali del sito.

## Checklist rapida

### Checklist Step 1

- creato `_data/master_info/26_27.json`
- creato `assets/data/master-info-26-27.json`
- aggiornata `_data/iscrizioni.yml`
- creata `_pages/iscrizione/iscrizione_26_27.markdown`
- creato `_includes/iscrizione/iscrizione-content-2026-2027.html`
- creato `_data/didattica/didattica_26_27.yml`
- creata `_pages/didattica/didattica_26_27.markdown`
- creato `_data/docenti/docenti_26_27.yml`
- creata `_pages/docenti/docenti_26_27.markdown`
- creata `_pages/direttivo/direttivo_26_27.markdown`
- aggiornata `_data/edizioni.yml`
- lasciato `_data/master_info/current.json` su `25_26`
- impostato `_pages/index.markdown` con `current_year: "25_26"` e `info_edition: "26_27"`

### Checklist Step 2

- aggiornato `_data/master_info/current.json` a `26_27`
- aggiornato `_pages/index.markdown` con `current_year: "26_27"`
- aggiornato `_pages/index.markdown` con `info_edition: "26_27"`
- ricontrollati dati e scadenze in `_data/master_info/26_27.json`

## Verifica finale

Dopo le modifiche, eseguire una build locale del sito:

```bash
bundle exec jekyll build
```

Poi verificare manualmente almeno questi percorsi:
- `/iscrizione`
- `/iscrizione/26-27/`
- `/didattica`
- `/didattica/26-27`
- `/docenti`
- `/direttivo`
- home `/`

In particolare:
- nello Step 1 la home deve ancora parlare della coorte corrente `25_26`, ma mostrare il box informativo di `26_27`
- nello Step 2 la home deve essere completamente allineata a `26_27`

## Cosa non include questa guida

Questa guida non copre volutamente la parte studenti, che puo essere rimossa o gestita separatamente.