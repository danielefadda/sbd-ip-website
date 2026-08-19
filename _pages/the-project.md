---
layout: project
title: "The Project"
permalink: /the-project/
show_sidetoc: false
header_type: sbd
header_img: assets/images/header.svg
header_title: " "
---

<div class="row align-items-center">
  <div class="col-md-12 lead">

  <h2>Organisational Structure</h2>

  The SoBigData IP project is organised around a coordinated governance structure that ensures effective management, scientific excellence, and operational efficiency across all activities.

  <div style="text-align: center; margin: 30px 0;">
      <img src="{{ '/assets/images/IP_organisational_structure.jpeg' | relative_url }}" alt="SoBigData IP Organisational Structure" style="max-width: 100%; height: auto;">
      <p style="font-size: 0.9rem; color: #6c757d; margin-top: 10px;"><em>SoBigData IP organisational structure showing the relationship between governance bodies, work packages, and coordination mechanisms.</em></p>
  </div>


  <h2>Key Numbers of the project</h2>

  {% assign wp_count = site.data.wps | size %}
  {% assign partner_count = site.data.consortium | size %}
  {% assign countries = site.data.consortium | map: "country" | uniq | size %}

  <div class="row mt-4">
      <div class="col-md-3">
          <div class="card text-center border-0 shadow-sm">
              <div class="card-body">
                  <h5 class="card-title">Duration in<br>months</h5>
                  <p class="display-4" ><span style=" color: #de1f36;">36</span></p>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <div class="card text-center border-0 shadow-sm">
              <div class="card-body">
                  <h5 class="card-title">Work<br>Packages</h5>
                  <p class="display-4"><span style=" color: #de1f36;">{{ wp_count }}</span></p>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <div class="card text-center border-0 shadow-sm">
              <div class="card-body">
                  <h5 class="card-title">Number of<br>Partners</h5>
                  <p class="display-4"><span style=" color: #de1f36;">{{ partner_count }}</span></p>
              </div>
          </div>
      </div>
      <div class="col-md-3">
          <div class="card text-center border-0 shadow-sm">
              <div class="card-body">
                  <h5 class="card-title">Number of<br>Countries</h5>
                  <p class="display-4"><span style=" color: #de1f36;">{{ countries }}</span></p>
              </div>
          </div>
      </div>
  </div>

  
  <h2 class="mb-4">Work Packages</h2>

The project is organized into six Work Packages, each addressing a critical aspect of the infrastructure's maturation and ERIC establishment.


  </div>
</div>
