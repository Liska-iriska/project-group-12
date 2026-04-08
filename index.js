import{i as $,S as B,N as R,P as C,K as H,a as M,r as G,A as V}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();function a(e="Щось пішло не так"){$.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function D(e="Успішно"){$.success({title:"OK",message:e,position:"topRight",timeout:3e3})}const l=document.querySelector(".furniture-modal"),S=document.querySelector("#modal-close-btn"),z=document.querySelector(".furniture-gallery-modal"),E=document.querySelector(".content-container"),d=document.querySelector("[data-order-modal]"),k=document.querySelector("[data-order-modal-close]"),i=document.querySelector("#orderForm");function N(e){K(e),l.style.display="flex",document.body.style.overflow="hidden"}function A(){l.style.display="none",document.body.style.overflow=""}S==null||S.addEventListener("click",A);l==null||l.addEventListener("click",e=>{e.target===l&&A()});function K(e){U(e),J(e),Z(e)}function U(e){var s;if(!((s=e.images)!=null&&s.length))return;const[t,...r]=e.images;z.innerHTML=`
    <img src="${t}" alt="${e.name}" class="big-image-sofa" />
    <div class="small-images">
      ${r.map(o=>`<img src="${o}" alt="${e.name}" class="small-image-sofa" />`).join("")}
    </div>
  `}function J(e){var t;E.innerHTML=`
    <h2 class="furniture-title">${e.name}</h2>
    <p class="modal-furniture-category">${((t=e.category)==null?void 0:t.name)||"Меблі"}</p>
    <p class="modal-furniture-price">${e.price} грн</p>
    <span class="modal-furniture-rate" data-rate="${e.rate}" style="--rating-percent: ${e.rate*20}%"></span>

    <p class="furniture-color-text">Колір</p>
    <div class="colors-container">
      ${e.color.map((r,s)=>`
        <label class="color-option">
          <input type="radio" name="color" value="${r}" ${s===0?"checked":""} />
          <span class="color-swatch" style="background:${r}"></span>
        </label>
      `).join("")}
    </div>

    <p class="modal-furniture-description">${e.description||""}</p>
    <p class="modal-sizes">${e.sizes||""}</p>

    <button class="order-button-modal" data-product-id="${e._id}">
      Перейти до замовлення
    </button>
  `}function Z(e){const t=E.querySelector(".order-button-modal");t&&t.addEventListener("click",()=>{const r=E.querySelector('input[name="color"]:checked'),s=r?r.value:e.color[0];A(),d.style.display="flex",document.body.style.overflow="hidden",i.dataset.modelId=e._id,i.dataset.color=s})}k==null||k.addEventListener("click",O);d==null||d.addEventListener("click",e=>{e.target===d&&O()});function O(){d.style.display="none",document.body.style.overflow=""}i==null||i.addEventListener("submit",async e=>{e.preventDefault();const t=i.querySelector("#orderName").value.trim(),r=i.querySelector("#orderPhone").value.replace(/\D/g,""),s=i.querySelector("#orderComment").value.trim(),o=i.dataset.modelId,n=i.dataset.color;if(!t||!r||!o||!n){a("Будь ласка, заповніть усі обов'язкові поля!");return}if(s&&s.length<5){a("Коментар повинен бути щонайменше 5 символів!");return}const c={name:t,phone:r,modelId:o,color:n,comment:s};console.log("Payload для отправки на сервер:",c);try{const v=await fetch("https://furniture-store-v2.b.goit.study/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(!v.ok){const I=await v.json().catch(()=>({}));console.error("Server response:",I),a(I.message||"Не вдалося відправити заявку");return}D("Заявка успішно надіслана!"),i.reset(),O()}catch(v){console.error(v),a("Сталася помилка при відправці заявки")}});async function Q(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await M(t,{params:e})).data.furnitures}catch(r){return $.error({title:"Помилка",message:`Не вдалося завантажити популярні товари: ${r.message}`,position:"topRight",timeout:4e3}),[]}}const q=document.querySelector(".popular-list"),W=async()=>{const e=await Q();e.length>0?(e.forEach(t=>{q.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
          <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
          <div class="popular-info">
            <h3 class="popular-subtitle">${t.name}</h3>
            <div class="popular-colors">
              ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
            </div>
            <p class="popular-price">${t.price} грн</p>
          </div>
          <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
        </li>`)}),q.addEventListener("click",async t=>{const r=t.target.closest(".popular-btn");if(!r)return;const s=r.dataset.id;try{const n=(await M.get(`https://furniture-store-v2.b.goit.study/api/furnitures/${s}`)).data;N(n)}catch(o){console.error(o),$.error({title:"Помилка",message:"Не вдалося завантажити товар",position:"topRight",timeout:4e3})}})):q.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};W();const X=new B(".popular-swiper",{modules:[R,C,H],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});X.update();function Y(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function P(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}const b=M.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let j=0;b.interceptors.request.use(e=>(j++,Y(),e),e=>(P(),Promise.reject(e)));b.interceptors.response.use(e=>(--j<=0&&P(),e),e=>{var r,s;--j<=0&&P();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return a(t),Promise.reject(e)});const ee="https://furniture-store-v2.b.goit.study/api";async function te(e=1,t=30,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);try{const{data:o}=await b.get("/furnitures",{params:s});return o}catch(o){return console.error(o),a("Не вдалося завантажити меблі"),{furnitures:[]}}}const re=async()=>{try{return(await b.get("/categories")).data}catch(e){return console.error(e),a("Не вдалося завантажити категорії"),[]}},se=async(e=25)=>{try{return(await b.get(`/feedbacks?limit=${e}`)).data}catch(t){return console.error(t),a("Не вдалося завантажити відгуки"),[]}};async function oe(e){try{const t=await fetch(`${ee}/furnitures/${e}`);if(!t.ok){const r=await t.json().catch(()=>({}));throw console.error("Server response:",r),a("Не вдалося отримати меблі"),new Error("Не вдалося отримати меблі")}return t.json()}catch(t){throw console.error(t),a("Помилка при завантаженні меблів"),t}}const u=document.querySelector(".burger"),g=document.querySelector("#mobileMenu"),p=document.querySelector(".overlay");function T(){g==null||g.classList.remove("active-burger"),u==null||u.classList.remove("active-burger"),p==null||p.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow=""}u&&g&&u.addEventListener("click",()=>{const e=g.classList.toggle("active-burger");u.classList.toggle("active-burger"),p==null||p.classList.toggle("active-burger"),e?document.body.classList.add("is-open-burger"):T()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&T()});window.addEventListener("keydown",e=>{e.key==="Escape"&&T()});const ne={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function ae(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function ie(){document.querySelectorAll(".js-star").forEach(e=>{G({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function ce(){new B(".feedback-swiper",{modules:[R,C],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function le(){try{const e=await se();if(!e||!e.feedbacks){a("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){a("Відгуки відсутні.");return}de(t),ce(),ie()}catch(e){console.error("Feedback error:",e)}}function de(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${ae(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");ne.feedbackList.innerHTML=t}le();function ue(){const e=document.querySelector(".accordion-container");e&&new V(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}ue();const h=document.querySelector(".filter-list");async function pe(e){if(h)try{const r=`
      <li class="filter-item">
        <button class="filter-btn active-filter" data-category-id="">
          <img 
            src="/img/categories/all.jpg"
            alt="Всі товари"
            class="filter-img"
          />
          <span>Всі товари</span>
        </button>
      </li>

      ${(await re()).map(s=>`
        <li class="filter-item">
          <button 
            class="filter-btn"
            data-category-id="${s._id}"
          >
            <img 
              src="/img/categories/${s._id}.jpg"
              srcset="
                /img/categories/${s._id}.jpg 1x,
                /img/categories/${s._id}@2x.jpg 2x
              "
              alt="${s.name}"
              class="filter-img"
            />
            <span>${s.name}</span>
          </button>
        </li>
      `).join("")}
    `;h.innerHTML=r,h.addEventListener("click",s=>{const o=s.target.closest(".filter-btn");if(!o)return;const n=o.dataset.categoryId;e==null||e(n||void 0),h.querySelectorAll(".filter-btn").forEach(c=>c.classList.remove("active-filter")),o.classList.add("active-filter")})}catch(t){console.error(t),a("Не вдалося завантажити категорії")}}const y=document.querySelector(".card-list"),f=document.querySelector(".more-btn"),w=document.querySelector(".card-gallery .loader");let L=[],m=0;const x=8;async function fe(e){w.classList.remove("hidden");try{return(await te(1,30,e)).furnitures}catch(t){return console.error(t),a("Не вдалося завантажити меблі"),[]}finally{w.classList.add("hidden")}}async function me(){return y?(f.style.display="none",await _(void 0),f&&f.addEventListener("click",()=>ye()),{setCategory:_}):console.error("Контейнер не знайдено!")}function ye(){m+=x,F()}async function _(e){m=0,y.innerHTML="",f.style.display="none";try{L=await fe(e),F()}catch(t){y.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t),a("Не вдалося завантажити категорію меблів")}}function F(){const e=L.slice(m,m+x);y.insertAdjacentHTML("beforeend",e.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${(Array.isArray(t.color)?t.color:[]).map(r=>`<span class="color-dot" style="background-color: ${r}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
        </div>
        <button class="card-btn">Детальніше</button>
      </li>
    `).join("")),f&&(f.style.display=m+x>=L.length?"none":"block")}y.addEventListener("click",async e=>{const t=e.target.closest(".card-btn");if(!t)return;const r=t.closest(".card-list-item"),s=[...y.children].indexOf(r),o=L[m+s];try{w.classList.remove("hidden");const n=await oe(o._id);N(n)}catch(n){console.error(n),a("Не вдалося завантажити дані меблів")}finally{w.classList.add("hidden")}});async function ge(){const e=await me();pe(e.setCategory)}ge();
//# sourceMappingURL=index.js.map
