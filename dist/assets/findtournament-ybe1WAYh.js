import{a as G,b as I,r as a,w as M,x as r,Q as l,j as e,H as O,G as B,y as F,z as b,T as A,A as P,D as R,E as z,J as U,K as _,B as Q,O as $}from"./index-DO3jyj00.js";const H=()=>{const i=G(),S=I();a.useEffect(()=>{i(M("Tournaments")),i(r(!0)),L()},[]);const[g,C]=a.useState([]),[x,T]=a.useState([]),[j,w]=a.useState([]),[f,n]=a.useState([]),[h,d]=a.useState([]),[u,v]=a.useState(""),[D,y]=a.useState(!1),p=s=>{let t=document.querySelectorAll(".conta .cate div");t.forEach(o=>o.classList.remove("active")),t[s].classList.add("active"),s===0?(n(x),d(x)):s===1?(n(g),d(g)):(n(j),d(j))},L=async()=>{try{const s=await fetch("/api/getalltournament",{method:"GET"}),t=await s.json();if(console.log(t),i(r(!1)),!s.ok)return l.warn(t.message,{autoClose:2e3});let o=[],m=[],N=[];t.data.forEach(c=>{c.status==="ongoing"&&o.push(c),c.status==="upcoming"&&m.push(c),c.status==="completed"&&N.push(c)}),C(o),T(m),w(N),n(m),d(m)}catch(s){console.log(s),i(r(!1))}},E=async()=>{if(u.trim()==="")return n(h),l.warn("Search is Empty",{autoClose:1200});if(u.trim().length!=8)return n(h),l.warn("Tournament Id must be 8 Digits",{autoClose:1200});try{i(r(!0));const s=await fetch("/api/tournamnetsearch",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tournid:u})}),t=await s.json();if(console.log(t),i(r(!1)),!s.ok)return l.warn(t.message,{autoClose:1500});y(!0),n([t.query])}catch(s){i(r(!1)),console.log(s)}},k=s=>{S(`/tournaments/${s}`)};return e.jsxs("div",{className:"findtournas",children:[e.jsxs(O,{children:[e.jsx("title",{children:"Find Tournaments || BattleFiesta"}),e.jsx("meta",{name:"description",content:"Discover and join exciting PUBG, BGMI, and Free Fire tournaments on BattleFiesta. Browse ongoing and upcoming competitions, check rankings with automatic points tables, and compete with top players."})]}),e.jsxs("div",{className:"conta",children:[e.jsxs("div",{className:"cate",children:[e.jsxs("div",{onClick:()=>p(0),className:"active",children:[e.jsx(B,{}),e.jsx("span",{children:"UPCOMING"})]}),e.jsxs("div",{onClick:()=>p(1),children:[e.jsx(F,{}),e.jsx("span",{children:"ONGOING"})]}),e.jsxs("div",{onClick:()=>p(2),children:[e.jsx(b,{}),e.jsx("span",{children:"COMPLETED"})]})]}),e.jsxs("div",{children:[e.jsx(A,{label:"Tournament ID",fullWidth:!0,size:"small",type:"tel",inputProps:{minLength:8,maxLength:8},onKeyPress:s=>{/[0-9]/.test(s.key)||s.preventDefault()},className:"filled",value:u,onChange:s=>{const t=s.target.value;v(t),t===""&&(n(h),y(!1))}}),e.jsx(P,{onClick:E,title:"Search",className:"searchIcon"})]})]}),e.jsxs("div",{className:"cards",children:[f.length<1&&e.jsx("div",{className:"notfound",children:e.jsxs("div",{children:[e.jsx(R,{className:"sad"}),e.jsx("h2",{children:"No Tournament Found"}),e.jsx("p",{children:"This section will be auto updated once any Tournament comes under this section"})]})}),f.map(s=>{const t=new Date(s.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),o=new Date(s.createdAt).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"img",children:[e.jsx("img",{loading:"lazy",src:s.tournment_logo?s.tournment_logo:z,alt:"logo"}),e.jsx("span",{title:s.title,children:s.title})]}),e.jsxs("h3",{className:"organiser",children:["- ",s.organiser]}),e.jsxs("div",{className:"time",children:[t,", ",o," ",e.jsx("span",{children:s.type})]}),e.jsxs("div",{className:"tournId",children:[e.jsxs("span",{children:[" ID :- ",s.tournid,e.jsx(U,{title:"Copy Id",onClick:()=>{navigator.clipboard.writeText(s.tournid),l.success("Copied",{autoClose:1e3})}})]}),e.jsxs("span",{children:[" ",e.jsx(_,{})," ",s.totalTeamsRegistered," /",s.slots," "]})]}),e.jsxs("div",{className:"controller",children:[e.jsx(Q,{size:"small",onClick:()=>k(s._id),variant:"contained",endIcon:e.jsx($,{}),children:"READ MORE"}),D&&e.jsx("p",{className:"status",title:"Status",children:s.status})]})]},s._id)})]})]})};export{H as default};
