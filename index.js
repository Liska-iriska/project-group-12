import{i as w,a as S,S as z,N as G,P as V,K as W,r as Z,A as Q}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();function a(e="Щось пішло не так"){w.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function X(e="Успішно"){w.success({title:"OK",message:e,position:"topRight",timeout:3e3})}window.addEventListener("keydown",e=>{e.key==="Escape"&&(p.style.display==="flex"&&k(),m.style.display==="flex"&&$())});const p=document.querySelector(".furniture-modal"),q=document.querySelector("#modal-close-btn"),E=document.querySelector(".furniture-gallery-modal"),x=document.querySelector(".content-container"),m=document.querySelector("[data-order-modal]"),P=document.querySelector("[data-order-modal-close]"),c=document.querySelector("#orderForm"),N=document.querySelector("#submitOrderBtn"),C=document.querySelector("#orderLoader");function D(){document.body.classList.add("body-no-scroll")}function K(){document.body.classList.remove("body-no-scroll")}function U(e){Y(e),p.style.display="flex",D()}function k(){p.style.display="none",K()}q==null||q.addEventListener("click",k);p==null||p.addEventListener("click",e=>{e.target===p&&k()});function Y(e){ee(e),te(e),re(e)}function ee(e){var o;if(!((o=e.images)!=null&&o.length))return;const[t,...r]=e.images;E.innerHTML=`
    <img src="${t}" alt="${e.name}" class="big-image-sofa" />
    <div class="small-images">
      ${r.map(i=>`<img src="${i}" alt="${e.name}" class="small-image-sofa" />`).join("")}
    </div>
  `;const s=E.querySelector(".big-image-sofa");E.querySelectorAll(".small-image-sofa").forEach(i=>{i.addEventListener("click",()=>{s.src=i.src})})}function te(e){var t;x.innerHTML=`
    <h2 class="furniture-title">${e.name}</h2>
    <p class="modal-furniture-category">${((t=e.category)==null?void 0:t.name)||"Меблі"}</p>
    <p class="modal-furniture-price">${e.price} грн</p>
    <span class="modal-furniture-rate" 
      data-rate="${e.rate}" 
      style="--rating-percent: ${e.rate*20}%">
    </span>

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
    <p class="modal-sizes">Розміри: ${e.sizes||""}</p>

    <button class="order-button-modal" data-product-id="${e._id}">
      Перейти до замовлення
    </button>
  `}function re(e){const t=x.querySelector(".order-button-modal");t&&t.addEventListener("click",()=>{const r=x.querySelector('input[name="color"]:checked'),s=r?r.value:e.color[0];k(),m.style.display="flex",D(),c.dataset.modelId=e._id,c.dataset.color=s})}P==null||P.addEventListener("click",$);m==null||m.addEventListener("click",e=>{e.target===m&&$()});function $(){m.style.display="none",K()}c==null||c.addEventListener("submit",async e=>{var O,T,_;e.preventDefault();const t=c.querySelector("#orderName").value.trim(),r=c.querySelector("#orderPhone").value.replace(/\D/g,""),s=c.querySelector("#orderComment").value.trim(),n=c.dataset.modelId,o=c.dataset.color;if(!t||!r||!n||!o){a("Будь ласка, заповніть усі обов'язкові поля!");return}if(s&&s.length<5){a("Коментар повинен бути щонайменше 5 символів!");return}const i={name:t,phone:r,modelId:n,color:o,...s&&{comment:s}};console.log("Payload для отправки на сервер:",i),N.style.display="none",C.classList.remove("hidden");try{const y=await S.post("https://furniture-store-v2.b.goit.study/api/orders",i,{headers:{"Content-Type":"application/json"}});console.log("Ответ сервера:",y.data),X("Заявка успішно надіслана!"),c.reset(),$()}catch(y){console.error("Ошибка при отправке заявки:",((O=y.response)==null?void 0:O.data)||y),a(((_=(T=y.response)==null?void 0:T.data)==null?void 0:_.message)||"Сталася помилка при відправці заявки")}finally{N.style.display="block",C.classList.add("hidden")}});async function se(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await S(t,{params:e})).data.furnitures}catch(r){return w.error({title:"Помилка",message:`Не вдалося завантажити популярні товари: ${r.message}`,position:"topRight",timeout:4e3}),[]}}const j=document.querySelector(".popular-list"),ne=async()=>{const e=await se();e.length>0?(e.forEach(t=>{j.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
          <img class="popular-img"
          width="280" 
          height="232" 
          loading="lazy"
          src="${t.images[0]}" alt="${t.name}" />
          <div class="popular-info">
            <h3 class="popular-subtitle">${t.name}</h3>
            <div class="popular-colors">
              ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
            </div>
            <p class="popular-price">${t.price} грн</p>
          </div>
          <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
        </li>`)}),j.addEventListener("click",async t=>{const r=t.target.closest(".popular-btn");if(!r)return;const s=r.dataset.id;try{const o=(await S.get(`https://furniture-store-v2.b.goit.study/api/furnitures/${s}`)).data;U(o)}catch(n){console.error(n),w.error({title:"Помилка",message:"Не вдалося завантажити товар",position:"topRight",timeout:4e3})}})):j.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};ne();const oe=new z(".popular-swiper",{modules:[G,V,W],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});oe.update();function ae(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function M(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}const h=S.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let A=0;h.interceptors.request.use(e=>(A++,ae(),e),e=>(M(),Promise.reject(e)));h.interceptors.response.use(e=>(--A<=0&&M(),e),e=>{var r,s;--A<=0&&M();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return a(t),Promise.reject(e)});const ie="https://furniture-store-v2.b.goit.study/api";async function ce(e=1,t=8,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);try{const{data:n}=await h.get("/furnitures",{params:s});return n}catch(n){return console.error(n),a("Не вдалося завантажити меблі"),{furnitures:[]}}}const le=async()=>{try{return(await h.get("/categories")).data}catch(e){return console.error(e),a("Не вдалося завантажити категорії"),[]}},de=async(e=25)=>{try{return(await h.get(`/feedbacks?limit=${e}`)).data}catch(t){return console.error(t),a("Не вдалося завантажити відгуки"),[]}};async function ue(e){try{const t=await fetch(`${ie}/furnitures/${e}`);if(!t.ok){const r=await t.json().catch(()=>({}));throw console.error("Server response:",r),a("Не вдалося отримати меблі"),new Error("Не вдалося отримати меблі")}return t.json()}catch(t){throw console.error(t),a("Помилка при завантаженні меблів"),t}}"scrollRestoration"in history&&(history.scrollRestoration="manual");const g=document.querySelector(".burger"),l=document.querySelector("#mobileMenu"),d=document.querySelector(".overlay");function R(){l.classList.contains("active-burger")&&(l.classList.remove("active-burger"),g.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",l.addEventListener("transitionend",function e(t){t.propertyName==="transform"&&(l.style.visibility="hidden",l.removeEventListener("transitionend",e))}))}g&&l&&g.addEventListener("click",()=>{const e=l.classList.toggle("active-burger");g.classList.toggle("active-burger"),d==null||d.classList.toggle("active-burger"),e?(l.style.visibility="visible",document.body.classList.add("is-open-burger")):R()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&R()});window.addEventListener("keydown",e=>{e.key==="Escape"&&R()});window.addEventListener("resize",()=>{window.innerWidth>=768&&(l.classList.remove("active-burger"),g.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),l.style.visibility="hidden",document.body.classList.remove("is-open-burger"),document.body.style.overflow="")});const u={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".feedback-button-prev"),btnNext:document.querySelector(".feedback-button-next"),pagination:document.querySelector("#feedback-pagination"),navigation:document.querySelector("#feedback-navigation")};function pe(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function me(){document.querySelectorAll(".js-star").forEach(e=>{Z({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function fe(){new z(".feedback-swiper",{modules:[G,V],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:"#feedback-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function ye(){try{const e=await de();if(!e||!e.feedbacks||e.feedbacks.length===0){a("Відгуки відсутні."),u.pagination.style.display="none",u.navigation.style.display="none";return}const t=e.feedbacks;ge(t),fe(),me(),u.pagination.style.display="block",u.navigation.style.display="flex"}catch(e){console.error("Feedback error:",e),a("Не вдалося завантажити відгуки."),u.pagination.style.display="none",u.navigation.style.display="none"}}function ge(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${pe(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
      `).join("");u.feedbackList.innerHTML=t}ye();function be(){const e=document.querySelector(".accordion-container");e&&new Q(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}be();const L=document.querySelector(".filter-list");async function ve(e){if(L)try{const r=`
      <li class="filter-item">
        <button class="filter-btn active-filter" data-category-id="">
          <!-- data-category-id="" означає "всі категорії" — порожній рядок = без фільтра -->
          <img
            src="img/categories/all.jpg"
            srcset="
              img/categories/all.jpg 1x,
              img/categories/all@2x.jpg 2x
            "
            alt="Всі товари"
            class="filter-img"
          />
          <span>Всі товари</span>
        </button>
      </li>
      ${(await le()).map(s=>`
        <li class="filter-item">
          <button class="filter-btn" data-category-id="${s._id}">
            
            <img
              src="img/categories/${s._id}.jpg"
              srcset="
                img/categories/${s._id}.jpg 1x,
                img/categories/${s._id}@2x.jpg 2x
              "
              alt="${s.name}"
              class="filter-img"
            />
           
            <span>${s.name}</span>
          </button>
        </li>`).join("")}`;L.innerHTML=r,L.addEventListener("click",s=>{const n=s.target.closest(".filter-btn");if(!n)return;const o=n.dataset.categoryId;e==null||e(o||void 0),L.querySelectorAll(".filter-btn").forEach(i=>i.classList.remove("active-filter")),n.classList.add("active-filter")})}catch(t){console.error(t),a("Не вдалося завантажити категорії")}}const v=document.querySelector(".card-list"),f=document.querySelector(".more-btn"),F=document.querySelector(".card-gallery .loader");let B=[],b=0;const I=8;async function he(e){F.classList.remove("hidden");try{return(await ce(1,30,e)).furnitures}catch(t){return console.error(t),a("Не вдалося завантажити меблі"),[]}finally{F.classList.add("hidden")}}async function Le(){return v?(f.style.display="none",await H(void 0),f&&f.addEventListener("click",()=>we()),{setCategory:H}):console.error("Контейнер не знайдено!")}function we(){b+=I,J()}async function H(e){b=0,v.innerHTML="",f.style.display="none";try{B=await he(e),J()}catch(t){v.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t),a("Не вдалося завантажити категорію меблів")}}function J(){const e=B.slice(b,b+I);v.insertAdjacentHTML("beforeend",e.map(t=>`
      <li class="card-list-item">
        <img class="card-img"
        width="335" 
        height="277" 
        loading="lazy"
        src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${(Array.isArray(t.color)?t.color:[]).map(r=>`<span class="color-dot" style="background-color: ${r}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
        </div>
        <button class="card-btn" data-id="${t._id}">Детальніше</button>
      </li>
    `).join("")),f&&(f.style.display=b+I>=B.length?"none":"block")}v.addEventListener("click",async e=>{const t=e.target.closest(".card-btn");if(!t)return;const r=t.dataset.id;if(r)try{const s=await ue(r);U(s)}catch(s){console.error(s),a("Не вдалося завантажити дані меблів")}});async function Se(){const e=await Le();ve(e.setCategory)}Se();
//# sourceMappingURL=index.js.map
