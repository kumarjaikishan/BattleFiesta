import{a as I,u as j,r as n,j as e,P as g,Z as m,R as P,m as f,X as z,U as B,T as y,_ as T,B as A,Q as c,Y as F}from"./index-v-J5rd_1.js";import{R as O}from"./index-Xwv6tFtZ.js";const Q=()=>{const r=I();j(s=>s.tournacenter);const a=j(s=>s.admin);n.useState(a.contactusform);const[S,i]=n.useState(!1),[h,b]=n.useState(""),[p,d]=n.useState(""),[N,v]=n.useState("");n.useEffect(()=>{},[]);const C=s=>{b(s.target.value)},k=(s,t)=>{i(!0),d(s),v(t)},[w,u]=n.useState(!1),E=async s=>{s.preventDefault();try{u(!0);const t=localStorage.getItem("token"),o=await fetch("https://esport-backend.vercel.app/api/emailreply",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({contactid:N,email:p,reply:h})}),l=await o.json();o.ok?(d(""),d(""),c.success(l.message,{autoClose:1300}),i(!1),r(m())):c.warn(l.message,{autoClose:1500}),u(!1)}catch(t){u(!1),console.log(t)}},R=async s=>{F({title:"Are you sure?",text:"Once deleted, you will not be able to recover this",icon:"warning",buttons:!0,dangerMode:!0}).then(async t=>{if(t)try{const o=localStorage.getItem("token"),l=await fetch("https://esport-backend.vercel.app/api/contactusdelete",{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({id:s})}),x=await l.json();l.ok?(r(m()),c.success(x.message,{autoClose:1300})):c.warn(x.message,{autoClose:1500})}catch(o){console.log(o)}})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"query",children:e.jsxs("div",{className:"all",children:[e.jsxs("div",{className:"controler",children:[e.jsx("h2",{style:{textAlign:"center"},children:"Query List"}),e.jsx(g,{loading:a.loading,onClick:()=>r(m()),loadingPosition:"end",endIcon:e.jsx(P,{}),variant:"outlined",type:"submit",size:"small",className:"refreshe",children:"REFRESH"})]}),e.jsxs("div",{className:"header",children:[e.jsx("span",{children:"#"}),e.jsx("span",{children:"Name"}),e.jsx("span",{children:"Email"}),e.jsx("span",{children:"Message"}),e.jsx("span",{children:"Status"}),e.jsx("span",{children:"Actions"})]}),(a==null?void 0:a.contactusform.length)<1&&e.jsx("div",{className:"body",children:"No Query Found"}),e.jsx(f.div,{layout:!0,className:"body",children:a.contactusform&&a.contactusform.map((s,t)=>e.jsxs(f.div,{layout:!0,children:[e.jsx("span",{children:t+1}),e.jsx("span",{children:s.name}),e.jsx("span",{children:s.email}),e.jsx("span",{children:s.message}),e.jsx("span",{className:s.resolve?"status done":"status pending",title:s.resolve?s.resolvemsg:"",children:s.resolve?"Resolved":"Pending"}),e.jsxs("span",{children:[e.jsx(z,{className:"editicon ico",title:"Edit",onClick:()=>k(s.email,s._id)}),e.jsx(O,{className:"deleteicon ico",title:"Delete",onClick:()=>R(s._id)})]})]},t))}),e.jsx(B,{open:S,onClose:()=>i(!1),children:e.jsx("div",{className:"membermodal",children:e.jsxs("form",{onSubmit:E,children:[e.jsx("h2",{children:"Reply"}),e.jsxs("span",{className:"modalcontent",children:[e.jsx(y,{sx:{width:"98%"},value:p,contentEditable:!1,label:"Email",size:"small"}),e.jsx(y,{autoFocus:!0,multiline:!0,rows:4,onChange:C,value:h,sx:{width:"98%"},label:"Reply",size:"small"}),e.jsxs("div",{children:[e.jsx(g,{sx:{mr:2},loading:w,loadingPosition:"end",endIcon:e.jsx(T,{}),variant:"contained",type:"submit",children:"Send Email"}),e.jsx(A,{size:"small",onClick:()=>i(!1),variant:"outlined",children:" cancel"})]})]})]})})})]})})})};export{Q as default};
