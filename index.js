import{a as g}from"./assets/vendor-D_T3ErsI.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const b="https://furniture-store-v2.b.goit.study/api",y=g.create({baseURL:b,headers:{"Content-Type":"application/json"}});async function L(r=1,t=30,n){try{let i=`/furnitures?page=${r}&limit=${t}`;return n&&n!=="all"&&(i+=`&category=${encodeURIComponent(n)}`),(await y.get(i)).data}catch(i){throw console.error("Ошибка запроса мебели:",i),i}}async function v(){try{return(await y.get("/categories")).data}catch(r){throw console.error("Ошибка запроса категорий:",r),r}}const l=document.querySelector(".filter-list"),p=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function $(r){if(!l)return console.error("Контейнер для фильтров не найден!");try{const t=await v();let n=`
      <li class="filter-item">
        <button class="filter-btn ${p[0]} active" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((e,o)=>{const s=p[o+1]||"";n+=`
        <li class="filter-item">
          <button class="filter-btn ${s}" data-category-id="${e._id}">
            ${e.name}
          </button>
        </li>
      `}),l.innerHTML=n;const i=l.querySelectorAll(".filter-btn");i.forEach(e=>{e.addEventListener("click",()=>{const o=e.dataset.categoryId;r&&r(o||void 0),i.forEach(s=>s.classList.remove("active")),e.classList.add("active")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const f=document.querySelector(".card-list"),a=document.querySelector(".more-btn");let u=[],c=0;const d=8;async function w(){return f?(await m(void 0),a&&a.addEventListener("click",()=>S()),{setCategory:m}):console.error("Контейнер для карточек не найден!")}async function E(r){return(await L(1,30,r)).furnitures}function S(){c+=d,h()}async function m(r){c=0;try{u=await E(r),h()}catch(t){f.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function h(){const r=u.slice(c,c+d);f.innerHTML=r.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${t.color.map(n=>`<span class="color-dot" style="background-color: ${n}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
          <button class="card-btn">Детальніше</button>
        </div>
      </li>
    `).join(""),a&&(a.style.display=c+d>=u.length?"none":"block")}w().then(r=>{$(r.setCategory)});
//# sourceMappingURL=index.js.map
