import{i as c,a as y,S as v,N as L,P as S,r as $}from"./assets/vendor-CgAnGPQ_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function h(e="Щось пішло не так"){c.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const E="https://furniture-store-v2.b.goit.study/api",b=y.create({baseURL:E,headers:{"Content-Type":"application/json"}});async function P(e=1,t=30,n){try{let o=`/furnitures?page=${e}&limit=${t}`;return n&&n!=="all"&&(o+=`&category=${encodeURIComponent(n)}`),(await b.get(o)).data}catch(o){throw h("Не вдалося завантажити галерею карток."),o}}async function k(){try{return(await b.get("/categories")).data}catch(e){throw h("Не вдалося завантажити категорії."),e}}const R="https://furniture-store-v2.b.goit.study/api",q={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function N(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function O(){document.querySelectorAll(".js-star").forEach(e=>{$({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function j(){new v(".swiper",{modules:[L,S],slidesPerView:1,spaceBetween:16,grabCursor:!0,watchOverflow:!0,loop:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function C(){try{const e=await y.get(`${R}/feedbacks?limit=10`);if(!e||!e.data){c.error({message:"Помилка сервера",position:"topRight"});return}const t=e.data.feedbacks;if(!t||t.length===0){c.error({message:"Щось пішло не так, спробуйте пізніше.",position:"topRight"});return}x(t),j(),O()}catch(e){c.error({message:"Щось пішло не так, спробуйте пізніше.",position:"topRight"}),console.log(e)}}function x(e){const t=e.map(n=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${N(n.rate)}"></div>
            <p class="feedback-descr">${n.descr}</p>
            <p class="feedback-author">${n.name}</p>
        </li>
    `).join("");q.feedbackList.innerHTML=t}C();const u=document.querySelector(".filter-list"),m=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function A(e){if(!u)return console.error("Контейнер для фильтров не найден!");try{const t=await k();let n=`
      <li class="filter-item">
        <button class="filter-btn ${m[0]} active" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,i)=>{const s=m[i+1]||"";n+=`
        <li class="filter-item">
          <button class="filter-btn ${s}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),u.innerHTML=n;const o=u.querySelectorAll(".filter-btn");o.forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.categoryId;e&&e(i||void 0),o.forEach(s=>s.classList.remove("active")),r.classList.add("active")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const p=document.querySelector(".card-list"),l=document.querySelector(".more-btn");let d=[],a=0;const f=8;async function F(){return p?(await g(void 0),l&&l.addEventListener("click",()=>T()),{setCategory:g}):console.error("Контейнер для карточек не найден!")}async function M(e){return(await P(1,30,e)).furnitures}function T(){a+=f,w()}async function g(e){a=0;try{d=await M(e),w()}catch(t){p.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function w(){const e=d.slice(a,a+f);p.innerHTML=e.map(t=>`
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
    `).join(""),l&&(l.style.display=a+f>=d.length?"none":"block")}F().then(e=>{A(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{initFaqAccordion()});
//# sourceMappingURL=index.js.map
