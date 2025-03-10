"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[8561],{
/***/9874:
/***/(e,s,t)=>{
// ESM COMPAT FLAG
t.r(s),
// EXPORTS
t.d(s,{default:()=>/* binding */k});
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var r=t(4157),i=t(6942),a=t.n(i);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
// ./src/pages/program/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__programWrap--u_wDE",d="index-module__sessionWrap--oDGML",l="index-module__sep--moqXL",o="index-module__arrow--RWEA2",p="index-module__arrows--WQxth";
// EXTERNAL MODULE: ./node_modules/react/index.js
var c=t(6540),m=t(4567),h=t(5846),x=t(7767),u=t(4976);
// EXTERNAL MODULE: ./src/components/page-contain/index.js + 8 modules
// ./src/data/program.js
const y={day1:{date:"09-18-2025",program:[{period:"13:00 - …",display:"Arrival of participants (who didn't participate in a workshop)"},{period:"18:15 - 19:15",display:"Dinner",type:"sep"},{period:"18:15 - 19:15",display:"Opening of the conference by the IMO President and the Local Organizing Committee"},{session:"SESSION 1 - Title TBD",chair:"TBD",lectures:[{period:"19:45 - 20:45",title:"Title TBD",
//linkTitle: 'https://imc2024.imo.net/presentations/1-Thursday/1.1A%20imc_2024_ribbeck_Molau.pptx',
authors:"Authors TBD"}]}]},day2:{date:"09-19-2025",program:[{period:"07:30 - 09:00",display:"Breakfast",type:"sep"},{period:"10:00 - 10:30",display:"Coffee Break and Poster Session",type:"sep"},{period:"19:00 - 20:00",display:"IMO General Assembly Meeting"},{period:"21:00 - …",display:"Free time",type:"sep"}]},day3:{date:"09-20-2025",program:[{period:"07:30 - 09:00",display:"Breakfast",type:"sep"},{period:"10:00 - 10:30",display:"Coffee Break and Poster Session",type:"sep"}]},day4:{date:"09-21-2025",program:[{period:"07:30 - 09:00",display:"Breakfast",type:"sep"},{period:"10:00 - 10:30",display:"Coffee Break and Poster Session",type:"sep"},{period:"12:00 – 12:10",display:"Closing of the conference by the International Meteor Organization President and the Local Organizing Committee"},{period:"12:10 - 13:30",display:"Lunch",type:"sep"},{period:"13:30 - …",display:"Departure of the participants"}]}};
// EXTERNAL MODULE: ./node_modules/react-swipeable/es/index.js
var f=t(188),j=t(6221),g=t(4373),b=t(4848);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs + 3 modules
// ./src/pages/program/index.js
// Import animation
const k=()=>{const{day:e}=(0,x/* useParams */.g)(),s=(0,x/* useNavigate */.Zp)(),t=Object.keys(y),i=t.indexOf(e||"day1"),k=i>0?t[i-1]:null,N=i<t.length-1?t[i+1]:null,v=e||"day1",S=y[v],[C,_]=(0,c.useState)(v),[w,O]=(0,c.useState)(0);if(// Controls swipe direction
// Controls swipe direction
(0,c.useEffect)((()=>{_(v)}),[v]),(0,c.useEffect)((()=>{const s=new Date,t=`${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}-${s.getFullYear()}`,r=Object.entries(y).find((e=>{let[s,r]=e;return r.date===t}))?.[0]||"day1";_(e||r)}),[e]),!S)
return(0/* Navigate */,b.jsx)(x.C5,{to:"/404",replace:!0});
// Swipe handlers
const D=(0,f/* useSwipeable */.uh)({onSwipedLeft:()=>{N&&(O(1),// Swipe left
s(`/program/${N}`))},onSwipedRight:()=>{k&&(O(-1),// Swipe right
s(`/program/${k}`))},preventDefaultTouchmoveEvent:!0,trackMouse:!0});
// Animation variants
return(0/* default */,b.jsxs)(m.A,{title:"Daily Program",children:[(0,b.jsx)("p",{children:"Times are in CEST = UTC + 2h"}),(0,b.jsxs)("div",{...D,children:[(0,b.jsxs)("div",{className:a()(p,"d-flex justify-content-between align-items-center mb-4 mt-3 d-md-none"),children:[k?(0/* Link */,b.jsx)(u.N_,{to:`/program/${k}`,className:o,onClick:()=>O(-1),children:(0/* SlArrowLeft */,b.jsx)(r.SnO,{})}):(0,b.jsx)("div",{}),(0,b.jsx)("h3",{className:"m-0",children:(0,h/* formatFullDate */.Lu)(S.date,!1)}),N?(0/* Link */,b.jsx)(u.N_,{to:`/program/${N}`,className:o,onClick:()=>O(1),children:(0/* SlArrowRight */,b.jsx)(r.dH8,{})}):(0,b.jsx)("div",{})]}),(0,b.jsx)("div",{className:a()("mt-3",n),children:(0/* AnimatePresence */,b.jsx)(j.N,{custom:w,initial:!1,mode:"popLayout",children:(0/* motion */,b.jsxs)(g.P.div,{custom:w,variants:{enter:e=>({x:e>0?"100%":"-100%",opacity:0}),center:{x:0,opacity:1},exit:e=>({x:e>0?"-100%":"100%",opacity:0})},initial:"enter",animate:"center",exit:"exit",transition:{type:"tween",ease:"easeInOut",duration:.4},children:[(0,b.jsxs)("h3",{className:"mt-0 mb-4 border-bottom pb-2 d-none d-md-flex align-items-center gap-3",children:[k&&(0/* Link */,b.jsx)(u.N_,{to:`/program/${k}`,className:o,onClick:()=>O(-1),children:(0/* SlArrowLeft */,b.jsx)(r.SnO,{})}),(0,h/* formatFullDate */.Lu)(S.date,!1),N?(0/* Link */,b.jsx)(u.N_,{to:`/program/${N}`,className:o,onClick:()=>O(1),children:(0/* SlArrowRight */,b.jsx)(r.dH8,{})}):(0,b.jsx)("div",{})]}),(0,b.jsx)("dl",{children:S.program.map(((e,s)=>(0,b.jsx)("div",{className:a()("d-flex flex-column flex-md-row",e?.lectures?.length>0&&"flex-column flex-md-column"),children:e.session?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:a()(e?.lectures?.length>0&&d,"border-bottom pb-2 mb-2"),children:[(0,b.jsx)("h5",{className:"mb-0 mt-3",children:e.session}),e.chair&&(0,b.jsxs)("p",{className:"mb-0",children:[(0,b.jsx)("b",{children:"Chair:"})," ",e.chair]})]}),e.lectures&&e.lectures.map(((s,t)=>(0,b.jsxs)("div",{className:"d-flex flex-column flex-md-row",children:[(0,b.jsx)("dt",{children:s.period}),(0,b.jsxs)("dd",{className:a()("sep"===e.type&&l,"mt-1 mt-md-0 ms-2 ms-md-0"),children:[(0,b.jsx)("strong",{className:"d-block",children:s.title}),(0,b.jsx)("i",{children:s.authors})," ",s.linkTitle&&(0,b.jsx)("a",{href:s.linkTitle,target:"_blank",rel:"noopener noreferrer",children:"[Link]"}),s.display]})]},t)))]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("dt",{children:e.period}),(0,b.jsx)("dd",{className:a()("sep"===e.type&&l,"mt-1 mt-md-0 ms-2 ms-md-0 mb-4"),children:e.display})]})},s)))})]},C)})})]})]})};
/* harmony default export */}
/***/}]);