import{i as w,a as L,S as C,N as F,P as H,K as V,r as z,A as D}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();function a(e="Щось пішло не так"){w.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function K(e="Успішно"){w.success({title:"OK",message:e,position:"topRight",timeout:3e3})}const l=document.querySelector(".furniture-modal"),$=document.querySelector("#modal-close-btn"),U=document.querySelector(".furniture-gallery-modal"),q=document.querySelector(".content-container"),u=document.querySelector("[data-order-modal]"),S=document.querySelector("[data-order-modal-close]"),i=document.querySelector("#orderForm");function N(e){J(e),l.style.display="flex",document.body.style.overflow="hidden"}function x(){l.style.display="none",document.body.style.overflow=""}$==null||$.addEventListener("click",x);l==null||l.addEventListener("click",e=>{e.target===l&&x()});function J(e){Z(e),Q(e),W(e)}function Z(e){var s;if(!((s=e.images)!=null&&s.length))return;const[t,...r]=e.images;U.innerHTML=`
    <img src="${t}" alt="${e.name}" class="big-image-sofa" />
    <div class="small-images">
      ${r.map(o=>`<img src="${o}" alt="${e.name}" class="small-image-sofa" />`).join("")}
    </div>
  `}function Q(e){var t;q.innerHTML=`
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
  `}function W(e){const t=q.querySelector(".order-button-modal");t&&t.addEventListener("click",()=>{const r=q.querySelector('input[name="color"]:checked'),s=r?r.value:e.color[0];x(),u.style.display="flex",document.body.style.overflow="hidden",i.dataset.modelId=e._id,i.dataset.color=s})}S==null||S.addEventListener("click",A);u==null||u.addEventListener("click",e=>{e.target===u&&A()});function A(){u.style.display="none",document.body.style.overflow=""}i==null||i.addEventListener("submit",async e=>{var T,_,B;e.preventDefault();const t=i.querySelector("#orderName").value.trim(),r=i.querySelector("#orderPhone").value.replace(/\D/g,""),s=i.querySelector("#orderComment").value.trim(),o=i.dataset.modelId,n=i.dataset.color;if(!t||!r||!o||!n){a("Будь ласка, заповніть усі обов'язкові поля!");return}if(s&&s.length<5){a("Коментар повинен бути щонайменше 5 символів!");return}const c={name:t,phone:r,modelId:o,color:n,comment:s};console.log("Payload для отправки на сервер:",c);try{const m=await L.post("https://furniture-store-v2.b.goit.study/api/orders",c,{headers:{"Content-Type":"application/json"}});console.log("Ответ сервера:",m.data),K("Заявка успішно надіслана!"),i.reset(),A()}catch(m){console.error("Ошибка при отправке заявки:",((T=m.response)==null?void 0:T.data)||m),a(((B=(_=m.response)==null?void 0:_.data)==null?void 0:B.message)||"Сталася помилка при відправці заявки")}});async function X(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await L(t,{params:e})).data.furnitures}catch(r){return w.error({title:"Помилка",message:`Не вдалося завантажити популярні товари: ${r.message}`,position:"topRight",timeout:4e3}),[]}}const k=document.querySelector(".popular-list"),Y=async()=>{const e=await X();e.length>0?(e.forEach(t=>{k.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
          <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
          <div class="popular-info">
            <h3 class="popular-subtitle">${t.name}</h3>
            <div class="popular-colors">
              ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
            </div>
            <p class="popular-price">${t.price} грн</p>
          </div>
          <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
        </li>`)}),k.addEventListener("click",async t=>{const r=t.target.closest(".popular-btn");if(!r)return;const s=r.dataset.id;try{const n=(await L.get(`https://furniture-store-v2.b.goit.study/api/furnitures/${s}`)).data;N(n)}catch(o){console.error(o),w.error({title:"Помилка",message:"Не вдалося завантажити товар",position:"topRight",timeout:4e3})}})):k.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};Y();const ee=new C(".popular-swiper",{modules:[F,H,V],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});ee.update();function te(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function E(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}const v=L.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let j=0;v.interceptors.request.use(e=>(j++,te(),e),e=>(E(),Promise.reject(e)));v.interceptors.response.use(e=>(--j<=0&&E(),e),e=>{var r,s;--j<=0&&E();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return a(t),Promise.reject(e)});const re="https://furniture-store-v2.b.goit.study/api";async function se(e=1,t=8,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);try{const{data:o}=await v.get("/furnitures",{params:s});return o}catch(o){return console.error(o),a("Не вдалося завантажити меблі"),{furnitures:[]}}}const oe=async()=>{try{return(await v.get("/categories")).data}catch(e){return console.error(e),a("Не вдалося завантажити категорії"),[]}},ne=async(e=25)=>{try{return(await v.get(`/feedbacks?limit=${e}`)).data}catch(t){return console.error(t),a("Не вдалося завантажити відгуки"),[]}};async function ae(e){try{const t=await fetch(`${re}/furnitures/${e}`);if(!t.ok){const r=await t.json().catch(()=>({}));throw console.error("Server response:",r),a("Не вдалося отримати меблі"),new Error("Не вдалося отримати меблі")}return t.json()}catch(t){throw console.error(t),a("Помилка при завантаженні меблів"),t}}const d=document.querySelector(".burger"),g=document.querySelector("#mobileMenu"),p=document.querySelector(".overlay");function I(){g==null||g.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),p==null||p.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow=""}d&&g&&d.addEventListener("click",()=>{const e=g.classList.toggle("active-burger");d.classList.toggle("active-burger"),p==null||p.classList.toggle("active-burger"),e?document.body.classList.add("is-open-burger"):I()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&I()});window.addEventListener("keydown",e=>{e.key==="Escape"&&I()});const ie={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function ce(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function le(){document.querySelectorAll(".js-star").forEach(e=>{z({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function ue(){new C(".feedback-swiper",{modules:[F,H],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function de(){try{const e=await ne();if(!e||!e.feedbacks){a("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){a("Відгуки відсутні.");return}pe(t),ue(),le()}catch(e){console.error("Feedback error:",e)}}function pe(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${ce(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");ie.feedbackList.innerHTML=t}de();function fe(){const e=document.querySelector(".accordion-container");e&&new D(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}fe();const h=document.querySelector(".filter-list");async function me(e){if(h)try{const r=`
      <li class="filter-item">
        <button class="filter-btn active-filter" data-category-id="">
          <img 
            src="/project-group-12/img/categories/all.jpg"
            alt="Всі товари"
            class="filter-img"
          />
          <span>Всі товари</span>
        </button>
      </li>

      ${(await oe()).map(s=>`
        <li class="filter-item">
          <button 
            class="filter-btn"
            data-category-id="${s._id}"
          >
            <img 
              src="/project-group-12/img/categories/${s._id}.jpg"
              srcset="
                /project-group-12/img/categories/${s._id}.jpg 1x,
                /project-group-12/img/categories/${s._id}@2x.jpg 2x
              "
              alt="${s.name}"
              class="filter-img"
            />
            <span>${s.name}</span>
          </button>
        </li>
      `).join("")}
    `;h.innerHTML=r,h.addEventListener("click",s=>{const o=s.target.closest(".filter-btn");if(!o)return;const n=o.dataset.categoryId;e==null||e(n||void 0),h.querySelectorAll(".filter-btn").forEach(c=>c.classList.remove("active-filter")),o.classList.add("active-filter")})}catch(t){console.error(t),a("Не вдалося завантажити категорії")}}const b=document.querySelector(".card-list"),f=document.querySelector(".more-btn"),O=document.querySelector(".card-gallery .loader");let P=[],y=0;const M=8;async function ge(e){O.classList.remove("hidden");try{return(await se(1,30,e)).furnitures}catch(t){return console.error(t),a("Не вдалося завантажити меблі"),[]}finally{O.classList.add("hidden")}}async function ye(){return b?(f.style.display="none",await R(void 0),f&&f.addEventListener("click",()=>be()),{setCategory:R}):console.error("Контейнер не знайдено!")}function be(){y+=M,G()}async function R(e){y=0,b.innerHTML="",f.style.display="none";try{P=await ge(e),G()}catch(t){b.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t),a("Не вдалося завантажити категорію меблів")}}function G(){const e=P.slice(y,y+M);b.insertAdjacentHTML("beforeend",e.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${(Array.isArray(t.color)?t.color:[]).map(r=>`<span class="color-dot" style="background-color: ${r}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
        </div>
        <button class="card-btn" data-id="${t._id}">Детальніше</button>
      </li>
    `).join("")),f&&(f.style.display=y+M>=P.length?"none":"block")}b.addEventListener("click",async e=>{const t=e.target.closest(".card-btn");if(!t)return;const r=t.dataset.id;if(r)try{const s=await ae(r);N(s)}catch(s){console.error(s),a("Не вдалося завантажити дані меблів")}});async function ve(){const e=await ye();me(e.setCategory)}ve();
//# sourceMappingURL=index.js.map
