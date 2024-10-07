---
title: "Scaling Group: News"
layout: textlay
excerpt: "Scaling Group: News"
sitemap: false
permalink: /news.html
---

# News

{% for article in site.data.news %}
{{ article.date }} <br> {{ article.headline}}
{% endfor %}
