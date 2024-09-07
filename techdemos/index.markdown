---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: Tech Demos
layout: default
---
# {{ page.title | default: site.title }}

<div id="post-list" class="flex-grow-1 px-xl-1">
  <article class="card-wrapper card">
    <a href="encode" class="post-preview row g-0 flex-md-row-reverse">
      {% assign card_body_col = '12' %}
      {% assign image = '/assets/img/previews/encode.png' %}
      {% if image %}
        {% assign src = image %}
        {% assign alt = 'Preview Image' %}
        <div class="col-md-5">
          <img src="{{ src }}" alt="{{ alt }}" {{ lqip }}>
        </div>
        {% assign card_body_col = '7' %}
      {% endif %}
      <div class="col-md-{{ card_body_col }}">
        <div class="card-body d-flex flex-column">
          <h1 class="card-title my-2 mt-md-0">Encoder/Decoder</h1>
          <div class="card-text content mt-0 mb-3">
            <p>Encode and decode text with various encodings.</p>
          </div>
        </div>
      </div>
    </a>
  </article>

  <article class="card-wrapper card">
    <a href="https://ghluka.github.io/First-Unity-Game/" class="post-preview row g-0 flex-md-row-reverse">
      {% assign card_body_col = '12' %}
      {% assign image = '/assets/img/previews/game.png' %}
      {% if image %}
        {% assign src = image %}
        {% assign alt = 'Preview Image' %}
        <div class="col-md-5">
          <img src="{{ src }}" alt="{{ alt }}" {{ lqip }}>
        </div>
        {% assign card_body_col = '7' %}
      {% endif %}
      <div class="col-md-{{ card_body_col }}">
        <div class="card-body d-flex flex-column">
          <h1 class="card-title my-2 mt-md-0">First Unity Game</h1>
          <div class="card-text content mt-0 mb-3">
            <p>Parkour game based off that one famous voxel game involving mining and crafting.</p>
          </div>
        </div>
      </div>
    </a>
  </article>
</div>

