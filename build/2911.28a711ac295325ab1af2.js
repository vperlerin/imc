"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[2911],{
/***/1299:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */m});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),r=a.n(s),o=a(6540),l=a(6645),n=a(4976),i=a(1083),c=a(3318);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var d=a(4848);// ./src/admin/components/rooms/index.js
const m=e=>{let{className:t,showLink:a=!1}=e;const{availableRooms:s,loading:m,error:h}=(()=>{const[e,t]=(0,o.useState)([]),[a,s]=(0,o.useState)(!1),[r,l]=(0,o.useState)(null),n=(0,o.useCallback)((async()=>{s(!0),l(null);try{const e=await(0,c/* retry */.L)((()=>i/* default */.A.get("https://imc2025.imo.net/php/api/get_left_accommodations.php")));e.data.success?t(e.data.data||[]):l(e.data.message||"Error fetching available rooms.")}catch(e){l(e.message||"Error fetching available rooms.")}finally{s(!1)}}),[]);
// Fetch available rooms on mount
// Fetch available rooms on mount
return(0,o.useEffect)((()=>{n()}),[n]),{availableRooms:e,loading:a,error:r,refetchAvailableRooms:n}})();if(h)
return(0,d.jsxs)("div",{className:"text-danger",children:["Error: ",h]});
// Function to format room availability
const p=(e,t)=>{const a={single:1,double:2,quadruple:4}[e]||1,s=Math.floor(t),r=Math.round((t-s)*a);// Default to 1 if type is unknown
let o=`${s} rooms left`;return r>0&&(o+=` + ${r} bed${r>1?"s":""}`),o};
return(0,d.jsxs)("div",{className:r()(t,"position-relative",a&&" border rounded-2 p-3 "),children:[m&&(0/* default */,d.jsx)(l.A,{}),a&&(0,d.jsx)("h5",{children:(0/* Link */,d.jsx)(n.N_,{to:"/admin/accomodations",children:"Available Rooms by Type"})}),h&&(0,d.jsx)("div",{className:"alert alert-danger fw-bolder",children:h}),!h&&!m&&(0,d.jsx)("div",{className:"d-flex flex-column flex-md-row gap-2",children:s?.filter((e=>"no"!==e.registration_type)).map((e=>{const t=e.registration_type.toLowerCase(),a=0===Math.floor(e.available_rooms);
return(0,d.jsxs)("div",{className:r()("p-3 border rounded-2",{"text-danger":a}),children:[t.charAt(0).toUpperCase()+t.slice(1),":",(0,d.jsxs)("strong",{children:[" ",p(t,parseFloat(e.available_rooms))]}),(0,d.jsxs)("small",{className:"text-muted",children:[" / ",e.total_rooms]})]},e.registration_type_id)}))})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */s
/* harmony export */});const s=function(e){let{interval:t=100,retries:a=14}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(((r,o)=>{e().then(r).catch((l=>{setTimeout((()=>{a?s(e,{interval:1.5*t,retries:a-1}).then(r,o):o(l)}),t)}))}))};
/***/},
/***/5071:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */h});
// EXTERNAL MODULE: ./node_modules/react/index.js
var s=a(6540),r=a(408),o=a(7647),l=a(6645),n=a(3318),i=a(1083);
// EXTERNAL MODULE: ./node_modules/react-icons/ci/index.mjs
// EXTERNAL MODULE: ./src/admin/components/doc-button/index.js
var c=a(8057),d=a(1299),m=a(4848);
// EXTERNAL MODULE: ./src/admin/components/rooms/index.js + 1 modules
// ./src/admin/pages/accomodations/index.js
const h=e=>{let{typeFilter:t=""}=e;const[a,h]=(0,s.useState)(t||"not_no"),[p,u]=(0,s.useState)(""),[x,f]=(0,s.useState)(null),[g,j]=(0,s.useState)("asc"),{participants:v,loading:b,error:_}=(e=>{const[t,a]=(0,s.useState)([]),[r,o]=(0,s.useState)(!0),[l,c]=(0,s.useState)(null);return(0,s.useEffect)((()=>{if(!e)return o(!1),void c("Type filter is required ('no' or 'not_no').");(async()=>{try{const t=await(0,n/* retry */.L)((()=>i/* default */.A.get("https://imc2025.imo.net/php/api/get_accomodations.php",{params:{type:e}})));if(!t.data.success||!Array.isArray(t.data.data))throw new Error(t.data.message||"Database access error, please try again.");a(t.data.data)}catch(e){c(e.message||"Failed to fetch participants. Please refresh the page.")}finally{o(!1)}})()}),[e]),{participants:t,loading:r,error:l,setParticipants:a}})(a),N="last_name",y=e=>{j(x===e&&"asc"===g?"desc":"asc"),f(e)},w=(0,s.useMemo)((()=>{let e=v?[...v]:[];
// Apply search filter
if(p){const t=p.toLowerCase();e=e.filter((e=>e[N]?.toLowerCase().includes(t)))}
// Apply sorting
return x&&e.sort(((e,t)=>{let a=e[x]??"",s=t[x]??"";return"confirmed"===x?(a="1"===e.confirmation_sent?1:0,s="1"===t.confirmation_sent?1:0,"asc"===g?a-s:s-a):"created_at"===x?(a=new Date(a).getTime()||0,s=new Date(s).getTime()||0,"asc"===g?a-s:s-a):"number"!=typeof a&&isNaN(parseFloat(a))?(a=a.toString().toLowerCase(),s=s.toString().toLowerCase(),"asc"===g?a.localeCompare(s):s.localeCompare(a)):(a=parseFloat(a)||0,s=parseFloat(s)||0,"asc"===g?a-s:s-a)})),e}),[v,p,x,g]);
return(0/* default */,m.jsx)(o.A,{isMaxWidth:!0,title:"Participants' Accommodations",children:b?(0/* default */,m.jsx)(l.A,{}):_?(0,m.jsxs)("p",{className:"text-danger",children:["Error: ",_]}):(0,m.jsxs)(m.Fragment,{children:[(0/* default */,m.jsx)(d.A,{className:"mb-4"}),(0,m.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-2 mb-3",children:[(0,m.jsxs)("div",{className:"position-relative w-auto",children:[(0,m.jsx)("input",{type:"text",className:"form-control pe-5",placeholder:`Enter ${N.replace("_"," ")}`,value:p,onChange:e=>u(e.target.value)}),(0/* CiSearch */,m.jsx)(r.Xj1,{className:"position-absolute top-50 end-0 translate-middle-y me-2"})]}),(0,m.jsxs)("select",{className:"form-select w-auto",value:a,onChange:e=>h(e.target.value),children:[(0,m.jsx)("option",{value:"not_no",children:"Staying at the hostel"}),(0,m.jsx)("option",{value:"no",children:"No Accommodation"})]}),(0/* default */,m.jsx)(c.A,{className:"ms-auto",link:`https://imc2025.imo.net/php/doc_accommodations.php?type=${a}`})]}),(0,m.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,m.jsxs)("table",{className:"table table-striped",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{className:"sortable",onClick:()=>y("created_at"),children:"Reg. Date"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>y("last_name"),children:"Name"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>y("registration_type"),children:"Accommodation"}),(0,m.jsx)("th",{className:"sortable",onClick:()=>y("confirmed"),children:"Confirmed"}),(0,m.jsx)("th",{children:"Comments"})]})}),(0,m.jsx)("tbody",{children:w.length>0?w.map((e=>(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:e.created_at?.split(" ")[0]||"n/a"}),(0,m.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,m.jsx)("td",{children:e.registration_type||""}),(0,m.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,m.jsx)("td",{children:e.comments||""})]},e.participant_id))):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"5",className:"text-center",children:"No participants found."})})})]})})]})})};
/* harmony default export */}
/***/}]);