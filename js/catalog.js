document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#catalog-grid");
  const controls = {
    search: document.querySelector("#catalog-search"), family: document.querySelector("#family-filter"), note: document.querySelector("#note-filter"),
    season: document.querySelector("#season-filter"), price: document.querySelector("#price-filter"), sort: document.querySelector("#sort-products")
  };
  let quick = "all";
  const params = new URLSearchParams(location.search);
  const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
  document.querySelector("#brand-filters").innerHTML = brands.map(b => `<label><input type="checkbox" name="brand" value="${b}"> ${b}</label>`).join("");

  if (params.get("quick")) quick = params.get("quick");
  if (params.get("family")) controls.family.value = params.get("family");
  if (params.get("note")) controls.note.value = params.get("note");
  if (params.get("mood")) document.body.dataset.mood = params.get("mood");
  document.querySelectorAll("[data-quick]").forEach(b => b.classList.toggle("is-active", b.dataset.quick === quick));

  function getChecked(name) { return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x => x.value); }
  function render() {
    const q = controls.search.value.trim().toLocaleLowerCase("ru"), note = controls.note.value.trim().toLocaleLowerCase("ru"), family = controls.family.value.toLocaleLowerCase("ru"), genders = getChecked("gender"), selectedBrands = getChecked("brand"), mood = document.body.dataset.mood;
    let products = PRODUCTS.filter(p => {
      const haystack = [p.name,p.brand,p.family,p.notes.join(" ")].join(" ").toLocaleLowerCase("ru");
      const minPrice = Math.min(...Object.values(App.state.mode === "wholesale" ? p.wholesaleSizes : p.retailSizes));
      return (!q || haystack.includes(q)) && (!note || p.notes.join(" ").toLocaleLowerCase("ru").includes(note)) && (!family || p.family.toLocaleLowerCase("ru").includes(family)) && (!genders.length || genders.includes(p.gender)) && (!selectedBrands.length || selectedBrands.includes(p.brand)) && (!controls.season.value || p.season.includes(controls.season.value)) && (!mood || p.moods.includes(mood)) && minPrice <= Number(controls.price.value) && (quick === "all" || (quick === "new" && p.new) || (quick === "bestseller" && p.bestseller) || (quick === "niche" && p.niche));
    });
    const priceOf = p => Math.min(...Object.values(App.state.mode === "wholesale" ? p.wholesaleSizes : p.retailSizes));
    if (controls.sort.value === "low") products.sort((a,b)=>priceOf(a)-priceOf(b));
    if (controls.sort.value === "high") products.sort((a,b)=>priceOf(b)-priceOf(a));
    if (controls.sort.value === "name") products.sort((a,b)=>a.name.localeCompare(b.name));
    grid.innerHTML = products.map(App.productCard).join(""); App.bindProductCards(grid);
    document.querySelector("#result-count").textContent = products.length; document.querySelector("#empty-state").hidden = products.length > 0;
    const count = selectedBrands.length + genders.length + Boolean(family) + Boolean(note) + Boolean(controls.season.value) + (quick !== "all"); document.querySelector("#filter-count").textContent = count ? `· ${count}` : "";
    document.querySelector("#price-output").textContent = App.money(Number(controls.price.value));
  }
  function reset() { quick="all"; document.body.dataset.mood=""; document.querySelectorAll(".filters input[type=checkbox]").forEach(x=>x.checked=false); Object.values(controls).forEach(c=>{if(c?.tagName==="INPUT")c.value=c.type==="range"?c.max:"";else if(c?.tagName==="SELECT")c.selectedIndex=0});document.querySelectorAll("[data-quick]").forEach(b=>b.classList.toggle("is-active",b.dataset.quick==="all"));render(); }
  document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>{quick=b.dataset.quick;document.querySelectorAll("[data-quick]").forEach(x=>x.classList.toggle("is-active",x===b));render()});
  document.querySelectorAll(".filters input,.filters select,#sort-products").forEach(el=>el.addEventListener(el.type==="search"?"input":"change",render)); controls.price.addEventListener("input",render);
  document.querySelector("#reset-filters").onclick=reset;document.querySelector("#empty-reset").onclick=reset;
  const filters=document.querySelector("#filters"), overlay=document.querySelector(".overlay"); document.querySelector(".filter-open").onclick=()=>{filters.classList.add("is-open");overlay.classList.add("is-open");document.body.classList.add("no-scroll")};document.querySelectorAll(".filter-close").forEach(b=>b.onclick=()=>{filters.classList.remove("is-open");overlay.classList.remove("is-open");document.body.classList.remove("no-scroll")});
  document.addEventListener("modechange",()=>{controls.price.max=App.state.mode==="wholesale"?150000:13000;controls.price.value=controls.price.max;render()});
  if(App.state.mode==="wholesale"){controls.price.max=150000;controls.price.value=150000;} render();
});
