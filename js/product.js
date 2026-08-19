document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(location.search).get("slug") || "baccarat-rouge-540";
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  document.title = `${product.name} — ESSENZA`; const box = document.querySelector("#product-detail");
  function renderDetail() {
    const sizes = App.state.mode === "wholesale" ? product.wholesaleSizes : product.retailSizes, keys=Object.keys(sizes), first=keys[0], favorite=App.state.favorites.includes(product.id);
    box.innerHTML = `<section class="product-detail container"><div class="breadcrumbs"><a href="index.html">Главная</a><span>—</span><a href="catalog.html">Каталог</a><span>—</span><b>${product.name}</b></div>
      <div class="product-detail__grid"><div class="product-gallery">${App.productVisual(product,true)}<span class="gallery-caption">Демонстрационная композиция · ${String(product.id).padStart(2,"0")}</span></div>
      <div class="product-info"><p class="product-brand">${product.brand}</p><h1>${product.name}</h1><div class="rating"><span>★★★★★</span> 4.9 · 186 впечатлений</div><p class="product-family">${product.family} · ${product.gender}</p><p class="product-description">${product.description}</p><div class="product-notes">${product.notes.map(n=>`<span>${n}</span>`).join("")}</div>
      <fieldset><legend>Выберите объём</legend><div class="detail-sizes">${keys.map((s,i)=>`<button class="${i===0?"is-active":""}" data-size="${s}">${App.formatSize(s)}</button>`).join("")}</div></fieldset>
      ${App.state.mode==="wholesale"?'<p class="minimum-note">Минимальный оптовый заказ: 15 000 ₽</p>':""}<div class="detail-price"><small>Демонстрационная цена</small><strong>${App.money(sizes[first])}</strong></div><div class="detail-actions"><button class="button button--dark add-detail">Добавить в корзину</button><button class="button button--line favorite-detail">${favorite?"Сохранено":"В избранное"} ♡</button></div><p class="delivery-note">Бесплатная доставка по Москве от 5 000 ₽ · Отправка за 1–2 дня</p></div></div></section>
      <section class="sound-section"><div class="container sound-grid"><div><p class="eyebrow">Впечатление</p><h2>Как звучит</h2><p>${product.description}</p><div class="occasion-tags"><span>День</span><span>Вечер</span>${product.season.map(s=>`<span>${s}</span>`).join("")}</div></div><div class="score-list">${[["Свежесть","fresh"],["Сладость","sweet"],["Древесность","wood"],["Шлейф","trail"],["Стойкость","lasting"]].map(([l,k])=>`<div><span>${l}</span><b>${product.scores[k]}%</b><i><em style="--score:${product.scores[k]}%"></em></i></div>`).join("")}</div></div></section>`;
    const sizeButtons=box.querySelectorAll(".detail-sizes button");sizeButtons.forEach(b=>b.onclick=()=>{sizeButtons.forEach(x=>x.classList.remove("is-active"));b.classList.add("is-active");box.querySelector(".detail-price strong").textContent=App.money(sizes[b.dataset.size])});
    box.querySelector(".add-detail").onclick=()=>App.addToCart(product.id,box.querySelector(".detail-sizes .is-active").dataset.size);
    box.querySelector(".favorite-detail").onclick=e=>{App.toggleFavorite(product.id);e.currentTarget.textContent=App.state.favorites.includes(product.id)?"Сохранено ♡":"В избранное ♡"};
  }
  renderDetail(); document.addEventListener("modechange",renderDetail);
  const related = PRODUCTS.filter(p=>p.id!==product.id).slice(0,4), comparisons=["Теплее","Слаще","Свежей","Темнее"];
  const rel=document.querySelector("#related-products"); rel.innerHTML=related.map((p,i)=>App.productCard(p,comparisons[i])).join("");App.bindProductCards(rel);
});
