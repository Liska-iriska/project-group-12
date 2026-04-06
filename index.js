import{i as h,a as w,S as v,N as L,P as S,r as $,A as k}from"./assets/vendor-fd96UI5Z.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();function c(e="Щось пішло не так"){h.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const E="https://furniture-store-v2.b.goit.study/api",p=w.create({baseURL:E,headers:{"Content-Type":"application/json"}});async function P(e=1,t=30,i){try{let o=`/furnitures?page=${e}&limit=${t}`;return i&&i!=="all"&&(o+=`&category=${encodeURIComponent(i)}`),(await p.get(o)).data}catch(o){throw c("Не вдалося завантажити галерею карток."),o}}async function q(){try{return(await p.get("/categories")).data}catch(e){throw c("Не вдалося завантажити категорії."),e}}async function C(e=10){try{return(await p.get(`/feedbacks?limit=${e}`)).data}catch(t){throw c("Не вдалося завантажити відгуки."),t}}const F={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function N(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function O(){document.querySelectorAll(".js-star").forEach(e=>{$({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function j(){new v(".swiper",{modules:[L,S],slidesPerView:1,spaceBetween:16,grabCursor:!0,watchOverflow:!0,loop:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function A(){try{const e=await C(10);if(!e||!e.feedbacks){c("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){c("Відгуки відсутні.");return}M(t),j(),O()}catch(e){console.error("Feedback error:",e)}}function M(e){const t=e.map(i=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${N(i.rate)}"></div>
            <p class="feedback-descr">${i.descr}</p>
            <p class="feedback-author">${i.name}</p>
        </li>
    `).join("");F.feedbackList.innerHTML=t}A();function x(){const e=document.querySelector(".accordion-container");e&&new k(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}const u=document.querySelector(".filter-list"),y=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function R(e){if(!u)return console.error("Контейнер для фильтров не найден!");try{const t=await q();let i=`
      <li class="filter-item">
        <button class="filter-btn ${y[0]} active" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,n)=>{const s=y[n+1]||"";i+=`
        <li class="filter-item">
          <button class="filter-btn ${s}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),u.innerHTML=i;const o=u.querySelectorAll(".filter-btn");o.forEach(r=>{r.addEventListener("click",()=>{const n=r.dataset.categoryId;e&&e(n||void 0),o.forEach(s=>s.classList.remove("active")),r.classList.add("active")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const m=document.querySelector(".card-list"),l=document.querySelector(".more-btn");let d=[],a=0;const f=8;async function T(){return m?(await g(void 0),l&&l.addEventListener("click",()=>B()),{setCategory:g}):console.error("Контейнер для карточек не найден!")}async function I(e){return(await P(1,30,e)).furnitures}function B(){a+=f,b()}async function g(e){a=0;try{d=await I(e),b()}catch(t){m.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function b(){const e=d.slice(a,a+f);m.innerHTML=e.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${t.color.map(i=>`<span class="color-dot" style="background-color: ${i}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
          <button class="card-btn">Детальніше</button>
        </div>
      </li>
    `).join(""),l&&(l.style.display=a+f>=d.length?"none":"block")}T().then(e=>{R(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{x()});
//# sourceMappingURL=index.js.map
