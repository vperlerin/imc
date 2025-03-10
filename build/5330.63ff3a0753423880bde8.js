"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[5330],{
/***/990:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{z:()=>/* binding */a});
// EXTERNAL MODULE: ./node_modules/react/index.js
var i=n(6540),s=n(5153),r=n(837),o=n(6551);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
// ./node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function a(e){const{initial:t,animate:n}=// ./node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function(e,t){if((0,r/* isControllingVariants */.e)(e)){const{initial:t,animate:n}=e;return{initial:!1===t||(0,o/* isVariantLabel */.w)(t)?t:void 0,animate:(0,o/* isVariantLabel */.w)(n)?n:void 0}}return!1!==e.inherit?t:{}}(e,(0/* MotionContext */,i.useContext)(s.A));return(0,i.useMemo)((()=>({initial:t,animate:n})),[l(t),l(n)])}function l(e){return Array.isArray(e)?e.join(" "):e}
/***/},
/***/1712:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */p:()=>/* binding */i
/* harmony export */});const i=e=>Array.isArray(e);
/***/},
/***/2392:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */n:()=>/* binding */i
/* harmony export */});const i="data-"+(0,n(8062).I)("framerAppearId")}
/***/,
/***/2956:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */z:()=>/* binding */o
/* harmony export */});
/* harmony import */var i=n(4785),s=n(9896),r=n(8853);
/* harmony import */function o(e,t,n){const o=(0,s/* .isMotionValue */.S)(e)?e:(0,i/* .motionValue */.OQ)(e);return o.start((0,r/* .animateMotionValue */.f)("",o,t,n)),o.animation}
/***/},
/***/3717:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */N:()=>/* binding */i
/* harmony export */});
/**
 * Internal, exported only for usage in Framer
 */
const i=(0,n(6540).createContext)({});
/***/},
/***/4458:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */P:()=>/* binding */s
/* harmony export */});
/* harmony import */var i=n(2392);function s(e){return e.props[i/* .optimizedAppearDataAttribute */.n]}
/***/},
/***/4513:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */$:()=>/* binding */s
/* harmony export */});
/* harmony import */var i=n(7312);function s(e){return"number"==typeof e?0===e:null===e||("none"===e||"0"===e||(0,i/* .isZeroValueString */.$)(e))}
/***/},
/***/5153:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */A:()=>/* binding */i
/* harmony export */});const i=(0,n(6540).createContext)({});
/***/},
/***/5446:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Q:()=>/* binding */i
/* harmony export */});
/**
 * @public
 */
const i=(0,n(6540).createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});
/***/},
/***/5490:
/***/(e,t,n)=>{function i(e){return null!==e&&"object"==typeof e&&"function"==typeof e.start}
/***/
/* harmony export */n.d(t,{
/* harmony export */N:()=>/* binding */i
/* harmony export */})},
/***/6048:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */Y:()=>/* binding */i
/* harmony export */});const i=(0,n(6540).createContext)({strict:!1});
/***/},
/***/6221:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{N:()=>/* binding */v});
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var i=n(4848),s=n(6540),r=n(9473),o=n(8601),a=n(6719),l=n(5446);
// EXTERNAL MODULE: ./node_modules/react/index.js
/**
 * Measurement functionality has to be within a separate component
 * to leverage snapshot lifecycle.
 */
class u extends s.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=t.offsetParent,n=e instanceof HTMLElement&&e.offsetWidth||0,i=this.props.sizeRef.current;i.height=t.offsetHeight||0,i.width=t.offsetWidth||0,i.top=t.offsetTop,i.left=t.offsetLeft,i.right=n-i.width-i.left}return null}
/**
     * Required with getSnapshotBeforeUpdate to stop React complaining.
     */componentDidUpdate(){}render(){return this.props.children}}function c({children:e,isPresent:t,anchorX:n}){const r=(0,s.useId)(),o=(0,s.useRef)(null),a=(0,s.useRef)({width:0,height:0,top:0,left:0,right:0}),{nonce:c}=(0/* MotionConfigContext */,s.useContext)(l.Q);
/**
     * We create and inject a style block so we can apply this explicit
     * sizing in a non-destructive manner by just deleting the style block.
     *
     * We can't apply size via render as the measurement happens
     * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
     * styles directly on the DOM node, we might be overwriting
     * styles set via the style prop.
     */
/**
     * We create and inject a style block so we can apply this explicit
     * sizing in a non-destructive manner by just deleting the style block.
     *
     * We can't apply size via render as the measurement happens
     * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
     * styles directly on the DOM node, we might be overwriting
     * styles set via the style prop.
     */
return(0,s.useInsertionEffect)((()=>{const{width:e,height:i,top:s,left:l,right:u}=a.current;if(t||!o.current||!e||!i)return;const h="left"===n?`left: ${l}`:`right: ${u}`;o.current.dataset.motionPopId=r;const d=document.createElement("style");return c&&(d.nonce=c),document.head.appendChild(d),d.sheet&&d.sheet.insertRule(`\n          [data-motion-pop-id="${r}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${i}px !important;\n            ${h}px !important;\n            top: ${s}px !important;\n          }\n        `),()=>{document.head.removeChild(d)}}),[t]),(0,i.jsx)(u,{isPresent:t,childRef:o,sizeRef:a,children:s.cloneElement(e,{ref:o})})}const h=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:l,presenceAffectsLayout:u,mode:h,anchorX:p})=>{const m=(0,o/* useConstant */.M)(d),f=(0,s.useId)(),y=(0,s.useCallback)((e=>{m.set(e,!0);for(const e of m.values())if(!e)return;// can stop searching when any is incomplete
r&&r()}),[m,r]),v=(0,s.useMemo)((()=>({id:f,initial:t,isPresent:n,custom:l,onExitComplete:y,register:e=>(m.set(e,!1),()=>m.delete(e))})
/**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */),u?[Math.random(),y]:[n,y]);return(0,s.useMemo)((()=>{m.forEach(((e,t)=>m.set(t,!1)))}),[n]),
/**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */
s.useEffect((()=>{!n&&!m.size&&r&&r()}),[n]),"popLayout"===h&&(e=(0,i.jsx)(c,{isPresent:n,anchorX:p,children:e})),(0/* PresenceContext */,i.jsx)(a.t.Provider,{value:v,children:e})};function d(){return new Map}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var p=n(9120);// ./node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
const m=e=>e.key||"";function f(e){const t=[];
// We use forEach here instead of map as map mutates the component key by preprending `.$`
return s.Children.forEach(e,(e=>{(0,s.isValidElement)(e)&&t.push(e)})),t}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var y=n(5128);
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
const v=({children:e,custom:t,initial:n=!0,onExitComplete:a,presenceAffectsLayout:l=!0,mode:u="sync",propagate:c=!1,anchorX:d="left"})=>{const[v,g]=(0,p/* usePresence */.xQ)(c),T=(0,s.useMemo)((()=>f(e)),[e]),P=c&&!v?[]:T.map(m),k=(0,s.useRef)(!0),M=(0,s.useRef)(T),w=(0,o/* useConstant */.M)((()=>new Map)),[x,C]=(0,s.useState)(T),[b,S]=(0,s.useState)(T);
/**
     * Filter any children that aren't ReactElements. We can only track components
     * between renders with a props.key.
     */(0,y/* useIsomorphicLayoutEffect */.E)((()=>{k.current=!1,M.current=T;
/**
         * Update complete status of exiting children.
         */
for(let e=0;e<b.length;e++){const t=m(b[e]);P.includes(t)?w.delete(t):!0!==w.get(t)&&w.set(t,!1)}}),[b,P.length,P.join("-")]);const A=[];if(T!==x){let e=[...T];
/**
         * Loop through all the currently rendered components and decide which
         * are exiting.
         */for(let t=0;t<b.length;t++){const n=b[t],i=m(n);P.includes(i)||(e.splice(t,0,n),A.push(n))}
/**
         * If we're in "wait" mode, and we have exiting children, we want to
         * only render these until they've all exited.
         */
/**
         * Early return to ensure once we've set state with the latest diffed
         * children, we can immediately re-render.
         */
return"wait"===u&&A.length&&(e=A),S(f(e)),C(T),null}
/**
     * If we've been provided a forceRender function by the LayoutGroupContext,
     * we can use it to force a re-render amongst all surrounding components once
     * all components have finished animating out.
     */
const{forceRender:D}=(0/* LayoutGroupContext */,s.useContext)(r.L);return(0,i.jsx)(i.Fragment,{children:b.map((e=>{const s=m(e),r=!(c&&!v)&&(T===b||P.includes(s));return(0,i.jsx)(h,{isPresent:r,initial:!(k.current&&!n)&&void 0,custom:t,presenceAffectsLayout:l,mode:u,onExitComplete:r?void 0:()=>{if(!w.has(s))return;w.set(s,!0);let e=!0;w.forEach((t=>{t||(e=!1)})),e&&(null==D||D(),S(M.current),c&&(null==g||g()),a&&a())},anchorX:d,children:e},s)}))})};
/***/},
/***/6719:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */t:()=>/* binding */i
/* harmony export */});
/**
 * @public
 */
const i=

(0,n(6540).createContext)(null);
/***/},
/***/7523:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{_:()=>/* binding */f});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
var i=n(7118),s=n(1795),r=n(5972),o=n(4714),a=n(29),l=n(4458),u=n(8853),c=n(104);
// EXTERNAL MODULE: ./node_modules/motion-dom/dist/es/index.mjs + 32 modules
// ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function h({protectedKeys:e,needsAnimating:t},n){const i=e.hasOwnProperty(n)&&!0!==t[n];return t[n]=!1,i}function d(e,t,{delay:n=0,transitionOverride:i,type:d}={}){var p;let{transition:m=e.getDefaultTransition(),transitionEnd:f,...y}=t;i&&(m=i);const v=[],g=d&&e.animationState&&e.animationState.getState()[d];for(const t in y){const i=e.getValue(t,null!==(p=e.latestValues[t])&&void 0!==p?p:null),o=y[t];if(void 0===o||g&&h(g,t))continue;const d={delay:n,...(0,s/* getValueTransition */.rU)(m||{},t)};
/**
         * If this is the first time a value is being animated, check
         * to see if we're handling off from an existing animation.
         */let f=!1;if(window.MotionHandoffAnimation){const n=(0,l/* getOptimisedAppearId */.P)(e);if(n){const e=window.MotionHandoffAnimation(n,t,c/* frame */.Gt);null!==e&&(d.startTime=e,f=!0)}}(0,a/* addValueToWillChange */.g)(e,t),i.start((0,u/* animateMotionValue */.f)(t,i,o,e.shouldReduceMotion&&r/* positionalKeys */.$.has(t)?{type:!1}:d,e,f));const T=i.animation;T&&v.push(T)}return f&&Promise.all(v).then((()=>{c/* frame */.Gt.update((()=>{f&&(0,o/* setTarget */.U)(e,f)}))})),v}// ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function p(e,t,n={}){var s;const r=(0,i/* resolveVariant */.K)(e,t,"exit"===n.type?null===(s=e.presenceContext)||void 0===s?void 0:s.custom:void 0);let{transition:o=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(o=n.transitionOverride)
/**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */;const a=r?()=>Promise.all(d(e,r,n)):()=>Promise.resolve()
/**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */,l=e.variantChildren&&e.variantChildren.size?(i=0)=>{const{delayChildren:s=0,staggerChildren:r,staggerDirection:a}=o;return function(e,t,n=0,i=0,s=1,r){const o=[],a=(e.variantChildren.size-1)*i,l=1===s?(e=0)=>e*i:(e=0)=>a-e*i;return Array.from(e.variantChildren).sort(m).forEach(((e,i)=>{e.notify("AnimationStart",t),o.push(p(e,t,{...r,delay:n+l(i)}).then((()=>e.notify("AnimationComplete",t))))})),Promise.all(o)}(e,t,s+i,r,a,n)}:()=>Promise.resolve()
/**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */,{when:u}=o;if(u){const[e,t]="beforeChildren"===u?[a,l]:[l,a];return e().then((()=>t()))}return Promise.all([a(),l(n.delay)])}function m(e,t){return e.sortNodePosition(t)}// ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function f(e,t,n={}){let s;if(e.notify("AnimationStart",t),Array.isArray(t)){const i=t.map((t=>p(e,t,n)));s=Promise.all(i)}else if("string"==typeof t)s=p(e,t,n);else{const r="function"==typeof t?(0,i/* resolveVariant */.K)(e,t,n.custom):t;s=Promise.all(d(e,r,n))}return s.then((()=>{e.notify("AnimationComplete",t)}))}
/***/},
/***/8853:
/***/(e,t,n)=>{
// EXPORTS
n.d(t,{f:()=>/* binding */ve});
// EXTERNAL MODULE: ./node_modules/motion-dom/dist/es/index.mjs + 32 modules
var i=n(1795),s=n(7331),r=n(104),o=n(2287),a=n(9652),l=n(1533),u=n(309),c=n(4768),h=n(4868),d=n(5133),p=n(4582),m=n(4835),f=n(8104),y=n(4552);
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/time-conversion.mjs
// ./node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
const v=(e,t)=>
// If the list of keys tat might be non-animatable grows, replace with Set
"zIndex"!==t&&(
// If it's a number or a keyframes array, we can animate it. We might at some point
// need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
// but for now lets leave it like this for performance reasons
!("number"!=typeof e&&!Array.isArray(e))||!("string"!=typeof e||// It's animatable if we have a string
!y/* complex */.f.test(e)&&"0"!==e||e.startsWith("url(")));// ./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
const g=e=>null!==e;function T(e,{repeat:t,repeatType:n="loop"},i){const s=e.filter(g),r=t&&"loop"!==n&&t%2==1?0:s.length-1;return r&&void 0!==i?i:s[r]}class P{constructor({autoplay:e=!0,delay:t=0,type:n="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:r="loop",...o}){
// Track whether the animation has been stopped. Stopped animations won't restart.
this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=p/* time */.k.now(),this.options={autoplay:e,delay:t,type:n,repeat:i,repeatDelay:s,repeatType:r,...o},this.updateFinishedPromise()}
/**
     * This method uses the createdAt and resolvedAt to calculate the
     * animation startTime. *Ideally*, we would use the createdAt time as t=0
     * as the following frame would then be the first frame of the animation in
     * progress, which would feel snappier.
     *
     * However, if there's a delay (main thread work) between the creation of
     * the animation and the first commited frame, we prefer to use resolvedAt
     * to avoid a sudden jump into the animation.
     */calcStartTime(){return this.resolvedAt&&this.resolvedAt-this.createdAt>40?this.resolvedAt:this.createdAt}
/**
     * A getter for resolved data. If keyframes are not yet resolved, accessing
     * this.resolved will synchronously flush all pending keyframe resolvers.
     * This is a deoptimisation, but at its worst still batches read/writes.
     */get resolved(){return this._resolved||this.hasAttemptedResolve||(0,m/* flushKeyframeResolvers */.q)(),this._resolved}
/**
     * A method to be called when the keyframes resolver completes. This method
     * will check if its possible to run the animation and, if not, skip it.
     * Otherwise, it will call initPlayback on the implementing class.
     */onKeyframesResolved(e,t){this.resolvedAt=p/* time */.k.now(),this.hasAttemptedResolve=!0;const{name:n,type:s,velocity:r,delay:o,onComplete:l,onUpdate:u,isGenerator:c}=this.options;
/**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */if(!c&&!function(e,t,n,s){
/**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */
const r=e[0];if(null===r)return!1;
/**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */if("display"===t||"visibility"===t)return!0;const o=e[e.length-1],a=v(r,t),l=v(o,t);
// Always skip if any of these are true
return(0,f/* warning */.$)(a===l,`You are trying to animate ${t} from "${r}" to "${o}". ${r} is not an animatable value - to enable this animation set ${r} to a value animatable to ${o} via the \`style\` property.`),!(!a||!l)&&(// ./node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs
function(e){const t=e[0];if(1===e.length)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}(e)||("spring"===n||(0,i/* isGenerator */.WH)(n))&&s)}(e,n,s,r)){
// Finish immediately
if(a/* instantAnimationState */.d.current||!o)return u&&u(T(e,this.options,t)),l&&l(),void this.resolveFinishedPromise();this.options.duration=0}const h=this.initPlayback(e,t);!1!==h&&(this._resolved={keyframes:e,finalKeyframe:t,...h},this.onPostResolved())}onPostResolved(){}
/**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */then(e,t){return this.currentFinishedPromise.then(e,t)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise((e=>{this.resolveFinishedPromise=e}))}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/stats/animation-count.mjs
var k=n(5151),M=n(2464),w=n(8799),x=n(1339),C=n(7177);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/clamp.mjs
// ms
function b(e,t,n){const i=Math.max(t-5,0);return(0,C/* velocityPerSecond */.f)(n-e(i),t-i)}// ./node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs
const S=100,A=10,D=1,R=0,E=800,F=.3,$=.3,q={granular:.01,default:2},K={granular:.005,default:.5},U=.01,O=10,j=.05,G=1,I=.001;function X({duration:e=E,bounce:t=F,velocity:n=R,mass:i=D}){let r,o;(0,f/* warning */.$)(e<=(0,s/* secondsToMilliseconds */.f)(O),"Spring duration must be 10 seconds or less");let a=1-t;
/**
     * Restrict dampingRatio and duration to within acceptable ranges.
     */a=(0,M/* clamp */.q)(j,G,a),e=(0,M/* clamp */.q)(U,O,(0,s/* millisecondsToSeconds */.X)(e)),a<1?(
/**
         * Underdamped spring
         */
r=t=>{const i=t*a,s=i*e,r=i-n,o=L(t,a),l=Math.exp(-s);return I-r/o*l},o=t=>{const i=t*a*e,s=i*n+n,o=Math.pow(a,2)*Math.pow(t,2)*e,l=Math.exp(-i),u=L(Math.pow(t,2),a);return(-r(t)+I>0?-1:1)*((s-o)*l)/u}):(
/**
         * Critically-damped spring
         */
r=t=>Math.exp(-t*e)*((t-n)*e+1)-.001,o=t=>Math.exp(-t*e)*(e*e*(n-t)));const l=function(e,t,n){let i=n;for(let n=1;n<V;n++)i-=e(i)/t(i);return i}(r,o,5/e);if(e=(0,s/* secondsToMilliseconds */.f)(e),isNaN(l))return{stiffness:S,damping:A,duration:e};{const t=Math.pow(l,2)*i;return{stiffness:t,damping:2*a*Math.sqrt(i*t),duration:e}}}const V=12;function L(e,t){return e*Math.sqrt(1-t*t)}// ./node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs
const W=["duration","bounce"],_=["stiffness","damping","mass"];function z(e,t){return t.some((t=>void 0!==e[t]))}function H(e=$,t=F){const n="object"!=typeof e?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:r,restDelta:o}=n;const a=n.keyframes[0],l=n.keyframes[n.keyframes.length-1],u={done:!1,value:a},{stiffness:c,damping:h,mass:d,duration:p,velocity:m,isResolvedFromDuration:f}=function(e){let t={velocity:R,stiffness:S,damping:A,mass:D,isResolvedFromDuration:!1,...e};
// stiffness/damping/mass overrides duration/bounce
if(!z(e,_)&&z(e,W))if(e.visualDuration){const n=e.visualDuration,i=2*Math.PI/(1.2*n),s=i*i,r=2*(0,M/* clamp */.q)(.05,1,1-(e.bounce||0))*Math.sqrt(s);t={...t,mass:D,stiffness:s,damping:r}}else{const n=X(e);t={...t,...n,mass:D},t.isResolvedFromDuration=!0}return t}({...n,velocity:-(0,s/* millisecondsToSeconds */.X)(n.velocity||0)}),y=m||0,v=h/(2*Math.sqrt(c*d)),g=l-a,T=(0,s/* millisecondsToSeconds */.X)(Math.sqrt(c/d)),P=Math.abs(g)<5;let k;if(r||(r=P?q.granular:q.default),o||(o=P?K.granular:K.default),v<1){const e=L(T,v);
// Underdamped spring
k=t=>{const n=Math.exp(-v*T*t);return l-n*((y+v*T*g)/e*Math.sin(e*t)+g*Math.cos(e*t))}}else if(1===v)
// Critically damped spring
k=e=>l-Math.exp(-T*e)*(g+(y+T*g)*e);else{
// Overdamped spring
const e=T*Math.sqrt(v*v-1);k=t=>{const n=Math.exp(-v*T*t),i=Math.min(e*t,300);
// When performing sinh or cosh values can hit Infinity so we cap them here
return l-n*((y+v*T*g)*Math.sinh(i)+e*g*Math.cosh(i))/e}}const w={calculatedDuration:f&&p||null,next:e=>{const t=k(e);if(f)u.done=e>=p;else{let n=0;
/**
                 * We only need to calculate velocity for under-damped springs
                 * as over- and critically-damped springs can't overshoot, so
                 * checking only for displacement is enough.
                 */v<1&&(n=0===e?(0,s/* secondsToMilliseconds */.f)(y):b(k,e,t));const i=Math.abs(n)<=r,a=Math.abs(l-t)<=o;u.done=i&&a}return u.value=u.done?l:t,u},toString:()=>{const e=Math.min((0,i/* calcGeneratorDuration */.tu)(w),i/* maxGeneratorDuration */.YE),t=(0,i/* generateLinearEasing */.KZ)((t=>w.next(e*t).value),e,30);return e+"ms "+t}};return w}// ./node_modules/framer-motion/dist/es/animation/generators/inertia.mjs
function Q({keyframes:e,velocity:t=0,power:n=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:u=.5,restSpeed:c}){const h=e[0],d={done:!1,value:h},p=e=>void 0===a?l:void 0===l||Math.abs(a-e)<Math.abs(l-e)?a:l;let m=n*t;const f=h+m,y=void 0===o?f:o(f);
/**
     * If the target has changed we need to re-calculate the amplitude, otherwise
     * the animation will start from the wrong position.
     */
y!==f&&(m=y-h);const v=e=>-m*Math.exp(-e/i),g=e=>y+v(e),T=e=>{const t=v(e),n=g(e);d.done=Math.abs(t)<=u,d.value=d.done?y:n};
/**
     * Ideally this would resolve for t in a stateless way, we could
     * do that by always precalculating the animation but as we know
     * this will be done anyway we can assume that spring will
     * be discovered during that.
     */
let P,k;const M=e=>{var t;(t=d.value,void 0!==a&&t<a||void 0!==l&&t>l)&&(P=e,k=H({keyframes:[d.value,p(d.value)],velocity:b(g,e,d.value),// TODO: This should be passing * 1000
damping:s,stiffness:r,restDelta:u,restSpeed:c}))};return M(0),{calculatedDuration:null,next:e=>{
/**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */
let t=!1;
/**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */
return k||void 0!==P||(t=!0,T(e),M(e)),void 0!==P&&e>=P?k.next(e-P):(!t&&T(e),d)}}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/easing/ease.mjs
var N=n(3771),Z=n(176),Y=n(983),B=n(8844),J=n(3490),ee=n(951);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs
// ./node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs
function te(e,t){return e.map((()=>t||N/* easeInOut */.am)).splice(0,e.length-1)}function ne({duration:e=300,keyframes:t,times:n,ease:i="easeInOut"}){
/**
     * Easing functions can be externally defined as strings. Here we convert them
     * into actual functions.
     */
const s=(0,Z/* isEasingArray */.h)(i)?i.map(Y/* easingDefinitionToFunction */.K):(0,Y/* easingDefinitionToFunction */.K)(i),r={done:!1,value:t[0]},o=(0,ee/* convertOffsetToTimes */.A)(
// Only use the provided offsets if they're the correct length
// TODO Maybe we should warn here if there's a length mismatch
n&&n.length===t.length?n:(0,J/* defaultOffset */.Z)(t),e),a=(0,B/* interpolate */.G)(o,t,{ease:Array.isArray(s)?s:te(t,s)});
/**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */return{calculatedDuration:e,next:t=>(r.value=a(t),r.done=t>=e,r)}}// ./node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs
const ie=e=>{const t=({timestamp:t})=>e(t);return{start:()=>r/* frame */.Gt.update(t,!0),stop:()=>(0,r/* cancelFrame */.WG)(t)
/**
         * If we're processing this frame we can use the
         * framelocked timestamp to keep things in sync.
         */,now:()=>r/* frameData */.uv.isProcessing?r/* frameData */.uv.timestamp:p/* time */.k.now()}},se={decay:Q,inertia:Q,tween:ne,keyframes:ne,spring:H},re=e=>e/100
/**
 * Animation that runs on the main thread. Designed to be WAAPI-spec in the subset of
 * features we expose publically. Mostly the compatibility is to ensure visual identity
 * between both WAAPI and main thread animations.
 */;class oe extends P{constructor(e){super(e),
/**
         * The time at which the animation was paused.
         */
this.holdTime=null,
/**
         * The time at which the animation was cancelled.
         */
this.cancelTime=null,
/**
         * The current time of the animation.
         */
this.currentTime=0,
/**
         * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
         */
this.playbackSpeed=1,
/**
         * The state of the animation to apply when the animation is resolved. This
         * allows calls to the public API to control the animation before it is resolved,
         * without us having to resolve it first.
         */
this.pendingPlayState="running",
/**
         * The time at which the animation was started.
         */
this.startTime=null,this.state="idle",
/**
         * This method is bound to the instance to fix a pattern where
         * animation.stop is returned as a reference from a useEffect.
         */
this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,"idle"===this.state)return;this.teardown();const{onStop:e}=this.options;e&&e()};const{name:t,motionValue:n,element:i,keyframes:s}=this.options,r=(null==i?void 0:i.KeyframeResolver)||m/* KeyframeResolver */.h;this.resolver=new r(s,((e,t)=>this.onKeyframesResolved(e,t)),t,n,i),this.resolver.scheduleResolve()}flatten(){super.flatten(),
// If we've already resolved the animation, re-initialise it
this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(e){const{type:t="keyframes",repeat:n=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=(0,i/* isGenerator */.WH)(t)?t:se[t]||ne;
/**
         * If our generator doesn't support mixing numbers, we need to replace keyframes with
         * [0, 100] and then make a function that maps that to the actual keyframes.
         *
         * 100 is chosen instead of 1 as it works nicer with spring animations.
         */
let l,u;a!==ne&&"number"!=typeof e[0]&&(l=(0,x/* pipe */.F)(re,(0,w/* mix */.j)(e[0],e[1])),e=[0,100]);const c=a({...this.options,keyframes:e});
/**
         * If we have a mirror repeat type we need to create a second generator that outputs the
         * mirrored (not reversed) animation and later ping pong between the two generators.
         */"mirror"===r&&(u=a({...this.options,keyframes:[...e].reverse(),velocity:-o}))
/**
         * If duration is undefined and we have repeat options,
         * we need to calculate a duration from the generator.
         *
         * We set it to the generator itself to cache the duration.
         * Any timeline resolver will need to have already precalculated
         * the duration by this step.
         */,null===c.calculatedDuration&&(c.calculatedDuration=(0,i/* calcGeneratorDuration */.tu)(c));const{calculatedDuration:h}=c,d=h+s;return{generator:c,mirroredGenerator:u,mapPercentToKeyframes:l,calculatedDuration:h,resolvedDuration:d,totalDuration:d*(n+1)-s}}onPostResolved(){const{autoplay:e=!0}=this.options;k/* activeAnimations */.q.mainThread++,this.play(),"paused"!==this.pendingPlayState&&e?this.state=this.pendingPlayState:this.pause()}tick(e,t=!1){const{resolved:n}=this;
// If the animations has failed to resolve, return the final keyframe.
if(!n){const{keyframes:e}=this.options;return{done:!0,value:e[e.length-1]}}const{finalKeyframe:i,generator:s,mirroredGenerator:r,mapPercentToKeyframes:o,keyframes:a,calculatedDuration:l,totalDuration:u,resolvedDuration:c}=n;if(null===this.startTime)return s.next(0);const{delay:h,repeat:d,repeatType:p,repeatDelay:m,onUpdate:f}=this.options;
/**
         * requestAnimationFrame timestamps can come through as lower than
         * the startTime as set by performance.now(). Here we prevent this,
         * though in the future it could be possible to make setting startTime
         * a pending operation that gets resolved here.
         */this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-u/this.speed,this.startTime)),
// Update currentTime
t?this.currentTime=e:null!==this.holdTime?this.currentTime=this.holdTime:
// Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
// 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
// example.
this.currentTime=Math.round(e-this.startTime)*this.speed;
// Rebase on delay
const y=this.currentTime-h*(this.speed>=0?1:-1),v=this.speed>=0?y<0:y>u;this.currentTime=Math.max(y,0),
// If this animation has finished, set the current time  to the total duration.
"finished"===this.state&&null===this.holdTime&&(this.currentTime=u);let g=this.currentTime,P=s;if(d){
/**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
const e=Math.min(this.currentTime,u)/c;
/**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */let t=Math.floor(e),n=e%1;
/**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
/**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
!n&&e>=1&&(n=1),1===n&&t--,t=Math.min(t,d+1);Boolean(t%2)&&("reverse"===p?(n=1-n,m&&(n-=m/c)):"mirror"===p&&(P=r)),g=(0,M/* clamp */.q)(0,1,n)*c}
/**
         * If we're in negative time, set state as the initial keyframe.
         * This prevents delay: x, duration: 0 animations from finishing
         * instantly.
         */const k=v?{done:!1,value:a[0]}:P.next(g);o&&(k.value=o(k.value));let{done:w}=k;v||null===l||(w=this.speed>=0?this.currentTime>=u:this.currentTime<=0);const x=null===this.holdTime&&("finished"===this.state||"running"===this.state&&w);return x&&void 0!==i&&(k.value=T(a,this.options,i)),f&&f(k.value),x&&this.finish(),k}get duration(){const{resolved:e}=this;return e?(0,s/* millisecondsToSeconds */.X)(e.calculatedDuration):0}get time(){return(0,s/* millisecondsToSeconds */.X)(this.currentTime)}set time(e){e=(0,s/* secondsToMilliseconds */.f)(e),this.currentTime=e,null!==this.holdTime||0===this.speed?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.speed)}get speed(){return this.playbackSpeed}set speed(e){const t=this.playbackSpeed!==e;this.playbackSpeed=e,t&&(this.time=(0,s/* millisecondsToSeconds */.X)(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved)return void(this.pendingPlayState="running");if(this.isStopped)return;const{driver:e=ie,onPlay:t,startTime:n}=this.options;this.driver||(this.driver=e((e=>this.tick(e)))),t&&t();const i=this.driver.now();null!==this.holdTime?this.startTime=i-this.holdTime:this.startTime?"finished"===this.state&&(this.startTime=i):this.startTime=null!=n?n:this.calcStartTime(),"finished"===this.state&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,
/**
         * Set playState to running only after we've used it in
         * the previous logic.
         */
this.state="running",this.driver.start()}pause(){var e;this._resolved?(this.state="paused",this.holdTime=null!==(e=this.currentTime)&&void 0!==e?e:0):this.pendingPlayState="paused"}complete(){"running"!==this.state&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";const{onComplete:e}=this.options;e&&e()}cancel(){null!==this.cancelTime&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel(),k/* activeAnimations */.q.mainThread--}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}}
// Legacy interface
// ./node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs
/**
 * A list of values that can be hardware-accelerated.
 */
const ae=new Set(["opacity","clipPath","filter","transform"]);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/stats/buffer.mjs
var le=n(4283);// ./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs
const ue=(0,n(4435).p)((()=>Object.hasOwnProperty.call(Element.prototype,"animate")));const ce={anticipate:u/* anticipate */.b,backInOut:c/* backInOut */.ZZ,circInOut:h/* circInOut */.tn};class he extends P{constructor(e){super(e);const{name:t,motionValue:n,element:i,keyframes:s}=this.options;this.resolver=new d/* DOMKeyframesResolver */.K(s,((e,t)=>this.onKeyframesResolved(e,t)),t,n,i),this.resolver.scheduleResolve()}initPlayback(e,t){let{duration:n=300,times:s,ease:r,type:o,motionValue:a,name:l,startTime:u}=this.options;
/**
         * If element has since been unmounted, return false to indicate
         * the animation failed to initialised.
         */if(!a.owner||!a.owner.current)return!1;
/**
         * If the user has provided an easing function name that isn't supported
         * by WAAPI (like "anticipate"), we need to provide the corressponding
         * function. This will later get converted to a linear() easing function.
         */var c;
/**
         * If this animation needs pre-generated keyframes then generate.
         */
if("string"==typeof r&&(0,i/* supportsLinearEasing */.nL)()&&r in ce&&(r=ce[r]),c=this.options,(0,i/* isGenerator */.WH)(c.type)||"spring"===c.type||!(0,i/* isWaapiSupportedEasing */.yL)(c.ease)){const{onComplete:t,onUpdate:i,motionValue:a,element:l,...u}=this.options,c=function(e,t){
/**
     * Create a main-thread animation to pregenerate keyframes.
     * We sample this at regular intervals to generate keyframes that we then
     * linearly interpolate between.
     */
const n=new oe({...t,keyframes:e,repeat:0,delay:0,isGenerator:!0});let i={done:!1,value:e[0]};const s=[];
/**
     * Bail after 20 seconds of pre-generated keyframes as it's likely
     * we're heading for an infinite loop.
     */let r=0;for(;!i.done&&r<2e4;)i=n.sample(r),s.push(i.value),r+=10;return{times:void 0,keyframes:s,duration:r-10,ease:"linear"}}(e,u);
// If this is a very short animation, ensure we have
// at least two keyframes to animate between as older browsers
// can't animate between a single keyframe.
1===(e=c.keyframes).length&&(e[1]=e[0]),n=c.duration,s=c.times,r=c.ease,o="keyframes"}const h=// ./node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs
function(e,t,n,{delay:s=0,duration:r=300,repeat:o=0,repeatType:a="loop",ease:l="easeInOut",times:u}={}){const c={[t]:n};u&&(c.offset=u);const h=(0,i/* mapEasingToNativeEasing */.TU)(l,r);
/**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */Array.isArray(h)&&(c.easing=h),le/* statsBuffer */.Q.value&&k/* activeAnimations */.q.waapi++;const d=e.animate(c,{delay:s,duration:r,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:o+1,direction:"reverse"===a?"alternate":"normal"});return le/* statsBuffer */.Q.value&&d.finished.finally((()=>{k/* activeAnimations */.q.waapi--})),d}
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/memo.mjs
(a.owner.current,l,e,{...this.options,duration:n,times:s,ease:r});
// Override the browser calculated startTime with one synchronised to other JS
// and WAAPI animations starting this event loop.
return h.startTime=null!=u?u:this.calcStartTime(),this.pendingTimeline?((0,i/* attachTimeline */.vG)(h,this.pendingTimeline),this.pendingTimeline=void 0):
/**
             * Prefer the `onfinish` prop as it's more widely supported than
             * the `finished` promise.
             *
             * Here, we synchronously set the provided MotionValue to the end
             * keyframe. If we didn't, when the WAAPI animation is finished it would
             * be removed from the element which would then revert to its old styles.
             */
h.onfinish=()=>{const{onComplete:n}=this.options;a.set(T(e,this.options,t)),n&&n(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:n,times:s,type:o,ease:r,keyframes:e}}get duration(){const{resolved:e}=this;if(!e)return 0;const{duration:t}=e;return(0,s/* millisecondsToSeconds */.X)(t)}get time(){const{resolved:e}=this;if(!e)return 0;const{animation:t}=e;return(0,s/* millisecondsToSeconds */.X)(t.currentTime||0)}set time(e){const{resolved:t}=this;if(!t)return;const{animation:n}=t;n.currentTime=(0,s/* secondsToMilliseconds */.f)(e)}get speed(){const{resolved:e}=this;if(!e)return 1;const{animation:t}=e;return t.playbackRate}set speed(e){const{resolved:t}=this;if(!t)return;const{animation:n}=t;n.playbackRate=e}get state(){const{resolved:e}=this;if(!e)return"idle";const{animation:t}=e;return t.playState}get startTime(){const{resolved:e}=this;if(!e)return null;const{animation:t}=e;
// Coerce to number as TypeScript incorrectly types this
// as CSSNumberish
return t.startTime}
/**
     * Replace the default DocumentTimeline with another AnimationTimeline.
     * Currently used for scroll animations.
     */attachTimeline(e){if(this._resolved){const{resolved:t}=this;if(!t)return l/* noop */.l;const{animation:n}=t;(0,i/* attachTimeline */.vG)(n,e)}else this.pendingTimeline=e;return l/* noop */.l}play(){if(this.isStopped)return;const{resolved:e}=this;if(!e)return;const{animation:t}=e;"finished"===t.playState&&this.updateFinishedPromise(),t.play()}pause(){const{resolved:e}=this;if(!e)return;const{animation:t}=e;t.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,"idle"===this.state)return;this.resolveFinishedPromise(),this.updateFinishedPromise();const{resolved:e}=this;if(!e)return;const{animation:t,keyframes:n,duration:i,type:r,ease:o,times:a}=e;if("idle"===t.playState||"finished"===t.playState)return;
/**
         * WAAPI doesn't natively have any interruption capabilities.
         *
         * Rather than read commited styles back out of the DOM, we can
         * create a renderless JS animation and sample it twice to calculate
         * its current value, "previous" value, and therefore allow
         * Motion to calculate velocity for any subsequent animation.
         */if(this.time){const{motionValue:e,onUpdate:t,onComplete:l,element:u,...c}=this.options,h=new oe({...c,keyframes:n,duration:i,type:r,ease:o,times:a,isGenerator:!0}),d=(0,s/* secondsToMilliseconds */.f)(this.time);e.setWithVelocity(h.sample(d-10).value,h.sample(d).value,10)}const{onStop:l}=this.options;l&&l(),this.cancel()}complete(){const{resolved:e}=this;e&&e.animation.finish()}cancel(){const{resolved:e}=this;e&&e.animation.cancel()}static supports(e){const{motionValue:t,name:n,repeatDelay:i,repeatType:s,damping:r,type:o}=e;if(!(t&&t.owner&&t.owner.current instanceof HTMLElement))return!1;const{onUpdate:a,transformTemplate:l}=t.owner.getProps();return ue()&&n&&ae.has(n)&&
/**
             * If we're outputting values to onUpdate then we can't use WAAPI as there's
             * no way to read the value from WAAPI every frame.
             */
!a&&!l&&!i&&"mirror"!==s&&0!==r&&"inertia"!==o}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs
var de=n(2443);// ./node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
const pe={type:"spring",stiffness:500,damping:25,restSpeed:10},me={type:"keyframes",duration:.8},fe={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},ye=(e,{keyframes:t})=>t.length>2?me:de/* transformProps */.f.has(e)?e.startsWith("scale")?{type:"spring",stiffness:550,damping:0===t[1]?2*Math.sqrt(550):30,restSpeed:10}:pe:fe;// ./node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
const ve=(e,t,n,l={},u,c)=>h=>{const d=(0,i/* getValueTransition */.rU)(l,e)||{},p=d.delay||l.delay||0;
/**
     * Most transition values are currently completely overwritten by value-specific
     * transitions. In the future it'd be nicer to blend these transitions. But for now
     * delay actually does inherit from the root transition if not value-specific.
     */
/**
     * Elapsed isn't a public transition option but can be passed through from
     * optimized appear effects in milliseconds.
     */
let{elapsed:m=0}=l;m-=(0,s/* secondsToMilliseconds */.f)(p);let f={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:t.getVelocity(),...d,delay:-m,onUpdate:e=>{t.set(e),d.onUpdate&&d.onUpdate(e)},onComplete:()=>{h(),d.onComplete&&d.onComplete()},name:e,motionValue:t,element:c?void 0:u};
/**
     * If there's no transition defined for this value, we can generate
     * unqiue transition settings for this value.
     */(// ./node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function({when:e,delay:t,delayChildren:n,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:u,...c}){return!!Object.keys(c).length})(d)||(f={...f,...ye(e,f)})
/**
     * Both WAAPI and our internal animation functions use durations
     * as defined by milliseconds, while our external API defines them
     * as seconds.
     */,f.duration&&(f.duration=(0,s/* secondsToMilliseconds */.f)(f.duration)),f.repeatDelay&&(f.repeatDelay=(0,s/* secondsToMilliseconds */.f)(f.repeatDelay)),void 0!==f.from&&(f.keyframes[0]=f.from);let y=!1;
/**
     * If we can or must skip creating the animation, and apply only
     * the final keyframe, do so. We also check once keyframes are resolved but
     * this early check prevents the need to create an animation at all.
     */
if((!1===f.type||0===f.duration&&!f.repeatDelay)&&(f.duration=0,0===f.delay&&(y=!0)),(a/* instantAnimationState */.d.current||o/* MotionGlobalConfig */.W.skipAnimations)&&(y=!0,f.duration=0,f.delay=0),y&&!c&&void 0!==t.get()){const e=T(f.keyframes,d);if(void 0!==e)
// We still want to return some animation controls here rather
// than returning undefined
return r/* frame */.Gt.update((()=>{f.onUpdate(e),f.onComplete()})),new i/* GroupPlaybackControls */.P6([])}
/**
     * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
     * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
     * optimised animation.
     */return!c&&he.supports(f)?new he(f):new oe(f)}
/***/},
/***/9120:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */xQ:()=>/* binding */r
/* harmony export */});
/* unused harmony exports isPresent, useIsPresent */
/* harmony import */var i=n(6540),s=n(6719);
/* harmony import */
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
function r(e=!0){const t=(0/* .PresenceContext */,i.useContext)(s.t);if(null===t)return[!0,null];const{isPresent:n,onExitComplete:r,register:o}=t,a=(0,i.useId)();
// It's safe to call the following hooks conditionally (after an early return) because the context will always
// either be null or non-null for the lifespan of the component.
(0,i.useEffect)((()=>{if(e)return o(a)}),[e]);const l=(0,i.useCallback)((()=>e&&r&&r(a)),[a,r,e]);return!n&&r?[!1,l]:[!0]}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */}
/***/,
/***/9473:
/***/(e,t,n)=>{
/* harmony export */n.d(t,{
/* harmony export */L:()=>/* binding */i
/* harmony export */});const i=(0,n(6540).createContext)({});
/***/}}]);