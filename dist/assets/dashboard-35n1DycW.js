import{r as c,j as e,E as j,H as g,B as p,Q as d}from"./index-vJf5eBTI.js";const b=()=>{const[h,m]=c.useState([]),[o,n]=c.useState(!1);c.useEffect(()=>{l()},[]);const l=async()=>{const s=localStorage.getItem("token");n(!0);try{const i=await(await fetch("https://esport-backend.vercel.app/api/databaseList",{method:"GET",headers:{Authorization:`Bearer ${s}`}})).json();console.log(i);const t=i.database.filter(r=>r.name!=="admin"&&r.name!=="local");m(t),n(!1)}catch(a){console.log(a),n(!1)}},x=async s=>{const a=localStorage.getItem("token"),i=d.loading("Please wait...");n(!0);try{const t=await fetch("https://esport-backend.vercel.app/api/dbbackup",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({dbname:s})}),r=await t.json();if(n(!1),t.ok)d.update(i,{render:r.message,type:"success",isLoading:!1,autoClose:1700});else return d.update(i,{render:r.message,type:"warning",isLoading:!1,autoClose:2100})}catch(t){n(!1),console.log(t),d.update(i,{render:t.message,type:"warning",isLoading:!1,autoClose:2700})}},u=s=>{const a=s/1024;return a>=1024?`${(a/1024).toFixed(2)} MB`:`${a.toFixed(2)} KB`};return e.jsx("div",{className:"admindashboard",children:e.jsxs("div",{className:"inner",children:[e.jsxs("div",{className:"controler",children:[e.jsx("h2",{style:{textAlign:"center"},children:"Admin Dashboard"}),e.jsx(j,{loading:o,onClick:()=>l(),loadingPosition:"end",endIcon:e.jsx(g,{}),variant:"outlined",type:"submit",size:"small",className:"refreshe",children:"REFRESH"})]}),e.jsxs("div",{className:"header",children:[e.jsx("span",{children:"#"}),e.jsx("span",{children:"Db Name"}),e.jsx("span",{children:"Size"}),e.jsx("span",{children:"Empty"}),e.jsx("span",{children:"Backup"}),e.jsx("span",{children:"Restore"})]}),e.jsxs("div",{className:"body",children:[o&&e.jsx("p",{style:{textAlign:"center"},children:" Data Loading, Please Wait..."}),h.map((s,a)=>e.jsxs("div",{children:[e.jsx("span",{children:a+1}),e.jsx("span",{children:s==null?void 0:s.name}),e.jsx("span",{children:u(s==null?void 0:s.sizeOnDisk)})," ",e.jsx("span",{children:s!=null&&s.empty?"Empty":"Data"}),e.jsx("span",{children:e.jsx(p,{disabled:o,size:"small",variant:"contained",onClick:()=>x(s==null?void 0:s.name),children:"Backup"})}),e.jsx("span",{children:e.jsx(p,{disabled:o,size:"small",variant:"outlined",children:"Restore"})})]},a))]})]})})};export{b as default};