---
layout: default
title: "FAQ"
permalink: /faq/
partner: true
show_sidetoc: false
header_type: unipi  #,hero, base, post, hero,image, splash, sbd
header_img: assets/images/faq_final.jpg
header_title: " "

---

# Domande Frequenti (FAQ)

In questa sezione troverai le risposte alle domande più comuni riguardo al Master.<br> Se hai ulteriori dubbi o domande specifiche, non esitare a contattarci direttamente.

{% assign faq_categories = site.data.faq | group_by: "topic" %}

<div class="accordion" id="accordionFaq">
{% for category in faq_categories %}

<h2> {{ category.name }}</h2>
    {% for faq in category.items %}
    <div class="card mb-2">
        <div class="card-header" id="heading-{{category.name}}-{{ forloop.index }}">
            <div class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse-{{category.name}}-{{ forloop.index }}" aria-expanded="false" aria-controls="collapse-{{category.name}}-{{ forloop.index }}">
                <strong>{{ forloop.index }}. {{ faq.question }}</strong>
                </button>
            </div>
        </div>
        <div id="collapse-{{category.name}}-{{ forloop.index }}" class="collapse" aria-labelledby="heading-{{category.name}}-{{ forloop.index }}" data-parent="#accordionFaq">
            <div class="card-body">
            {{ faq.answer }}
            </div>
        </div>
    </div>
    {% endfor %}
{% endfor %}
</div>

<!-- Info Alert Section -->
<section class="info-alert-section">
        <div class="alert alert-primary mb-0">
            <div class="row">
                <div class="col-lg-12 mx-auto">
                    <h3 class="alert-heading">Hai ancora dubbi e domande?</h3>
                    <div>
                    <!-- Due pulsanti, uno per gli open day e uno per il chatbot, con link al chatbot -->
                    <a href="/index.html" class="btn btn-primary mr-2 mb-2">Partecipa agli Open Day il 14 luglio, il 22 settembre e il 13 ottobre</a>
                    <a href="https://chatgpt.com/g/g-6a045cabf44081919efdd0256a3492b4-sibylla-master" target="_blank" class="btn btn-secondary mb-2">Chiedi al nostro assistente virtuale</a>  

                    </div>
                </div>
            </div>
        </div>
</section>