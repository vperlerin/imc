"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[4758],{
/***/104:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */Gt:()=>/* binding */o
/* harmony export */,PP:()=>/* binding */c
/* harmony export */,WG:()=>/* binding */r
/* harmony export */,uv:()=>/* binding */a
/* harmony export */});
/* harmony import */var s=e(1533),i=e(7911);
/* harmony import */const{schedule:o,cancel:r,state:a,steps:c}=(0,i/* .createRenderBatcher */.I)("undefined"!=typeof requestAnimationFrame?requestAnimationFrame:s/* .noop */.l,!0);
/***/},
/***/176:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */h:()=>/* binding */s
/* harmony export */});const s=t=>Array.isArray(t)&&"number"!=typeof t[0];
/***/},
/***/309:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */b:()=>/* binding */i
/* harmony export */});
/* harmony import */var s=e(4768);const i=t=>(t*=2)<1?.5*(0,s/* .backIn */.dg)(t):.5*(2-Math.pow(2,-10*(t-1)))
/***/},
/***/921:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */H:()=>/* binding */c
/* harmony export */});
/* harmony import */var s=e(1795),i=e(9531),o=e(3044),r=e(104);
/* harmony import */function a(t,n,e){const{props:s}=t;if(t.current instanceof HTMLButtonElement&&t.current.disabled)return;t.animationState&&s.whileTap&&t.animationState.setActive("whileTap","Start"===e);const o=s["onTap"+("End"===e?"":e)];o&&r/* .frame */.Gt.postRender((()=>o(n,(0,i/* .extractEventInfo */.e)(n))))}class c extends o/* .Feature */.X{mount(){const{current:t}=this.node;t&&(this.unmount=(0,s/* .press */.c$)(t,((t,n)=>(a(this.node,n,"Start"),(t,{success:n})=>a(this.node,t,n?"End":"Cancel"))),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}
/***/},
/***/983:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */K:()=>/* binding */d
/* harmony export */});
/* harmony import */var s=e(1795),i=e(1533),o=e(8104),r=e(309),a=e(4768),c=e(4868),u=e(4043),h=e(3771);
/* harmony import */const l={linear:i/* .noop */.l,easeIn:h/* .easeIn */.a6,easeInOut:h/* .easeInOut */.am,easeOut:h/* .easeOut */.vT,circIn:c/* .circIn */.po,circInOut:c/* .circInOut */.tn,circOut:c/* .circOut */.yT,backIn:a/* .backIn */.dg,backInOut:a/* .backInOut */.ZZ,backOut:a/* .backOut */.Sz,anticipate:r/* .anticipate */.b},d=t=>{if((0,s/* .isBezierDefinition */.DW)(t)){
// If cubic bezier definition, create bezier curve
// If cubic bezier definition, create bezier curve
(0,o/* .invariant */.V)(4===t.length,"Cubic bezier arrays must contain four numerical values.");const[n,e,s,i]=t;return(0,u/* .cubicBezier */.A)(n,e,s,i)}return"string"==typeof t?(
// Else lookup from table
// Else lookup from table
(0,o/* .invariant */.V)(void 0!==l[t],`Invalid easing type '${t}'`),l[t]):t}}
/***/,
/***/2275:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */Q:()=>/* binding */h
/* harmony export */});
/* harmony import */var s=e(1795),i=e(7331),o=e(2901),r=e(9531),a=e(5746),c=e(1339),u=e(104);
/* harmony import */
/**
 * @internal
 */
class h{constructor(t,n,{transformPagePoint:e,dragSnapToOrigin:i=!1}={}){
// If we have more than one touch, don't start detecting this gesture
if(
/**
         * @internal
         */
this.startEvent=null,
/**
         * @internal
         */
this.lastMoveEvent=null,
/**
         * @internal
         */
this.lastMoveEventInfo=null,
/**
         * @internal
         */
this.handlers={},this.updatePoint=()=>{if(!this.lastMoveEvent||!this.lastMoveEventInfo)return;const t=m(this.lastMoveEventInfo,this.history),n=null!==this.startEvent,e=(0,a/* .distance2D */.w)(t.offset,{x:0,y:0})>=3;if(!n&&!e)return;const{point:s}=t,{timestamp:i}=u/* .frameData */.uv;this.history.push({...s,timestamp:i});const{onStart:o,onMove:r}=this.handlers;n||(o&&o(this.lastMoveEvent,t),this.startEvent=this.lastMoveEvent),r&&r(this.lastMoveEvent,t)},this.handlePointerMove=(t,n)=>{if(this.index=f(t.currentTarget),t.target instanceof Element&&t.target.hasPointerCapture&&void 0!==t.pointerId)try{if(!t.target.hasPointerCapture(t.pointerId))return}catch(t){}this.lastMoveEvent=t,this.lastMoveEventInfo=l(n,this.transformPagePoint),
// Throttle mouse move event to once per frame
u/* .frame */.Gt.update(this.updatePoint,!0)},this.handlePointerUp=(t,n)=>{(0,s/* .capturePointer */.CD)(t,"release"),this.end();const{onEnd:e,onSessionEnd:i,resumeAnimation:o}=this.handlers;if(this.dragSnapToOrigin&&o&&o(),!this.lastMoveEvent||!this.lastMoveEventInfo)return;const r=m("pointercancel"===t.type||"lostpointercapture"===t.type?this.lastMoveEventInfo:l(n,this.transformPagePoint),this.history);this.startEvent&&e&&e(t,r),i&&i(t,r)},!(0,s/* .isPrimaryPointer */.Mc)(t))return;this.dragSnapToOrigin=i,this.handlers=n,this.transformPagePoint=e;const h=l((0,r/* .extractEventInfo */.e)(t),this.transformPagePoint),{point:d}=h,{timestamp:p}=u/* .frameData */.uv;this.history=[{...d,timestamp:p}];const{onSessionStart:g}=n;g&&g(t,m(h,this.history)),(0,s/* .capturePointer */.CD)(t,"set"),this.removeListeners=(0,c/* .pipe */.F)((0,o/* .addPointerEvent */.h)(t.currentTarget,"pointermove",this.handlePointerMove),(0,o/* .addPointerEvent */.h)(t.currentTarget,"pointerup",this.handlePointerUp),(0,o/* .addPointerEvent */.h)(t.currentTarget,"pointercancel",this.handlePointerUp),(0,o/* .addPointerEvent */.h)(t.currentTarget,"lostpointercapture",((t,n)=>{
/**
             * If the pointer has lost capture because it's moved in the DOM
             * then we need to re-capture it.
             */
f(t.currentTarget)!==this.index?(0,s/* .capturePointer */.CD)(t,"set"):this.handlePointerUp(t,n)})))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),(0,u/* .cancelFrame */.WG)(this.updatePoint)}}function l(t,n){return n?{point:n(t.point)}:t}function d(t,n){return{x:t.x-n.x,y:t.y-n.y}}function m({point:t},n){return{point:t,delta:d(t,g(n)),offset:d(t,p(n)),velocity:v(n,.1)}}function p(t){return t[0]}function g(t){return t[t.length-1]}function v(t,n){if(t.length<2)return{x:0,y:0};let e=t.length-1,s=null;const o=g(t);for(;e>=0&&(s=t[e],!(o.timestamp-s.timestamp>(0,i/* .secondsToMilliseconds */.f)(n)));)e--;if(!s)return{x:0,y:0};const r=(0,i/* .millisecondsToSeconds */.X)(o.timestamp-s.timestamp);if(0===r)return{x:0,y:0};const a={x:(o.x-s.x)/r,y:(o.y-s.y)/r};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}function f(t){return t.parentNode?Array.from(t.parentNode.children).indexOf(t):-1}
/***/},
/***/2846:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */e:()=>/* binding */c
/* harmony export */});
/* harmony import */var s=e(1795),i=e(9531),o=e(3044),r=e(104);
/* harmony import */function a(t,n,e){const{props:s}=t;t.animationState&&s.whileHover&&t.animationState.setActive("whileHover","Start"===e);const o=s["onHover"+e];o&&r/* .frame */.Gt.postRender((()=>o(n,(0,i/* .extractEventInfo */.e)(n))))}class c extends o/* .Feature */.X{mount(){const{current:t}=this.node;t&&(this.unmount=(0,s/* .hover */.PT)(t,((t,n)=>(a(this.node,n,"Start"),t=>a(this.node,t,"End")))))}unmount(){}}
/***/},
/***/2901:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */h:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=e(3998),i=e(9531);
/* harmony import */function o(t,n,e,o){return(0,s/* .addDomEvent */.k)(t,n,(0,i/* .addPointerInfo */.F)(e),o)}
/***/},
/***/2946:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */G:()=>/* binding */s
/* harmony export */});
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
const s=t=>n=>1-t(1-n)
/***/},
/***/3041:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */V:()=>/* binding */s
/* harmony export */});
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
const s=t=>n=>n<=.5?t(2*n)/2:(2-t(2*(1-n)))/2
/***/},
/***/3771:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */a6:()=>/* binding */i
/* harmony export */,am:()=>/* binding */r
/* harmony export */,vT:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=e(4043);const i=(0,s/* .cubicBezier */.A)(.42,0,1,1),o=(0,s/* .cubicBezier */.A)(0,0,.58,1),r=(0,s/* .cubicBezier */.A)(.42,0,.58,1)}
/***/,
/***/3998:
/***/(t,n,e)=>{function s(t,n,e,s={passive:!0}){return t.addEventListener(n,e,s),()=>t.removeEventListener(n,e)}
/***/
/* harmony export */e.d(n,{
/* harmony export */k:()=>/* binding */s
/* harmony export */})},
/***/4043:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */A:()=>/* binding */a
/* harmony export */});
/* harmony import */var s=e(1533);
/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const i=(t,n,e)=>(((1-3*e+3*n)*t+(3*e-6*n))*t+3*n)*t,o=1e-7,r=12;function a(t,n,e,a){
// If this is a linear gradient, return linear easing
if(t===n&&e===a)return s/* .noop */.l;const c=n=>function(t,n,e,s,a){let c,u,h=0;do{u=n+(e-n)/2,c=i(u,s,a)-t,c>0?e=u:n=u}while(Math.abs(c)>o&&++h<r);return u}(n,0,1,t,e)
// If animation is at start/end, return t without easing;
return t=>0===t||1===t?t:i(c(t),n,a)}
/***/},
/***/4495:
/***/(t,n,e)=>{
// EXPORTS
e.d(n,{w:()=>/* binding */V});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/motion/features/Feature.mjs
var s=e(3044),i=e(1533),o=e(1795),r=e(8104),a=e(8853),c=e(3998),u=e(2901),h=e(9531),l=e(8448),d=e(5120),m=e(4106),p=e(2957),g=e(4805),v=e(3953),f=e(9713),P=e(5269),x=e(29),E=e(2275),y=e(6896),M=e(2464);
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/noop.mjs
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
function A(t,n,e){return{min:void 0!==n?t.min+n:void 0,max:void 0!==e?t.max+e-(t.max-t.min):void 0}}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
function S(t,n){let e=n.min-t.min,s=n.max-t.max;
// If the constraints axis is actually smaller than the layout axis then we can
// flip the constraints
return n.max-n.min<t.max-t.min&&([e,s]=[s,e]),{min:e,max:s}}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */const D=.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */function C(t,n,e){return{min:k(t,n),max:k(t,e)}}function k(t,n){return"number"==typeof t?t:t[n]||0}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/frameloop/frame.mjs
var T=e(104);// ./node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
const L=new WeakMap;
/**
 *
 */
// let latestPointerEvent: PointerEvent
class w{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},
/**
         * The permitted boundaries of travel, in pixels.
         */
this.constraints=!1,this.hasMutatedConstraints=!1,
/**
         * The per-axis resolved elastic values.
         */
this.elastic=(0,m/* createBox */.ge)(),this.visualElement=t}start(t,{snapToCursor:n=!1}={}){
/**
         * Don't start dragging if this component is exiting
         */
const{presenceContext:e}=this.visualElement;if(e&&!1===e.isPresent)return;const{dragSnapToOrigin:s}=this.getProps();this.panSession=new E/* PanSession */.Q(t,{onSessionStart:t=>{const{dragSnapToOrigin:e}=this.getProps();
// Stop or pause any animations on both axis values immediately. This allows the user to throw and catch
// the component.
e?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor((0,h/* extractEventInfo */.e)(t).point)},onStart:(t,n)=>{
// Attempt to grab the global drag gesture lock - maybe make this part of PanSession
const{drag:e,dragPropagation:s,onDragStart:i}=this.getProps();if(e&&!s&&(this.openDragLock&&this.openDragLock(),this.openDragLock=(0,o/* setDragLock */.Wp)(e),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0)
/**
             * Record gesture origin
             */,(0,p/* eachAxis */.X)((t=>{let n=this.getAxisMotionValue(t).get()||0;
/**
                 * If the MotionValue is a percentage value convert to px
                 */if(P/* percent */.KN.test(n)){const{projection:e}=this.visualElement;if(e&&e.layout){const s=e.layout.layoutBox[t];if(s){n=(0,d/* calcLength */.CQ)(s)*(parseFloat(n)/100)}}}this.originPoint[t]=n})),
// Fire onDragStart event
i&&T/* frame */.Gt.postRender((()=>i(t,n))),(0,x/* addValueToWillChange */.g)(this.visualElement,"transform");const{animationState:r}=this.visualElement;r&&r.setActive("whileDrag",!0)},onMove:(t,n)=>{
// latestPointerEvent = event
const{dragPropagation:e,dragDirectionLock:s,onDirectionLock:i,onDrag:o}=this.getProps();
// If we didn't successfully receive the gesture lock, early return.
if(!e&&!this.openDragLock)return;const{offset:r}=n;
// Attempt to detect drag direction if directionLock is true
if(s&&null===this.currentDirection)return this.currentDirection=
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */
function(t,n=10){let e=null;Math.abs(t.y)>n?e="y":Math.abs(t.x)>n&&(e="x");return e}(r),void(
// If we've successfully set a direction, notify listener
null!==this.currentDirection&&i&&i(this.currentDirection));
// Update each point with the latest position
this.updateAxis("x",n.point,r),this.updateAxis("y",n.point,r),
/**
             * Ideally we would leave the renderer to fire naturally at the end of
             * this frame but if the element is about to change layout as the result
             * of a re-render we want to ensure the browser can read the latest
             * bounding box to ensure the pointer and element don't fall out of sync.
             */
this.visualElement.render(),
/**
             * This must fire after the render call as it might trigger a state
             * change which itself might trigger a layout update.
             */
o&&o(t,n)},onSessionEnd:(t,n)=>this.stop(t,n),resumeAnimation:()=>(0,p/* eachAxis */.X)((t=>{var n;return"paused"===this.getAnimationState(t)&&(null===(n=this.getAxisMotionValue(t).animation)||void 0===n?void 0:n.play())}))},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:s})}stop(t,n){const e=this.isDragging;if(this.cancel(),!e)return;const{velocity:s}=n;this.startAnimation(s);const{onDragEnd:i}=this.getProps();i&&T/* frame */.Gt.postRender((()=>i(t,n)))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:e}=this.getProps();!e&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,e){const{drag:s}=this.getProps();
// If we're not dragging this axis, do an early return.
if(!e||!b(t,s,this.currentDirection))return;const i=this.getAxisMotionValue(t);let o=this.originPoint[t]+e[t];
// Apply constraints
this.constraints&&this.constraints[t]&&(o=// ./node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
function(t,{min:n,max:e},s){return void 0!==n&&t<n?
// If we have a min point defined, and this is outside of that, constrain
t=s?(0,f/* mixNumber */.k)(n,t,s.min):Math.max(t,n):void 0!==e&&t>e&&(
// If we have a max point defined, and this is outside of that, constrain
t=s?(0,f/* mixNumber */.k)(e,t,s.max):Math.min(t,e)),t}(o,this.constraints[t],this.elastic[t])),i.set(o)}resolveConstraints(){var t;const{dragConstraints:n,dragElastic:e}=this.getProps(),s=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):null===(t=this.visualElement.projection)||void 0===t?void 0:t.layout,i=this.constraints;n&&(0,v/* isRefObject */.X)(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):this.constraints=!(!n||!s)&&function(t,{top:n,left:e,bottom:s,right:i}){return{x:A(t.x,e,i),y:A(t.y,n,s)}}(s.layoutBox,n),this.elastic=function(t=D){return!1===t?t=0:!0===t&&(t=D),{x:C(t,"left","right"),y:C(t,"top","bottom")}}(e),
/**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative.
         */
i!==this.constraints&&s&&this.constraints&&!this.hasMutatedConstraints&&(0,p/* eachAxis */.X)((t=>{!1!==this.constraints&&this.getAxisMotionValue(t)&&(this.constraints[t]=
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
function(t,n){const e={};return void 0!==n.min&&(e.min=n.min-t.min),void 0!==n.max&&(e.max=n.max-t.min),e}(s.layoutBox[t],this.constraints[t]))}))}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!(0,v/* isRefObject */.X)(t))return!1;const e=t.current;(0,r/* invariant */.V)(null!==e,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");const{projection:s}=this.visualElement;
// TODO
if(!s||!s.layout)return!1;const i=(0,g/* measurePageBox */.L)(e,s.root,this.visualElement.getTransformPagePoint());let o=function(t,n){return{x:S(t.x,n.x),y:S(t.y,n.y)}}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */(s.layout.layoutBox,i);
/**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */if(n){const t=n((0,l/* convertBoxToBoundingBox */.pA)(o));this.hasMutatedConstraints=!!t,t&&(o=(0,l/* convertBoundingBoxToBox */.FY)(t))}return o}startAnimation(t){const{drag:n,dragMomentum:e,dragElastic:s,dragTransition:i,dragSnapToOrigin:o,onDragTransitionEnd:r}=this.getProps(),a=this.constraints||{},c=(0,p/* eachAxis */.X)((r=>{if(!b(r,n,this.currentDirection))return;let c=a&&a[r]||{};o&&(c={min:0,max:0})
/**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */;const u=s?200:1e6,h=s?40:1e7,l={type:"inertia",velocity:e?t[r]:0,bounceStiffness:u,bounceDamping:h,timeConstant:750,restDelta:1,restSpeed:10,...i,...c};
// If we're not animating on an externally-provided `MotionValue` we can use the
// component's animation controls which will handle interactions with whileHover (etc),
// otherwise we just have to animate the `MotionValue` itself.
return this.startAxisValueAnimation(r,l)}));
// Run all animations and then resolve the new drag constraints.
return Promise.all(c).then(r)}startAxisValueAnimation(t,n){const e=this.getAxisMotionValue(t);return(0,x/* addValueToWillChange */.g)(this.visualElement,t),e.start((0,a/* animateMotionValue */.f)(t,e,0,n,this.visualElement,!1))}stopAnimation(){(0,p/* eachAxis */.X)((t=>this.getAxisMotionValue(t).stop()))}pauseAnimation(){(0,p/* eachAxis */.X)((t=>{var n;return null===(n=this.getAxisMotionValue(t).animation)||void 0===n?void 0:n.pause()}))}getAnimationState(t){var n;return null===(n=this.getAxisMotionValue(t).animation)||void 0===n?void 0:n.state}
/**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */getAxisMotionValue(t){const n=`_drag${t.toUpperCase()}`,e=this.visualElement.getProps(),s=e[n];return s||this.visualElement.getValue(t,(e.initial?e.initial[t]:void 0)||0)}snapToCursor(t){(0,p/* eachAxis */.X)((n=>{const{drag:e}=this.getProps();
// If we're not dragging this axis, do an early return.
if(!b(n,e,this.currentDirection))return;const{projection:s}=this.visualElement,i=this.getAxisMotionValue(n);if(s&&s.layout){const{min:e,max:o}=s.layout.layoutBox[n];i.set(t[n]-(0,f/* mixNumber */.k)(e,o,.5))}}))}
/**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:e}=this.visualElement;if(!(0,v/* isRefObject */.X)(n)||!e||!this.constraints)return;
/**
         * Stop current animations as there can be visual glitching if we try to do
         * this mid-animation
         */this.stopAnimation();
/**
         * Record the relative position of the dragged element relative to the
         * constraints box and save as a progress value.
         */
const s={x:0,y:0};(0,p/* eachAxis */.X)((t=>{const n=this.getAxisMotionValue(t);if(n&&!1!==this.constraints){const e=n.get();s[t]=function(t,n){let e=.5;const s=(0,d/* calcLength */.CQ)(t),i=(0,d/* calcLength */.CQ)(n);return i>s?e=(0,y/* progress */.q)(n.min,n.max-s,t.min):s>i&&(e=(0,y/* progress */.q)(t.min,t.max-i,n.min)),(0,M/* clamp */.q)(0,1,e)}({min:e,max:e},this.constraints[t])}}));
/**
         * Update the layout of this element and resolve the latest drag constraints
         */
const{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},""):"none",e.root&&e.root.updateScroll(),e.updateLayout(),this.resolveConstraints(),
/**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */
/**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */
(0,p/* eachAxis */.X)((n=>{if(!b(n,t,null))return;
/**
             * Calculate a new transform based on the previous box progress
             */const e=this.getAxisMotionValue(n),{min:i,max:o}=this.constraints[n];e.set((0,f/* mixNumber */.k)(i,o,s[n]))}))}addListeners(){if(!this.visualElement.current)return;L.set(this.visualElement,this);const t=this.visualElement.current,n=(0,u/* addPointerEvent */.h)(t,"pointerdown",(t=>{const{drag:n,dragListener:e=!0}=this.getProps();n&&e&&this.start(t)})),e=()=>{const{dragConstraints:t}=this.getProps();(0,v/* isRefObject */.X)(t)&&t.current&&(this.constraints=this.resolveRefConstraints())},{projection:s}=this.visualElement,i=s.addEventListener("measure",e);
/**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),T/* frame */.Gt.read(e);
/**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */
const o=(0,c/* addDomEvent */.k)(window,"resize",(()=>this.scalePositionWithinConstraints())),r=s.addEventListener("didUpdate",(({delta:t,hasLayoutChanged:n})=>{this.isDragging&&n&&((0,p/* eachAxis */.X)((n=>{const e=this.getAxisMotionValue(n);e&&(this.originPoint[n]+=t[n].translate,e.set(e.get()+t[n].translate))})),this.visualElement.render())}));
/**
         * If the element's layout changes, calculate the delta and apply that to
         * the drag gesture's origin point.
         */return()=>{o(),n(),i(),r&&r()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:e=!1,dragPropagation:s=!1,dragConstraints:i=!1,dragElastic:o=D,dragMomentum:r=!0}=t;return{...t,drag:n,dragDirectionLock:e,dragPropagation:s,dragConstraints:i,dragElastic:o,dragMomentum:r}}}function b(t,n,e){return!(!0!==n&&n!==t||null!==e&&e!==t)}// ./node_modules/framer-motion/dist/es/gestures/drag/index.mjs
class V extends s/* Feature */.X{constructor(t){super(t),this.removeGroupControls=i/* noop */.l,this.removeListeners=i/* noop */.l,this.controls=new w(t)}mount(){
// If we've been provided a DragControls for manual control over the drag gesture,
// subscribe this component to it on mount.
const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||i/* noop */.l}unmount(){this.removeGroupControls(),this.removeListeners()}}
/***/},
/***/4582:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */k:()=>/* binding */a
/* harmony export */});
/* harmony import */var s=e(2287),i=e(104);
/* harmony import */let o;function r(){o=void 0}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */const a={now:()=>(void 0===o&&a.set(i/* .frameData */.uv.isProcessing||s/* .MotionGlobalConfig */.W.useManualTiming?i/* .frameData */.uv.timestamp:performance.now()),o),set:t=>{o=t,queueMicrotask(r)}};
/***/},
/***/4768:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */Sz:()=>/* binding */r
/* harmony export */,ZZ:()=>/* binding */c
/* harmony export */,dg:()=>/* binding */a
/* harmony export */});
/* harmony import */var s=e(4043),i=e(3041),o=e(2946);
/* harmony import */const r=(0,s/* .cubicBezier */.A)(.33,1.53,.69,.99),a=(0,o/* .reverseEasing */.G)(r),c=(0,i/* .mirrorEasing */.V)(a)}
/***/,
/***/4868:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */po:()=>/* binding */o
/* harmony export */,tn:()=>/* binding */a
/* harmony export */,yT:()=>/* binding */r
/* harmony export */});
/* harmony import */var s=e(3041),i=e(2946);
/* harmony import */const o=t=>1-Math.sin(Math.acos(t)),r=(0,i/* .reverseEasing */.G)(o),a=(0,s/* .mirrorEasing */.V)(o)}
/***/,
/***/7911:
/***/(t,n,e)=>{
// EXPORTS
e.d(n,{I:()=>/* binding */a});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs
var s=e(2287);// ./node_modules/framer-motion/dist/es/frameloop/order.mjs
const i=["read",// Read
"resolveKeyframes",// Write/Read/Write/Read
"update",// Compute
"preRender",// Compute
"render",// Write
"postRender"];
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/stats/buffer.mjs
var o=e(4283);// ./node_modules/framer-motion/dist/es/frameloop/batcher.mjs
const r=40;function a(t,n){let e=!1,a=!0;const c={delta:0,timestamp:0,isProcessing:!1},u=()=>e=!0,h=i.reduce(((t,e)=>(t[e]=// ./node_modules/framer-motion/dist/es/frameloop/render-step.mjs
function(t,n){
/**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */
let e=new Set,s=new Set,i=!1,r=!1;
/**
     * A set of processes which were marked keepAlive when scheduled.
     */
const a=new WeakSet;let c={delta:0,timestamp:0,isProcessing:!1},u=0;function h(n){a.has(n)&&(l.schedule(n),t()),u++,n(c)}const l={
/**
         * Schedule a process to run on the next frame.
         */
schedule:(t,n=!1,o=!1)=>{const r=o&&i?e:s;return n&&a.add(t),r.has(t)||r.add(t),t},
/**
         * Cancel the provided callback from running on the next frame.
         */
cancel:t=>{s.delete(t),a.delete(t)},
/**
         * Execute all schedule callbacks.
         */
process:t=>{c=t,
/**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */
i?r=!0:(i=!0,[e,s]=[s,e],
// Execute this frame
e.forEach(h),
/**
             * If we're recording stats then
             */
n&&o/* statsBuffer */.Q.value&&o/* statsBuffer */.Q.value.frameloop[n].push(u),u=0,
// Clear the frame so no callbacks remain. This is to avoid
// memory leaks should this render step not run for a while.
e.clear(),i=!1,r&&(r=!1,l.process(t)))}};return l}(u,n?e:void 0),t)),{}),{read:l,resolveKeyframes:d,update:m,preRender:p,render:g,postRender:v}=h,f=()=>{const i=s/* MotionGlobalConfig */.W.useManualTiming?c.timestamp:performance.now();e=!1,s/* MotionGlobalConfig */.W.useManualTiming||(c.delta=a?1e3/60:Math.max(Math.min(i-c.timestamp,r),1)),c.timestamp=i,c.isProcessing=!0,
// Unrolled render loop for better per-frame performance
l.process(c),d.process(c),m.process(c),p.process(c),g.process(c),v.process(c),c.isProcessing=!1,e&&n&&(a=!1,t(f))};return{schedule:i.reduce(((n,s)=>{const i=h[s];return n[s]=(n,s=!1,o=!1)=>(e||(e=!0,a=!0,c.isProcessing||t(f)),i.schedule(n,s,o)),n}),{}),cancel:t=>{for(let n=0;n<i.length;n++)h[i[n]].cancel(t)},state:c,steps:h}}
/***/},
/***/8016:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */c:()=>/* binding */r
/* harmony export */});
/* harmony import */var s=e(3998),i=e(3044),o=e(1339);
/* harmony import */class r extends i/* .Feature */.X{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;
/**
         * If this element doesn't match focus-visible then don't
         * apply whileHover. But, if matches throws that focus-visible
         * is not a valid selector then in that browser outline styles will be applied
         * to the element by default and we want to match that behaviour with whileFocus.
         */try{t=this.node.current.matches(":focus-visible")}catch(n){t=!0}t&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=(0,o/* .pipe */.F)((0,s/* .addDomEvent */.k)(this.node.current,"focus",(()=>this.onFocus())),(0,s/* .addDomEvent */.k)(this.node.current,"blur",(()=>this.onBlur())))}unmount(){}}
/***/},
/***/8792:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */f:()=>/* binding */u
/* harmony export */});
/* harmony import */var s=e(1533),i=e(2901),o=e(3044),r=e(2275),a=e(104);
/* harmony import */const c=t=>(n,e)=>{t&&a/* .frame */.Gt.postRender((()=>t(n,e)))};class u extends o/* .Feature */.X{constructor(){super(...arguments),this.removePointerDownListener=s/* .noop */.l}onPointerDown(t){this.session=new r/* .PanSession */.Q(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint()})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:e,onPanEnd:s}=this.node.getProps();return{onSessionStart:c(t),onStart:c(n),onMove:e,onEnd:(t,n)=>{delete this.session,s&&a/* .frame */.Gt.postRender((()=>s(t,n)))}}}mount(){this.removePointerDownListener=(0,i/* .addPointerEvent */.h)(this.node.current,"pointerdown",(t=>this.onPointerDown(t)))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}
/***/},
/***/9268:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */k:()=>/* binding */i
/* harmony export */});
/* unused harmony export cancelMicrotask */
/* harmony import */var s=e(7911);const{schedule:i,cancel:o}=(0,s/* .createRenderBatcher */.I)(queueMicrotask,!1);
/***/},
/***/9531:
/***/(t,n,e)=>{
/* harmony export */e.d(n,{
/* harmony export */F:()=>/* binding */o
/* harmony export */,e:()=>/* binding */i
/* harmony export */});
/* harmony import */var s=e(1795);function i(t){return{point:{x:t.pageX,y:t.pageY}}}const o=t=>n=>(0,s/* .isPrimaryPointer */.Mc)(n)&&t(n,i(n));
/***/}}]);