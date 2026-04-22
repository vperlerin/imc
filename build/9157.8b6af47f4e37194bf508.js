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
/* harmony export */Q:()=>/* binding */i
/* harmony export */,l:()=>/* binding */l
/* harmony export */});
/* harmony import */var a=t(3318),r=t(6540),n=t(1083);
/* harmony import */
// api/specific-data/index.js
const l=async()=>{const e=await(0,a/* .retry */.L)((()=>n/* ["default"] */.A.get("https://imc2026.imo.net/php/get_specific_data.php")));if(!e?.data?.success)throw new Error(e?.data?.message||"Failed to fetch specific IMC data. Please, refresh the page.");return e.data.data||{}},i=()=>{const[e,s]=(0,r.useState)([]),[t,a]=(0,r.useState)([]),[n,i]=(0,r.useState)([]),[o,d]=(0,r.useState)([]),[c,m]=(0,r.useState)(!0),[u,h]=(0,r.useState)(null),p=(0,r.useCallback)((async()=>{m(!0),h(null);try{const e=await l();s(e.workshops||[]),a(e.payment_methods||[]),i(e.registration_types||[]),d(e.sessions||[])}catch(e){h(e.message||"Failed to fetch specific IMC data. Please, refresh the page.")}finally{m(!1)}}),[]);return(0,r.useEffect)((()=>{p()}),[p]),{error:u,loading:c,paymentMethods:t,refetchSpecificData:p,registrationTypes:n,sessions:o,workshops:e}}}
/***/,
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
t.d(s,{A:()=>/* binding */x});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var a=t(6942),r=t.n(a),n=t(8232),l=t(6540),i=t(2834),o=t(3),d=t(8153),c=t(4848);// ./src/components/registration/talkPoster/index.js
const m=({isAdmin:e=!1,isEditing:s=!1,conferenceData:t,index:a,register:i,remove:m,type:u,errors:h,sessions:p,talkDurations:b=[],initialValues:x={},setValue:f,watch:j})=>{const[g,N]=(0,l.useState)(!1),w="talk"===u,y=(0,d/* offersOnsitePosterPrint */.a)(t),v=j(`${u}s.${a}.print`)??x.print,k=!0===x.print||"true"===x.print||1===x.print||"1"===x.print,$=!0===v||"true"===v||1===v||"1"===v;
// Ensure session_id is properly stored instead of session name
// Ensure session_id is properly stored instead of session name
return(0,l.useEffect)((()=>{x.session_id&&f(`${u}s.${a}.session_id`,x.session_id)}),[x.session_id,f,a,u]),(0,l.useEffect)((()=>{w||y||f(`${u}s.${a}.print`,"false",{shouldValidate:!0,shouldDirty:!1})}),[w,y,u,a,f]),(0,l.useEffect)((()=>{N(!(!s||k===$))}),[$,k,s]),(0,c.jsxs)("div",{className:"border rounded-2 p-3 mb-3 mx-md-5",children:[(0,c.jsxs)("h5",{className:"fw-bold d-flex justify-content-between align-items-center mb-3 border-bottom pb-2",children:[(0,c.jsxs)("span",{children:[w?"Talk":"Poster"," #",a+1]}),(0,c.jsx)("button",{title:`Delete ${w?"Talk":"Poster"} #${a+1}`,type:"button",className:r()("btn btn-sm btn-danger",n/* default */.A.deleteBtn),onClick:m,children:(0/* FiTrash2 */,c.jsx)(o.IXo,{})})]}),(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Title"}),(0,c.jsxs)("div",{className:"col-sm-10",children:[(0,c.jsx)("input",{className:"form-control",defaultValue:x.title||"",placeholder:"Enter title",...i(`${u}s.${a}.title`,{required:"Title is required"})}),h?.[`${u}s`]?.[a]?.title&&(0,c.jsx)("p",{className:"text-danger",children:(0,c.jsx)("small",{children:h[`${u}s`][a].title.message})})]})]}),(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Authors"}),(0,c.jsxs)("div",{className:"col-sm-10",children:[(0,c.jsx)("input",{className:"form-control",defaultValue:x.authors||"",placeholder:"List all authors separated with commas",...i(`${u}s.${a}.authors`,{required:"Authors are required"})}),h?.[`${u}s`]?.[a]?.authors&&(0,c.jsx)("p",{className:"text-danger",children:(0,c.jsx)("small",{children:h[`${u}s`][a].authors.message})})]})]}),(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Abstract"}),(0,c.jsxs)("div",{className:"col-sm-10",children:[(0,c.jsx)("textarea",{className:"form-control",defaultValue:x.abstract||"",placeholder:"Enter abstract",...i(`${u}s.${a}.abstract`,{required:"Abstract is required"})}),h?.[`${u}s`]?.[a]?.abstract&&(0,c.jsx)("p",{className:"text-danger",children:(0,c.jsx)("small",{children:h[`${u}s`][a].abstract.message})})]})]}),(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"IMC Session"}),(0,c.jsxs)("div",{className:"col-sm-10",children:[(0,c.jsxs)("select",{className:r()("form-select",h?.[`${u}s`]?.[a]?.session_id&&"is-invalid",n/* default */.A.mdAuto),...i(`${u}s.${a}.session_id`,{required:"Session is required"}),defaultValue:x.session_id||"",onChange:e=>f(`${u}s.${a}.session_id`,e.target.value,{shouldValidate:!0}),children:[(0,c.jsx)("option",{value:"",children:"Select a session"}),p.map((e=>(0,c.jsxs)("option",{value:e.id,children:[e.name," "]},e.id)))]}),h?.[`${u}s`]?.[a]?.session_id&&(0,c.jsx)("p",{className:"text-danger",children:(0,c.jsx)("small",{children:h[`${u}s`][a].session_id.message})})]})]}),w&&(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsx)("label",{className:"col-sm-2 col-form-label fw-bold pb-0",children:"Talk Duration"}),(0,c.jsxs)("div",{className:"col-sm-10",children:[(0,c.jsxs)("select",{className:r()("form-select",h?.[`${u}s`]?.[a]?.duration&&"is-invalid",n/* default */.A.mdAuto),defaultValue:x.duration||"",...i(`${u}s.${a}.duration`,{required:"Duration is required"}),children:[(0,c.jsx)("option",{value:"",children:"Select duration"}),b.map((e=>(0,c.jsx)("option",{value:e,children:e},e)))]}),h?.[`${u}s`]?.[a]?.duration&&(0,c.jsx)("p",{className:"text-danger",children:(0,c.jsx)("small",{children:h[`${u}s`][a].duration.message})})]})]}),!w&&!s&&y&&(0,c.jsxs)(c.Fragment,{children:[s&&g&&(0,c.jsx)("div",{className:"alert alert-warning mt-2 fw-bolder",children:"Changing this option will update the total fees. The treasurer will be notified, and you may need to be reimbursed or pay more."}),(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsxs)("label",{className:"fw-bold pb-0",children:["Do you want to have your poster printed on-site for ",t.poster_print.price,"€?"]}),!e&&t.poster_print?.desc&&(0,c.jsx)("p",{className:"form-text mt-0",children:t.poster_print.desc}),(0,c.jsx)("div",{className:"text-center btn-group d-block",role:"group",children:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("input",{type:"radio",className:"btn-check",id:`printYes${a}`,value:"true",...i(`${u}s.${a}.print`,{required:"Please select an option"}),onChange:()=>f(`${u}s.${a}.print`,"true",{shouldValidate:!0,shouldDirty:!0}),checked:$}),(0,c.jsx)("label",{className:"btn btn-outline-neutral fw-bolder",htmlFor:`printYes${a}`,children:"Yes"}),(0,c.jsx)("input",{type:"radio",className:"btn-check",id:`printNo${a}`,value:"false",...i(`${u}s.${a}.print`,{required:"Please select an option"}),onChange:()=>f(`${u}s.${a}.print`,"false",{shouldValidate:!0,shouldDirty:!0}),checked:!$}),(0,c.jsx)("label",{className:"btn btn-outline-neutral fw-bolder",htmlFor:`printNo${a}`,children:"No"})]})})]})]})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-icons/md/index.mjs
var u=t(9879),h=t(5846),p=t(9785);
// EXTERNAL MODULE: ./src/utils/date.js
// ./src/components/registration/contribution.js
// !hardcode in DB
const b=["10min","15min","20min","25min","30min"],x=({isAdmin:e=!1,isEditing:s=!1,conferenceData:t,control:a,isDebugMode:x=!1,isOnline:f=!1,register:j,errors:g,step:N,stepTotal:w,trigger:y,setValue:v,sessions:k,watch:$})=>{const{fields:_,append:A,remove:C}=(0,p/* useFieldArray */.jz)({control:a,name:"talks"}),{fields:T,append:D,remove:F}=(0,p/* useFieldArray */.jz)({control:a,name:"posters"}),S=!0===(V=$("wantsToContribute")??"false")||"true"===V||1===V||"1"===V?"true":"false";var V;const E="true"===S,P=e=>{v("wantsToContribute",e,{shouldDirty:!0,shouldValidate:!0})},q=(0,l.useRef)(!1);(0,l.useEffect)((()=>{E?
// If data is already loaded (admin/edit) and forms exist, do nothing
_.length>0||T.length>0?q.current=!0:q.current||(q.current=!0):q.current=!1}
// Default behavior: add a first TALK
//addTalk({});
),[E,_.length,T.length,A]);
// Validate before adding new talk/poster
const M=async e=>{await y()&&(P("true"),"talk"===e?A({}):f||D({print:!1}))};
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
return(0,c.jsxs)("div",{className:"position-relative",children:[x&&(0,c.jsx)("button",{type:"button",className:"position-absolute top-0 end-0 btn btn-secondary",onClick:()=>{P("true"),
// Remove all existing talks/posters before filling test data
_.length>0&&C(),!f&&T.length>0&&F();const e=k.find((e=>"Meteor physics and dynamics"===e.name))?.id||k[0]?.id,s=k.find((e=>"Radio meteor work"===e.name))?.id||k[0]?.id;A({title:"Meteor Observation Techniques",authors:"John Doe, Jane Smith",abstract:"A study on advanced meteor observation methods.",session_id:e,duration:"15min"}),f||D({title:"Radio Meteor Detection",authors:"Alice Brown, Bob White",abstract:"An overview of detecting meteors using radio waves.",session_id:s,print:(0,d/* offersOnsitePosterPrint */.a)(t)})},children:"Fill Test Data"}),!e&&!s&&(0,c.jsxs)("h4",{className:"mb-3 border-bottom pb-2",children:[(0/* default */,c.jsx)(i.A,{step:N,stepTotal:w}),"Contributions"]}),s&&(0,c.jsx)("h4",{className:"mb-3 border-bottom pb-2",children:"Update your Contributions"}),(0,c.jsx)("div",{className:r()(n/* default */.A.smallW,"mx-auto position-relative"),children:(0,c.jsxs)("div",{className:"mb-3 row",children:[(0,c.jsxs)("label",{className:r()("text-center fw-bold",n/* default */.A.balance),children:["Would you like to contribute a",f&&"n online "," talk ",!f&&(0,c.jsx)(c.Fragment,{children:"or a poster"})," to the main IMC"," ",t.year," conference program?"]}),(0,c.jsx)("input",{type:"hidden",...j("wantsToContribute")}),(0,c.jsxs)("div",{className:"text-center btn-group d-block mt-3",role:"group",children:[(0,c.jsx)("input",{type:"radio",className:"btn-check",id:"contributeYes",name:"wantsToContributeRadio",value:"true",checked:"true"===S,onChange:()=>P("true")}),(0,c.jsx)("label",{className:r()("btn",{"btn-primary":"true"===S,"btn-outline-primary":"true"!==S}),htmlFor:"contributeYes",children:"Yes"}),(0,c.jsx)("input",{type:"radio",className:"btn-check",id:"contributeNo",name:"wantsToContributeRadio",value:"false",checked:"false"===S,onChange:()=>{if(_.length>0||T.length>0){if(!window.confirm("Are you sure? All talks and posters you have entered will be deleted."))
// Keep YES selected if user cancels
return void P("true");
// Remove all talks and posters
_.length>0&&C(),T.length>0&&F()}P("false")}}),(0,c.jsx)("label",{className:r()("btn",{"btn-primary":"false"===S,"btn-outline-primary":"false"!==S}),htmlFor:"contributeNo",children:"No"})]}),g.wantsToContribute&&(0,c.jsx)("p",{className:"text-danger fw-bold text-center",children:(0,c.jsx)("small",{children:g.wantsToContribute.message})})]})}),E&&0===_.length&&0===T.length&&(0,c.jsxs)("div",{className:"text-center my-4",children:[(0,c.jsx)("p",{className:"fw-bolder mb-2",children:"What would you like to add?"}),(0,c.jsxs)("div",{className:"d-flex gap-3 justify-content-center",children:[(0,c.jsxs)("button",{type:"button",className:"btn btn-outline-neutral fw-bolder",onClick:()=>M("talk"),children:[(0/* MdAdd */,c.jsx)(u.jgn,{})," Add Talk"]}),!f&&(0,c.jsxs)("button",{type:"button",className:"btn btn-outline-neutral fw-bolder",onClick:()=>M("poster"),children:[(0/* MdAdd */,c.jsx)(u.jgn,{})," Add Poster"]})]})]}),E&&(0,c.jsxs)(c.Fragment,{children:[!e&&(0,c.jsxs)("div",{className:"border border-2 p-3 rounded-2 bg-dark mb-3 mx-md-5",children:[(0,c.jsxs)("h6",{className:"fw-bolder gap-2 d-inline-flex",children:[(0/* FiInfo */,c.jsx)(o.S8s,{})," Do not register a lecture ",!f&&(0,c.jsx)(c.Fragment,{children:"or poster"})," without having a topic."]}),(0,c.jsxs)("p",{children:["If you consider to present a lecture ",!f&&(0,c.jsx)(c.Fragment,{children:"or a poster"})," but have not yet decided on the topic, skip this item and for now just continue with your registration. You can add your talk ",!f&&(0,c.jsx)(c.Fragment,{children:"or poster"})," later. The absolute deadline for"," ",(0,c.jsxs)("b",{className:"text-danger",children:["submitting talks ",!f&&(0,c.jsx)(c.Fragment,{children:"and posters"})," is ",(0,h/* formatFullDate */.Lu)(t.deadlines.reg),","]})," ","but if we cannot accommodate all presentations, priority may be given to those registered early."]}),(0,c.jsxs)("h6",{className:"fw-bolder gap-2 d-inline-flex mt-2",children:[(0/* FiInfo */,c.jsx)(o.S8s,{})," For all lectures ",!f&&(0,c.jsx)(c.Fragment,{children:"and posters"}),", a paper for the IMC Proceedings is required."]}),(0,c.jsxs)("p",{children:["Ideally, papers for the Proceedings should be submitted before the start of the conference."," ",(0,c.jsxs)("b",{className:"text-danger",children:["The absolute deadline for Proceedings paper delivery is ",(0,h/* formatFullDate */.Lu)(t.deadlines.paper)]}),"."]})]}),_.map(((a,r)=>(0,c.jsx)(m,{isAdmin:e,isEditing:s,conferenceData:t,index:r,register:j,remove:()=>(e=>{window.confirm("Are you sure? This talk will be deleted.")&&C(e)})(r),type:"talk",errors:g,sessions:k,setValue:v,talkDurations:b,initialValues:a,watch:$},a.id))),!f&&T.map(((a,r)=>(0,c.jsx)(m,{isAdmin:e,isEditing:s,conferenceData:t,index:r,register:j,remove:()=>(e=>{window.confirm("Are you sure? This poster will be deleted.")&&F(e)})(r),type:"poster",errors:g,sessions:k,initialValues:a,watch:$,setValue:v},a.id))),!(E&&0===_.length&&0===T.length)&&(0,c.jsxs)("div",{className:"d-flex gap-3 justify-content-center",children:[(0,c.jsxs)("button",{type:"button",className:"fw-bold btn btn-outline-secondary my-2",onClick:()=>M("talk"),children:[(0/* MdAdd */,c.jsx)(u.jgn,{})," Add Talk"]}),!f&&(0,c.jsxs)("button",{type:"button",className:"fw-bold btn btn-outline-secondary my-2",onClick:()=>M("poster"),children:[(0/* MdAdd */,c.jsx)(u.jgn,{})," Add Poster"]})]})]})]})}}
/***/,
/***/8153:
/***/(e,s,t)=>{
/* harmony export */t.d(s,{
/* harmony export */a:()=>/* binding */a
/* harmony export */});
/**
 * On-site poster printing is only offered when conference data defines a positive price.
 */
const a=e=>{const s=Number(e?.poster_print?.price);return Number.isFinite(s)&&s>0};
/***/},
/***/8232:
/***/(e,s,t)=>{
/* harmony export */t.d(s,{
/* harmony export */A:()=>a
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const a={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/}}]);