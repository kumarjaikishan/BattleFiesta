import{c as re,u as le,a as oe,b as ce,r as K,s as ue,j as e,H as de,m as ae,B as L,I as ne,T as M,d as te,M as he,N as pe,e as me,F as fe,f as xe,g as ge,S as ve,h as Y,C as je,i as be,k as ye,L as $e,l as we,n as Se,o as Me,p as ke,q as De,Q as S,t as ie,v as Ne}from"./index-DO3jyj00.js";var Ce={exports:{}};(function(k,se){(function(W,A){k.exports=A()})(re,function(){var W=1e3,A=6e4,E=36e5,U="millisecond",d="second",$="minute",D="hour",N="day",v="week",b="month",R="quarter",C="year",O="date",Q="Invalid Date",X=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,I=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,P={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(o){var t=["th","st","nd","rd"],s=o%100;return"["+o+(t[(s-20)%10]||t[s]||t[0])+"]"}},y=function(o,t,s){var i=String(o);return!i||i.length>=t?o:""+Array(t+1-i.length).join(s)+o},q={s:y,z:function(o){var t=-o.utcOffset(),s=Math.abs(t),i=Math.floor(s/60),a=s%60;return(t<=0?"+":"-")+y(i,2,"0")+":"+y(a,2,"0")},m:function o(t,s){if(t.date()<s.date())return-o(s,t);var i=12*(s.year()-t.year())+(s.month()-t.month()),a=t.clone().add(i,b),c=s-a<0,u=t.clone().add(i+(c?-1:1),b);return+(-(i+(s-a)/(c?a-u:u-a))||0)},a:function(o){return o<0?Math.ceil(o)||0:Math.floor(o)},p:function(o){return{M:b,y:C,w:v,d:N,D:O,h:D,m:$,s:d,ms:U,Q:R}[o]||String(o||"").toLowerCase().replace(/s$/,"")},u:function(o){return o===void 0}},T="en",_={};_[T]=P;var J="$isDayjsObject",G=function(o){return o instanceof p||!(!o||!o[J])},n=function o(t,s,i){var a;if(!t)return T;if(typeof t=="string"){var c=t.toLowerCase();_[c]&&(a=c),s&&(_[c]=s,a=c);var u=t.split("-");if(!a&&u.length>1)return o(u[0])}else{var h=t.name;_[h]=t,a=h}return!i&&a&&(T=a),a||!i&&T},r=function(o,t){if(G(o))return o.clone();var s=typeof t=="object"?t:{};return s.date=o,s.args=arguments,new p(s)},l=q;l.l=n,l.i=G,l.w=function(o,t){return r(o,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var p=function(){function o(s){this.$L=n(s.locale,null,!0),this.parse(s),this.$x=this.$x||s.x||{},this[J]=!0}var t=o.prototype;return t.parse=function(s){this.$d=function(i){var a=i.date,c=i.utc;if(a===null)return new Date(NaN);if(l.u(a))return new Date;if(a instanceof Date)return new Date(a);if(typeof a=="string"&&!/Z$/i.test(a)){var u=a.match(X);if(u){var h=u[2]-1||0,m=(u[7]||"0").substring(0,3);return c?new Date(Date.UTC(u[1],h,u[3]||1,u[4]||0,u[5]||0,u[6]||0,m)):new Date(u[1],h,u[3]||1,u[4]||0,u[5]||0,u[6]||0,m)}}return new Date(a)}(s),this.init()},t.init=function(){var s=this.$d;this.$y=s.getFullYear(),this.$M=s.getMonth(),this.$D=s.getDate(),this.$W=s.getDay(),this.$H=s.getHours(),this.$m=s.getMinutes(),this.$s=s.getSeconds(),this.$ms=s.getMilliseconds()},t.$utils=function(){return l},t.isValid=function(){return this.$d.toString()!==Q},t.isSame=function(s,i){var a=r(s);return this.startOf(i)<=a&&a<=this.endOf(i)},t.isAfter=function(s,i){return r(s)<this.startOf(i)},t.isBefore=function(s,i){return this.endOf(i)<r(s)},t.$g=function(s,i,a){return l.u(s)?this[i]:this.set(a,s)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(s,i){var a=this,c=!!l.u(i)||i,u=l.p(s),h=function(H,j){var z=l.w(a.$u?Date.UTC(a.$y,j,H):new Date(a.$y,j,H),a);return c?z:z.endOf(N)},m=function(H,j){return l.w(a.toDate()[H].apply(a.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(j)),a)},f=this.$W,x=this.$M,w=this.$D,B="set"+(this.$u?"UTC":"");switch(u){case C:return c?h(1,0):h(31,11);case b:return c?h(1,x):h(0,x+1);case v:var F=this.$locale().weekStart||0,V=(f<F?f+7:f)-F;return h(c?w-V:w+(6-V),x);case N:case O:return m(B+"Hours",0);case D:return m(B+"Minutes",1);case $:return m(B+"Seconds",2);case d:return m(B+"Milliseconds",3);default:return this.clone()}},t.endOf=function(s){return this.startOf(s,!1)},t.$set=function(s,i){var a,c=l.p(s),u="set"+(this.$u?"UTC":""),h=(a={},a[N]=u+"Date",a[O]=u+"Date",a[b]=u+"Month",a[C]=u+"FullYear",a[D]=u+"Hours",a[$]=u+"Minutes",a[d]=u+"Seconds",a[U]=u+"Milliseconds",a)[c],m=c===N?this.$D+(i-this.$W):i;if(c===b||c===C){var f=this.clone().set(O,1);f.$d[h](m),f.init(),this.$d=f.set(O,Math.min(this.$D,f.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},t.set=function(s,i){return this.clone().$set(s,i)},t.get=function(s){return this[l.p(s)]()},t.add=function(s,i){var a,c=this;s=Number(s);var u=l.p(i),h=function(x){var w=r(c);return l.w(w.date(w.date()+Math.round(x*s)),c)};if(u===b)return this.set(b,this.$M+s);if(u===C)return this.set(C,this.$y+s);if(u===N)return h(1);if(u===v)return h(7);var m=(a={},a[$]=A,a[D]=E,a[d]=W,a)[u]||1,f=this.$d.getTime()+s*m;return l.w(f,this)},t.subtract=function(s,i){return this.add(-1*s,i)},t.format=function(s){var i=this,a=this.$locale();if(!this.isValid())return a.invalidDate||Q;var c=s||"YYYY-MM-DDTHH:mm:ssZ",u=l.z(this),h=this.$H,m=this.$m,f=this.$M,x=a.weekdays,w=a.months,B=a.meridiem,F=function(j,z,Z,ee){return j&&(j[z]||j(i,c))||Z[z].slice(0,ee)},V=function(j){return l.s(h%12||12,j,"0")},H=B||function(j,z,Z){var ee=j<12?"AM":"PM";return Z?ee.toLowerCase():ee};return c.replace(I,function(j,z){return z||function(Z){switch(Z){case"YY":return String(i.$y).slice(-2);case"YYYY":return l.s(i.$y,4,"0");case"M":return f+1;case"MM":return l.s(f+1,2,"0");case"MMM":return F(a.monthsShort,f,w,3);case"MMMM":return F(w,f);case"D":return i.$D;case"DD":return l.s(i.$D,2,"0");case"d":return String(i.$W);case"dd":return F(a.weekdaysMin,i.$W,x,2);case"ddd":return F(a.weekdaysShort,i.$W,x,3);case"dddd":return x[i.$W];case"H":return String(h);case"HH":return l.s(h,2,"0");case"h":return V(1);case"hh":return V(2);case"a":return H(h,m,!0);case"A":return H(h,m,!1);case"m":return String(m);case"mm":return l.s(m,2,"0");case"s":return String(i.$s);case"ss":return l.s(i.$s,2,"0");case"SSS":return l.s(i.$ms,3,"0");case"Z":return u}return null}(j)||u.replace(":","")})},t.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},t.diff=function(s,i,a){var c,u=this,h=l.p(i),m=r(s),f=(m.utcOffset()-this.utcOffset())*A,x=this-m,w=function(){return l.m(u,m)};switch(h){case C:c=w()/12;break;case b:c=w();break;case R:c=w()/3;break;case v:c=(x-f)/6048e5;break;case N:c=(x-f)/864e5;break;case D:c=x/E;break;case $:c=x/A;break;case d:c=x/W;break;default:c=x}return a?c:l.a(c)},t.daysInMonth=function(){return this.endOf(b).$D},t.$locale=function(){return _[this.$L]},t.locale=function(s,i){if(!s)return this.$L;var a=this.clone(),c=n(s,i,!0);return c&&(a.$L=c),a},t.clone=function(){return l.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},o}(),g=p.prototype;return r.prototype=g,[["$ms",U],["$s",d],["$m",$],["$H",D],["$W",N],["$M",b],["$y",C],["$D",O]].forEach(function(o){g[o[1]]=function(t){return this.$g(t,o[0],o[1])}}),r.extend=function(o,t){return o.$i||(o(t,p,r),o.$i=!0),r},r.locale=n,r.isDayjs=G,r.unix=function(o){return r(1e3*o)},r.en=_[T],r.Ls=_,r.p={},r})})(Ce);const _e=()=>{const k=le(n=>n.userprofile),se=oe(),{handleImage:W}=Ne(),A=ce(),E="https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp",U={name:"",username:"",email:"",phone:"",city:"",state:"",bio:"",publicemail:"",publicphone:"",profile:"",cover:"",sociallinks:""},[d,$]=K.useState(U),[D,N]=K.useState(""),[v,b]=K.useState({plan:"N/A",planprice:"N/A",buydate:"N/A",expirydate:"N/A",expire_in:"N/A",status:"N/A",tournament:"N/A"});K.useEffect(()=>{k.userprofile&&C(),console.log(k.userprofile)},[k]);const R=ue("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:1}),C=async()=>{if(!k.membership)return;let n=k.userprofile,r=k.membership;$({...d,name:n.name,username:n.username,email:n.email,phone:n.phone,city:n.city,state:n.state,bio:n.bio,publicemail:n.publicemail,publicphone:n.publicphone,sociallinks:n.sociallinks,profile:n.imgsrc,cover:n.coversrc}),k.membership.planid.plan_name&&b({plan:r.planid.plan_name,planprice:r.planid.price,tournament:r.planid.create_limit>500?"Unlimited":r.planid.create_limit,buydate:r.buy_date,expirydate:r.expire_date,expire_in:G(r.expire_date),status:r.isActive?"active":"expired"})},O=()=>{let n={name:"",link:""};$({...d,sociallinks:[...d.sociallinks,n]})},Q=n=>{let r=d.sociallinks.filter((l,p)=>p!=n);$({...d,sociallinks:r})},X=(n,r)=>{const l=n.target.name,p=n.target.value,g=[...d.sociallinks];g[r]={...g[r],[l]:p},$({...d,sociallinks:g})},I=n=>{const r=n.target.name,l=n.target.value;$({...d,[r]:l})},[P,y]=K.useState(!1),q=async n=>{n.preventDefault(),y(!0);const r=S.loading("Please wait...");try{const l=localStorage.getItem("token"),p=await fetch("/api/updateprofile",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(d)}),g=await p.json();if(console.log(g),y(!1),!p.ok)return S.update(r,{render:g.message,type:"warning",isLoading:!1,autoClose:1600});se(ie()),S.update(r,{render:g.message,type:"success",isLoading:!1,autoClose:1600})}catch(l){S.update(r,{render:l.message,type:"warn",isLoading:!1,autoClose:1600}),console.log(l),y(!1)}},T=async(n,r)=>{const l=n.target.files[0];let p,g;if(r=="profile"?(p=await W(230,l),g="/api/updateprofilepic"):(p=await W(600,l),g="/api/updatecoverpic"),p){const o=S.loading("Uploading Please wait...");y(!0);try{const t=localStorage.getItem("token"),s=new FormData;s.append(r==="profile"?"profilepic":"coverpic",p);const i=await fetch(g,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:s}),a=await i.json();if(y(!1),i.ok){S.update(o,{render:a.message,type:"success",isLoading:!1,autoClose:1600}),se(ie());return}S.update(o,{render:a.message,type:"warning",isLoading:!1,autoClose:1600})}catch(t){S.update(o,{render:t.message,type:"warning",isLoading:!1,autoClose:1600}),console.log(t),y(!1)}}},_=async()=>{try{y(!0);const n=S.loading("Please wait..."),r=localStorage.getItem("token"),l=await fetch("/api/passreset",{method:"Get",headers:{Authorization:`Bearer ${r}`}}),p=await l.json();if(y(!1),!l.ok)return S.update(n,{render:p.message,type:"warn",isLoading:!1,autoClose:2100});N(p.extramessage),S.update(n,{render:p.message,type:"success",isLoading:!1,autoClose:2100})}catch(n){S.update(id,{render:n.message,type:"warn",isLoading:!1,autoClose:2200}),y(!1),console.log(n)}},J=n=>{const r={day:"2-digit",month:"short",year:"numeric"};return new Date(n).toLocaleDateString("en-GB",r)};function G(n){const p=new Date(n)-new Date;return Math.floor(p/(1e3*60*60*24))+1}return e.jsxs("div",{className:"profilepage",children:[e.jsxs(de,{children:[e.jsx("title",{children:"Profile || BattleFiesta"}),e.jsx("meta",{name:"description",content:"Manage your BattleFiesta profile, update personal details, track tournament history, and customize settings for a better gaming experience."})]}),e.jsx(ae.div,{animate:{scale:[1,1.2,1.2,1],rotate:[0,90,90,0],borderRadius:["10%","20%","40%","10%"]},transition:{duration:8,ease:"easeInOut",repeat:1/0},className:"circle circle1"}),e.jsx(ae.div,{animate:{scale:[1,1.1,1.1,1]},transition:{duration:4,repeat:1/0},className:"circle circle2"}),e.jsxs("div",{className:"materials",children:[e.jsxs("div",{className:"profilepic glass",children:[e.jsx("h2",{children:"Profile Picture"}),e.jsxs("div",{className:"coverimg",children:[e.jsx("img",{src:d.cover?d.cover:E,loading:"lazy",alt:"cover picture"}),e.jsx("div",{className:"img",children:e.jsx("img",{src:d.profile?d.profile:E,loading:"lazy",alt:"profile picture"})})]}),e.jsxs(L,{component:"label",sx:{mt:6},disabled:P,role:void 0,variant:"contained",tabIndex:-1,startIcon:e.jsx(ne,{}),className:"splbtn",children:["Change Cover",e.jsx(R,{onChange:n=>T(n,"cover"),type:"file",accept:"image/*"})]}),e.jsxs(L,{component:"label",sx:{mt:1},disabled:P,role:void 0,variant:"contained",tabIndex:-1,startIcon:e.jsx(ne,{}),className:"splbtn",children:["Change Profile",e.jsx(R,{onChange:n=>T(n,"profile"),type:"file",accept:"image/*"})]})]}),e.jsxs("div",{className:"profiledeatil glass",children:[e.jsx("h2",{children:"Profile"}),e.jsxs("form",{onSubmit:q,children:[e.jsxs("div",{className:"input",children:[e.jsx(M,{size:"small",onChange:I,name:"name",value:d.name,className:"half",label:"Display Name",variant:"outlined"}),e.jsx(M,{size:"small",onChange:I,name:"username",value:d.username,className:"half",label:"UserName",variant:"outlined"}),e.jsx(M,{size:"small",contentEditable:!1,disabled:!0,name:"email",value:d.email,className:"half",label:"Email",variant:"outlined"}),e.jsx(M,{size:"small",onChange:I,name:"phone",value:d.phone,type:"tel",inputProps:{minLength:10,maxLength:10},onKeyPress:n=>{/[0-9]/.test(n.key)||n.preventDefault()},className:"half",label:"Phone",variant:"outlined"}),e.jsx(M,{size:"small",onChange:I,name:"city",value:d.city,className:"half",label:"City",variant:"outlined"}),e.jsx(M,{size:"small",onChange:I,name:"state",value:d.state,className:"half",label:"State",variant:"outlined"}),e.jsx(M,{onChange:I,name:"bio",value:d.bio,multiline:!0,rows:2,className:"full textarea",label:"Bio/About",variant:"outlined"})]}),e.jsx(L,{disabled:P,variant:"contained",startIcon:e.jsx(te,{}),className:"splbtn",type:"submit",size:"small",children:"Save"}),e.jsx(L,{variant:"contained",startIcon:e.jsx(he,{}),className:"splbtn",size:"small",sx:{marginLeft:1},onClick:()=>A(`/channel/@${k.userprofile.username}`),children:"Public Profile"})]})]}),e.jsxs("div",{className:"membership glass",children:[e.jsx("h2",{children:"Membership"}),e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsx("span",{children:" Plan"})," ",e.jsx("span",{children:":"})," ",e.jsxs("span",{children:[v.plan," Plan"]})," "]}),e.jsxs("p",{children:[e.jsx("span",{children:" Plan price"})," ",e.jsx("span",{children:":"})," ",e.jsxs("span",{children:["₹ ",v.planprice,".00"]})," "]}),e.jsxs("p",{children:[e.jsx("span",{children:" Tournament"})," ",e.jsx("span",{children:":"})," ",e.jsx("span",{children:v.tournament})," "]}),e.jsxs("p",{children:[e.jsx("span",{children:" Buy Date"})," ",e.jsx("span",{children:":"})," ",e.jsx("span",{children:J(v.buydate)})," "]}),e.jsxs("p",{children:[e.jsx("span",{children:" Expiry Date"})," ",e.jsx("span",{children:":"})," ",e.jsxs("span",{children:[J(v.expirydate)," "]})," "]}),e.jsxs("p",{children:[e.jsx("span",{children:" Expire In"})," ",e.jsx("span",{children:":"})," ",e.jsxs("span",{style:{color:v.expire_in<6&&"red"},children:[v.expire_in," Days "]})," "]}),e.jsxs("p",{children:[e.jsx("span",{children:" Status"})," ",e.jsx("span",{children:":"})," ",e.jsx("span",{className:`status ${v.status}`,children:v.status})," "]}),e.jsxs(pe,{className:"navlink",to:"/plan",children:["  ",e.jsx(L,{variant:"contained",className:"splbtn",startIcon:e.jsx(me,{}),children:"Buy Membership"})]})]})]}),e.jsxs("div",{className:"passchange glass",children:[e.jsx("h2",{children:"Change Password"}),e.jsxs("div",{children:[e.jsx(M,{required:!0,name:"link",InputProps:{readOnly:!0},fullWidth:!0,size:"small",value:d.email,className:"half",label:"Email Address",variant:"outlined"}),D&&e.jsx("p",{style:{color:"green",fontSize:"14px"},children:D}),!D.length&&e.jsxs("p",{style:{fontSize:"14px"},children:["A verification email will be sent to ",e.jsx("b",{children:d.email}),"."]}),e.jsx(L,{disabled:P,onClick:_,title:"Feature coming soon",variant:"contained",className:"splbtn",startIcon:e.jsx(fe,{}),children:"Send Password Reset Link"})]})]}),e.jsxs("div",{className:"privacy glass",children:[e.jsx("h2",{children:"Privacy"}),e.jsxs("div",{className:"input",children:[e.jsx(M,{onChange:I,name:"publicemail",value:d.publicemail,className:"full",helperText:"This emaill will be visible on your profile page",label:"Public Email",variant:"outlined"}),e.jsx(M,{onChange:I,type:"tel",inputProps:{minLength:10,maxLength:10},onKeyPress:n=>{/[0-9]/.test(n.key)||n.preventDefault()},name:"publicphone",value:d.publicphone,className:"full",helperText:"This phone number will be visible on your profile page",label:"Public Phone",variant:"outlined"})]}),e.jsx(L,{disabled:P,variant:"contained",startIcon:e.jsx(te,{}),className:"splbtn",onClick:q,size:"small",children:"Save"})]}),e.jsxs("div",{className:"social glass",children:[e.jsx("h2",{children:"Social Links"}),e.jsxs("form",{onSubmit:q,children:[d.sociallinks&&d.sociallinks.map((n,r)=>e.jsxs("div",{className:"link",children:[e.jsx("span",{children:e.jsxs(xe,{fullWidth:!0,size:"small",children:[e.jsx(ge,{children:"Name*"}),e.jsxs(ve,{labelId:"demo-simple-select-label",value:n.name,required:!0,label:"Name",name:"name",onChange:l=>X(l,r),children:[e.jsxs(Y,{value:"facebook",children:[e.jsx(je,{}),"   Facebook"]}),e.jsxs(Y,{value:"youtube",children:[e.jsx(be,{}),"   Youtube"]}),e.jsxs(Y,{value:"instagram",children:[e.jsx(ye,{}),"  Instagram"]}),e.jsxs(Y,{value:"discord",children:[e.jsx($e,{}),"  Discord"]}),e.jsxs(Y,{value:"telegram",children:[e.jsx(we,{}),"  Telegram"]}),e.jsxs(Y,{value:"twitter",children:[e.jsx(Se,{}),"  Twitter"]}),e.jsxs(Y,{value:"website",children:[e.jsx(Me,{}),"  Website"]})]})]})}),e.jsx("span",{children:e.jsx(M,{required:!0,value:n.link,name:"link",fullWidth:!0,size:"small",onChange:l=>X(l,r),className:"half",label:"Url",variant:"outlined"})}),e.jsxs("span",{title:"Remove This",onClick:()=>Q(r),children:[" ",e.jsx(ke,{})," "]})]},r)),e.jsx("div",{children:e.jsx(L,{variant:"outlined",onClick:O,startIcon:e.jsx(De,{}),children:"Add"})}),e.jsx(L,{disabled:P,variant:"contained",startIcon:e.jsx(te,{}),className:"splbtn",type:"submit",size:"small",children:"Save"})]})]})]})]})};export{_e as default};
