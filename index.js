import{a as y,i as l,S as w,N as v,P as L,r as S}from"./assets/vendor-C_X6_tHF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const $="https://furniture-store-v2.b.goit.study/api",b=y.create({baseURL:$,headers:{"Content-Type":"application/json"}});async function E(e=1,t=30,i){try{let o=`/furnitures?page=${e}&limit=${t}`;return i&&i!=="all"&&(o+=`&category=${encodeURIComponent(i)}`),(await b.get(o)).data}catch(o){throw console.error("Ошибка запроса мебели:",o),o}}async function P(){try{return(await b.get("/categories")).data}catch(e){throw console.error("Ошибка запроса категорий:",e),e}}const k="https://furniture-store-v2.b.goit.study/api",q={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function R(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function N(){document.querySelectorAll(".js-star").forEach(e=>{S({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function O(){new w(".swiper",{modules:[v,L],slidesPerView:1,spaceBetween:16,grabCursor:!0,watchOverflow:!0,loop:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function j(){try{const e=await y.get(`${k}/feedbacks?limit=10`);if(!e||!e.data){l.error({message:"Помилка сервера",position:"topRight"});return}const t=e.data.feedbacks;if(!t||t.length===0){l.error({message:"Щось пішло не так, спробуйте пізніше.",position:"topRight"});return}C(t),O(),N()}catch(e){l.error({message:"Щось пішло не так, спробуйте пізніше.",position:"topRight"}),console.log(e)}}function C(e){const t=e.map(i=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${R(i.rate)}"></div>
            <p class="feedback-descr">${i.descr}</p>
            <p class="feedback-author">${i.name}</p>
        </li>
    `).join("");q.feedbackList.innerHTML=t}j();const u=document.querySelector(".filter-list"),m=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function x(e){if(!u)return console.error("Контейнер для фильтров не найден!");try{const t=await P();let i=`
      <li class="filter-item">
        <button class="filter-btn ${m[0]} active" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,n)=>{const s=m[n+1]||"";i+=`
        <li class="filter-item">
          <button class="filter-btn ${s}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),u.innerHTML=i;const o=u.querySelectorAll(".filter-btn");o.forEach(r=>{r.addEventListener("click",()=>{const n=r.dataset.categoryId;e&&e(n||void 0),o.forEach(s=>s.classList.remove("active")),r.classList.add("active")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const p=document.querySelector(".card-list"),c=document.querySelector(".more-btn");let d=[],a=0;const f=8;async function A(){return p?(await g(void 0),c&&c.addEventListener("click",()=>M()),{setCategory:g}):console.error("Контейнер для карточек не найден!")}async function F(e){return(await E(1,30,e)).furnitures}function M(){a+=f,h()}async function g(e){a=0;try{d=await F(e),h()}catch(t){p.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function h(){const e=d.slice(a,a+f);p.innerHTML=e.map(t=>`
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
    `).join(""),c&&(c.style.display=a+f>=d.length?"none":"block")}A().then(e=>{x(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{initFaqAccordion()});
//# sourceMappingURL=index.js.map
