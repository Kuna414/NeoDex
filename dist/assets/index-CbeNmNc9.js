(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const r=document.querySelector("#app"),b="/NeoDex/data/pokemon.json",S="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",d={readSet(e){try{return new Set(JSON.parse(localStorage.getItem(e)||"[]"))}catch{return new Set}},writeSet(e,s){localStorage.setItem(e,JSON.stringify([...s]))}},t={pokemon:[],route:location.hash.slice(1)||"home",query:"",generation:"",filter:"all",seen:d.readSet("neodex-seen"),caught:d.readSet("neodex-caught"),shiny:d.readSet("neodex-shiny"),favorites:d.readSet("neodex-favorites")},f=e=>String(e??"").toLocaleLowerCase("de").replace(/ß/g,"ss").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9♀♂]+/g," ").trim();function m(e){return`${S}/${e}.png`}function h(e){location.hash=e}function v(){d.writeSet("neodex-seen",t.seen),d.writeSet("neodex-caught",t.caught),d.writeSet("neodex-shiny",t.shiny),d.writeSet("neodex-favorites",t.favorites)}function g(e){return`<header class="page-head"><div><button class="back" data-back>‹ Startseite</button><h1>${e}</h1></div><span class="result-count" data-count></span></header>`}function p(){var e;(e=r.querySelector("[data-back]"))==null||e.addEventListener("click",()=>h(""))}function $(){const e=t.pokemon.reduce((s,i)=>{var o;return s+(((o=i.changes)==null?void 0:o.length)||0)},0);r.innerHTML=`
    <main class="app">
      <section class="top">
        <div class="brand"><div class="mark">🦉</div><div><h1>NeoDex</h1><p>HeartGold Generations 2.0</p></div></div>
        <div><button class="settings" aria-label="Einstellungen">⚙</button><div class="build">HGG 2.0<br>Build 2.0.1</div></div>
      </section>

      <section class="hero">
        <h2>Willkommen zurück.</h2>
        <p class="welcome">Schön, dass du wieder da bist.</p>
        <div class="owl" aria-hidden="true"><div class="branch"></div><div class="body"></div><div class="head"><div class="ear l"></div><div class="ear r"></div><div class="brow l"></div><div class="brow r"></div><div class="eye l"></div><div class="eye r"></div><div class="beak"></div></div></div>
        <div class="stats">
          <div class="stat"><div class="round">◉</div><div><span>Dein Fortschritt</span><strong>${t.seen.size} / 1.025</strong><span>gesehen</span></div></div>
          <div class="stat"><div class="round">☆</div><div><span>Favoriten</span><strong>${t.favorites.size}</strong></div></div>
        </div>
      </section>

      <section class="tiles">
        <button class="tile" data-route="pokedex"><div class="tile-icon">⌕</div><div><h3>Pokédex</h3><p>Deutsch und Englisch durchsuchen.</p></div><div class="chev">›</div></button>
        <button class="tile" data-route="routedex"><div class="tile-icon">⌖</div><div><h3>RouteDex</h3><p>Fundorte nach Route und Methode.</p></div><div class="chev">›</div></button>
        <button class="tile" data-route="caught"><div class="tile-icon">◉</div><div><h3>Gefangen</h3><p>Deine gesamte Sammlung.</p></div><div class="chev">›</div></button>
        <button class="tile" data-route="favorites"><div class="tile-icon">☆</div><div><h3>Favoriten</h3><p>Schneller Zugriff auf deine Favoriten.</p></div><div class="chev">›</div></button>
      </section>

      <section class="summary">
        <div class="sum"><strong>${t.seen.size} / 1025</strong><span>Pokédex</span><div class="bar"><i style="width:${t.seen.size/1025*100}%"></i></div></div>
        <div class="sum"><strong>0 %</strong><span>RouteDex</span><div class="bar"><i style="width:0%"></i></div></div>
        <div class="sum"><strong>${e}</strong><span>HGG-Änderungen</span><div class="bar"><i style="width:100%"></i></div></div>
      </section>
    </main>`,r.querySelector(".settings").addEventListener("click",()=>h("settings")),r.querySelectorAll("[data-route]").forEach(s=>s.addEventListener("click",()=>h(s.dataset.route)))}function k(e){const s=f(t.query),i=e||t.filter;return t.pokemon.filter(o=>{var u;const n=!s||f(`${o.id} ${String(o.id).padStart(4,"0")} ${o.de} ${o.en}`).includes(s),a=!t.generation||String(o.gen)===t.generation,c=i==="all"||i==="changed"&&((u=o.changes)==null?void 0:u.length)||i==="seen"&&t.seen.has(o.id)||i==="caught"&&t.caught.has(o.id)||i==="shiny"&&t.shiny.has(o.id)||i==="favorites"&&t.favorites.has(o.id);return n&&a&&c})}function w(e){var i;const s=[(i=e.changes)!=null&&i.length?`<span class="mini-badge changed">${e.changes.length} HGG</span>`:"",t.caught.has(e.id)?'<span class="mini-badge caught">✓ Gefangen</span>':"",t.shiny.has(e.id)?'<span class="mini-badge shiny">✦ Shiny</span>':""].join("");return`
    <article class="pokemon-card" data-id="${e.id}">
      <button class="favorite ${t.favorites.has(e.id)?"on":""}" data-favorite="${e.id}" aria-label="Favorit">★</button>
      <span class="dex-number">#${String(e.id).padStart(4,"0")}</span>
      <img loading="lazy" src="${m(e.id)}" alt="${e.de}" onerror="this.classList.add('image-error')">
      <h2>${e.de}</h2>
      <p>${e.en}</p>
      <div class="card-badges">${s}</div>
    </article>`}function l(e=null,s="Pokédex"){e&&(t.filter=e);const i=k(e);r.innerHTML=`
    <main class="app page">
      ${g(s)}
      <section class="dex-controls">
        <label class="search-wrap"><span>⌕</span><input class="search" value="${t.query.replace(/"/g,"&quot;")}" type="search" placeholder="Deutsch, Englisch oder Nummer suchen …"></label>
        <div class="filters">
          <select data-generation>
            <option value="">Alle Generationen</option>
            ${Array.from({length:9},(n,a)=>`<option value="${a+1}" ${t.generation===String(a+1)?"selected":""}>Generation ${a+1}</option>`).join("")}
          </select>
          <select data-filter>
            <option value="all" ${t.filter==="all"?"selected":""}>Alle Pokémon</option>
            <option value="changed" ${t.filter==="changed"?"selected":""}>HGG-Änderungen</option>
            <option value="seen" ${t.filter==="seen"?"selected":""}>Gesehen</option>
            <option value="caught" ${t.filter==="caught"?"selected":""}>Gefangen</option>
            <option value="shiny" ${t.filter==="shiny"?"selected":""}>Shiny</option>
            <option value="favorites" ${t.filter==="favorites"?"selected":""}>Favoriten</option>
          </select>
        </div>
      </section>
      <section class="pokemon-grid">${i.length?i.map(w).join(""):'<div class="empty">Keine Pokémon gefunden.</div>'}</section>
    </main>
    <dialog class="detail-dialog"><div class="detail-content"></div></dialog>`,p(),r.querySelector("[data-count]").textContent=`${i.length} / 1.025`,r.querySelector(".search").addEventListener("input",n=>{t.query=n.target.value,l(e,s),requestAnimationFrame(()=>{var a;return(a=r.querySelector(".search"))==null?void 0:a.focus()})}),r.querySelector("[data-generation]").addEventListener("change",n=>{t.generation=n.target.value,l(e,s)}),r.querySelector("[data-filter]").addEventListener("change",n=>{t.filter=n.target.value,l(null,"Pokédex")}),r.querySelectorAll("[data-favorite]").forEach(n=>n.addEventListener("click",a=>{a.stopPropagation();const c=Number(n.dataset.favorite);t.favorites.has(c)?t.favorites.delete(c):t.favorites.add(c),v(),l(e,s)})),r.querySelectorAll(".pokemon-card").forEach(n=>n.addEventListener("click",()=>x(Number(n.dataset.id))))}function x(e){var n;const s=t.pokemon.find(a=>a.id===e);if(!s)return;t.seen.add(e),v();const i=r.querySelector(".detail-dialog"),o=(n=s.changes)!=null&&n.length?`<section class="detail-section"><h3>HGG 2.0 Änderungen</h3>${s.changes.map(a=>`<div class="change"><strong>${a.category}</strong><p>${a.detail}</p></div>`).join("")}</section>`:"";i.querySelector(".detail-content").innerHTML=`
    <header class="detail-head"><button class="close" data-close>×</button><span>#${String(e).padStart(4,"0")}</span></header>
    <img class="detail-art" src="${m(e)}" alt="${s.de}">
    <h2>${s.de}</h2><p class="detail-en">${s.en}</p>
    <div class="detail-actions">
      <button data-action="caught">${t.caught.has(e)?"✓ Gefangen":"○ Als gefangen"}</button>
      <button data-action="shiny">${t.shiny.has(e)?"✦ Shiny":"◇ Als Shiny"}</button>
      <button data-action="favorite">${t.favorites.has(e)?"★ Favorit":"☆ Favorit"}</button>
    </div>
    ${o}
    <section class="detail-section"><p>Weitere Detaildaten, Typen, Fähigkeiten, Entwicklungen und Attacken folgen im nächsten Schritt.</p></section>`,i.querySelector("[data-close]").addEventListener("click",()=>i.close()),i.querySelectorAll("[data-action]").forEach(a=>a.addEventListener("click",()=>{const c=a.dataset.action,u=c==="favorite"?t.favorites:c==="caught"?t.caught:t.shiny;u.has(e)?u.delete(e):u.add(e),(c==="caught"||c==="shiny")&&t.seen.add(e),c==="shiny"&&t.caught.add(e),v(),i.close(),l(t.filter==="caught"||t.filter==="favorites"?t.filter:null,t.filter==="caught"?"Gefangen":t.filter==="favorites"?"Favoriten":"Pokédex")})),i.showModal()}function L(e,s){r.innerHTML=`<main class="app page">${g(e)}<section class="card"><p>${s}</p></section></main>`,p()}function q(){r.innerHTML=`<main class="app page">${g("Einstellungen")}<section class="card settings-card"><h2>Sprache</h2><label>App-Sprache<select><option>Deutsch</option><option>English</option></select></label><p>Die Umschaltung wird in einem kommenden Sprint vollständig angebunden.</p></section></main>`,p()}function y(){const e=location.hash.slice(1);if(e==="pokedex")return l(null,"Pokédex");if(e==="caught")return l("caught","Gefangen");if(e==="favorites")return l("favorites","Favoriten");if(e==="routedex")return L("RouteDex","RouteDex wird als nächstes Datenmodul ergänzt.");if(e==="settings")return q();$()}async function E(){try{const e=await fetch(b);if(!e.ok)throw new Error("Pokémon-Daten konnten nicht geladen werden.");t.pokemon=await e.json(),y()}catch(e){r.innerHTML=`<main class="app page"><section class="card"><h1>NeoDex konnte nicht starten</h1><p>${e.message}</p></section></main>`}}addEventListener("hashchange",y);E();
