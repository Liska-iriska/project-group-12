import{S as O,N as _,P as G,K as W,a as I,i as E,r as X,A as Y}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(i){if(i.ep)return;i.ep=!0;const c=r(i);fetch(i.href,c)}})();async function ee(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await I(t,{params:e})).data.furnitures}catch(r){return E.error({title:"Error",message:`An error occurred: ${r.message}`,position:"topRight"}),[]}}const R=document.querySelector(".popular-list"),te=async()=>{const e=await ee();e.length>0?e.forEach(t=>R.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):R.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};te();const re=new O(".popular-swiper",{modules:[_,G,W],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});re.update();function ne(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function S(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}function k(e="Щось пішло не так"){E.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function se(e="Успішно"){E.success({title:"OK",message:e,position:"topRight",timeout:3e3})}const p=I.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let q=0;p.interceptors.request.use(e=>(q++,ne(),e),e=>(S(),Promise.reject(e)));p.interceptors.response.use(e=>(--q<=0&&S(),e),e=>{var r,s;--q<=0&&S();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return k(t),Promise.reject(e)});async function U(e=1,t=30,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);const{data:i}=await p.get("/furnitures",{params:s});return i}const V=()=>p.get("/categories").then(e=>e.data),ie=(e=25)=>p.get(`/feedbacks?limit=${e}`).then(t=>t.data),u=document.querySelector(".burger"),m=document.querySelector("#mobileMenu"),d=document.querySelector(".overlay");function C(){m==null||m.classList.remove("active-burger"),u==null||u.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow=""}u&&m&&u.addEventListener("click",()=>{const e=m.classList.toggle("active-burger");u.classList.toggle("active-burger"),d==null||d.classList.toggle("active-burger"),e?document.body.classList.add("is-open-burger"):C()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&C()});window.addEventListener("keydown",e=>{e.key==="Escape"&&C()});history.scrollRestoration&&(history.scrollRestoration="manual");const f=document.querySelector(".furniture-modal"),y=document.querySelector(".modal-overlay"),M=document.querySelector(".order-form");function oe(){!f||!y||(document.addEventListener("click",e=>{const t=e.target;(t.closest(".card-btn")||t.closest(".popular-btn"))&&(f.style.display="flex",document.body.style.overflow="hidden"),t.closest(".order-button-modal")&&(f.style.display="none",y.style.display="flex"),(t.closest(".close-btn")||t.closest(".modal-close-btn")||(t===f||t===y))&&H()}),M&&M.addEventListener("submit",e=>{e.preventDefault(),se("Заявку надіслано! Ми скоро зателефонуємо."),H(),M.reset()}))}function H(){f.style.display="none",y.style.display="none",document.body.style.overflow="initial"}const ce={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function ae(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function le(){document.querySelectorAll(".js-star").forEach(e=>{X({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function ue(){new O(".feedback-swiper",{modules:[_,G],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function de(){try{const e=await ie();if(!e||!e.feedbacks){k("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){k("Відгуки відсутні.");return}fe(t),ue(),le()}catch(e){console.error("Feedback error:",e)}}function fe(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${ae(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");ce.feedbackList.innerHTML=t}de();function me(){const e=document.querySelector(".accordion-container");e&&new Y(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}me();const b=document.querySelector(".filter-list");async function ge(e){if(b)try{const r=`
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

      ${(await V()).map(s=>`
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
    `;b.innerHTML=r,b.addEventListener("click",s=>{const i=s.target.closest(".filter-btn");if(!i)return;const c=i.dataset.categoryId;e==null||e(c||void 0),b.querySelectorAll(".filter-btn").forEach(l=>l.classList.remove("active-filter")),i.classList.add("active-filter")})}catch(t){console.error(t)}}const h=document.querySelector(".card-list"),v=document.querySelector(".more-btn");let $=[],g=0;const A=8;async function pe(){return h?(await N(void 0),v&&v.addEventListener("click",()=>ye()),{setCategory:N}):console.error("Контейнер не знайдено!")}async function be(e){return(await U(1,30,e)).furnitures}function ye(){g+=A,D()}async function N(e){g=0,h.innerHTML="";try{$=await be(e),D()}catch(t){h.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t)}}function D(){const e=$.slice(g,g+A);h.insertAdjacentHTML("beforeend",e.map(t=>`
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
    `).join("")),v&&(v.style.display=g+A>=$.length?"none":"block")}const he=I.create({baseURL:"https://furniture-store-v2.b.goit.study/api"}),o={modal:document.querySelector(".furniture-modal"),closeBtn:document.querySelector(".close-btn"),modalMainImg:document.querySelector("#main-img"),furnitureName:document.querySelector("#furniture-name"),furnitureCategory:document.querySelector("#furniture-category"),furniturePrice:document.querySelector("#furniture-price"),furnitureRating:document.querySelector("#modal-rating"),furnitureColors:document.querySelector("#furniture-colors"),furnitureDescription:document.querySelector("#furniture-description"),furnitureSize:document.querySelector("#furniture-size"),modalOrderBtn:document.querySelector("#modal-order-btn"),modalSmallImages:document.querySelector("#small-images")};function ve(e){o.modal.classList.remove("visually-hidden"),o.furnitureName.textContent=e.name,o.furniturePrice.textContent=e.price,e.img&&(o.modalMainImg.src=e.img),o.furnitureColors.innerHTML=e.colors,Le(),document.body.style.overflow="hidden"}function P(){o.modal.classList.add("visually-hidden"),document.body.style.overflow=""}o.closeBtn.addEventListener("click",P);o.modal.addEventListener("click",e=>{e.target===o.modal&&P()});document.addEventListener("keydown",e=>{e.key==="Escape"&&P()});function Le(){const e=o.furnitureColors.querySelectorAll(".color-dot");e.length&&(e[0].classList.add("active"),e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(r=>r.classList.remove("active")),t.classList.add("active")})}))}async function we(e){try{return(await he.get(`/furnitures/${e}`)).data}catch(t){console.error("Помилка отримання товару:",t)}}function Me(e){var t;o.furnitureCategory.textContent=((t=e.category)==null?void 0:t.name)??e.category??"",o.furnitureDescription.textContent=e.description??"",o.furnitureSize.textContent=e.sizes??"",Se(e.rating),ke(e.images)}function Se(e=0){o.furnitureRating.innerHTML="";for(let t=1;t<=5;t++){const r=Math.min(Math.max(e-(t-1),0),1)*100;o.furnitureRating.innerHTML+=`
            <div class="star-wrapper" style="position: relative; display: inline-block; width: 16px; height: 16px;">
                <svg class="star0" width="16" height="16">
                    <use href="../img/sprite.svg#star0"></use>
                </svg>
                <svg class="star" width="16" height="16" style="position: absolute; top: 0; left: 0; overflow: hidden;">
                    <use href="../img/sprite.svg#star"></use>
                    <rect width="${r}%" height="100%" fill="white" style="clip-path: inset(0 ${100-r}% 0 0)"></rect>
                </svg>
            </div>
        `}}function ke(e=[]){if(!e.length){o.modalSmallImages.innerHTML="";return}o.modalMainImg.src=e[0],o.modalSmallImages.innerHTML=e.slice(1).map((t,r)=>`
            <img 
                src="${t}" 
                class="small-img ${r===0?"active":""}" 
            />
        `).join(""),qe()}function qe(){const e=o.modalSmallImages.querySelectorAll(".small-img");e.forEach(t=>{t.addEventListener("click",()=>{o.modalMainImg.src=t.src,e.forEach(r=>r.classList.remove("active")),t.classList.add("active")})})}const $e=document.querySelector(".card-list");$e.addEventListener("click",async e=>{var T;const t=e.target.closest(".card-btn");if(!t)return;const r=t.closest(".card-list-item"),s=r.querySelector(".card-title").textContent,i=r.querySelector(".card-price").textContent,c=((T=r.querySelector("img"))==null?void 0:T.src)||"",l=r.querySelector(".card-colors"),Q=(l==null?void 0:l.innerHTML)||"";ve({name:s,price:i,img:c,colors:Q});const j=t.dataset.detailsId;if(!j)return;const F=await we(j);F&&Me(F)});const a={furnitureList:document.querySelector(".card-list"),loadMoreBtn:document.querySelector(".more-btn"),filterList:document.querySelector(".filter-list"),filterButtons:document.querySelectorAll(".filter-btn")},n={page:1,limit:10,currentCategory:"all",loadedItems:[],categories:[],hasMore:!0,isLoading:!1,isInitialized:!1};function Ae(e){const t=e.color??e.colors??[];return Array.isArray(t)?t:typeof t=="string"&&t.trim()!==""?[t]:[]}function Ie(e){return e.length?e.map(t=>`
        <span
          class="color-dot"
          style="background-color: ${t}"
          title="${t}"
        ></span>
      `).join(""):""}function Ee(e){if(e==null||e==="")return"Ціну уточнюйте";const t=Number(e);return Number.isNaN(t)?`${e} грн`:`${t.toLocaleString("uk-UA")} грн`}function Ce(e,t){return e?`
    <img
      class="card-img-placeholder"
      src="${e}"
      alt="${t}"
      loading="lazy"
    />
  `:'<div class="card-img-placeholder"></div>'}function Pe(e){return Array.isArray(e)?e:Array.isArray(e==null?void 0:e.items)?e.items:Array.isArray(e==null?void 0:e.furnitures)?e.furnitures:Array.isArray(e==null?void 0:e.results)?e.results:Array.isArray(e==null?void 0:e.data)?e.data:[]}function xe(e){return Array.isArray(e)?e:Array.isArray(e==null?void 0:e.items)?e.items:Array.isArray(e==null?void 0:e.categories)?e.categories:Array.isArray(e==null?void 0:e.data)?e.data:[]}function K(e){return e._id??e.id??""}function Be(e,t){const r=new Map;return[...e,...t].forEach(s=>{r.set(K(s),s)}),[...r.values()]}function je(e){var r,s;const t=((r=e.category)==null?void 0:r.name)??e.category??e.type??((s=e.furnitureType)==null?void 0:s.name)??e.furnitureType??"";return String(t).trim().toLowerCase()}function L(e){return n.currentCategory==="all"?e:e.filter(t=>je(t)===n.currentCategory)}function Fe(e,t){const r=Number((e==null?void 0:e.totalPages)??(e==null?void 0:e.pages)??0),s=Number((e==null?void 0:e.page)??n.page),i=Number((e==null?void 0:e.total)??(e==null?void 0:e.totalItems)??0);if(r>0){n.hasMore=s<r;return}if(i>0){n.hasMore=n.loadedItems.length<i;return}n.hasMore=t===n.limit}function Te(e){var l;const t=K(e),r=e.name??"Без назви",s=((l=e.images)==null?void 0:l[0])??e.image??"",i=Ae(e),c=Ee(e.price);return`
    <li class="card-list-item">
      ${Ce(s,r)}

      <div class="card-content">
        <h3 class="card-title">${r}</h3>

        <div class="card-colors">
          ${Ie(i)}
        </div>

        <p class="card-price">${c}</p>

        <button
          type="button"
          class="card-btn"
          data-details-id="${t}"
        >
          Детальніше
        </button>
      </div>
    </li>
  `}function x(e=[]){const t=e.map(Te).join("");a.furnitureList.innerHTML=t}function Re(){a.furnitureList.innerHTML=""}function w(e="За вашим запитом товарів не знайдено."){a.furnitureList.innerHTML=`
    <li class="card-list-item">
      <div class="card-content">
        <p class="card-price">${e}</p>
      </div>
    </li>
  `}function z(){var e;(e=a.loadMoreBtn)==null||e.classList.add("is-hidden")}function J(){var e;(e=a.loadMoreBtn)==null||e.classList.remove("is-hidden")}function He(){var e;(e=a.loadMoreBtn)==null||e.setAttribute("disabled","true")}function Ne(){var e;(e=a.loadMoreBtn)==null||e.removeAttribute("disabled")}function Z(e="all"){a.filterButtons.forEach(t=>{const r=t.dataset.category===e;t.classList.toggle("is-active",r)})}async function ze(){try{const e=await V();n.categories=xe(e)}catch(e){console.error("Не вдалося завантажити категорії:",e),n.categories=[]}}async function B(){if(!(n.isLoading||!n.hasMore)){n.isLoading=!0,He();try{const e=await U(n.page,n.limit),t=Pe(e);n.loadedItems=Be(n.loadedItems,t),Fe(e,t.length);const r=L(n.loadedItems);r.length?x(r):w(),n.hasMore?J():z()}catch(e){console.error("Не вдалося завантажити товари:",e),w("Не вдалося завантажити товари."),z()}finally{n.isLoading=!1,Ne()}}}async function Oe(){let e=L(n.loadedItems);for(;!e.length&&n.hasMore;)n.page+=1,await B(),e=L(n.loadedItems);e.length?x(e):w()}async function _e(){n.isLoading||!n.hasMore||(n.page+=1,await B())}async function Ge(e){const t=e.target.closest(".filter-btn");if(!t)return;const r=t.dataset.category??"all";n.currentCategory=r,Z(r);const s=L(n.loadedItems);s.length?x(s):n.hasMore?await Oe():w()}function Ue(){var e,t;(e=a.loadMoreBtn)==null||e.addEventListener("click",_e),(t=a.filterList)==null||t.addEventListener("click",Ge)}function Ve(){n.page=1,n.currentCategory="all",n.loadedItems=[],n.hasMore=!0,n.isLoading=!1}async function De(){!a.furnitureList||!a.loadMoreBtn||!a.filterList||(n.isInitialized||(Ue(),n.isInitialized=!0),Ve(),Z("all"),Re(),J(),await ze(),await B())}async function Ke(){const{setCategory:e}=await pe();ge(e)}document.addEventListener("DOMContentLoaded",()=>{De(),Ke()});oe();
//# sourceMappingURL=index.js.map
