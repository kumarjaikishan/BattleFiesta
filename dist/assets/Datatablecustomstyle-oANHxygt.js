import{an as C,ap as Qr,r as s}from"./index-Cvqr62AC.js";var K=function(){return K=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},K.apply(this,arguments)};function mt(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var F="-ms-",et="-moz-",j="-webkit-",Un="comm",Ct="rule",Ut="decl",Jr="@import",eo="@namespace",Kn="@keyframes",to="@layer",qn=Math.abs,Kt=String.fromCharCode,Lt=Object.assign;function no(e,t){return B(e,0)^45?(((t<<2^B(e,0))<<2^B(e,1))<<2^B(e,2))<<2^B(e,3):0}function Xn(e){return e.trim()}function ge(e,t){return(e=t.exec(e))?e[0]:e}function A(e,t,n){return e.replace(t,n)}function dt(e,t,n){return e.indexOf(t,n)}function B(e,t){return e.charCodeAt(t)|0}function De(e,t,n){return e.slice(t,n)}function ie(e){return e.length}function Zn(e){return e.length}function Qe(e,t){return t.push(e),e}function ro(e,t){return e.map(t).join("")}function Cn(e,t){return e.filter(function(n){return!ge(n,t)})}var St=1,Be=1,Qn=0,ee=0,L=0,Ke="";function Rt(e,t,n,r,o,a,i,d){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:St,column:Be,length:i,return:"",siblings:d}}function ve(e,t){return Lt(Rt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Me(e){for(;e.root;)e=ve(e.root,{children:[e]});Qe(e,e.siblings)}function oo(){return L}function ao(){return L=ee>0?B(Ke,--ee):0,Be--,L===10&&(Be=1,St--),L}function se(){return L=ee<Qn?B(Ke,ee++):0,Be++,L===10&&(Be=1,St++),L}function Ce(){return B(Ke,ee)}function ut(){return ee}function $t(e,t){return De(Ke,e,t)}function rt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function io(e){return St=Be=1,Qn=ie(Ke=e),ee=0,[]}function so(e){return Ke="",e}function _t(e){return Xn($t(ee-1,Mt(e===91?e+2:e===40?e+1:e)))}function lo(e){for(;(L=Ce())&&L<33;)se();return rt(e)>2||rt(L)>3?"":" "}function co(e,t){for(;--t&&se()&&!(L<48||L>102||L>57&&L<65||L>70&&L<97););return $t(e,ut()+(t<6&&Ce()==32&&se()==32))}function Mt(e){for(;se();)switch(L){case e:return ee;case 34:case 39:e!==34&&e!==39&&Mt(L);break;case 40:e===41&&Mt(e);break;case 92:se();break}return ee}function uo(e,t){for(;se()&&e+L!==57;)if(e+L===84&&Ce()===47)break;return"/*"+$t(t,ee-1)+"*"+Kt(e===47?e:se())}function po(e){for(;!rt(Ce());)se();return $t(e,ee)}function go(e){return so(pt("",null,null,null,[""],e=io(e),0,[0],e))}function pt(e,t,n,r,o,a,i,d,u){for(var w=0,g=0,f=i,S=0,b=0,y=0,E=1,D=1,P=1,O=0,p="",m=o,R=a,h=r,l=p;D;)switch(y=O,O=se()){case 40:if(y!=108&&B(l,f-1)==58){dt(l+=A(_t(O),"&","&\f"),"&\f",qn(w?d[w-1]:0))!=-1&&(P=-1);break}case 34:case 39:case 91:l+=_t(O);break;case 9:case 10:case 13:case 32:l+=lo(y);break;case 92:l+=co(ut()-1,7);continue;case 47:switch(Ce()){case 42:case 47:Qe(fo(uo(se(),ut()),t,n,u),u),(rt(y||1)==5||rt(Ce()||1)==5)&&ie(l)&&De(l,-1,void 0)!==" "&&(l+=" ");break;default:l+="/"}break;case 123*E:d[w++]=ie(l)*P;case 125*E:case 59:case 0:switch(O){case 0:case 125:D=0;case 59+g:P==-1&&(l=A(l,/\f/g,"")),b>0&&(ie(l)-f||E===0&&y===47)&&Qe(b>32?Rn(l+";",r,n,f-1,u):Rn(A(l," ","")+";",r,n,f-2,u),u);break;case 59:l+=";";default:if(Qe(h=Sn(l,t,n,w,g,o,d,p,m=[],R=[],f,a),a),O===123)if(g===0)pt(l,t,h,h,m,a,f,d,R);else{switch(S){case 99:if(B(l,3)===110)break;case 108:if(B(l,2)===97)break;default:g=0;case 100:case 109:case 115:}g?pt(e,h,h,r&&Qe(Sn(e,h,h,0,0,o,d,p,o,m=[],f,R),R),o,R,f,d,r?m:R):pt(l,h,h,h,[""],R,0,d,R)}}w=g=b=0,E=P=1,p=l="",f=i;break;case 58:f=1+ie(l),b=y;default:if(E<1){if(O==123)--E;else if(O==125&&E++==0&&ao()==125)continue}switch(l+=Kt(O),O*E){case 38:P=g>0?1:(l+="\f",-1);break;case 44:d[w++]=(ie(l)-1)*P,P=1;break;case 64:Ce()===45&&(l+=_t(se())),S=Ce(),g=f=ie(p=l+=po(ut())),O++;break;case 45:y===45&&ie(l)==2&&(E=0)}}return a}function Sn(e,t,n,r,o,a,i,d,u,w,g,f){for(var S=o-1,b=o===0?a:[""],y=Zn(b),E=0,D=0,P=0;E<r;++E)for(var O=0,p=De(e,S+1,S=qn(D=i[E])),m=e;O<y;++O)(m=Xn(D>0?b[O]+" "+p:A(p,/&\f/g,b[O])))&&(u[P++]=m);return Rt(e,t,n,o===0?Ct:d,u,w,g,f)}function fo(e,t,n,r){return Rt(e,t,n,Un,Kt(oo()),De(e,2,-2),0,r)}function Rn(e,t,n,r,o){return Rt(e,t,n,Ut,De(e,0,r),De(e,r+1,-1),r,o)}function Jn(e,t,n){switch(no(e,t)){case 5103:return j+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return j+e+e;case 4855:return j+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return et+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return j+e+et+e+F+e+e;case 5936:switch(B(e,t+11)){case 114:return j+e+F+A(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return j+e+F+A(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return j+e+F+A(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return j+e+F+e+e;case 6165:return j+e+F+"flex-"+e+e;case 5187:return j+e+A(e,/(\w+).+(:[^]+)/,j+"box-$1$2"+F+"flex-$1$2")+e;case 5443:return j+e+F+"flex-item-"+A(e,/flex-|-self/g,"")+(ge(e,/flex-|baseline/)?"":F+"grid-row-"+A(e,/flex-|-self/g,""))+e;case 4675:return j+e+F+"flex-line-pack"+A(e,/align-content|flex-|-self/g,"")+e;case 5548:return j+e+F+A(e,"shrink","negative")+e;case 5292:return j+e+F+A(e,"basis","preferred-size")+e;case 6060:return j+"box-"+A(e,"-grow","")+j+e+F+A(e,"grow","positive")+e;case 4554:return j+A(e,/([^-])(transform)/g,"$1"+j+"$2")+e;case 6187:return A(A(A(e,/(zoom-|grab)/,j+"$1"),/(image-set)/,j+"$1"),e,"")+e;case 5495:case 3959:return A(e,/(image-set\([^]*)/,j+"$1$`$1");case 4968:return A(A(e,/(.+:)(flex-)?(.*)/,j+"box-pack:$3"+F+"flex-pack:$3"),/space-between/,"justify")+j+e+e;case 4200:if(!ge(e,/flex-|baseline/))return F+"grid-column-align"+De(e,t)+e;break;case 2592:case 3360:return F+A(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ge(r.props,/grid-\w+-end/)})?~dt(e+(n=n[t].value),"span",0)?e:F+A(e,"-start","")+e+F+"grid-row-span:"+(~dt(n,"span",0)?ge(n,/\d+/):+ge(n,/\d+/)-+ge(e,/\d+/))+";":F+A(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ge(r.props,/grid-\w+-start/)})?e:F+A(A(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return A(e,/(.+)-inline(.+)/,j+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ie(e)-1-t>6)switch(B(e,t+1)){case 109:if(B(e,t+4)!==45)break;case 102:return A(e,/(.+:)(.+)-([^]+)/,"$1"+j+"$2-$3$1"+et+(B(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~dt(e,"stretch",0)?Jn(A(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return A(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,a,i,d,u,w){return F+o+":"+a+w+(i?F+o+"-span:"+(d?u:+u-+a)+w:"")+e});case 4949:if(B(e,t+6)===121)return A(e,":",":"+j)+e;break;case 6444:switch(B(e,B(e,14)===45?18:11)){case 120:return A(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+j+(B(e,14)===45?"inline-":"")+"box$3$1"+j+"$2$3$1"+F+"$2box$3")+e;case 100:return A(e,":",":"+F)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return A(e,"scroll-","scroll-snap-")+e}return e}function bt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function ho(e,t,n,r){switch(e.type){case to:if(e.children.length)break;case Jr:case eo:case Ut:return e.return=e.return||e.value;case Un:return"";case Kn:return e.return=e.value+"{"+bt(e.children,r)+"}";case Ct:if(!ie(e.value=e.props.join(",")))return""}return ie(n=bt(e.children,r))?e.return=e.value+"{"+n+"}":""}function mo(e){var t=Zn(e);return function(n,r,o,a){for(var i="",d=0;d<t;d++)i+=e[d](n,r,o,a)||"";return i}}function bo(e){return function(t){t.root||(t=t.return)&&e(t)}}function wo(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Ut:e.return=Jn(e.value,e.length,n);return;case Kn:return bt([ve(e,{value:A(e.value,"@","@"+j)})],r);case Ct:if(e.length)return ro(n=e.props,function(o){switch(ge(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Me(ve(e,{props:[A(o,/:(read-\w+)/,":"+et+"$1")]})),Me(ve(e,{props:[o]})),Lt(e,{props:Cn(n,r)});break;case"::placeholder":Me(ve(e,{props:[A(o,/:(plac\w+)/,":"+j+"input-$1")]})),Me(ve(e,{props:[A(o,/:(plac\w+)/,":"+et+"$1")]})),Me(ve(e,{props:[A(o,/:(plac\w+)/,F+"input-$1")]})),Me(ve(e,{props:[o]})),Lt(e,{props:Cn(n,r)});break}return""})}}var J={},Ge=typeof process<"u"&&J!==void 0&&(J.REACT_APP_SC_ATTR||J.SC_ATTR)||"data-styled",er="active",tr="data-styled-version",Et="6.3.8",qt=`/*!sc*/
`,wt=typeof window<"u"&&typeof document<"u",Ie=C.createContext===void 0,yo=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&J!==void 0&&J.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&J.REACT_APP_SC_DISABLE_SPEEDY!==""?J.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&J.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&J!==void 0&&J.SC_DISABLE_SPEEDY!==void 0&&J.SC_DISABLE_SPEEDY!==""&&J.SC_DISABLE_SPEEDY!=="false"&&J.SC_DISABLE_SPEEDY),Ot=Object.freeze([]),Ye=Object.freeze({});function xo(e,t,n){return n===void 0&&(n=Ye),e.theme!==n.theme&&e.theme||t||n.theme}var nr=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),vo=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Co=/(^-|-$)/g;function $n(e){return e.replace(vo,"-").replace(Co,"")}var So=/(a)(d)/gi,En=function(e){return String.fromCharCode(e+(e>25?39:97))};function zt(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=En(t%52)+n;return(En(t%52)+n).replace(So,"$1-$2")}var jt,ze=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},rr=function(e){return ze(5381,e)};function Ro(e){return zt(rr(e)>>>0)}function $o(e){return e.displayName||e.name||"Component"}function Tt(e){return typeof e=="string"&&!0}var or=typeof Symbol=="function"&&Symbol.for,ar=or?Symbol.for("react.memo"):60115,Eo=or?Symbol.for("react.forward_ref"):60112,Oo={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Po={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ir={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ko=((jt={})[Eo]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},jt[ar]=ir,jt);function On(e){return("type"in(t=e)&&t.type.$$typeof)===ar?ir:"$$typeof"in e?ko[e.$$typeof]:Oo;var t}var Ao=Object.defineProperty,Do=Object.getOwnPropertyNames,Pn=Object.getOwnPropertySymbols,Io=Object.getOwnPropertyDescriptor,_o=Object.getPrototypeOf,kn=Object.prototype;function sr(e,t,n){if(typeof t!="string"){if(kn){var r=_o(t);r&&r!==kn&&sr(e,r,n)}var o=Do(t);Pn&&(o=o.concat(Pn(t)));for(var a=On(e),i=On(t),d=0;d<o.length;++d){var u=o[d];if(!(u in Po||n&&n[u]||i&&u in i||a&&u in a)){var w=Io(t,u);try{Ao(e,u,w)}catch{}}}}return e}function _e(e){return typeof e=="function"}function Xt(e){return typeof e=="object"&&"styledComponentId"in e}function ke(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function An(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function ot(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Wt(e,t,n){if(n===void 0&&(n=!1),!n&&!ot(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Wt(e[r],t[r]);else if(ot(t))for(var r in t)e[r]=Wt(e[r],t[r]);return e}function Zt(e,t){Object.defineProperty(e,"toString",{value:t})}function je(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var jo=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,a=o;t>=a;)if((a<<=1)<0)throw je(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=o;i<a;i++)this.groupSizes[i]=0}for(var d=this.indexOfGroup(t+1),u=(i=0,n.length);i<u;i++)this.tag.insertRule(d,n[i])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var a=r;a<o;a++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),a=o+r,i=o;i<a;i++)n+="".concat(this.tag.getRule(i)).concat(qt);return n},e}(),gt=new Map,yt=new Map,ft=1,Je=function(e){if(gt.has(e))return gt.get(e);for(;yt.has(ft);)ft++;var t=ft++;return gt.set(e,t),yt.set(t,e),t},To=function(e,t){ft=t+1,gt.set(e,t),yt.set(t,e)},Fo="style[".concat(Ge,"][").concat(tr,'="').concat(Et,'"]'),Ho=new RegExp("^".concat(Ge,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),No=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},Lo=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(qt),o=[],a=0,i=r.length;a<i;a++){var d=r[a].trim();if(d){var u=d.match(Ho);if(u){var w=0|parseInt(u[1],10),g=u[2];w!==0&&(To(g,w),No(e,g,u[3]),e.getTag().insertRules(w,o)),o.length=0}else o.push(d)}}},Dn=function(e){for(var t=document.querySelectorAll(Fo),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Ge)!==er&&(Lo(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Mo(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var lr=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(d){var u=Array.from(d.querySelectorAll("style[".concat(Ge,"]")));return u[u.length-1]}(n),a=o!==void 0?o.nextSibling:null;r.setAttribute(Ge,er),r.setAttribute(tr,Et);var i=Mo();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},zo=function(){function e(t){this.element=lr(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,a=r.length;o<a;o++){var i=r[o];if(i.ownerNode===n)return i}throw je(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),Wo=function(){function e(t){this.element=lr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Bo=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),In=wt,Go={isServer:!wt,useCSSOMInjection:!yo},cr=function(){function e(t,n,r){t===void 0&&(t=Ye),n===void 0&&(n={});var o=this;this.options=K(K({},Go),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&wt&&In&&(In=!1,Dn(this)),Zt(this,function(){return function(a){for(var i=a.getTag(),d=i.length,u="",w=function(f){var S=function(P){return yt.get(P)}(f);if(S===void 0)return"continue";var b=a.names.get(S),y=i.getGroup(f);if(b===void 0||!b.size||y.length===0)return"continue";var E="".concat(Ge,".g").concat(f,'[id="').concat(S,'"]'),D="";b!==void 0&&b.forEach(function(P){P.length>0&&(D+="".concat(P,","))}),u+="".concat(y).concat(E,'{content:"').concat(D,'"}').concat(qt)},g=0;g<d;g++)w(g);return u}(o)})}return e.registerId=function(t){return Je(t)},e.prototype.rehydrate=function(){!this.server&&wt&&Dn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(K(K({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Bo(o):r?new zo(o):new Wo(o)}(this.options),new jo(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(Je(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(Je(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Je(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Yo=/&/g,We=47;function _n(e){if(e.indexOf("}")===-1)return!1;for(var t=e.length,n=0,r=0,o=!1,a=0;a<t;a++){var i=e.charCodeAt(a);if(r!==0||o||i!==We||e.charCodeAt(a+1)!==42)if(o)i===42&&e.charCodeAt(a+1)===We&&(o=!1,a++);else if(i!==34&&i!==39||a!==0&&e.charCodeAt(a-1)===92){if(r===0){if(i===123)n++;else if(i===125&&--n<0)return!0}}else r===0?r=i:r===i&&(r=0);else o=!0,a++}return n!==0||r!==0}function dr(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=dr(n.children,t)),n})}function Vo(e){var t,n,r,o=Ye,a=o.options,i=a===void 0?Ye:a,d=o.plugins,u=d===void 0?Ot:d,w=function(S,b,y){return y.startsWith(n)&&y.endsWith(n)&&y.replaceAll(n,"").length>0?".".concat(t):S},g=u.slice();g.push(function(S){S.type===Ct&&S.value.includes("&")&&(S.props[0]=S.props[0].replace(Yo,n).replace(r,w))}),i.prefix&&g.push(wo),g.push(ho);var f=function(S,b,y,E){b===void 0&&(b=""),y===void 0&&(y=""),E===void 0&&(E="&"),t=E,n=b,r=new RegExp("\\".concat(n,"\\b"),"g");var D=function(p){if(!_n(p))return p;for(var m=p.length,R="",h=0,l=0,$=0,H=!1,k=0;k<m;k++){var N=p.charCodeAt(k);if($!==0||H||N!==We||p.charCodeAt(k+1)!==42)if(H)N===42&&p.charCodeAt(k+1)===We&&(H=!1,k++);else if(N!==34&&N!==39||k!==0&&p.charCodeAt(k-1)===92){if($===0)if(N===123)l++;else if(N===125){if(--l<0){for(var M=k+1;M<m;){var T=p.charCodeAt(M);if(T===59||T===10)break;M++}M<m&&p.charCodeAt(M)===59&&M++,l=0,k=M-1,h=M;continue}l===0&&(R+=p.substring(h,k+1),h=k+1)}else N===59&&l===0&&(R+=p.substring(h,k+1),h=k+1)}else $===0?$=N:$===N&&($=0);else H=!0,k++}if(h<m){var te=p.substring(h);_n(te)||(R+=te)}return R}(function(p){if(p.indexOf("//")===-1)return p;for(var m=p.length,R=[],h=0,l=0,$=0,H=0;l<m;){var k=p.charCodeAt(l);if(k!==34&&k!==39||l!==0&&p.charCodeAt(l-1)===92)if($===0)if(k===40&&l>=3&&(32|p.charCodeAt(l-1))==108&&(32|p.charCodeAt(l-2))==114&&(32|p.charCodeAt(l-3))==117)H=1,l++;else if(H>0)k===41?H--:k===40&&H++,l++;else if(k===We&&l+1<m&&p.charCodeAt(l+1)===We){for(l>h&&R.push(p.substring(h,l));l<m&&p.charCodeAt(l)!==10;)l++;h=l}else l++;else l++;else $===0?$=k:$===k&&($=0),l++}return h===0?p:(h<m&&R.push(p.substring(h)),R.join(""))}(S)),P=go(y||b?"".concat(y," ").concat(b," { ").concat(D," }"):D);i.namespace&&(P=dr(P,i.namespace));var O=[];return bt(P,mo(g.concat(bo(function(p){return O.push(p)})))),O};return f.hash=u.length?u.reduce(function(S,b){return b.name||je(15),ze(S,b.name)},5381).toString():"",f}var Uo=new cr,Bt=Vo(),Gt={shouldForwardProp:void 0,styleSheet:Uo,stylis:Bt},ur=Ie?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(Gt)}}:C.createContext(Gt);ur.Consumer;Ie||C.createContext(void 0);function jn(){return Ie?Gt:C.useContext(ur)}var Ko=function(){function e(t,n){var r=this;this.inject=function(o,a){a===void 0&&(a=Bt);var i=r.name+a.hash;o.hasNameForId(r.id,i)||o.insertRules(r.id,i,a(r.rules,i,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Zt(this,function(){throw je(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Bt),this.name+t.hash},e}();function qo(e,t){return t==null||typeof t=="boolean"||t===""?"":typeof t!="number"||t===0||e in Qr||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Xo=function(e){return e>="A"&&e<="Z"};function Tn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Xo(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var pr=function(e){return e==null||e===!1||e===""},gr=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!pr(r)&&(Array.isArray(r)&&r.isCss||_e(r)?t.push("".concat(Tn(n),":"),r,";"):ot(r)?t.push.apply(t,mt(mt(["".concat(n," {")],gr(r),!1),["}"],!1)):t.push("".concat(Tn(n),": ").concat(qo(n,r),";")))}return t};function Ae(e,t,n,r){if(pr(e))return[];if(Xt(e))return[".".concat(e.styledComponentId)];if(_e(e)){if(!_e(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var o=e(t);return Ae(o,t,n,r)}var a;return e instanceof Ko?n?(e.inject(n,r),[e.getName(r)]):[e]:ot(e)?gr(e):Array.isArray(e)?Array.prototype.concat.apply(Ot,e.map(function(i){return Ae(i,t,n,r)})):[e.toString()]}function Zo(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(_e(n)&&!Xt(n))return!1}return!0}var Qo=rr(Et),Jo=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Zo(t),this.componentId=n,this.baseHash=ze(Qo,n),this.baseStyle=r,cr.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r).className:"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=ke(o,this.staticRulesId);else{var a=An(Ae(this.rules,t,n,r)),i=zt(ze(this.baseHash,a)>>>0);if(!n.hasNameForId(this.componentId,i)){var d=r(a,".".concat(i),void 0,this.componentId);n.insertRules(this.componentId,i,d)}o=ke(o,i),this.staticRulesId=i}else{for(var u=ze(this.baseHash,r.hash),w="",g=0;g<this.rules.length;g++){var f=this.rules[g];if(typeof f=="string")w+=f;else if(f){var S=An(Ae(f,t,n,r));u=ze(u,S+g),w+=S}}if(w){var b=zt(u>>>0);if(!n.hasNameForId(this.componentId,b)){var y=r(w,".".concat(b),void 0,this.componentId);n.insertRules(this.componentId,b,y)}o=ke(o,b)}}return{className:o,css:typeof window>"u"?n.getTag().getGroup(Je(this.componentId)):""}},e}(),xt=Ie?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(void 0)}}:C.createContext(void 0);xt.Consumer;function ea(e){if(Ie)return e.children;var t=C.useContext(xt),n=C.useMemo(function(){return function(r,o){if(!r)throw je(14);if(_e(r)){var a=r(o);return a}if(Array.isArray(r)||typeof r!="object")throw je(8);return o?K(K({},o),r):r}(e.theme,t)},[e.theme,t]);return e.children?C.createElement(xt.Provider,{value:n},e.children):null}var Ft={};function ta(e,t,n){var r=Xt(e),o=e,a=!Tt(e),i=t.attrs,d=i===void 0?Ot:i,u=t.componentId,w=u===void 0?function(m,R){var h=typeof m!="string"?"sc":$n(m);Ft[h]=(Ft[h]||0)+1;var l="".concat(h,"-").concat(Ro(Et+h+Ft[h]));return R?"".concat(R,"-").concat(l):l}(t.displayName,t.parentComponentId):u,g=t.displayName,f=g===void 0?function(m){return Tt(m)?"styled.".concat(m):"Styled(".concat($o(m),")")}(e):g,S=t.displayName&&t.componentId?"".concat($n(t.displayName),"-").concat(t.componentId):t.componentId||w,b=r&&o.attrs?o.attrs.concat(d).filter(Boolean):d,y=t.shouldForwardProp;if(r&&o.shouldForwardProp){var E=o.shouldForwardProp;if(t.shouldForwardProp){var D=t.shouldForwardProp;y=function(m,R){return E(m,R)&&D(m,R)}}else y=E}var P=new Jo(n,S,r?o.componentStyle:void 0);function O(m,R){return function(h,l,$){var H=h.attrs,k=h.componentStyle,N=h.defaultProps,M=h.foldedComponentIds,T=h.styledComponentId,te=h.target,Re=Ie?void 0:C.useContext(xt),fe=jn(),le=h.shouldForwardProp||fe.shouldForwardProp,Te=xo(l,Re,N)||Ye,Z=function(me,re,be){for(var X,V=K(K({},re),{className:void 0,theme:be}),we=0;we<me.length;we+=1){var pe=_e(X=me[we])?X(V):X;for(var ce in pe)ce==="className"?V.className=ke(V.className,pe[ce]):ce==="style"?V.style=K(K({},V.style),pe[ce]):V[ce]=pe[ce]}return"className"in re&&typeof re.className=="string"&&(V.className=ke(V.className,re.className)),V}(H,l,Te),he=Z.as||te,ue={};for(var Y in Z)Z[Y]===void 0||Y[0]==="$"||Y==="as"||Y==="theme"&&Z.theme===Te||(Y==="forwardedAs"?ue.as=Z.forwardedAs:le&&!le(Y,he)||(ue[Y]=Z[Y]));var $e=function(me,re){var be=jn(),X=me.generateAndInjectStyles(re,be.styleSheet,be.stylis);return X}(k,Z),Q=$e.className,Ee=$e.css,ne=ke(M,T);Q&&(ne+=" "+Q),Z.className&&(ne+=" "+Z.className),ue[Tt(he)&&!nr.has(he)?"class":"className"]=ne,$&&(ue.ref=$);var Fe=s.createElement(he,ue);return Ie&&Ee?C.createElement(C.Fragment,null,C.createElement("style",{precedence:"styled-components",href:"sc-".concat(T,"-").concat(Q),children:Ee}),Fe):Fe}(p,m,R)}O.displayName=f;var p=C.forwardRef(O);return p.attrs=b,p.componentStyle=P,p.displayName=f,p.shouldForwardProp=y,p.foldedComponentIds=r?ke(o.foldedComponentIds,o.styledComponentId):"",p.styledComponentId=S,p.target=r?o.target:e,Object.defineProperty(p,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(m){this._foldedDefaultProps=r?function(R){for(var h=[],l=1;l<arguments.length;l++)h[l-1]=arguments[l];for(var $=0,H=h;$<H.length;$++)Wt(R,H[$],!0);return R}({},o.defaultProps,m):m}}),Zt(p,function(){return".".concat(p.styledComponentId)}),a&&sr(p,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),p}function Fn(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Hn=function(e){return Object.assign(e,{isCss:!0})};function G(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(_e(e)||ot(e))return Hn(Ae(Fn(Ot,mt([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Ae(r):Hn(Ae(Fn(r,t)))}function Yt(e,t,n){if(n===void 0&&(n=Ye),!t)throw je(1,t);var r=function(o){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,G.apply(void 0,mt([o],a,!1)))};return r.attrs=function(o){return Yt(e,t,K(K({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return Yt(e,t,K(K({},n),o))},r}var fr=function(e){return Yt(ta,e)},I=fr;nr.forEach(function(e){I[e]=fr(e)});var Se;function Ve(e,t){return e[t]}function na(e=[],t,n=0){return[...e.slice(0,n),t,...e.slice(n)]}function ra(e=[],t,n="id"){const r=e.slice(),o=Ve(t,n);return o?r.splice(r.findIndex(a=>Ve(a,n)===o),1):r.splice(r.findIndex(a=>a===t),1),r}function Nn(e){return e.map((t,n)=>{const r=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(r.id=n+1),r})}function tt(e,t){return Math.ceil(e/t)}function Ht(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(Se||(Se={}));const W=()=>null;function hr(e,t=[],n=[]){let r={},o=[...n];return t.length&&t.forEach(a=>{if(!a.when||typeof a.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');a.when(e)&&(r=a.style||{},a.classNames&&(o=[...o,...a.classNames]),typeof a.style=="function"&&(r=a.style(e)||{}))}),{conditionalStyle:r,classNames:o.join(" ")}}function ht(e,t=[],n="id"){const r=Ve(e,n);return r?t.some(o=>Ve(o,n)===r):t.some(o=>o===e)}function lt(e,t){return t?e.findIndex(n=>nt(n.id,t)):-1}function nt(e,t){return e==t}function oa(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:r,rows:o,rowCount:a,mergeSelections:i}=t,d=!e.allSelected,u=!e.toggleOnSelectedRowsChange;if(i){const w=d?[...e.selectedRows,...o.filter(g=>!ht(g,e.selectedRows,r))]:e.selectedRows.filter(g=>!ht(g,o,r));return Object.assign(Object.assign({},e),{allSelected:d,selectedCount:w.length,selectedRows:w,toggleOnSelectedRowsChange:u})}return Object.assign(Object.assign({},e),{allSelected:d,selectedCount:d?a:0,selectedRows:d?o:[],toggleOnSelectedRowsChange:u})}case"SELECT_SINGLE_ROW":{const{keyField:r,row:o,isSelected:a,rowCount:i,singleSelect:d}=t;return d?a?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[o],toggleOnSelectedRowsChange:n}):a?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:ra(e.selectedRows,o,r),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:na(e.selectedRows,o),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:r,selectedRows:o,totalRows:a,mergeSelections:i}=t;if(i){const d=[...e.selectedRows,...o.filter(u=>!ht(u,e.selectedRows,r))];return Object.assign(Object.assign({},e),{selectedCount:d.length,allSelected:!1,selectedRows:d,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:o.length,allSelected:o.length===a,selectedRows:o,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:r}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:r})}case"SORT_CHANGE":{const{sortDirection:r,selectedColumn:o,clearSelectedOnSort:a}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:o,sortDirection:r,currentPage:1}),a&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:r,paginationServer:o,visibleOnly:a,persistSelectedOnPageChange:i}=t,d=o&&i,u=o&&!i||a;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:r}),d&&{allSelected:!1}),u&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:r,page:o}=t;return Object.assign(Object.assign({},e),{currentPage:o,rowsPerPage:r})}}}const aa=G`
	pointer-events: none;
	opacity: 0.4;
`,ia=I.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&aa};
	${({theme:e})=>e.table.style};
`,sa=G`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,la=I.div`
	display: flex;
	width: 100%;
	${({$fixedHeader:e})=>e&&sa};
	${({theme:e})=>e.head.style};
`,ca=I.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({$dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,mr=(e,...t)=>G`
		@media screen and (max-width: ${599}px) {
			${G(e,...t)}
		}
	`,da=(e,...t)=>G`
		@media screen and (max-width: ${959}px) {
			${G(e,...t)}
		}
	`,ua=(e,...t)=>G`
		@media screen and (max-width: ${1280}px) {
			${G(e,...t)}
		}
	`,pa=e=>(t,...n)=>G`
			@media screen and (max-width: ${e}px) {
				${G(t,...n)}
			}
		`,qe=I.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,$headCell:t})=>e[t?"headCells":"cells"].style};
	${({$noPadding:e})=>e&&"padding: 0"};
`,br=I(qe)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&G`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&mr`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&da`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&ua`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&pa(e)`
    display: none;
  `};
`,ga=G`
	div:first-child {
		white-space: ${({$wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({$allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,fa=I(br).attrs(e=>({style:e.style}))`
	${({$renderAsCell:e})=>!e&&ga};
	${({theme:e,$isDragging:t})=>t&&e.cells.draggingStyle};
	${({$cellStyle:e})=>e};
`;var ha=s.memo(function({id:e,column:t,row:n,rowIndex:r,dataTag:o,isDragging:a,onDragStart:i,onDragOver:d,onDragEnd:u,onDragEnter:w,onDragLeave:g}){const{conditionalStyle:f,classNames:S}=hr(n,t.conditionalCellStyles,["rdt_TableCell"]);return s.createElement(fa,{id:e,"data-column-id":t.id,role:"cell",className:S,"data-tag":o,$cellStyle:t.style,$renderAsCell:!!t.cell,$allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,$wrapCell:t.wrap,style:f,$isDragging:a,onDragStart:i,onDragOver:d,onDragEnd:u,onDragEnter:w,onDragLeave:g},!t.cell&&s.createElement("div",{"data-tag":o},function(b,y,E,D){return y?E&&typeof E=="function"?E(b,D):y(b,D):null}(n,t.selector,t.format,r)),t.cell&&t.cell(n,r,t,e))});const Ln="input";var wr=s.memo(function({name:e,component:t=Ln,componentOptions:n={style:{}},indeterminate:r=!1,checked:o=!1,disabled:a=!1,onClick:i=W}){const d=t,u=d!==Ln?n.style:(g=>Object.assign(Object.assign({fontSize:"18px"},!g&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(a),w=s.useMemo(()=>function(g,...f){let S;return Object.keys(g).map(b=>g[b]).forEach((b,y)=>{typeof b=="function"&&(S=Object.assign(Object.assign({},g),{[Object.keys(g)[y]]:b(...f)}))}),S||g}(n,r),[n,r]);return s.createElement(d,Object.assign({type:"checkbox",ref:g=>{g&&(g.indeterminate=r)},style:u,onClick:a?W:i,name:e,"aria-label":e,checked:o,disabled:a},w,{onChange:W}))});const ma=I(qe)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function ba({name:e,keyField:t,row:n,rowCount:r,selected:o,selectableRowsComponent:a,selectableRowsComponentProps:i,selectableRowsSingle:d,selectableRowDisabled:u,onSelectedRow:w}){const g=!(!u||!u(n));return s.createElement(ma,{onClick:f=>f.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},s.createElement(wr,{name:e,component:a,componentOptions:i,checked:o,"aria-checked":o,onClick:()=>{w({type:"SELECT_SINGLE_ROW",row:n,isSelected:o,keyField:t,rowCount:r,singleSelect:d})},disabled:g}))}const wa=I.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function ya({disabled:e=!1,expanded:t=!1,expandableIcon:n,id:r,row:o,onToggled:a}){const i=t?n.expanded:n.collapsed;return s.createElement(wa,{"aria-disabled":e,onClick:()=>a&&a(o),"data-testid":`expander-button-${r}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const xa=I(qe)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function va({row:e,expanded:t=!1,expandableIcon:n,id:r,onToggled:o,disabled:a=!1}){return s.createElement(xa,{onClick:i=>i.stopPropagation(),$noPadding:!0},s.createElement(ya,{id:r,row:e,expanded:t,expandableIcon:n,disabled:a,onToggled:o}))}const Ca=I.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({$extendedRowStyle:e})=>e};
`;var Sa=s.memo(function({data:e,ExpanderComponent:t,expanderComponentProps:n,extendedRowStyle:r,extendedClassNames:o}){const a=["rdt_ExpanderRow",...o.split(" ").filter(i=>i!=="rdt_TableRow")].join(" ");return s.createElement(Ca,{className:a,$extendedRowStyle:r},s.createElement(t,Object.assign({data:e},n)))});const Nt="allowRowEvents";var vt,Vt,Mn;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(vt||(vt={})),function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"}(Vt||(Vt={})),function(e){e.SM="sm",e.MD="md",e.LG="lg"}(Mn||(Mn={}));const Ra=G`
	&:hover {
		${({$highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,$a=G`
	&:hover {
		cursor: pointer;
	}
`,Ea=I.div.attrs(e=>({style:e.style}))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({$dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({$striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({$highlightOnHover:e})=>e&&Ra};
	${({$pointerOnHover:e})=>e&&$a};
	${({$selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
	${({$conditionalStyle:e})=>e};
`;function Oa({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:n=!1,defaultExpanderDisabled:r=!1,dense:o=!1,expandableIcon:a,expandableRows:i=!1,expandableRowsComponent:d,expandableRowsComponentProps:u,expandableRowsHideExpander:w,expandOnRowClicked:g=!1,expandOnRowDoubleClicked:f=!1,highlightOnHover:S=!1,id:b,expandableInheritConditionalStyles:y,keyField:E,onRowClicked:D=W,onRowDoubleClicked:P=W,onRowMouseEnter:O=W,onRowMouseLeave:p=W,onRowExpandToggled:m=W,onSelectedRow:R=W,pointerOnHover:h=!1,row:l,rowCount:$,rowIndex:H,selectableRowDisabled:k=null,selectableRows:N=!1,selectableRowsComponent:M,selectableRowsComponentProps:T,selectableRowsHighlight:te=!1,selectableRowsSingle:Re=!1,selected:fe,striped:le=!1,draggingColumnId:Te,onDragStart:Z,onDragOver:he,onDragEnd:ue,onDragEnter:Y,onDragLeave:$e}){const[Q,Ee]=s.useState(n);s.useEffect(()=>{Ee(n)},[n]);const ne=s.useCallback(()=>{Ee(!Q),m(!Q,l)},[Q,m,l]),Fe=h||i&&(g||f),me=s.useCallback(z=>{z.target.getAttribute("data-tag")===Nt&&(D(l,z),!r&&i&&g&&ne())},[r,g,i,ne,D,l]),re=s.useCallback(z=>{z.target.getAttribute("data-tag")===Nt&&(P(l,z),!r&&i&&f&&ne())},[r,f,i,ne,P,l]),be=s.useCallback(z=>{O(l,z)},[O,l]),X=s.useCallback(z=>{p(l,z)},[p,l]),V=Ve(l,E),{conditionalStyle:we,classNames:pe}=hr(l,t,["rdt_TableRow"]),ce=te&&fe,Pt=y?we:{},kt=le&&H%2==0;return s.createElement(s.Fragment,null,s.createElement(Ea,{id:`row-${b}`,role:"row",$striped:kt,$highlightOnHover:S,$pointerOnHover:!r&&Fe,$dense:o,onClick:me,onDoubleClick:re,onMouseEnter:be,onMouseLeave:X,className:pe,$selected:ce,$conditionalStyle:we},N&&s.createElement(ba,{name:`select-row-${V}`,keyField:E,row:l,rowCount:$,selected:fe,selectableRowsComponent:M,selectableRowsComponentProps:T,selectableRowDisabled:k,selectableRowsSingle:Re,onSelectedRow:R}),i&&!w&&s.createElement(va,{id:V,expandableIcon:a,expanded:Q,row:l,onToggled:ne,disabled:r}),e.map(z=>z.omit?null:s.createElement(ha,{id:`cell-${z.id}-${V}`,key:`cell-${z.id}-${V}`,dataTag:z.ignoreRowClick||z.button?null:Nt,column:z,row:l,rowIndex:H,isDragging:nt(Te,z.id),onDragStart:Z,onDragOver:he,onDragEnd:ue,onDragEnter:Y,onDragLeave:$e}))),i&&Q&&s.createElement(Sa,{key:`expander-${V}`,data:l,extendedRowStyle:Pt,extendedClassNames:pe,ExpanderComponent:d,expanderComponentProps:u}))}const Pa=I.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({$sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,ka=({sortActive:e,sortDirection:t})=>C.createElement(Pa,{$sortActive:e,$sortDirection:t},"▲"),Aa=I(br)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,$isDragging:t})=>t&&e.headCells.draggingStyle};
`,Da=G`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({$sortActive:e})=>!e&&G`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,Ia=I.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&Da};
`,_a=I.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var ja=s.memo(function({column:e,disabled:t,draggingColumnId:n,selectedColumn:r={},sortDirection:o,sortIcon:a,sortServer:i,pagination:d,paginationServer:u,persistSelectedOnSort:w,selectableRowsVisibleOnly:g,onSort:f,onDragStart:S,onDragOver:b,onDragEnd:y,onDragEnter:E,onDragLeave:D}){s.useEffect(()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)},[]);const[P,O]=s.useState(!1),p=s.useRef(null);if(s.useEffect(()=>{p.current&&O(p.current.scrollWidth>p.current.clientWidth)},[P]),e.omit)return null;const m=()=>{if(!e.sortable&&!e.selector)return;let T=o;nt(r.id,e.id)&&(T=o===Se.ASC?Se.DESC:Se.ASC),f({type:"SORT_CHANGE",sortDirection:T,selectedColumn:e,clearSelectedOnSort:d&&u&&!w||i||g})},R=T=>s.createElement(ka,{sortActive:T,sortDirection:o}),h=()=>s.createElement("span",{className:[o,"__rdt_custom_sort_icon__"].join(" ")},a),l=!(!e.sortable||!nt(r.id,e.id)),$=!e.sortable||t,H=e.sortable&&!a&&!e.right,k=e.sortable&&!a&&e.right,N=e.sortable&&a&&!e.right,M=e.sortable&&a&&e.right;return s.createElement(Aa,{"data-column-id":e.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,$isDragging:nt(e.id,n),onDragStart:S,onDragOver:b,onDragEnd:y,onDragEnter:E,onDragLeave:D},e.name&&s.createElement(Ia,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:$?void 0:m,onKeyPress:$?void 0:T=>{T.key==="Enter"&&m()},$sortActive:!$&&l,disabled:$},!$&&M&&h(),!$&&k&&R(l),typeof e.name=="string"?s.createElement(_a,{title:P?e.name:void 0,ref:p,"data-column-id":e.id},e.name):e.name,!$&&N&&h(),!$&&H&&R(l)))});const Ta=I(qe)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Fa({headCell:e=!0,rowData:t,keyField:n,allSelected:r,mergeSelections:o,selectedRows:a,selectableRowsComponent:i,selectableRowsComponentProps:d,selectableRowDisabled:u,onSelectAllRows:w}){const g=a.length>0&&!r,f=u?t.filter(y=>!u(y)):t,S=f.length===0,b=Math.min(t.length,f.length);return s.createElement(Ta,{className:"rdt_TableCol",$headCell:e,$noPadding:!0},s.createElement(wr,{name:"select-all-rows",component:i,componentOptions:d,onClick:()=>{w({type:"SELECT_ALL_ROWS",rows:f,rowCount:b,mergeSelections:o,keyField:n})},checked:r,indeterminate:g,disabled:S}))}function yr(e=vt.AUTO){const t=typeof window=="object",[n,r]=s.useState(!1);return s.useEffect(()=>{if(t)if(e!=="auto")r(e==="rtl");else{const o=!(!window.document||!window.document.createElement),a=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],d=a.dir==="rtl"||i.dir==="rtl";r(o&&d)}},[e,t]),n}const Ha=I.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Na=I.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,zn=I.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({$rtl:e})=>e&&"direction: rtl"};
	${({theme:e})=>e.contextMenu.style};
	${({theme:e,$visible:t})=>t&&e.contextMenu.activeStyle};
`;function La({contextMessage:e,contextActions:t,contextComponent:n,selectedCount:r,direction:o}){const a=yr(o),i=r>0;return n?s.createElement(zn,{$visible:i},s.cloneElement(n,{selectedCount:r})):s.createElement(zn,{$visible:i,$rtl:a},s.createElement(Ha,null,((d,u,w)=>{if(u===0)return null;const g=u===1?d.singular:d.plural;return w?`${u} ${d.message||""} ${g}`:`${u} ${g} ${d.message||""}`})(e,r,a)),s.createElement(Na,null,t))}const Ma=I.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({theme:e})=>e.header.style}
`,za=I.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,Wa=I.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Ba=({title:e,actions:t=null,contextMessage:n,contextActions:r,contextComponent:o,selectedCount:a,direction:i,showMenu:d=!0})=>s.createElement(Ma,{className:"rdt_TableHeader",role:"heading","aria-level":1},s.createElement(za,null,e),t&&s.createElement(Wa,null,t),d&&s.createElement(La,{contextMessage:n,contextActions:r,contextComponent:o,direction:i,selectedCount:a}));function xr(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}const Ga={left:"flex-start",right:"flex-end",center:"center"},Ya=I.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Ga[e]};
	flex-wrap: ${({$wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,Va=e=>{var{align:t="right",wrapContent:n=!0}=e,r=xr(e,["align","wrapContent"]);return s.createElement(Ya,Object.assign({align:t,$wrapContent:n},r))},Ua=I.div`
	display: flex;
	flex-direction: column;
`,Ka=I.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({$responsive:e,$fixedHeader:t})=>e&&G`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({$fixedHeader:e=!1,$fixedHeaderScrollHeight:t="100vh"})=>e&&G`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,Wn=I.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,qa=I.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,Xa=I(qe)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,Za=I.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,Qa=()=>C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},C.createElement("path",{d:"M7 10l5 5 5-5z"}),C.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),Ja=I.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,ei=I.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,ti=e=>{var{defaultValue:t,onChange:n}=e,r=xr(e,["defaultValue","onChange"]);return s.createElement(ei,null,s.createElement(Ja,Object.assign({onChange:n,defaultValue:t},r)),s.createElement(Qa,null))},c={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return C.createElement("div",null,"To add an expander pass in a component instance via ",C.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:C.createElement(()=>C.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},C.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),C.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"})),null),expanded:C.createElement(()=>C.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},C.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),C.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"})),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:C.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:C.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Vt.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:C.createElement(()=>C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},C.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),C.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"})),null),paginationIconLastPage:C.createElement(()=>C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},C.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),C.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"})),null),paginationIconNext:C.createElement(()=>C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},C.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),C.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),paginationIconPrevious:C.createElement(()=>C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},C.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),C.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:vt.AUTO,onChangePage:W,onChangeRowsPerPage:W,onRowClicked:W,onRowDoubleClicked:W,onRowMouseEnter:W,onRowMouseLeave:W,onRowExpandToggled:W,onSelectedRowsChange:W,onSort:W,onColumnOrderChange:W},ni={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},ri=I.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,ct=I.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({$isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,oi=I.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${mr`
    width: 100%;
    justify-content: space-around;
  `};
`,vr=I.span`
	flex-shrink: 1;
	user-select: none;
`,ai=I(vr)`
	margin: 0 24px;
`,ii=I(vr)`
	margin: 0 4px;
`;var si=s.memo(function({rowsPerPage:e,rowCount:t,currentPage:n,direction:r=c.direction,paginationRowsPerPageOptions:o=c.paginationRowsPerPageOptions,paginationIconLastPage:a=c.paginationIconLastPage,paginationIconFirstPage:i=c.paginationIconFirstPage,paginationIconNext:d=c.paginationIconNext,paginationIconPrevious:u=c.paginationIconPrevious,paginationComponentOptions:w=c.paginationComponentOptions,onChangeRowsPerPage:g=c.onChangeRowsPerPage,onChangePage:f=c.onChangePage}){const S=(()=>{const T=typeof window=="object";function te(){return{width:T?window.innerWidth:void 0,height:T?window.innerHeight:void 0}}const[Re,fe]=s.useState(te);return s.useEffect(()=>{if(!T)return()=>null;function le(){fe(te())}return window.addEventListener("resize",le),()=>window.removeEventListener("resize",le)},[]),Re})(),b=yr(r),y=S.width&&S.width>599,E=tt(t,e),D=n*e,P=D-e+1,O=n===1,p=n===E,m=Object.assign(Object.assign({},ni),w),R=n===E?`${P}-${t} ${m.rangeSeparatorText} ${t}`:`${P}-${D} ${m.rangeSeparatorText} ${t}`,h=s.useCallback(()=>f(n-1),[n,f]),l=s.useCallback(()=>f(n+1),[n,f]),$=s.useCallback(()=>f(1),[f]),H=s.useCallback(()=>f(tt(t,e)),[f,t,e]),k=s.useCallback(T=>g(Number(T.target.value),n),[n,g]),N=o.map(T=>s.createElement("option",{key:T,value:T},T));m.selectAllRowsItem&&N.push(s.createElement("option",{key:-1,value:t},m.selectAllRowsItemText));const M=s.createElement(ti,{onChange:k,defaultValue:e,"aria-label":m.rowsPerPageText},N);return s.createElement(ri,{className:"rdt_Pagination"},!m.noRowsPerPage&&y&&s.createElement(s.Fragment,null,s.createElement(ii,null,m.rowsPerPageText),M),y&&s.createElement(ai,null,R),s.createElement(oi,null,s.createElement(ct,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":O,onClick:$,disabled:O,$isRTL:b},i),s.createElement(ct,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":O,onClick:h,disabled:O,$isRTL:b},u),!m.noRowsPerPage&&!y&&M,s.createElement(ct,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":p,onClick:l,disabled:p,$isRTL:b},d),s.createElement(ct,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":p,onClick:H,disabled:p,$isRTL:b},a)))});const Pe=(e,t)=>{const n=s.useRef(!0);s.useEffect(()=>{n.current?n.current=!1:e()},t)};function li(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ci=function(e){return function(t){return!!t&&typeof t=="object"}(e)&&!function(t){var n=Object.prototype.toString.call(t);return n==="[object RegExp]"||n==="[object Date]"||function(r){return r.$$typeof===di}(t)}(e)},di=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function at(e,t){return t.clone!==!1&&t.isMergeableObject(e)?Ue((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function ui(e,t,n){return e.concat(t).map(function(r){return at(r,n)})}function Bn(e){return Object.keys(e).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(n){return Object.propertyIsEnumerable.call(t,n)}):[]}(e))}function Gn(e,t){try{return t in e}catch{return!1}}function pi(e,t,n){var r={};return n.isMergeableObject(e)&&Bn(e).forEach(function(o){r[o]=at(e[o],n)}),Bn(t).forEach(function(o){(function(a,i){return Gn(a,i)&&!(Object.hasOwnProperty.call(a,i)&&Object.propertyIsEnumerable.call(a,i))})(e,o)||(Gn(e,o)&&n.isMergeableObject(t[o])?r[o]=function(a,i){if(!i.customMerge)return Ue;var d=i.customMerge(a);return typeof d=="function"?d:Ue}(o,n)(e[o],t[o],n):r[o]=at(t[o],n))}),r}function Ue(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||ui,n.isMergeableObject=n.isMergeableObject||ci,n.cloneUnlessOtherwiseSpecified=at;var r=Array.isArray(t);return r===Array.isArray(e)?r?n.arrayMerge(e,t,n):pi(e,t,n):at(t,n)}Ue.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(n,r){return Ue(n,r,t)},{})};var gi=li(Ue);const Yn={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},Vn={default:Yn,light:Yn,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function fi(e,t,n,r){const[o,a]=s.useState(()=>Nn(e)),[i,d]=s.useState(""),u=s.useRef("");Pe(()=>{a(Nn(e))},[e]);const w=s.useCallback(D=>{var P,O,p;const{attributes:m}=D.target,R=(P=m.getNamedItem("data-column-id"))===null||P===void 0?void 0:P.value;R&&(u.current=((p=(O=o[lt(o,R)])===null||O===void 0?void 0:O.id)===null||p===void 0?void 0:p.toString())||"",d(u.current))},[o]),g=s.useCallback(D=>{var P;const{attributes:O}=D.target,p=(P=O.getNamedItem("data-column-id"))===null||P===void 0?void 0:P.value;if(p&&u.current&&p!==u.current){const m=lt(o,u.current),R=lt(o,p),h=[...o];h[m]=o[R],h[R]=o[m],a(h),t(h)}},[t,o]),f=s.useCallback(D=>{D.preventDefault()},[]),S=s.useCallback(D=>{D.preventDefault()},[]),b=s.useCallback(D=>{D.preventDefault(),u.current="",d("")},[]),y=function(D=!1){return D?Se.ASC:Se.DESC}(r),E=s.useMemo(()=>o[lt(o,n==null?void 0:n.toString())]||{},[n,o]);return{tableColumns:o,draggingColumnId:i,handleDragStart:w,handleDragEnter:g,handleDragOver:f,handleDragLeave:S,handleDragEnd:b,defaultSortDirection:y,defaultSortColumn:E}}var mi=s.memo(function(e){const{data:t=c.data,columns:n=c.columns,title:r=c.title,actions:o=c.actions,keyField:a=c.keyField,striped:i=c.striped,highlightOnHover:d=c.highlightOnHover,pointerOnHover:u=c.pointerOnHover,dense:w=c.dense,selectableRows:g=c.selectableRows,selectableRowsSingle:f=c.selectableRowsSingle,selectableRowsHighlight:S=c.selectableRowsHighlight,selectableRowsNoSelectAll:b=c.selectableRowsNoSelectAll,selectableRowsVisibleOnly:y=c.selectableRowsVisibleOnly,selectableRowSelected:E=c.selectableRowSelected,selectableRowDisabled:D=c.selectableRowDisabled,selectableRowsComponent:P=c.selectableRowsComponent,selectableRowsComponentProps:O=c.selectableRowsComponentProps,onRowExpandToggled:p=c.onRowExpandToggled,onSelectedRowsChange:m=c.onSelectedRowsChange,expandableIcon:R=c.expandableIcon,onChangeRowsPerPage:h=c.onChangeRowsPerPage,onChangePage:l=c.onChangePage,paginationServer:$=c.paginationServer,paginationServerOptions:H=c.paginationServerOptions,paginationTotalRows:k=c.paginationTotalRows,paginationDefaultPage:N=c.paginationDefaultPage,paginationResetDefaultPage:M=c.paginationResetDefaultPage,paginationPerPage:T=c.paginationPerPage,paginationRowsPerPageOptions:te=c.paginationRowsPerPageOptions,paginationIconLastPage:Re=c.paginationIconLastPage,paginationIconFirstPage:fe=c.paginationIconFirstPage,paginationIconNext:le=c.paginationIconNext,paginationIconPrevious:Te=c.paginationIconPrevious,paginationComponent:Z=c.paginationComponent,paginationComponentOptions:he=c.paginationComponentOptions,responsive:ue=c.responsive,progressPending:Y=c.progressPending,progressComponent:$e=c.progressComponent,persistTableHead:Q=c.persistTableHead,noDataComponent:Ee=c.noDataComponent,disabled:ne=c.disabled,noTableHead:Fe=c.noTableHead,noHeader:me=c.noHeader,fixedHeader:re=c.fixedHeader,fixedHeaderScrollHeight:be=c.fixedHeaderScrollHeight,pagination:X=c.pagination,subHeader:V=c.subHeader,subHeaderAlign:we=c.subHeaderAlign,subHeaderWrap:pe=c.subHeaderWrap,subHeaderComponent:ce=c.subHeaderComponent,noContextMenu:Pt=c.noContextMenu,contextMessage:kt=c.contextMessage,contextActions:z=c.contextActions,contextComponent:Cr=c.contextComponent,expandableRows:it=c.expandableRows,onRowClicked:Qt=c.onRowClicked,onRowDoubleClicked:Jt=c.onRowDoubleClicked,onRowMouseEnter:en=c.onRowMouseEnter,onRowMouseLeave:tn=c.onRowMouseLeave,sortIcon:Sr=c.sortIcon,onSort:Rr=c.onSort,sortFunction:nn=c.sortFunction,sortServer:At=c.sortServer,expandableRowsComponent:$r=c.expandableRowsComponent,expandableRowsComponentProps:Er=c.expandableRowsComponentProps,expandableRowDisabled:rn=c.expandableRowDisabled,expandableRowsHideExpander:on=c.expandableRowsHideExpander,expandOnRowClicked:Or=c.expandOnRowClicked,expandOnRowDoubleClicked:Pr=c.expandOnRowDoubleClicked,expandableRowExpanded:an=c.expandableRowExpanded,expandableInheritConditionalStyles:kr=c.expandableInheritConditionalStyles,defaultSortFieldId:Ar=c.defaultSortFieldId,defaultSortAsc:Dr=c.defaultSortAsc,clearSelectedRows:sn=c.clearSelectedRows,conditionalRowStyles:Ir=c.conditionalRowStyles,theme:ln=c.theme,customStyles:cn=c.customStyles,direction:Xe=c.direction,onColumnOrderChange:_r=c.onColumnOrderChange,className:jr,ariaLabel:dn}=e,{tableColumns:un,draggingColumnId:pn,handleDragStart:gn,handleDragEnter:fn,handleDragOver:hn,handleDragLeave:mn,handleDragEnd:bn,defaultSortDirection:Tr,defaultSortColumn:Fr}=fi(n,_r,Ar,Dr),[{rowsPerPage:ye,currentPage:oe,selectedRows:Dt,allSelected:wn,selectedCount:yn,selectedColumn:de,sortDirection:He,toggleOnSelectedRowsChange:Hr},Oe]=s.useReducer(oa,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Fr,toggleOnSelectedRowsChange:!1,sortDirection:Tr,currentPage:N,rowsPerPage:T,selectedRowsFlag:!1,contextMessage:c.contextMessage}),{persistSelectedOnSort:xn=!1,persistSelectedOnPageChange:st=!1}=H,vn=!(!$||!st&&!xn),Nr=X&&!Y&&t.length>0,Lr=Z||si,Mr=s.useMemo(()=>((x={},_="default",q="default")=>{const ae=Vn[_]?_:q;return gi({table:{style:{color:(v=Vn[ae]).text.primary,backgroundColor:v.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:v.text.primary,backgroundColor:v.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:v.background.default,minHeight:"52px"}},head:{style:{color:v.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:v.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:v.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:v.context.background,fontSize:"18px",fontWeight:400,color:v.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:v.text.primary,backgroundColor:v.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:v.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:v.selected.text,backgroundColor:v.selected.default,borderBottomColor:v.background.default}},highlightOnHoverStyle:{color:v.highlightOnHover.text,backgroundColor:v.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:v.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:v.background.default},stripedStyle:{color:v.striped.text,backgroundColor:v.striped.default}},expanderRow:{style:{color:v.text.primary,backgroundColor:v.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:v.button.default,fill:v.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:v.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:v.button.hover},"&:focus":{outline:"none",backgroundColor:v.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:v.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:v.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:v.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:v.button.default,fill:v.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:v.button.disabled,fill:v.button.disabled},"&:hover:not(:disabled)":{backgroundColor:v.button.hover},"&:focus":{outline:"none",backgroundColor:v.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:v.text.primary,backgroundColor:v.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:v.text.primary,backgroundColor:v.background.default}}},x);var v})(cn,ln),[cn,ln]),zr=s.useMemo(()=>Object.assign({},Xe!=="auto"&&{dir:Xe}),[Xe]),U=s.useMemo(()=>{if(At)return t;if(de!=null&&de.sortFunction&&typeof de.sortFunction=="function"){const x=de.sortFunction,_=He===Se.ASC?x:(q,ae)=>-1*x(q,ae);return[...t].sort(_)}return function(x,_,q,ae){return _?ae&&typeof ae=="function"?ae(x.slice(0),_,q):x.slice(0).sort((v,It)=>{const Le=_(v),xe=_(It);if(q==="asc"){if(Le<xe)return-1;if(Le>xe)return 1}if(q==="desc"){if(Le>xe)return-1;if(Le<xe)return 1}return 0}):x}(t,de==null?void 0:de.selector,He,nn)},[At,de,He,t,nn]),Ze=s.useMemo(()=>{if(X&&!$){const x=oe*ye,_=x-ye;return U.slice(_,x)}return U},[oe,X,$,ye,U]),Wr=s.useCallback(x=>{Oe(x)},[]),Br=s.useCallback(x=>{Oe(x)},[]),Gr=s.useCallback(x=>{Oe(x)},[]),Yr=s.useCallback((x,_)=>Qt(x,_),[Qt]),Vr=s.useCallback((x,_)=>Jt(x,_),[Jt]),Ur=s.useCallback((x,_)=>en(x,_),[en]),Kr=s.useCallback((x,_)=>tn(x,_),[tn]),Ne=s.useCallback(x=>Oe({type:"CHANGE_PAGE",page:x,paginationServer:$,visibleOnly:y,persistSelectedOnPageChange:st}),[$,st,y]),qr=s.useCallback(x=>{const _=tt(k||Ze.length,x),q=Ht(oe,_);$||Ne(q),Oe({type:"CHANGE_ROWS_PER_PAGE",page:q,rowsPerPage:x})},[oe,Ne,$,k,Ze.length]);if(X&&!$&&U.length>0&&Ze.length===0){const x=tt(U.length,ye),_=Ht(oe,x);Ne(_)}Pe(()=>{m({allSelected:wn,selectedCount:yn,selectedRows:Dt.slice(0)})},[Hr]),Pe(()=>{Rr(de,He,U.slice(0))},[de,He]),Pe(()=>{l(oe,k||U.length)},[oe]),Pe(()=>{h(ye,oe)},[ye]),Pe(()=>{Ne(N)},[N,M]),Pe(()=>{if(X&&$&&k>0){const x=tt(k,ye),_=Ht(oe,x);oe!==_&&Ne(_)}},[k]),s.useEffect(()=>{Oe({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:sn})},[f,sn]),s.useEffect(()=>{if(!E)return;const x=U.filter(q=>E(q)),_=f?x.slice(0,1):x;Oe({type:"SELECT_MULTIPLE_ROWS",keyField:a,selectedRows:_,totalRows:U.length,mergeSelections:vn})},[t,E]);const Xr=y?Ze:U,Zr=st||f||b;return s.createElement(ea,{theme:Mr},!me&&(!!r||!!o)&&s.createElement(Ba,{title:r,actions:o,showMenu:!Pt,selectedCount:yn,direction:Xe,contextActions:z,contextComponent:Cr,contextMessage:kt}),V&&s.createElement(Va,{align:we,wrapContent:pe},ce),s.createElement(Ka,Object.assign({$responsive:ue,$fixedHeader:re,$fixedHeaderScrollHeight:be,className:jr},zr),s.createElement(qa,null,Y&&!Q&&s.createElement(Wn,null,$e),s.createElement(ia,Object.assign({disabled:ne,className:"rdt_Table",role:"table"},dn&&{"aria-label":dn}),!Fe&&(!!Q||U.length>0&&!Y)&&s.createElement(la,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:re},s.createElement(ca,{className:"rdt_TableHeadRow",role:"row",$dense:w},g&&(Zr?s.createElement(qe,{style:{flex:"0 0 48px"}}):s.createElement(Fa,{allSelected:wn,selectedRows:Dt,selectableRowsComponent:P,selectableRowsComponentProps:O,selectableRowDisabled:D,rowData:Xr,keyField:a,mergeSelections:vn,onSelectAllRows:Br})),it&&!on&&s.createElement(Xa,null),un.map(x=>s.createElement(ja,{key:x.id,column:x,selectedColumn:de,disabled:Y||U.length===0,pagination:X,paginationServer:$,persistSelectedOnSort:xn,selectableRowsVisibleOnly:y,sortDirection:He,sortIcon:Sr,sortServer:At,onSort:Wr,onDragStart:gn,onDragOver:hn,onDragEnd:bn,onDragEnter:fn,onDragLeave:mn,draggingColumnId:pn})))),!U.length&&!Y&&s.createElement(Za,null,Ee),Y&&Q&&s.createElement(Wn,null,$e),!Y&&U.length>0&&s.createElement(Ua,{className:"rdt_TableBody",role:"rowgroup"},Ze.map((x,_)=>{const q=Ve(x,a),ae=function(xe=""){return typeof xe!="number"&&(!xe||xe.length===0)}(q)?_:q,v=ht(x,Dt,a),It=!!(it&&an&&an(x)),Le=!!(it&&rn&&rn(x));return s.createElement(Oa,{id:ae,key:ae,keyField:a,"data-row-id":ae,columns:un,row:x,rowCount:U.length,rowIndex:_,selectableRows:g,expandableRows:it,expandableIcon:R,highlightOnHover:d,pointerOnHover:u,dense:w,expandOnRowClicked:Or,expandOnRowDoubleClicked:Pr,expandableRowsComponent:$r,expandableRowsComponentProps:Er,expandableRowsHideExpander:on,defaultExpanderDisabled:Le,defaultExpanded:It,expandableInheritConditionalStyles:kr,conditionalRowStyles:Ir,selected:v,selectableRowsHighlight:S,selectableRowsComponent:P,selectableRowsComponentProps:O,selectableRowDisabled:D,selectableRowsSingle:f,striped:i,onRowExpandToggled:p,onRowClicked:Yr,onRowDoubleClicked:Vr,onRowMouseEnter:Ur,onRowMouseLeave:Kr,onSelectedRow:Gr,draggingColumnId:pn,onDragStart:gn,onDragOver:hn,onDragEnd:bn,onDragEnter:fn,onDragLeave:mn})}))))),Nr&&s.createElement("div",null,s.createElement(Lr,{onChangePage:Ne,onChangeRowsPerPage:qr,rowCount:k||U.length,currentPage:oe,rowsPerPage:ye,direction:Xe,paginationRowsPerPageOptions:te,paginationIconLastPage:Re,paginationIconFirstPage:fe,paginationIconNext:le,paginationIconPrevious:Te,paginationComponentOptions:he})))});const bi=()=>({headCells:{style:{backgroundColor:"#115e59",fontWeight:"bold",fontSize:"14px",color:"white",justifyContent:"flex-start",paddingLeft:"8px",paddingRight:"0px"}},headRow:{style:{borderBottom:"2px solid #ccc"}},rows:{style:{minHeight:"45px",borderBottom:"1px solid #eee"}},cells:{style:{justifyContent:"flex-start",paddingLeft:"8px",paddingRight:"0px"}}});export{mi as X,bi as u};
