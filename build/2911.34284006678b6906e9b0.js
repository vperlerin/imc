"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[2911],{
/***/1299:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */u});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),r=a.n(s),o=a(6540),n=a(6645),l=a(4976),i=a(1083),c=a(3318);// ./src/admin/api/accomodations/index.js
const d=()=>{const[e,t]=(0,o.useState)([]),[a,s]=(0,o.useState)(!1),[r,n]=(0,o.useState)(null),l=(0,o.useCallback)((async()=>{s(!0),n(null);try{const e=await(async()=>{const e=await(0,c/* retry */.L)((()=>i/* default */.A.get("https://imc2026.imo.net/php/api/get_left_accommodations.php")));if(!e?.data?.success)throw new Error(e?.data?.message||"Error fetching available rooms.");return e.data.data||[]})();t(e)}catch(e){n(e.message||"Error fetching available rooms.")}finally{s(!1)}}),[]);return(0,o.useEffect)((()=>{l()}),[l]),{availableRooms:e,loading:a,error:r,refetchAvailableRooms:l}};
// EXTERNAL MODULE: ./src/utils/registration-type-display.js
var m=a(5943),p=a(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/rooms/index.js
const h=(e,t,a)=>`${e} ${1===e?t:a}`,u=({className:e,showLink:t=!1})=>{const{availableRooms:a,loading:s,error:i}=d();if(i)
return(0,p.jsxs)("div",{className:"text-danger",children:["Error: ",i]});const c=(0,o.useMemo)((()=>(Array.isArray(a)?a:[]).filter((e=>"no"!==(e?.type||e?.registration_type))).map((e=>{const t=e?.id??e?.registration_type_id??null,a=(e?.type??e?.registration_type??"").toString(),s=Number(e?.total_rooms??e?.total??e?.total_rooms??0)||0,r=Number(e?.beds_per_room??1)||1,o=Number(e?.beds_total??s*r)||0,n=Number(e?.used??0)||0,l=Math.max(o-n,0),i=Number(e?.beds_left??e?.room_left??l)||0;return{id:t,type:a,totalRooms:s,bedsPerRoom:r,bedsTotal:o,used:n,bedsLeft:i,roomsLeft:null!=e?.rooms_left?Number(e.rooms_left)||0:Math.floor(i/Math.max(r,1)),partialBedsLeft:null!=e?.partial_beds_left?Number(e.partial_beds_left)||0:i%Math.max(r,1)}}))),[a]);
return(0,p.jsxs)("div",{className:r()(e,"position-relative",t&&" border rounded-2 p-3 "),children:[s&&(0/* default */,p.jsx)(n.A,{}),t&&(0,p.jsx)("h5",{children:(0/* Link */,p.jsx)(l.N_,{to:"/admin/accomodations",children:"Available Rooms by Type"})}),!s&&(0,p.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:c.map((e=>{const t=e.type?(0,m/* formatRegistrationTypeTitle */.t)(e.type):"Unknown",a=e.bedsLeft<=0,{main:s,sub:o}=(e=>{if(e.bedsLeft<=0)return{main:"Sold out",sub:e.bedsTotal>0?` (0 / ${e.bedsTotal} beds)`:""};const t=(0,m/* formatRegistrationTypeForDisplay */.m)(e.type)||"room",a=[];return e.roomsLeft>0&&a.push(`${h(e.roomsLeft,`${t} room`,`${t} rooms`)} left`),e.partialBedsLeft>0&&a.push(`${h(e.partialBedsLeft,"bed","beds")} in a ${t} room`),{main:a.join(" + "),sub:` (${e.bedsLeft} / ${e.bedsTotal} beds)`}})(e);
return(0,p.jsxs)("div",{className:r()("p-3 border rounded-2",{"text-danger":a}),children:[t,": ",(0,p.jsx)("strong",{children:s}),o&&(0,p.jsx)("small",{className:"text-muted",children:o})]},e.id??e.type)}))})]})}}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=(e,{interval:t=1e3,retries:a=6}={})=>new Promise(((r,o)=>{e().then(r).catch((n=>{setTimeout((()=>{a?s(e,{interval:1.5*t,retries:a-1}).then(r,o):o(n)}),t)}))}));
/***/},
/***/5071:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */h});
// EXTERNAL MODULE: ./node_modules/react/index.js
var s=a(6540),r=a(408),o=a(7647),n=a(6645),l=a(3318),i=a(1083);
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
var c=a(8057),d=a(1299),m=a(5943),p=a(4848);
// EXTERNAL MODULE: ./src/admin/components/rooms/index.js + 1 modules
// ./src/admin/pages/accomodations/index.js
const h=({typeFilter:e=""})=>{const[t,a]=(0,s.useState)(e||"not_no"),[h,u]=(0,s.useState)(""),[f,x]=(0,s.useState)(null),[b,g]=(0,s.useState)("asc"),{participants:j,loading:_,error:y}=(e=>{const[t,a]=(0,s.useState)([]),[r,o]=(0,s.useState)(!0),[n,c]=(0,s.useState)(null);return(0,s.useEffect)((()=>{if(!e)return o(!1),void c("Type filter is required ('no' or 'not_no').");(async()=>{try{const t=await(0,l/* retry */.L)((()=>i/* default */.A.get("https://imc2026.imo.net/php/api/get_accomodations.php",{params:{type:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");a(t.data.data)}catch(e){c(e.message||"Failed to fetch participants. Please refresh the page.")}finally{o(!1)}})()}),[e]),{participants:t,loading:r,error:n,setParticipants:a}})(t),N="last_name",v=e=>{g(f===e&&"asc"===b?"desc":"asc"),x(e)},w=(0,s.useMemo)((()=>{let e=j?[...j]:[];
// Apply search filter
if(h){const t=h.toLowerCase();e=e.filter((e=>e[N]?.toLowerCase().includes(t)))}
// Apply sorting
return f&&e.sort(((e,t)=>{let a=e[f]??"",s=t[f]??"";return"confirmed"===f?(a="1"===e.confirmation_sent?1:0,s="1"===t.confirmation_sent?1:0,"asc"===b?a-s:s-a):"created_at"===f?(a=new Date(a).getTime()||0,s=new Date(s).getTime()||0,"asc"===b?a-s:s-a):"number"!=typeof a&&isNaN(parseFloat(a))?(a=a.toString().toLowerCase(),s=s.toString().toLowerCase(),"asc"===b?a.localeCompare(s):s.localeCompare(a)):(a=parseFloat(a)||0,s=parseFloat(s)||0,"asc"===b?a-s:s-a)})),e}),[j,h,f,b]);
return(0/* default */,p.jsx)(o.A,{isMaxWidth:!0,title:"Participants' Accommodations",children:_?(0/* default */,p.jsx)(n.A,{}):y?(0,p.jsxs)("p",{className:"text-danger",children:["Error: ",y]}):(0,p.jsxs)(p.Fragment,{children:[(0/* default */,p.jsx)(d.A,{className:"mb-4"}),(0,p.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,p.jsxs)("div",{className:"position-relative w-auto",children:[(0,p.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${N.replace("_"," ")}`,value:h,onChange:e=>u(e.target.value)}),(0/* CiSearch */,p.jsx)(r.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,p.jsxs)("select",{className:"form-select w-auto",value:t,onChange:e=>a(e.target.value),children:[(0,p.jsx)("option",{value:"not_no",children:"Staying at the hostel"}),(0,p.jsx)("option",{value:"no",children:"No Accommodation"})]}),(0/* default */,p.jsx)(c.A,{className:"ms-auto",link:`https://imc2026.imo.net/php/doc_accommodations.php?type=${t}`})]}),(0,p.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,p.jsxs)("table",{className:"table table-striped",children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{className:"sortable",onClick:()=>v("created_at"),children:"Reg. Date"}),(0,p.jsx)("th",{className:"sortable",onClick:()=>v("last_name"),children:"Name"}),(0,p.jsx)("th",{className:"sortable",onClick:()=>v("registration_type"),children:"Accommodation"}),(0,p.jsx)("th",{className:"sortable",onClick:()=>v("confirmed"),children:"Confirmed"}),(0,p.jsx)("th",{children:"Comments"})]})}),(0,p.jsx)("tbody",{children:w.length>0?w.map((e=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:e.created_at?.split(" ")[0]||"n/a"}),(0,p.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,p.jsx)("td",{children:e.registration_type?(0,m/* formatRegistrationTypeTitle */.t)(e.registration_type):""}),(0,p.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,p.jsx)("td",{children:e.comments||""})]},e.participant_id))):(0,p.jsx)("tr",{children:(0,p.jsx)("td",{colSpan:"5",className:"text-center",children:"No participants found."})})})]})})]})})};
/* harmony default export */}
/***/,
/***/5943:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */m:()=>/* binding */s
/* harmony export */,t:()=>/* binding */r
/* harmony export */});
/**
 * Turn DB slug (e.g. single_reduced_mobility) into readable text: underscores → spaces.
 * Does not change semantics for comparisons (still use raw `type` with toLowerCase() === "no", etc.).
 */
const s=e=>null==e||""===e?"":String(e).replace(/_/g," "),r=e=>{const t=s(e);return t?t.charAt(0).toUpperCase()+t.slice(1):""};
/** Same as {@link formatRegistrationTypeForDisplay} with the first character uppercased (list labels, emails). */}
/***/}]);