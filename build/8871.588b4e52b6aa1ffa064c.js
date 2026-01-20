"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[8871],{
/***/188:
/***/(t,e,n)=>{
/* harmony export */n.d(e,{
/* harmony export */uh:()=>/* binding */m
/* harmony export */});
/* unused harmony exports DOWN, LEFT, RIGHT, UP */
/* harmony import */var i=n(6540);const r="Left",s="Right",o="Up",a="Down",c={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},u={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},l="mousemove",p="mouseup",d="touchend",h="touchmove",f="touchstart";function v(t,e){if(0===e)return t;const n=Math.PI/180*e;return[t[0]*Math.cos(n)+t[1]*Math.sin(n),t[1]*Math.cos(n)-t[0]*Math.sin(n)]}function g(t,e){const n=e=>{const n="touches"in e;
// if more than a single touch don't track, for now...
n&&e.touches.length>1||t(((t,r)=>{
// setup mouse listeners on document to track swipe since swipe can leave container
r.trackMouse&&!n&&(document.addEventListener(l,i),document.addEventListener(p,m));const{clientX:s,clientY:o}=n?e.touches[0]:e,a=v([s,o],r.rotationAngle);return r.onTouchStartOrOnMouseDown&&r.onTouchStartOrOnMouseDown({event:e}),Object.assign(Object.assign(Object.assign({},t),u),{initial:a.slice(),xy:a,start:e.timeStamp||0})}))},i=e=>{t(((t,n)=>{const i="touches"in e;
// Discount a swipe if additional touches are present after
// a swipe has started.
if(i&&e.touches.length>1)return t;
// if swipe has exceeded duration stop tracking
if(e.timeStamp-t.start>n.swipeDuration)return t.swiping?Object.assign(Object.assign({},t),{swiping:!1}):t;const{clientX:u,clientY:l}=i?e.touches[0]:e,[p,d]=v([u,l],n.rotationAngle),h=p-t.xy[0],f=d-t.xy[1],g=Math.abs(h),m=Math.abs(f),b=(e.timeStamp||0)-t.start,O=Math.sqrt(g*g+m*m)/(b||1),E=[h/(b||1),f/(b||1)],w=function(t,e,n,i){return t>e?n>0?s:r:i>0?a:o}(g,m,h,f),y="number"==typeof n.delta?n.delta:n.delta[w.toLowerCase()]||c.delta;if(g<y&&m<y&&!t.swiping)return t;const T={absX:g,absY:m,deltaX:h,deltaY:f,dir:w,event:e,first:t.first,initial:t.initial,velocity:O,vxvy:E};
// call onSwipeStart if present and is first swipe event
T.first&&n.onSwipeStart&&n.onSwipeStart(T),
// call onSwiping if present
n.onSwiping&&n.onSwiping(T);
// track if a swipe is cancelable (handler for swiping or swiped(dir) exists)
// so we can call preventDefault if needed
let S=!1;return(n.onSwiping||n.onSwiped||n[`onSwiped${w}`])&&(S=!0),S&&n.preventScrollOnSwipe&&n.trackTouch&&e.cancelable&&e.preventDefault(),Object.assign(Object.assign({},t),{
// first is now always false
first:!1,eventData:T,swiping:!0})}))},g=e=>{t(((t,n)=>{let i;if(t.swiping&&t.eventData){
// if swipe is less than duration fire swiped callbacks
if(e.timeStamp-t.start<n.swipeDuration){i=Object.assign(Object.assign({},t.eventData),{event:e}),n.onSwiped&&n.onSwiped(i);const r=n[`onSwiped${i.dir}`];r&&r(i)}}else n.onTap&&n.onTap({event:e});return n.onTouchEndOrOnMouseUp&&n.onTouchEndOrOnMouseUp({event:e}),Object.assign(Object.assign(Object.assign({},t),u),{eventData:i})}))},m=t=>{
// safe to just call removeEventListener
document.removeEventListener(l,i),document.removeEventListener(p,m),g(t)},b=(t,e)=>{let r=()=>{};if(t&&t.addEventListener){const s=Object.assign(Object.assign({},c.touchEventOptions),e.touchEventOptions),o=[[f,n,s],
// preventScrollOnSwipe option supersedes touchEventOptions.passive
[h,i,Object.assign(Object.assign({},s),e.preventScrollOnSwipe?{passive:!1}:{})],[d,g,s]];
// attach touch event listeners and handlers
o.forEach((([e,n,i])=>t.addEventListener(e,n,i))),
// return properly scoped cleanup method for removing listeners, options not required
r=()=>o.forEach((([e,n])=>t.removeEventListener(e,n)))}return r},O={ref:e=>{
// "inline" ref functions are called twice on render, once with null then again with DOM element
// ignore null here
null!==e&&t(((t,n)=>{
// if the same DOM el as previous just return state
if(t.el===e)return t;const i={};
// if new DOM el clean up old DOM and reset cleanUpTouch
// store event attached DOM el for comparison, clean up, and re-attachment
return t.el&&t.el!==e&&t.cleanUpTouch&&(t.cleanUpTouch(),i.cleanUpTouch=void 0),
// only attach if we want to track touch
n.trackTouch&&e&&(i.cleanUpTouch=b(e,n)),Object.assign(Object.assign(Object.assign({},t),{el:e}),i)}))}};
// if track mouse attach mouse down listener
return e.trackMouse&&(O.onMouseDown=n),[O,b]}function m(t){const{trackMouse:e}=t,n=i.useRef(Object.assign({},u)),r=i.useRef(Object.assign({},c)),s=i.useRef(Object.assign({},r.current));
// Force defaults for config properties
let o;for(o in s.current=Object.assign({},r.current),
// update current render props & defaults
r.current=Object.assign(Object.assign({},c),t),c)void 0===r.current[o]&&(r.current[o]=c[o]);const[a,l]=i.useMemo((()=>g((t=>n.current=t(n.current,r.current)),{trackMouse:e})),[e]);return n.current=function(t,e,n,i){
// if trackTouch is off or there is no el, then remove handlers if necessary and exit
return e.trackTouch&&t.el?
// trackTouch is on, so if there are no handlers attached, attach them and exit
t.cleanUpTouch?
// trackTouch is on and handlers are already attached, so if preventScrollOnSwipe changes value,
// remove and reattach handlers (this is required to update the passive option when attaching
// the handlers)
e.preventScrollOnSwipe!==n.preventScrollOnSwipe||e.touchEventOptions.passive!==n.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:i(t.el,e)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:i(t.el,e)}):(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0}))}(n.current,r.current,s.current,l),a}
//# sourceMappingURL=index.js.map
/***/},
/***/1533:
/***/(t,e,n)=>{
/* harmony export */n.d(e,{
/* harmony export */l:()=>/* binding */i
/* harmony export */});
/*#__NO_SIDE_EFFECTS__*/
const i=t=>t
/***/},
/***/1795:
/***/(t,e,n)=>{
// EXPORTS
n.d(e,{P6:()=>/* reexport */o,vG:()=>/* reexport */p,tu:()=>/* reexport */u,CD:()=>/* reexport */L,KZ:()=>/* reexport */m,rU:()=>/* reexport */a,PT:()=>/* reexport */A,DW:()=>/* reexport */d,WH:()=>/* reexport */l,Mc:()=>/* reexport */k,yL:()=>/* reexport */b,TU:()=>/* reexport */w,YE:()=>/* reexport */c,c$:()=>/* reexport */C,Wp:()=>/* reexport */X,nL:()=>/* reexport */v});
// UNUSED EXPORTS: NativeAnimationControls, ViewTransitionBuilder, createGeneratorEasing, cubicBezierAsString, isDragActive, isDragging, isNodeOrChild, resolveElements, supportedWaapiEasing, supportsFlags, supportsScrollTimeline, view
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/memo.mjs
var i=n(4435);// ./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
const r=(0,i/* memo */.p)((()=>void 0!==window.ScrollTimeline));// ./node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs
class s{constructor(t){
// Bound to accomodate common `return animation.stop` pattern
this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){
// Support for new finished Promise and legacy thennable API
return Promise.all(this.animations.map((t=>"finished"in t?t.finished:t)))}
/**
     * TODO: Filter out cancelled or stopped animations before returning
     */getAll(t){return this.animations[0][t]}setAll(t,e){for(let n=0;n<this.animations.length;n++)this.animations[n][t]=e}attachTimeline(t,e){const n=this.animations.map((n=>r()&&n.attachTimeline?n.attachTimeline(t):"function"==typeof e?e(n):void 0));return()=>{n.forEach(((t,e)=>{t&&t(),this.animations[e].stop()}))}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let e=0;e<this.animations.length;e++)t=Math.max(t,this.animations[e].duration);return t}runAll(t){this.animations.forEach((e=>e[t]()))}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}// ./node_modules/motion-dom/dist/es/animation/controls/Group.mjs
/**
 * TODO: This is a temporary class to support the legacy
 * thennable API
 */
class o extends s{then(t,e){return Promise.all(this.animations).then(t).catch(e)}}// ./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function a(t,e){return t?t[e]||t.default||t:void 0}// ./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const c=2e4;function u(t){let e=0;let n=t.next(e);for(;!n.done&&e<c;)e+=50,n=t.next(e);return e>=c?1/0:e}// ./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function l(t){return"function"==typeof t}// ./node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs
function p(t,e){t.timeline=e,t.onfinish=null}// ./node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs
const d=t=>Array.isArray(t)&&"number"==typeof t[0],h={linearEasing:void 0};// ./node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function f(t,e){const n=(0,i/* memo */.p)(t);return()=>{var t;return null!==(t=h[e])&&void 0!==t?t:n()}}// ./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
const v=f((()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch(t){return!1}return!0}),"linearEasing");
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/progress.mjs
var g=n(6896);// ./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
const m=(t,e,// as milliseconds
n=10)=>{let i="";const r=Math.max(Math.round(e/n),2);for(let e=0;e<r;e++)i+=t((0,g/* progress */.q)(0,r-1,e))+", ";return`linear(${i.substring(0,i.length-2)})`};// ./node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs
function b(t){return Boolean("function"==typeof t&&v()||!t||"string"==typeof t&&(t in E||v())||d(t)||Array.isArray(t)&&t.every(b))}const O=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`,E={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:O([0,.65,.55,1]),circOut:O([.55,0,1,.45]),backIn:O([.31,.01,.66,-.59]),backOut:O([.33,1.53,.69,.99])};function w(t,e){return t?"function"==typeof t&&v()?m(t,e):d(t)?O(t):Array.isArray(t)?t.map((t=>w(t,e)||E.easeOut)):E[t]:void 0}// ./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
const y={x:!1,y:!1};function T(){return y.x||y.y}// ./node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function S(t,e){const n=// ./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function(t,e,n){var i;if(t instanceof EventTarget)return[t];if("string"==typeof t){let r=document;e&&(
// TODO: Refactor to utils package
// invariant(
//     Boolean(scope.current),
//     "Scope provided, but no element detected."
// )
r=e.current);const s=null!==(i=null==n?void 0:n[t])&&void 0!==i?i:r.querySelectorAll(t);return s?Array.from(s):[]}return Array.from(t)}(t),i=new AbortController;return[n,{passive:!0,...e,signal:i.signal},()=>i.abort()]}// ./node_modules/motion-dom/dist/es/gestures/hover.mjs
function j(t){return!("touch"===t.pointerType||T())}
/**
 * Create a hover gesture. hover() is different to .addEventListener("pointerenter")
 * in that it has an easier syntax, filters out polyfilled touch events, interoperates
 * with drag gestures, and automatically removes the "pointerennd" event listener when the hover ends.
 *
 * @public
 */function A(t,e,n={}){const[i,r,s]=S(t,n),o=t=>{if(!j(t))return;const{target:n}=t,i=e(n,t);if("function"!=typeof i||!n)return;const s=t=>{j(t)&&(i(t),n.removeEventListener("pointerleave",s))};n.addEventListener("pointerleave",s,r)};return i.forEach((t=>{t.addEventListener("pointerenter",o,r)})),s}// ./node_modules/motion-dom/dist/es/gestures/utils/capture-pointer.mjs
function L(t,e){const n=`${e}PointerCapture`;if(t.target instanceof Element&&n in t.target&&void 0!==t.pointerId)try{t.target[n](t.pointerId)}catch(t){}}// ./node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
const M=(t,e)=>!!e&&(t===e||M(t,e.parentElement)),k=t=>"mouse"===t.pointerType?"number"!=typeof t.button||t.button<=0:!1!==t.isPrimary,x=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);// ./node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
const U=new WeakSet;// ./node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
/**
 * Filter out events that are not "Enter" keys.
 */
function D(t){return e=>{"Enter"===e.key&&t(e)}}function I(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const P=(t,e)=>{const n=t.currentTarget;if(!n)return;const i=D((()=>{if(U.has(n))return;I(n,"down");const t=D((()=>{I(n,"up")}));n.addEventListener("keyup",t,e),n.addEventListener("blur",(()=>I(n,"cancel")),e)}));n.addEventListener("keydown",i,e),
/**
     * Add an event listener that fires on blur to remove the keydown events.
     */
n.addEventListener("blur",(()=>n.removeEventListener("keydown",i)),e)};// ./node_modules/motion-dom/dist/es/gestures/press/index.mjs
/**
 * Filter out events that are not primary pointer events, or are triggering
 * while a Motion gesture is active.
 */
function $(t){return k(t)&&!T()}
/**
 * Create a press gesture.
 *
 * Press is different to `"pointerdown"`, `"pointerup"` in that it
 * automatically filters out secondary pointer events like right
 * click and multitouch.
 *
 * It also adds accessibility support for keyboards, where
 * an element with a press gesture will receive focus and
 *  trigger on Enter `"keydown"` and `"keyup"` events.
 *
 * This is different to a browser's `"click"` event, which does
 * respond to keyboards but only for the `"click"` itself, rather
 * than the press start and end/cancel. The element also needs
 * to be focusable for this to work, whereas a press gesture will
 * make an element focusable by default.
 *
 * @public
 */function C(t,e,n={}){const[i,r,s]=S(t,n),o=t=>{const n=t.currentTarget;if(!n||!$(t)||U.has(n))return;U.add(n),L(t,"set");const i=e(n,t),s=(t,e)=>{n.removeEventListener("pointerup",o),n.removeEventListener("pointercancel",a),L(t,"release"),$(t)&&U.has(n)&&(U.delete(n),"function"==typeof i&&i(t,{success:e}))},o=t=>{const e=!!t.isTrusted&&(i=t,r=n instanceof Element?n.getBoundingClientRect():{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight},i.clientX<r.left||i.clientX>r.right||i.clientY<r.top||i.clientY>r.bottom);var i,r;
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/time-conversion.mjs
s(t,!e&&(!(n instanceof Element)||M(n,t.target)))},a=t=>{s(t,!1)};n.addEventListener("pointerup",o,r),n.addEventListener("pointercancel",a,r),n.addEventListener("lostpointercapture",a,r)};return i.forEach((t=>{let e=!1;var i;(t=n.useGlobalTarget?window:t)instanceof HTMLElement&&(e=!0,i=t,x.has(i.tagName)||-1!==i.tabIndex||null!==t.getAttribute("tabindex")||(t.tabIndex=0)),t.addEventListener("pointerdown",o,r),e&&t.addEventListener("focus",(t=>P(t,r)),r)})),s}n(7331),n(1533);
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/noop.mjs
// ./node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function X(t){return"x"===t||"y"===t?y[t]?null:(y[t]=!0,()=>{y[t]=!1}):y.x||y.y?null:(y.x=y.y=!0,()=>{y.x=y.y=!1})}}// ./node_modules/motion-dom/dist/es/index.mjs
/***/,
/***/4435:
/***/(t,e,n)=>{
/*#__NO_SIDE_EFFECTS__*/
function i(t){let e;return()=>(void 0===e&&(e=t()),e)}
/***/
/* harmony export */n.d(e,{
/* harmony export */p:()=>/* binding */i
/* harmony export */})},
/***/6896:
/***/(t,e,n)=>{
/* harmony export */n.d(e,{
/* harmony export */q:()=>/* binding */i
/* harmony export */});
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/
/*#__NO_SIDE_EFFECTS__*/
const i=(t,e,n)=>{const i=e-t;return 0===i?1:(n-t)/i};
/***/},
/***/7331:
/***/(t,e,n)=>{
/* harmony export */n.d(e,{
/* harmony export */X:()=>/* binding */r
/* harmony export */,f:()=>/* binding */i
/* harmony export */});
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
/*#__NO_SIDE_EFFECTS__*/
const i=t=>1e3*t
/*#__NO_SIDE_EFFECTS__*/,r=t=>t/1e3
/***/},
/***/8104:
/***/(t,e,n)=>{
/* harmony export */n.d(e,{
/* harmony export */$:()=>/* binding */r
/* harmony export */,V:()=>/* binding */s
/* harmony export */});
/* harmony import */var i=n(1533);let r=i/* .noop */.l,s=i/* .noop */.l}
/***/}]);