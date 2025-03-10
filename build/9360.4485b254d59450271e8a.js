"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[9360],{
/***/9360:
/***/(e,t,r)=>{// ./node_modules/redux/dist/redux.mjs
// src/utils/formatProdErrorMessage.ts
function n(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}
// src/utils/symbol-observable.ts
// EXPORTS
r.d(t,{U1:()=>/* binding */N,Z0:()=>/* binding */k});var o=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),c=()=>Math.random().toString(36).substring(7).split("").join("."),i={INIT:`@@redux/INIT${c()}`,REPLACE:`@@redux/REPLACE${c()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${c()}`};
// src/utils/isPlainObject.ts
function u(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}
// src/utils/kindOf.ts
// src/createStore.ts
function s(e,t,r){if("function"!=typeof e)throw new Error(n(2));if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error(n(0));if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error(n(1));return r(s)(e,t)}let c=e,a=t,f=new Map,d=f,l=0,p=!1;function y(){d===f&&(d=new Map,f.forEach(((e,t)=>{d.set(t,e)})))}function h(){if(p)throw new Error(n(3));return a}function w(e){if("function"!=typeof e)throw new Error(n(4));if(p)throw new Error(n(5));let t=!0;y();const r=l++;return d.set(r,e),function(){if(t){if(p)throw new Error(n(6));t=!1,y(),d.delete(r),f=null}}}function E(e){if(!u(e))throw new Error(n(7));if(void 0===e.type)throw new Error(n(8));if("string"!=typeof e.type)throw new Error(n(17));if(p)throw new Error(n(9));try{p=!0,a=c(a,e)}finally{p=!1}return(f=d).forEach((e=>{e()})),e}E({type:i.INIT});return{dispatch:E,subscribe:w,getState:h,replaceReducer:function(e){if("function"!=typeof e)throw new Error(n(10));c=e,E({type:i.REPLACE})},[o]:function(){const e=w;return{
/**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
subscribe(t){if("object"!=typeof t||null===t)throw new Error(n(11));function r(){const e=t;e.next&&e.next(h())}r();return{unsubscribe:e(r)}},[o](){return this}}}}}function a(e){const t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const o=t[n];0,"function"==typeof e[o]&&(r[o]=e[o])}const o=Object.keys(r);let c;try{!function(e){Object.keys(e).forEach((t=>{const r=e[t];if(void 0===r(void 0,{type:i.INIT}))throw new Error(n(12));if(void 0===r(void 0,{type:i.PROBE_UNKNOWN_ACTION()}))throw new Error(n(13))}))}(r)}catch(e){c=e}return function(e={},t){if(c)throw c;let i=!1;const u={};for(let c=0;c<o.length;c++){const s=o[c],a=r[s],f=e[s],d=a(f,t);if(void 0===d){t&&t.type;throw new Error(n(14))}u[s]=d,i=i||d!==f}return i=i||o.length!==Object.keys(e).length,i?u:e}}
// src/bindActionCreators.ts
// src/compose.ts
function f(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce(((e,t)=>(...r)=>e(t(...r))))}
// src/applyMiddleware.ts
// ./node_modules/redux-thunk/dist/redux-thunk.mjs
// src/index.ts
function d(e){return({dispatch:t,getState:r})=>n=>o=>"function"==typeof o?o(t,r,e):n(o)}var l=d(),p=d,y=r(1932),h="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?f:f.apply(null,arguments)};"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;
// src/createAction.ts
function w(e,t){function r(...r){if(t){let n=t(...r);if(!n)throw new Error(I(0));return{type:e,payload:n.payload,..."meta"in n&&{meta:n.meta},..."error"in n&&{error:n.error}}}return{type:e,payload:r[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=t=>
// src/utils/isAction.ts
function(e){return u(e)&&"type"in e&&"string"==typeof e.type}
//# sourceMappingURL=redux.mjs.map
(t)&&t.type===e,r}var E=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function m(e){return(0,y/* isDraftable */.a6)(e)?(0,y/* produce */.jM)(e,(()=>{})):e}function b(e,t,r){return e.has(t)?e.get(t):e.set(t,r(t)).get(t)}
// src/immutableStateInvariantMiddleware.ts
var g=()=>function(e){const{thunk:t=!0,immutableCheck:r=!0,serializableCheck:n=!0,actionCreatorCheck:o=!0}=e??{};let c=new E;return t&&("boolean"==typeof t?c.push(l):c.push(p(t.extraArgument))),c}
// src/autoBatchEnhancer.ts
,O="RTK_autoBatch",C=e=>t=>{setTimeout(t,e)},_=e=>function(t){const{autoBatch:r=!0}=t??{};let n=new E(e);return r&&n.push(((e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let o=!0,c=!1,i=!1;const u=new Set,s="tick"===e.type?queueMicrotask:"raf"===e.type?
// requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:C(10):"callback"===e.type?e.queueNotification:C(e.timeout),a=()=>{i=!1,c&&(c=!1,u.forEach((e=>e())))};return Object.assign({},n,{
// Override the base `store.subscribe` method to keep original listeners
// from running if we're delaying notifications
subscribe(e){const t=n.subscribe((()=>o&&e()));return u.add(e),()=>{t(),u.delete(e)}},
// Override the base `store.dispatch` method so that we can check actions
// for the `shouldAutoBatch` flag and determine if batching is active
dispatch(e){try{return o=!e?.meta?.[O],c=!o,c&&(i||(i=!0,s(a))),n.dispatch(e)}finally{o=!0}}})}
// src/getDefaultEnhancers.ts
)("object"==typeof r?r:void 0)),n}
// src/configureStore.ts;
function N(e){const t=g(),{reducer:r,middleware:o,devTools:c=!0,preloadedState:i,enhancers:d}=e||{};let l,p;if("function"==typeof r)l=r;else{if(!u(r))throw new Error(I(1));l=a(r)}p="function"==typeof o?o(t):t();let y=f;c&&(y=h({
// Enable capture of stack traces for dispatched Redux actions
trace:!1,..."object"==typeof c&&c}));const w=function(...e){return t=>(r,o)=>{const c=t(r,o);let i=()=>{throw new Error(n(15))};const u={getState:c.getState,dispatch:(e,...t)=>i(e,...t)},s=e.map((e=>e(u)));return i=f(...s)(c.dispatch),{...c,dispatch:i}}}(...p),E=_(w);return s(l,i,y(..."function"==typeof d?d(E):E()))}
// src/createReducer.ts
// src/mapBuilders.ts
function T(e){const t={},r=[];let n;const o={addCase(e,r){const n="string"==typeof e?e:e.type;if(!n)throw new Error(I(28));if(n in t)throw new Error(I(29));return t[n]=r,o},addMatcher:(e,t)=>(r.push({matcher:e,reducer:t}),o),addDefaultCase:e=>(n=e,o)};return e(o),[t,r,n]}
// src/createReducer.ts
// src/createSlice.ts
var v=Symbol.for("rtk-slice-createasyncthunk");function j(e,t){return`${e}/${t}`}function R({creators:e}={}){const t=e?.asyncThunk?.[v];return function(e){const{name:r,reducerPath:n=r}=e;if(!r)throw new Error(I(11));const o=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk"/* asyncThunk */,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({
// hack so the wrapping function has the same name as the original
// we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"/* reducer */}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare"/* reducerWithPrepare */,prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},c=Object.keys(o),i={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},u={addCase(e,t){const r="string"==typeof e?e:e.type;if(!r)throw new Error(I(12));if(r in i.sliceCaseReducersByType)throw new Error(I(13));return i.sliceCaseReducersByType[r]=t,u},addMatcher:(e,t)=>(i.sliceMatchers.push({matcher:e,reducer:t}),u),exposeAction:(e,t)=>(i.actionCreators[e]=t,u),exposeCaseReducer:(e,t)=>(i.sliceCaseReducersByName[e]=t,u)};function s(){const[t={},r=[],n]="function"==typeof e.extraReducers?T(e.extraReducers):[e.extraReducers],o={...t,...i.sliceCaseReducersByType};return function(e,t){let r,[n,o,c]=T(t);if("function"==typeof e)r=()=>m(e());else{const t=m(e);r=()=>t}function i(e=r(),t){let i=[n[t.type],...o.filter((({matcher:e})=>e(t))).map((({reducer:e})=>e))];return 0===i.filter((e=>!!e)).length&&(i=[c]),i.reduce(((e,r)=>{if(r){if((0,y/* isDraft */.Qx)(e)){const n=r(e,t);return void 0===n?e:n}if((0,y/* isDraftable */.a6)(e))return(0,y/* produce */.jM)(e,(e=>r(e,t)));{const n=r(e,t);if(void 0===n){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return n}}return e}),e)}return i.getInitialState=r,i}
// src/matchers.ts
(e.initialState,(e=>{for(let t in o)e.addCase(t,o[t]);for(let t of i.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of r)e.addMatcher(t.matcher,t.reducer);n&&e.addDefaultCase(n)}))}c.forEach((n=>{const c=o[n],i={reducerName:n,type:j(r,n),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"/* asyncThunk */===e._reducerDefinitionType}(c)?function({type:e,reducerName:t,createNotation:r},n,o){let c,i;if("reducer"in n){if(r&&!function(e){return"reducerWithPrepare"/* reducerWithPrepare */===e._reducerDefinitionType}(n))throw new Error(I(17));c=n.reducer,i=n.prepare}else c=n;o.addCase(e,c).exposeCaseReducer(t,c).exposeAction(t,i?w(e,i):w(e))}(i,c,u):function({type:e,reducerName:t},r,n,o){if(!o)throw new Error(I(18));const{payloadCreator:c,fulfilled:i,pending:u,rejected:s,settled:a,options:f}=r,d=o(e,c,f);n.exposeAction(t,d),i&&n.addCase(d.fulfilled,i);u&&n.addCase(d.pending,u);s&&n.addCase(d.rejected,s);a&&n.addMatcher(d.settled,a);n.exposeCaseReducer(t,{fulfilled:i||x,pending:u||x,rejected:s||x,settled:a||x})}(i,c,u,t)}));const a=e=>e,f=new Map;let d;function l(e,t){return d||(d=s()),d(e,t)}function p(){return d||(d=s()),d.getInitialState()}function h(t,r=!1){function n(e){let n=e[t];return void 0===n&&r&&(n=p()),n}function o(t=a){const n=b(f,r,(()=>new WeakMap));return b(n,t,(()=>{const n={};for(const[o,c]of Object.entries(e.selectors??{}))n[o]=S(c,t,p,r);return n}))}return{reducerPath:t,getSelectors:o,get selectors(){return o(n)},selectSlice:n}}const E={name:r,reducer:l,actions:i.actionCreators,caseReducers:i.sliceCaseReducersByName,getInitialState:p,...h(n),injectInto(e,{reducerPath:t,...r}={}){const o=t??n;return e.inject({reducerPath:o,reducer:l},r),{...E,...h(o,!0)}}};return E}}function S(e,t,r,n){function o(o,...c){let i=t(o);return void 0===i&&n&&(i=r()),e(i,...c)}return o.unwrapped=e,o}var k=R();function x(){}
// src/entities/entity_state.ts
var{assign:M}=Object;Symbol.for("rtk-state-proxy-original");
// src/formatProdErrorMessage.ts
function I(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}
//# sourceMappingURL=redux-toolkit.modern.mjs.map
/***/}}]);