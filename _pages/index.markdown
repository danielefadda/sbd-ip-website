---
layout: default
title: "SoBigData Implementation Phase"
permalink: /
show_sidetoc: false
header_type: image #,hero, base, post, hero,image, splash, sbd
header_img: assets/images/header_Logo_SoBigData_IP.svg
header_title: " "
---

<p class="lead">The <strong>SoBigData Implementation Phase (IP)</strong> project is a preparatory action under the European Strategy Forum on Research Infrastructures (ESFRI) roadmap, aimed at establishing SoBigData as a fully operational European Research Infrastructure (ERIC) for social data science and analytics.</p>

## Objectives

<div class="row mt-4">
    <div class="col-md-6 mb-3">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <p class="card-text mb-0"><span style="font-weight: bold; color: #de1f36;">1. </span>Strengthen the legal, financial, and operational maturity of the SoBigData infrastructure</p>
            </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <p class="card-text mb-0"><span style="font-weight: bold; color: #de1f36;">2. </span>Establish national nodes across European countries to ensure distributed access and governance</p>
            </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <p class="card-text mb-0"><span style="font-weight: bold; color: #de1f36;">3. </span>Prepare the formal submission for SoBigData ERIC registration</p>
            </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <p class="card-text mb-0"><span style="font-weight: bold; color: #de1f36;">4. </span>Build a sustainable governance structure for long-term operations</p>
            </div>
        </div>
    </div>
</div>

## Key Numbers

{% assign wp_count = site.data.wps | size %}
{% assign partner_count = site.data.consortium | size %}
{% assign countries = site.data.consortium | map: "country" | uniq | size %}

<div class="row mt-4">
    <div class="col-md-3">
        <div class="card text-center border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Duration in months</h5>
                <p class="display-4" ><span style=" color: #de1f36;">36</span></p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-center border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Work Packages</h5>
                <p class="display-4"><span style=" color: #de1f36;">{{ wp_count }}</span></p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-center border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Number of Partners</h5>
                <p class="display-4"><span style=" color: #de1f36;">{{ partner_count }}</span></p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-center border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Number of Countries</h5>
                <p class="display-4"><span style=" color: #de1f36;">{{ countries }}</span></p>
            </div>
        </div>
    </div>
</div>

## About SoBigData

SoBigData RI is a distributed, Pan-European, multi-disciplinary research infrastructure that uses social mining and big data to understand the complexity of our contemporary, globally interconnected society. The RI is built on a common “digital laboratory” of agreed services and tools. All RI services converge towards this unified vision, featuring a central entry point where users can navigate the catalog and access the RI gateway. The gateway provides researchers and practitioners a collaborative environment, promoting responsible open science practices. SoBigData represents a solid and trusted base for a vast community of data scientists and researchers. Currently, the RI provides tools to define projects and comply with EU requirements. SoBigData brings together researchers and research organizations that are independent of commercial interests and provides tools for data access as well as ethical and legal assessment with the consultancy of experts in a multi-disciplinary framework
