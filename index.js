import{i as w,a as L,S as C,N,P as F,K as V,r as z,A as D}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();function a(e="Щось пішло не так"){w.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function K(e="Успішно"){w.success({title:"OK",message:e,position:"topRight",timeout:3e3})}const u=document.querySelector(".furniture-modal"),$=document.querySelector("#modal-close-btn"),U=document.querySelector(".furniture-gallery-modal"),q=document.querySelector(".content-container"),p=document.querySelector("[data-order-modal]"),S=document.querySelector("[data-order-modal-close]"),i=document.querySelector("#orderForm");function H(e){J(e),u.style.display="flex",document.body.style.overflow="hidden"}function M(){u.style.display="none",document.body.style.overflow=""}$==null||$.addEventListener("click",M);u==null||u.addEventListener("click",e=>{e.target===u&&M()});function J(e){W(e),Z(e),Q(e)}function W(e){var s;if(!((s=e.images)!=null&&s.length))return;const[t,...r]=e.images;U.innerHTML=`
    <img src="${t}" alt="${e.name}" class="big-image-sofa" />
    <div class="small-images">
      ${r.map(n=>`<img src="${n}" alt="${e.name}" class="small-image-sofa" />`).join("")}
    </div>
  `}function Z(e){var t;q.innerHTML=`
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
  `}function Q(e){const t=q.querySelector(".order-button-modal");t&&t.addEventListener("click",()=>{const r=q.querySelector('input[name="color"]:checked'),s=r?r.value:e.color[0];M(),p.style.display="flex",document.body.style.overflow="hidden",i.dataset.modelId=e._id,i.dataset.color=s})}S==null||S.addEventListener("click",A);p==null||p.addEventListener("click",e=>{e.target===p&&A()});function A(){p.style.display="none",document.body.style.overflow=""}i==null||i.addEventListener("submit",async e=>{var I,T,_;e.preventDefault();const t=i.querySelector("#orderName").value.trim(),r=i.querySelector("#orderPhone").value.replace(/\D/g,""),s=i.querySelector("#orderComment").value.trim(),n=i.dataset.modelId,o=i.dataset.color;if(!t||!r||!n||!o){a("Будь ласка, заповніть усі обов'язкові поля!");return}if(s&&s.length<5){a("Коментар повинен бути щонайменше 5 символів!");return}const d={name:t,phone:r,modelId:n,color:o,comment:s};console.log("Payload для отправки на сервер:",d);try{const f=await L.post("https://furniture-store-v2.b.goit.study/api/orders",d,{headers:{"Content-Type":"application/json"}});console.log("Ответ сервера:",f.data),K("Заявка успішно надіслана!"),i.reset(),A()}catch(f){console.error("Ошибка при отправке заявки:",((I=f.response)==null?void 0:I.data)||f),a(((_=(T=f.response)==null?void 0:T.data)==null?void 0:_.message)||"Сталася помилка при відправці заявки")}});async function X(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await L(t,{params:e})).data.furnitures}catch(r){return w.error({title:"Помилка",message:`Не вдалося завантажити популярні товари: ${r.message}`,position:"topRight",timeout:4e3}),[]}}const k=document.querySelector(".popular-list"),Y=async()=>{const e=await X();e.length>0?(e.forEach(t=>{k.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
          <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
          <div class="popular-info">
            <h3 class="popular-subtitle">${t.name}</h3>
            <div class="popular-colors">
              ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
            </div>
            <p class="popular-price">${t.price} грн</p>
          </div>
          <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
        </li>`)}),k.addEventListener("click",async t=>{const r=t.target.closest(".popular-btn");if(!r)return;const s=r.dataset.id;try{const o=(await L.get(`https://furniture-store-v2.b.goit.study/api/furnitures/${s}`)).data;H(o)}catch(n){console.error(n),w.error({title:"Помилка",message:"Не вдалося завантажити товар",position:"topRight",timeout:4e3})}})):k.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};Y();const ee=new C(".popular-swiper",{modules:[N,F,V],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});ee.update();function te(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function E(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}const v=L.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let P=0;v.interceptors.request.use(e=>(P++,te(),e),e=>(E(),Promise.reject(e)));v.interceptors.response.use(e=>(--P<=0&&E(),e),e=>{var r,s;--P<=0&&E();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return a(t),Promise.reject(e)});const re="https://furniture-store-v2.b.goit.study/api";async function se(e=1,t=8,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);try{const{data:n}=await v.get("/furnitures",{params:s});return n}catch(n){return console.error(n),a("Не вдалося завантажити меблі"),{furnitures:[]}}}const ne=async()=>{try{return(await v.get("/categories")).data}catch(e){return console.error(e),a("Не вдалося завантажити категорії"),[]}},oe=async(e=25)=>{try{return(await v.get(`/feedbacks?limit=${e}`)).data}catch(t){return console.error(t),a("Не вдалося завантажити відгуки"),[]}};async function ae(e){try{const t=await fetch(`${re}/furnitures/${e}`);if(!t.ok){const r=await t.json().catch(()=>({}));throw console.error("Server response:",r),a("Не вдалося отримати меблі"),new Error("Не вдалося отримати меблі")}return t.json()}catch(t){throw console.error(t),a("Помилка при завантаженні меблів"),t}}"scrollRestoration"in history&&(history.scrollRestoration="manual");const g=document.querySelector(".burger"),c=document.querySelector("#mobileMenu"),l=document.querySelector(".overlay");function R(){c.classList.contains("active-burger")&&(c.classList.remove("active-burger"),g.classList.remove("active-burger"),l==null||l.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",c.addEventListener("transitionend",function e(t){t.propertyName==="transform"&&(c.style.visibility="hidden",c.removeEventListener("transitionend",e))}))}g&&c&&g.addEventListener("click",()=>{const e=c.classList.toggle("active-burger");g.classList.toggle("active-burger"),l==null||l.classList.toggle("active-burger"),e?(c.style.visibility="visible",document.body.classList.add("is-open-burger")):R()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&R()});window.addEventListener("keydown",e=>{e.key==="Escape"&&R()});window.addEventListener("resize",()=>{window.innerWidth>=768&&(c.classList.remove("active-burger"),g.classList.remove("active-burger"),l==null||l.classList.remove("active-burger"),c.style.visibility="hidden",document.body.classList.remove("is-open-burger"),document.body.style.overflow="")});const ie={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function ce(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function le(){document.querySelectorAll(".js-star").forEach(e=>{z({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function de(){new C(".feedback-swiper",{modules:[N,F],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function ue(){try{const e=await oe();if(!e||!e.feedbacks){a("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){a("Відгуки відсутні.");return}pe(t),de(),le()}catch(e){console.error("Feedback error:",e)}}function pe(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${ce(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");ie.feedbackList.innerHTML=t}ue();function me(){const e=document.querySelector(".accordion-container");e&&new D(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}me();const h=document.querySelector(".filter-list");async function fe(e){if(h)try{const r=`
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
      ${(await ne()).map(s=>`
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
        </li>`).join("")}`;h.innerHTML=r,h.addEventListener("click",s=>{const n=s.target.closest(".filter-btn");if(!n)return;const o=n.dataset.categoryId;e==null||e(o||void 0),h.querySelectorAll(".filter-btn").forEach(d=>d.classList.remove("active-filter")),n.classList.add("active-filter")})}catch(t){console.error(t),a("Не вдалося завантажити категорії")}}const b=document.querySelector(".card-list"),m=document.querySelector(".more-btn"),B=document.querySelector(".card-gallery .loader");let j=[],y=0;const x=8;async function ge(e){B.classList.remove("hidden");try{return(await se(1,30,e)).furnitures}catch(t){return console.error(t),a("Не вдалося завантажити меблі"),[]}finally{B.classList.add("hidden")}}async function ye(){return b?(m.style.display="none",await O(void 0),m&&m.addEventListener("click",()=>be()),{setCategory:O}):console.error("Контейнер не знайдено!")}function be(){y+=x,G()}async function O(e){y=0,b.innerHTML="",m.style.display="none";try{j=await ge(e),G()}catch(t){b.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t),a("Не вдалося завантажити категорію меблів")}}function G(){const e=j.slice(y,y+x);b.insertAdjacentHTML("beforeend",e.map(t=>`
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
    `).join("")),m&&(m.style.display=y+x>=j.length?"none":"block")}b.addEventListener("click",async e=>{const t=e.target.closest(".card-btn");if(!t)return;const r=t.dataset.id;if(r)try{const s=await ae(r);H(s)}catch(s){console.error(s),a("Не вдалося завантажити дані меблів")}});async function ve(){const e=await ye();fe(e.setCategory)}ve();
//# sourceMappingURL=index.js.map
