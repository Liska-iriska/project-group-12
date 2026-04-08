import{S as _,N as G,P as U,K as Y,a as E,i as C,r as ee,A as te}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(i){if(i.ep)return;i.ep=!0;const c=r(i);fetch(i.href,c)}})();async function re(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await E(t,{params:e})).data.furnitures}catch(r){return C.error({title:"Error",message:`An error occurred: ${r.message}`,position:"topRight"}),[]}}const H=document.querySelector(".popular-list"),ne=async()=>{const e=await re();e.length>0?e.forEach(t=>H.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):H.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};ne();const se=new _(".popular-swiper",{modules:[G,U,Y],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});se.update();function ie(){const e=document.querySelector("[data-loader]");e&&e.classList.add("is-visible")}function $(){const e=document.querySelector("[data-loader]");e&&e.classList.remove("is-visible")}function q(e="Щось пішло не так"){C.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}function oe(e="Успішно"){C.success({title:"OK",message:e,position:"topRight",timeout:3e3})}const g=E.create({baseURL:"https://furniture-store-v2.b.goit.study/api"});let k=0;g.interceptors.request.use(e=>(k++,ie(),e),e=>($(),Promise.reject(e)));g.interceptors.response.use(e=>(--k<=0&&$(),e),e=>{var r,s;--k<=0&&$();const t=((s=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:s.message)||"Помилка запиту";return q(t),Promise.reject(e)});async function V(e=1,t=30,r){const s={page:e,limit:t};r&&r!=="all"&&(s.category=r);const{data:i}=await g.get("/furnitures",{params:s});return i}const D=()=>g.get("/categories").then(e=>e.data),ce=(e=25)=>g.get(`/feedbacks?limit=${e}`).then(t=>t.data),u=document.querySelector(".burger"),y=document.querySelector("#mobileMenu");document.querySelector(".modal-menu__close");const h=u==null?void 0:u.querySelector(".use-header"),d=document.querySelector(".overlay"),K="/img/sprite.svg";function P(){y&&y.classList.remove("active-burger"),u==null||u.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",h&&h.setAttribute("href",`${K}#menu`)}u&&y&&u.addEventListener("click",()=>{const e=y.classList.toggle("active-burger");if(u.classList.toggle("active-burger"),d==null||d.classList.toggle("active-burger"),h){const t=e?"close":"menu";h.setAttribute("href",`${K}#${t}`)}e?document.body.classList.add("is-open-burger"):P()});document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&P()});window.addEventListener("keydown",e=>{e.key==="Escape"&&P()});history.scrollRestoration&&(history.scrollRestoration="manual");const f=document.querySelector(".furniture-modal"),b=document.querySelector(".modal-overlay"),S=document.querySelector(".order-form");function ae(){!f||!b||(document.addEventListener("click",e=>{const t=e.target;(t.closest(".card-btn")||t.closest(".popular-btn"))&&(f.style.display="flex",document.body.style.overflow="hidden"),t.closest(".order-button-modal")&&(f.style.display="none",b.style.display="flex"),(t.closest(".close-btn")||t.closest(".modal-close-btn")||(t===f||t===b))&&N()}),S&&S.addEventListener("submit",e=>{e.preventDefault(),oe("Заявку надіслано! Ми скоро зателефонуємо."),N(),S.reset()}))}function N(){f.style.display="none",b.style.display="none",document.body.style.overflow="initial"}const le={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function ue(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function de(){document.querySelectorAll(".js-star").forEach(e=>{ee({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function fe(){new _(".feedback-swiper",{modules:[G,U],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function me(){try{const e=await ce();if(!e||!e.feedbacks){q("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){q("Відгуки відсутні.");return}ge(t),fe(),de()}catch(e){console.error("Feedback error:",e)}}function ge(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${ue(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");le.feedbackList.innerHTML=t}me();function pe(){const e=document.querySelector(".accordion-container");e&&new te(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}pe();const p=document.querySelector(".filter-list");async function be(e){if(p)try{const r=`
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

      ${(await D()).map(s=>`
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
    `;p.innerHTML=r,p.addEventListener("click",s=>{const i=s.target.closest(".filter-btn");if(!i)return;const c=i.dataset.categoryId;e==null||e(c||void 0),p.querySelectorAll(".filter-btn").forEach(l=>l.classList.remove("active-filter")),i.classList.add("active-filter")})}catch(t){console.error(t)}}const v=document.querySelector(".card-list"),L=document.querySelector(".more-btn");let A=[],m=0;const I=8;async function ye(){return v?(await z(void 0),L&&L.addEventListener("click",()=>ve()),{setCategory:z}):console.error("Контейнер не знайдено!")}async function he(e){return(await V(1,30,e)).furnitures}function ve(){m+=I,J()}async function z(e){m=0,v.innerHTML="";try{A=await he(e),J()}catch(t){v.innerHTML="<p>Помилка завантаження меблів</p>",console.error(t)}}function J(){const e=A.slice(m,m+I);v.insertAdjacentHTML("beforeend",e.map(t=>`
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
    `).join("")),L&&(L.style.display=m+I>=A.length?"none":"block")}const Le=E.create({baseURL:"https://furniture-store-v2.b.goit.study/api"}),o={modal:document.querySelector(".furniture-modal"),closeBtn:document.querySelector(".close-btn"),modalMainImg:document.querySelector("#main-img"),furnitureName:document.querySelector("#furniture-name"),furnitureCategory:document.querySelector("#furniture-category"),furniturePrice:document.querySelector("#furniture-price"),furnitureRating:document.querySelector("#modal-rating"),furnitureColors:document.querySelector("#furniture-colors"),furnitureDescription:document.querySelector("#furniture-description"),furnitureSize:document.querySelector("#furniture-size"),modalOrderBtn:document.querySelector("#modal-order-btn"),modalSmallImages:document.querySelector("#small-images")};function we(e){o.modal.classList.remove("visually-hidden"),o.furnitureName.textContent=e.name,o.furniturePrice.textContent=e.price,e.img&&(o.modalMainImg.src=e.img),o.furnitureColors.innerHTML=e.colors,Me(),document.body.style.overflow="hidden"}function x(){o.modal.classList.add("visually-hidden"),document.body.style.overflow=""}o.closeBtn.addEventListener("click",x);o.modal.addEventListener("click",e=>{e.target===o.modal&&x()});document.addEventListener("keydown",e=>{e.key==="Escape"&&x()});function Me(){const e=o.furnitureColors.querySelectorAll(".color-dot");e.length&&(e[0].classList.add("active"),e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(r=>r.classList.remove("active")),t.classList.add("active")})}))}async function Se(e){try{return(await Le.get(`/furnitures/${e}`)).data}catch(t){console.error("Помилка отримання товару:",t)}}function $e(e){var t;o.furnitureCategory.textContent=((t=e.category)==null?void 0:t.name)??e.category??"",o.furnitureDescription.textContent=e.description??"",o.furnitureSize.textContent=e.sizes??"",qe(e.rating),ke(e.images)}function qe(e=0){o.furnitureRating.innerHTML="";for(let t=1;t<=5;t++){const r=Math.min(Math.max(e-(t-1),0),1)*100;o.furnitureRating.innerHTML+=`
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
        `).join(""),Ae()}function Ae(){const e=o.modalSmallImages.querySelectorAll(".small-img");e.forEach(t=>{t.addEventListener("click",()=>{o.modalMainImg.src=t.src,e.forEach(r=>r.classList.remove("active")),t.classList.add("active")})})}const Ie=document.querySelector(".card-list");Ie.addEventListener("click",async e=>{var R;const t=e.target.closest(".card-btn");if(!t)return;const r=t.closest(".card-list-item"),s=r.querySelector(".card-title").textContent,i=r.querySelector(".card-price").textContent,c=((R=r.querySelector("img"))==null?void 0:R.src)||"",l=r.querySelector(".card-colors"),X=(l==null?void 0:l.innerHTML)||"";we({name:s,price:i,img:c,colors:X});const F=t.dataset.detailsId;if(!F)return;const T=await Se(F);T&&$e(T)});const a={furnitureList:document.querySelector(".card-list"),loadMoreBtn:document.querySelector(".more-btn"),filterList:document.querySelector(".filter-list"),filterButtons:document.querySelectorAll(".filter-btn")},n={page:1,limit:10,currentCategory:"all",loadedItems:[],categories:[],hasMore:!0,isLoading:!1,isInitialized:!1};function Ee(e){const t=e.color??e.colors??[];return Array.isArray(t)?t:typeof t=="string"&&t.trim()!==""?[t]:[]}function Ce(e){return e.length?e.map(t=>`
        <span
          class="color-dot"
          style="background-color: ${t}"
          title="${t}"
        ></span>
      `).join(""):""}function Pe(e){if(e==null||e==="")return"Ціну уточнюйте";const t=Number(e);return Number.isNaN(t)?`${e} грн`:`${t.toLocaleString("uk-UA")} грн`}function xe(e,t){return e?`
    <img
      class="card-img-placeholder"
      src="${e}"
      alt="${t}"
      loading="lazy"
    />
  `:'<div class="card-img-placeholder"></div>'}function Be(e){return Array.isArray(e)?e:Array.isArray(e==null?void 0:e.items)?e.items:Array.isArray(e==null?void 0:e.furnitures)?e.furnitures:Array.isArray(e==null?void 0:e.results)?e.results:Array.isArray(e==null?void 0:e.data)?e.data:[]}function je(e){return Array.isArray(e)?e:Array.isArray(e==null?void 0:e.items)?e.items:Array.isArray(e==null?void 0:e.categories)?e.categories:Array.isArray(e==null?void 0:e.data)?e.data:[]}function Z(e){return e._id??e.id??""}function Fe(e,t){const r=new Map;return[...e,...t].forEach(s=>{r.set(Z(s),s)}),[...r.values()]}function Te(e){var r,s;const t=((r=e.category)==null?void 0:r.name)??e.category??e.type??((s=e.furnitureType)==null?void 0:s.name)??e.furnitureType??"";return String(t).trim().toLowerCase()}function w(e){return n.currentCategory==="all"?e:e.filter(t=>Te(t)===n.currentCategory)}function Re(e,t){const r=Number((e==null?void 0:e.totalPages)??(e==null?void 0:e.pages)??0),s=Number((e==null?void 0:e.page)??n.page),i=Number((e==null?void 0:e.total)??(e==null?void 0:e.totalItems)??0);if(r>0){n.hasMore=s<r;return}if(i>0){n.hasMore=n.loadedItems.length<i;return}n.hasMore=t===n.limit}function He(e){var l;const t=Z(e),r=e.name??"Без назви",s=((l=e.images)==null?void 0:l[0])??e.image??"",i=Ee(e),c=Pe(e.price);return`
    <li class="card-list-item">
      ${xe(s,r)}

      <div class="card-content">
        <h3 class="card-title">${r}</h3>

        <div class="card-colors">
          ${Ce(i)}
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
  `}function B(e=[]){const t=e.map(He).join("");a.furnitureList.innerHTML=t}function Ne(){a.furnitureList.innerHTML=""}function M(e="За вашим запитом товарів не знайдено."){a.furnitureList.innerHTML=`
    <li class="card-list-item">
      <div class="card-content">
        <p class="card-price">${e}</p>
      </div>
    </li>
  `}function O(){var e;(e=a.loadMoreBtn)==null||e.classList.add("is-hidden")}function Q(){var e;(e=a.loadMoreBtn)==null||e.classList.remove("is-hidden")}function ze(){var e;(e=a.loadMoreBtn)==null||e.setAttribute("disabled","true")}function Oe(){var e;(e=a.loadMoreBtn)==null||e.removeAttribute("disabled")}function W(e="all"){a.filterButtons.forEach(t=>{const r=t.dataset.category===e;t.classList.toggle("is-active",r)})}async function _e(){try{const e=await D();n.categories=je(e)}catch(e){console.error("Не вдалося завантажити категорії:",e),n.categories=[]}}async function j(){if(!(n.isLoading||!n.hasMore)){n.isLoading=!0,ze();try{const e=await V(n.page,n.limit),t=Be(e);n.loadedItems=Fe(n.loadedItems,t),Re(e,t.length);const r=w(n.loadedItems);r.length?B(r):M(),n.hasMore?Q():O()}catch(e){console.error("Не вдалося завантажити товари:",e),M("Не вдалося завантажити товари."),O()}finally{n.isLoading=!1,Oe()}}}async function Ge(){let e=w(n.loadedItems);for(;!e.length&&n.hasMore;)n.page+=1,await j(),e=w(n.loadedItems);e.length?B(e):M()}async function Ue(){n.isLoading||!n.hasMore||(n.page+=1,await j())}async function Ve(e){const t=e.target.closest(".filter-btn");if(!t)return;const r=t.dataset.category??"all";n.currentCategory=r,W(r);const s=w(n.loadedItems);s.length?B(s):n.hasMore?await Ge():M()}function De(){var e,t;(e=a.loadMoreBtn)==null||e.addEventListener("click",Ue),(t=a.filterList)==null||t.addEventListener("click",Ve)}function Ke(){n.page=1,n.currentCategory="all",n.loadedItems=[],n.hasMore=!0,n.isLoading=!1}async function Je(){!a.furnitureList||!a.loadMoreBtn||!a.filterList||(n.isInitialized||(De(),n.isInitialized=!0),Ke(),W("all"),Ne(),Q(),await _e(),await j())}async function Ze(){const{setCategory:e}=await ye();be(e)}document.addEventListener("DOMContentLoaded",()=>{Je(),Ze()});ae();
//# sourceMappingURL=index.js.map
