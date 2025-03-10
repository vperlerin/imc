"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[9402],{
/***/63:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */$:()=>/* binding */v
/* harmony export */});
/* harmony import */var n=o(4848),r=o(6540),i=o(9120),s=o(9473),a=o(3717),u=o(9268),d=o(775),l=o(9826),c=o(8605),p=o(8645),m=o(104);
/* harmony import */class h extends r.Component{
/**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */
componentDidMount(){const{visualElement:t,layoutGroup:e,switchLayoutGroup:o,layoutId:n}=this.props,{projection:r}=t;(0,p/* .addScaleCorrector */.$)(f),r&&(e.group&&e.group.add(r),o&&o.register&&n&&o.register(r),r.root.didUpdate(),r.addEventListener("animationComplete",(()=>{this.safeToRemove()})),r.setOptions({...r.options,onExitComplete:()=>this.safeToRemove()})),d/* .globalProjectionState */.w.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:e,visualElement:o,drag:n,isPresent:r}=this.props,i=o.projection;return i?(
/**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */
i.isPresent=r,n||t.layoutDependency!==e||void 0===e||t.isPresent!==r?i.willUpdate():this.safeToRemove(),t.isPresent!==r&&(r?i.promote():i.relegate()||
/**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */
m/* .frame */.Gt.postRender((()=>{const t=i.getStack();t&&t.members.length||this.safeToRemove()}))),null):null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),u/* .microtask */.k.postRender((()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()})))}componentWillUnmount(){const{visualElement:t,layoutGroup:e,switchLayoutGroup:o}=this.props,{projection:n}=t;n&&(n.scheduleCheckAfterUnmount(),e&&e.group&&e.group.remove(n),o&&o.deregister&&o.deregister(n))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function v(t){const[e,o]=(0,i/* .usePresence */.xQ)(),u=(0/* .LayoutGroupContext */,r.useContext)(s.L);return(0,n.jsx)(h,{...t,layoutGroup:u,switchLayoutGroup:(0/* .SwitchLayoutGroupContext */,r.useContext)(a.N),isPresent:e,safeToRemove:o})}const f={borderRadius:{...l/* .correctBorderRadius */.P,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:l/* .correctBorderRadius */.P,borderTopRightRadius:l/* .correctBorderRadius */.P,borderBottomLeftRadius:l/* .correctBorderRadius */.P,borderBottomRightRadius:l/* .correctBorderRadius */.P,boxShadow:c/* .correctBoxShadow */._};
/***/},
/***/278:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */T:()=>/* binding */c
/* harmony export */});
/* harmony import */var n=o(6540),r=o(5490),i=o(5153),s=o(6719),a=o(837),u=o(3141),d=o(8601),l=o(4322);
/* harmony import */const c=t=>(e,o)=>{const r=(0/* .MotionContext */,n.useContext)(i.A),a=(0/* .PresenceContext */,n.useContext)(s.t),u=()=>function({scrapeMotionValuesFromProps:t,createRenderState:e,onUpdate:o},n,r,i){const s={latestValues:p(n,r,i,t),renderState:e()};return o&&(
/**
         * onMount works without the VisualElement because it could be
         * called before the VisualElement payload has been hydrated.
         * (e.g. if someone is using m components <m.circle />)
         */
s.onMount=t=>o({props:n,current:t,...s}),s.onUpdate=t=>o(t)),s}(t,e,r,a);return o?u():(0,d/* .useConstant */.M)(u)};function p(t,e,o,n){const i={},s=n(t,{});for(const t in s)i[t]=(0,l/* .resolveMotionValue */.u)(s[t]);let{initial:d,animate:c}=t;const p=(0,a/* .isControllingVariants */.e)(t),m=(0,a/* .isVariantNode */.O)(t);e&&m&&!p&&!1!==t.inherit&&(void 0===d&&(d=e.initial),void 0===c&&(c=e.animate));let h=!!o&&!1===o.initial;h=h||!1===d;const v=h?c:d;if(v&&"boolean"!=typeof v&&!(0,r/* .isAnimationControls */.N)(v)){const e=Array.isArray(v)?v:[v];for(let o=0;o<e.length;o++){const n=(0,u/* .resolveVariantFromProps */.a)(t,e[o]);if(n){const{transitionEnd:t,transition:e,...o}=n;for(const t in o){let e=o[t];if(Array.isArray(e)){e=e[h?e.length-1:0]}null!==e&&(i[t]=e)}for(const e in t)i[e]=t[e]}}}return i}
/***/},
/***/936:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */S:()=>/* binding */r
/* harmony export */});
/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
const n=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */function r(t){return t.startsWith("while")||t.startsWith("drag")&&"draggable"!==t||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||n.has(t)}
/***/},
/***/1820:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */Z:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=o(8443),r=o(63);
/* harmony import */const i={layout:{ProjectionNode:n/* .HTMLProjectionNode */.P,MeasureLayout:r/* .MeasureLayout */.$}};
/***/},
/***/2784:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */$:()=>/* binding */a
/* harmony export */});
/* harmony import */var n=o(4495),r=o(8792),i=o(63),s=o(8443);
/* harmony import */const a={pan:{Feature:r/* .PanGesture */.f},drag:{Feature:n/* .DragGesture */.w,ProjectionNode:s/* .HTMLProjectionNode */.P,MeasureLayout:i/* .MeasureLayout */.$}};
/***/},
/***/3044:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */X:()=>/* binding */n
/* harmony export */});class n{constructor(t){this.isMounted=!1,this.node=t}update(){}}
/***/},
/***/3996:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */B:()=>/* binding */r
/* harmony export */});const n={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},r={};for(const t in n)r[t]={isEnabled:e=>n[t].some((t=>!!e[t]))};
/***/},
/***/4365:
/***/(t,e,o)=>{
// EXPORTS
o.d(e,{n:()=>/* binding */h});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/gestures/hover.mjs
var n=o(2846),r=o(8016),i=o(921),s=o(3044);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/gestures/focus.mjs
// ./node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
/**
 * Map an IntersectionHandler callback to an element. We only ever make one handler for one
 * element, so even though these handlers might all be triggered by different
 * observers, we can keep them in the same map.
 */
const a=new WeakMap,u=new WeakMap,d=t=>{const e=a.get(t.target);e&&e(t)},l=t=>{t.forEach(d)};
/**
 * Multiple observers can be created for multiple element/document roots. Each with
 * different settings. So here we store dictionaries of observers to each root,
 * using serialised settings (threshold/margin) as lookup keys.
 */function c(t,e,o){const n=function({root:t,...e}){const o=t||document;
/**
     * If we don't have an observer lookup map for this root, create one.
     */u.has(o)||u.set(o,{});const n=u.get(o),r=JSON.stringify(e);
/**
     * If we don't have an observer for this combination of root and settings,
     * create one.
     */
return n[r]||(n[r]=new IntersectionObserver(l,{root:t,...e})),n[r]}(e);return a.set(t,o),n.observe(t),()=>{a.delete(t),n.unobserve(t)}}// ./node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
const p={some:0,all:1};class m extends s/* Feature */.X{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:e,margin:o,amount:n="some",once:r}=t,i={root:e?e.current:void 0,rootMargin:o,threshold:"number"==typeof n?n:p[n]};return c(this.node.current,i,(t=>{const{isIntersecting:e}=t;
/**
             * If there's been no change in the viewport state, early return.
             */if(this.isInView===e)return;
/**
             * Handle hasEnteredView. If this is only meant to run once, and
             * element isn't visible, early return. Otherwise set hasEnteredView to true.
             */
if(this.isInView=e,r&&!e&&this.hasEnteredView)return;e&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",e)
/**
             * Use the latest committed props rather than the ones in scope
             * when this observer is created
             */;const{onViewportEnter:o,onViewportLeave:n}=this.node.getProps(),i=e?o:n;i&&i(t)}))}mount(){this.startObserver()}update(){if("undefined"==typeof IntersectionObserver)return;const{props:t,prevProps:e}=this.node;["amount","margin","root"].some(function({viewport:t={}},{viewport:e={}}={}){return o=>t[o]!==e[o]}(t,e))&&this.startObserver()}unmount(){}}// ./node_modules/framer-motion/dist/es/motion/features/gestures.mjs
const h={inView:{Feature:m},tap:{Feature:i/* PressGesture */.H},focus:{Feature:r/* FocusGesture */.c},hover:{Feature:n/* HoverGesture */.e}};
/***/},
/***/5474:
/***/(t,e,o)=>{
// EXPORTS
o.d(e,{Z:()=>/* binding */b});
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var n=o(4848),r=o(6540),i=o(9473),s=o(6048),a=o(5446),u=o(5153),d=o(990),l=o(8288),c=o(3996);
// EXTERNAL MODULE: ./node_modules/react/index.js
// ./node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
const p=Symbol.for("motionComponentSymbol");
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
var m=o(3953);// ./node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */
function h(t,e,o){return(0,r.useCallback)((n=>{n&&t.onMount&&t.onMount(n),e&&(n?e.mount(n):e.unmount()),o&&("function"==typeof o?o(n):(0,m/* isRefObject */.X)(o)&&(o.current=n))}),
/**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
[e])}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var v=o(6719),f=o(5128),w=o(2392),g=o(9268),y=o(3717);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
// ./node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function C(t,e,o,n,i){var d,l;const{visualElement:c}=(0/* MotionContext */,r.useContext)(u.A),p=(0/* LazyContext */,r.useContext)(s.Y),h=(0/* PresenceContext */,r.useContext)(v.t),C=(0/* MotionConfigContext */,r.useContext)(a.Q).reducedMotion,b=(0,r.useRef)(null);
/**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */
n=n||p.renderer,!b.current&&n&&(b.current=n(t,{visualState:e,parent:c,props:o,presenceContext:h,blockInitialAnimation:!!h&&!1===h.initial,reducedMotionConfig:C}));const E=b.current,x=(0/* SwitchLayoutGroupContext */,r.useContext)(y.N);
/**
     * Load Motion gesture and animation features. These are rendered as renderless
     * components so each feature can optionally make use of React lifecycle methods.
     */!E||E.projection||!i||"html"!==E.type&&"svg"!==E.type||function(t,e,o,n){const{layoutId:r,layout:i,drag:s,dragConstraints:a,layoutScroll:u,layoutRoot:d}=e;t.projection=new o(t.latestValues,e["data-framer-portal-id"]?void 0:S(t.parent)),t.projection.setOptions({layoutId:r,layout:i,alwaysMeasureLayout:Boolean(s)||a&&(0,m/* isRefObject */.X)(a),visualElement:t,
/**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
animationType:"string"==typeof i?i:"both",initialPromotionConfig:n,layoutScroll:u,layoutRoot:d})}(b.current,o,i,x);const P=(0,r.useRef)(!1);(0,r.useInsertionEffect)((()=>{
/**
         * Check the component has already mounted before calling
         * `update` unnecessarily. This ensures we skip the initial update.
         */
E&&P.current&&E.update(o,h)}));
/**
     * Cache this value as we want to know whether HandoffAppearAnimations
     * was present on initial render - it will be deleted after this.
     */
const R=o[w/* optimizedAppearDataAttribute */.n],M=(0,r.useRef)(Boolean(R)&&!(null===(d=window.MotionHandoffIsComplete)||void 0===d?void 0:d.call(window,R))&&(null===(l=window.MotionHasOptimisedAnimation)||void 0===l?void 0:l.call(window,R)));return(0,f/* useIsomorphicLayoutEffect */.E)((()=>{E&&(P.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),g/* microtask */.k.render(E.render),
/**
         * Ideally this function would always run in a useEffect.
         *
         * However, if we have optimised appear animations to handoff from,
         * it needs to happen synchronously to ensure there's no flash of
         * incorrect styles in the event of a hydration error.
         *
         * So if we detect a situtation where optimised appear animations
         * are running, we use useLayoutEffect to trigger animations.
         */
M.current&&E.animationState&&E.animationState.animateChanges())})),(0,r.useEffect)((()=>{E&&(!M.current&&E.animationState&&E.animationState.animateChanges(),M.current&&(
// This ensures all future calls to animateChanges() in this component will run in useEffect
queueMicrotask((()=>{var t;null===(t=window.MotionHandoffMarkAsComplete)||void 0===t||t.call(window,R)})),M.current=!1))})),E}function S(t){if(t)return!1!==t.options.allowProjection?t.projection:S(t.parent)}
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */
function b({preloadedFeatures:t,createVisualElement:e,useRender:o,useVisualState:i,Component:m}){var v,f;function w(t,p){
/**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */
let v;const f={...(0/* MotionConfigContext */,r.useContext)(a.Q),...t,layoutId:E(t)},{isStatic:w}=f,g=(0,d/* useCreateMotionContext */.z)(t),y=i(t,w);if(!w&&l/* isBrowser */.B){!function(){(0/* LazyContext */,r.useContext)(s.Y).strict;
/**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */0}();const t=function(t){const{drag:e,layout:o}=c/* featureDefinitions */.B;if(!e&&!o)return{};const n={...e,...o};return{MeasureLayout:(null==e?void 0:e.isEnabled(t))||(null==o?void 0:o.isEnabled(t))?n.MeasureLayout:void 0,ProjectionNode:n.ProjectionNode}}
/***/(f);v=t.MeasureLayout,
/**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */
g.visualElement=C(m,y,f,e,t.ProjectionNode)}
/**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */return(0/* MotionContext */,n.jsxs)(u.A.Provider,{value:g,children:[v&&g.visualElement?(0,n.jsx)(v,{visualElement:g.visualElement,...f}):null,o(m,t,h(y,g.visualElement,p),y,w,g.visualElement)]})}t&&// ./node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function(t){for(const e in t)c/* featureDefinitions */.B[e]={...c/* featureDefinitions */.B[e],...t[e]}}(t),w.displayName=`motion.${"string"==typeof m?m:`create(${null!==(f=null!==(v=m.displayName)&&void 0!==v?v:m.name)&&void 0!==f?f:""})`}`;const g=(0,r.forwardRef)(w);return g[p]=m,g}function E({layoutId:t}){const e=(0/* LayoutGroupContext */,r.useContext)(i.L).id;return e&&void 0!==t?e+"-"+t:t}},
/***/7549:
/***/(t,e,o)=>{
/* harmony export */o.d(e,{
/* harmony export */z:()=>/* binding */i
/* harmony export */});
/* harmony import */var n=o(8645),r=o(2443);
/* harmony import */function i(t,{layout:e,layoutId:o}){return r/* .transformProps */.f.has(t)||t.startsWith("origin")||(e||void 0!==o)&&(!!n/* .scaleCorrectors */.H[t]||"opacity"===t)}
/***/},
/***/8461:
/***/(t,e,o)=>{
// EXPORTS
o.d(e,{W:()=>/* binding */d});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
var n=o(5490),r=o(7030),i=o(3044);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/animation-state.mjs + 2 modules
// ./node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
class s extends i/* Feature */.X{
/**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */
constructor(t){super(t),t.animationState||(t.animationState=(0,r/* createAnimationState */.L)(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();(0,n/* isAnimationControls */.N)(t)&&(this.unmountControls=t.subscribe(this.node))}
/**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:e}=this.node.prevProps||{};t!==e&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),null===(t=this.unmountControls)||void 0===t||t.call(this)}}// ./node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
let a=0;class u extends i/* Feature */.X{constructor(){super(...arguments),this.id=a++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:e}=this.node.presenceContext,{isPresent:o}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===o)return;const n=this.node.animationState.setActive("exit",!t);e&&!t&&n.then((()=>{e(this.id)}))}mount(){const{register:t,onExitComplete:e}=this.node.presenceContext||{};e&&e(this.id),t&&(this.unmount=t(this.id))}unmount(){}}// ./node_modules/framer-motion/dist/es/motion/features/animations.mjs
const d={animation:{Feature:s},exit:{Feature:u}};
/***/}}]);