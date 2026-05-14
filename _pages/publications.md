---
title: "Scaling Group: Publications"
layout: gridlay
excerpt: "Scaling Group: Publications"
sitemap: false
permalink: /publications/
---

## Highlights

<!-- **At the end of this page, you can find the [full list of publications](#full-list-of-publications)** -->

{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if publi.highlight == 1 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-11 clearfix">
<div class="well">
<pubtit>{{ publi.title }}</pubtit>
<div class="publication-highlight" markdown="0">
  <div class="publication-highlight__media">
    <img src="{{ site.url }}{{ site.baseurl }}/images/papers/{{ publi.image }}" class="img-responsive publication-highlight__image" />
    {% if publi.image2 %}
    <img src="{{ site.url }}{{ site.baseurl }}/images/papers/{{ publi.image2 }}" class="img-responsive publication-highlight__image" />
    {% endif %}
  </div>
  <div class="publication-highlight__body">
    <div class="publication-highlight__main">
      <p>{{ publi.description }}</p>
      <p class="publication-highlight__authors"><em>{{ publi.authors }}</em></p>
    </div>
    <p class="publication-highlight__link">
      <strong><a href="{{ publi.link.url }}">{{ publi.link.display }}</a></strong>
      {% if publi.github %} / <strong><a href="{{ publi.github }}">GitHub</a></strong>{% endif %}
    </p>
    <p class="text-danger"><strong>{{ publi.news1 }}</strong></p>
    <p>{{ publi.news2 }}</p>
  </div>
</div>
</div>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}




## Full List

<sup>*</sup> Equal contribution &nbsp;&nbsp; <sup>†</sup> Corresponding author

{% for publi in site.data.publist %}

  {{ publi.title }} <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>{% if publi.github %} / <a href="{{ publi.github }}">GitHub</a>{% endif %}

{% endfor %}

<p> &nbsp; </p>
