"use strict";(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[9159],{
/***/29:
/***/(t,s,e)=>{
// EXPORTS
e.d(s,{g:()=>/* binding */n});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var r=e(9896);// ./node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function n(t,s){const e=t.getValue("willChange");
/**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */if(n=e,Boolean((0,r/* isMotionValue */.S)(n)&&n.add))return e.add(s);// ./node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
var n}
/***/},
/***/849:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */S:()=>/* binding */r
/* harmony export */});const r=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
/***/},
/***/2027:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */V:()=>/* binding */o
/* harmony export */});
/* harmony import */var r=e(2944),n=e(5269),a=e(6046),i=e(3259);
/* harmony import */const o={test:(0,i/* .isColorString */.$)("hsl","hue"),parse:(0,i/* .splitColor */.q)("hue","saturation","lightness"),transform:({hue:t,saturation:s,lightness:e,alpha:i=1})=>"hsla("+Math.round(t)+", "+n/* .percent */.KN.transform((0,a/* .sanitize */.a)(s))+", "+n/* .percent */.KN.transform((0,a/* .sanitize */.a)(e))+", "+(0/* .alpha */,a/* .sanitize */.a)(r.X4.transform(i))+")"};
/***/},
/***/2944:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */X4:()=>/* binding */a
/* harmony export */,ai:()=>/* binding */n
/* harmony export */,hs:()=>/* binding */i
/* harmony export */});
/* harmony import */var r=e(2464);const n={test:t=>"number"==typeof t,parse:parseFloat,transform:t=>t},a={...n,transform:t=>(0,r/* .clamp */.q)(0,1,t)},i={...n,default:1}}
/***/,
/***/3259:
/***/(t,s,e)=>{
// EXPORTS
e.d(s,{$:()=>/* binding */a,q:()=>/* binding */i});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs
var r=e(849);// ./node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs
const n=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,a=(t,s)=>e=>Boolean("string"==typeof e&&n.test(e)&&e.startsWith(t)||s&&!// ./node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs
function(t){return null==t}(e)&&Object.prototype.hasOwnProperty.call(e,s)),i=(t,s,e)=>n=>{if("string"!=typeof n)return n;const[a,i,o,h]=n.match(r/* floatRegex */.S);return{[t]:parseFloat(a),[s]:parseFloat(i),[e]:parseFloat(o),alpha:void 0!==h?parseFloat(h):1}}
/***/},
/***/3735:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */B:()=>/* binding */h
/* harmony export */});
/* unused harmony export rgbUnit */
/* harmony import */var r=e(2464),n=e(2944),a=e(6046),i=e(3259);
/* harmony import */const o={...n/* .number */.ai,transform:t=>Math.round((t=>(0,r/* .clamp */.q)(0,255,t))(t))},h={test:(0,i/* .isColorString */.$)("rgb","red"),parse:(0,i/* .splitColor */.q)("red","green","blue"),transform:({red:t,green:s,blue:e,alpha:r=1})=>"rgba("+o.transform(t)+", "+o.transform(s)+", "+o.transform(e)+", "+(0/* .alpha */,a/* .sanitize */.a)(n.X4.transform(r))+")"}}
/***/,
/***/4322:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */u:()=>/* binding */a
/* harmony export */});
/* harmony import */var r=e(7365),n=e(9896);
/* harmony import */
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */
function a(t){const s=(0,n/* .isMotionValue */.S)(t)?t.get():t;return(0,r/* .isCustomValue */.B)(s)?s.toValue():s}
/***/},
/***/4552:
/***/(t,s,e)=>{
// EXPORTS
e.d(s,{V:()=>/* binding */l,f:()=>/* binding */g});
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/color/index.mjs
var r=e(7739);// ./node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs
const n=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs
var a=e(849),i=e(6046);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs
const o="number",h="color",u="var",c="var(",p="${}",d=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function l(t){const s=t.toString(),e=[],n={color:[],number:[],var:[]},a=[];let i=0;const l=s.replace(d,(t=>(r/* color */.y.test(t)?(n.color.push(i),a.push(h),e.push(r/* color */.y.parse(t))):t.startsWith(c)?(n.var.push(i),a.push(u),e.push(t)):(n.number.push(i),a.push(o),e.push(parseFloat(t))),++i,p))).split(p);return{values:e,split:l,indexes:n,types:a}}function f(t){return l(t).values}function v(t){const{split:s,types:e}=l(t),n=s.length;return t=>{let a="";for(let u=0;u<n;u++)if(a+=s[u],void 0!==t[u]){const s=e[u];a+=s===o?(0,i/* sanitize */.a)(t[u]):s===h?r/* color */.y.transform(t[u]):t[u]}return a}}const m=t=>"number"==typeof t?0:t;const g={test:// ./node_modules/framer-motion/dist/es/value/types/complex/index.mjs
function(t){var s,e;return isNaN(t)&&"string"==typeof t&&((null===(s=t.match(a/* floatRegex */.S))||void 0===s?void 0:s.length)||0)+((null===(e=t.match(n))||void 0===e?void 0:e.length)||0)>0},parse:f,createTransformer:v,getAnimatableNone:function(t){const s=f(t);return v(t)(s.map(m))}};
/***/},
/***/4785:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */OQ:()=>/* binding */u
/* harmony export */});
/* unused harmony exports MotionValue, collectMotionValues */
/* harmony import */var r=e(4582),n=e(2606),a=e(7177),i=e(104);
/* harmony import */
/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */
const o={current:void 0};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
class h{
/**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
constructor(t,s={}){
/**
         * This will be replaced by the build step with the latest version number.
         * When MotionValues are provided to motion components, warn if versions are mixed.
         */
this.version="12.4.10",
/**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
this.canTrackVelocity=null,
/**
         * An object containing a SubscriptionManager for each active event.
         */
this.events={},this.updateAndNotify=(t,s=!0)=>{const e=r/* .time */.k.now();
/**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */this.updatedAt!==e&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(t),
// Update update subscribers
this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),
// Update render subscribers
s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=s.owner}setCurrent(t){var s;this.current=t,this.updatedAt=r/* .time */.k.now(),null===this.canTrackVelocity&&void 0!==t&&(this.canTrackVelocity=(s=this.current,!isNaN(parseFloat(s))))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}
/**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */onChange(t){return this.on("change",t)}on(t,s){this.events[t]||(this.events[t]=new n/* .SubscriptionManager */.v);const e=this.events[t].add(s);return"change"===t?()=>{e(),
/**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */
i/* .frame */.Gt.read((()=>{this.events.change.getSize()||this.stop()}))}:e}clearListeners(){for(const t in this.events)this.events[t].clear()}
/**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */attach(t,s){this.passiveEffect=t,this.stopPassiveEffect=s}
/**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */set(t,s=!0){s&&this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t,s)}setWithVelocity(t,s,e){this.set(s),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-e}
/**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */jump(t,s=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}
/**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */get(){return o.current&&o.current.push(this),this.current}
/**
     * @public
     */getPrevious(){return this.prev}
/**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */getVelocity(){const t=r/* .time */.k.now();if(!this.canTrackVelocity||void 0===this.prevFrameValue||t-this.updatedAt>30)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,30);
// Casts because of parseFloat's poor typing
return(0,a/* .velocityPerSecond */.f)(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}
/**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */start(t){return this.stop(),new Promise((s=>{this.hasAnimated=!0,this.animation=t(s),this.events.animationStart&&this.events.animationStart.notify()})).then((()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()}))}
/**
     * Stop the currently active animation.
     *
     * @public
     */stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}
/**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}
/**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function u(t,s){return new h(t,s)}
/***/},
/***/5252:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */u:()=>/* binding */n
/* harmony export */});
/* harmony import */var r=e(3735);
/* harmony import */const n={test:(0,e(3259).$)("#"),parse:function(t){let s="",e="",r="",n="";
// If we have 6 characters, ie #FF0000
return t.length>5?(s=t.substring(1,3),e=t.substring(3,5),r=t.substring(5,7),n=t.substring(7,9)):(s=t.substring(1,2),e=t.substring(2,3),r=t.substring(3,4),n=t.substring(4,5),s+=s,e+=e,r+=r,n+=n),{red:parseInt(s,16),green:parseInt(e,16),blue:parseInt(r,16),alpha:n?parseInt(n,16)/255:1}},transform:r/* .rgba */.B.transform};
/***/},
/***/5269:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */KN:()=>/* binding */a
/* harmony export */,gQ:()=>/* binding */u
/* harmony export */,px:()=>/* binding */i
/* harmony export */,uj:()=>/* binding */n
/* harmony export */,vh:()=>/* binding */o
/* harmony export */,vw:()=>/* binding */h
/* harmony export */});const r=t=>({test:s=>"string"==typeof s&&s.endsWith(t)&&1===s.split(" ").length,parse:parseFloat,transform:s=>`${s}${t}`}),n=r("deg"),a=r("%"),i=r("px"),o=r("vh"),h=r("vw"),u={...a,parse:t=>a.parse(t)/100,transform:t=>a.transform(100*t)}}
/***/,
/***/6044:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */p:()=>/* binding */h
/* harmony export */});
/* harmony import */var r=e(4552),n=e(849);
/* harmony import */
/**
 * Properties that should default to 1 or 100%
 */
const a=new Set(["brightness","contrast","saturate","opacity"]);function i(t){const[s,e]=t.slice(0,-1).split("(");if("drop-shadow"===s)return t;const[r]=e.match(n/* .floatRegex */.S)||[];if(!r)return t;const i=e.replace(r,"");let o=a.has(s)?1:0;return r!==e&&(o*=100),s+"("+o+i+")"}const o=/\b([a-z-]*)\(.*?\)/gu,h={...r/* .complex */.f,getAnimatableNone:t=>{const s=t.match(o);return s?s.map(i).join(" "):t}}}
/***/,
/***/6046:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */a:()=>/* binding */r
/* harmony export */});
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const r=t=>Math.round(1e5*t)/1e5
/***/},
/***/7739:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */y:()=>/* binding */i
/* harmony export */});
/* harmony import */var r=e(5252),n=e(2027),a=e(3735);
/* harmony import */const i={test:t=>a/* .rgba */.B.test(t)||r/* .hex */.u.test(t)||n/* .hsla */.V.test(t),parse:t=>a/* .rgba */.B.test(t)?a/* .rgba */.B.parse(t):n/* .hsla */.V.test(t)?n/* .hsla */.V.parse(t):r/* .hex */.u.parse(t),transform:t=>"string"==typeof t?t:t.hasOwnProperty("red")?a/* .rgba */.B.transform(t):n/* .hsla */.V.transform(t)};
/***/},
/***/9896:
/***/(t,s,e)=>{
/* harmony export */e.d(s,{
/* harmony export */S:()=>/* binding */r
/* harmony export */});const r=t=>Boolean(t&&t.getVelocity)
/***/}}]);