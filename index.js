import{S as $,N as k,P as E,K as C,a as P,i as q,r as j,A as x}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();async function O(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await P(t,{params:e})).data.furnitures}catch(s){return q.error({title:"Error",message:`An error occurred: ${s.message}`,position:"topRight"}),[]}}const v=document.querySelector(".popular-list"),R=async()=>{const e=await O();e.length>0?e.forEach(t=>v.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(s=>`<span class="popular-color" style="background-color: ${s}; border: 1px solid ${s};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):v.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};R();const B=new $(".popular-swiper",{modules:[k,E,C],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});B.update();function l(e="Щось пішло не так"){q.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const F="https://furniture-store-v2.b.goit.study/api",b=P.create({baseURL:F,headers:{"Content-Type":"application/json"}});async function N(e=1,t=30,s){try{let n=`/furnitures?page=${e}&limit=${t}`;return s&&s!=="all"&&(n+=`&category=${encodeURIComponent(s)}`),(await b.get(n)).data}catch(n){throw l("Не вдалося завантажити галерею карток."),n}}async function T(){try{return(await b.get("/categories")).data}catch(e){throw l("Не вдалося завантажити категорії."),e}}async function I(e=10){try{return(await b.get(`/feedbacks?limit=${e}`)).data}catch(t){throw l("Не вдалося завантажити відгуки."),t}}const a=document.querySelector(".burger"),M=document.querySelector("#mobileMenu"),w=document.querySelector(".modal-menu__close"),G=document.querySelectorAll("#mobileMenu a, #mobileMenu button"),u=a==null?void 0:a.querySelector("use"),g=document.querySelector(".overlay");function y(){M.classList.remove("active"),a.classList.remove("active"),g.classList.remove("active"),u&&u.setAttribute("href","img/sprite.svg#menu"),document.body.classList.remove("is-open")}a.addEventListener("click",()=>{const e=M.classList.toggle("active");a.classList.toggle("active"),g.classList.toggle("active"),u&&u.setAttribute("href",e?"img/sprite.svg#close":"img/sprite.svg#menu"),e?document.body.classList.add("is-open"):document.body.classList.remove("is-open")});G.forEach(e=>{e.addEventListener("click",y)});g.addEventListener("click",y);w&&w.addEventListener("click",y);const H={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function V(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function _(){document.querySelectorAll(".js-star").forEach(e=>{j({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function U(){new $(".feedback-swiper",{modules:[k,E],slidesPerView:1,spaceBetween:16,grabCursor:!0,watchOverflow:!0,loop:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function K(){try{const e=await I(10);if(!e||!e.feedbacks){l("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){l("Відгуки відсутні.");return}z(t),U(),_()}catch(e){console.error("Feedback error:",e)}}function z(e){const t=e.map(s=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${V(s.rate)}"></div>
            <p class="feedback-descr">${s.descr}</p>
            <p class="feedback-author">${s.name}</p>
        </li>
    `).join("");H.feedbackList.innerHTML=t}K();function D(){const e=document.querySelector(".accordion-container");e&&new x(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}const p=document.querySelector(".filter-list"),L=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function J(e){if(!p)return console.error("Контейнер для фильтров не найден!");try{const t=await T();let s=`
      <li class="filter-item">
        <button class="filter-btn ${L[0]} active-filter" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,o)=>{const i=L[o+1]||"";s+=`
        <li class="filter-item">
          <button class="filter-btn ${i}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),p.innerHTML=s;const n=p.querySelectorAll(".filter-btn");n.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.categoryId;e&&e(o||void 0),n.forEach(i=>i.classList.remove("active-filter")),r.classList.add("active-filter")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const h=document.querySelector(".card-list"),d=document.querySelector(".more-btn");let f=[],c=0;const m=8;async function Z(){return h?(await S(void 0),d&&d.addEventListener("click",()=>W()),{setCategory:S}):console.error("Контейнер для карточек не найден!")}async function Q(e){return(await N(1,30,e)).furnitures}function W(){c+=m,A()}async function S(e){c=0;try{f=await Q(e),A()}catch(t){h.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function A(){const e=f.slice(c,c+m);h.innerHTML=e.map(t=>`
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
    `).join(""),d&&(d.style.display=c+m>=f.length?"none":"block")}Z().then(e=>{J(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{D()});
//# sourceMappingURL=index.js.map
