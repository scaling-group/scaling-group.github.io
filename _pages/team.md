---
title: "Scaling Group: Team"
layout: gridlay
excerpt: "Scaling Group: Team"
sitemap: false
permalink: /team/
---

## Principle Investigator

{% assign number_printed = 0 %}
{% for member in site.data.team_pi %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-10 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/members/{{ member.photo }}" class="img-responsive" width="18%" style="float: left" alt="{{ member.name }}" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.info }}<br>
  email: {{ member.email }}<br>
  office: {{ member.office }}
  </i>
  <ul style="overflow: hidden">


  {% if member.number_educ == 4 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  {% endif %}

  {% if member.number_educ == 5 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  <li> {{ member.education5 }} </li>
  {% endif %}

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}


## Current Members
{% assign number_printed = 0 %}
{% for member in site.data.team_current %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix" markdown="0">
  {% if member.photo_style == "cover" %}
  <div class="team-member-photo-frame">
    <img src="{{ site.url }}{{ site.baseurl }}/images/members/{{ member.photo }}" class="img-responsive team-member-photo" alt="{{ member.name }}" />
  </div>
  {% else %}
  <img src="{{ site.url }}{{ site.baseurl }}/images/members/{{ member.photo }}" class="img-responsive" width="30%" style="float: left" alt="{{ member.name }}" />
  {% endif %}
  <div class="team-member-header">
    <h4>{{ member.name }}</h4>
    {% if member.github or member.website %}
    <div class="team-member-links">
      {% if member.github %}
      <a class="team-member-link" href="{{ member.github }}" target="_blank" rel="noopener noreferrer" aria-label="{{ member.name }} GitHub">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49C4 14.09 3.48 13.23 3.32 12.77c-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.67 7.67 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"></path>
        </svg>
      </a>
      {% endif %}
      {% if member.website %}
      <a class="team-member-link" href="{{ member.website }}" target="_blank" rel="noopener noreferrer" aria-label="{{ member.name }} website">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm5.93 7H11.9a12.7 12.7 0 0 0-1.17-4.22A6.53 6.53 0 0 1 13.93 7ZM8 1.56c.8 1 1.5 2.93 1.84 5.44H6.16C6.5 4.49 7.2 2.56 8 1.56ZM5.27 2.78A12.7 12.7 0 0 0 4.1 7H2.07a6.53 6.53 0 0 1 3.2-4.22ZM1.56 8c0-.17.01-.33.03-.5H4c-.02.16-.02.33-.02.5 0 .17 0 .34.02.5H1.6A6.56 6.56 0 0 1 1.56 8Zm.51 1.5H4.1a12.7 12.7 0 0 0 1.17 4.22A6.53 6.53 0 0 1 2.07 9.5ZM8 14.44c-.8-1-1.5-2.93-1.84-5.44h3.68c-.34 2.51-1.04 4.44-1.84 5.44Zm2.73-.72A12.7 12.7 0 0 0 11.9 9.5h2.03a6.53 6.53 0 0 1-3.2 4.22ZM12 8.5c.02-.16.02-.33.02-.5 0-.17 0-.34-.02-.5h2.4c.02.17.03.33.03.5 0 .17-.01.33-.03.5H12Z"></path>
        </svg>
      </a>
      {% endif %}
    </div>
    {% endif %}
  </div>
  <i>{{ member.info }}</i>
  <ul style="overflow: hidden">
  {% if member.number_educ == 1 %}
  <li> {{ member.education1 }} </li>
  {% endif %}

  {% if member.number_educ == 2 %}
  <li> {{ member.education1 | markdownify}} </li>
  <li> {{ member.education2 | markdownify}} </li>
  {% endif %}

  {% if member.number_educ == 3 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  {% endif %}

  {% if member.number_educ == 4 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  {% endif %}

  {% if member.number_educ == 5 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  <li> {{ member.education5 }} </li>
  {% endif %}

  {% if member.research %}
  <li> Research interest: {{ member.research }} </li>
  {% endif %}

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}


<!--

## Alumni

{% assign number_printed = 0 %}
{% for member in site.data.alumni_members %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/members/{{ member.photo }}" class="img-responsive" width="30%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.duration }} <br> Role: {{ member.info }}</i>
  <ul style="overflow: hidden">

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}


## Former visitors, BSc/ MSc students
<div class="row">

<div class="col-sm-4 clearfix">
<h4>Visitors</h4>
{% for member in site.data.alumni_visitors %}
{{ member.name }}
{% endfor %}
</div>

<div class="col-sm-4 clearfix">
<h4>Master students</h4>
{% for member in site.data.alumni_msc %}
{{ member.name }}
{% endfor %}
</div>

<div class="col-sm-4 clearfix">
<h4>Bachelor Students</h4>
{% for member in site.data.alumni_bsc %}
{{ member.name }}
{% endfor %}
</div>

</div> 

-->

