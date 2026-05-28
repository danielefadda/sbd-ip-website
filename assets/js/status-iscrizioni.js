// Variabile globale che conterrà i dati
let masterData = null;

function resolveDataUrl() {
  const currentScript = document.currentScript;
  const pageScript = Array.from(document.querySelectorAll('script[data-master-info-url]')).find(
    (script) => script.src && script.src.includes('/assets/js/status-iscrizioni.js')
  );

  const customDataUrl = currentScript?.dataset?.masterInfoUrl || pageScript?.dataset?.masterInfoUrl;
  if (customDataUrl) {
    return new URL(customDataUrl, window.location.origin);
  }

  const match = window.location.pathname.match(/\/iscrizione\/(\d{2})-(\d{2})\/?$/);
  if (match) {
    const yearSlug = `${match[1]}-${match[2]}`;
    return new URL(`../data/master-info-${yearSlug}.json`, currentScript?.src || window.location.href);
  }

  return new URL('../data/master-info.json', currentScript?.src || window.location.href);
}

const dataUrl = resolveDataUrl();

// Carica i dati dal JSON
fetch(dataUrl)
  .then(response => response.json())
  .then(data => {
    masterData = data;
    console.log('Dati master caricati:', masterData);
    // Aggiorna tutto una volta caricati i dati
    updateStatusIscrizioni();
    updateRiepilogoScadenze();
    updateDateImportanti();
    updateScadenzaUditori();
    updateRateTable();
    updateDataInizioLezioni();
    updateDataAperturaProcedura();
  })
  .catch(error => console.error('Errore nel caricamento dei dati:', error));

function getStatoScadenza(startDate, endDate) {
  const now = new Date().getTime();
  // const now = new Date('2026-11-31').getTime();
  const start = new Date(startDate).getTime();
  const end = endDate ? new Date(endDate).getTime() : start;

  if (now < start) {
    return { label: "🟡 In arrivo", class: "status-future" };
  } else if (now > end) {
    return { label: "🔴 Concluso", class: "status-past" };
  } else {
    return { label: "🟢 In corso", class: "status-current" };
  }
}

function updateStatusIscrizioni() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateStatusIscrizioni');
    return;
  }

  const now = new Date().getTime();
  //const now = new Date('2026-11-31').getTime();
  const iscrizioni = masterData.scadenze[0];
  const startDate = new Date(iscrizioni.data).getTime();
  const endDate = new Date(iscrizioni.data_fine).getTime();
  const edizione = masterData.edizione;

  let stato, emoji, messaggio;

  if (now < startDate) {
    stato = "attive";
    emoji = "🟡";
    messaggio = `Le iscrizioni saranno aperte il ${iscrizioni.data_label}`;
  } else if (now > endDate) {
    stato = "chiuse";
    emoji = "🔴";
    messaggio = "Le iscrizioni sono concluse";
  } else {
    stato = "aperte";
    emoji = "🟢";
    messaggio = `Le iscrizioni sono aperte fino al ${iscrizioni.data_fine_label}`;
  }

  // Aggiorna lo stato sulla pagina
  const statusContainer = document.getElementById('stato-iscrizioni');
  if (statusContainer) {
    statusContainer.innerHTML = `
      <div style="background: #f8f9fa; border-left: 4px solid #07286E; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #333;">${emoji} Stato Iscrizioni ${edizione}</h3>
        <p style="font-size: 1.1em; margin: 10px 0; color: #555;">
          ${messaggio}
        </p>
      </div>
    `;
  }
}

function updateRiepilogoScadenze() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateRiepilogoScadenze');
    return;
  }

  const tableContainer = document.getElementById('riepilogo-scadenze');
  if (!tableContainer) return;

  let tableHTML = `
    <table style="width: 100%; box-sizing: border-box; display: table;">
      <thead>
        <tr>
          <th>Fase / Voce</th>
          <th>Data / Periodo</th>
          <th>Stato</th>
        </tr>
      </thead>
      <tbody>
  `;

  masterData.scadenze.forEach(item => {
    const stato = getStatoScadenza(item.data, item.data_fine);
    const dataRange = item.data_fine_label 
      ? `${item.data_label} – ${item.data_fine_label}`
      : item.data_label;

    tableHTML += `
      <tr>
        <td><strong>${item.voce}</strong></td>
        <td>${dataRange}</td>
        <td>
          <span class="status-badge ${stato.class}">
            ${stato.label}
          </span>
        </td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  tableContainer.innerHTML = tableHTML;
}

function updateDateImportanti() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateDateImportanti');
    return;
  }

  const datesContainer = document.getElementById('date-importanti');
  if (!datesContainer) {
    console.warn('Elemento date-importanti non trovato');
    return;
  }

  const iscrizioni = masterData.scadenze[0];
  const inizioLezioni = masterData.scadenze[2];

  const html = `
    <ul>
      <li><strong>Apertura:</strong> ${iscrizioni.data_label}</li>
      <li><strong>Chiusura:</strong> ${iscrizioni.data_fine_label}</li>
      <li><strong>Inizio lezioni:</strong> ${inizioLezioni.data_label}</li>
    </ul>
  `;

  datesContainer.innerHTML = html;
  console.log('Date importanti aggiornate');
}

function updateScadenzaUditori() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateScadenzaUditori');
    return;
  }

  const uditorElement = document.getElementById('scadenza-uditori');
  if (!uditorElement) {
    console.warn('Elemento scadenza-uditori non trovato');
    return;
  }

  const iscrzioneUditori = masterData.scadenze[3]; // Elemento "Iscrizione Uditori"
  uditorElement.textContent = iscrzioneUditori.data_label;
}

function updateRateTable() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateRateTable');
    return;
  }

  const rateContainer = document.getElementById('rate-pagamento');
  if (!rateContainer) {
    console.warn('Elemento rate-pagamento non trovato');
    return;
  }

  // Filtra solo gli elementi che hanno il campo numero_rata
  const rate = masterData.scadenze.filter(item => item.numero_rata);

  // Calcola il totale
  const totale = rate.reduce((sum, item) => sum + parseFloat(item.importo.replace('.', '').replace(',', '.')), 0);

  let html = `
    <p><strong>Il contributo di iscrizione per gli iscritti è di Euro ${totale.toLocaleString('it-IT')} da versare in ${rate.length} rate, come indicato di seguito.</strong></p>
    <ul>
  `;

  rate.forEach(item => {
    html += `<li><strong>Rata ${item.numero_rata}:</strong> <strong>Euro ${item.importo},00</strong> scadenza: <strong>${item.data_label}</strong></li>\n`;
  });

  html += '</ul>';
  rateContainer.innerHTML = html;
}

function updateDataInizioLezioni() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateDataInizioLezioni');
    return;
  }

  const inizioElement = document.getElementById('data-inizio-lezioni');
  if (!inizioElement) {
    console.warn('Elemento data-inizio-lezioni non trovato');
    return;
  }

  const inizioLezioni = masterData.scadenze[2]; // Elemento "Inizio Lezioni"
  inizioElement.textContent = inizioLezioni.data_label;
}

function updateDataAperturaProcedura() {
  if (!masterData) {
    console.warn('Dati non ancora caricati per updateDataAperturaProcedura');
    return;
  }

  const aperturaElement = document.getElementById('data-apertura-procedura');
  const chiusuraElement = document.getElementById('data-chiusura-procedura');
  const scadenzaDocumentiElement = document.getElementById('data-scadenza-documenti');

  if (!aperturaElement) {
    console.warn('Elemento data-apertura-procedura non trovato');
    return;
  }
  if (!chiusuraElement) {
    console.warn('Elemento data-chiusura-procedura non trovato');
    return;
  }
  if (!scadenzaDocumentiElement) {
    console.warn('Elemento data-scadenza-documenti non trovato');
    return;
  }

  const iscrizioni = masterData.scadenze[0]; // Elemento "Iscrizioni"
  aperturaElement.textContent = iscrizioni.data_label;
  chiusuraElement.textContent = iscrizioni.data_fine_label;
  scadenzaDocumentiElement.textContent = iscrizioni.data_fine_label;
}

// Esegui al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  updateStatusIscrizioni();
  updateRiepilogoScadenze();
  updateDateImportanti();
  updateScadenzaUditori();
  updateRateTable();
  updateDataInizioLezioni();
  updateDataAperturaProcedura();
});

// Aggiorna ogni ora per sincronizzazione
setInterval(() => {
  updateStatusIscrizioni();
  updateRiepilogoScadenze();
  updateDateImportanti();
  updateScadenzaUditori();
  updateRateTable();
  updateDataInizioLezioni();
  updateDataAperturaProcedura();
}, 3600000);
