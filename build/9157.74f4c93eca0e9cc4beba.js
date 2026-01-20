"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[9157],{
/***/2834:
/***/(e,s,t)=>{
// EXPORTS
t.d(s,{A:()=>/* binding */i});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=t(6942),r=t.n(a);// ./src/components/registration/stepDisplay/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n={};
// EXTERNAL MODULE: ./node_modules/react/index.js
t(6540);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var l=t(4848);// ./src/components/registration/stepDisplay/index.js
const i=({step:e,stepTotal:s})=>(0,l.jsxs)("span",{className:r()(n.step),children:[(0,l.jsx)("span",{children:e}),(0,l.jsx)("span",{children:"/"}),(0,l.jsx)("span",{children:s}),"- "," "]});
/* harmony default export */}
/***/,
/***/4493:
/***/(e,s,t)=>{
/* harmony export */t.d(s,{
/* harmony export */Q:()=>/* binding */l
/* harmony export */});
/* harmony import */var a=t(3318),r=t(6540),n=t(1083);
/* harmony import */const l=()=>{const[e,s]=(0,r.useState)([]),[t,l]=(0,r.useState)([]),[i,o]=(0,r.useState)([]),[d,c]=(0,r.useState)([]),[m,u]=(0,r.useState)(!0),[h,p]=(0,r.useState)(null);// Runs only once when the component mounts
return(0,r.useEffect)((()=>{(async()=>{try{const e=await(0,a/* .retry */.L)((()=>n/* ["default"] */.A.get("https://imc2026.imo.net/php/get_specific_data.php")));if(!e.data.success)throw new Error(e.data.message||"Failed to fetch specific IMC data. Please, refresh the page.");s(e.data.data.workshops||[]),l(e.data.data.payment_methods||[]),o(e.data.data.registration_types||[]),c(e.data.data.sessions||[])}catch(e){p(e.message||"Failed to fetch specific IMC data. Please, refresh the page.")}finally{u(!1)}})()}),[]),{workshops:e,paymentMethods:t,registrationTypes:i,sessions:d,loading:m,error:h}};
/***/},
/***/4972:
/***/(e,s,t)=>{
/* harmony export */t.d(s,{
/* harmony export */D:()=>/* binding */l
/* harmony export */});
/* harmony import */var a=t(3318),r=t(6540),n=t(1083);
/* harmony import */const l=(e,s=!1,t=0,l=!1)=>{const[i,o]=(0,r.useState)(null),[d,c]=(0,r.useState)(!1),[m,u]=(0,r.useState)(null),h=(0,r.useCallback)((async()=>{if(e){c(!0),u(null);try{const t=s?"get_online_participant":"get_onsite_participant",r=await(0,a/* .retry */.L)((()=>n/* ["default"] */.A.get(`https://imc2026.imo.net/php/api/${t}.php`,{params:{id:e,admin_notes:l}})));u(null),r.data.success&&r.data.data?o(r.data.data):u(r.data.message||"Participant not found.")}catch(e){u(e.message||"Failed to fetch participant data.")}finally{c(!1)}}}),[e,s,l]);return(0,r.useEffect)((()=>{u(null),h()}),[h,t]),{participant:i,loading:d,error:m,setParticipant:o,refetchParticipant:h}};
/***/},
/***/5680:
/***/(e,s,t)=>{
// EXPORTS
t.d(s,{A:()=>/* binding */b});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=t(6942),r=t.n(a),n=t(8232),l=t(6540),i=t(2834),o=t(3),d=t(4848);// ./src/components/registration/talkPoster/index.js
const c=({isAdmin:e=!1,isEditing:s=!1,conferenceData:t,index:a,register:i,remove:c,type:m,errors:u,sessions:h,talkDurations:p=[],initialValues:b={},setValue:x,watch:f})=>{const[j,g]=(0,l.useState)(!1),N="talk"===m,w=f(`${m}s.${a}.print`)??b.print,y=!0===b.print||"true"===b.print||1===b.print||"1"===b.print,v=!0===w||"true"===w||1===w||"1"===w;
// Ensure session_id is properly stored instead of session name
// Ensure session_id is properly stored instead of session name
return(0,l.useEffect)((()=>{b.session_id&&x(`${m}s.${a}.session_id`,b.session_id)}),[b.session_id,x,a,m]),(0,l.useEffect)((()=>{g(!(!s||y===v))}),[v,y,s]),(0,d.jsxs)("div",{className:"border rounded-2 p-3 mb-3 mx-md-5",children:[(0,d.jsxs)("h5",{className:"fw-bold d-flex justify-content-between align-items-center mb-3 border-bottom pb-2",children:[(0,d.jsxs)("span",{children:[N?"Talk":"Poster"," #",a+1]}),(0,d.jsx)("button",{title:`Delete ${N?"Talk":"Poster"} #${a+1}`,type:"button",className:r()("btn btn-sm btn-danger",n/* default */.A.deleteBtn),onClick:c,children:(0/* FiTrash2 */,d.jsx)(o.IXo,{})})]}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Title"}),(0,d.jsxs)("div",{className:"col-sm-10",children:[(0,d.jsx)("input",{className:"form-control",defaultValue:b.title||"",placeholder:"Enter title",...i(`${m}s.${a}.title`,{required:"Title is required"})}),u?.[`${m}s`]?.[a]?.title&&(0,d.jsx)("p",{className:"text-danger",children:(0,d.jsx)("small",{children:u[`${m}s`][a].title.message})})]})]}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Authors"}),(0,d.jsxs)("div",{className:"col-sm-10",children:[(0,d.jsx)("input",{className:"form-control",defaultValue:b.authors||"",placeholder:"List all authors separated with commas",...i(`${m}s.${a}.authors`,{required:"Authors are required"})}),u?.[`${m}s`]?.[a]?.authors&&(0,d.jsx)("p",{className:"text-danger",children:(0,d.jsx)("small",{children:u[`${m}s`][a].authors.message})})]})]}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Abstract"}),(0,d.jsxs)("div",{className:"col-sm-10",children:[(0,d.jsx)("textarea",{className:"form-control",defaultValue:b.abstract||"",placeholder:"Enter abstract",...i(`${m}s.${a}.abstract`,{required:"Abstract is required"})}),u?.[`${m}s`]?.[a]?.abstract&&(0,d.jsx)("p",{className:"text-danger",children:(0,d.jsx)("small",{children:u[`${m}s`][a].abstract.message})})]})]}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"IMC Session"}),(0,d.jsxs)("div",{className:"col-sm-10",children:[(0,d.jsxs)("select",{className:r()("form-select",u?.[`${m}s`]?.[a]?.session_id&&"is-invalid",n/* default */.A.mdAuto),...i(`${m}s.${a}.session_id`,{required:"Session is required"}),defaultValue:b.session_id||"",onChange:e=>x(`${m}s.${a}.session_id`,e.target.value,{shouldValidate:!0}),children:[(0,d.jsx)("option",{value:"",children:"Select a session"}),h.map((e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," "]},e.id)))]}),u?.[`${m}s`]?.[a]?.session_id&&(0,d.jsx)("p",{className:"text-danger",children:(0,d.jsx)("small",{children:u[`${m}s`][a].session_id.message})})]})]}),N&&(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Talk Duration"}),(0,d.jsxs)("div",{className:"col-sm-10",children:[(0,d.jsxs)("select",{className:r()("form-select",u?.[`${m}s`]?.[a]?.duration&&"is-invalid",n/* default */.A.mdAuto),defaultValue:b.duration||"",...i(`${m}s.${a}.duration`,{required:"Duration is required"}),children:[(0,d.jsx)("option",{value:"",children:"Select duration"}),p.map((e=>(0,d.jsx)("option",{value:e,children:e},e)))]}),u?.[`${m}s`]?.[a]?.duration&&(0,d.jsx)("p",{className:"text-danger",children:(0,d.jsx)("small",{children:u[`${m}s`][a].duration.message})})]})]}),!N&&!s&&(0,d.jsxs)(d.Fragment,{children:[s&&j&&(0,d.jsx)("div",{className:"alert alert-warning mt-2 fw-bolder",children:"Changing this option will update the total fees. The treasurer will be notified, and you may need to be reimbursed or pay more."}),(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsxs)("label",{className:"fw-bold pb-0",children:["Do you want to have your poster printed on-site for ",t.poster_print.price,"€?"]}),!e&&(0,d.jsx)("p",{className:"form-text mt-0",children:t.poster_print.desc}),(0,d.jsx)("div",{className:"text-center btn-group d-block",role:"group",children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("input",{type:"radio",className:"btn-check",id:`printYes${a}`,value:"true",...i(`${m}s.${a}.print`,{required:"Please select an option"}),onChange:()=>x(`${m}s.${a}.print`,"true",{shouldValidate:!0,shouldDirty:!0}),checked:v}),(0,d.jsx)("label",{className:"btn btn-outline-neutral fw-bolder",htmlFor:`printYes${a}`,children:"Yes"}),(0,d.jsx)("input",{type:"radio",className:"btn-check",id:`printNo${a}`,value:"false",...i(`${m}s.${a}.print`,{required:"Please select an option"}),onChange:()=>x(`${m}s.${a}.print`,"false",{shouldValidate:!0,shouldDirty:!0}),checked:!v}),(0,d.jsx)("label",{className:"btn btn-outline-neutral fw-bolder",htmlFor:`printNo${a}`,children:"No"})]})})]})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-icons/md/index.mjs
var m=t(9879),u=t(5846),h=t(9785);
// EXTERNAL MODULE: ./src/utils/date.js
// ./src/components/registration/contribution.js
// !hardcode in DB
const p=["10min","15min","20min","25min","30min"],b=({isAdmin:e=!1,isEditing:s=!1,conferenceData:t,control:a,isDebugMode:b=!1,isOnline:x=!1,register:f,errors:j,step:g,stepTotal:N,trigger:w,setValue:y,sessions:v,watch:k})=>{const{fields:$,append:_,remove:A}=(0,h/* useFieldArray */.jz)({control:a,name:"talks"}),{fields:C,append:T,remove:D}=(0,h/* useFieldArray */.jz)({control:a,name:"posters"}),F=!0===(S=k("wantsToContribute")??"false")||"true"===S||1===S?"true":"false";var S;const V="true"===F,E=e=>{y("wantsToContribute",e,{shouldDirty:!0,shouldValidate:!0})},P=(0,l.useRef)(!1);(0,l.useEffect)((()=>{V?
// If data is already loaded (admin/edit) and forms exist, do nothing
$.length>0||C.length>0?P.current=!0:P.current||(P.current=!0):P.current=!1}
// Default behavior: add a first TALK
//addTalk({});
),[V,$.length,C.length,_]);
// Validate before adding new talk/poster
const q=async e=>{await w()&&(E("true"),"talk"===e?_({}):x||T({print:!1}))};
/*
  useEffect(() => {
    // If no contribution forms exist, force answer to "false"
    if (talks.length === 0 && posters.length === 0) {
      if (wantsToContributeValue !== "false") {
        setValue("wantsToContribute", "false", {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }
  }, [talks.length, posters.length, wantsToContributeValue, setValue]);
  */
return(0,d.jsxs)("div",{className:"position-relative",children:[b&&(0,d.jsx)("button",{type:"button",className:"position-absolute top-0 end-0 btn btn-secondary",onClick:()=>{E("true"),A(),x||D();const e=v.find((e=>"Meteor physics and dynamics"===e.name))?.id||v[0]?.id,s=v.find((e=>"Radio meteor work"===e.name))?.id||v[0]?.id;_({title:"Meteor Observation Techniques",authors:"John Doe, Jane Smith",abstract:"A study on advanced meteor observation methods.",session_id:e,duration:"15min"}),x||T({title:"Radio Meteor Detection",authors:"Alice Brown, Bob White",abstract:"An overview of detecting meteors using radio waves.",session_id:s,print:!0})},children:"Fill Test Data"}),!e&&!s&&(0,d.jsxs)("h4",{className:"mb-3 border-bottom pb-2",children:[(0/* default */,d.jsx)(i.A,{step:g,stepTotal:N}),"Contributions"]}),s&&(0,d.jsx)("h4",{className:"mb-3 border-bottom pb-2",children:"Update your Contributions"}),(0,d.jsx)("div",{className:r()(n/* default */.A.smallW,"mx-auto position-relative"),children:(0,d.jsxs)("div",{className:"mb-3 row",children:[(0,d.jsxs)("label",{className:r()("text-center fw-bold",n/* default */.A.balance),children:["Would you like to contribute a",x&&"n online "," talk ",!x&&(0,d.jsx)(d.Fragment,{children:"or a poster"})," to the main IMC"," ",t.year," conference program?"]}),(0,d.jsx)("input",{type:"hidden",...f("wantsToContribute")}),(0,d.jsxs)("div",{className:"text-center btn-group d-block mt-3",role:"group",children:[(0,d.jsx)("input",{type:"radio",className:"btn-check",id:"contributeYes",name:"wantsToContributeRadio",value:"true",checked:"true"===F,onChange:()=>E("true")}),(0,d.jsx)("label",{className:r()("btn",{"btn-primary":"true"===F,"btn-outline-primary":"true"!==F}),htmlFor:"contributeYes",children:"Yes"}),(0,d.jsx)("input",{type:"radio",className:"btn-check",id:"contributeNo",name:"wantsToContributeRadio",value:"false",checked:"false"===F,onChange:()=>{if($.length>0||C.length>0){if(!window.confirm("Are you sure? All talks and posters you have entered will be deleted."))
// Keep YES selected if user cancels
return void E("true");A(),D()}E("false")}}),(0,d.jsx)("label",{className:r()("btn",{"btn-primary":"false"===F,"btn-outline-primary":"false"!==F}),htmlFor:"contributeNo",children:"No"})]}),j.wantsToContribute&&(0,d.jsx)("p",{className:"text-danger fw-bold text-center",children:(0,d.jsx)("small",{children:j.wantsToContribute.message})})]})}),V&&0===$.length&&0===C.length&&(0,d.jsxs)("div",{className:"text-center my-4",children:[(0,d.jsx)("p",{className:"fw-bolder mb-2",children:"What would you like to add?"}),(0,d.jsxs)("div",{className:"d-flex gap-3 justify-content-center",children:[(0,d.jsxs)("button",{type:"button",className:"btn btn-outline-neutral fw-bolder",onClick:()=>q("talk"),children:[(0/* MdAdd */,d.jsx)(m.jgn,{})," Add Talk"]}),!x&&(0,d.jsxs)("button",{type:"button",className:"btn btn-outline-neutral fw-bolder",onClick:()=>q("poster"),children:[(0/* MdAdd */,d.jsx)(m.jgn,{})," Add Poster"]})]})]}),V&&(0,d.jsxs)(d.Fragment,{children:[!e&&(0,d.jsxs)("div",{className:"border border-2 p-3 rounded-2 bg-dark mb-3 mx-md-5",children:[(0,d.jsxs)("h6",{className:"fw-bolder gap-2 d-inline-flex",children:[(0/* FiInfo */,d.jsx)(o.S8s,{})," Do not register a lecture ",!x&&(0,d.jsx)(d.Fragment,{children:"or poster"})," without having a topic."]}),(0,d.jsxs)("p",{children:["If you consider to present a lecture ",!x&&(0,d.jsx)(d.Fragment,{children:"or a poster"})," but have not yet decided on the topic, skip this item and for now just continue with your registration. You can add your talk ",!x&&(0,d.jsx)(d.Fragment,{children:"or poster"})," later. The absolute deadline for"," ",(0,d.jsxs)("b",{className:"text-danger",children:["submitting talks ",!x&&(0,d.jsx)(d.Fragment,{children:"and posters"})," is ",(0,u/* formatFullDate */.Lu)(t.deadlines.reg),","]})," ","but if we cannot accommodate all presentations, priority may be given to those registered early."]}),(0,d.jsxs)("h6",{className:"fw-bolder gap-2 d-inline-flex mt-2",children:[(0/* FiInfo */,d.jsx)(o.S8s,{})," For all lectures ",!x&&(0,d.jsx)(d.Fragment,{children:"and posters"}),", a paper for the IMC Proceedings is required."]}),(0,d.jsxs)("p",{children:["Ideally, papers for the Proceedings should be submitted before the start of the conference."," ",(0,d.jsxs)("b",{className:"text-danger",children:["The absolute deadline for Proceedings paper delivery is ",(0,u/* formatFullDate */.Lu)(t.deadlines.paper)]}),"."]})]}),$.map(((a,r)=>(0,d.jsx)(c,{isAdmin:e,isEditing:s,conferenceData:t,index:r,register:f,remove:()=>(e=>{window.confirm("Are you sure? This talk will be deleted.")&&A(e)})(r),type:"talk",errors:j,sessions:v,setValue:y,talkDurations:p,initialValues:a,watch:k},a.id))),!x&&C.map(((a,r)=>(0,d.jsx)(c,{isAdmin:e,isEditing:s,conferenceData:t,index:r,register:f,remove:()=>(e=>{window.confirm("Are you sure? This poster will be deleted.")&&D(e)})(r),type:"poster",errors:j,sessions:v,initialValues:a,watch:k,setValue:y},a.id))),!(V&&0===$.length&&0===C.length)&&(0,d.jsxs)("div",{className:"d-flex gap-3 justify-content-center",children:[(0,d.jsxs)("button",{type:"button",className:"fw-bold btn btn-outline-secondary my-2",onClick:()=>q("talk"),children:[(0/* MdAdd */,d.jsx)(m.jgn,{})," Add Talk"]}),!x&&(0,d.jsxs)("button",{type:"button",className:"fw-bold btn btn-outline-secondary my-2",onClick:()=>q("poster"),children:[(0/* MdAdd */,d.jsx)(m.jgn,{})," Add Poster"]})]})]})]})}}
/***/,
/***/8232:
/***/(e,s,t)=>{
/* harmony export */t.d(s,{
/* harmony export */A:()=>a
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const a={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/}}]);