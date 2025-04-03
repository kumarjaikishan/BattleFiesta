import{a3 as R,u as N,a as q,b as F,r as h,j as e,P as J,a4 as w,R as Y,X as _,a5 as G,U as k,T as j,f as I,g as D,S as M,h as g,B as f,V as H,Y as V,Q as i}from"./index-vYQNsgPH.js";import{R as K}from"./index-wI0xhdB5.js";function Q(o){return R({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M17.187 19.181L24 4.755 0 12.386l9.196 1.963.043 4.896 2.759-2.617-2.147-2.076 7.336 4.63z"},child:[]}]})(o)}const Z=()=>{var v;const o=N(s=>s.admin),z=N(s=>s.admin),b=q();F();const y={id:"",name:"",phone:"",isverified:"",isadmin:""},[l,u]=h.useState(y),C={email:"",message:""},[r,p]=h.useState(C);h.useEffect(()=>{},[]);const $=s=>{const a={day:"2-digit",month:"short",year:"2-digit"};return new Date(s).toLocaleDateString("en-GB",a).replace(/(\d{2} \w{3}) (\d{2})/,"$1, $2")},A=async s=>{if(V({title:"Are you sure?",icon:"warning",buttons:!0,dangerMode:!0}).then(async a=>{if(a){const t=i.loading("Please wait...");try{const n=localStorage.getItem("token"),m=await fetch("/api/deleteuser",{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({userid:s})}),S=await m.json();if(m.ok)b(w()),i.update(t,{render:S.message,type:"success",isLoading:!1,autoClose:2100});else return i.update(t,{render:S.message,type:"warn",isLoading:!1,autoClose:2100})}catch(n){i.update(t,{render:n.message,type:"warn",isLoading:!1,autoClose:5200}),console.log(n)}}}),!s)return i.warn("UserId cannot be blank")},[B,d]=h.useState(!1),[E,c]=h.useState(!1),L=async s=>{s.preventDefault();try{const a=localStorage.getItem("token"),t=await fetch("/api/editUser",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify(l)}),n=await t.json();d(!1),t.status==200?(b(w()),u(y),i.success(n.message,{autoClose:1300})):i.warn(n.message,{autoClose:1500})}catch(a){i.error(a.message,{autoClose:1900}),console.log(a),d(!1)}},P=async s=>{s.preventDefault();const a=r.message.replace(/\n/g,"<br />");try{const t=localStorage.getItem("token"),n=await fetch("/api/emailsend",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({email:r.email,reply:a})}),m=await n.json();c(!1),n.status==200?(p(C),i.success(m.message,{autoClose:1300})):i.warn(m.message,{autoClose:1500})}catch(t){console.log(t),c(!1),i.error(t.message,{autoClose:1900})}},T=s=>{u({id:s._id,name:s.name,phone:s.phone,isverified:s.isverified,isadmin:s.isadmin}),d(!0)},U=s=>{p({email:s.email,message:""}),c(!0)},x=(s,a)=>{u({...l,[a]:s.target.value})},O=(s,a)=>{p({...r,[a]:s.target.value})};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"adminusers",children:[e.jsxs("div",{className:"controler",children:[e.jsx("h2",{style:{textAlign:"center"},children:"Users"}),e.jsx(J,{loading:z.loading,onClick:()=>b(w()),loadingPosition:"end",endIcon:e.jsx(Y,{}),variant:"outlined",type:"submit",size:"small",className:"refreshe",children:"REFRESH"})]}),e.jsxs("div",{className:"header",children:[e.jsx("span",{children:"#"}),e.jsx("span",{children:"Name"}),e.jsx("span",{children:"Mobile"}),e.jsx("span",{children:"Email"}),e.jsx("span",{children:"Date"}),e.jsx("span",{children:"Actions"})]}),e.jsx("div",{className:"body",children:(v=o==null?void 0:o.users)==null?void 0:v.map((s,a)=>{var t;return e.jsxs("div",{className:`status ${(t=s.membership)!=null&&t.isActive?"active":"expired"}`,children:[e.jsx("span",{children:a+1}),e.jsx("span",{style:{cursor:"pointer"},onClick:()=>window.open(`/channel/@${s.username}`,"_blank"),children:s.name}),e.jsx("span",{children:s.phone}),e.jsx("span",{children:s.email}),e.jsx("span",{children:$(s.createdAt)}),e.jsxs("span",{children:[e.jsx(_,{className:"editicon ico",title:"Edit",onClick:()=>T(s)}),e.jsx(G,{className:"printicon ico",title:"Mail",onClick:()=>U(s)}),e.jsx(K,{className:"deleteicon ico",title:"Delete",onClick:()=>A(s._id)})]})]},a)})}),e.jsx(k,{open:B,onClose:()=>d(!1),children:e.jsx("div",{className:"membermodal",children:e.jsxs("form",{onSubmit:L,children:[e.jsx("h2",{children:"User Detail"}),e.jsxs("span",{className:"modalcontent",children:[e.jsx(j,{required:!0,value:l.name,onChange:s=>x(s,"name"),sx:{width:"98%"},label:"Name",size:"small"}),e.jsx(j,{type:"tel",required:!0,value:l.phone,onChange:s=>x(s,"phone"),sx:{width:"98%"},label:"Mobile",onKeyPress:s=>{/[0-9]/.test(s.key)||s.preventDefault()},size:"small"}),e.jsxs(I,{sx:{width:"98%"},size:"small",children:[e.jsx(D,{id:"demo-simple-select-label",children:"Verify"}),e.jsxs(M,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:l.isverified,label:"status",onChange:s=>x(s,"isverified"),children:[e.jsx(g,{value:!0,children:"Yes"}),e.jsx(g,{value:!1,children:"No"})]})]}),e.jsxs(I,{sx:{width:"98%"},size:"small",children:[e.jsx(D,{id:"demo-simple-select-label",children:"Admin"}),e.jsxs(M,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:l.isadmin,label:"status",onChange:s=>x(s,"isadmin"),children:[e.jsx(g,{value:!0,children:"Yes"}),e.jsx(g,{value:!1,children:"No"})]})]}),e.jsxs("div",{style:{width:"100%"},children:[e.jsx(f,{startIcon:e.jsx(H,{}),type:"submit",variant:"contained",children:" Update"}),e.jsx(f,{onClick:()=>{d(!1),u(y)},variant:"outlined",children:" cancel"})]})]})]})})}),e.jsx(k,{open:E,onClose:()=>c(!1),children:e.jsx("div",{className:"membermodal mail",children:e.jsxs("form",{onSubmit:P,children:[e.jsx("h2",{children:"Send Email"}),e.jsxs("span",{className:"modalcontent",children:[e.jsx(j,{required:!0,value:r.email,sx:{width:"98%"},label:"Email Id",disabled:!0,size:"small"}),e.jsx(j,{required:!0,value:r.message,onChange:s=>O(s,"message"),sx:{width:"98%"},multiline:!0,rows:8,label:"Message",size:"small"}),e.jsxs("div",{style:{width:"100%"},children:[e.jsx(f,{startIcon:e.jsx(Q,{}),type:"submit",variant:"contained",children:" Send"}),e.jsx(f,{onClick:()=>{c(!1),p(C)},variant:"outlined",children:" cancel"})]})]})]})})})]})})};export{Z as default};
