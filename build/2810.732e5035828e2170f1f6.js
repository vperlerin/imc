"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[2810],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */d});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),i=a.n(s),l=a(8027),r=a(6540),o=a(5846),c=a(4848);// ./src/admin/components/admin-table/index.js
const d=({participants:e,withActions:t=!0,customActions:a=null,onDelete:s=null})=>{const[d,m]=(0,r.useState)(null),[p,u]=(0,r.useState)("asc"),h=e=>{d===e?u("asc"===p?"desc":"asc"):(m(e),u("asc"))},x=[...e].sort(((e,t)=>{if(!d)return 0;let a=e[d],n=t[d];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(d)&&(a=parseFloat(a)||0,n=parseFloat(n)||0),"due_amount"===d){const s=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,n=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+n-a:t-a};a=s(e),n=s(t)}
// Handle dates
return["created_at","confirmation_date"].includes(d)&&(a=a?new Date(a).getTime():0,n=n?new Date(n).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===d&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",n=t.payment_method_name?t.payment_method_name.toLowerCase():""),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===d&&(a="1"===a?1:0,n="1"===n?1:0),a<n?"asc"===p?-1:1:a>n?"asc"===p?1:-1:0}));
return(0,c.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,c.jsxs)("table",{className:"table table-striped",children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:n,onClick:()=>h("id"),children:"#"}),(0,c.jsx)("th",{className:n,onClick:()=>h("created_at"),children:"Reg. Date"}),(0,c.jsx)("th",{className:n,onClick:()=>h("last_name"),children:"Name"}),(0,c.jsx)("th",{className:n,onClick:()=>h("total_due"),children:"Total"}),(0,c.jsx)("th",{className:n,onClick:()=>h("total_paid"),children:"Paid"}),(0,c.jsx)("th",{className:n,onClick:()=>h("due_amount"),children:"Due"}),(0,c.jsx)("th",{className:n,onClick:()=>h("payment_method"),children:"Method"}),(0,c.jsx)("th",{className:n,onClick:()=>h("confirmation_sent"),children:"Confirmed"}),(0,c.jsx)("th",{className:n,onClick:()=>h("confirmation_date"),children:"Conf. Email"}),(t||a)&&(0,c.jsx)("th",{})]})}),(0,c.jsx)("tbody",{children:x.length>0?x.map((e=>{const n=parseFloat(e.total_due)||0,r=parseFloat(e.total_paid)||0,d=parseFloat(e.paypal_fee||0),m="paypal"===e.payment_method_name?.toLowerCase(),p=m?n+d-r:n-r;
return(0,c.jsxs)("tr",{className:"cancelled"===e.status?"text-warning ":"",children:[(0,c.jsx)("td",{children:e.id}),(0,c.jsx)("td",{children:e.created_at.split(" ")[0]}),(0,c.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),(0,c.jsxs)("td",{children:[m?(n+d).toFixed(2):n.toFixed(2),"€"]}),(0,c.jsxs)("td",{children:[r.toFixed(2),"€"]}),(0,c.jsxs)("td",{className:i()({"text-success":0===p}),children:[p.toFixed(2),"€"]}),(0,c.jsx)("td",{children:e.payment_method_name||"n/a"}),(0,c.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,c.jsx)("td",{className:i()("cancelled"===e.status?"text-warning":e?.confirmation_date&&"text-success"),children:"cancelled"===e.status?"CANCELLED":e.confirmation_date?(0,o/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),t&&s&&(0,c.jsx)("td",{children:(0,c.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:["cancelled"===e.status?(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Reimbursements"}):(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,c.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,c.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{s?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,c.jsx)(l.H8h,{})})]})}),a&&"cancelled"!==e.status&&(0,c.jsx)(c.Fragment,{children:a})]},e.id)})):(0,c.jsx)("tr",{children:(0,c.jsx)("td",{colSpan:t?10:9,className:"text-center",children:"No participants found."})})})]})})};
/* harmony default export */}
/***/,
/***/914:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Z:()=>/* binding */n
/* harmony export */});
/* harmony import */a(1083);const n=async({subject:e,message:t,to:a,toName:n,fromName:s,replyTo:i,replyName:l,bcc:r=[],token:o=null})=>{}}
/***/,
/***/1280:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */_v:()=>/* binding */n
/* harmony export */});
/* unused harmony exports onPreventDefault, onPreventStop */
const n=e=>{e&&e.stopPropagation()}}
/***/,
/***/2337:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>i
/* harmony export */});
/* harmony import */a(6540);
/* harmony import */var n=a(4848);const s=e=>Math.round(100*(e+(.034*e+.35)/.966))/100,i=({isOnline:e,conferenceData:t,participantData:a,registrationTypes:i})=>{if(!a||!a.participant)
return(0,n.jsx)("div",{className:"alert alert-danger",children:"No participant data available."});const{participant:l,accommodation:r,workshops:o,extra_options:c,contributions:d=[]}=a;
// Initialize totalRoomCost
let m=0,p="";
// Only calculate registration cost if NOT online
if(!e){const e=((e,t)=>{const a=t.find((t=>t.id===e));return a?{description:t[t.length-1].id===e?"(no accommodation)":"+ "+a.description,price:parseFloat(a.price)}:"Description not found"})(r.registration_type_id,i);p=e.description;const a="0"===l.is_early_bird?t.costs.after_early_birds:0;m=e.price+a}
// Selected Workshops
const{selected:u,totalPrice:h}=((e=[],t)=>{if(!Array.isArray(e))return{selected:[],totalPrice:0};const a=e.map((e=>({title:e.title,price:t?parseFloat(e.price_online):parseFloat(e.price)}))),n=a.reduce(((e,t)=>e+t.price),0);return{selected:a,totalPrice:n}})(o,e),x="1"===c?.buy_tshirt||"true"===c?.buy_tshirt?parseFloat(t.costs.tshirts.price):0,f=d.filter((e=>"1"===e.print||"true"===e.print)).length,b=f*t.poster_print.price,y="paypal"===(l.payment_method_name||"Unknown").toLowerCase();
// T-shirt Cost
// Total Calculation
let j=m+h+x+b;const N=y?s(j)-j:0;j+=N;
// Online Conference Cost Calculation
const g=t.costs.online;let _=h+g;const w=y?s(_)-_:0;return _+=w,(0,n.jsxs)("div",{className:"p-2 border rounded flex-shrink-0",children:[(0,n.jsx)("h4",{className:"mb-3",children:"Invoice Summary"}),(0,n.jsxs)("table",{className:"table table-striped table-hover",children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{scope:"col",children:"Description"}),(0,n.jsx)("th",{scope:"col",className:"text-end",children:"Price"})]})}),(0,n.jsxs)("tbody",{children:[e?(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"ps-3 text-muted",children:"Online Conference Registration"}),(0,n.jsxs)("td",{className:"text-end",children:[g.toFixed(2),"€"]})]}):(0,n.jsxs)("tr",{children:[(0,n.jsxs)("td",{className:"ps-3 text-muted",children:["Conference Registration ",p]}),(0,n.jsxs)("td",{className:"text-end",children:[m.toFixed(2),"€"]})]}),u.map(((e,t)=>(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"ps-3 text-muted",children:e.title}),(0,n.jsxs)("td",{className:"text-end",children:[e.price.toFixed(2),"€"]})]},t))),f>0&&(0,n.jsxs)("tr",{children:[(0,n.jsxs)("td",{className:"ps-3 text-muted",children:["Printed Poster",f>1?"s":""," x ",f]}),(0,n.jsxs)("td",{className:"text-end",children:[b.toFixed(2),"€"]})]}),x>0&&c?.tshirt_size&&(0,n.jsxs)("tr",{children:[(0,n.jsxs)("td",{className:"ps-3 text-muted",children:["T-Shirt (",c.tshirt_size,")"]}),(0,n.jsxs)("td",{className:"text-end",children:[x.toFixed(2),"€"]})]}),y&&(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"ps-3 text-muted",children:"PayPal Fee (3.4% + 0.35€)"}),(0,n.jsxs)("td",{className:"text-end",children:[e?w.toFixed(2):N.toFixed(2),"€"]})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)("strong",{children:"TOTAL"})}),(0,n.jsx)("td",{className:"text-end",children:(0,n.jsxs)("strong",{children:[e?_.toFixed(2):j.toFixed(2),"€"]})})]})]})]})]})}}
/***/,
/***/2810:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */v});
// EXTERNAL MODULE: ./node_modules/react-icons/io/index.mjs
var n=a(6512),s=a(8027),i=a(578);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.mjs
// ./src/admin/pages/participants/payment/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const l={col:"index-module__col--xCPfA",textInput:"index-module__textInput--bmdEf"};
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var r=a(6942),o=a.n(r),c=a(7647),d=a(6540),m=a(6645),p=a(8232),u=a(2337),h=a(7767),x=a(7762),f=a(9785),b=a(1083),y=a(3318);// ./src/admin/api/payments/index.js
const j=e=>{const[t,a]=(0,d.useState)([]),[n,s]=(0,d.useState)(!1),[i,l]=(0,d.useState)(null),r=(0,d.useCallback)((async()=>{if(e){s(!0),l(null);try{const t=await(0,y/* retry */.L)((()=>b/* default */.A.get(`https://imc2026.imo.net/php/admin/api/get_payments.php?id=${e}`)));t.data.success?a(t.data.data||[]):l(t.data.message||"Error fetching payments.")}catch(e){l(e.message||"Error fetching payments.")}finally{s(!1)}}}),[e]);
// Fetch payments on mount
// Fetch payments on mount
return(0,d.useEffect)((()=>{r()}),[r]),{payments:t,loading:n,error:i,refetchPayments:r}};
// EXTERNAL MODULE: ./src/api/specific-data/index.js
var N=a(4493),g=a(4972);
// EXTERNAL MODULE: ./src/api/participants/index.js
// EXTERNAL MODULE: ./src/hooks/send-email.js
var _=a(914),w=a(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/pages/participants/payment/index.js
const v=({isCurOnline:e=!1})=>{const{participantId:t}=(0,h/* useParams */.g)(),[a,r]=(0,d.useState)(!1),[v,C]=(0,d.useState)(""),[k,S]=(0,d.useState)(null),[F,P]=(0,d.useState)(null),[$,A]=(0,d.useState)(null),[T,I]=(0,d.useState)(null),[M,D]=(0,d.useState)(null),[L,E]=(0,d.useState)(!1),[O,U]=(0,d.useState)(!1),[R,W]=(0,d.useState)(!1),[z,Z]=(0,d.useState)(""),[q,H]=(0,d.useState)(!1),{workshops:V,paymentMethods:B,registrationTypes:Y,loading:J,sessions:Q,error:X}=(0,N/* useApiSpecificData */.Q)(),{participant:G,loading:K,error:ee}=(0,g/* useApiParticipant */.D)(t,e,L),{payments:te,loading:ae,error:ne,refetchPayments:se}=j(t),{addPayment:ie}=(e=>{const[t,a]=(0,d.useState)(!1),[n,s]=(0,d.useState)(null),{refetchPayments:i}=j(e);return{addPayment:(0,d.useCallback)((async t=>{if(e){a(!0),s(null);try{const e=await(0,y/* retry */.L)((()=>b/* default */.A.post("https://imc2026.imo.net/php/admin/api/add_payment.php",{paymentData:t},{headers:{"Content-Type":"application/json"}})));if(e.data.success)return await i(),{success:!0,message:"Payment added successfully!"};throw new Error(e.data.message||"Failed to add payment.")}catch(e){return s(e.message||"Error adding payment."),{success:!1,message:e.message}}finally{a(!1)}}}),[e,i]),loading:t,error:n}})(t),{deletePayment:le,loading:re,error:oe}=(e=>{const[t,a]=(0,d.useState)(!1),[n,s]=(0,d.useState)(null),{refetchPayments:i}=j(e);return{deletePayment:(0,d.useCallback)((async t=>{if(e&&t){a(!0),s(null);try{const e=await(0,y/* retry */.L)((()=>b/* default */.A.delete("https://imc2026.imo.net/php/admin/api/delete_payment.php",{data:{payment_id:t},headers:{"Content-Type":"application/json"}})));if(e.data.success)return await i(),{success:!0,message:"Payment deleted successfully!"};throw new Error(e.data.message||"Failed to delete payment.")}catch(e){return s(e.message||"Error deleting payment."),{success:!1,message:e.message}}finally{a(!1)}}}),[e,i]),loading:t,error:n}})(t),{confirmParticipant:ce,isConfirming:de,errorConfirm:me}=(()=>{const[e,t]=(0,d.useState)(null),[a,n]=(0,d.useState)(!1);return{confirmParticipant:async(e,a)=>{if(!e)return null;n(!0),t(null);try{return(await b/* default */.A.post("https://imc2026.imo.net/php/admin/api/confirm.php",{id:e,...a})).data}catch(e){const a=e.response?.data?.message||"An unexpected error occurred.";return t(a),{success:!1,message:a}}finally{n(!1)}},errorConfirm:e,isConfirming:a}})(),{formState:{errors:pe},register:ue,handleSubmit:he,isSubmitting:xe,setValue:fe,watch:be,reset:ye}=(0,f/* useForm */.mN)({defaultValues:{amount:"",paymentMethodId:"",paymentDate:(new Date).toISOString().split("T")[0],adminNote:""}}),je=J||K||xe||ae,Ne=ee||X||ne||k;
// Default Payment Method
// Default Payment Method
(0,d.useEffect)((()=>{G&&G.participant&&fe("paymentMethodId",G.participant.payment_method_id||"")}),[G,fe]),
// Default Amount
// Default Amount
(0,d.useEffect)((()=>{if(G?.participant){const e=parseFloat(G.participant.total_due||0),t=parseFloat(G.participant.paypal_fee||0),a=parseFloat(G.participant.total_paid||0),n=G.participant.payment_method_name?e+t-a:e-a;fe("amount",n.toFixed(2))}}),[G,fe]);
// Refecht Participant
// Refecht Participant
(0,d.useEffect)((()=>{E((e=>!e))}),[te]);
// Confirm
const ge=()=>{I(null),S(null);const e=(()=>{if(!G?.participant)return 0;const e=parseFloat(G.participant.total_due||0),t=parseFloat(G.participant.paypal_fee||0),a=parseFloat(G.participant.total_paid||0);return G.participant.payment_method_name?e+t-a:e-a})();if(e>0){let t=`Marc, you are about to confirm ${`${G?.participant?.first_name} ${G?.participant?.last_name}`} <strong>${we?"ONLINE":"ONSITE"}</strong> registration.`;t+=` <div class="text-danger fw-bolder border rounded-2 p-2 m-3 border-danger">${G?.participant?.first_name} still needs to pay ${e.toFixed(2)}€</div>`,t+="<p>Are you sure you want to continue?</p>",Z(t),U(!0)}else W(!0)},_e=()=>{ye({amount:"",paymentMethodId:"",paymentDate:(new Date).toISOString().split("T")[0],adminNote:""}),D(null)},we="1"===G?.participant?.is_online,ve=[{url:"/admin/participants/"+(we?"online":"onsite"),name:we?"Online Participants":"On-site Participants"},{url:`/admin/participants/${we?"online":"onsite"}/payment/${t}`,name:`${G?.participant?.first_name||"Participant"} ${G?.participant?.last_name||""}'s Payments`}],Ce=`\n    Dear ${G?.participant?.first_name} ${G?.participant?.last_name},<br><br>\n    Your participation in the IMC ${x/* conferenceData */.p.year} has now been confirmed.<br><br>\n    Should your plans change, please contact us immediately: https://imc${x/* conferenceData */.p.year}.imo.net/contact<br> \n    Notice that in such a case, the cancellation policy of the Disclaimer and Service Agreement applies: https://imc${x/* conferenceData */.p.year}.imo.net/disclaimer<br><br>\n    ${v}\n    Thank you!<br>\n    We look forward to meeting you at ${x/* conferenceData */.p.location}.<br><br>\n    The IMC ${x/* conferenceData */.p.year} Team.\n  `,ke=async()=>{if(a){H(!0);try{if(!(await(0,_/* sendEmail */.Z)({subject:`IMC ${x/* conferenceData */.p.year} Confirmation`,message:Ce,to:G.participant.email,toName:"IMC Confirmed Participant",fromName:"IMC 2026",replyTo:"no-reply@imc2026.imo.net",replyName:"no-reply",bcc:"vperlerin@gmail.com".split(",").map((e=>({email:e,name:"BCC Recipient"})))})).success)return void P("Impossible to send the an email for the moment. Please, try again later");await ce(t,{confirmation_sent:!0,confirmation_date:!0}),U(!1),W(!1),
// Refecht participant
E((e=>!e))}catch(e){P("Failed to confirm the participant. Pleaase, try again later.")}finally{H(!1)}}else r(!0)},Se="0"!==G?.participant.confirmation_sent&&0!==G?.participant.confirmation_sent,Fe=!!G?.participant.confirmation_date,Pe=(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("td",{children:[!Se&&!Fe&&(0,w.jsx)("div",{className:"d-flex gap-2 justify-content-end",children:(0,w.jsx)("button",{className:"btn btn-sm btn-outline-success fw-bolder",onClick:ge,children:"CONFIRM"})}),Se&&!Fe&&(0,w.jsx)("div",{className:"d-flex gap-2 justify-content-end",children:(0,w.jsxs)("button",{className:"btn btn-sm btn-outline-success fw-bolder",onClick:ge,children:["SEND ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]})})]})});
// Reset form fields 
return(0/* default */,w.jsxs)(c.A,{breadcrumb:ve,isMaxWidth:!0,children:[je&&(0/* default */,w.jsx)(m.A,{}),Ne&&(0,w.jsx)("div",{className:"alert alert-danger fw-bolder",children:Ne}),T&&(0,w.jsx)("div",{className:"alert alert-success fw-bolder",children:T}),!je&&(0,w.jsxs)(w.Fragment,{children:[!K&&(0/* default */,w.jsx)(i.A,{participants:[G?.participant],customActions:Pe}),(0,w.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-3 align-items-strecht",children:[(0,w.jsxs)("div",{className:"border p-3 rounded-2 flex-grow-1",children:[(0,w.jsx)("h4",{className:"mb-3",children:M?"Edit":"Add a New Payment/Reimbursement"}),(0,w.jsxs)("form",{onSubmit:he((async e=>{I(null),S(null);const a={participant_id:t,amount:parseFloat(e.amount),payment_method_id:e.paymentMethodId,payment_date:e.paymentDate,admin_note:e.adminNote||null},n=await ie(a);n.success?(I("Payment added successfully!"),_e(),await se()):S(n.message)})),children:[(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Amount (€)"}),(0,w.jsxs)("div",{className:"col-sm-5",children:[(0,w.jsx)("input",{type:"number",className:o()("form-control",p/* default */.A.md50),...ue("amount",{required:!0}),step:"0.01"}),pe.amount&&(0,w.jsx)("span",{className:"text-danger",children:"Amount is required."})]})]}),(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Payment Method"}),(0,w.jsxs)("div",{className:"col-sm-6",children:[(0,w.jsxs)("select",{className:"form-select",...ue("paymentMethodId",{required:!0}),children:[(0,w.jsx)("option",{value:"",children:"Select a payment/Reimbursement method"}),B.map((e=>(0,w.jsx)("option",{value:e.id,children:e.method},e.id)))]}),pe.paymentMethodId&&(0,w.jsx)("span",{className:"text-danger",children:"Payment method is required."})]})]}),(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Payment Date"}),(0,w.jsx)("div",{className:"col-sm-6",children:(0,w.jsx)("input",{type:"date",className:"form-control",...ue("paymentDate",{required:!0})})})]}),(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Admin Note (Optional)"}),(0,w.jsx)("div",{className:"col-sm-9",children:(0,w.jsx)("textarea",{className:"form-control",...ue("adminNote"),rows:"2"})})]}),(0,w.jsx)("div",{className:"text-end",children:(0,w.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:xe,children:xe?"Processing...":M?"Update Payment":"Add Payment"})})]})]}),(0/* default */,w.jsx)(u.A,{isOnline:we,conferenceData:x/* conferenceData */.p,participantData:G,workshops:V,registrationTypes:Y,paymentMethods:B})]}),te&&te.length>0&&!(1===te.length&&0===parseFloat(te[0].amount))&&(0,w.jsxs)("div",{className:"border p-3 rounded-2 mt-3",children:[(0,w.jsx)("h4",{className:"mb-3",children:"Payments in record"}),($||oe)&&(0,w.jsx)("div",{className:"alert alert-danger fw-bolder",children:$||oe}),(0,w.jsxs)("table",{className:"table table-bordered table-striped",children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)("th",{children:"Date"}),(0,w.jsx)("th",{children:"Amount (€)"}),(0,w.jsx)("th",{children:"Method"}),(0,w.jsx)("th",{children:"Admin Note"}),(0,w.jsx)("th",{})]})}),(0,w.jsx)("tbody",{children:te.map((e=>0!==parseFloat(e.amount)?(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{children:e.payment_date.split(" ")[0]||"n/a"}),(0,w.jsx)("td",{children:parseFloat(e.amount).toFixed(2)}),(0,w.jsx)("td",{children:e.payment_method}),(0,w.jsx)("td",{children:e.admin_note||"No note"}),(0,w.jsx)("td",{children:(0,w.jsx)("div",{className:"position-relative",children:(0,w.jsxs)("button",{className:"btn btn-outline-danger d-inline-flex align-items-center",onClick:()=>(async e=>{if(!window.confirm("Are you sure you want to delete this payment?"))return;const t=await le(e);t.success?(I("Payment deleted successfully!"),
// Refecht participant
E((e=>!e)),await se()):A(t.message)})(e.id),children:[re&&(0/* default */,w.jsx)(m.A,{}),(0/* FaRegTrashAlt */,w.jsx)(s.H8h,{})]})})})]},e.id):null))})]})]}),(O||R)&&(0,w.jsx)("div",{className:"modal-backdrop fade show"}),O&&(0,w.jsx)("div",{className:"modal modal-lg show d-block",children:(0,w.jsx)("div",{className:"modal-dialog",children:(0,w.jsxs)("div",{className:"modal-content",children:[(0,w.jsxs)("div",{className:"modal-header",children:[(0,w.jsx)("h5",{className:"modal-title",children:"CONFIRMATION"}),(0,w.jsx)("button",{type:"button",className:"btn-close",onClick:()=>U(!1)})]}),(0,w.jsx)("div",{className:"modal-body",children:(0,w.jsx)("div",{dangerouslySetInnerHTML:{__html:z}})}),(0,w.jsxs)("div",{className:"modal-footer",children:[(0,w.jsx)("button",{className:"btn btn-outline-danger fw-bolder",onClick:()=>U(!1),children:"Cancel"}),(0,w.jsx)("button",{className:"btn btn-outline-success fw-bolder",onClick:()=>{U(!1),W(!0)},children:"Yes"})]})]})})}),R&&(0,w.jsx)("div",{className:"modal modal-lg show d-block",children:(0,w.jsx)("div",{className:"modal-dialog",children:(0,w.jsxs)("div",{className:"modal-content",children:[(0,w.jsxs)("div",{className:"modal-header",children:[(0,w.jsx)("h5",{className:"modal-title",children:"CONFIRMATION"}),(0,w.jsx)("button",{type:"button",className:"btn-close",onClick:()=>W(!1)})]}),(0,w.jsxs)("div",{className:"modal-body",children:[me&&(0,w.jsx)("div",{className:"text-danger fw-bolder",children:me}),F&&!me&&(0,w.jsx)("div",{className:"text-danger fw-bolder",children:F}),de||q&&(0/* default */,w.jsx)(m.A,{}),!a&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("p",{className:"fw-bolder",children:"Marc, make your choice: "}),(0,w.jsxs)("div",{className:"d-flex w-100 gap-3 mt-3",children:[!Se&&!Fe&&(0,w.jsxs)("button",{className:"fw-bolder btn btn-outline-success",onClick:ke,disabled:de,children:["CONFIRM & SEND ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]}),Se&&!Fe||!Se&&!Fe&&(0,w.jsx)("button",{className:"fw-bolder btn btn-outline-success",onClick:async()=>{H(!0);try{await ce(t,{confirmation_sent:!0}),U(!1),W(!1),
// Refecht participant
E((e=>!e))}catch(e){P("Failed to confirm the participant. Pleaase, try again later.")}finally{H(!1)}},disabled:de,children:"CONFIRM"}),Se&&!Fe&&(0,w.jsxs)("button",{className:"fw-bolder btn btn-outline-success",onClick:async()=>{if(a){H(!0);try{if(!(await(0,_/* sendEmail */.Z)({subject:`IMC ${x/* conferenceData */.p.year} Confirmation`,message:Ce,to:G.participant.email,toName:"IMC Confirmed Participant",fromName:"IMC 2026",replyTo:"no-reply@imc2026.imo.net",replyName:"no-reply",bcc:"vperlerin@gmail.com".split(",").map((e=>({email:e,name:"BCC Recipient"})))})).success)return void P("Impossible to send the an email for the moment. Please, try again later");await ce(t,{confirmation_date:!0}),U(!1),W(!1),
// Refecht participant
E((e=>!e))}catch(e){P("Failed to confirm the participant. Pleaase, try again later.")}finally{H(!1)}}else r(!0)},disabled:de,children:["SEND ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]}),me&&(0,w.jsx)("div",{className:"text-danger",children:me})]})]}),a&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("div",{children:(0,w.jsxs)("div",{className:"my-3 d-flex flex-column flex-md-row gap-3 align-items-strecht",children:[(0,w.jsxs)("div",{className:l.col,children:["Below is the email that is going to be sent:",(0,w.jsx)("div",{className:"bg-white text-black p-3 rounded mt-2",dangerouslySetInnerHTML:{__html:Ce}})]}),(0,w.jsxs)("div",{className:l.col,children:["Use the input below if you want to add text",(0,w.jsx)("textarea",{className:`form-control mt-2 ${l.textarea}`,rows:"3",value:v.replace(/<br>$/,"").replace(/<br>/g,"\n"),onChange:e=>C(e.target.value.replace(/\n/g,"<br>")+"<br>"),placeholder:"Add extra message here..."})]})]})}),(0,w.jsxs)("div",{className:"d-flex gap-3 justify-content-end",children:[(0,w.jsx)("button",{className:"btn btn-outline-neutral fw-bolder",onClick:()=>r(!1),children:"Cancel"}),(0,w.jsxs)("button",{className:"btn btn-outline-success fw-bolder",onClick:ke,disabled:de,children:["SEND NOW ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]})]})]})]})]})})})]})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=(e,{interval:t=1e3,retries:a=6}={})=>new Promise(((s,i)=>{e().then(s).catch((l=>{setTimeout((()=>{a?n(e,{interval:1.5*t,retries:a-1}).then(s,i):i(l)}),t)}))}));
/***/},
/***/4493:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Q:()=>/* binding */l
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */const l=()=>{const[e,t]=(0,s.useState)([]),[a,l]=(0,s.useState)([]),[r,o]=(0,s.useState)([]),[c,d]=(0,s.useState)([]),[m,p]=(0,s.useState)(!0),[u,h]=(0,s.useState)(null);// Runs only once when the component mounts
return(0,s.useEffect)((()=>{(async()=>{try{const e=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get("https://imc2026.imo.net/php/get_specific_data.php")));if(!e.data.success)throw new Error(e.data.message||"Failed to fetch specific IMC data. Please, refresh the page.");t(e.data.data.workshops||[]),l(e.data.data.payment_methods||[]),o(e.data.data.registration_types||[]),d(e.data.data.sessions||[])}catch(e){h(e.message||"Failed to fetch specific IMC data. Please, refresh the page.")}finally{p(!1)}})()}),[]),{workshops:e,paymentMethods:a,registrationTypes:r,sessions:c,loading:m,error:u}};
/***/},
/***/4972:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */D:()=>/* binding */l
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */const l=(e,t=!1,a=0,l=!1)=>{const[r,o]=(0,s.useState)(null),[c,d]=(0,s.useState)(!1),[m,p]=(0,s.useState)(null),u=(0,s.useCallback)((async()=>{if(e){d(!0),p(null);try{const a=t?"get_online_participant":"get_onsite_participant",s=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get(`https://imc2026.imo.net/php/api/${a}.php`,{params:{id:e,admin_notes:l}})));p(null),s.data.success&&s.data.data?o(s.data.data):p(s.data.message||"Participant not found.")}catch(e){p(e.message||"Failed to fetch participant data.")}finally{d(!1)}}}),[e,t,l]);return(0,s.useEffect)((()=>{p(null),u()}),[u,a]),{participant:r,loading:c,error:m,setParticipant:o,refetchParticipant:u}};
/***/},
/***/5846:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Ai:()=>/* binding */d
/* harmony export */,Lu:()=>/* binding */c
/* harmony export */,p6:()=>/* binding */o
/* harmony export */});
// ---- Utilities ----
const n=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,a,n]=e.split("-").map(Number);return new Date(Date.UTC(t,a-1,n))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const a=new Date(e.replace(" ","T"));if(!Number.isNaN(a.getTime()))return a}return new Date(NaN)},i=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,l=(e,{locale:t="en-US",timeZone:a="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:a}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:a}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:a}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:a}).format(e))}),r=e=>{const[t,a,n]=String(e).split("-").map(Number);return new Date(Date.UTC(t,a-1,n))},o=(e,t,{locale:a="en-US",timeZone:s="UTC"}={})=>{const o=r(e),c=r(t);if(!i(o)||!i(c))return"";const d=l(o,{locale:a,timeZone:s}),m=l(c,{locale:a,timeZone:s});if(d.monthName===m.monthName&&o.getUTCFullYear()===c.getUTCFullYear())return`${d.monthName} ${d.day}${n(d.day)} - ${m.day}${n(m.day)}`;
// Different month and/or year
return`${`${d.monthName} ${d.day}${n(d.day)}${o.getUTCFullYear()!==c.getUTCFullYear()?` ${d.year}`:""}`} - ${`${m.monthName} ${m.day}${n(m.day)} ${m.year}`}`},c=(e,t=!0,a=!1,r={})=>((e,t=!1,a=!0,r=!1,{locale:o="en-US",timeZone:c="UTC"}={})=>{const d=s(e);if(!i(d))return"";// safe fallback
const{day:m,monthName:p,weekday:u,year:h}=l(d,{locale:o,timeZone:c});return`${t?`${u}, `:""}${m}${n(m)}${a?` ${p}`:""}${r?` ${h}`:""}`})(e,!0,t,a,r),d=(e,t,a=!0,n=!0,{locale:l="en-US",timeZone:r="UTC"}={})=>{const o=s(e);if(!i(o))return"";const d=(m=o,p=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(p))));var m,p;return c(d,a,n,{locale:l,timeZone:r})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/7647:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */V});// ./src/admin/components/page-contain/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__pageContain--r6_E2",s="index-module__titleWrap--hrdlj",i="index-module__maxW--pHIfi";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=a(6942),r=a.n(l),o=a(8075);// ./src/admin/components/header/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const c="index-module__header--RVFFD",d="index-module__title--gLVc5";
// EXTERNAL MODULE: ./node_modules/react-icons/sl/index.mjs
var m=a(4157);// ./src/admin/components/header/menu/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const p="300px",u="index-module__menuBtn--iHux0",h="index-module__menuCloseBtn--jCTip",x="index-module__menuIcon--i9Mwv",f="index-module__swipeWrap--a2OL4",b="index-module__menuOpenOverlay--caMms",y="index-module__menu--veCcg",j="index-module__active--EYt3Y",N="index-module__footer--O9Npd",g="index-module__menuItem--eqnJw",_="index-module__menuItemTitle--O6gep",w="index-module__active--Hl_ax",v="index-module__caret--U_US2",C="index-module__rotate--pnUGY",k="index-module__menuItemsHolder--aPOed";
// EXTERNAL MODULE: ./node_modules/react/index.js
var S=a(6540),F=a(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/components/header/menu/item/index.js
const P=S.forwardRef((({children:e,className:t,goTo:a=null,isLinkActive:n,title:s,url:i=null},l)=>{const[o,c]=(0,S.useState)(n),[d,m]=(0,S.useState)("0px"),p=(0,S.useRef)(null);(0,S.useEffect)((()=>{e&&m(o?`${p.current.scrollHeight}px`:"0px")}),[e,o,p]);const u=e=>(0,F.jsx)("div",{className:r()(e.className,o&&C),children:(0,F.jsx)("svg",{viewBox:"0 0 320 512",xmlns:"http://www.w3.org/2000/svg",children:(0,F.jsx)("path",{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",fill:e.fill})})});
return(0,F.jsxs)("div",{className:r()(g,"d-flex flex-column",t),ref:l,children:[(0,F.jsxs)("a",{className:r()(_,"d-flex justify-content-between w-100 align-items-center px-3",n&&w),href:i||void 0,onClick:t=>{t.preventDefault(),e?c(!o):a&&i&&a(i)},children:[(0,F.jsx)("span",{className:"d-flex align-items-center",children:(0,F.jsx)("b",{children:s})}),e&&(0,F.jsx)(u,{className:v})]}),e&&(0,F.jsx)("div",{className:k,ref:p,style:e&&{maxHeight:`${d}`},children:e})]})}));
/* harmony default export */
// EXTERNAL MODULE: ./src/store/auth/index.js
var $=a(8983),A=a(1448),T=a(8321),I=a(7767),M=a(4976);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
// ./src/data/admin-menu.js
const D=[{title:"Dashboard",link:"/admin/dashboard"},{title:"Participants",link:"/admin/participants",subLinks:[{title:"On-site",link:"/admin/participants/onsite"},{title:"Online",link:"/admin/participants/online"},{title:"Radio Workshop",link:"/admin/participants/workshops/radio",allowed:["loc"]},{title:"Spectro Workshop",link:"/admin/participants/workshops/spectro",allowed:["loc"]}],allowed:["loc"]},{title:"Contributions",link:"/admin/contributions",subLinks:[{title:"Talks",link:"/admin/contributions/talks",allowed:["loc","soc"]},{title:"Posters",link:"/admin/contributions/posters",allowed:["loc","soc"]}],allowed:["loc","soc"]},{title:"Accommodations",link:"/admin/accomodations",allowed:["loc"]},{title:"Downloads",link:"/admin/downloads",allowed:["loc","soc"]}];
// EXTERNAL MODULE: ./src/utils/event.js
var L=a(1280),E=a(1083);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
// ./src/admin/components/header/menu/index.js
const O=parseInt(p,10)||250,U=({cd:e})=>{const[t,a]=(0,S.useState)(!1),[n,s]=(0,S.useState)(!0),i=(0,A/* useDispatch */.wA)(),l=(0,I/* useLocation */.zy)(),o=(0,I/* useNavigate */.Zp)(),c=(0/* authSelectors */,A/* useSelector */.d4)($.Pg.isAdmin),d=(0/* authSelectors */,A/* useSelector */.d4)($.Pg.isLoc),p=(0/* authSelectors */,A/* useSelector */.d4)($.Pg.isSoc),[g,_]=(0,T.useSpring)((()=>({right:-O,config:{tension:350,friction:30}})));(0,S.useEffect)((()=>(t?(s(!1),_.start({right:0}),document.body.classList.add("overflow-hidden"),document.documentElement.classList.add("overflow-hidden")):(_.start({right:-O,onRest:()=>s(!0)}),document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")),()=>{document.body.classList.remove("overflow-hidden"),document.documentElement.classList.remove("overflow-hidden")})),[t,_]),(0,S.useEffect)((()=>{const e=()=>{a(!1)};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]);const w=()=>{a((e=>!e))},v=e=>{o(e),w()};
return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)("button",{className:u,onClick:w,children:(0/* SlMenu */,F.jsx)(m.RAm,{className:x})}),!n&&(0,F.jsx)("div",{className:r()(b),onClick:w,onMouseDown:L/* onStopPropagation */._v,onTouchStart:L/* onStopPropagation */._v}),(0,F.jsx)(T.animated.div,{className:r()(f),style:g,children:(0,F.jsxs)("div",{className:r()(y,"d-flex flex-column h-100"),children:[(0,F.jsx)("button",{className:h,onClick:w,children:(0/* SlClose */,F.jsx)(m.ipV,{className:x})}),(0,F.jsxs)("div",{className:"mb-3",children:[(0,F.jsxs)("div",{className:"m-3 text-center",children:[(0,F.jsxs)("h4",{className:"fw-bolder m-0",children:["IMC ",e.year]}),(0,F.jsx)("small",{className:"m-0",children:"ADMIN AREA"})]}),D.map((e=>{const t=l.pathname.startsWith(e.link)||e.subLinks&&e.subLinks.some((e=>l.pathname.startsWith(e.link)));return c||d&&e?.allowed?.includes("loc")||p&&e?.allowed?.includes("soc")?// Hide the menu item if not allowed 
e.hideFromMenu?void 0:(0,F.jsx)(P,{className:"py-2",isLinkActive:t,goTo:v,title:e.title,url:e.link,children:e.subLinks&&(0,F.jsx)(F.Fragment,{children:e.subLinks.filter((e=>c||d&&e?.allowed?.includes("loc")||p&&e?.allowed?.includes("soc"))).map((e=>{const t=l.pathname===e.link;
return(0/* Link */,F.jsx)(M.N_,{"aria-label":e.title,onClick:w,to:e.link,className:r()(t&&j),title:e.title,children:e.title},e.link)}))})},e.link):null}))]}),(0,F.jsx)("div",{className:r()(N,"mt-auto"),children:(0,F.jsxs)("div",{className:"d-flex flex-column justify-content-center mb-3 p-3 gap-2 px-4",children:[(0,F.jsx)("button",{"aria-label":"Public site",className:"btn btn-outline-success px-3 fw-bolder",onClick:()=>v("/"),title:"Public site",children:"Public site"}),(0,F.jsx)("button",{"aria-label":"Logout",className:"btn btn-outline-danger px-3 fw-bolder",onClick:async()=>{await E/* default */.A.get("https://imc2026.imo.net/php/auth/logout.php",{withCredentials:!0}),i($/* authActions */.I2.logout()),localStorage.removeItem("session"),o("/")},title:"Logout",children:"Logout"})]})})]})})]})};
// EXTERNAL MODULE: ./src/data/conference-data.js + 1 modules
var R=a(7762);// ./src/admin/components/header/index.js
const W=()=>{const e=`${R/* conferenceData */.p.name} ${R/* conferenceData */.p.year}`,t=(0/* authSelectors */,A/* useSelector */.d4)($.Pg.isLoc),a=(0/* authSelectors */,A/* useSelector */.d4)($.Pg.isSoc),n=t?"/admin/accommodations":a?"/admin/contributions/talks":"/admin/dashboard";
return(0,F.jsxs)("div",{className:"d-flex align-items-center justify-content-between border-bottom",children:[(0,F.jsx)(U,{cd:R/* conferenceData */.p}),(0,F.jsx)("nav",{className:"p-0 flex-wrap","aria-label":"Main navigation",children:(0,F.jsx)("div",{className:r()(c,"d-flex flex-row flew-wrap px-2 mb-1 justify-content-between"),children:(0/* Link */,F.jsxs)(M.N_,{"aria-label":"Admin",className:r()("d-flex align-items-center text-dark text-decoration-none gap-2",d),to:n,title:"Admin",children:[(0,F.jsx)("img",{src:o,alt:e,className:"rounded-circle border border-2 p-1"}),(0,F.jsxs)("div",{className:"d-flex flex-column",children:[(0,F.jsxs)("h1",{className:"m-0 fw-bolder",children:[R/* conferenceData */.p.name," ",R/* conferenceData */.p.year]}),(0,F.jsxs)("h2",{className:"m-0 d-none d-md-block",children:["ADMIN AREA",t&&" - Local Organizing Committee",a&&" - Scientific Organizing Committee"]})]})]})})})]})};
/* harmony default export */
// EXTERNAL MODULE: ./node_modules/react-helmet-async/lib/index.esm.js
var z=a(5902),Z=a(1351);
// EXTERNAL MODULE: ./node_modules/react-icons/io5/index.mjs
// ./src/styles/components/breadcrumb.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const q="breadcrumb-module__nav--atkeN",H=({links:e=[]})=>(0/* authSelectors */,A/* useSelector */.d4)($.Pg.isAdmin)?(0,F.jsx)("nav",{"aria-label":"breadcrumb",className:q,children:(0,F.jsxs)("ol",{className:r()("breadcrumb"),children:[(0,F.jsx)("li",{className:"breadcrumb-item lh-0",children:(0/* Link */,F.jsx)(M.N_,{to:"/admin/dashboard",children:(0/* IoHomeOutline */,F.jsx)(Z.M14,{className:"me-1"})})}),e.map(((t,a)=>(0,F.jsx)("li",{className:r()("breadcrumb-item",{active:a===e.length-1}),"aria-current":a===e.length-1?"page":void 0,children:a===e.length-1?(0,F.jsx)("b",{children:t.name}):(0/* Link */,F.jsx)(M.N_,{to:t.url,children:t.name})},a)))]})}):null,V=({breadcrumb:e=[],title:t="",rightContent:a,children:l,isMaxWidth:o=!0})=>{const c=t?`${t} | ${R/* conferenceData */.p.name_display} ${R/* conferenceData */.p.year}`:`${R/* conferenceData */.p.name_display} ${R/* conferenceData */.p.year}`;
return(0,F.jsxs)(F.Fragment,{children:[(0/* Helmet */,F.jsxs)(z.mg,{children:[(0,F.jsx)("title",{children:c}),(0,F.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,F.jsxs)("div",{className:r()(n,"position-relative"),children:[(0,F.jsx)(W,{}),(0,F.jsxs)("div",{className:"d-flex flex-row",children:[(0,F.jsx)(U,{cd:R/* conferenceData */.p}),(0,F.jsxs)("div",{className:r()("mx-md-4 my-3 h-100 flex-grow-1 d-flex flex-column px-3 px-md-0",{[`${i} mx-md-auto`]:o}),children:[0!==e.length&&(0,F.jsx)(H,{links:e}),(!!t||!!a)&&(0,F.jsxs)("div",{className:r()("d-flex justify-content-between align-items-center",s),children:[t&&(0,F.jsx)("h2",{children:t}),a&&(0,F.jsx)("div",{children:a})]}),l]})]})]})]})}}
/***/,
/***/7762:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{p:()=>/* reexport */n});// ./src/data/conference-data.json
const n=JSON.parse('{"year":2026,"num":"45th","welcome":"Bievenue !","thank_you":"Merci !","name":"IMC","name_display":"International Meteor Conference","dates":{"start":"2026-09-18","end":"2026-09-21"},"location":"Barcelonette, France","hotel":"Séloane","consulat":"French consulate","deadlines":{"reg":"2026-08-09","paper":"2026-10-31","full_reimbursement_before":"2026-05-01","half_reimbursement_before":"2026-07-15","early_birds":"2026-05-01"},"poster_dim":"A0 size (84.1cm x 118.9cm  / 33.1″ x 46.8″)","poster_print":{"desc":"Maximum size A0 (84.1cm x 118.9cm / 33.1″ x 46.8″), uploaded in PDF, deadline for sending September 1.","price":35,"size":"A0 size (84.1cm x 118.9cm / 33.1″ x 46.8″)"},"sessions":["Video meteor work","Radio meteor work","Visual meteor work","Meteor physics and dynamics","Meteor stream analyses and modelling","Meteor related software and hardware","Ongoing meteor work","Miscellaneous"],"costs":{"after_early_birds":30,"admin":"15€","online":20,"rooms":[{"price":250,"description":"Quadruple room in the IMC host","number":68,"type":"quadruple"},{"price":350,"description":"Double room in the IMC host","number":12,"type":"double"},{"price":500,"description":"Single room in the IMC host","number":8,"type":"single"},{"price":200,"description":"No accommodation","type":"no"}],"tshirts":{"models":["men","women"],"sizes":["S","M","L","XL","XXL"],"price":15},"printed_proceedings":20},"co_organizer":[{"abbr":"IMO","name":"International meteor organization","website":"https://imo.net"},{"name":"Vigie-Ciel","website":"https://www.vigie-ciel.org/"}],"workshops":[{"title":"Spectroscopy Workshop","date":"2026-09-18","period":"09:30 to 12:30 CEST","cost":22.5,"description":"including coffee break and lunch","email_to":{"name":"Joe Zender","email":"joe.zender@esa.int"}},{"title":"Radio Workshop","date":"2026-09-17","period":"09:30 to 17:00 CEST","cost":26.5,"cost_online":5,"description":"including coffee break and lunch","email_to":{"name":"Hervé Lamy","email":"herve.lamy@aeronomie.be"}}],"contact":[{"q":"a question about the website or a technical difficulty","email":"vperlerin@gmail.com","name":"V. Perlerin"},{"q":"a question about the conference or accommodation","email":"imc2026@imo.net","name":"IMC 2026 Team"},{"q":"a question about payment or your registration","email":"marc.gyssens@uhasselt.be","name":"IMO Treasurer"},{"q":"a question about any other topic","email":"imc2026@imo.net","name":"IMC 2026 Team"}]}')}// ./src/data/conference-data.js
/***/,
/***/8075:
/***/(e,t,a)=>{e.exports=a.p+"702c5653d2360537e78f.svg";
/***/},
/***/8232:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>n
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const n={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/}}]);