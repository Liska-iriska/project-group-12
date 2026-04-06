import{S as h,N as w,P as v,K as k,a as $,i as L,r as E,A as P}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();async function q(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await $(t,{params:e})).data.furnitures}catch(n){return L.error({title:"Error",message:`An error occurred: ${n.message}`,position:"topRight"}),[]}}const b=document.querySelector(".popular-list"),A=async()=>{const e=await q();e.length>0?e.forEach(t=>b.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(n=>`<span class="popular-color" style="background-color: ${n}; border: 1px solid ${n};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):b.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};A();const C=new h(".popular-swiper",{modules:[w,v,k],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});C.update();function c(e="Щось пішло не так"){L.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const j="https://furniture-store-v2.b.goit.study/api",f=$.create({baseURL:j,headers:{"Content-Type":"application/json"}});async function x(e=1,t=30,n){try{let o=`/furnitures?page=${e}&limit=${t}`;return n&&n!=="all"&&(o+=`&category=${encodeURIComponent(n)}`),(await f.get(o)).data}catch(o){throw c("Не вдалося завантажити галерею карток."),o}}async function M(){try{return(await f.get("/categories")).data}catch(e){throw c("Не вдалося завантажити категорії."),e}}async function R(e=10){try{return(await f.get(`/feedbacks?limit=${e}`)).data}catch(t){throw c("Не вдалося завантажити відгуки."),t}}const F={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function N(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function O(){document.querySelectorAll(".js-star").forEach(e=>{E({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function T(){new h(".feedback-swiper",{modules:[w,v],slidesPerView:1,spaceBetween:16,grabCursor:!0,watchOverflow:!0,loop:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function B(){try{const e=await R(10);if(!e||!e.feedbacks){c("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){c("Відгуки відсутні.");return}G(t),T(),O()}catch(e){console.error("Feedback error:",e)}}function G(e){const t=e.map(n=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${N(n.rate)}"></div>
            <p class="feedback-descr">${n.descr}</p>
            <p class="feedback-author">${n.name}</p>
        </li>
    `).join("");F.feedbackList.innerHTML=t}B();function H(){const e=document.querySelector(".accordion-container");e&&new P(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}const u=document.querySelector(".filter-list"),g=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function I(e){if(!u)return console.error("Контейнер для фильтров не найден!");try{const t=await M();let n=`
      <li class="filter-item">
        <button class="filter-btn ${g[0]} active" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,s)=>{const i=g[s+1]||"";n+=`
        <li class="filter-item">
          <button class="filter-btn ${i}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),u.innerHTML=n;const o=u.querySelectorAll(".filter-btn");o.forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.categoryId;e&&e(s||void 0),o.forEach(i=>i.classList.remove("active")),r.classList.add("active")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const m=document.querySelector(".card-list"),l=document.querySelector(".more-btn");let d=[],a=0;const p=8;async function V(){return m?(await y(void 0),l&&l.addEventListener("click",()=>_()),{setCategory:y}):console.error("Контейнер для карточек не найден!")}async function U(e){return(await x(1,30,e)).furnitures}function _(){a+=p,S()}async function y(e){a=0;try{d=await U(e),S()}catch(t){m.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function S(){const e=d.slice(a,a+p);m.innerHTML=e.map(t=>`
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
    `).join(""),l&&(l.style.display=a+p>=d.length?"none":"block")}V().then(e=>{I(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{H()});
//# sourceMappingURL=index.js.map
