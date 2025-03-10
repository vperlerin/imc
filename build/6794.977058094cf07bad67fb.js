"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[6794],{
/***/415:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */h});// ./src/pages/community/participants/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__flag--b93_h";
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
var s=a(4567),i=a(6540),r=a(4265),l=a(3388);
// EXTERNAL MODULE: ./node_modules/react/index.js
// ./node_modules/react-country-flag/dist/react-country-flag.esm.js
function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},c.apply(this,arguments)}var o=["cdnSuffix","cdnUrl","countryCode","style","svg"];
/* harmony default export */const d=function(e){var t=e.cdnSuffix,a=void 0===t?"svg":t,n=e.cdnUrl,s=void 0===n?"https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/":n,r=e.countryCode,l=e.style,d=e.svg,p=void 0!==d&&d,u=function(e,t){if(null==e)return{};var a,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,o);if("string"!=typeof r)return null;if(p){var h=""+s+r.toLowerCase()+"."+a;return(0,i.createElement)("img",Object.assign({},u,{src:h,style:c({display:"inline-block",width:"1em",height:"1em",verticalAlign:"middle"},l)}))}var g=r.toUpperCase().replace(/./g,(function(e){return String.fromCodePoint(e.charCodeAt(0)+127397)}));return(0,i.createElement)("span",Object.assign({role:"img"},u,{style:c({display:"inline-block",fontSize:"1em",lineHeight:"1em",verticalAlign:"middle"},l)}),g)};
//# sourceMappingURL=react-country-flag.esm.js.map
// EXTERNAL MODULE: ./src/components/loader/index.js + 1 modules
var p=a(6645),u=a(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/pages/community/participants/index.js
const h=()=>{const{participants:e,loading:t,error:a}=(0,r/* useApiOnlineParticipants */.$)(!0),{participants:i,loading:c,error:o}=(0,l/* useApiOnsiteParticipants */.E)(!0);if(t||c)return(0/* default */,u.jsx)(p.A,{});if(a||o)return(0,u.jsx)("p",{className:"text-danger",children:"Error fetching participants. Please try again later."});
// Combine both lists into one count per country
const h={};[...i,...e].forEach((e=>{h[e.country]=(h[e.country]||0)+1}));const g=i.length+e.length;
return(0/* default */,u.jsx)(s.A,{title:"Participants",children:(0,u.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-3 justify-content-between mt-3",children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("h3",{children:"Onsite Participants"}),i.length>0?(0,u.jsx)("ul",{className:"list-unstyled",children:i.map((e=>(0,u.jsxs)("li",{className:"d-flex align-items-center gap-2",children:[(0,u.jsx)(d,{countryCode:e.country,svg:!0,className:n,title:e.country}),e.title," ",e.first_name," ",e.last_name,e.organization?` (${e.organization})`:""]},e.id)))}):(0,u.jsx)("p",{children:"No confirmed onsite participants."})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("h3",{children:"Online Participants"}),e.length>0?(0,u.jsx)("ul",{className:"list-unstyled",children:e.map((e=>(0,u.jsxs)("li",{className:"d-flex align-items-center gap-2",children:[(0,u.jsx)(d,{countryCode:e.country,svg:!0,className:n,title:e.country}),e.title," ",e.first_name," ",e.last_name,e.organization?` (${e.organization})`:""]},e.id)))}):(0,u.jsx)("p",{children:"No confirmed online participants."})]}),i.length>0&&e.length>0((0,u.jsxs)("div",{className:"border p-3 rounded-2",children:[(0,u.jsx)("h4",{className:"m-0 mb-2",children:"Participants per Country"}),(0,u.jsx)("ul",{className:"list-unstyled",children:Object.entries(h).map((e=>{let[t,a]=e;
return(0,u.jsxs)("li",{className:"d-flex align-items-center gap-2 mb-1",children:[(0,u.jsx)(d,{countryCode:t,svg:!0,className:n,title:t}),(0,u.jsxs)("span",{children:[a," (",(a/g*100).toFixed(1),"%)"]})]},t)}))})]}))]})})};
/* harmony default export */}
/***/,
/***/3388:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */E:()=>/* binding */r
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */const r=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[t,a]=(0,s.useState)([]),[r,l]=(0,s.useState)(!0),[c,o]=(0,s.useState)(null);// Runs only once when the component mounts
return(0,s.useEffect)((()=>{(async()=>{try{const t=e?"?confirmed_only=1":"",s=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/onsite_participants.php${t}`)));if(!s.data.success||!Array.isArray(s.data.data))throw new Error(s.data.message||"Database access error, please try again.");a(s.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{l(!1)}})()}),[]),{participants:t,loading:r,error:c,setParticipants:a}};
/***/},
/***/4265:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */$:()=>/* binding */r
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */const r=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[t,a]=(0,s.useState)([]),[r,l]=(0,s.useState)(!0),[c,o]=(0,s.useState)(null);// Re-run if confirmedOnly changes
return(0,s.useEffect)((()=>{(async()=>{try{const t=e?"?confirmed_only=1":"",s=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get(`https://imc2025.imo.net/php/admin/api/online_participants.php${t}`)));if(!s.data.success||!Array.isArray(s.data.data))throw new Error(s.data.message||"Database access error, please try again.");a(s.data.data)}catch(e){o(e.message||"Failed to fetch participants. Please refresh the page.")}finally{l(!1)}})()}),[e]),{participants:t,loading:r,error:c,setParticipants:a}};
/***/}}]);