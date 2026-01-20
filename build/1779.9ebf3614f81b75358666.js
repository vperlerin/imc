/*! For license information please see 1779.9ebf3614f81b75358666.js.LICENSE.txt */
(self.webpackChunkimc2026=self.webpackChunkimc2026||[]).push([[1779],{
/***/2833:
/***/e=>{
e.exports=function(e,t,n,a){var r=n?n.call(a,e,t):void 0;if(void 0!==r)return!!r;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),l=Object.keys(t);if(i.length!==l.length)return!1;
// Test for A's keys different from B.
for(var o=Object.prototype.hasOwnProperty.bind(t),s=0;s<i.length;s++){var u=i[s];if(!o(u))return!1;var c=e[u],h=t[u];if(!1===(r=n?n.call(a,c,h,u):void 0)||void 0===r&&c!==h)return!1}return!0};
/***/},
/***/5588:
/***/(e,t,n)=>{"use strict";
/* harmony export */
/* unused harmony exports IDLE_BLOCKER, IDLE_FETCHER, IDLE_NAVIGATION, UNSAFE_DEFERRED_SYMBOL, UNSAFE_DeferredData, UNSAFE_ErrorResponseImpl, UNSAFE_convertRouteMatchToUiMatch, UNSAFE_convertRoutesToDataRoutes, UNSAFE_decodePath, UNSAFE_warning, createHashHistory, createMemoryHistory, createRouter, createStaticHandler, data, defer, generatePath, getStaticContextFromError, getToPathname, isDataWithResponseInit, isDeferredData, json, matchPath, normalizePathname, redirect, redirectDocument, replace, resolvePath */
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},a.apply(this,arguments)}
////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////
/**
 * Actions represent the type of change to a location value.
 */var r;n.d(t,{
/* harmony export */AO:()=>/* binding */h
/* harmony export */,Gh:()=>/* binding */A
/* harmony export */,HS:()=>/* binding */B
/* harmony export */,Oi:()=>/* binding */o
/* harmony export */,Rr:()=>/* binding */f
/* harmony export */,pX:()=>/* binding */D
/* harmony export */,pb:()=>/* binding */W
/* harmony export */,rc:()=>/* binding */r
/* harmony export */,tH:()=>/* binding */z
/* harmony export */,ue:()=>/* binding */m
/* harmony export */,yD:()=>/* binding */M
/* harmony export */,zR:()=>/* binding */l
/* harmony export */}),function(e){
/**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
e.Pop="POP",
/**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
e.Push="PUSH",
/**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
e.Replace="REPLACE"}(r||(r={}));const i="popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */
function l(e){return void 0===e&&(e={}),p((function(e,t){let{pathname:n,search:a,hash:r}=e.location;return c("",{pathname:n,search:a,hash:r},
// state defaults to `null` because `window.history.state` does
t.state&&t.state.usr||null,t.state&&t.state.key||"default")}),(function(e,t){return"string"==typeof t?t:h(t)}),null,e)}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */function o(e,t){if(!1===e||null==e)throw new Error(t)}function s(e,t){if(!e)try{
// Welcome to debugging history!
// This error is thrown as a convenience, so you can more easily
// find the source for a warning that appears in the console by
// enabling "pause on exceptions" in your JavaScript debugger.
throw new Error(t);
// eslint-disable-next-line no-empty
}catch(e){}}
/**
 * For browser-based histories, we combine the state and key into an object
 */
function u(e,t){return{usr:e.state,key:e.key,idx:t}}
/**
 * Creates a Location object with a unique key from the given Path
 */function c(e,t,n,r){return void 0===n&&(n=null),a({pathname:"string"==typeof e?e:e.pathname,search:"",hash:""},"string"==typeof t?f(t):t,{state:n,
// TODO: This could be cleaned up.  push/replace should probably just take
// full Locations now and avoid the need to run through this flow at all
// But that's a pretty big refactor to the current test suite so going to
// keep as is for the time being and just let any incoming keys take precedence
key:t&&t.key||r||Math.random().toString(36).substr(2,8)})}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */function h(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),a&&"#"!==a&&(t+="#"===a.charAt(0)?a:"#"+a),t}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */function f(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}function p(e,t,n,l){void 0===l&&(l={});let{window:s=document.defaultView,v5Compat:f=!1}=l,p=s.history,d=r.Pop,m=null,v=g();function g(){return(p.state||{idx:null}).idx}function b(){d=r.Pop;let e=g(),t=null==e?null:e-v;v=e,m&&m({action:d,location:w.location,delta:t})}function y(e){
// window.location.origin is "null" (the literal string value) in Firefox
// under certain conditions, notably when serving from a local HTML file
// See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
let t="null"!==s.location.origin?s.location.origin:s.location.href,n="string"==typeof e?e:h(e);
// Treating this as a full URL will strip any trailing spaces so we need to
// pre-encode them since they might be part of a matching splat param from
// an ancestor route
return n=n.replace(/ $/,"%20"),o(t,"No window.location.(origin|href) available to create URL for href: "+n),new URL(n,t)}
// Index should only be null when we initialize. If not, it's because the
// user called history.pushState or history.replaceState directly, in which
// case we should log a warning as it will result in bugs.
null==v&&(v=0,p.replaceState(a({},p.state,{idx:v}),""));let w={get action(){return d},get location(){return e(s,p)},listen(e){if(m)throw new Error("A history only accepts one active listener");return s.addEventListener(i,b),m=e,()=>{s.removeEventListener(i,b),m=null}},createHref:e=>t(s,e),createURL:y,encodeLocation(e){
// Encode a Location the same way window.location would
let t=y(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){d=r.Push;let a=c(w.location,e,t);n&&n(a,e),v=g()+1;let i=u(a,v),l=w.createHref(a);
// try...catch because iOS limits us to 100 pushState calls :/
try{p.pushState(i,"",l)}catch(e){
// If the exception is because `state` can't be serialized, let that throw
// outwards just like a replace call would so the dev knows the cause
// https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
// https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
if(e instanceof DOMException&&"DataCloneError"===e.name)throw e;
// They are going to lose state here, but there is no real
// way to warn them about it since the page will refresh...
s.location.assign(l)}f&&m&&m({action:d,location:w.location,delta:1})},replace:function(e,t){d=r.Replace;let a=c(w.location,e,t);n&&n(a,e),v=g();let i=u(a,v),l=w.createHref(a);p.replaceState(i,"",l),f&&m&&m({action:d,location:w.location,delta:0})},go:e=>p.go(e)};return w}
//#endregion
var d;!function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"}(d||(d={}));new Set(["lazy","caseSensitive","path","id","index","children"]);
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/v6/utils/match-routes
 */
function m(e,t,n){return void 0===n&&(n="/"),v(e,t,n,!1)}function v(e,t,n,a){let r=W(("string"==typeof t?f(t):t).pathname||"/",n);if(null==r)return null;let i=g(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]));return n?
// If two routes are siblings, we should try to match the earlier sibling
// first. This allows people to have fine-grained control over the matching
// behavior by simply putting routes with identical paths in the order they
// want them tried.
e[e.length-1]-t[t.length-1]:
// Otherwise, it doesn't really make sense to rank non-siblings by index,
// so they sort equally.
0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(i);let l=null;for(let e=0;null==l&&e<i.length;++e){
// Incoming pathnames are generally encoded from either window.location
// or from router.navigate, but we want to match against the unencoded
// paths in the route definitions.  Memory router locations won't be
// encoded here but there also shouldn't be anything to decode so this
// should be a safe operation.  This avoids needing matchRoutes to be
// history-aware.
let t=I(r);l=$(i[e],t,a)}return l}function g(e,t,n,a){void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===a&&(a="");let r=(e,r,i)=>{let l={relativePath:void 0===i?e.path||"":i,caseSensitive:!0===e.caseSensitive,childrenIndex:r,route:e};l.relativePath.startsWith("/")&&(o(l.relativePath.startsWith(a),'Absolute route path "'+l.relativePath+'" nested under path "'+a+'" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),l.relativePath=l.relativePath.slice(a.length));let s=B([a,l.relativePath]),u=n.concat(l);
// Add the children before adding this route to the array, so we traverse the
// route tree depth-first and child routes appear before their parents in
// the "flattened" version.
e.children&&e.children.length>0&&(o(
// Our types know better, but runtime JS may not!
// @ts-expect-error
!0!==e.index,'Index routes must not have child routes. Please remove all child routes from route path "'+s+'".'),g(e.children,t,u,s)),
// Routes without a path shouldn't ever match by themselves unless they are
// index routes, so don't add them to the list of possible branches.
(null!=e.path||e.index)&&t.push({path:s,score:O(s,e.index),routesMeta:u})};return e.forEach(((e,t)=>{var n;
// coarse-grain check for optional params
if(""!==e.path&&null!=(n=e.path)&&n.includes("?"))for(let n of b(e.path))r(e,t,n);else r(e,t)})),t}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */function b(e){let t=e.split("/");if(0===t.length)return[];let[n,...a]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");
// Optional path segments are denoted by a trailing `?`
if(0===a.length)
// Intepret empty string as omitting an optional segment
// `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
return r?[i,""]:[i];let l=b(a.join("/")),o=[];
// for absolute paths, ensure `/` instead of empty segment
// All child paths with the prefix.  Do this for all children before the
// optional version for all children, so we get consistent ordering where the
// parent optional aspect is preferred as required.  Otherwise, we can get
// child sections interspersed where deeper optional segments are higher than
// parent optional segments, where for example, /:two would explode _earlier_
// then /:one.  By always including the parent as required _for all children_
// first, we avoid this issue
return o.push(...l.map((e=>""===e?i:[i,e].join("/")))),
// Then, if this is an optional value, add all child versions without
r&&o.push(...l),o.map((t=>e.startsWith("/")&&""===t?"/":t))}const y=/^:[\w-]+$/,w=3,x=2,P=1,k=10,_=-2,S=e=>"*"===e;function O(e,t){let n=e.split("/"),a=n.length;return n.some(S)&&(a+=_),t&&(a+=x),n.filter((e=>!S(e))).reduce(((e,t)=>e+(y.test(t)?w:""===t?P:k)),a)}function $(e,t,n){void 0===n&&(n=!1);let{routesMeta:a}=e,r={},i="/",l=[];for(let e=0;e<a.length;++e){let o=a[e],s=e===a.length-1,u="/"===i?t:t.slice(i.length)||"/",c=j({path:o.relativePath,caseSensitive:o.caseSensitive,end:s},u),h=o.route;if(!c&&s&&n&&!a[a.length-1].route.index&&(c=j({path:o.relativePath,caseSensitive:o.caseSensitive,end:!1},u)),!c)return null;Object.assign(r,c.params),l.push({
// TODO: Can this as be avoided?
params:r,pathname:B([i,c.pathname]),pathnameBase:U(B([i,c.pathnameBase])),route:h}),"/"!==c.pathnameBase&&(i=B([i,c.pathnameBase]))}return l}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/v6/utils/generate-path
 */
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/v6/utils/match-path
 */
function j(e,t){"string"==typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=function(e,t,n){void 0===t&&(t=!1);void 0===n&&(n=!0);s("*"===e||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were "'+e.replace(/\*$/,"/*")+'" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'+e.replace(/\*$/,"/*")+'".');let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,((e,t,n)=>(a.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)")));e.endsWith("*")?(a.push({paramName:"*"}),r+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?
// When matching to the end, ignore trailing slashes
r+="\\/*$":""!==e&&"/"!==e&&(
// If our path is non-empty and contains anything beyond an initial slash,
// then we have _some_ form of path in our regex, so we should expect to
// match only if we find the end of this path segment.  Look for an optional
// non-captured trailing slash (to match a portion of the URL) or the end
// of the path (if we've matched to the end).  We used to do this with a
// word boundary but that gives false positives on routes like
// /user-preferences since `-` counts as a word boundary.
r+="(?:(?=\\/|$))");let i=new RegExp(r,t?void 0:"i");return[i,a]}(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let i=r[0],l=i.replace(/(.)\/+$/,"$1"),o=r.slice(1);return{params:a.reduce(((e,t,n)=>{let{paramName:a,isOptional:r}=t;
// We need to compute the pathnameBase here using the raw splat value
// instead of using params["*"] later because it will be decoded then
if("*"===a){let e=o[n]||"";l=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const s=o[n];return e[a]=r&&!s?void 0:(s||"").replace(/%2F/g,"/"),e}),{}),pathname:i,pathnameBase:l,pattern:e}}function I(e){try{return e.split("/").map((e=>decodeURIComponent(e).replace(/\//g,"%2F"))).join("/")}catch(t){return s(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('+t+")."),e}}
/**
 * @private
 */function W(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;
// We want to leave trailing slash behavior in the user's control, so if they
// specify a basename with a trailing slash, we should support it
let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&"/"!==a?null:e.slice(n)||"/"}const C=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,L=e=>C.test(e)
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/v6/utils/resolve-path
 */;function T(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?
// Keep the root "" segment so the pathname starts at /
n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}function E(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified `to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the `to."+n+'` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */function R(e){return e.filter(((e,t)=>0===t||e.route.path&&e.route.path.length>0))}
// Return the array of pathnames for the current route matches - used to
// generate the routePathnames input for resolveTo()
function M(e,t){let n=R(e);
// When v7_relativeSplatPath is enabled, use the full pathname for the leaf
// match so we include splat values for "." links.  See:
// https://github.com/remix-run/react-router/issues/11052#issuecomment-1836589329
return t?n.map(((e,t)=>t===n.length-1?e.pathname:e.pathnameBase)):n.map((e=>e.pathnameBase))}
/**
 * @private
 */function A(e,t,n,r){let i;void 0===r&&(r=!1),"string"==typeof e?i=f(e):(i=a({},e),o(!i.pathname||!i.pathname.includes("?"),E("?","pathname","search",i)),o(!i.pathname||!i.pathname.includes("#"),E("#","pathname","hash",i)),o(!i.search||!i.search.includes("#"),E("#","search","hash",i)));let l,u=""===e||""===i.pathname,c=u?"/":i.pathname;
// Routing is relative to the current pathname if explicitly requested.
// If a pathname is explicitly provided in `to`, it should be relative to the
// route context. This is explained in `Note on `<Link to>` values` in our
// migration guide from v5 as a means of disambiguation between `to` values
// that begin with `/` and those that do not. However, this is problematic for
// `to` values that do not provide a pathname. `to` can simply be a search or
// hash string, in which case we should assume that the navigation is relative
// to the current location's pathname and *not* the route pathname.
if(null==c)l=n;else{let e=t.length-1;
// With relative="route" (the default), each leading .. segment means
// "go up one route" instead of "go up one URL segment".  This is a key
// difference from how <a href> works and a major reason we call this a
// "to" value instead of a "href".
if(!r&&c.startsWith("..")){let t=c.split("/");for(;".."===t[0];)t.shift(),e-=1;i.pathname=t.join("/")}l=e>=0?t[e]:"/"}let h=function(e,t){void 0===t&&(t="/");let n,{pathname:a,search:r="",hash:i=""}="string"==typeof e?f(e):e;if(a)if(L(a))n=a;else{if(a.includes("//")){let e=a;a=a.replace(/\/\/+/g,"/"),s(!1,"Pathnames cannot have embedded double slashes - normalizing "+e+" -> "+a)}n=a.startsWith("/")?T(a.substring(1),"/"):T(a,t)}else n=t;return{pathname:n,search:N(r),hash:H(i)}}(i,l),p=c&&"/"!==c&&c.endsWith("/"),d=(u||"."===c)&&n.endsWith("/");
// Ensure the pathname has a trailing slash if the original "to" had one
return h.pathname.endsWith("/")||!p&&!d||(h.pathname+="/"),h}
/**
 * @private
 */
/**
 * @private
 */
const B=e=>e.join("/").replace(/\/\/+/g,"/")
/**
 * @private
 */,U=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/")
/**
 * @private
 */,N=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:""
/**
 * @private
 */,H=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:""
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @deprecated The `json` method is deprecated in favor of returning raw objects.
 * This method will be removed in v7.
 */;class z extends Error{}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */
function D(e){return null!=e&&"number"==typeof e.status&&"string"==typeof e.statusText&&"boolean"==typeof e.internal&&"data"in e}const F=["post","put","patch","delete"],q=(new Set(F),["get",...F]);new Set(q),new Set([301,302,303,307,308]),new Set([307,308]);
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////
Symbol("deferred")}
//#endregion
//# sourceMappingURL=router.js.map
/***/,
/***/7463:
/***/(e,t)=>{"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var a=n-1>>>1,r=e[a];if(!(0<i(r,t)))break e;e[a]=t,e[n]=r,n=a}}function a(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var a=0,r=e.length,l=r>>>1;a<l;){var o=2*(a+1)-1,s=e[o],u=o+1,c=e[u];if(0>i(s,n))u<r&&0>i(c,s)?(e[a]=c,e[u]=n,a=u):(e[a]=s,e[o]=n,a=o);else{if(!(u<r&&0>i(c,n)))break e;e[a]=c,e[u]=n,a=u}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"==typeof performance&&"function"==typeof performance.now){var l=performance;t.unstable_now=function(){return l.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var u=[],c=[],h=1,f=null,p=3,d=!1,m=!1,v=!1,g="function"==typeof setTimeout?setTimeout:null,b="function"==typeof clearTimeout?clearTimeout:null,y="undefined"!=typeof setImmediate?setImmediate:null;function w(e){for(var t=a(c);null!==t;){if(null===t.callback)r(c);else{if(!(t.startTime<=e))break;r(c),t.sortIndex=t.expirationTime,n(u,t)}t=a(c)}}function x(e){if(v=!1,w(e),!m)if(null!==a(u))m=!0,T(P);else{var t=a(c);null!==t&&E(x,t.startTime-e)}}function P(e,n){m=!1,v&&(v=!1,b(O),O=-1),d=!0;var i=p;try{for(w(n),f=a(u);null!==f&&(!(f.expirationTime>n)||e&&!I());){var l=f.callback;if("function"==typeof l){f.callback=null,p=f.priorityLevel;var o=l(f.expirationTime<=n);n=t.unstable_now(),"function"==typeof o?f.callback=o:f===a(u)&&r(u),w(n)}else r(u);f=a(u)}if(null!==f)var s=!0;else{var h=a(c);null!==h&&E(x,h.startTime-n),s=!1}return s}finally{f=null,p=i,d=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,_=!1,S=null,O=-1,$=5,j=-1;function I(){return!(t.unstable_now()-j<$)}function W(){if(null!==S){var e=t.unstable_now();j=e;var n=!0;try{n=S(!0,e)}finally{n?k():(_=!1,S=null)}}else _=!1}if("function"==typeof y)k=function(){y(W)};else if("undefined"!=typeof MessageChannel){var C=new MessageChannel,L=C.port2;C.port1.onmessage=W,k=function(){L.postMessage(null)}}else k=function(){g(W,0)};function T(e){S=e,_||(_=!0,k())}function E(e,n){O=g((function(){e(t.unstable_now())}),n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){m||d||(m=!0,T(P))},t.unstable_forceFrameRate=function(e){0>e||125<e||($=0<e?Math.floor(1e3/e):5)},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return a(u)},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},t.unstable_scheduleCallback=function(e,r,i){var l=t.unstable_now();switch("object"==typeof i&&null!==i?i="number"==typeof(i=i.delay)&&0<i?l+i:l:i=l,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return e={id:h++,callback:r,priorityLevel:e,startTime:i,expirationTime:o=i+o,sortIndex:-1},i>l?(e.sortIndex=i,n(c,e),null===a(u)&&e===a(c)&&(v?(b(O),O=-1):v=!0,E(x,i-l))):(e.sortIndex=o,n(u,e),m||d||(m=!0,T(P))),e},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}}
/***/,
/***/9982:
/***/(e,t,n)=>{"use strict";e.exports=n(7463)}
/***/}]);