"use strict";(self.webpackChunkimc2025=self.webpackChunkimc2025||[]).push([[9688],{
/***/568:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */j:()=>/* binding */o
/* harmony export */,p:()=>/* binding */r
/* harmony export */});const s=t=>e=>"string"==typeof e&&e.startsWith(t),o=
s("--"),n=
s("var(--"),r=t=>!!n(t)&&a.test(t.split("/*")[0].trim()),a=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu}
/***/,
/***/775:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */w:()=>/* binding */s
/* harmony export */});
/**
 * This should only ever be modified on the client otherwise it'll
 * persist through server requests. If we need instanced states we
 * could lazy-init via root.
 */
const s={
/**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */
hasAnimatedSinceResize:!0,
/**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */
hasEverUpdated:!1};
/***/},
/***/837:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */O:()=>/* binding */a
/* harmony export */,e:()=>/* binding */r
/* harmony export */});
/* harmony import */var s=i(5490),o=i(6551),n=i(5092);
/* harmony import */function r(t){return(0,s/* .isAnimationControls */.N)(t.animate)||n/* .variantProps */._.some((e=>(0,o/* .isVariantLabel */.w)(t[e])))}function a(t){return Boolean(r(t)||t.variants)}
/***/},
/***/951:
/***/(t,e,i)=>{function s(t,e){return t.map((t=>t*e))}
/***/
/* harmony export */i.d(e,{
/* harmony export */A:()=>/* binding */s
/* harmony export */})},
/***/1339:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */F:()=>/* binding */o
/* harmony export */});
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */
const s=(t,e)=>i=>e(t(i)),o=(...t)=>t.reduce(s)
/***/},
/***/1619:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */D:()=>/* binding */r
/* harmony export */});
/* unused harmony export defaultValueTypes */
/* harmony import */var s=i(7739),o=i(6044);
/* harmony import */
/**
 * A map of default value types for common values
 */
const n={...i(5309).W,
// Color props
color:s/* .color */.y,backgroundColor:s/* .color */.y,outlineColor:s/* .color */.y,fill:s/* .color */.y,stroke:s/* .color */.y,
// Border props
borderColor:s/* .color */.y,borderTopColor:s/* .color */.y,borderRightColor:s/* .color */.y,borderBottomColor:s/* .color */.y,borderLeftColor:s/* .color */.y,filter:o/* .filter */.p,WebkitFilter:o/* .filter */.p},r=t=>n[t]
/***/;
/**
 * Gets the default ValueType for the provided value key
 */},
/***/1630:
/***/(t,e,i)=>{function s(t){return void 0===t||1===t}function o({scale:t,scaleX:e,scaleY:i}){return!s(t)||!s(e)||!s(i)}function n(t){return o(t)||r(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function r(t){return a(t.x)||a(t.y)}function a(t){return t&&"0%"!==t}
/***/
/* harmony export */i.d(e,{
/* harmony export */HD:()=>/* binding */n
/* harmony export */,vF:()=>/* binding */r
/* harmony export */,vk:()=>/* binding */o
/* harmony export */})},
/***/1912:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{T:()=>/* binding */r,n:()=>/* binding */a});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs
var s=i(2944),o=i(5269),n=i(1969);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
// ./node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
/**
 * ValueType for "auto"
 */
const r=[s/* number */.ai,o.px,o/* percent */.KN,o/* degrees */.uj,o.vw,o.vh,{test:t=>"auto"===t,parse:t=>t}],a=t=>r.find((0,n/* testValueType */.w)(t))
/***/},
/***/1969:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */w:()=>/* binding */s
/* harmony export */});
/**
 * Tests a provided value against a ValueType
 */
const s=t=>e=>e.test(t)
/***/},
/***/2287:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */W:()=>/* binding */s
/* harmony export */});const s={skipAnimations:!1,useManualTiming:!1};
/***/},
/***/2358:
/***/(t,e,i)=>{
/* unused harmony export moveItem */
function s(t,e){-1===t.indexOf(e)&&t.push(e)}function o(t,e){const i=t.indexOf(e);i>-1&&t.splice(i,1)}
// Adapted from array-move
/* harmony export */i.d(e,{
/* harmony export */Ai:()=>/* binding */o
/* harmony export */,Kq:()=>/* binding */s
/* harmony export */})}
/***/,
/***/2443:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */U:()=>/* binding */s
/* harmony export */,f:()=>/* binding */o
/* harmony export */});
/**
 * Generate a list of every possible transform key.
 */
const s=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],o=new Set(s);
/**
 * A quick lookup for transform props.
 */}
/***/,
/***/2464:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */q:()=>/* binding */s
/* harmony export */});const s=(t,e,i)=>i>e?e:i<t?t:i;
/***/},
/***/2606:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */v:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=i(2358);class o{constructor(){this.subscriptions=[]}add(t){return(0,s/* .addUniqueItem */.Kq)(this.subscriptions,t),()=>(0,s/* .removeItem */.Ai)(this.subscriptions,t)}notify(t,e,i){const s=this.subscriptions.length;if(s)if(1===s)
/**
             * If there's only a single handler we can just call it without invoking a loop.
             */
this.subscriptions[0](t,e,i);else for(let o=0;o<s;o++){
/**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
const s=this.subscriptions[o];s&&s(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}
/***/},
/***/2957:
/***/(t,e,i)=>{function s(t){return[t("x"),t("y")]}
/***/
/* harmony export */i.d(e,{
/* harmony export */X:()=>/* binding */s
/* harmony export */})},
/***/3141:
/***/(t,e,i)=>{function s(t){const e=[{},{}];return null==t||t.values.forEach(((t,i)=>{e[0][i]=t.get(),e[1][i]=t.getVelocity()})),e}function o(t,e,i,o){
/**
     * If the variant definition is a function, resolve.
     */
if("function"==typeof e){const[n,r]=s(o);e=e(void 0!==i?i:t.custom,n,r)}
/**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */
/**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */
if("string"==typeof e&&(e=t.variants&&t.variants[e]),"function"==typeof e){const[n,r]=s(o);e=e(void 0!==i?i:t.custom,n,r)}return e}
/***/
/* harmony export */i.d(e,{
/* harmony export */a:()=>/* binding */o
/* harmony export */})},
/***/3420:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */E4:()=>/* binding */r
/* harmony export */,Hr:()=>/* binding */d
/* harmony export */,W9:()=>/* binding */u
/* harmony export */});
/* harmony import */var s=i(2944),o=i(5269),n=i(2443);
/* harmony import */const r=t=>t===s/* .number */.ai||t===o.px,a=(t,e)=>parseFloat(t.split(", ")[e]),l=(t,e)=>(i,{transform:s})=>{if("none"===s||!s)return 0;const o=s.match(/^matrix3d\((.+)\)$/u);if(o)return a(o[1],e);{const e=s.match(/^matrix\((.+)\)$/u);return e?a(e[1],t):0}},h=new Set(["x","y","z"]),c=n/* .transformPropOrder */.U.filter((t=>!h.has(t)));function u(t){const e=[];return c.forEach((i=>{const s=t.getValue(i);void 0!==s&&(e.push([i,s.get()]),s.set(i.startsWith("scale")?1:0))})),e}const d={
// Dimensions
width:({x:t},{paddingLeft:e="0",paddingRight:i="0"})=>t.max-t.min-parseFloat(e)-parseFloat(i),height:({y:t},{paddingTop:e="0",paddingBottom:i="0"})=>t.max-t.min-parseFloat(e)-parseFloat(i),top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min)
// Transform
,x:l(4,13),y:l(5,14)};
// Alias translate longform names
d.translateX=d.x,d.translateY=d.y}
/***/,
/***/3490:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{Z:()=>/* binding */n});
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/progress.mjs
var s=i(6896),o=i(9713);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/mix/number.mjs
// ./node_modules/framer-motion/dist/es/utils/offsets/default.mjs
function n(t){const e=[0];// ./node_modules/framer-motion/dist/es/utils/offsets/fill.mjs
return function(t,e){const i=t[t.length-1];for(let n=1;n<=e;n++){const r=(0,s/* progress */.q)(0,e,n);t.push((0,o/* mixNumber */.k)(i,1,r))}}(e,t.length-1),e}
/***/},
/***/3953:
/***/(t,e,i)=>{function s(t){return t&&"object"==typeof t&&Object.prototype.hasOwnProperty.call(t,"current")}
/***/
/* harmony export */i.d(e,{
/* harmony export */X:()=>/* binding */s
/* harmony export */})},
/***/4106:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */ge:()=>/* binding */o
/* harmony export */,xU:()=>/* binding */s
/* harmony export */});
/* unused harmony exports createAxis, createAxisDelta */
const s=()=>({x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}}),o=()=>({x:{min:0,max:0},y:{min:0,max:0}})
/***/},
/***/4283:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */Q:()=>/* binding */s
/* harmony export */});const s={value:null,addProjectionMetrics:null};
/***/},
/***/4373:
/***/(t,e,i)=>{// ./node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function s(t){if("undefined"==typeof Proxy)return t;
/**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */const e=new Map;return new Proxy(((...e)=>t(...e)),{
/**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */
get:(i,s)=>"create"===s?t:(
/**
             * If this element doesn't exist in the component cache, create it and cache.
             */
e.has(s)||e.set(s,t(s)),e.get(s))})}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/motion/features/animations.mjs + 2 modules
// EXPORTS
i.d(e,{P:()=>/* binding */bt});var o=i(8461),n=i(2784),r=i(4365),a=i(1820),l=i(5474),h=i(6540),c=i(7549),u=i(9896),d=i(568);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/motion/features/drag.mjs
// ./node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
const p=(t,e)=>e&&"number"==typeof t?e.transform(t):t;
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs + 3 modules
var m=i(5309),f=i(2443);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs
// ./node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
const g={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},v=f/* transformPropOrder */.U.length;// ./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function y(t,e,i){const{style:s,vars:o,transformOrigin:n}=t;
// Track whether we encounter any transform or transformOrigin values.
let r=!1,a=!1;
/**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */
for(const t in e){const i=e[t];if(f/* transformProps */.f.has(t))
// If this is a transform, flag to enable further transform processing
r=!0;else if((0,d/* isCSSVariableName */.j)(t))o[t]=i;else{
// Convert the value to its default value type, ie 0 -> "0px"
const e=p(i,m/* numberValueTypes */.W[t]);t.startsWith("origin")?(
// If this is a transform origin, flag and enable further transform-origin processing
a=!0,n[t]=e):s[t]=e}}
/**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */
if(e.transform||(r||i?s.transform=
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function(t,e,i){
// The transform string we're going to build into.
let s="",o=!0;
/**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */
for(let n=0;n<v;n++){const r=f/* transformPropOrder */.U[n],a=t[r];if(void 0===a)continue;let l=!0;if(l="number"==typeof a?a===(r.startsWith("scale")?1:0):0===parseFloat(a),!l||i){const t=p(a,m/* numberValueTypes */.W[r]);l||(o=!1,s+=`${g[r]||r}(${t}) `),i&&(e[r]=t)}}return s=s.trim(),
// If we have a custom `transform` template, pass our transform values and
// generated transformString to that before returning
i?s=i(e,o?"":s):o&&(s="none"),s}(e,t.transform,i):s.transform&&(
/**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */
s.transform="none")),a){const{originX:t="50%",originY:e="50%",originZ:i=0}=n;s.transformOrigin=`${t} ${e} ${i}`}}// ./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
const x=()=>({style:{},transform:{},transformOrigin:{},vars:{}});// ./node_modules/framer-motion/dist/es/render/html/use-props.mjs
function S(t,e,i){for(const s in e)(0,u/* isMotionValue */.S)(e[s])||(0,c/* isForcedMotionValue */.z)(s,i)||(t[s]=e[s])}function T(t,e){const i={};
/**
     * Copy non-Motion Values straight into style
     */
return S(i,t.style||{},t),Object.assign(i,function({transformTemplate:t},e){return(0,h.useMemo)((()=>{const i={style:{},transform:{},transformOrigin:{},vars:{}};return y(i,e,t),Object.assign({},i.vars,i.style)}),[e])}(t,e)),i}function P(t,e){
// The `any` isn't ideal but it is the type of createElement props argument
const i={},s=T(t,e);return t.drag&&!1!==t.dragListener&&(
// Disable the ghost element when a user drags
i.draggable=!1,
// Disable text selection
s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",
// Disable scrolling on the draggable direction
s.touchAction=!0===t.drag?"none":"pan-"+("x"===t.drag?"y":"x")),void 0===t.tabIndex&&(t.onTap||t.onTapStart||t.whileTap)&&(i.tabIndex=0),i.style=s,i}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var V=i(936);// ./node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
let w=t=>!(0,V/* isValidMotionProp */.S)(t);
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */
try{
/**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     */
(b=require("@emotion/is-prop-valid").default)&&(
// Explicitly filter our events
w=t=>t.startsWith("on")?!(0,V/* isValidMotionProp */.S)(t):b(t))}catch(t){
// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}var b;// ./node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
/**
 * We keep these listed separately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */
const A=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];// ./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function j(t){
/**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
return"string"==typeof t&&
/**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */
!t.includes("-")&&
/**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
!!(A.indexOf(t)>-1||
/**
         * If it contains a capital letter, it's an SVG component
         */
/[A-Z]/u.test(t))}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
var B=i(5269);// ./node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
const D={offset:"stroke-dashoffset",array:"stroke-dasharray"},k={offset:"strokeDashoffset",array:"strokeDasharray"};// ./node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
function C(t,e,i){return"string"==typeof t?t:B.px.transform(e+i*t)}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */ // ./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function R(t,{attrX:e,attrY:i,attrScale:s,originX:o,originY:n,pathLength:r,pathSpacing:a=1,pathOffset:l=0,
// This is object creation, which we try to avoid per-frame.
...h},c,u){
/**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */
if(y(t,h,u),c)return void(t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox));t.attrs=t.style,t.style={};const{attrs:d,style:p,dimensions:m}=t;
/**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */d.transform&&(m&&(p.transform=d.transform),delete d.transform),
// Parse transformOrigin
m&&(void 0!==o||void 0!==n||p.transform)&&(p.transformOrigin=function(t,e,i){return`${C(e,t.x,t.width)} ${C(i,t.y,t.height)}`}(m,void 0!==o?o:.5,void 0!==n?n:.5)),
// Render attrX/attrY/attrScale as attributes
void 0!==e&&(d.x=e),void 0!==i&&(d.y=i),void 0!==s&&(d.scale=s),
// Build SVG path if one has been defined
void 0!==r&&
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */
function(t,e,i=1,s=0,o=!0){
// Normalise path length by setting SVG attribute pathLength to 1
t.pathLength=1;
// We use dash case when setting attributes directly to the DOM node and camel case
// when defining props on a React component.
const n=o?D:k;
// Build the dash offset
t[n.offset]=B.px.transform(-s);
// Build the dash array
const r=B.px.transform(e),a=B.px.transform(i);t[n.array]=`${r} ${a}`}(d,r,a,l,!1)}// ./node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
const E=()=>({style:{},transform:{},transformOrigin:{},vars:{},attrs:{}}),F=t=>"string"==typeof t&&"svg"===t.toLowerCase();// ./node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function L(t,e,i,s){const o=(0,h.useMemo)((()=>{const i={style:{},transform:{},transformOrigin:{},vars:{},attrs:{}};return R(i,e,F(s),t.transformTemplate),{...i.attrs,style:{...i.style}}}),[e]);if(t.style){const e={};S(e,t.style,t),o.style={...e,...o.style}}return o}// ./node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function M(t=!1){return(e,i,s,{latestValues:o},n)=>{const r=(j(e)?L:P)(i,o,n,e),a=function(t,e,i){const s={};for(const o in t)
/**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */
"values"===o&&"object"==typeof t.values||(w(o)||!0===i&&(0,V/* isValidMotionProp */.S)(o)||!e&&!(0,V/* isValidMotionProp */.S)(o)||
// If trying to use native HTML drag events, forward drag listeners
t.draggable&&o.startsWith("onDrag"))&&(s[o]=t[o]);return s}(i,"string"==typeof e,t),l=e!==h.Fragment?{...a,...r,ref:s}:{},{children:c}=i,d=(0,h.useMemo)((()=>(0,u/* isMotionValue */.S)(c)?c.get():c),[c]);return(0,h.createElement)(e,{...l,children:d})}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
var U=i(278);// ./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function O(t,e,i){var s;const{style:o}=t,n={};for(const r in o)((0,u/* isMotionValue */.S)(o[r])||e.style&&(0,u/* isMotionValue */.S)(e.style[r])||(0,c/* isForcedMotionValue */.z)(r,t)||void 0!==(null===(s=null==i?void 0:i.getValue(r))||void 0===s?void 0:s.liveStyle))&&(n[r]=o[r]);return n}// ./node_modules/framer-motion/dist/es/render/html/config-motion.mjs
const $={useVisualState:(0,U/* makeUseVisualState */.T)({scrapeMotionValuesFromProps:O,createRenderState:x})};
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/frameloop/frame.mjs
var I=i(104);// ./node_modules/framer-motion/dist/es/render/svg/utils/measure.mjs
function K(t,e){try{e.dimensions="function"==typeof t.getBBox?t.getBBox():t.getBoundingClientRect()}catch(t){
// Most likely trying to measure an unrendered element under Firefox
e.dimensions={x:0,y:0,width:0,height:0}}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var W=i(8062);// ./node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function N(t,{style:e,vars:i},s,o){Object.assign(t.style,e,o&&o.getProjectionStyles(s));
// Loop over any CSS variables and assign those.
for(const e in i)t.style.setProperty(e,i[e])}// ./node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
/**
 * A set of attribute names that are always read/written as camel case.
 */
const X=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);// ./node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function Y(t,e,i,s){N(t,e,void 0,s);for(const i in e.attrs)t.setAttribute(X.has(i)?i:(0,W/* camelToDash */.I)(i),e.attrs[i])}// ./node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function z(t,e,i){const s=O(t,e,i);for(const i in t)if((0,u/* isMotionValue */.S)(t[i])||(0,u/* isMotionValue */.S)(e[i])){s[-1!==f/* transformPropOrder */.U.indexOf(i)?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i]=t[i]}return s}// ./node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
const Q=["x","y","width","height","cx","cy","r"],H={useVisualState:(0,U/* makeUseVisualState */.T)({scrapeMotionValuesFromProps:z,createRenderState:E,onUpdate:({props:t,prevProps:e,current:i,renderState:s,latestValues:o})=>{if(!i)return;let n=!!t.drag;if(!n)for(const t in o)if(f/* transformProps */.f.has(t)){n=!0;break}if(!n)return;let r=!e;if(e)
/**
                 * Check the layout props for changes, if any are found we need to
                 * measure the element again.
                 */
for(let i=0;i<Q.length;i++){const s=Q[i];t[s]!==e[s]&&(r=!0)}r&&I/* frame */.Gt.read((()=>{K(i,s),I/* frame */.Gt.render((()=>{R(s,o,F(i.tagName),t.transformTemplate),Y(i,s)}))}))}})};// ./node_modules/framer-motion/dist/es/render/components/create-factory.mjs
function G(t,e){return function(i,{forwardMotionProps:s}={forwardMotionProps:!1}){const o={...j(i)?H:$,preloadedFeatures:t,useRender:M(s),createVisualElement:e,Component:i};return(0,l/* createRendererMotionComponent */.Z)(o)}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/utils/measure.mjs
var q=i(4805),Z=i(4582),_=i(3996),J=i(4106),tt=i(7271),et=i(7312),it=i(8288);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs
// ./node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
// Does this device prefer reduced motion? Returns `null` server-side.
const st={current:null},ot={current:!1};
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var nt=i(2606),rt=i(4785),at=i(4552),lt=i(5320),ht=i(7739),ct=i(1912),ut=i(1969);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/index.mjs
// ./node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
/**
 * A list of all ValueTypes
 */
const dt=[...ct/* dimensionValueTypes */.T,ht/* color */.y,at/* complex */.f],pt=new WeakMap;
/**
 * Tests a value against the list of ValueTypes
 */
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
var mt=i(837),ft=i(4835);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
var gt=i(3141);// ./node_modules/framer-motion/dist/es/render/VisualElement.mjs
const vt=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */class yt{
/**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:o,visualState:n},r={}){
/**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */
this.current=null,
/**
         * A set containing references to this VisualElement's children.
         */
this.children=new Set,
/**
         * Determine what role this visual element should take in the variant tree.
         */
this.isVariantNode=!1,this.isControllingVariants=!1,
/**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */
this.shouldReduceMotion=null,
/**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */
this.values=new Map,this.KeyframeResolver=ft/* KeyframeResolver */.h,
/**
         * Cleanup functions for active features (hover/tap/exit etc)
         */
this.features={},
/**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */
this.valueSubscriptions=new Map,
/**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */
this.prevMotionValues={},
/**
         * An object containing a SubscriptionManager for each active event.
         */
this.events={},
/**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */
this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const t=Z/* time */.k.now();this.renderScheduledAt<t&&(this.renderScheduledAt=t,I/* frame */.Gt.render(this.render,!1,!0))};const{latestValues:a,renderState:l,onUpdate:h}=n;this.onUpdate=h,this.latestValues=a,this.baseTarget={...a},this.initialValues=e.initial?{...a}:{},this.renderState=l,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=r,this.blockInitialAnimation=Boolean(o),this.isControllingVariants=(0,mt/* isControllingVariants */.e)(e),this.isVariantNode=(0,mt/* isVariantNode */.O)(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=Boolean(t&&t.current);
/**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */
const{willChange:c,...d}=this.scrapeMotionValuesFromProps(e,{},this);for(const t in d){const e=d[t];void 0!==a[t]&&(0,u/* isMotionValue */.S)(e)&&e.set(a[t],!1)}}mount(t){this.current=t,pt.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach(((t,e)=>this.bindToMotionValue(e,t))),ot.current||// ./node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function(){if(ot.current=!0,it/* isBrowser */.B)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>st.current=t.matches;t.addListener(e),e()}else st.current=!1}(),this.shouldReduceMotion="never"!==this.reducedMotionConfig&&("always"===this.reducedMotionConfig||st.current),this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){this.projection&&this.projection.unmount(),(0,I/* cancelFrame */.WG)(this.notifyUpdate),(0,I/* cancelFrame */.WG)(this.render),this.valueSubscriptions.forEach((t=>t())),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const t in this.events)this.events[t].clear();for(const t in this.features){const e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();const i=f/* transformProps */.f.has(t);i&&this.onBindTransform&&this.onBindTransform();const s=e.on("change",(e=>{this.latestValues[t]=e,this.props.onUpdate&&I/* frame */.Gt.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)})),o=e.on("renderRequest",this.scheduleRender);let n;window.MotionCheckAppearSync&&(n=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,(()=>{s(),o(),n&&n(),e.owner&&e.stop()}))}sortNodePosition(t){
/**
         * If these nodes aren't even of the same type we can't compare their depth.
         */
return this.current&&this.sortInstanceNodePosition&&this.type===t.type?this.sortInstanceNodePosition(this.current,t.current):0}updateFeatures(){let t="animation";for(t in _/* featureDefinitions */.B){const e=_/* featureDefinitions */.B[t];if(!e)continue;const{isEnabled:i,Feature:s}=e;
/**
             * If this feature is enabled but not active, make a new instance.
             */
/**
             * If we have a feature, mount or update it.
             */
if(!this.features[t]&&s&&i(this.props)&&(this.features[t]=new s(this)),this.features[t]){const e=this.features[t];e.isMounted?e.update():(e.mount(),e.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}
/**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):(0,J/* createBox */.ge)()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}
/**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;
/**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */
for(let e=0;e<vt.length;e++){const i=vt[e];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const s=t["on"+i];s&&(this.propEventSubscriptions[i]=this.on(i,s))}this.prevMotionValues=// ./node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function(t,e,i){for(const s in e){const o=e[s],n=i[s];if((0,u/* isMotionValue */.S)(o))
/**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */
t.addValue(s,o);else if((0,u/* isMotionValue */.S)(n))
/**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */
t.addValue(s,(0,rt/* motionValue */.OQ)(o,{owner:t}));else if(n!==o)
/**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */
if(t.hasValue(s)){const e=t.getValue(s);!0===e.liveStyle?e.jump(o):e.hasAnimated||e.set(o)}else{const e=t.getStaticValue(s);t.addValue(s,(0,rt/* motionValue */.OQ)(void 0!==e?e:o,{owner:t}))}}
// Handle removed values
for(const s in i)void 0===e[s]&&t.removeValue(s);return e}(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}
/**
     * Returns the variant definition with a given name.
     */getVariant(t){return this.props.variants?this.props.variants[t]:void 0}
/**
     * Returns the defined default transition on this component.
     */getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}
/**
     * Add a child visual element to our set of children.
     */addVariantChild(t){const e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}
/**
     * Add a motion value and bind it to this visual element.
     */addValue(t,e){
// Remove existing value if it exists
const i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}
/**
     * Remove a motion value and unbind any active subscriptions.
     */removeValue(t){this.values.delete(t);const e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}
/**
     * Check whether we have a motion value for this key
     */hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return void 0===i&&void 0!==e&&(i=(0,rt/* motionValue */.OQ)(null===e?void 0:e,{owner:this}),this.addValue(t,i)),i}
/**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */readValue(t,e){var i;let s=void 0===this.latestValues[t]&&this.current?null!==(i=this.getBaseTargetFromProps(this.props,t))&&void 0!==i?i:this.readValueFromInstance(this.current,t,this.options):this.latestValues[t];var o;return null!=s&&("string"==typeof s&&((0,tt/* isNumericalString */.i)(s)||(0,et/* isZeroValueString */.$)(s))?
// If this is a number read as a string, ie "0" or "200", convert it to a number
s=parseFloat(s):(o=s,!dt.find((0,ut/* testValueType */.w)(o))&&at/* complex */.f.test(e)&&(s=(0,lt/* getAnimatableNone */.J)(t,e))),this.setBaseTarget(t,(0,u/* isMotionValue */.S)(s)?s.get():s)),(0,u/* isMotionValue */.S)(s)?s.get():s}
/**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */setBaseTarget(t,e){this.baseTarget[t]=e}
/**
     * Find the base target for a value thats been removed from all animation
     * props.
     */getBaseTarget(t){var e;const{initial:i}=this.props;let s;if("string"==typeof i||"object"==typeof i){const o=(0,gt/* resolveVariantFromProps */.a)(this.props,i,null===(e=this.presenceContext)||void 0===e?void 0:e.custom);o&&(s=o[t])}
/**
         * If this value still exists in the current initial variant, read that.
         */if(i&&void 0!==s)return s;
/**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */const o=this.getBaseTargetFromProps(this.props,t);return void 0===o||(0,u/* isMotionValue */.S)(o)?void 0!==this.initialValues[t]&&void 0===s?void 0:this.baseTarget[t]:o
/**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */}on(t,e){return this.events[t]||(this.events[t]=new nt/* SubscriptionManager */.v),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs + 2 modules
var xt=i(5133);// ./node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
class St extends yt{constructor(){super(...arguments),this.KeyframeResolver=xt/* DOMKeyframesResolver */.K}sortInstanceNodePosition(t,e){
/**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
return 2&t.compareDocumentPosition(e)?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;(0,u/* isMotionValue */.S)(t)&&(this.childSubscription=t.on("change",(t=>{this.current&&(this.current.textContent=`${t}`)})))}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var Tt=i(1619);class Pt extends St{constructor(){super(...arguments),this.type="html",this.renderInstance=N}readValueFromInstance(t,e){if(f/* transformProps */.f.has(e)){const t=(0,Tt/* getDefaultValueType */.D)(e);return t&&t.default||0}{const s=(i=t,window.getComputedStyle(i)),o=((0,d/* isCSSVariableName */.j)(e)?s.getPropertyValue(e):s[e])||0;return"string"==typeof o?o.trim():o}// ./node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
var i}measureInstanceViewportBox(t,{transformPagePoint:e}){return(0,q/* measureViewportBox */.m)(t,e)}build(t,e,i){y(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return O(t,e,i)}}// ./node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
class Vt extends St{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=J/* createBox */.ge,this.updateDimensions=()=>{this.current&&!this.renderState.dimensions&&K(this.current,this.renderState)}}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(f/* transformProps */.f.has(e)){const t=(0,Tt/* getDefaultValueType */.D)(e);return t&&t.default||0}return e=X.has(e)?e:(0,W/* camelToDash */.I)(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return z(t,e,i)}onBindTransform(){this.current&&!this.renderState.dimensions&&I/* frame */.Gt.postRender(this.updateDimensions)}build(t,e,i){R(t,e,this.isSVGTag,i.transformTemplate)}renderInstance(t,e,i,s){Y(t,e,0,s)}mount(t){this.isSVGTag=F(t.tagName),super.mount(t)}}// ./node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
const wt=(t,e)=>j(t)?new Vt(e):new Pt(e,{allowProjection:t!==h.Fragment}),bt=s(G({...o/* animations */.W,...r/* gestureAnimations */.n,...n/* drag */.$,...a/* layout */.Z},wt))}
/***/,
/***/4714:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */U:()=>/* binding */a
/* harmony export */});
/* harmony import */var s=i(7365),o=i(4785),n=i(7118);
/* harmony import */
/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function r(t,e,i){t.hasValue(e)?t.getValue(e).set(i):t.addValue(e,(0,o/* .motionValue */.OQ)(i))}function a(t,e){const i=(0,n/* .resolveVariant */.K)(t,e);let{transitionEnd:o={},transition:a={},...l}=i||{};l={...l,...o};for(const e in l){r(t,e,(0,s/* .resolveFinalValueInKeyframes */.K)(l[e]))}}
/***/},
/***/4805:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */L:()=>/* binding */r
/* harmony export */,m:()=>/* binding */n
/* harmony export */});
/* harmony import */var s=i(8448),o=i(5673);
/* harmony import */function n(t,e){return(0,s/* .convertBoundingBoxToBox */.FY)((0,s/* .transformBoxPoints */.bS)(t.getBoundingClientRect(),e))}function r(t,e,i){const s=n(t,i),{scroll:r}=e;return r&&((0,o/* .translateAxis */.Ql)(s.x,r.offset.x),(0,o/* .translateAxis */.Ql)(s.y,r.offset.y)),s}
/***/},
/***/4835:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */h:()=>/* binding */u
/* harmony export */,q:()=>/* binding */c
/* harmony export */});
/* harmony import */var s=i(3420),o=i(104);
/* harmony import */const n=new Set;let r=!1,a=!1;function l(){if(a){const t=Array.from(n).filter((t=>t.needsMeasurement)),e=new Set(t.map((t=>t.element))),i=new Map;
/**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */
e.forEach((t=>{const e=(0,s/* .removeNonTranslationalTransform */.W9)(t);e.length&&(i.set(t,e),t.render())})),
// Read
t.forEach((t=>t.measureInitialState())),
// Write
e.forEach((t=>{t.render();const e=i.get(t);e&&e.forEach((([e,i])=>{var s;null===(s=t.getValue(e))||void 0===s||s.set(i)}))})),
// Read
t.forEach((t=>t.measureEndState())),
// Write
t.forEach((t=>{void 0!==t.suspendedScrollY&&window.scrollTo(0,t.suspendedScrollY)}))}a=!1,r=!1,n.forEach((t=>t.complete())),n.clear()}function h(){n.forEach((t=>{t.readKeyframes(),t.needsMeasurement&&(a=!0)}))}function c(){h(),l()}class u{constructor(t,e,i,s,o,n=!1){
/**
         * Track whether this resolver has completed. Once complete, it never
         * needs to attempt keyframe resolution again.
         */
this.isComplete=!1,
/**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */
this.isAsync=!1,
/**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */
this.needsMeasurement=!1,
/**
         * Track whether this resolver is currently scheduled to resolve
         * to allow it to be cancelled and resumed externally.
         */
this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=s,this.element=o,this.isAsync=n}scheduleResolve(){this.isScheduled=!0,this.isAsync?(n.add(this),r||(r=!0,o/* .frame */.Gt.read(h),o/* .frame */.Gt.resolveKeyframes(l))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:e,element:i,motionValue:s}=this;
/**
         * If a keyframe is null, we hydrate it either by reading it from
         * the instance, or propagating from previous keyframes.
         */for(let o=0;o<t.length;o++)if(null===t[o])
/**
                 * If the first keyframe is null, we need to find its value by sampling the element
                 */
if(0===o){const o=null==s?void 0:s.get(),n=t[t.length-1];if(void 0!==o)t[0]=o;else if(i&&e){const s=i.readValue(e,n);null!=s&&(t[0]=s)}void 0===t[0]&&(t[0]=n),s&&void 0===o&&s.set(t[0])}else t[o]=t[o-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),n.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,n.delete(this))}resume(){this.isComplete||this.scheduleResolve()}}
/***/},
/***/5092:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */U:()=>/* binding */s
/* harmony export */,_:()=>/* binding */o
/* harmony export */});const s=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],o=["initial",...s]}
/***/,
/***/5120:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */CQ:()=>/* binding */l
/* harmony export */,HQ:()=>/* binding */h
/* harmony export */,N:()=>/* binding */p
/* harmony export */,jA:()=>/* binding */f
/* harmony export */,vb:()=>/* binding */u
/* harmony export */});
/* unused harmony exports calcAxisDelta, calcRelativeAxis, calcRelativeAxisPosition */
/* harmony import */var s=i(9713);const o=.9999,n=1.0001,r=-.01,a=.01;function l(t){return t.max-t.min}function h(t,e,i){return Math.abs(t-e)<=i}function c(t,e,i,h=.5){t.origin=h,t.originPoint=(0,s/* .mixNumber */.k)(e.min,e.max,t.origin),t.scale=l(i)/l(e),t.translate=(0,s/* .mixNumber */.k)(i.min,i.max,t.origin)-t.originPoint,(t.scale>=o&&t.scale<=n||isNaN(t.scale))&&(t.scale=1),(t.translate>=r&&t.translate<=a||isNaN(t.translate))&&(t.translate=0)}function u(t,e,i,s){c(t.x,e.x,i.x,s?s.originX:void 0),c(t.y,e.y,i.y,s?s.originY:void 0)}function d(t,e,i){t.min=i.min+e.min,t.max=t.min+l(e)}function p(t,e,i){d(t.x,e.x,i.x),d(t.y,e.y,i.y)}function m(t,e,i){t.min=e.min-i.min,t.max=t.min+l(e)}function f(t,e,i){m(t.x,e.x,i.x),m(t.y,e.y,i.y)}
/***/},
/***/5128:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */E:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=i(6540);
/* harmony import */const o=i(8288).B?s.useLayoutEffect:s.useEffect;
/***/},
/***/5133:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{K:()=>/* binding */g});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/animation/utils/is-none.mjs
var s=i(4513),o=i(5972),n=i(4552),r=i(5320);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs
// ./node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs
/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */
const a=new Set(["auto","none","0"]);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs
var l=i(4835),h=i(8104),c=i(7271),u=i(568);
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/errors.mjs
// ./node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
const d=
// eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function p(t,e,i=1){(0,h/* invariant */.V)(i<=4,`Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`);const[s,o]=function(t){const e=d.exec(t);if(!e)return[,];const[,i,s,o]=e;return[`--${null!=i?i:s}`,o]}(t);
// No CSS variable detected
if(!s)return;
// Attempt to read this CSS variable off the element
const n=window.getComputedStyle(e).getPropertyValue(s);if(n){const t=n.trim();return(0,c/* isNumericalString */.i)(t)?parseFloat(t):t}return(0,u/* isCSSVariableToken */.p)(o)?p(o,e,i+1):o}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
var m=i(3420),f=i(1912);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs + 1 modules
// ./node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs
class g extends l/* KeyframeResolver */.h{constructor(t,e,i,s,o){super(t,e,i,s,o,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();
/**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */
for(let i=0;i<t.length;i++){let s=t[i];if("string"==typeof s&&(s=s.trim(),(0,u/* isCSSVariableToken */.p)(s))){const o=p(s,e.current);void 0!==o&&(t[i]=o),i===t.length-1&&(this.finalKeyframe=s)}}
/**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */
/**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */
if(this.resolveNoneKeyframes(),!o/* positionalKeys */.$.has(i)||2!==t.length)return;const[s,n]=t,r=(0,f/* findDimensionValueType */.n)(s),a=(0,f/* findDimensionValueType */.n)(n);
/**
         * Either we don't recognise these value types or we can animate between them.
         */
if(r!==a)
/**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */
if((0,m/* isNumOrPxType */.E4)(r)&&(0,m/* isNumOrPxType */.E4)(a))for(let e=0;e<t.length;e++){const i=t[e];"string"==typeof i&&(t[e]=parseFloat(i))}else
/**
             * Else, the only way to resolve this is by measuring the element.
             */
this.needsMeasurement=!0}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:e}=this,i=[];for(let e=0;e<t.length;e++)(0,s/* isNone */.$)(t[e])&&i.push(e);i.length&&function(t,e,i){let s,o=0;for(;o<t.length&&!s;){const e=t[o];"string"==typeof e&&!a.has(e)&&(0,n/* analyseComplexValue */.V)(e).values.length&&(s=t[o]),o++}if(s&&i)for(const o of e)t[o]=(0,r/* getAnimatableNone */.J)(i,s)}(t,i,e)}measureInitialState(){const{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;"height"===i&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=m/* positionalValues */.Hr[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;
// Set final key frame to measure after next render
const s=e[e.length-1];void 0!==s&&t.getValue(i,s).jump(s,!1)}measureEndState(){var t;const{element:e,name:i,unresolvedKeyframes:s}=this;if(!e||!e.current)return;const o=e.getValue(i);o&&o.jump(this.measuredOrigin,!1);const n=s.length-1,r=s[n];s[n]=m/* positionalValues */.Hr[i](e.measureViewportBox(),window.getComputedStyle(e.current)),null!==r&&void 0===this.finalKeyframe&&(this.finalKeyframe=r),
// If we removed transform values, reapply them before the next render
(null===(t=this.removedTransforms)||void 0===t?void 0:t.length)&&this.removedTransforms.forEach((([t,i])=>{e.getValue(t).set(i)})),this.resolveNoneKeyframes()}}
/***/},
/***/5151:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */q:()=>/* binding */s
/* harmony export */});const s={layout:0,mainThread:0,waapi:0};
/***/},
/***/5309:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{W:()=>/* binding */l});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs
var s=i(2944),o=i(5269);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
// ./node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs
const n={
// Border props
borderWidth:o.px,borderTopWidth:o.px,borderRightWidth:o.px,borderBottomWidth:o.px,borderLeftWidth:o.px,borderRadius:o.px,radius:o.px,borderTopLeftRadius:o.px,borderTopRightRadius:o.px,borderBottomRightRadius:o.px,borderBottomLeftRadius:o.px,
// Positioning props
width:o.px,maxWidth:o.px,height:o.px,maxHeight:o.px,top:o.px,right:o.px,bottom:o.px,left:o.px,
// Spacing props
padding:o.px,paddingTop:o.px,paddingRight:o.px,paddingBottom:o.px,paddingLeft:o.px,margin:o.px,marginTop:o.px,marginRight:o.px,marginBottom:o.px,marginLeft:o.px,
// Misc
backgroundPositionX:o.px,backgroundPositionY:o.px},r={rotate:o/* degrees */.uj,rotateX:o/* degrees */.uj,rotateY:o/* degrees */.uj,rotateZ:o/* degrees */.uj,scale:s/* scale */.hs,scaleX:s/* scale */.hs,scaleY:s/* scale */.hs,scaleZ:s/* scale */.hs,skew:o/* degrees */.uj,skewX:o/* degrees */.uj,skewY:o/* degrees */.uj,distance:o.px,translateX:o.px,translateY:o.px,translateZ:o.px,x:o.px,y:o.px,z:o.px,perspective:o.px,transformPerspective:o.px,opacity:s/* alpha */.X4,originX:o/* progressPercentage */.gQ,originY:o/* progressPercentage */.gQ,originZ:o.px},a={...s/* number */.ai,transform:Math.round},l={...n,...r,zIndex:a,size:o.px,
// SVG
fillOpacity:s/* alpha */.X4,strokeOpacity:s/* alpha */.X4,numOctaves:a}}
/***/,
/***/5320:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */J:()=>/* binding */r
/* harmony export */});
/* harmony import */var s=i(4552),o=i(6044),n=i(1619);
/* harmony import */function r(t,e){let i=(0,n/* .getDefaultValueType */.D)(t);
// If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
return i!==o/* .filter */.p&&(i=s/* .complex */.f),i.getAnimatableNone?i.getAnimatableNone(e):void 0}
/***/},
/***/5673:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */OU:()=>/* binding */u
/* harmony export */,Ql:()=>/* binding */d
/* harmony export */,Ww:()=>/* binding */m
/* harmony export */,hq:()=>/* binding */n
/* harmony export */,o4:()=>/* binding */l
/* harmony export */});
/* unused harmony exports applyAxisDelta, applyPointDelta, transformAxis */
/* harmony import */var s=i(9713),o=i(1630);
/* harmony import */
/**
 * Scales a point based on a factor and an originPoint
 */
function n(t,e,i){return i+e*(t-i)}
/**
 * Applies a translate/scale delta to a point
 */function r(t,e,i,s,o){return void 0!==o&&(t=n(t,o,s)),n(t,i,s)+e}
/**
 * Applies a translate/scale delta to an axis
 */function a(t,e=0,i=1,s,o){t.min=r(t.min,e,i,s,o),t.max=r(t.max,e,i,s,o)}
/**
 * Applies a translate/scale delta to a box
 */function l(t,{x:e,y:i}){a(t.x,e.translate,e.scale,e.originPoint),a(t.y,i.translate,i.scale,i.originPoint)}const h=.999999999999,c=1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function u(t,e,i,s=!1){const n=i.length;if(!n)return;
// Reset the treeScale
let r,a;e.x=e.y=1;for(let h=0;h<n;h++){r=i[h],a=r.projectionDelta;
/**
         * TODO: Prefer to remove this, but currently we have motion components with
         * display: contents in Framer.
         */
const{visualElement:n}=r.options;n&&n.props.style&&"contents"===n.props.style.display||(s&&r.options.layoutScroll&&r.scroll&&r!==r.root&&m(t,{x:-r.scroll.offset.x,y:-r.scroll.offset.y}),a&&(
// Incoporate each ancestor's scale into a culmulative treeScale for this component
e.x*=a.x.scale,e.y*=a.y.scale,
// Apply each ancestor's calculated delta into this component's recorded layout box
l(t,a)),s&&(0,o/* .hasTransform */.HD)(r.latestValues)&&m(t,r.latestValues))}
/**
     * Snap tree scale back to 1 if it's within a non-perceivable threshold.
     * This will help reduce useless scales getting rendered.
     */e.x<c&&e.x>h&&(e.x=1),e.y<c&&e.y>h&&(e.y=1)}function d(t,e){t.min=t.min+e,t.max=t.max+e}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */function p(t,e,i,o,n=.5){
// Apply the axis delta to the final axis
a(t,e,i,(0,s/* .mixNumber */.k)(t.min,t.max,n),o)}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */function m(t,e){p(t.x,e.x,e.scaleX,e.scale,e.originX),p(t.y,e.y,e.scaleY,e.scale,e.originY)}
/***/},
/***/5746:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */w:()=>/* binding */o
/* harmony export */});
/* unused harmony export distance */
const s=(t,e)=>Math.abs(t-e);function o(t,e){
// Multi-dimensional
const i=s(t.x,e.x),o=s(t.y,e.y);return Math.sqrt(i**2+o**2)}
/***/},
/***/5972:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */$:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=i(2443);const o=new Set(["width","height","top","left","right","bottom",...s/* .transformPropOrder */.U]);
/***/},
/***/6551:
/***/(t,e,i)=>{
/**
 * Decides if the supplied variable is variant label
 */
function s(t){return"string"==typeof t||Array.isArray(t)}
/***/
/* harmony export */i.d(e,{
/* harmony export */w:()=>/* binding */s
/* harmony export */})},
/***/7030:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{L:()=>/* binding */m});
// UNUSED EXPORTS: checkVariantsDidChange
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs + 2 modules
var s=i(7523),o=i(5490),n=i(1712);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
// ./node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function r(t,e){if(!Array.isArray(e))return!1;const i=e.length;if(i!==t.length)return!1;for(let s=0;s<i;s++)if(e[s]!==t[s])return!1;return!0}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
var a=i(6551),l=i(5092);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
// ./node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs
const h=l/* variantProps */._.length;function c(t){if(!t)return;if(!t.isControllingVariants){const e=t.parent&&c(t.parent)||{};return void 0!==t.props.initial&&(e.initial=t.props.initial),e}const e={};for(let i=0;i<h;i++){const s=l/* variantProps */._[i],o=t.props[s];((0,a/* isVariantLabel */.w)(o)||!1===o)&&(e[s]=o)}return e}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
var u=i(7118);// ./node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
const d=[...l/* variantPriorityOrder */.U].reverse(),p=l/* variantPriorityOrder */.U.length;function m(t){let e=function(t){return e=>Promise.all(e.map((({animation:e,options:i})=>(0,s/* animateVisualElement */._)(t,e,i))))}(t),i=v(),l=!0;
/**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */
const h=e=>(i,s)=>{var o;const n=(0,u/* resolveVariant */.K)(t,s,"exit"===e?null===(o=t.presenceContext)||void 0===o?void 0:o.custom:void 0);if(n){const{transition:t,transitionEnd:e,...s}=n;i={...i,...s,...e}}return i}
/**
     * This just allows us to inject mocked animation functions
     * @internal
     */;
/**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */
function m(s){const{props:m}=t,g=c(t.parent)||{},v=[],y=new Set;
/**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */
let x={},S=1/0;
/**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */
/**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */
for(let e=0;e<p;e++){const c=d[e],u=i[c],p=void 0!==m[c]?m[c]:g[c],T=(0,a/* isVariantLabel */.w)(p),P=c===s?u.isActive:null;!1===P&&(S=e)
/**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             *
             * TODO: Can probably change this to a !isControllingVariants check
             */;let V=p===g[c]&&p!==m[c]&&T;
/**
             *
             */
// Check if we can skip analysing this prop early
if(V&&l&&t.manuallyAnimateOnMount&&(V=!1)
/**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */,u.protectedKeys={...x},
// If it isn't active and hasn't *just* been set as inactive
!u.isActive&&null===P||
// If we didn't and don't have any defined prop for this animation type
!p&&!u.prevProp||
// Or if the prop doesn't define an animation
// Or if the prop doesn't define an animation
(0,o/* isAnimationControls */.N)(p)||"boolean"==typeof p)continue;
/**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */const w=f(u.prevProp,p);let b=w||
// If we're making this variant active, we want to always make it active
c===s&&u.isActive&&!V&&T||
// If we removed a higher-priority variant (i is in reverse order)
e>S&&T,A=!1;
/**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */
const j=Array.isArray(p)?p:[p];
/**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * animateChanges calls to determine whether a value has changed.
             */let B=j.reduce(h(c),{});!1===P&&(B={})
/**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */;const{prevResolvedValues:D={}}=u,k={...D,...B},C=e=>{b=!0,y.has(e)&&(A=!0,y.delete(e)),u.needsAnimating[e]=!0;const i=t.getValue(e);i&&(i.liveStyle=!1)};for(const t in k){const e=B[t],i=D[t];
// If we've already handled this we can just skip ahead
if(x.hasOwnProperty(t))continue;
/**
                 * If the value has changed, we probably want to animate it.
                 */let s=!1;s=(0,n/* isKeyframesTarget */.p)(e)&&(0,n/* isKeyframesTarget */.p)(i)?!r(e,i):e!==i,s?null!=e?
// If next is defined and doesn't equal prev, it needs animating
C(t):
// If it's undefined, it's been removed.
y.add(t):void 0!==e&&y.has(t)?
/**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */
C(t):
/**
                     * If it hasn't changed, we add it to the list of protected values
                     * to ensure it doesn't get animated.
                     */
u.protectedKeys[t]=!0}
/**
             * Update the typeState so next time animateChanges is called we can compare the
             * latest prop and resolvedValues to these.
             */u.prevProp=p,u.prevResolvedValues=B,
/**
             *
             */
u.isActive&&(x={...x,...B}),l&&t.blockInitialAnimation&&(b=!1)
/**
             * If this is an inherited prop we want to skip this animation
             * unless the inherited variants haven't changed on this render.
             */;b&&(!(V&&w)||A)&&v.push(...j.map((t=>({animation:t,options:{type:c}}))))}
/**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */if(y.size){const e={};
/**
             * If the initial prop contains a transition we can use that, otherwise
             * allow the animation function to use the visual element's default.
             */if("boolean"!=typeof m.initial){const i=(0,u/* resolveVariant */.K)(t,Array.isArray(m.initial)?m.initial[0]:m.initial);i&&i.transition&&(e.transition=i.transition)}y.forEach((i=>{const s=t.getBaseTarget(i),o=t.getValue(i);o&&(o.liveStyle=!0),
// @ts-expect-error - @mattgperry to figure if we should do something here
e[i]=null!=s?s:null})),v.push({animation:e})}let T=Boolean(v.length);return!l||!1!==m.initial&&m.initial!==m.animate||t.manuallyAnimateOnMount||(T=!1),l=!1,T?e(v):Promise.resolve()}
/**
     * Change whether a certain animation type is active.
     */return{animateChanges:m,setActive:function(e,s){var o;
// If the active state hasn't changed, we can safely do nothing here
if(i[e].isActive===s)return Promise.resolve();
// Propagate active change to children
null===(o=t.variantChildren)||void 0===o||o.forEach((t=>{var i;return null===(i=t.animationState)||void 0===i?void 0:i.setActive(e,s)})),i[e].isActive=s;const n=m(e);for(const t in i)i[t].protectedKeys={};return n},setAnimateFunction:function(i){e=i(t)},getState:()=>i,reset:()=>{i=v(),l=!0}}}function f(t,e){return"string"==typeof e?e!==t:!!Array.isArray(e)&&!r(e,t)}function g(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function v(){return{animate:g(!0),whileInView:g(),whileHover:g(),whileTap:g(),whileDrag:g(),whileFocus:g(),exit:g()}}
/***/},
/***/7118:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */K:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=i(3141);function o(t,e,i){const o=t.getProps();return(0,s/* .resolveVariantFromProps */.a)(o,e,void 0!==i?i:o.custom,t)}
/***/},
/***/7177:
/***/(t,e,i)=>{
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function s(t,e){return e?t*(1e3/e):0}
/***/
/* harmony export */i.d(e,{
/* harmony export */f:()=>/* binding */s
/* harmony export */})},
/***/7271:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */i:()=>/* binding */s
/* harmony export */});
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
const s=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t)
/***/},
/***/7312:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */$:()=>/* binding */s
/* harmony export */});
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */
const s=t=>/^0[^.\s]+$/u.test(t)
/***/},
/***/7365:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */B:()=>/* binding */o
/* harmony export */,K:()=>/* binding */n
/* harmony export */});
/* harmony import */var s=i(1712);const o=t=>Boolean(t&&"object"==typeof t&&t.mix&&t.toValue),n=t=>(0,s/* .isKeyframesTarget */.p)(t)?t[t.length-1]||0:t}
/***/,
/***/8062:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */I:()=>/* binding */s
/* harmony export */});
/**
 * Convert camelCase to dash-case properties.
 */
const s=t=>t.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase()
/***/},
/***/8288:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */B:()=>/* binding */s
/* harmony export */});const s="undefined"!=typeof window;
/***/},
/***/8443:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{P:()=>/* binding */Rt});
// UNUSED EXPORTS: rootProjectionNode
// EXTERNAL MODULE: ./node_modules/motion-dom/dist/es/index.mjs + 32 modules
var s=i(1795),o=i(1533),n=i(2956),r=i(4458),a=i(104),l=i(9268),h=i(4582);
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/noop.mjs
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/array.mjs
var c=i(2358);// ./node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
const u=(t,e)=>t.depth-e.depth;// ./node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
class d{constructor(){this.children=[],this.isDirty=!1}add(t){(0,c/* addUniqueItem */.Kq)(this.children,t),this.isDirty=!0}remove(t){(0,c/* removeItem */.Ai)(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(u),this.isDirty=!1,this.children.forEach(t)}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/stats/animation-count.mjs
var p=i(5151),m=i(4283),f=i(2464);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/stats/buffer.mjs
// ./node_modules/framer-motion/dist/es/utils/delay.mjs
/**
 * Timeout defined in ms
 */
function g(t,e){const i=h/* time */.k.now(),s=({timestamp:o})=>{const n=o-i;n>=e&&((0,a/* cancelFrame */.WG)(s),t(n-e))};return a/* frame */.Gt.read(s,!0),()=>(0,a/* cancelFrame */.WG)(s)}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/mix/number.mjs
var v=i(9713),y=i(2606),x=i(4322),S=i(6896),T=i(4868),P=i(5269);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
// ./node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
const V=["TopLeft","TopRight","BottomLeft","BottomRight"],w=V.length,b=t=>"string"==typeof t?parseFloat(t):t,A=t=>"number"==typeof t||P.px.test(t);function j(t,e){return void 0!==t[e]?t[e]:t.borderRadius}
// /**
//  * We only want to mix the background color if there's a follow element
//  * that we're not crossfading opacity between. For instance with switch
//  * AnimateSharedLayout animations, this helps the illusion of a continuous
//  * element being animated but also cuts down on the number of paints triggered
//  * for elements where opacity is doing that work for us.
//  */
// if (
//     !hasFollowElement &&
//     latestLeadValues.backgroundColor &&
//     latestFollowValues.backgroundColor
// ) {
//     /**
//      * This isn't ideal performance-wise as mixColor is creating a new function every frame.
//      * We could probably create a mixer that runs at the start of the animation but
//      * the idea behind the crossfader is that it runs dynamically between two potentially
//      * changing targets (ie opacity or borderRadius may be animating independently via variants)
//      */
//     leadState.backgroundColor = followState.backgroundColor = mixColor(
//         latestFollowValues.backgroundColor as string,
//         latestLeadValues.backgroundColor as string
//     )(p)
// }
const B=k(0,.5,T/* circOut */.yT),D=k(.5,.95,o/* noop */.l);function k(t,e,i){return s=>
// Could replace ifs with clamp
s<t?0:s>e?1:i((0,S/* progress */.q)(t,e,s))}// ./node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */
function C(t,e){t.min=e.min,t.max=e.max}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */function R(t,e){C(t.x,e.x),C(t.y,e.y)}
/**
 * Reset a delta to the provided origin box.
 *
 * This is a mutative operation.
 */function E(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
var F=i(5673),L=i(5120);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
// ./node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */
function M(t,e,i,s,o){return t-=e,t=(0,F/* scalePoint */.hq)(t,1/i,s),void 0!==o&&(t=(0,F/* scalePoint */.hq)(t,1/o,s)),t}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function U(t,e,[i,s,o],n,r){!function(t,e=0,i=1,s=.5,o,n=t,r=t){P/* percent */.KN.test(e)&&(e=parseFloat(e),e=(0,v/* mixNumber */.k)(r.min,r.max,e/100)-r.min);if("number"!=typeof e)return;let a=(0,v/* mixNumber */.k)(n.min,n.max,s);t===n&&(a-=e),t.min=M(t.min,e,i,a,o),t.max=M(t.max,e,i,a,o)}(t,e[i],e[s],e[o],e.scale,n,r)}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */const O=["x","scaleX","originX"],$=["y","scaleY","originY"];
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function I(t,e,i,s){U(t.x,e,O,i?i.x:void 0,s?s.x:void 0),U(t.y,e,$,i?i.y:void 0,s?s.y:void 0)}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var K=i(4106);// ./node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function W(t){return 0===t.translate&&1===t.scale}function N(t){return W(t.x)&&W(t.y)}function X(t,e){return t.min===e.min&&t.max===e.max}function Y(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function z(t,e){return Y(t.x,e.x)&&Y(t.y,e.y)}function Q(t){return(0,L/* calcLength */.CQ)(t.x)/(0,L/* calcLength */.CQ)(t.y)}function H(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}// ./node_modules/framer-motion/dist/es/projection/shared/stack.mjs
class G{constructor(){this.members=[]}add(t){(0,c/* addUniqueItem */.Kq)(this.members,t),t.scheduleRender()}remove(t){if((0,c/* removeItem */.Ai)(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const t=this.members[this.members.length-1];t&&this.promote(t)}}relegate(t){const e=this.members.findIndex((e=>t===e));if(0===e)return!1;
/**
         * Find the next projection node that is present
         */let i;for(let t=e;t>=0;t--){const e=this.members[t];if(!1!==e.isPresent){i=e;break}}return!!i&&(this.promote(i),!0)}promote(t,e){const i=this.lead;if(t!==i&&(this.prevLead=i,this.lead=t,t.show(),i)){i.instance&&i.scheduleRender(),t.scheduleRender(),t.resumeFrom=i,e&&(t.resumeFrom.preserveOpacity=!0),i.snapshot&&(t.snapshot=i.snapshot,t.snapshot.latestValues=i.animationValues||i.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:s}=t.options;!1===s&&i.hide()
/**
             * TODO:
             *   - Test border radius when previous node was deleted
             *   - boxShadow mixing
             *   - Shared between element A in scrolled container and element B (scroll stays the same or changes)
             *   - Shared between element A in transformed container and element B (transform stays the same or changes)
             *   - Shared between element A in scrolled page and element B (scroll stays the same or changes)
             * ---
             *   - Crossfade opacity of root nodes
             *   - layoutId changes after animation
             *   - layoutId changes mid animation
             */}}exitAnimationComplete(){this.members.forEach((t=>{const{options:e,resumingFrom:i}=t;e.onExitComplete&&e.onExitComplete(),i&&i.options.onExitComplete&&i.options.onExitComplete()}))}scheduleRender(){this.members.forEach((t=>{t.instance&&t.scheduleRender(!1)}))}
/**
     * Clear any leads that have been removed this render to prevent them from being
     * used in future animations and to prevent memory leaks
     */removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var q=i(8645);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
var Z=i(2957),_=i(1630),J=i(775);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
// ./node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
const tt={nodes:0,calculatedTargetDeltas:0,calculatedProjections:0},et=["","X","Y","Z"],it={visibility:"hidden"};let st=0;function ot(t,e,i,s){const{latestValues:o}=e;
// Record the distorting transform and then temporarily set it to 0
o[t]&&(i[t]=o[t],e.setStaticValue(t,0),s&&(s[t]=0))}function nt(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;const{visualElement:e}=t.options;if(!e)return;const i=(0,r/* getOptimisedAppearId */.P)(e);if(window.MotionHasOptimisedAnimation(i,"transform")){const{layout:e,layoutId:s}=t.options;window.MotionCancelOptimisedAnimation(i,"transform",a/* frame */.Gt,!(e||s))}const{parent:s}=t;s&&!s.hasCheckedOptimisedAppear&&nt(s)}function rt({attachResizeListener:t,defaultParent:e,measureScroll:i,checkIsScrollRoot:o,resetTransform:r}){return class{constructor(t={},i=(null==e?void 0:e())){
/**
             * A unique ID generated for every projection node.
             */
this.id=st++,
/**
             * An id that represents a unique session instigated by startUpdate.
             */
this.animationId=0,
/**
             * A Set containing all this component's children. This is used to iterate
             * through the children.
             *
             * TODO: This could be faster to iterate as a flat array stored on the root node.
             */
this.children=new Set,
/**
             * Options for the node. We use this to configure what kind of layout animations
             * we should perform (if any).
             */
this.options={},
/**
             * We use this to detect when its safe to shut down part of a projection tree.
             * We have to keep projecting children for scale correction and relative projection
             * until all their parents stop performing layout animations.
             */
this.isTreeAnimating=!1,this.isAnimationBlocked=!1,
/**
             * Flag to true if we think this layout has been changed. We can't always know this,
             * currently we set it to true every time a component renders, or if it has a layoutDependency
             * if that has changed between renders. Additionally, components can be grouped by LayoutGroup
             * and if one node is dirtied, they all are.
             */
this.isLayoutDirty=!1,
/**
             * Flag to true if we think the projection calculations for this node needs
             * recalculating as a result of an updated transform or layout animation.
             */
this.isProjectionDirty=!1,
/**
             * Flag to true if the layout *or* transform has changed. This then gets propagated
             * throughout the projection tree, forcing any element below to recalculate on the next frame.
             */
this.isSharedProjectionDirty=!1,
/**
             * Flag transform dirty. This gets propagated throughout the whole tree but is only
             * respected by shared nodes.
             */
this.isTransformDirty=!1,
/**
             * Block layout updates for instant layout transitions throughout the tree.
             */
this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,
/**
             * Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
             * call.
             */
this.isUpdating=!1,
/**
             * If this is an SVG element we currently disable projection transforms
             */
this.isSVG=!1,
/**
             * Flag to true (during promotion) if a node doing an instant layout transition needs to reset
             * its projection styles.
             */
this.needsReset=!1,
/**
             * Flags whether this node should have its transform reset prior to measuring.
             */
this.shouldResetTransform=!1,
/**
             * Store whether this node has been checked for optimised appear animations. As
             * effects fire bottom-up, and we want to look up the tree for appear animations,
             * this makes sure we only check each path once, stopping at nodes that
             * have already been checked.
             */
this.hasCheckedOptimisedAppear=!1,
/**
             * An object representing the calculated contextual/accumulated/tree scale.
             * This will be used to scale calculcated projection transforms, as these are
             * calculated in screen-space but need to be scaled for elements to layoutly
             * make it to their calculated destinations.
             *
             * TODO: Lazy-init
             */
this.treeScale={x:1,y:1},
/**
             *
             */
this.eventHandlers=new Map,this.hasTreeAnimated=!1,
// Note: Currently only running on root node
this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},
/**
             * This is a multi-step process as shared nodes might be of different depths. Nodes
             * are sorted by depth order, so we need to resolve the entire tree before moving to
             * the next step.
             */
this.updateProjection=()=>{this.projectionUpdateScheduled=!1,
/**
                 * Reset debug counts. Manually resetting rather than creating a new
                 * object each frame.
                 */
m/* statsBuffer */.Q.value&&(tt.nodes=tt.calculatedTargetDeltas=tt.calculatedProjections=0),this.nodes.forEach(ht),this.nodes.forEach(gt),this.nodes.forEach(vt),this.nodes.forEach(ct),m/* statsBuffer */.Q.addProjectionMetrics&&m/* statsBuffer */.Q.addProjectionMetrics(tt)},
/**
             * Frame calculations
             */
this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,
/**
             * Shared layout
             */
// TODO Only running on root node
this.sharedNodes=new Map,this.latestValues=t,this.root=i?i.root||i:this,this.path=i?[...i.path,i]:[],this.parent=i,this.depth=i?i.depth+1:0;for(let t=0;t<this.path.length;t++)this.path[t].shouldResetTransform=!0;this.root===this&&(this.nodes=new d)}addEventListener(t,e){return this.eventHandlers.has(t)||this.eventHandlers.set(t,new y/* SubscriptionManager */.v),this.eventHandlers.get(t).add(e)}notifyListeners(t,...e){const i=this.eventHandlers.get(t);i&&i.notify(...e)}hasListeners(t){return this.eventHandlers.has(t)}
/**
         * Lifecycles
         */mount(e,i=this.root.hasTreeAnimated){if(this.instance)return;// ./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
var o;this.isSVG=(o=e)instanceof SVGElement&&"svg"!==o.tagName,this.instance=e;const{layoutId:n,layout:r,visualElement:a}=this.options;if(a&&!a.current&&a.mount(e),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),i&&(r||n)&&(this.isLayoutDirty=!0),t){let i;const s=()=>this.root.updateBlockedByResize=!1;t(e,(()=>{this.root.updateBlockedByResize=!0,i&&i(),i=g(s,250),J/* globalProjectionState */.w.hasAnimatedSinceResize&&(J/* globalProjectionState */.w.hasAnimatedSinceResize=!1,this.nodes.forEach(ft))}))}n&&this.root.registerSharedNode(n,this),
// Only register the handler if it requires layout animation
!1!==this.options.animate&&a&&(n||r)&&this.addEventListener("didUpdate",(({delta:t,hasLayoutChanged:e,hasRelativeLayoutChanged:i,layout:o})=>{if(this.isTreeAnimationBlocked())return this.target=void 0,void(this.relativeTarget=void 0);
// TODO: Check here if an animation exists
const n=this.options.transition||a.getDefaultTransition()||Vt,{onLayoutAnimationStart:r,onLayoutAnimationComplete:l}=a.getProps(),h=!this.targetLayout||!z(this.targetLayout,o),c=!e&&i;if(this.options.layoutRoot||this.resumeFrom||c||e&&(h||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(t,c);const e={...(0,s/* getValueTransition */.rU)(n,"layout"),onPlay:r,onComplete:l};(a.shouldReduceMotion||this.options.layoutRoot)&&(e.delay=0,e.type=!1),this.startAnimation(e)}else
/**
                         * If the layout hasn't changed and we have an animation that hasn't started yet,
                         * finish it immediately. Otherwise it will be animating from a location
                         * that was probably never commited to screen and look like a jumpy box.
                         */
e||ft(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=o}))}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const t=this.getStack();t&&t.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,(0,a/* cancelFrame */.WG)(this.updateProjection)}
// only on the root
blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}
// Note: currently only running on root node
startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(yt),this.animationId++)}getTransformTemplate(){const{visualElement:t}=this.options;return t&&t.getProps().transformTemplate}willUpdate(t=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked())return void(this.options.onExitComplete&&this.options.onExitComplete());
/**
             * If we're running optimised appear animations then these must be
             * cancelled before measuring the DOM. This is so we can measure
             * the true layout of the element rather than the WAAPI animation
             * which will be unaffected by the resetSkewAndRotate step.
             *
             * Note: This is a DOM write. Worst case scenario is this is sandwiched
             * between other snapshot reads which will cause unnecessary style recalculations.
             * This has to happen here though, as we don't yet know which nodes will need
             * snapshots in startUpdate(), but we only want to cancel optimised animations
             * if a layout animation measurement is actually going to be affected by them.
             */if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&nt(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let t=0;t<this.path.length;t++){const e=this.path[t];e.shouldResetTransform=!0,e.updateScroll("snapshot"),e.options.layoutRoot&&e.willUpdate(!1)}const{layoutId:e,layout:i}=this.options;if(void 0===e&&!i)return;const s=this.getTransformTemplate();this.prevTransformTemplateValue=s?s(this.latestValues,""):void 0,this.updateSnapshot(),t&&this.notifyListeners("willUpdate")}update(){this.updateScheduled=!1;
// When doing an instant transition, we skip the layout update,
// but should still clean up the measurements so that the next
// snapshot could be taken correctly.
if(this.isUpdateBlocked())return this.unblockUpdate(),this.clearAllSnapshots(),void this.nodes.forEach(dt);this.isUpdating||this.nodes.forEach(pt),this.isUpdating=!1,
/**
             * Write
             */
this.nodes.forEach(mt),
/**
             * Read ==================
             */
// Update layout measurements of updated children
this.nodes.forEach(at),
/**
             * Write
             */
// Notify listeners that the layout is updated
this.nodes.forEach(lt),this.clearAllSnapshots();
/**
             * Manually flush any pending updates. Ideally
             * we could leave this to the following requestAnimationFrame but this seems
             * to leave a flash of incorrectly styled content.
             */
const t=h/* time */.k.now();a/* frameData */.uv.delta=(0,f/* clamp */.q)(0,1e3/60,t-a/* frameData */.uv.timestamp),a/* frameData */.uv.timestamp=t,a/* frameData */.uv.isProcessing=!0,a/* frameSteps */.PP.update.process(a/* frameData */.uv),a/* frameSteps */.PP.preRender.process(a/* frameData */.uv),a/* frameSteps */.PP.render.process(a/* frameData */.uv),a/* frameData */.uv.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,l/* microtask */.k.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(ut),this.sharedNodes.forEach(xt)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,a/* frame */.Gt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){
/**
             * If the unmounting node is in a layoutGroup and did trigger a willUpdate,
             * we manually call didUpdate to give a chance to the siblings to animate.
             * Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
             */
a/* frame */.Gt.postRender((()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()}))}
/**
         * Update measurements
         */updateSnapshot(){!this.snapshot&&this.instance&&(this.snapshot=this.measure(),!this.snapshot||(0,L/* calcLength */.CQ)(this.snapshot.measuredBox.x)||(0,L/* calcLength */.CQ)(this.snapshot.measuredBox.y)||(this.snapshot=void 0))}updateLayout(){if(!this.instance)return;
// TODO: Incorporate into a forwarded scroll offset
if(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead()||this.isLayoutDirty))return;
/**
             * When a node is mounted, it simply resumes from the prevLead's
             * snapshot instead of taking a new one, but the ancestors scroll
             * might have updated while the prevLead is unmounted. We need to
             * update the scroll again to make sure the layout we measure is
             * up to date.
             */if(this.resumeFrom&&!this.resumeFrom.instance)for(let t=0;t<this.path.length;t++){this.path[t].updateScroll()}const t=this.layout;this.layout=this.measure(!1),this.layoutCorrected=(0,K/* createBox */.ge)(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:e}=this.options;e&&e.notify("LayoutMeasure",this.layout.layoutBox,t?t.layoutBox:void 0)}updateScroll(t="measure"){let e=Boolean(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===t&&(e=!1),e){const e=o(this.instance);this.scroll={animationId:this.root.animationId,phase:t,isRoot:e,offset:i(this.instance),wasRoot:this.scroll?this.scroll.isRoot:e}}}resetTransform(){if(!r)return;const t=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,e=this.projectionDelta&&!N(this.projectionDelta),i=this.getTransformTemplate(),s=i?i(this.latestValues,""):void 0,o=s!==this.prevTransformTemplateValue;t&&(e||(0,_/* hasTransform */.HD)(this.latestValues)||o)&&(r(this.instance,s),this.shouldResetTransform=!1,this.scheduleRender())}measure(t=!0){const e=this.measurePageBox();let i=this.removeElementScroll(e);
/**
             * Measurements taken during the pre-render stage
             * still have transforms applied so we remove them
             * via calculation.
             */var s;return t&&(i=this.removeTransform(i)),At((s=i).x),At(s.y),{animationId:this.root.animationId,measuredBox:e,layoutBox:i,latestValues:{},source:this.id}}measurePageBox(){var t;const{visualElement:e}=this.options;if(!e)return(0,K/* createBox */.ge)();const i=e.measureViewportBox();if(!((null===(t=this.scroll)||void 0===t?void 0:t.wasRoot)||this.path.some(Bt))){
// Remove viewport scroll to give page-relative coordinates
const{scroll:t}=this.root;t&&((0,F/* translateAxis */.Ql)(i.x,t.offset.x),(0,F/* translateAxis */.Ql)(i.y,t.offset.y))}return i}removeElementScroll(t){var e;const i=(0,K/* createBox */.ge)();if(R(i,t),null===(e=this.scroll)||void 0===e?void 0:e.wasRoot)return i;
/**
             * Performance TODO: Keep a cumulative scroll offset down the tree
             * rather than loop back up the path.
             */for(let e=0;e<this.path.length;e++){const s=this.path[e],{scroll:o,options:n}=s;s!==this.root&&o&&n.layoutScroll&&(
/**
                     * If this is a new scroll root, we want to remove all previous scrolls
                     * from the viewport box.
                     */
o.wasRoot&&R(i,t),(0,F/* translateAxis */.Ql)(i.x,o.offset.x),(0,F/* translateAxis */.Ql)(i.y,o.offset.y))}return i}applyTransform(t,e=!1){const i=(0,K/* createBox */.ge)();R(i,t);for(let t=0;t<this.path.length;t++){const s=this.path[t];!e&&s.options.layoutScroll&&s.scroll&&s!==s.root&&(0,F/* transformBox */.Ww)(i,{x:-s.scroll.offset.x,y:-s.scroll.offset.y}),(0,_/* hasTransform */.HD)(s.latestValues)&&(0,F/* transformBox */.Ww)(i,s.latestValues)}return(0,_/* hasTransform */.HD)(this.latestValues)&&(0,F/* transformBox */.Ww)(i,this.latestValues),i}removeTransform(t){const e=(0,K/* createBox */.ge)();R(e,t);for(let t=0;t<this.path.length;t++){const i=this.path[t];if(!i.instance)continue;if(!(0,_/* hasTransform */.HD)(i.latestValues))continue;(0,_/* hasScale */.vk)(i.latestValues)&&i.updateSnapshot();const s=(0,K/* createBox */.ge)();R(s,i.measurePageBox()),I(e,i.latestValues,i.snapshot?i.snapshot.layoutBox:void 0,s)}return(0,_/* hasTransform */.HD)(this.latestValues)&&I(e,this.latestValues),e}setTargetDelta(t){this.targetDelta=t,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(t){this.options={...this.options,...t,crossfade:void 0===t.crossfade||t.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==a/* frameData */.uv.timestamp&&this.relativeParent.resolveTargetDelta(!0)
/**
             * If the parent target isn't up-to-date, force it to update.
             * This is an unfortunate de-optimisation as it means any updating relative
             * projection will cause all the relative parents to recalculate back
             * up the tree.
             */}resolveTargetDelta(t=!1){var e;
/**
             * Once the dirty status of nodes has been spread through the tree, we also
             * need to check if we have a shared node of a different depth that has itself
             * been dirtied.
             */const i=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=i.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=i.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=i.isSharedProjectionDirty);const s=Boolean(this.resumingFrom)||this!==i;
/**
             * We don't use transform for this step of processing so we don't
             * need to check whether any nodes have changed transform.
             */if(!(t||s&&this.isSharedProjectionDirty||this.isProjectionDirty||(null===(e=this.parent)||void 0===e?void 0:e.isProjectionDirty)||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:o,layoutId:n}=this.options;
/**
             * If we have no layout, we can't perform projection, so early return
             */if(this.layout&&(o||n)){
/**
             * If we don't have a targetDelta but do have a layout, we can attempt to resolve
             * a relativeParent. This will allow a component to perform scale correction
             * even if no animation has started.
             */
if(this.resolvedRelativeTargetAt=a/* frameData */.uv.timestamp,!this.targetDelta&&!this.relativeTarget){const t=this.getClosestProjectingParent();t&&t.layout&&1!==this.animationProgress?(this.relativeParent=t,this.forceRelativeParentToResolveTarget(),this.relativeTarget=(0,K/* createBox */.ge)(),this.relativeTargetOrigin=(0,K/* createBox */.ge)(),(0,L/* calcRelativePosition */.jA)(this.relativeTargetOrigin,this.layout.layoutBox,t.layout.layoutBox),R(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}
/**
             * If we have no relative target or no target delta our target isn't valid
             * for this frame.
             */if(this.relativeTarget||this.targetDelta){
/**
             * If we've been told to attempt to resolve a relative target, do so.
             */
if(
/**
             * Lazy-init target data structure
             */
this.target||(this.target=(0,K/* createBox */.ge)(),this.targetWithTransforms=(0,K/* createBox */.ge)())
/**
             * If we've got a relative box for this component, resolve it into a target relative to the parent.
             */,this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),(0,L/* calcRelativeBox */.N)(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(Boolean(this.resumingFrom)?
// TODO: This is creating a new object every frame
this.target=this.applyTransform(this.layout.layoutBox):R(this.target,this.layout.layoutBox),(0,F/* applyBoxDelta */.o4)(this.target,this.targetDelta)):
/**
                 * If no target, use own layout as target
                 */
R(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const t=this.getClosestProjectingParent();t&&Boolean(t.resumingFrom)===Boolean(this.resumingFrom)&&!t.options.layoutScroll&&t.target&&1!==this.animationProgress?(this.relativeParent=t,this.forceRelativeParentToResolveTarget(),this.relativeTarget=(0,K/* createBox */.ge)(),this.relativeTargetOrigin=(0,K/* createBox */.ge)(),(0,L/* calcRelativePosition */.jA)(this.relativeTargetOrigin,this.target,t.target),R(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}
/**
             * Increase debug counter for resolved target deltas
             */m/* statsBuffer */.Q.value&&tt.calculatedTargetDeltas++}}}getClosestProjectingParent(){if(this.parent&&!(0,_/* hasScale */.vk)(this.parent.latestValues)&&!(0,_/* has2DTranslate */.vF)(this.parent.latestValues))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return Boolean((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var t;const e=this.getLead(),i=Boolean(this.resumingFrom)||this!==e;let s=!0;
/**
             * If this is a normal layout animation and neither this node nor its nearest projecting
             * is dirty then we can't skip.
             */if((this.isProjectionDirty||(null===(t=this.parent)||void 0===t?void 0:t.isProjectionDirty))&&(s=!1)
/**
             * If this is a shared layout animation and this node's shared projection is dirty then
             * we can't skip.
             */,i&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(s=!1)
/**
             * If we have resolved the target this frame we must recalculate the
             * projection to ensure it visually represents the internal calculations.
             */,this.resolvedRelativeTargetAt===a/* frameData */.uv.timestamp&&(s=!1),s)return;const{layout:o,layoutId:n}=this.options;
/**
             * If this section of the tree isn't animating we can
             * delete our target sources for the following frame.
             */if(this.isTreeAnimating=Boolean(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!o&&!n)return;
/**
             * Reset the corrected box with the latest values from box, as we're then going
             * to perform mutative operations on it.
             */R(this.layoutCorrected,this.layout.layoutBox);
/**
             * Record previous tree scales before updating.
             */
const r=this.treeScale.x,l=this.treeScale.y;
/**
             * Apply all the parent deltas to this box to produce the corrected box. This
             * is the layout box, as it will appear on screen as a result of the transforms of its parents.
             */
/**
             * Apply all the parent deltas to this box to produce the corrected box. This
             * is the layout box, as it will appear on screen as a result of the transforms of its parents.
             */
(0,F/* applyTreeDeltas */.OU)(this.layoutCorrected,this.treeScale,this.path,i),
/**
             * If this layer needs to perform scale correction but doesn't have a target,
             * use the layout as the target.
             */
!e.layout||e.target||1===this.treeScale.x&&1===this.treeScale.y||(e.target=e.layout.layoutBox,e.targetWithTransforms=(0,K/* createBox */.ge)());const{target:h}=e;h?(this.projectionDelta&&this.prevProjectionDelta?(E(this.prevProjectionDelta.x,this.projectionDelta.x),E(this.prevProjectionDelta.y,this.projectionDelta.y)):this.createProjectionDeltas()
/**
             * Update the delta between the corrected box and the target box before user-set transforms were applied.
             * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
             * for our layout reprojection, but still allow them to be scaled correctly by the user.
             * It might be that to simplify this we may want to accept that user-set scale is also corrected
             * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
             * to allow people to choose whether these styles are corrected based on just the
             * layout reprojection or the final bounding box.
             */,(0,L/* calcBoxDelta */.vb)(this.projectionDelta,this.layoutCorrected,h,this.latestValues),this.treeScale.x===r&&this.treeScale.y===l&&H(this.projectionDelta.x,this.prevProjectionDelta.x)&&H(this.projectionDelta.y,this.prevProjectionDelta.y)||(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",h))
/**
             * Increase debug counter for recalculated projections
             */,m/* statsBuffer */.Q.value&&tt.calculatedProjections++):
/**
                 * If we don't have a target to project into, but we were previously
                 * projecting, we want to remove the stored transform and schedule
                 * a render to ensure the elements reflect the removed transform.
                 */
this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender())}hide(){this.isVisible=!1;
// TODO: Schedule render
}show(){this.isVisible=!0;
// TODO: Schedule render
}scheduleRender(t=!0){var e;if(null===(e=this.options.visualElement)||void 0===e||e.scheduleRender(),t){const t=this.getStack();t&&t.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=(0,K/* createDelta */.xU)(),this.projectionDelta=(0,K/* createDelta */.xU)(),this.projectionDeltaWithTransform=(0,K/* createDelta */.xU)()}setAnimationOrigin(t,e=!1){const i=this.snapshot,s=i?i.latestValues:{},o={...this.latestValues},n=(0,K/* createDelta */.xU)();this.relativeParent&&this.relativeParent.options.layoutRoot||(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!e;const r=(0,K/* createBox */.ge)(),a=(i?i.source:void 0)!==(this.layout?this.layout.source:void 0),l=this.getStack(),h=!l||l.members.length<=1,c=Boolean(a&&!h&&!0===this.options.crossfade&&!this.path.some(Pt));let u;this.animationProgress=0,this.mixTargetDelta=e=>{const i=e/1e3;var l,d,p,m,f,g;St(n.x,t.x,i),St(n.y,t.y,i),this.setTargetDelta(n),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&((0,L/* calcRelativePosition */.jA)(r,this.layout.layoutBox,this.relativeParent.layout.layoutBox),p=this.relativeTarget,m=this.relativeTargetOrigin,f=r,g=i,Tt(p.x,m.x,f.x,g),Tt(p.y,m.y,f.y,g),
/**
                     * If this is an unchanged relative target we can consider the
                     * projection not dirty.
                     */
u&&(l=this.relativeTarget,d=u,X(l.x,d.x)&&X(l.y,d.y))&&(this.isProjectionDirty=!1),u||(u=(0,K/* createBox */.ge)()),R(u,this.relativeTarget)),a&&(this.animationValues=o,function(t,e,i,s,o,n){o?(t.opacity=(0,v/* mixNumber */.k)(0,
// TODO Reinstate this if only child
void 0!==i.opacity?i.opacity:1,B(s)),t.opacityExit=(0,v/* mixNumber */.k)(void 0!==e.opacity?e.opacity:1,0,D(s))):n&&(t.opacity=(0,v/* mixNumber */.k)(void 0!==e.opacity?e.opacity:1,void 0!==i.opacity?i.opacity:1,s))
/**
     * Mix border radius
     */;for(let o=0;o<w;o++){const n=`border${V[o]}Radius`;let r=j(e,n),a=j(i,n);void 0===r&&void 0===a||(r||(r=0),a||(a=0),0===r||0===a||A(r)===A(a)?(t[n]=Math.max((0,v/* mixNumber */.k)(b(r),b(a),s),0),(P/* percent */.KN.test(a)||P/* percent */.KN.test(r))&&(t[n]+="%")):t[n]=a)}
/**
     * Mix rotation
     */(e.rotate||i.rotate)&&(t.rotate=(0,v/* mixNumber */.k)(e.rotate||0,i.rotate||0,s))}(o,s,this.latestValues,i,c,h)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=i},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(t){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&((0,a/* cancelFrame */.WG)(this.pendingAnimation),this.pendingAnimation=void 0)
/**
             * Start the animation in the next frame to have a frame with progress 0,
             * where the target is the same as when the animation started, so we can
             * calculate the relative positions correctly for instant transitions.
             */,this.pendingAnimation=a/* frame */.Gt.update((()=>{J/* globalProjectionState */.w.hasAnimatedSinceResize=!0,p/* activeAnimations */.q.layout++,this.currentAnimation=(0,n/* animateSingleValue */.z)(0,1e3,{...t,onUpdate:e=>{this.mixTargetDelta(e),t.onUpdate&&t.onUpdate(e)},onStop:()=>{p/* activeAnimations */.q.layout--},onComplete:()=>{p/* activeAnimations */.q.layout--,t.onComplete&&t.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0}))}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const t=this.getStack();t&&t.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(1e3),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const t=this.getLead();let{targetWithTransforms:e,target:i,layout:s,latestValues:o}=t;if(e&&i&&s){
/**
             * If we're only animating position, and this element isn't the lead element,
             * then instead of projecting into the lead box we instead want to calculate
             * a new target that aligns the two boxes but maintains the layout shape.
             */
if(this!==t&&this.layout&&s&&jt(this.options.animationType,this.layout.layoutBox,s.layoutBox)){i=this.target||(0,K/* createBox */.ge)();const e=(0,L/* calcLength */.CQ)(this.layout.layoutBox.x);i.x.min=t.target.x.min,i.x.max=i.x.min+e;const s=(0,L/* calcLength */.CQ)(this.layout.layoutBox.y);i.y.min=t.target.y.min,i.y.max=i.y.min+s}R(e,i),
/**
             * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
             * This is the final box that we will then project into by calculating a transform delta and
             * applying it to the corrected box.
             */
/**
             * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
             * This is the final box that we will then project into by calculating a transform delta and
             * applying it to the corrected box.
             */
(0,F/* transformBox */.Ww)(e,o),
/**
             * Update the delta between the corrected box and the final target box, after
             * user-set transforms are applied to it. This will be used by the renderer to
             * create a transform style that will reproject the element from its layout layout
             * into the desired bounding box.
             */
/**
             * Update the delta between the corrected box and the final target box, after
             * user-set transforms are applied to it. This will be used by the renderer to
             * create a transform style that will reproject the element from its layout layout
             * into the desired bounding box.
             */
(0,L/* calcBoxDelta */.vb)(this.projectionDeltaWithTransform,this.layoutCorrected,e,o)}}registerSharedNode(t,e){this.sharedNodes.has(t)||this.sharedNodes.set(t,new G);this.sharedNodes.get(t).add(e);const i=e.options.initialPromotionConfig;e.promote({transition:i?i.transition:void 0,preserveFollowOpacity:i&&i.shouldPreserveFollowOpacity?i.shouldPreserveFollowOpacity(e):void 0})}isLead(){const t=this.getStack();return!t||t.lead===this}getLead(){var t;const{layoutId:e}=this.options;return e&&(null===(t=this.getStack())||void 0===t?void 0:t.lead)||this}getPrevLead(){var t;const{layoutId:e}=this.options;return e?null===(t=this.getStack())||void 0===t?void 0:t.prevLead:void 0}getStack(){const{layoutId:t}=this.options;if(t)return this.root.sharedNodes.get(t)}promote({needsReset:t,transition:e,preserveFollowOpacity:i}={}){const s=this.getStack();s&&s.promote(this,i),t&&(this.projectionDelta=void 0,this.needsReset=!0),e&&this.setOptions({transition:e})}relegate(){const t=this.getStack();return!!t&&t.relegate(this)}resetSkewAndRotation(){const{visualElement:t}=this.options;if(!t)return;
// If there's no detected skew or rotation values, we can early return without a forced render.
let e=!1;
/**
             * An unrolled check for rotation values. Most elements don't have any rotation and
             * skipping the nested loop and new object creation is 50% faster.
             */const{latestValues:i}=t;
// If there's no distorting values, we don't need to do any more.
if((i.z||i.rotate||i.rotateX||i.rotateY||i.rotateZ||i.skewX||i.skewY)&&(e=!0),!e)return;const s={};i.z&&ot("z",t,s,this.animationValues);
// Check the skew and rotate value of all axes and reset to 0
for(let e=0;e<et.length;e++)ot(`rotate${et[e]}`,t,s,this.animationValues),ot(`skew${et[e]}`,t,s,this.animationValues);
// Force a render of this element to apply the transform with all skews and rotations
// set to 0.
t.render();
// Put back all the values we reset
for(const e in s)t.setStaticValue(e,s[e]),this.animationValues&&(this.animationValues[e]=s[e]);
// Schedule a render for the next frame. This ensures we won't visually
// see the element with the reset rotate value applied.
t.scheduleRender()}getProjectionStyles(t){var e,i;if(!this.instance||this.isSVG)return;if(!this.isVisible)return it;const s={visibility:""},o=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,s.opacity="",s.pointerEvents=(0,x/* resolveMotionValue */.u)(null==t?void 0:t.pointerEvents)||"",s.transform=o?o(this.latestValues,""):"none",s;const n=this.getLead();if(!this.projectionDelta||!this.layout||!n.target){const e={};return this.options.layoutId&&(e.opacity=void 0!==this.latestValues.opacity?this.latestValues.opacity:1,e.pointerEvents=(0,x/* resolveMotionValue */.u)(null==t?void 0:t.pointerEvents)||""),this.hasProjected&&!(0,_/* hasTransform */.HD)(this.latestValues)&&(e.transform=o?o({},""):"none",this.hasProjected=!1),e}const r=n.animationValues||n.latestValues;this.applyTransformsToTarget(),s.transform=// ./node_modules/framer-motion/dist/es/projection/styles/transform.mjs
function(t,e,i){let s="";
/**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */const o=t.x.translate/e.x,n=t.y.translate/e.y,r=(null==i?void 0:i.z)||0;if((o||n||r)&&(s=`translate3d(${o}px, ${n}px, ${r}px) `)
/**
     * Apply scale correction for the tree transform.
     * This will apply scale to the screen-orientated axes.
     */,1===e.x&&1===e.y||(s+=`scale(${1/e.x}, ${1/e.y}) `),i){const{transformPerspective:t,rotate:e,rotateX:o,rotateY:n,skewX:r,skewY:a}=i;t&&(s=`perspective(${t}px) ${s}`),e&&(s+=`rotate(${e}deg) `),o&&(s+=`rotateX(${o}deg) `),n&&(s+=`rotateY(${n}deg) `),r&&(s+=`skewX(${r}deg) `),a&&(s+=`skewY(${a}deg) `)}
/**
     * Apply scale to match the size of the element to the size we want it.
     * This will apply scale to the element-orientated axes.
     */const a=t.x.scale*e.x,l=t.y.scale*e.y;return 1===a&&1===l||(s+=`scale(${a}, ${l})`),s||"none"}(this.projectionDeltaWithTransform,this.treeScale,r),o&&(s.transform=o(r,s.transform));const{x:a,y:l}=this.projectionDelta;s.transformOrigin=`${100*a.origin}% ${100*l.origin}% 0`,n.animationValues?
/**
                 * If the lead component is animating, assign this either the entering/leaving
                 * opacity
                 */
s.opacity=n===this?null!==(i=null!==(e=r.opacity)&&void 0!==e?e:this.latestValues.opacity)&&void 0!==i?i:1:this.preserveOpacity?this.latestValues.opacity:r.opacityExit:
/**
                 * Or we're not animating at all, set the lead component to its layout
                 * opacity and other components to hidden.
                 */
s.opacity=n===this?void 0!==r.opacity?r.opacity:"":void 0!==r.opacityExit?r.opacityExit:0
/**
             * Apply scale correction
             */;for(const t in q/* scaleCorrectors */.H){if(void 0===r[t])continue;const{correct:e,applyTo:i,isCSSVariable:o}=q/* scaleCorrectors */.H[t],a="none"===s.transform?r[t]:e(r[t],n);
/**
                 * Only apply scale correction to the value if we have an
                 * active projection transform. Otherwise these values become
                 * vulnerable to distortion if the element changes size without
                 * a corresponding layout animation.
                 */if(i){const t=i.length;for(let e=0;e<t;e++)s[i[e]]=a}else
// If this is a CSS variable, set it directly on the instance.
// Replacing this function from creating styles to setting them
// would be a good place to remove per frame object creation
o?this.options.visualElement.renderState.vars[t]=a:s[t]=a}
/**
             * Disable pointer events on follow components. This is to ensure
             * that if a follow component covers a lead component it doesn't block
             * pointer events on the lead.
             */return this.options.layoutId&&(s.pointerEvents=n===this?(0,x/* resolveMotionValue */.u)(null==t?void 0:t.pointerEvents)||"":"none"),s}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}
// Only run on root
resetTree(){this.root.nodes.forEach((t=>{var e;return null===(e=t.currentAnimation)||void 0===e?void 0:e.stop()})),this.root.nodes.forEach(dt),this.root.sharedNodes.clear()}}}function at(t){t.updateLayout()}function lt(t){var e;const i=(null===(e=t.resumeFrom)||void 0===e?void 0:e.snapshot)||t.snapshot;if(t.isLead()&&t.layout&&i&&t.hasListeners("didUpdate")){const{layoutBox:e,measuredBox:s}=t.layout,{animationType:o}=t.options,n=i.source!==t.layout.source;
// TODO Maybe we want to also resize the layout snapshot so we don't trigger
// animations for instance if layout="size" and an element has only changed position
"size"===o?(0,Z/* eachAxis */.X)((t=>{const s=n?i.measuredBox[t]:i.layoutBox[t],o=(0,L/* calcLength */.CQ)(s);s.min=e[t].min,s.max=s.min+o})):jt(o,i.layoutBox,e)&&(0,Z/* eachAxis */.X)((s=>{const o=n?i.measuredBox[s]:i.layoutBox[s],r=(0,L/* calcLength */.CQ)(e[s]);o.max=o.min+r,
/**
                 * Ensure relative target gets resized and rerendererd
                 */
t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[s].max=t.relativeTarget[s].min+r)}));const r=(0,K/* createDelta */.xU)();(0,L/* calcBoxDelta */.vb)(r,e,i.layoutBox);const a=(0,K/* createDelta */.xU)();n?(0,L/* calcBoxDelta */.vb)(a,t.applyTransform(s,!0),i.measuredBox):(0,L/* calcBoxDelta */.vb)(a,e,i.layoutBox);const l=!N(r);let h=!1;if(!t.resumeFrom){const s=t.getClosestProjectingParent();
/**
             * If the relativeParent is itself resuming from a different element then
             * the relative snapshot is not relavent
             */if(s&&!s.resumeFrom){const{snapshot:o,layout:n}=s;if(o&&n){const r=(0,K/* createBox */.ge)();(0,L/* calcRelativePosition */.jA)(r,i.layoutBox,o.layoutBox);const a=(0,K/* createBox */.ge)();(0,L/* calcRelativePosition */.jA)(a,e,n.layoutBox),z(r,a)||(h=!0),s.options.layoutRoot&&(t.relativeTarget=a,t.relativeTargetOrigin=r,t.relativeParent=s)}}}t.notifyListeners("didUpdate",{layout:e,snapshot:i,delta:a,layoutDelta:r,hasLayoutChanged:l,hasRelativeLayoutChanged:h})}else if(t.isLead()){const{onExitComplete:e}=t.options;e&&e()}
/**
     * Clearing transition
     * TODO: Investigate why this transition is being passed in as {type: false } from Framer
     * and why we need it at all
     */t.options.transition=void 0}function ht(t){
/**
     * Increase debug counter for nodes encountered this frame
     */
m/* statsBuffer */.Q.value&&tt.nodes++,t.parent&&(
/**
     * If this node isn't projecting, propagate isProjectionDirty. It will have
     * no performance impact but it will allow the next child that *is* projecting
     * but *isn't* dirty to just check its parent to see if *any* ancestor needs
     * correcting.
     */
t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty)
/**
     * Propagate isSharedProjectionDirty and isTransformDirty
     * throughout the whole tree. A future revision can take another look at
     * this but for safety we still recalcualte shared nodes.
     */,t.isSharedProjectionDirty||(t.isSharedProjectionDirty=Boolean(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function ct(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function ut(t){t.clearSnapshot()}function dt(t){t.clearMeasurements()}function pt(t){t.isLayoutDirty=!1}function mt(t){const{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function ft(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function gt(t){t.resolveTargetDelta()}function vt(t){t.calcProjection()}function yt(t){t.resetSkewAndRotation()}function xt(t){t.removeLeadSnapshot()}function St(t,e,i){t.translate=(0,v/* mixNumber */.k)(e.translate,0,i),t.scale=(0,v/* mixNumber */.k)(e.scale,1,i),t.origin=e.origin,t.originPoint=e.originPoint}function Tt(t,e,i,s){t.min=(0,v/* mixNumber */.k)(e.min,i.min,s),t.max=(0,v/* mixNumber */.k)(e.max,i.max,s)}function Pt(t){return t.animationValues&&void 0!==t.animationValues.opacityExit}const Vt={duration:.45,ease:[.4,0,.1,1]},wt=t=>"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t)
/**
 * Measured bounding boxes must be rounded in Safari and
 * left untouched in Chrome, otherwise non-integer layouts within scaled-up elements
 * can appear to jump.
 */,bt=wt("applewebkit/")&&!wt("chrome/")?Math.round:o/* noop */.l;function At(t){
// Round to the nearest .5 pixels to support subpixel layouts
t.min=bt(t.min),t.max=bt(t.max)}function jt(t,e,i){return"position"===t||"preserve-aspect"===t&&!(0,L/* isNear */.HQ)(Q(e),Q(i),.2)}function Bt(t){var e;return t!==t.root&&(null===(e=t.scroll)||void 0===e?void 0:e.wasRoot)}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/events/add-dom-event.mjs
var Dt=i(3998);// ./node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
const kt=rt({attachResizeListener:(t,e)=>(0,Dt/* addDomEvent */.k)(t,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Ct={current:void 0},Rt=rt({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!Ct.current){const t=new kt({});t.mount(window),t.setOptions({layoutScroll:!0}),Ct.current=t}return Ct.current},resetTransform:(t,e)=>{t.style.transform=void 0!==e?e:"none"},checkIsScrollRoot:t=>Boolean("fixed"===window.getComputedStyle(t).position)})}
/***/,
/***/8448:
/***/(t,e,i)=>{
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function s({top:t,left:e,right:i,bottom:s}){return{x:{min:e,max:i},y:{min:t,max:s}}}function o({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */function n(t,e){if(!e)return t;const i=e({x:t.left,y:t.top}),s=e({x:t.right,y:t.bottom});return{top:i.y,left:i.x,bottom:s.y,right:s.x}}
/***/
/* harmony export */i.d(e,{
/* harmony export */FY:()=>/* binding */s
/* harmony export */,bS:()=>/* binding */n
/* harmony export */,pA:()=>/* binding */o
/* harmony export */})},
/***/8601:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */M:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=i(6540);
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */function o(t){const e=(0,s.useRef)(null);return null===e.current&&(e.current=t()),e.current}
/***/},
/***/8605:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */_:()=>/* binding */n
/* harmony export */});
/* harmony import */var s=i(9713),o=i(4552);
/* harmony import */const n={correct:(t,{treeScale:e,projectionDelta:i})=>{const n=t,r=o/* .complex */.f.parse(t);
// TODO: Doesn't support multiple shadows
if(r.length>5)return n;const a=o/* .complex */.f.createTransformer(t),l="number"!=typeof r[0]?1:0,h=i.x.scale*e.x,c=i.y.scale*e.y;r[0+l]/=h,r[1+l]/=c;
/**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */
const u=(0,s/* .mixNumber */.k)(h,c,.5);
// Blur
return"number"==typeof r[2+l]&&(r[2+l]/=u),
// Spread
"number"==typeof r[3+l]&&(r[3+l]/=u),a(r)}};
/***/},
/***/8645:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */$:()=>/* binding */n
/* harmony export */,H:()=>/* binding */o
/* harmony export */});
/* harmony import */var s=i(568);const o={};function n(t){for(const e in t)o[e]=t[e],(0,s/* .isCSSVariableName */.j)(e)&&(o[e].isCSSVariable=!0)}
/***/},
/***/8799:
/***/(t,e,i)=>{
// EXPORTS
i.d(e,{j:()=>/* binding */w});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/mix/number.mjs
var s=i(9713),o=i(8104);
// EXTERNAL MODULE: ./node_modules/motion-utils/dist/es/errors.mjs
// ./node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs
// Adapted from https://gist.github.com/mjackson/5311256
function n(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t}
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/color/hex.mjs
var r=i(5252),a=i(3735),l=i(2027);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/color/rgba.mjs
// ./node_modules/framer-motion/dist/es/utils/mix/immediate.mjs
function h(t,e){return i=>i>0?e:t}// ./node_modules/framer-motion/dist/es/utils/mix/color.mjs
// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const c=(t,e,i)=>{const s=t*t,o=i*(e*e-s)+s;return o<0?0:Math.sqrt(o)},u=[r/* hex */.u,a/* rgba */.B,l/* hsla */.V];function d(t){const e=(i=t,u.find((t=>t.test(i))));var i;if((0,o/* warning */.$)(Boolean(e),`'${t}' is not an animatable color. Use the equivalent color code instead.`),!Boolean(e))return!1;let s=e.parse(t);return e===l/* hsla */.V&&(
// TODO Remove this cast - needed since Motion's stricter typing
s=function({hue:t,saturation:e,lightness:i,alpha:s}){t/=360,i/=100;let o=0,r=0,a=0;if(e/=100){const s=i<.5?i*(1+e):i+e-i*e,l=2*i-s;o=n(l,s,t+1/3),r=n(l,s,t),a=n(l,s,t-1/3)}else o=r=a=i;return{red:Math.round(255*o),green:Math.round(255*r),blue:Math.round(255*a),alpha:s}}(s)),s}const p=(t,e)=>{const i=d(t),o=d(e);if(!i||!o)return h(t,e);const n={...i};return t=>(n.red=c(i.red,o.red,t),n.green=c(i.green,o.green,t),n.blue=c(i.blue,o.blue,t),n.alpha=(0,s/* mixNumber */.k)(i.alpha,o.alpha,t),a/* rgba */.B.transform(n))};
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/utils/pipe.mjs
var m=i(1339),f=i(7739),g=i(4552),v=i(568);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/color/index.mjs
// ./node_modules/framer-motion/dist/es/utils/mix/visibility.mjs
const y=new Set(["none","hidden"]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */ // ./node_modules/framer-motion/dist/es/utils/mix/complex.mjs
function x(t,e){return i=>(0,s/* mixNumber */.k)(t,e,i)}function S(t){return"number"==typeof t?x:"string"==typeof t?(0,v/* isCSSVariableToken */.p)(t)?h:f/* color */.y.test(t)?p:V:Array.isArray(t)?T:"object"==typeof t?f/* color */.y.test(t)?p:P:h}function T(t,e){const i=[...t],s=i.length,o=t.map(((t,i)=>S(t)(t,e[i])));return t=>{for(let e=0;e<s;e++)i[e]=o[e](t);return i}}function P(t,e){const i={...t,...e},s={};for(const o in i)void 0!==t[o]&&void 0!==e[o]&&(s[o]=S(t[o])(t[o],e[o]));return t=>{for(const e in s)i[e]=s[e](t);return i}}const V=(t,e)=>{const i=g/* complex */.f.createTransformer(e),s=(0,g/* analyseComplexValue */.V)(t),n=(0,g/* analyseComplexValue */.V)(e);return s.indexes.var.length===n.indexes.var.length&&s.indexes.color.length===n.indexes.color.length&&s.indexes.number.length>=n.indexes.number.length?y.has(t)&&!n.values.length||y.has(e)&&!s.values.length?function(t,e){return y.has(t)?i=>i<=0?t:e:i=>i>=1?e:t}(t,e):(0,m/* pipe */.F)(T(function(t,e){var i;const s=[],o={color:0,var:0,number:0};for(let n=0;n<e.values.length;n++){const r=e.types[n],a=t.indexes[r][o[r]],l=null!==(i=t.values[a])&&void 0!==i?i:0;s[n]=l,o[r]++}return s}(s,n),n.values),i):((0,o/* warning */.$)(!0,`Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),h(t,e))};// ./node_modules/framer-motion/dist/es/utils/mix/index.mjs
function w(t,e,i){if("number"==typeof t&&"number"==typeof e&&"number"==typeof i)return(0,s/* mixNumber */.k)(t,e,i);return S(t)(t,e)}
/***/},
/***/8844:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */G:()=>/* binding */h
/* harmony export */});
/* harmony import */var s=i(1533),o=i(8104),n=i(6896),r=i(2464),a=i(8799),l=i(1339);
/* harmony import */
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revist this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */
function h(t,e,{clamp:i=!0,ease:h,mixer:c}={}){const u=t.length;
/**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */
if((0,o/* .invariant */.V)(u===e.length,"Both input and output ranges must be the same length"),1===u)return()=>e[0];if(2===u&&e[0]===e[1])return()=>e[1];const d=t[0]===t[1];
// If input runs highest -> lowest, reverse both arrays
t[0]>t[u-1]&&(t=[...t].reverse(),e=[...e].reverse());const p=function(t,e,i){const o=[],n=i||a/* .mix */.j,r=t.length-1;for(let i=0;i<r;i++){let r=n(t[i],t[i+1]);if(e){const t=Array.isArray(e)?e[i]||s/* .noop */.l:e;r=(0,l/* .pipe */.F)(t,r)}o.push(r)}return o}(e,h,c),m=p.length,f=i=>{if(d&&i<t[0])return e[0];let s=0;if(m>1)for(;s<t.length-2&&!(i<t[s+1]);s++);const o=(0,n/* .progress */.q)(t[s],t[s+1],i);return p[s](o)};return i?e=>f((0,r/* .clamp */.q)(t[0],t[u-1],e)):f}
/***/},
/***/9652:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */d:()=>/* binding */s
/* harmony export */});const s={current:!1};
/***/},
/***/9713:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */k:()=>/* binding */s
/* harmony export */});
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/
const s=(t,e,i)=>t+(e-t)*i;
/***/},
/***/9826:
/***/(t,e,i)=>{
/* harmony export */i.d(e,{
/* harmony export */P:()=>/* binding */n
/* harmony export */});
/* unused harmony export pixelsToPercent */
/* harmony import */var s=i(5269);function o(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */const n={correct:(t,e)=>{if(!e.target)return t;
/**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */if("string"==typeof t){if(!s.px.test(t))return t;t=parseFloat(t)}
/**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */return`${o(t,e.target.x)}% ${o(t,e.target.y)}%`}};
/***/}}]);