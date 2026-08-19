const App = (() => {
  const KEYS = {cart: "essenza_cart", favorites: "essenza_favorites", mode: "essenza_mode"};
  const state = {
    cart: read(KEYS.cart, []), favorites: read(KEYS.favorites, []), mode: localStorage.getItem(KEYS.mode) || "retail"
  };
  const PRODUCT_ART = {
    1: "scent-saffron-amber.png", 2: "scent-citrus-cedar.png", 3: "scent-saffron-amber.png",
    4: "scent-dark-cherry.png", 5: "scent-saffron-amber.png", 6: "scent-citrus-cedar.png",
    7: "scent-citrus-cedar.png", 8: "scent-rose-musk.png", 9: "scent-saffron-amber.png",
    10: "scent-rose-musk.png", 11: "scent-citrus-cedar.png", 12: "scent-rose-musk.png"
  };

  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } }
  function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function money(value) { return new Intl.NumberFormat("ru-RU").format(value) + " ₽"; }
  function icon(name) {
    const paths = {
      search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>', heart: '<path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4a5.5 5.5 0 0 0 1-8.9Z"/>', bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>', menu: '<path d="M3 7h18M3 17h18"/>', close: '<path d="m5 5 14 14M19 5 5 19"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  }

  function renderShell() {
    const active = document.body.dataset.page;
    document.querySelector("#site-header").innerHTML = `<header class="site-header"><div class="site-header__inner">
      <button class="icon-button menu-toggle" aria-label="Открыть меню" aria-expanded="false">${icon("menu")}</button>
      <a class="logo" href="index.html" aria-label="ESSENZA, на главную">ESSENZA<small>PERFUME LIBRARY</small></a>
      <nav class="main-nav" aria-label="Основная навигация"><a class="${active === "catalog" ? "is-active" : ""}" href="catalog.html">Каталог</a><a href="catalog.html#brands">Бренды</a><a href="catalog.html?quick=new">Новинки</a><a href="catalog.html?quick=bestseller">Bestsellers</a><a class="${active === "wholesale" ? "is-active" : ""}" href="wholesale.html">Оптом</a></nav>
      <div class="header-actions"><div class="mode-toggle" aria-label="Режим покупки"><button data-mode="retail"><span class="mode-full">Розница</span><span class="mode-short">РОЗ</span></button><button data-mode="wholesale"><span class="mode-full">Опт</span><span class="mode-short">ОПТ</span></button></div><button class="icon-button search-toggle" aria-label="Поиск">${icon("search")}</button><button class="icon-button favorites-toggle" aria-label="Избранное">${icon("heart")}<span class="count favorite-count"></span></button><button class="icon-button cart-toggle" aria-label="Корзина">${icon("bag")}<span class="count cart-count"></span></button></div>
    </div><div class="wholesale-bar"><span>Оптовый режим</span><span>Минимальный заказ: 15 000 ₽</span><a href="wholesale.html">Условия и прайс →</a></div></header>`;
    document.querySelector("#site-footer").innerHTML = `<footer class="site-footer"><div class="container footer-grid"><div><a class="logo logo--footer" href="index.html">ESSENZA<small>PERFUME LIBRARY</small></a><p>Ровно столько аромата,<br>сколько нужно.</p></div><div><h2>Покупателям</h2><a href="catalog.html">Каталог</a><a href="wholesale.html">Оптовым клиентам</a><a href="#">Доставка</a><a href="#">Оплата</a></div><div><h2>Связаться</h2><a href="mailto:hello@essenza.demo">hello@essenza.demo</a><a href="#">Telegram</a><a href="#">ВКонтакте</a><a href="#">Контакты</a></div><div class="footer-subscribe"><h2>Письма о красивом</h2><p>Новые поступления и гиды по ароматам. Не чаще двух раз в месяц.</p><form data-subscribe><input type="email" required placeholder="Ваш email" aria-label="Ваш email"><button aria-label="Подписаться">→</button></form></div></div><div class="container footer-bottom"><span>© 2026 ESSENZA · Демо-проект</span><a href="#">Политика конфиденциальности</a><span>Цены демонстрационные</span></div></footer>`;
    document.querySelector("#ui-layer").innerHTML = `<div class="overlay" data-close-panels></div>
      <aside class="drawer cart-drawer" aria-label="Корзина" aria-hidden="true"><div class="drawer__head"><div><p class="eyebrow">Ваш выбор</p><h2>Корзина</h2></div><button class="icon-button drawer-close" aria-label="Закрыть">${icon("close")}</button></div><div class="drawer__body cart-body"></div><div class="drawer__footer cart-footer"></div></aside>
      <aside class="drawer favorites-drawer" aria-label="Избранное" aria-hidden="true"><div class="drawer__head"><div><p class="eyebrow">Сохранённое</p><h2>Избранное</h2></div><button class="icon-button drawer-close" aria-label="Закрыть">${icon("close")}</button></div><div class="drawer__body favorites-body"></div></aside>
      <div class="search-panel" role="dialog" aria-modal="true" aria-label="Поиск" aria-hidden="true"><button class="icon-button search-close" aria-label="Закрыть">${icon("close")}</button><div><p class="eyebrow">Поиск по библиотеке</p><label><span class="sr-only">Поиск</span><input id="global-search" type="search" placeholder="Попробуйте «вишня»" autocomplete="off"></label><div class="search-results"></div></div></div>
      <div class="toast" role="status" aria-live="polite"></div><div class="demo-modal" role="dialog" aria-modal="true" aria-hidden="true"><div><button class="icon-button modal-close" aria-label="Закрыть">${icon("close")}</button><p class="eyebrow">Демонстрационная форма</p><h2>Оставьте контакты</h2><p class="modal-subtitle">Мы свяжемся и расскажем подробнее.</p><form data-demo-form><input required placeholder="Ваше имя" aria-label="Ваше имя"><input required type="tel" placeholder="Телефон" aria-label="Телефон"><button class="button button--dark">Отправить заявку</button></form></div></div>`;
  }

  function productVisual(product, large = false) {
    return `<div class="product-visual product-visual--${product.image} ${large ? "product-visual--large" : ""}"><img class="product-visual__image" src="assets/images/${PRODUCT_ART[product.id]}" alt="Ольфакторная композиция для аромата ${product.name}" loading="lazy"><span class="visual-code">ESSENZA / ${String(product.id).padStart(2,"0")}</span></div>`;
  }

  function sizesFor(product) { return state.mode === "wholesale" ? product.wholesaleSizes : product.retailSizes; }
  function productCard(product, comparison = "") {
    comparison = typeof comparison === "string" ? comparison : "";
    const sizes = sizesFor(product), keys = Object.keys(sizes), first = keys[0], favorite = state.favorites.includes(product.id);
    return `<article class="product-card" data-product-id="${product.id}">
      <div class="product-card__visual"><a href="product.html?slug=${product.slug}" aria-label="${product.brand} ${product.name}">${productVisual(product)}</a><button class="favorite-button ${favorite ? "is-active" : ""}" aria-label="${favorite ? "Убрать из избранного" : "Добавить в избранное"}">${icon("heart")}</button>${product.new ? '<span class="product-badge">NEW</span>' : ""}</div>
      <div class="product-card__body">${comparison ? `<span class="comparison">${comparison}</span>` : ""}<p class="product-brand">${product.brand}</p><h3><a href="product.html?slug=${product.slug}">${product.name}</a></h3><p class="product-meta">${product.family} · ${product.gender}</p>
      <div class="size-selector" role="group" aria-label="Выберите объём">${keys.map((size,i)=>`<button class="${i===0?"is-active":""}" data-size="${size}">${formatSize(size)}</button>`).join("")}</div>
      <div class="product-card__buy"><div><small>Цена</small><strong class="card-price">${money(sizes[first])}</strong></div><button class="add-button" aria-label="Добавить ${product.name} в корзину">Добавить <span>＋</span></button></div></div></article>`;
  }
  function formatSize(size) { return Number(size) === 1000 ? "1 л" : `${size} мл`; }

  function bindProductCards(root = document) {
    root.querySelectorAll(".product-card").forEach(card => {
      const product = PRODUCTS.find(p => p.id === Number(card.dataset.productId));
      card.querySelectorAll(".size-selector button").forEach(button => button.addEventListener("click", () => {
        card.querySelectorAll(".size-selector button").forEach(b => b.classList.remove("is-active")); button.classList.add("is-active");
        card.querySelector(".card-price").textContent = money(sizesFor(product)[button.dataset.size]);
      }));
      card.querySelector(".add-button")?.addEventListener("click", () => addToCart(product.id, card.querySelector(".size-selector .is-active").dataset.size));
      card.querySelector(".favorite-button")?.addEventListener("click", e => { toggleFavorite(product.id); e.currentTarget.classList.toggle("is-active"); });
    });
  }

  function addToCart(productId, size, qty = 1) {
    const mode = state.mode, existing = state.cart.find(i => i.productId === productId && String(i.size) === String(size) && i.mode === mode);
    if (existing) existing.qty += qty; else state.cart.push({productId, size: String(size), mode, qty});
    save(KEYS.cart, state.cart); updateCounts(); renderCart(); showToast("Добавлено в корзину");
  }
  function removeCart(index) { state.cart.splice(index,1); save(KEYS.cart,state.cart); renderCart(); updateCounts(); }
  function changeQty(index, delta) { state.cart[index].qty += delta; if (state.cart[index].qty < 1) return removeCart(index); save(KEYS.cart,state.cart); renderCart(); updateCounts(); }
  function cartPrice(item) { const p = PRODUCTS.find(p=>p.id===item.productId); return (item.mode === "wholesale" ? p.wholesaleSizes : p.retailSizes)[item.size]; }
  function renderCart() {
    const body = document.querySelector(".cart-body"), footer = document.querySelector(".cart-footer"); if (!body) return;
    if (!state.cart.length) { body.innerHTML = '<div class="drawer-empty"><p>Здесь пока тихо.</p><span>Выберите аромат и подходящий объём.</span><a class="button button--dark" href="catalog.html">Перейти в каталог</a></div>'; footer.innerHTML=""; return; }
    body.innerHTML = state.cart.map((item,index)=>{ const p=PRODUCTS.find(p=>p.id===item.productId); return `<div class="cart-item">${productVisual(p)}<div><p>${p.brand}</p><h3>${p.name}</h3><span>${formatSize(item.size)} · ${item.mode === "wholesale" ? "Опт" : "Розница"}</span><div class="qty"><button data-qty="-1" data-index="${index}">−</button><b>${item.qty}</b><button data-qty="1" data-index="${index}">＋</button></div></div><div><strong>${money(cartPrice(item)*item.qty)}</strong><button class="remove-item" data-remove="${index}">Удалить</button></div></div>`;}).join("");
    const total=state.cart.reduce((sum,item)=>sum+cartPrice(item)*item.qty,0); footer.innerHTML=`<div><span>Итого</span><strong>${money(total)}</strong></div><button class="button button--dark button--full" data-checkout>Оформить заказ</button><small>Демо-витрина: оплата не производится</small>`;
    body.querySelectorAll("[data-qty]").forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.index),Number(b.dataset.qty))); body.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>removeCart(Number(b.dataset.remove)));
    footer.querySelector("[data-checkout]").onclick=()=>openModal("Оформление заказа");
  }
  function toggleFavorite(id) { state.favorites = state.favorites.includes(id) ? state.favorites.filter(x=>x!==id) : [...state.favorites,id]; save(KEYS.favorites,state.favorites); updateCounts(); renderFavorites(); showToast(state.favorites.includes(id)?"Сохранено в избранное":"Удалено из избранного"); }
  function renderFavorites(){ const box=document.querySelector(".favorites-body"); if(!box)return; const list=PRODUCTS.filter(p=>state.favorites.includes(p.id)); box.innerHTML=list.length?list.map(p=>`<a class="favorite-item" href="product.html?slug=${p.slug}">${productVisual(p)}<span><small>${p.brand}</small><strong>${p.name}</strong><em>от ${money(Object.values(p.retailSizes)[0])}</em></span></a>`).join(""):'<div class="drawer-empty"><p>Список пуст.</p><span>Нажмите на сердце у аромата, чтобы сохранить его.</span></div>'; }
  function updateCounts(){ const count=state.cart.reduce((s,i)=>s+i.qty,0); document.querySelectorAll(".cart-count").forEach(e=>{e.textContent=count||"";e.hidden=!count}); document.querySelectorAll(".favorite-count").forEach(e=>{e.textContent=state.favorites.length||"";e.hidden=!state.favorites.length}); }
  function setMode(mode, rerender = true) {
    state.mode=mode; localStorage.setItem(KEYS.mode,mode); document.documentElement.dataset.mode=mode;
    document.querySelectorAll("button[data-mode]").forEach(b=>b.classList.toggle("is-active",b.dataset.mode===mode));
    document.querySelectorAll(".mode-sizes").forEach(e=>e.textContent=mode==="wholesale"?"100 · 250 · 500 мл · 1 л":"2 · 5 · 10 · 20 · 30 · 50 мл");
    if(rerender) document.dispatchEvent(new CustomEvent("modechange",{detail:{mode}}));
  }
  function openPanel(selector){ closePanels(); document.querySelector(selector).classList.add("is-open"); document.querySelector(selector).setAttribute("aria-hidden","false"); document.querySelector(".overlay").classList.add("is-open"); document.body.classList.add("no-scroll"); }
  function closePanels(){ document.querySelectorAll(".drawer,.search-panel,.demo-modal").forEach(e=>{e.classList.remove("is-open");e.setAttribute("aria-hidden","true")}); document.querySelector(".overlay")?.classList.remove("is-open"); document.body.classList.remove("no-scroll"); }
  function showToast(text){ const t=document.querySelector(".toast"); t.textContent=text;t.classList.add("is-showing");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("is-showing"),2200); }
  function openModal(title){ const modal=document.querySelector(".demo-modal");modal.querySelector("h2").textContent=title;openPanel(".demo-modal"); }
  function runSearch(query){ const q=query.trim().toLocaleLowerCase("ru"); if(!q)return[]; return PRODUCTS.filter(p=>[p.name,p.brand,p.family,p.notes.join(" ")].join(" ").toLocaleLowerCase("ru").includes(q)); }
  function bindShell(){
    document.querySelectorAll("button[data-mode]").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
    document.querySelector(".cart-toggle").onclick=()=>{renderCart();openPanel(".cart-drawer")}; document.querySelector(".favorites-toggle").onclick=()=>{renderFavorites();openPanel(".favorites-drawer")};
    document.querySelector(".search-toggle").onclick=()=>{openPanel(".search-panel");setTimeout(()=>document.querySelector("#global-search").focus(),100)};
    document.querySelectorAll(".drawer-close,.search-close,.modal-close,[data-close-panels]").forEach(b=>b.onclick=closePanels); document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanels()});
    document.querySelector(".menu-toggle").onclick=e=>{document.querySelector(".main-nav").classList.toggle("is-open");e.currentTarget.classList.toggle("is-active");e.currentTarget.setAttribute("aria-expanded",e.currentTarget.classList.contains("is-active"));e.currentTarget.innerHTML=icon(e.currentTarget.classList.contains("is-active")?"close":"menu")};
    document.querySelector("#global-search").oninput=e=>{const box=document.querySelector(".search-results"), results=runSearch(e.target.value); box.innerHTML=e.target.value?(results.length?results.slice(0,6).map(p=>`<a href="product.html?slug=${p.slug}">${productVisual(p)}<span><small>${p.brand}</small><strong>${p.name}</strong><em>${p.notes.slice(0,3).join(" · ")}</em></span></a>`).join(""):'<p class="search-empty">Ничего не нашли. Попробуйте другой запрос.</p>'):"";};
    document.querySelectorAll("[data-demo-modal]").forEach(b=>b.onclick=()=>openModal(b.dataset.demoModal)); document.querySelector("[data-demo-form]").onsubmit=e=>{e.preventDefault();closePanels();showToast("Заявка принята — это демо")};
    document.querySelector("[data-subscribe]").onsubmit=e=>{e.preventDefault();e.currentTarget.reset();showToast("Спасибо за подписку")};
  }
  function initHome(){ const rail=document.querySelector("#bestsellers");if(!rail)return;rail.innerHTML=PRODUCTS.slice(0,8).map(productCard).join("");bindProductCards(rail);document.querySelector("#mood-grid").innerHTML=Object.entries(MOOD_LABELS).map(([m,d],i)=>`<a href="catalog.html?mood=${encodeURIComponent(m)}"><span>0${i+1}</span><h3>${m}</h3><p>${d}</p><b>→</b></a>`).join(""); document.querySelector("[data-set-cart]").onclick=()=>{[1,5,4,12,11].forEach(id=>addToCart(id,"2"));openPanel(".cart-drawer")}; }
  function initMotion(){
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems=document.querySelectorAll("main>section:not(.hero),.section-heading,.product-card,.mood-grid>a,.business-benefits>article");
    if(!reduced&&"IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-revealed");observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:"0px 0px -5%"});revealItems.forEach(el=>{el.classList.add("motion-reveal");observer.observe(el)})}else revealItems.forEach(el=>el.classList.add("is-revealed"));
    const hero=document.querySelector(".hero");if(hero&&!reduced&&window.matchMedia("(pointer:fine)").matches){hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty("--mx",`${x*24}px`);hero.style.setProperty("--my",`${y*18}px`);hero.style.setProperty("--cx",`${e.clientX-r.left}px`);hero.style.setProperty("--cy",`${e.clientY-r.top}px`)},{passive:true});hero.addEventListener("pointerleave",()=>{hero.style.setProperty("--mx","0px");hero.style.setProperty("--my","0px")})}
    document.querySelectorAll(".product-rail").forEach(rail=>{let down=false,startX=0,startScroll=0;rail.addEventListener("pointerdown",e=>{if(e.target.closest("button,a"))return;down=true;startX=e.clientX;startScroll=rail.scrollLeft;rail.setPointerCapture(e.pointerId);rail.classList.add("is-dragging")});rail.addEventListener("pointermove",e=>{if(down)rail.scrollLeft=startScroll-(e.clientX-startX)});rail.addEventListener("pointerup",()=>{down=false;rail.classList.remove("is-dragging")})});
  }
  function init(){ renderShell();setMode(state.mode,false);bindShell();updateCounts();renderCart();renderFavorites();initHome();requestAnimationFrame(initMotion);document.addEventListener("modechange",()=>{document.querySelectorAll(".product-rail,.product-grid").forEach(grid=>{if(!grid.id||grid.id==="bestsellers"){const ids=[...grid.querySelectorAll(".product-card")].map(c=>Number(c.dataset.productId));if(ids.length){grid.innerHTML=ids.map(id=>productCard(PRODUCTS.find(p=>p.id===id))).join("");bindProductCards(grid)}}})}); }
  document.addEventListener("DOMContentLoaded",init);
  return {state,money,formatSize,productVisual,productCard,bindProductCards,addToCart,toggleFavorite,setMode,runSearch,openModal,showToast};
})();
