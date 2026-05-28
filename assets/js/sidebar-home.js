// Carica e renderizza la sidebar dinamica.
// Priorita: oggetto globale iniettato dal layout -> JSON inline -> fallback al JSON statico.
const inlineDataElement = document.getElementById('master-info-sidebar-data');

if (window.masterInfoSidebarData) {
  updateSidebar(window.masterInfoSidebarData);
} else if (inlineDataElement?.textContent?.trim()) {
  try {
    updateSidebar(JSON.parse(inlineDataElement.textContent));
  } catch (error) {
    console.error('Errore nel parsing dei dati sidebar inline:', error);
    loadSidebarFromStaticJson();
  }
} else {
  loadSidebarFromStaticJson();
}

function loadSidebarFromStaticJson() {
  const dataUrl = new URL('../data/master-info.json', document.currentScript?.src || window.location.href);
  fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      updateSidebar(data);
    })
    .catch(error => console.error('Errore nel caricamento sidebar:', error));
}

function updateSidebar(data) {
  const sidebarContainer = document.getElementById('dynamic-sidebar');
  if (!sidebarContainer) return;

  const resolveLink = (link) => {
    if (!link || /^([a-z]+:)?\/\//i.test(link) || link.startsWith('#')) {
      return link;
    }

    return new URL(link, window.location.origin + window.location.pathname).pathname;
  };

  const iscrizioni = data.scadenze.find(item => item.voce === "Iscrizioni");
  const lezioni = data.scadenze.find(item => item.voce === "Lezioni");
  const tirocinio = data.scadenze.find(item => item.voce === "Tirocinio");
  
  // Calcola lo stato delle iscrizioni
  const now = new Date().getTime();
  const startDate = new Date(iscrizioni.data).getTime();
  const endDate = new Date(iscrizioni.data_fine).getTime();
  
  let statoIscrizioni;
  if (now < startDate) {
    statoIscrizioni = "🟡 Prossime";
  } else if (now > endDate) {
    statoIscrizioni = "🔴 CHIUSE";
  } else {
    statoIscrizioni = "🟢 APERTE";
  }

  let html = `<h4 class="h5 font-weight-bold mb-4">${data.sidebar.title}</h4>`;
  
  data.sidebar.sections.forEach(section => {
    html += `<div class="mb-4">`;
    html += `<h5 class="h6 font-weight-bold text-uppercase mb-3">${section.title}</h5>`;
    
    section.items.forEach(item => {
      let value = item.value;
      
      // Gestisce valori dinamici
      if (item.dynamic) {
        if (item.value === 'stato_iscrizioni') {
          value = statoIscrizioni;
        } else if (item.value === 'periodo_iscrizioni') {
          value = `${iscrizioni.data_label} - ${iscrizioni.data_fine_label}`;
        } else if (item.value === 'periodo_lezioni') {
          value = `${lezioni.data_label} - ${lezioni.data_fine_label}`;
        } else if (item.value === 'periodo_tirocinio') {
          value = `${tirocinio.data_label} - ${tirocinio.data_fine_label}`;
        }
      } else if (item.static_value) {
        value = item.static_value;
      }
      
      html += `
        <div class="d-flex align-items-start mb-2">
          <i class="fa fa-${item.icon} mr-2 mt-1" style="color: #667eea;"></i>
          <div class="small">
            <strong>${item.label}:</strong> 
            ${item.link ? `<a href="${resolveLink(item.link)}">${value}</a>` : value}
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
  });
  
  sidebarContainer.innerHTML = html;
}
