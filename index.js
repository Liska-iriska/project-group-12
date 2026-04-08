import{S as E,N as P,P as q,K as x,a as A,i as M,r as C,A as B}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();async function F(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await A(t,{params:e})).data.furnitures}catch(s){return M.error({title:"Error",message:`An error occurred: ${s.message}`,position:"topRight"}),[]}}const S=document.querySelector(".popular-list"),N=async()=>{const e=await F();e.length>0?e.forEach(t=>S.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(s=>`<span class="popular-color" style="background-color: ${s}; border: 1px solid ${s};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):S.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};N();const O=new E(".popular-swiper",{modules:[P,q,x],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});O.update();function R(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function b(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}function g(e="Щось пішло не так"){M.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const u=A.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let y=0;u.interceptors.request.use(e=>(y++,R(),e),e=>(b(),Promise.reject(e)));u.interceptors.response.use(e=>(--y<=0&&b(),e),e=>{var s,n;--y<=0&&b();const t=((n=(s=e==null?void 0:e.response)==null?void 0:s.data)==null?void 0:n.message)||"Помилка запиту";return g(t),Promise.reject(e)});async function T(e=1,t=30,s){const n={page:e,limit:t};s&&s!=="all"&&(n.category=s);const{data:r}=await u.get("/furnitures",{params:n});return r}const _=()=>u.get("/categories").then(e=>e.data),G=(e=25)=>u.get(`/feedbacks?limit=${e}`).then(t=>t.data),i=document.querySelector(".burger"),d=document.querySelector("#mobileMenu");document.querySelector(".modal-menu__close");const p=i==null?void 0:i.querySelector("use"),c=document.querySelector(".overlay");function w(){d&&d.classList.remove("active-burger"),i==null||i.classList.remove("active-burger"),c==null||c.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",p&&p.setAttribute("href","img/sprite.svg#menu")}i&&d&&i.addEventListener("click",()=>{const e=d.classList.toggle("active-burger");i.classList.toggle("active-burger"),c==null||c.classList.toggle("active-burger"),p&&p.setAttribute("href","/img/sprite.svg#"+(e?"close":"menu")),e?document.body.classList.add("is-open-burger"):w()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&w()});window.addEventListener("keydown",e=>{e.key==="Escape"&&w()});const I={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function V(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function H(){document.querySelectorAll(".js-star").forEach(e=>{C({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function K(){new E(".feedback-swiper",{modules:[P,q],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function U(){try{const e=await G();if(!e||!e.feedbacks){g("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){g("Відгуки відсутні.");return}z(t),K(),H()}catch(e){console.error("Feedback error:",e)}}function z(e){const t=e.map(s=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${V(s.rate)}"></div>
            <p class="feedback-descr">${s.descr}</p>
            <p class="feedback-author">${s.name}</p>
        </li>
    `).join("");I.feedbackList.innerHTML=t}U();function D(){const e=document.querySelector(".accordion-container");e&&new B(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}const m=document.querySelector(".filter-list"),k=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function J(e){if(!m)return console.error("Контейнер для фильтров не найден!");try{const t=await _();let s=`
      <li class="filter-item">
        <button class="filter-btn ${k[0]} active-filter" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((r,o)=>{const a=k[o+1]||"";s+=`
        <li class="filter-item">
          <button class="filter-btn ${a}" data-category-id="${r._id}">
            ${r.name}
          </button>
        </li>
      `}),m.i=s;const n=m.querySelectorAll(".filter-btn");n.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.categoryId;e&&e(o||void 0),n.forEach(a=>a.classList.remove("active-filter")),r.classList.add("active-filter")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const L=document.querySelector(".card-list"),f=document.querySelector(".more-btn");let v=[],l=0;const h=8;async function Z(){return L?(await $(void 0),f&&f.addEventListener("click",()=>W()),{setCategory:$}):console.error("Контейнер не знайдено!")}async function Q(e){return(await T(1,30,e)).furnitures}function W(){l+=h,j()}async function $(e){l=0;try{v=await Q(e),j()}catch(t){L.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t)}}function j(){const e=v.slice(l,l+h);L.insertAdjacentHTML("beforeend",e.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${(Array.isArray(t.color)?t.color:[]).map(s=>`<span class="color-dot" style="background-color: ${s}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
        </div>
        <button class="card-btn">Детальніше</button>
      </li>
    `).join("")),f&&(f.style.display=l+h>=v.length?"none":"block")}Z().then(e=>{J(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{D()});
//# sourceMappingURL=index.js.map
