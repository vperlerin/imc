"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[466],{
/***/578:
/***/(e,t,a)=>{
// EXPORTS
a.d(t,{A:()=>/* binding */x});// ./src/admin/components/admin-table/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const n="index-module__cursor--VNUwr";
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var s=a(6942),i=a.n(s),r=a(8027),l=a(6540),c=a(5846),o=a(7762),d=a(4848);// ./src/admin/components/admin-table/index.js
const m=o/* conferenceData */.p?.costs?.rooms??[],p=new Set(m.map((e=>String(e?.type??"").toLowerCase().trim())).filter(Boolean)),u=String(m.find((e=>"no"===String(e?.type??"").toLowerCase().trim()))?.type??"no").toLowerCase(),h=e=>{const t=String(e??"").toLowerCase().trim();return p.has(t)?t:u},x=({participants:e,withActions:t=!0,customActions:a=null,onDelete:s=null,onCanBePublicChange:o=null,canBePublicSavingId:m=null,isOnsite:p=!1})=>{const[u,x]=(0,l.useState)(null),[f,y]=(0,l.useState)("asc"),b=e=>{u===e?y("asc"===f?"desc":"asc"):(x(e),y("asc"))},j=[...e].sort(((e,t)=>{if(!u)return 0;let a=e[u],n=t[u];
// Handle due amount separately
if(
// Handle numeric fields
["total_due","total_paid","paypal_fee"].includes(u)&&(a=parseFloat(a)||0,n=parseFloat(n)||0),"due_amount"===u){const s=e=>{const t=parseFloat(e.total_due)||0,a=parseFloat(e.total_paid)||0,n=parseFloat(e.paypal_fee||0);return"paypal"===e.payment_method_name?.toLowerCase()?t+n-a:t-a};a=s(e),n=s(t)}
// Handle dates
return["created_at","confirmation_date"].includes(u)&&(a=a?new Date(a).getTime():0,n=n?new Date(n).getTime():0),
// Handle payment_method_name case-insensitively and default to empty string if missing
"payment_method"===u&&(a=e.payment_method_name?e.payment_method_name.toLowerCase():"",n=t.payment_method_name?t.payment_method_name.toLowerCase():""),"accommodation_type"===u&&(a=h(e.accommodation_type),n=h(t.accommodation_type)),
// Handle confirmation_sent as boolean-like sorting
"confirmation_sent"===u&&(a="1"===a?1:0,n="1"===n?1:0),"can_be_public"===u&&(a="1"===a||1===a?1:0,n="1"===n||1===n?1:0),a<n?"asc"===f?-1:1:a>n?"asc"===f?1:-1:0})),N=9+(o?1:0)+(p?1:0)+(t||a?1:0);
return(0,d.jsx)("div",{className:"table-responsive",style:{maxWidth:"calc(100vw - 2rem)"},children:(0,d.jsxs)("table",{className:"table table-striped",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{className:n,onClick:()=>b("id"),children:"#"}),(0,d.jsx)("th",{className:n,onClick:()=>b("created_at"),children:"Reg. Date"}),(0,d.jsx)("th",{className:n,onClick:()=>b("last_name"),children:"Name"}),o&&(0,d.jsx)("th",{className:n,title:"Show name on /community/participants",onClick:()=>b("can_be_public"),children:"Public list"}),(0,d.jsx)("th",{className:n,onClick:()=>b("total_due"),children:"Total"}),(0,d.jsx)("th",{className:n,onClick:()=>b("total_paid"),children:"Paid"}),(0,d.jsx)("th",{className:n,onClick:()=>b("due_amount"),children:"Due"}),(0,d.jsx)("th",{className:n,onClick:()=>b("payment_method"),children:"Method"}),p&&(0,d.jsx)("th",{className:n,title:"Accommodation",onClick:()=>b("accommodation_type"),children:"Acc."}),(0,d.jsx)("th",{className:n,onClick:()=>b("confirmation_sent"),children:"Confirmed"}),(0,d.jsx)("th",{className:n,onClick:()=>b("confirmation_date"),children:"Conf. Email"}),(t||a)&&(0,d.jsx)("th",{})]})}),(0,d.jsx)("tbody",{children:j.length>0?j.map((e=>{const n=parseFloat(e.total_due)||0,l=parseFloat(e.total_paid)||0,u=parseFloat(e.paypal_fee||0),x="paypal"===e.payment_method_name?.toLowerCase(),f=x?n+u-l:n-l;
return(0,d.jsxs)("tr",{className:"cancelled"===e.status?"text-warning ":"",children:[(0,d.jsx)("td",{children:e.id}),(0,d.jsx)("td",{className:"text-nowrap",children:e.created_at.split(" ")[0]}),(0,d.jsxs)("td",{children:[e.title," ",e.first_name," ",e.last_name]}),o&&(0,d.jsx)("td",{children:(0,d.jsx)("input",{type:"checkbox",className:"form-check-input",title:"Show name on public participants page",checked:"1"===e.can_be_public||1===e.can_be_public,disabled:m===e.id,onChange:t=>o(e,t.target.checked)})}),(0,d.jsxs)("td",{children:[x?(n+u).toFixed(2):n.toFixed(2),"€"]}),(0,d.jsxs)("td",{children:[l.toFixed(2),"€"]}),(0,d.jsxs)("td",{className:i()({"text-success":0===f,"text-danger":f<0}),children:[f.toFixed(2),"€"]}),(0,d.jsx)("td",{children:e.payment_method_name||"n/a"}),p&&(0,d.jsx)("td",{children:h(e.accommodation_type)}),(0,d.jsx)("td",{children:"1"===e.confirmation_sent?"✅":"❌"}),(0,d.jsx)("td",{className:i()("cancelled"===e.status?"text-warning":e?.confirmation_date&&"text-success"),children:"cancelled"===e.status?"CANCELLED":e.confirmation_date?(0,c/* formatFullDate */.Lu)(e.confirmation_date):"❌"}),t&&s&&(0,d.jsx)("td",{children:(0,d.jsxs)("div",{className:"d-flex gap-2 justify-content-end",children:["cancelled"===e.status?(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Reimbursements"}):(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/payment/${e.id}`,className:"btn btn-sm btn-outline-success fw-bolder",children:"Payments"}),(0,d.jsx)("a",{href:`/admin/participants/${e.is_online?"online":"onsite"}/edit/${e.id}`,className:"btn btn-sm btn-outline-primary fw-bolder",children:"Edit"}),(0,d.jsx)("button",{className:"btn btn-sm btn-outline-danger d-inline-flex align-items-center",onClick:()=>(e=>{s?.(e)})(e),title:"Delete Payment",children:(0/* FaRegTrashAlt */,d.jsx)(r.H8h,{})})]})}),a&&"cancelled"!==e.status&&(0,d.jsx)(d.Fragment,{children:a})]},e.id)})):(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:N,className:"text-center",children:"No participants found."})})})]})})}}
/***/,
/***/914:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Z:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=a(1083);const s="MISSING_ENV_VAR".REACT_APP_MAILER_API_URL||"/php/api/send_email.php",i=async({subject:e,message:t,to:a,toName:i,fromName:r,replyTo:l,replyName:c,bcc:o=[],token:d=null})=>{try{return"success"===(await n/* ["default"] */.A.post(s,{subject:e,message:t,to:a,to_name:i,from_name:r,reply_to:l,reply_name:c,bcc:o,token:d},{headers:{"Content-Type":"application/json"},withCredentials:!0})).data.status?{success:!0,message:"Email sent successfully."}:{success:!1,message:"Failed to send email."}}catch(e){return{success:!1,message:"An error occurred while sending the email."}}}}
/***/,
/***/2337:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>c
/* harmony export */});
/* harmony import */a(6540);
/* harmony import */var n=a(8153),s=a(4355),i=a(4848);const r=e=>Math.round(100*(e+(.034*e+.35)/.966))/100,l=(e,t=0)=>{const a=Number(e);return Number.isFinite(a)?a:t},c=({isOnline:e,conferenceData:t,participantData:a,registrationTypes:c})=>{if(!a||!a.participant)
return(0,i.jsx)("div",{className:"alert alert-danger",children:"No participant data available."});const{participant:o,accommodation:d,workshops:m,extra_options:p,contributions:u=[]}=a;
// Registration & Accommodation Cost
let h=0,x="";if(!e){const e=((e,t)=>{const a=l(e,null),n=(t||[]).find((e=>l(e.id)===a));if(!n)return{description:"",price:0,type:""};const s=String(n.type||"").toLowerCase();return{description:"no"===s?"(no accommodation)":`+ ${n.description}`,price:l(n.price,0),type:s}})(d?.registration_type_id,c);x=e.description;const a=(0,s/* .isParticipantEarlyBird */.O)(o?.is_early_bird)?0:l(t?.costs?.after_early_birds,0);h=e.price+a}
// Selected Workshops
const{selected:f,totalPrice:y}=((e=[],t)=>{if(!Array.isArray(e))return{selected:[],totalPrice:0};const a=e.map((e=>({title:e.title,price:l(t?e.price_online:e.price,0)}))),n=a.reduce(((e,t)=>e+t.price),0);return{selected:a,totalPrice:n}})(m,e),b="1"===p?.buy_tshirt||"true"===p?.buy_tshirt?l(t?.costs?.tshirts?.price,0):0,j=(0,n/* .offersOnsitePosterPrint */.a)(t),N=(u||[]).filter((e=>"1"===e.print||"true"===e.print)),g=j?N.length:0,_=g*l(t?.poster_print?.price,0),w="paypal"===String(o?.payment_method_name||"Unknown").toLowerCase();
// T-shirt Cost
// Total Calculation
let C=h+y+b+_;const S=w?r(C)-C:0;C+=S;
// Online Conference Cost Calculation
const v=l(t?.costs?.online,0);let F=y+v;const $=w?r(F)-F:0;return F+=$,(0,i.jsxs)("div",{className:"p-2 border rounded flex-shrink-0",children:[(0,i.jsx)("h4",{className:"mb-3",children:"Invoice Summary"}),(0,i.jsxs)("table",{className:"table table-striped table-hover",children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"col",children:"Description"}),(0,i.jsx)("th",{scope:"col",className:"text-end",children:"Price"})]})}),(0,i.jsxs)("tbody",{children:[e?(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"ps-3 text-muted",children:"Online Conference Registration"}),(0,i.jsxs)("td",{className:"text-end",children:[v.toFixed(2),"€"]})]}):(0,i.jsxs)("tr",{children:[(0,i.jsxs)("td",{className:"ps-3 text-muted",children:["Conference Registration ",x]}),(0,i.jsxs)("td",{className:"text-end",children:[h.toFixed(2),"€"]})]}),f.map(((e,t)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"ps-3 text-muted",children:e.title}),(0,i.jsxs)("td",{className:"text-end",children:[e.price.toFixed(2),"€"]})]},t))),j&&g>0&&(0,i.jsxs)("tr",{children:[(0,i.jsxs)("td",{className:"ps-3 text-muted",children:["Printed Poster",g>1?"s":""," x ",g]}),(0,i.jsxs)("td",{className:"text-end",children:[_.toFixed(2),"€"]})]}),b>0&&p?.tshirt_size&&(0,i.jsxs)("tr",{children:[(0,i.jsxs)("td",{className:"ps-3 text-muted",children:["T-Shirt (",p.tshirt_size,")"]}),(0,i.jsxs)("td",{className:"text-end",children:[b.toFixed(2),"€"]})]}),w&&(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"ps-3 text-muted",children:"PayPal Fee (3.4% + 0.35€)"}),(0,i.jsxs)("td",{className:"text-end",children:[e?$.toFixed(2):S.toFixed(2),"€"]})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("strong",{children:"TOTAL"})}),(0,i.jsx)("td",{className:"text-end",children:(0,i.jsxs)("strong",{children:[(e?F:C).toFixed(2),"€"]})})]})]})]})]})}}
/***/,
/***/2810:
/***/(e,t,a)=>{
// ESM COMPAT FLAG
a.r(t),
// EXPORTS
a.d(t,{default:()=>/* binding */C});
// EXTERNAL MODULE: ./node_modules/react-icons/io/index.mjs
var n=a(6512),s=a(8027),i=a(578);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.mjs
// ./src/admin/pages/participants/payment/index.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */const r={col:"index-module__col--xCPfA",textInput:"index-module__textInput--bmdEf"};
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var l=a(6942),c=a.n(l),o=a(7647),d=a(6540),m=a(6645),p=a(8232),u=a(2337),h=a(7767),x=a(7762),f=a(9785),y=a(1083),b=a(3318);// ./src/admin/api/payments/index.js
const j=e=>{const[t,a]=(0,d.useState)([]),[n,s]=(0,d.useState)(!1),[i,r]=(0,d.useState)(null),l=(0,d.useCallback)((async()=>{if(e){s(!0),r(null);try{const t=await(0,b/* retry */.L)((()=>y/* default */.A.get(`https://imc2026.imo.net/php/admin/api/get_payments.php?id=${e}`)));t.data.success?a(t.data.data||[]):r(t.data.message||"Error fetching payments.")}catch(e){r(e.message||"Error fetching payments.")}finally{s(!1)}}}),[e]);
// Fetch payments on mount
// Fetch payments on mount
return(0,d.useEffect)((()=>{l()}),[l]),{payments:t,loading:n,error:i,refetchPayments:l}};
// EXTERNAL MODULE: ./src/api/specific-data/index.js
var N=a(4493),g=a(4972);
// EXTERNAL MODULE: ./src/api/participants/index.js
// EXTERNAL MODULE: ./src/hooks/send-email.js
var _=a(914),w=a(4848);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
// ./src/admin/pages/participants/payment/index.js
const C=({isCurOnline:e=!1})=>{const{participantId:t}=(0,h/* useParams */.g)(),[a,l]=(0,d.useState)(!1),[C,S]=(0,d.useState)(""),[v,F]=(0,d.useState)(null),[$,P]=(0,d.useState)(null),[k,A]=(0,d.useState)(null),[T,D]=(0,d.useState)(null),[I,M]=(0,d.useState)(null),[E,L]=(0,d.useState)(!1),[O,U]=(0,d.useState)(!1),[R,Z]=(0,d.useState)(!1),[B,W]=(0,d.useState)(""),[V,Y]=(0,d.useState)(!1),{workshops:q,paymentMethods:H,registrationTypes:z,loading:G,sessions:Q,error:J}=(0,N/* useApiSpecificData */.Q)(),{participant:K,loading:X,error:ee}=(0,g/* useApiParticipant */.D)(t,e,E),{payments:te,loading:ae,error:ne,refetchPayments:se}=j(t),{addPayment:ie}=(e=>{const[t,a]=(0,d.useState)(!1),[n,s]=(0,d.useState)(null),{refetchPayments:i}=j(e);return{addPayment:(0,d.useCallback)((async t=>{if(e){a(!0),s(null);try{const e=await(0,b/* retry */.L)((()=>y/* default */.A.post("https://imc2026.imo.net/php/admin/api/add_payment.php",{paymentData:t},{headers:{"Content-Type":"application/json"}})));if(e.data.success)return await i(),{success:!0,message:"Payment added successfully!"};throw new Error(e.data.message||"Failed to add payment.")}catch(e){return s(e.message||"Error adding payment."),{success:!1,message:e.message}}finally{a(!1)}}}),[e,i]),loading:t,error:n}})(t),{deletePayment:re,loading:le,error:ce}=(e=>{const[t,a]=(0,d.useState)(!1),[n,s]=(0,d.useState)(null),{refetchPayments:i}=j(e);return{deletePayment:(0,d.useCallback)((async t=>{if(e&&t){a(!0),s(null);try{const e=await(0,b/* retry */.L)((()=>y/* default */.A.delete("https://imc2026.imo.net/php/admin/api/delete_payment.php",{data:{payment_id:t},headers:{"Content-Type":"application/json"}})));if(e.data.success)return await i(),{success:!0,message:"Payment deleted successfully!"};throw new Error(e.data.message||"Failed to delete payment.")}catch(e){return s(e.message||"Error deleting payment."),{success:!1,message:e.message}}finally{a(!1)}}}),[e,i]),loading:t,error:n}})(t),{confirmParticipant:oe,isConfirming:de,errorConfirm:me}=(()=>{const[e,t]=(0,d.useState)(null),[a,n]=(0,d.useState)(!1);return{confirmParticipant:async(e,a)=>{if(!e)return null;n(!0),t(null);try{return(await y/* default */.A.post("https://imc2026.imo.net/php/admin/api/confirm.php",{id:e,...a})).data}catch(e){const a=e.response?.data?.message||"An unexpected error occurred.";return t(a),{success:!1,message:a}}finally{n(!1)}},errorConfirm:e,isConfirming:a}})(),{formState:{errors:pe},register:ue,handleSubmit:he,isSubmitting:xe,setValue:fe,watch:ye,reset:be}=(0,f/* useForm */.mN)({defaultValues:{amount:"",paymentMethodId:"",paymentDate:(new Date).toISOString().split("T")[0],adminNote:""}}),je=G||X||xe||ae,Ne=ee||J||ne||v;
// Default Payment Method
// Default Payment Method
(0,d.useEffect)((()=>{K&&K.participant&&fe("paymentMethodId",K.participant.payment_method_id||"")}),[K,fe]),
// Default Amount
// Default Amount
(0,d.useEffect)((()=>{if(K?.participant){const e=parseFloat(K.participant.total_due||0),t=parseFloat(K.participant.paypal_fee||0),a=parseFloat(K.participant.total_paid||0),n=K.participant.payment_method_name?e+t-a:e-a;fe("amount",n.toFixed(2))}}),[K,fe]);
// Refecht Participant
// Refecht Participant
(0,d.useEffect)((()=>{L((e=>!e))}),[te]);
// Confirm
const ge=()=>{D(null),F(null);const e=(()=>{if(!K?.participant)return 0;const e=parseFloat(K.participant.total_due||0),t=parseFloat(K.participant.paypal_fee||0),a=parseFloat(K.participant.total_paid||0);return K.participant.payment_method_name?e+t-a:e-a})();if(e>0){let t=`Marc, you are about to confirm ${`${K?.participant?.first_name} ${K?.participant?.last_name}`} <strong>${we?"ONLINE":"ONSITE"}</strong> registration.`;t+=` <div class="text-danger fw-bolder border rounded-2 p-2 m-3 border-danger">${K?.participant?.first_name} still needs to pay ${e.toFixed(2)}€</div>`,t+="<p>Are you sure you want to continue?</p>",W(t),U(!0)}else Z(!0)},_e=()=>{be({amount:"",paymentMethodId:"",paymentDate:(new Date).toISOString().split("T")[0],adminNote:""}),M(null)},we="1"===K?.participant?.is_online,Ce=[{url:"/admin/participants/"+(we?"online":"onsite"),name:we?"Online Participants":"On-site Participants"},{url:`/admin/participants/${we?"online":"onsite"}/payment/${t}`,name:`${K?.participant?.first_name||"Participant"} ${K?.participant?.last_name||""}'s Payments`}],Se=`\n    Dear ${K?.participant?.first_name} ${K?.participant?.last_name},<br><br>\n    Your participation in the IMC ${x/* conferenceData */.p.year} has now been confirmed.<br><br>\n    Should your plans change, please contact us immediately: https://imc${x/* conferenceData */.p.year}.imo.net/contact<br> \n    Notice that in such a case, the cancellation policy of the Disclaimer and Service Agreement applies: https://imc${x/* conferenceData */.p.year}.imo.net/disclaimer<br><br>\n    ${C}\n    Thank you!<br>\n    We look forward to meeting you at ${x/* conferenceData */.p.location}.<br><br>\n    The IMC ${x/* conferenceData */.p.year} Team.\n  `,ve=async()=>{if(a){Y(!0);try{if(!(await(0,_/* sendEmail */.Z)({subject:`IMC ${x/* conferenceData */.p.year} Confirmation`,message:Se,to:K.participant.email,toName:"IMC Confirmed Participant",fromName:`IMC ${x/* conferenceData */.p.year}`,replyTo:`no-reply@${x/* conferenceData */.p.year}.imo.net`,replyName:"no-reply",bcc:"vperlerin@gmail.com".split(",").map((e=>({email:e,name:"BCC Recipient"})))})).success)return void P("Impossible to send the an email for the moment. Please, try again later");await oe(t,{confirmation_sent:!0,confirmation_date:!0}),U(!1),Z(!1),
// Refecht participant
L((e=>!e))}catch(e){P("Failed to confirm the participant. Pleaase, try again later.")}finally{Y(!1)}}else l(!0)},Fe="0"!==K?.participant.confirmation_sent&&0!==K?.participant.confirmation_sent,$e=!!K?.participant.confirmation_date,Pe=(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("td",{children:[!Fe&&!$e&&(0,w.jsx)("div",{className:"d-flex gap-2 justify-content-end",children:(0,w.jsx)("button",{className:"btn btn-sm btn-outline-success fw-bolder",onClick:ge,children:"CONFIRM"})}),Fe&&!$e&&(0,w.jsx)("div",{className:"d-flex gap-2 justify-content-end",children:(0,w.jsxs)("button",{className:"btn btn-sm btn-outline-success fw-bolder",onClick:ge,children:["SEND ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]})})]})});
// Reset form fields 
return(0/* default */,w.jsxs)(o.A,{breadcrumb:Ce,isMaxWidth:!0,children:[je&&(0/* default */,w.jsx)(m.A,{}),Ne&&(0,w.jsx)("div",{className:"alert alert-danger fw-bolder",children:Ne}),T&&(0,w.jsx)("div",{className:"alert alert-success fw-bolder",children:T}),!je&&(0,w.jsxs)(w.Fragment,{children:[!X&&(0/* default */,w.jsx)(i.A,{participants:[K?.participant],customActions:Pe}),(0,w.jsxs)("div",{className:"d-flex flex-column flex-md-row gap-3 align-items-strecht",children:[(0,w.jsxs)("div",{className:"border p-3 rounded-2 flex-grow-1",children:[(0,w.jsx)("h4",{className:"mb-3",children:I?"Edit":"Add a New Payment/Reimbursement"}),(0,w.jsxs)("form",{onSubmit:he((async e=>{D(null),F(null);const a={participant_id:t,amount:parseFloat(e.amount),payment_method_id:e.paymentMethodId,payment_date:e.paymentDate,admin_note:e.adminNote||null},n=await ie(a);n.success?(D("Payment added successfully!"),_e(),await se()):F(n.message)})),children:[(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Amount (€)"}),(0,w.jsxs)("div",{className:"col-sm-5",children:[(0,w.jsx)("input",{type:"number",className:c()("form-control",p/* default */.A.md50),...ue("amount",{required:!0}),step:"0.01"}),pe.amount&&(0,w.jsx)("span",{className:"text-danger",children:"Amount is required."})]})]}),(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Payment Method"}),(0,w.jsxs)("div",{className:"col-sm-6",children:[(0,w.jsxs)("select",{className:"form-select",...ue("paymentMethodId",{required:!0}),children:[(0,w.jsx)("option",{value:"",children:"Select a payment/Reimbursement method"}),H.map((e=>(0,w.jsx)("option",{value:e.id,children:e.method},e.id)))]}),pe.paymentMethodId&&(0,w.jsx)("span",{className:"text-danger",children:"Payment method is required."})]})]}),(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Payment Date"}),(0,w.jsx)("div",{className:"col-sm-6",children:(0,w.jsx)("input",{type:"date",className:"form-control",...ue("paymentDate",{required:!0})})})]}),(0,w.jsxs)("div",{className:"mb-3 row",children:[(0,w.jsx)("label",{className:"col-sm-3 col-form-label fw-bold",children:"Admin Note (Optional)"}),(0,w.jsx)("div",{className:"col-sm-9",children:(0,w.jsx)("textarea",{className:"form-control",...ue("adminNote"),rows:"2"})})]}),(0,w.jsx)("div",{className:"text-end",children:(0,w.jsx)("button",{type:"submit",className:"btn btn-outline-primary fw-bolder",disabled:xe,children:xe?"Processing...":I?"Update Payment":"Add Payment"})})]})]}),(0/* default */,w.jsx)(u.A,{isOnline:we,conferenceData:x/* conferenceData */.p,participantData:K,workshops:q,registrationTypes:z,paymentMethods:H})]}),te&&te.length>0&&!(1===te.length&&0===parseFloat(te[0].amount))&&(0,w.jsxs)("div",{className:"border p-3 rounded-2 mt-3",children:[(0,w.jsx)("h4",{className:"mb-3",children:"Payments in record"}),(k||ce)&&(0,w.jsx)("div",{className:"alert alert-danger fw-bolder",children:k||ce}),(0,w.jsxs)("table",{className:"table table-bordered table-striped",children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)("th",{children:"Date"}),(0,w.jsx)("th",{children:"Amount (€)"}),(0,w.jsx)("th",{children:"Method"}),(0,w.jsx)("th",{children:"Admin Note"}),(0,w.jsx)("th",{})]})}),(0,w.jsx)("tbody",{children:te.map((e=>0!==parseFloat(e.amount)?(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{children:e.payment_date.split(" ")[0]||"n/a"}),(0,w.jsx)("td",{children:parseFloat(e.amount).toFixed(2)}),(0,w.jsx)("td",{children:e.payment_method}),(0,w.jsx)("td",{children:e.admin_note||"No note"}),(0,w.jsx)("td",{children:(0,w.jsx)("div",{className:"position-relative",children:(0,w.jsxs)("button",{className:"btn btn-outline-danger d-inline-flex align-items-center",onClick:()=>(async e=>{if(!window.confirm("Are you sure you want to delete this payment?"))return;const t=await re(e);t.success?(D("Payment deleted successfully!"),
// Refecht participant
L((e=>!e)),await se()):A(t.message)})(e.id),children:[le&&(0/* default */,w.jsx)(m.A,{}),(0/* FaRegTrashAlt */,w.jsx)(s.H8h,{})]})})})]},e.id):null))})]})]}),(O||R)&&(0,w.jsx)("div",{className:"modal-backdrop fade show"}),O&&(0,w.jsx)("div",{className:"modal modal-lg show d-block",children:(0,w.jsx)("div",{className:"modal-dialog",children:(0,w.jsxs)("div",{className:"modal-content",children:[(0,w.jsxs)("div",{className:"modal-header",children:[(0,w.jsx)("h5",{className:"modal-title",children:"CONFIRMATION"}),(0,w.jsx)("button",{type:"button",className:"btn-close",onClick:()=>U(!1)})]}),(0,w.jsx)("div",{className:"modal-body",children:(0,w.jsx)("div",{dangerouslySetInnerHTML:{__html:B}})}),(0,w.jsxs)("div",{className:"modal-footer",children:[(0,w.jsx)("button",{className:"btn btn-outline-danger fw-bolder",onClick:()=>U(!1),children:"Cancel"}),(0,w.jsx)("button",{className:"btn btn-outline-success fw-bolder",onClick:()=>{U(!1),Z(!0)},children:"Yes"})]})]})})}),R&&(0,w.jsx)("div",{className:"modal modal-lg show d-block",children:(0,w.jsx)("div",{className:"modal-dialog",children:(0,w.jsxs)("div",{className:"modal-content",children:[(0,w.jsxs)("div",{className:"modal-header",children:[(0,w.jsx)("h5",{className:"modal-title",children:"CONFIRMATION"}),(0,w.jsx)("button",{type:"button",className:"btn-close",onClick:()=>Z(!1)})]}),(0,w.jsxs)("div",{className:"modal-body",children:[me&&(0,w.jsx)("div",{className:"text-danger fw-bolder",children:me}),$&&!me&&(0,w.jsx)("div",{className:"text-danger fw-bolder",children:$}),de||V&&(0/* default */,w.jsx)(m.A,{}),!a&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("p",{className:"fw-bolder",children:"Marc, make your choice: "}),(0,w.jsxs)("div",{className:"d-flex w-100 gap-3 mt-3",children:[!Fe&&!$e&&(0,w.jsxs)("button",{className:"fw-bolder btn btn-outline-success",onClick:ve,disabled:de,children:["CONFIRM & SEND ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]}),Fe&&!$e||!Fe&&!$e&&(0,w.jsx)("button",{className:"fw-bolder btn btn-outline-success",onClick:async()=>{Y(!0);try{await oe(t,{confirmation_sent:!0}),U(!1),Z(!1),
// Refecht participant
L((e=>!e))}catch(e){P("Failed to confirm the participant. Pleaase, try again later.")}finally{Y(!1)}},disabled:de,children:"CONFIRM"}),Fe&&!$e&&(0,w.jsxs)("button",{className:"fw-bolder btn btn-outline-success",onClick:async()=>{if(a){Y(!0);try{if(!(await(0,_/* sendEmail */.Z)({subject:`IMC ${x/* conferenceData */.p.year} Confirmation`,message:Se,to:K.participant.email,toName:"IMC Confirmed Participant",fromName:`IMC ${x/* conferenceData */.p.year}`,replyTo:`no-reply@${x/* conferenceData */.p.year}.imo.net`,replyName:"no-reply",bcc:"vperlerin@gmail.com".split(",").map((e=>({email:e,name:"BCC Recipient"})))})).success)return void P("Impossible to send the an email for the moment. Please, try again later");await oe(t,{confirmation_date:!0}),U(!1),Z(!1),
// Refecht participant
L((e=>!e))}catch(e){P("Failed to confirm the participant. Pleaase, try again later.")}finally{Y(!1)}}else l(!0)},disabled:de,children:["SEND ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]}),me&&(0,w.jsx)("div",{className:"text-danger",children:me})]})]}),a&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("div",{children:(0,w.jsxs)("div",{className:"my-3 d-flex flex-column flex-md-row gap-3 align-items-strecht",children:[(0,w.jsxs)("div",{className:r.col,children:["Below is the email that is going to be sent:",(0,w.jsx)("div",{className:"bg-white text-black p-3 rounded mt-2",dangerouslySetInnerHTML:{__html:Se}})]}),(0,w.jsxs)("div",{className:r.col,children:["Use the input below if you want to add text",(0,w.jsx)("textarea",{className:`form-control mt-2 ${r.textarea}`,rows:"3",value:C.replace(/<br>$/,"").replace(/<br>/g,"\n"),onChange:e=>S(e.target.value.replace(/\n/g,"<br>")+"<br>"),placeholder:"Add extra message here..."})]})]})}),(0,w.jsxs)("div",{className:"d-flex gap-3 justify-content-end",children:[(0,w.jsx)("button",{className:"btn btn-outline-neutral fw-bolder",onClick:()=>l(!1),children:"Cancel"}),(0,w.jsxs)("button",{className:"btn btn-outline-success fw-bolder",onClick:ve,disabled:de,children:["SEND NOW ",(0/* IoIosMail */,w.jsx)(n.lSi,{})]})]})]})]})]})})})]})]})};
/* harmony default export */}
/***/,
/***/3318:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */L:()=>/* binding */n
/* harmony export */});const n=(e,{interval:t=1e3,retries:a=6}={})=>new Promise(((s,i)=>{e().then(s).catch((r=>{setTimeout((()=>{a?n(e,{interval:1.5*t,retries:a-1}).then(s,i):i(r)}),t)}))}));
/***/},
/***/4355:
/***/(e,t,a)=>{
/**
 * Interpret stored is_early_bird from API/DB (0/1, "0"/"1", booleans, common string forms).
 * Matches PHP FILTER_VALIDATE_BOOLEAN-style truthiness used when saving participants.
 *
 * @param {unknown} value Raw field from participant row or form
 * @returns {boolean} true = registered during early-bird window (no late booking surcharge on room rate)
 */
function n(e){if(!1===e||0===e)return!1;if(!0===e||1===e)return!0;if(null==e)return!0;// legacy / missing: do not surcharge (see doc_receipt.php)
const t=String(e).trim().toLowerCase();if("0"===t||"false"===t||"no"===t||"off"===t||""===t)return!1;if("1"===t||"true"===t||"yes"===t||"on"===t)return!0;const a=Number(e);return!Number.isFinite(a)||0!==a}
/***/
/* harmony export */a.d(t,{
/* harmony export */O:()=>/* binding */n
/* harmony export */})},
/***/4493:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Q:()=>/* binding */l
/* harmony export */,l:()=>/* binding */r
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */
// api/specific-data/index.js
const r=async()=>{const e=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get("https://imc2026.imo.net/php/get_specific_data.php")));if(!e?.data?.success)throw new Error(e?.data?.message||"Failed to fetch specific IMC data. Please, refresh the page.");return e.data.data||{}},l=()=>{const[e,t]=(0,s.useState)([]),[a,n]=(0,s.useState)([]),[i,l]=(0,s.useState)([]),[c,o]=(0,s.useState)([]),[d,m]=(0,s.useState)(!0),[p,u]=(0,s.useState)(null),h=(0,s.useCallback)((async()=>{m(!0),u(null);try{const e=await r();t(e.workshops||[]),n(e.payment_methods||[]),l(e.registration_types||[]),o(e.sessions||[])}catch(e){u(e.message||"Failed to fetch specific IMC data. Please, refresh the page.")}finally{m(!1)}}),[]);return(0,s.useEffect)((()=>{h()}),[h]),{error:p,loading:d,paymentMethods:a,refetchSpecificData:h,registrationTypes:i,sessions:c,workshops:e}}}
/***/,
/***/4972:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */D:()=>/* binding */r
/* harmony export */});
/* harmony import */var n=a(3318),s=a(6540),i=a(1083);
/* harmony import */const r=(e,t=!1,a=0,r=!1)=>{const[l,c]=(0,s.useState)(null),[o,d]=(0,s.useState)(!1),[m,p]=(0,s.useState)(null),u=(0,s.useCallback)((async()=>{if(e){d(!0),p(null);try{const a=t?"get_online_participant":"get_onsite_participant",s=await(0,n/* .retry */.L)((()=>i/* ["default"] */.A.get(`https://imc2026.imo.net/php/api/${a}.php`,{params:{id:e,admin_notes:r}})));p(null),s.data.success&&s.data.data?c(s.data.data):p(s.data.message||"Participant not found.")}catch(e){p(e.message||"Failed to fetch participant data.")}finally{d(!1)}}}),[e,t,r]);return(0,s.useEffect)((()=>{p(null),u()}),[u,a]),{participant:l,loading:o,error:m,setParticipant:c,refetchParticipant:u}};
/***/},
/***/5846:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */Ai:()=>/* binding */d
/* harmony export */,Lu:()=>/* binding */o
/* harmony export */,p6:()=>/* binding */c
/* harmony export */});
// ---- Utilities ----
const n=e=>{const t=Number(e);if(!Number.isFinite(t))return"";if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},s=e=>{if(e instanceof Date)return new Date(e.getTime());if("number"==typeof e)return new Date(e);if("string"==typeof e){
// Pure date: force UTC to avoid TZ drift across platforms
if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[t,a,n]=e.split("-").map(Number);return new Date(Date.UTC(t,a-1,n))}
// Try native; if there's a space, try replacing with 'T'
const t=new Date(e);if(!Number.isNaN(t.getTime()))return t;const a=new Date(e.replace(" ","T"));if(!Number.isNaN(a.getTime()))return a}return new Date(NaN)},i=e=>e instanceof Date&&!Number.isNaN(e.getTime())
// Get parts safely, defaulting to UTC for consistency with pure dates
,r=(e,{locale:t="en-US",timeZone:a="UTC"}={})=>({day:Number(new Intl.DateTimeFormat(t,{day:"numeric",timeZone:a}).format(e)),monthName:new Intl.DateTimeFormat(t,{month:"long",timeZone:a}).format(e),weekday:new Intl.DateTimeFormat(t,{weekday:"long",timeZone:a}).format(e),year:Number(new Intl.DateTimeFormat(t,{year:"numeric",timeZone:a}).format(e))}),l=e=>{const[t,a,n]=String(e).split("-").map(Number);return new Date(Date.UTC(t,a-1,n))},c=(e,t,{locale:a="en-US",timeZone:s="UTC"}={})=>{const c=l(e),o=l(t);if(!i(c)||!i(o))return"";const d=r(c,{locale:a,timeZone:s}),m=r(o,{locale:a,timeZone:s});if(d.monthName===m.monthName&&c.getUTCFullYear()===o.getUTCFullYear())return`${d.monthName} ${d.day}${n(d.day)} - ${m.day}${n(m.day)}`;
// Different month and/or year
return`${`${d.monthName} ${d.day}${n(d.day)}${c.getUTCFullYear()!==o.getUTCFullYear()?` ${d.year}`:""}`} - ${`${m.monthName} ${m.day}${n(m.day)} ${m.year}`}`},o=(e,t=!0,a=!1,l={})=>((e,t=!1,a=!0,l=!1,{locale:c="en-US",timeZone:o="UTC"}={})=>{const d=s(e);if(!i(d))return"";// safe fallback
const{day:m,monthName:p,weekday:u,year:h}=r(d,{locale:c,timeZone:o});return`${t?`${u}, `:""}${m}${n(m)}${a?` ${p}`:""}${l?` ${h}`:""}`})(e,!0,t,a,l),d=(e,t,a=!0,n=!0,{locale:r="en-US",timeZone:l="UTC"}={})=>{const c=s(e);if(!i(c))return"";const d=(m=c,p=t,new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()+Number(p))));var m,p;return o(d,a,n,{locale:r,timeZone:l})};
// Robust date parser (handles Date | number | string)
}
/***/,
/***/8153:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */a:()=>/* binding */n
/* harmony export */});
/**
 * On-site poster printing is only offered when conference data defines a positive price.
 */
const n=e=>{const t=Number(e?.poster_print?.price);return Number.isFinite(t)&&t>0};
/***/},
/***/8232:
/***/(e,t,a)=>{
/* harmony export */a.d(t,{
/* harmony export */A:()=>n
/* harmony export */});
// extracted by mini-css-extract-plugin
/* harmony default export */const n={root:"form-module__root--TEo3k","is-admin":"form-module__is-admin--CEfAJ",xSmallW:"form-module__xSmallW--P4BEz",smallW:"form-module__smallW--lV3G2",mdAuto:"form-module__mdAuto--nAWF4",md50:"form-module__md50--tAHPE",balance:"form-module__balance--IEzdN",deleteBtn:"form-module__deleteBtn--ynTR8",gdpr:"form-module__gdpr--VLq_3"};
/***/}}]);