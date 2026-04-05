import{a as p}from"./assets/vendor-D_T3ErsI.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const d="https://furniture-store-v2.b.goit.study/api",u=p.create({baseURL:d,headers:{"Content-Type":"application/json"}});async function l(t=1,r=10){return(await u.get(`/furnitures?page=${t}&limit=${r}`)).data}async function f(){return(await u.get("/categories")).data}const c=document.getElementById("furnitures"),a=document.getElementById("categories");async function m(){try{const t=await l();c.innerHTML=t.furnitures.map(r=>`
        <div style="border:1px solid #ccc; padding:10px; margin:5px;">
          <h3>${r.name}</h3>
          <p>Price: ${r.price} грн</p>
          <p>Colors: ${r.color.join(", ")}</p>
          ${r.images.map(o=>`<img src="${o}" width="100">`).join("")}
        </div>
      `).join("")}catch(t){c.innerHTML="<p>Ошибка загрузки мебели</p>",console.error(t)}}async function g(){try{const t=await f();a.innerHTML=t.map(r=>`<div>${r.name}</div>`).join("")}catch(t){a.innerHTML="<p>Ошибка загрузки категорий</p>",console.error(t)}}m();g();
//# sourceMappingURL=index.js.map
