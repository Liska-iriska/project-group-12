import{S as N,N as R,P as H,K,a as M,i as j,r as J,A as Z}from"./assets/vendor-BlfOi8zo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(i){if(i.ep)return;i.ep=!0;const c=r(i);fetch(i.href,c)}})();async function Q(){const e=new URLSearchParams({limit:30,type:"popular"}),t="https://furniture-store-v2.b.goit.study/api/furnitures";try{return(await M(t,{params:e})).data.furnitures}catch(r){return j.error({title:"Error",message:`An error occurred: ${r.message}`,position:"topRight"}),[]}}const B=document.querySelector(".popular-list"),W=async()=>{const e=await Q();e.length>0?e.forEach(t=>B.insertAdjacentHTML("beforeend",`<li class="swiper-slide popular-item">
      <img class="popular-img" src="${t.images[0]}" alt="${t.name}" />
      <div class="popular-info">
        <h3 class="popular-subtitle">${t.name}</h3>
        <div class="popular-colors">
          ${t.color.map(r=>`<span class="popular-color" style="background-color: ${r}; border: 1px solid ${r};"></span>`).join("")}
        </div>
        <p class="popular-price">${t.price} грн</p>
      </div>
      <button class="popular-btn" type="button" data-id="${t._id}">Детальніше</button>
    </li>`)):B.innerHTML='<p class="no-popular">Наразі немає доступу до популярних товарів</p>'};W();const X=new N(".popular-swiper",{modules:[R,H,K],slidesPerView:1,spaceBetween:24,keyboard:{enabled:!0},navigation:{nextEl:".popular-button-next",prevEl:".popular-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:4}}});X.update();function m(e="Щось пішло не так"){j.error({title:"Помилка",message:e,position:"topRight",timeout:4e3})}const Y="https://furniture-store-v2.b.goit.study/api",S=M.create({baseURL:Y,headers:{"Content-Type":"application/json"}});async function z(e=1,t=30,r){try{let s=`/furnitures?page=${e}&limit=${t}`;return r&&r!=="all"&&(s+=`&category=${encodeURIComponent(r)}`),(await S.get(s)).data}catch(s){throw m("Не вдалося завантажити галерею карток."),s}}async function O(){try{return(await S.get("/categories")).data}catch(e){throw m("Не вдалося завантажити категорії."),e}}async function ee(e=25){try{return(await S.get(`/feedbacks?limit=${e}`)).data}catch(t){throw m("Не вдалося завантажити відгуки."),t}}const u=document.querySelector(".burger"),g=document.querySelector("#mobileMenu");document.querySelector(".modal-menu__close");const p=u==null?void 0:u.querySelector("use"),d=document.querySelector(".overlay");function $(){g&&g.classList.remove("active-burger"),u==null||u.classList.remove("active-burger"),d==null||d.classList.remove("active-burger"),document.body.classList.remove("is-open-burger"),document.body.style.overflow="",p&&p.setAttribute("href","/img/sprite.svg#menu")}u&&g&&u.addEventListener("click",()=>{const e=g.classList.toggle("active-burger");u.classList.toggle("active-burger"),d==null||d.classList.toggle("active-burger"),p&&p.setAttribute("href",e?"/img/sprite.svg#close":"/img/sprite.svg#menu"),e?document.body.classList.add("is-open-burger"):$()});посилання;document.addEventListener("click",e=>{const t=e.target;(t.closest("#mobileMenu a")||t.closest(".overlay")||t.closest(".modal-menu__close"))&&$()});window.addEventListener("keydown",e=>{e.key==="Escape"&&$()});const te={feedbackList:document.querySelector(".js-feedback-list"),btnPrev:document.querySelector(".swiper-button-prev"),btnNext:document.querySelector(".swiper-button-next")};function re(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function ne(){document.querySelectorAll(".js-star").forEach(e=>{J({element:e,starSize:20,rating:Number(e.dataset.rating),readOnly:!0})})}function ie(){new N(".feedback-swiper",{modules:[R,H],slidesPerView:1,spaceBetween:16,grabCursor:!0,loop:!1,observer:!0,observeParents:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{prevEl:".feedback-button-prev",nextEl:".feedback-button-next"},breakpoints:{768:{slidesPerGroup:1,slidesPerView:2,spaceBetween:24},1440:{slidesPerGroup:1,slidesPerView:3,spaceBetween:24}}})}async function se(){try{const e=await ee();if(!e||!e.feedbacks){m("Відгуки відсутні.");return}const t=e.feedbacks;if(t.length===0){m("Відгуки відсутні.");return}oe(t),ie(),ne()}catch(e){console.error("Feedback error:",e)}}function oe(e){const t=e.map(r=>`
        <li class="swiper-slide">
            <div class="js-star" data-rating="${re(r.rate)}"></div>
            <p class="feedback-descr">${r.descr}</p>
            <p class="feedback-author">${r.name}</p>
        </li>
    `).join("");te.feedbackList.innerHTML=t}se();function ce(){const e=document.querySelector(".accordion-container");e&&new Z(e,{duration:400,showMultiple:!1,collapse:!0,elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel"})}ce();const v=document.querySelector(".filter-list"),x=["filter-all","filter-soft","filter-cupboard","filter-bed","filter-table","filter-chair","filter-kitchen","filter-childrens","filter-office","filter-rest","filter-bathroom","filter-outdoor","filter-decor"];async function ae(e){if(!v)return console.error("Контейнер для фильтров не найден!");try{const t=await O();let r=`
      <li class="filter-item">
        <button class="filter-btn ${x[0]} active-filter" data-category-id="">Всі товари</button>
      </li>
    `;t.forEach((i,c)=>{const a=x[c+1]||"";r+=`
        <li class="filter-item">
          <button class="filter-btn ${a}" data-category-id="${i._id}">
            ${i.name}
          </button>
        </li>
      `}),v.innerHTML=r;const s=v.querySelectorAll(".filter-btn");s.forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.categoryId;e&&e(c||void 0),s.forEach(a=>a.classList.remove("active-filter")),i.classList.add("active-filter")})})}catch(t){console.error("Ошибка загрузки фильтров:",t)}}const k=document.querySelector(".card-list"),h=document.querySelector(".more-btn");let L=[],f=0;const w=8;async function le(){return k?(await F(void 0),h&&h.addEventListener("click",()=>de()),{setCategory:F}):console.error("Контейнер для карточек не найден!")}async function ue(e){return(await z(1,30,e)).furnitures}function de(){f+=w,U()}async function F(e){f=0;try{L=await ue(e),U()}catch(t){k.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}function U(){const e=L.slice(f,f+w);k.innerHTML=e.map(t=>`
      <li class="card-list-item">
        <img class="card-img" src="${t.images[0]||"placeholder.jpg"}" alt="${t.name}" />
        <div class="card-content">
          <h3 class="card-title">${t.name}</h3>
          <div class="card-colors">
            ${t.color.map(r=>`<span class="color-dot" style="background-color: ${r}"></span>`).join("")}
          </div>
          <p class="card-price">${t.price} грн</p>
        </div>
        <button class="card-btn">Детальніше</button>
      </li>
    `).join(""),h&&(h.style.display=f+w>=L.length?"none":"block")}const fe=M.create({baseURL:"https://furniture-store-v2.b.goit.study/api"}),o={modal:document.querySelector(".furniture-modal"),closeBtn:document.querySelector(".close-btn"),modalMainImg:document.querySelector("#main-img"),furnitureName:document.querySelector("#furniture-name"),furnitureCategory:document.querySelector("#furniture-category"),furniturePrice:document.querySelector("#furniture-price"),furnitureRating:document.querySelector("#modal-rating"),furnitureColors:document.querySelector("#furniture-colors"),furnitureDescription:document.querySelector("#furniture-description"),furnitureSize:document.querySelector("#furniture-size"),modalOrderBtn:document.querySelector("#modal-order-btn"),modalSmallImages:document.querySelector("#small-images")};function me(e){o.modal.classList.remove("visually-hidden"),o.furnitureName.textContent=e.name,o.furniturePrice.textContent=e.price,e.img&&(o.modalMainImg.src=e.img),o.furnitureColors.innerHTML=e.colors,ge(),document.body.style.overflow="hidden"}function A(){o.modal.classList.add("visually-hidden"),document.body.style.overflow=""}o.closeBtn.addEventListener("click",A);o.modal.addEventListener("click",e=>{e.target===o.modal&&A()});document.addEventListener("keydown",e=>{e.key==="Escape"&&A()});function ge(){const e=o.furnitureColors.querySelectorAll(".color-dot");e.length&&(e[0].classList.add("active"),e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(r=>r.classList.remove("active")),t.classList.add("active")})}))}async function pe(e){try{return(await fe.get(`/furnitures/${e}`)).data}catch(t){console.error("Помилка отримання товару:",t)}}function he(e){var t;o.furnitureCategory.textContent=((t=e.category)==null?void 0:t.name)??e.category??"",o.furnitureDescription.textContent=e.description??"",o.furnitureSize.textContent=e.sizes??"",be(e.rating),ye(e.images)}function be(e=0){o.furnitureRating.innerHTML="";for(let t=1;t<=5;t++){const r=Math.min(Math.max(e-(t-1),0),1)*100;o.furnitureRating.innerHTML+=`
            <div class="star-wrapper" style="position: relative; display: inline-block; width: 16px; height: 16px;">
                <svg class="star0" width="16" height="16">
                    <use href="../img/sprite.svg#star0"></use>
                </svg>
                <svg class="star" width="16" height="16" style="position: absolute; top: 0; left: 0; overflow: hidden;">
                    <use href="../img/sprite.svg#star"></use>
                    <rect width="${r}%" height="100%" fill="white" style="clip-path: inset(0 ${100-r}% 0 0)"></rect>
                </svg>
            </div>
        `}}function ye(e=[]){if(!e.length){o.modalSmallImages.innerHTML="";return}o.modalMainImg.src=e[0],o.modalSmallImages.innerHTML=e.slice(1).map((t,r)=>`
            <img 
                src="${t}" 
                class="small-img ${r===0?"active":""}" 
            />
        `).join(""),ve()}function ve(){const e=o.modalSmallImages.querySelectorAll(".small-img");e.forEach(t=>{t.addEventListener("click",()=>{o.modalMainImg.src=t.src,e.forEach(r=>r.classList.remove("active")),t.classList.add("active")})})}const Le=document.querySelector(".card-list");Le.addEventListener("click",async e=>{var P;const t=e.target.closest(".card-btn");if(!t)return;const r=t.closest(".card-list-item"),s=r.querySelector(".card-title").textContent,i=r.querySelector(".card-price").textContent,c=((P=r.querySelector("img"))==null?void 0:P.src)||"",a=r.querySelector(".card-colors"),D=(a==null?void 0:a.innerHTML)||"";me({name:s,price:i,img:c,colors:D});const C=t.dataset.detailsId;if(!C)return;const E=await pe(C);E&&he(E)});const l={furnitureList:document.querySelector(".card-list"),loadMoreBtn:document.querySelector(".more-btn"),filterList:document.querySelector(".filter-list"),filterButtons:document.querySelectorAll(".filter-btn")},n={page:1,limit:10,currentCategory:"all",loadedItems:[],categories:[],hasMore:!0,isLoading:!1,isInitialized:!1};function we(e){const t=e.color??e.colors??[];return Array.isArray(t)?t:typeof t=="string"&&t.trim()!==""?[t]:[]}function Me(e){return e.length?e.map(t=>`
        <span
          class="color-dot"
          style="background-color: ${t}"
          title="${t}"
        ></span>
      `).join(""):""}function Se(e){if(e==null||e==="")return"Ціну уточнюйте";const t=Number(e);return Number.isNaN(t)?`${e} грн`:`${t.toLocaleString("uk-UA")} грн`}function $e(e,t){return e?`
    <img
      class="card-img-placeholder"
      src="${e}"
      alt="${t}"
      loading="lazy"
    />
  `:'<div class="card-img-placeholder"></div>'}function ke(e){return Array.isArray(e)?e:Array.isArray(e==null?void 0:e.items)?e.items:Array.isArray(e==null?void 0:e.furnitures)?e.furnitures:Array.isArray(e==null?void 0:e.results)?e.results:Array.isArray(e==null?void 0:e.data)?e.data:[]}function Ae(e){return Array.isArray(e)?e:Array.isArray(e==null?void 0:e.items)?e.items:Array.isArray(e==null?void 0:e.categories)?e.categories:Array.isArray(e==null?void 0:e.data)?e.data:[]}function _(e){return e._id??e.id??""}function Ie(e,t){const r=new Map;return[...e,...t].forEach(s=>{r.set(_(s),s)}),[...r.values()]}function qe(e){var r,s;const t=((r=e.category)==null?void 0:r.name)??e.category??e.type??((s=e.furnitureType)==null?void 0:s.name)??e.furnitureType??"";return String(t).trim().toLowerCase()}function b(e){return n.currentCategory==="all"?e:e.filter(t=>qe(t)===n.currentCategory)}function Ce(e,t){const r=Number((e==null?void 0:e.totalPages)??(e==null?void 0:e.pages)??0),s=Number((e==null?void 0:e.page)??n.page),i=Number((e==null?void 0:e.total)??(e==null?void 0:e.totalItems)??0);if(r>0){n.hasMore=s<r;return}if(i>0){n.hasMore=n.loadedItems.length<i;return}n.hasMore=t===n.limit}function Ee(e){var a;const t=_(e),r=e.name??"Без назви",s=((a=e.images)==null?void 0:a[0])??e.image??"",i=we(e),c=Se(e.price);return`
    <li class="card-list-item">
      ${$e(s,r)}

      <div class="card-content">
        <h3 class="card-title">${r}</h3>

        <div class="card-colors">
          ${Me(i)}
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
  `}function I(e=[]){const t=e.map(Ee).join("");l.furnitureList.innerHTML=t}function Pe(){l.furnitureList.innerHTML=""}function y(e="За вашим запитом товарів не знайдено."){l.furnitureList.innerHTML=`
    <li class="card-list-item">
      <div class="card-content">
        <p class="card-price">${e}</p>
      </div>
    </li>
  `}function T(){var e;(e=l.loadMoreBtn)==null||e.classList.add("is-hidden")}function G(){var e;(e=l.loadMoreBtn)==null||e.classList.remove("is-hidden")}function Be(){var e;(e=l.loadMoreBtn)==null||e.setAttribute("disabled","true")}function xe(){var e;(e=l.loadMoreBtn)==null||e.removeAttribute("disabled")}function V(e="all"){l.filterButtons.forEach(t=>{const r=t.dataset.category===e;t.classList.toggle("is-active",r)})}async function Fe(){try{const e=await O();n.categories=Ae(e)}catch(e){console.error("Не вдалося завантажити категорії:",e),n.categories=[]}}async function q(){if(!(n.isLoading||!n.hasMore)){n.isLoading=!0,Be();try{const e=await z(n.page,n.limit),t=ke(e);n.loadedItems=Ie(n.loadedItems,t),Ce(e,t.length);const r=b(n.loadedItems);r.length?I(r):y(),n.hasMore?G():T()}catch(e){console.error("Не вдалося завантажити товари:",e),y("Не вдалося завантажити товари."),T()}finally{n.isLoading=!1,xe()}}}async function Te(){let e=b(n.loadedItems);for(;!e.length&&n.hasMore;)n.page+=1,await q(),e=b(n.loadedItems);e.length?I(e):y()}async function Ne(){n.isLoading||!n.hasMore||(n.page+=1,await q())}async function Re(e){const t=e.target.closest(".filter-btn");if(!t)return;const r=t.dataset.category??"all";n.currentCategory=r,V(r);const s=b(n.loadedItems);s.length?I(s):n.hasMore?await Te():y()}function He(){var e,t;(e=l.loadMoreBtn)==null||e.addEventListener("click",Ne),(t=l.filterList)==null||t.addEventListener("click",Re)}function je(){n.page=1,n.currentCategory="all",n.loadedItems=[],n.hasMore=!0,n.isLoading=!1}async function ze(){!l.furnitureList||!l.loadMoreBtn||!l.filterList||(n.isInitialized||(He(),n.isInitialized=!0),je(),V("all"),Pe(),G(),await Fe(),await q())}le().then(e=>{ae(e.setCategory)});document.addEventListener("DOMContentLoaded",()=>{ze()});
//# sourceMappingURL=index.js.map
