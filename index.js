import{i as w,a as L,S as C,N as F,P as H,K,r as U,A as J}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();function a(e="Щось пішло не так"){w.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function W(e="Успішно"){w.success({title:"OK",message:e,position:"topRight",timeout:3e3})}window.addEventListener("keydown",e=>{e.key==="Escape"&&(u.style.display==="flex"&&$(),p.style.display==="flex"&&S())});const u=document.querySelector(".furniture-modal"),k=document.querySelector("#modal-close-btn"),E=document.querySelector(".furniture-gallery-modal"),j=document.querySelector(".content-container"),p=document.querySelector("[data-order-modal]"),q=document.querySelector("[data-order-modal-close]"),c=document.querySelector("#orderForm");function z(){document.body.classList.add("body-no-scroll")}function G(){document.body.classList.remove("body-no-scroll")}function V(e){Z(e),u.style.display="flex",z()}function $(){u.style.display="none",G()}k==null||k.addEventListener("click",$);u==null||u.addEventListener("click",e=>{e.target===u&&$()});function Z(e){Q(e),X(e),Y(e)}function Q(e){var o;if(!((o=e.images)!=null&&o.length))return;const[t,...r]=e.images;E.innerHTML=`
    <img src="${t}" alt="${e.name}" class="big-image-sofa" />
    <div class="small-images">
      ${r.map(i=>`<img src="${i}" alt="${e.name}" class="small-image-sofa" />`).join("")}
    </div>
  `;const s=E.querySelector(".big-image-sofa");E.querySelectorAll(".small-image-sofa").forEach(i=>{i.addEventListener("click",()=>{s.src=i.src})})}function X(e){var t;j.innerHTML=`
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
    <p class="modal-sizes">Розміри: ${e.sizes||""}</p>

    <button class="order-button-modal" data-product-id="${e._id}">
      Перейти до замовлення
    </button>
  `}function Y(e){const t=j.querySelector(".order-button-modal");t&&t.addEventListener("click",()=>{const r=j.querySelector('input[name="color"]:checked'),s=r?r.value:e.color[0];$(),p.style.display="flex",z(),c.dataset.modelId=e._id,c.dataset.color=s})}q==null||q.addEventListener("click",S);p==null||p.addEventListener("click",e=>{e.target===p&&S()});function S(){p.style.display="none",G()}c==null||c.addEventListener("submit",async e=>{var R,T,_;e.preventDefault();const t=c.querySelector("#orderName").value.trim(),r=c.querySelector("#orderPhone").value.replace(/\D/g,""),s=c.querySelector("#orderComment").value.trim(),n=c.dataset.modelId,o=c.dataset.color;if(!t||!r||!n||!o){a("Будь ласка, заповніть усі обов'язкові поля!");return}if(s&&s.length<5){a("Коментар повинен бути щонайменше 5 символів!");return}const i={name:t,phone:r,modelId:n,color:o,comment:s};console.log("Payload для отправки на сервер:",i);try{const f=await L.post("https://furniture-store-v2.b.goit.study/api/orders",i,{headers:{"Content-Type":"application/json"}});console.log("Ответ сервера:",f.data),W("Заявка успішно надіслана!"),c.reset(),S()}catch(f){console.error("Ошибка при отправке заявки:",((R=f.response)==null?void 0:R.data)||f),a(((_=(T=f.response)==null?void 0:T.data)==null?void 0:_.message)||"Сталася помилка при відправці заявки")}});async function ee(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await L(t,{params:e})).data.furnitures}catch(r){return w.error({title:"Помилка",message:`Не вдалося завантажити популярні товари: ${r.message}`,position:"topRight",timeout:4e3}),[]}}const P=document.querySelector(".popular-list"),te=async()=>{const e=await ee();e.length>0?(e.forEach(t=>{P.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
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
        </li>`)}),P.addEventListener("click",async t=>{const r=t.target.closest(".popular-btn");if(!r)return;const s=r.dataset.id;try{const o=(await L.get(`https://furniture-store-v2.b.goit.study/api/furnitures/${s}`)).data;V(o)}catch(n){console.error(n),w.error({title:"Помилка",message:"Не вдалося завантажити товар",position:"topRight",timeout:4e3})}})):P.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};te();const re=new C(".popular-swiper",{modules:[F,H,K],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});re.update();function se(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function x(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}const v=L.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let M=0;v.interceptors.request.use(e=>(M++,se(),e),e=>(x(),Promise.reject(e)));v.interceptors.response.use(e=>(--M<=0&&x(),e),e=>{var r,s;--M<=0&&x();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return a(t),Promise.reject(e)});const ne="https://furniture-store-v2.b.goit.study/api";async function oe(e=1,t=8,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);try{const{data:n}=await v.get("/furnitures",{params:s});return n}catch(n){return console.error(n),a("Не вдалося завантажити меблі"),{furnitures:[]}}}const ae=async()=>{try{return(await v.get("/categories")).data}catch(e){return console.error(e),a("Не вдалося завантажити категорії"),[]}},ie=async(e=25)=>{try{return(await v.get(`/feedbacks?limit=${e}`)).data}catch(t){return console.error(t),a("Не вдалося завантажити відгуки"),[]}};async function ce(e){try{const t=await fetch(`${ne}/furnitures/${e}`);if(!t.ok){const r=await t.json().catch(()=>({}));throw console.error("Server response:",r),a("Не вдалося отримати меблі"),new Error("Не вдалося отримати меблі")}return t.json()}catch(t){throw console.error(t),a("Помилка при завантаженні меблів"),t}}"scrollRestoration"in history&&(history.scrollRestoration="manual");const g=document.querySelector(".burger"),l=document.querySelector("#mobileMenu"),d=document.querySelector(".overlay");function B(){l.classList.contains("active-burger")&&(l.classList.remove("active-burger"),g.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",l.addEventListener("transitionend",function e(t){t.propertyName==="transform"&&(l.style.visibility="hidden",l.removeEventListener("transitionend",e))}))}g&&l&&g.addEventListener("click",()=>{const e=l.classList.toggle("active-burger");g.classList.toggle("active-burger"),d==null||d.classList.toggle("active-burger"),e?(l.style.visibility="visible",document.body.classList.add("is-open-burger")):B()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&B()});window.addEventListener("keydown",e=>{e.key==="Escape"&&B()});window.addEventListener("resize",()=>{window.innerWidth>=768&&(l.classList.remove("active-burger"),g.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),l.style.visibility="hidden",document.body.classList.remove("is-open-burger"),document.body.style.overflow="")});const le={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function de(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function ue(){document.querySelectorAll(".js-star").forEach(e=>{U({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function pe(){new C(".feedback-swiper",{modules:[F,H],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:"#feedback-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function me(){try{const e=await ie();if(!e||!e.feedbacks){a("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){a("Відгуки відсутні.");return}fe(t),pe(),ue()}catch(e){console.error("Feedback error:",e)}}function fe(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${de(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");le.feedbackList.innerHTML=t}me();function ge(){const e=document.querySelector(".accordion-container");e&&new J(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}ge();const h=document.querySelector(".filter-list");async function ye(e){if(h)try{const r=`
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
      ${(await ae()).map(s=>`
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
        </li>`).join("")}`;h.innerHTML=r,h.addEventListener("click",s=>{const n=s.target.closest(".filter-btn");if(!n)return;const o=n.dataset.categoryId;e==null||e(o||void 0),h.querySelectorAll(".filter-btn").forEach(i=>i.classList.remove("active-filter")),n.classList.add("active-filter")})}catch(t){console.error(t),a("Не вдалося завантажити категорії")}}const b=document.querySelector(".card-list"),m=document.querySelector(".more-btn"),O=document.querySelector(".card-gallery .loader");let A=[],y=0;const I=8;async function be(e){O.classList.remove("hidden");try{return(await oe(1,30,e)).furnitures}catch(t){return console.error(t),a("Не вдалося завантажити меблі"),[]}finally{O.classList.add("hidden")}}async function ve(){return b?(m.style.display="none",await N(void 0),m&&m.addEventListener("click",()=>he()),{setCategory:N}):console.error("Контейнер не знайдено!")}function he(){y+=I,D()}async function N(e){y=0,b.innerHTML="",m.style.display="none";try{A=await be(e),D()}catch(t){b.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t),a("Не вдалося завантажити категорію меблів")}}function D(){const e=A.slice(y,y+I);b.insertAdjacentHTML("beforeend",e.map(t=>`
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
    `).join("")),m&&(m.style.display=y+I>=A.length?"none":"block")}b.addEventListener("click",async e=>{const t=e.target.closest(".card-btn");if(!t)return;const r=t.dataset.id;if(r)try{const s=await ce(r);V(s)}catch(s){console.error(s),a("Не вдалося завантажити дані меблів")}});async function we(){const e=await ve();ye(e.setCategory)}we();
//# sourceMappingURL=index.js.map
