---
layout: default-full
title: "Partner"
permalink: /partner/
partner: false
show_sidetoc: false
header_type: unipi  #,hero, base, post, hero,image, splash, sbd
header_img: assets/images/partners_final.png #unipi_partner.jpg
header_title: " "

---
<section class="mb-5">
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1 class="">I nostri Partner</h1>
      <p>Il Master collabora con un <strong>network di oltre 50 aziende e istituzioni</strong> che operano in ambiti diversi: Intelligenza Artificiale, Big Data Analytics, fintech, consulenza strategica, media digitali, pubblica amministrazione e ricerca scientifica.</p>
      <p>Tra i partner figurano multinazionali come IBM e Generali, centri di ricerca d'eccellenza come CNR (Istituto di Informatica e Telematica - ISTI), Scuola Superiore Sant'Anna e Scuola Normale Superiore di Pisa, e aziende innovative come Almawave, Bridge Consulting, Kode Solutions, Octo Telematics, MicroStrategy e molte altre.</p>
    </div>
    <div class="col-md-8 offset-md-2">
      <h4>Il ruolo dei partner nel percorso formativo</h4>
      <p>I partner contribuiscono attivamente alla formazione attraverso diverse modalità:</p>
      <ul>
        <li> <strong>Tirocini curricolari:</strong> ogni studente svolge 425 ore di tirocinio presso uno dei partner, lavorando su progetti concreti sotto la supervisione congiunta di tutor aziendali e accademici</li>
        <li> <strong>Didattica applicata:</strong> testimonianze aziendali, casi studio reali e challenge su problemi attuali integrano le lezioni teoriche</li>
        <li> <strong>Progetti collaborativi:</strong> gli studenti sviluppano progetti applicati in collaborazione diretta con i partner</li>
        <li> <strong>Accesso al mercato del lavoro:</strong> molte collaborazioni si trasformano in opportunità di assunzione al termine del percorso
        </li>
      </ul>
      <p>Il <strong>97% dei diplomati</strong> trova occupazione entro pochi mesi dal Master, con un tempo medio di <strong>1,5 mesi</strong> per la prima assunzione. La maggioranza di questi placement avviene attraverso le relazioni costruite durante il tirocinio o i progetti con i partner. </p>
    </div>
  </div>
</section>

{% if site.data.partners.partners %}

## Partner Attuali

<div class="partners-grid">
  {% for partner in site.data.partners.partners %}
    {% if partner.active and partner.visible %}
      {% if partner.url %}
        <a href="{{ partner.url }}" target="_blank" rel="noopener noreferrer" class="partner-item-link">
      {% endif %}
      <div class="partner-item partner-{{ partner.level }} partner-{{ partner.type }}">
        <div class="partner-logo-wrapper">
          <img src="{{ site.baseurl }}/{{ partner.logo }}" 
               alt="{{ partner.name }}" 
               class="partner-logo"
               title="{{ partner.name }} - {{ partner.type | capitalize }} ({{ partner.level | capitalize }})">
        </div>
        <div class="partner-info">
          <p class="partner-name">{{ partner.name }}</p>
          <span class="partner-badge partner-badge-{{ partner.type }}">{{ partner.type | capitalize }}</span>
          <span class="partner-badge partner-badge-{{ partner.level }}">{{ partner.level | capitalize }}</span>
        </div>
      </div>
      {% if partner.url %}
        </a>
      {% endif %}
    {% endif %}
  {% endfor %}
</div>

{% assign inactive_partners = site.data.partners.partners | where: "active", false %}
{% if inactive_partners.size > 0 %}

<hr class="mt-5 pt-3" />

## Partner delle passate edizioni

<div class="partners-grid">
  {% for partner in inactive_partners %}
    {% if partner.visible %}
    {% if partner.url %}
      <a href="{{ partner.url }}" target="_blank" rel="noopener noreferrer" class="partner-item-link">
    {% endif %}
    <div class="partner-item partner-{{ partner.level }} partner-{{ partner.type }} partner-inactive">
      <div class="partner-logo-wrapper">
        <img src="{{ site.baseurl }}/{{ partner.logo }}" 
             alt="{{ partner.name }}" 
             class="partner-logo"
             title="{{ partner.name }} - {{ partner.type | capitalize }} ({{ partner.level | capitalize }})">
      </div>
      <div class="partner-info">
        <p class="partner-name">{{ partner.name }}</p>
        <span class="partner-badge partner-badge-{{ partner.type }}">{{ partner.type | capitalize }}</span>
        <span class="partner-badge partner-badge-{{ partner.level }}">{{ partner.level | capitalize }}</span>
      </div>
    </div>
    {% if partner.url %}
      </a>
    {% endif %}
    {% endif %}
  {% endfor %}
</div>

{% endif %}

{% endif %}
