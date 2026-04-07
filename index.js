import{S as $,N as k,P as E,K as M,a as P,i as q,r as C,A as j}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();async function x(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await P(t,{params:e})).data.furnitures}catch(s){return q.error({title:"Error",message:`An error occurred: ${s.message}`,position:"topRight"}),[]}}const v=document.querySelector(".popular-list"),O=async()=>{const e=await x();e.length>0?e.forEach(t=>v.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(s=>`<span class="popular-color" style="background-color: ${s}; border: 1px solid ${s};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):v.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};O();const R=new $(".popular-swiper",{modules:[k,E,M],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});R.update();function u(e="Щось пішло не так"){q.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const F="https://furniture-store-v2.b.goit.study/api",y=P.create({baseURL:F,headers:{"Content-Type":"application/json"}});async function N(e=1,t=30,s){try{let n=`/furnitures?page=${e}&limit=${t}`;return s&&s!=="all"&&(n+=`&category=${encodeURIComponent(s)}`),(await y.get(n)).data}catch(n){throw u("Не вдалося завантажити галерею карток."),n}}async function T(){try{return(await y.get("/categories")).data}catch(e){throw u("Не вдалося завантажити категорії."),e}}async function B(e=10){try{return(await y.get(`/feedbacks?limit=${e}`)).data}catch(t){throw u("Не вдалося завантажити відгуки."),t}}const i=document.querySelector(".burger"),d=document.querySelector("#mobileMenu");document.querySelector(".modal-menu__close");const p=i==null?void 0:i.querySelector("use"),c=document.querySelector(".overlay");function h(){d&&d.classList.remove("active-burger"),i==null||i.classList.remove("active-burger"),c==null||c.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",p&&p.setAttribute("href","img/sprite.svg#menu")}i&&d&&i.addEventListener("click",()=>{const e=d.classList.toggle("active-burger");i.classList.toggle("active-burger"),c==null||c.classList.toggle("active-burger"),p&&p.setAttribute("href",e?"img/sprite.svg#close":"img/sprite.svg#menu"),e?document.body.classList.add("is-open-burger"):h()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&h()});window.addEventListener("keydown",e=>{e.key==="Escape"&&h()});const _={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function I(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function G(){document.querySelectorAll(".js-star").forEach(e=>{C({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function H(){new $(".feedback-swiper",{modules:[k,E],slidesPerView:1,spaceBetween:16,grabCursor:!0,watchOverflow:!0,loop:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function V(){try{const e=await B(10);if(!e||!e.feedbacks){u("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){u("Відгуки відсутні.");return}U(t),H(),G()}catch(e){console.error("Feedback error:",e)}}function U(e){const t=e.map(s=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${I(s.rate)}"></div>
            <p class="feedback-descr">${s.descr}</p>
            <p class="feedback-author">${s.name}</p>
        </li>
    `).join("");_.feedbackList.innerHTML=t}V();function K(){const e=document.querySelector(".accordion-container");e&&new j(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}const m=document.querySelector(".filter-list"),L=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function z(e){if(!m)return console.error("Контейнер для фильтров не найден!");try{const t=await T();let s=`
      <li class="filter-item">
        <button class="filter-btn ${L[0]} active-filter" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,o)=>{const a=L[o+1]||"";s+=`
        <li class="filter-item">
          <button class="filter-btn ${a}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),m.innerHTML=s;const n=m.querySelectorAll(".filter-btn");n.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.categoryId;e&&e(o||void 0),n.forEach(a=>a.classList.remove("active-filter")),r.classList.add("active-filter")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const w=document.querySelector(".card-list"),f=document.querySelector(".more-btn");let g=[],l=0;const b=8;async function D(){return w?(await S(void 0),f&&f.addEventListener("click",()=>Z()),{setCategory:S}):console.error("Контейнер для карточек не найден!")}async function J(e){return(await N(1,30,e)).furnitures}function Z(){l+=b,A()}async function S(e){l=0;try{g=await J(e),A()}catch(t){w.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function A(){const e=g.slice(l,l+b);w.innerHTML=e.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${t.color.map(s=>`<span class="color-dot" style="background-color: ${s}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
        </div>
        <button class="card-btn">Детальніше</button>
      </li>
    `).join(""),f&&(f.style.display=l+b>=g.length?"none":"block")}D().then(e=>{z(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{K()});
//# sourceMappingURL=index.js.map
