import{a as O,q as k,r as n,t as D,v as h,Q as d,j as e,G as M,w as b,T as A,x as G,y as _,z,B as F,A as P}from"./index-C1h3fxAk.js";import{a as R}from"./index-1YGi_DDR.js";const B=()=>{const c=O(),N=k(),S="https://res.cloudinary.com/dusxlxlvm/image/upload/v1709654642/battlefiesta/assets/logo/logopng250_vuhy4f.webp";n.useEffect(()=>{c(D("Tournaments")),c(h(!0)),E()},[]);const[p,C]=n.useState([]),[g,v]=n.useState([]),[x,T]=n.useState([]),[j,a]=n.useState([]),[f,r]=n.useState([]),[u,w]=n.useState(""),m=s=>{let t=document.querySelectorAll(".conta .cate div");t.forEach(o=>o.classList.remove("active")),t[s].classList.add("active"),s===0?(a(g),r(g)):s===1?(a(p),r(p)):(a(x),r(x))},E=async()=>{try{const s=await fetch("/api/getalltournament",{method:"GET"}),t=await s.json();if(console.log(t),c(h(!1)),!s.ok)return d.warn(t.message,{autoClose:2e3});let o=[],l=[],y=[];t.data.forEach(i=>{i.status==="ongoing"&&o.push(i),i.status==="upcoming"&&l.push(i),i.status==="completed"&&y.push(i)}),C(o),v(l),T(y),a(l),r(l)}catch(s){console.log(s),c(h(!1))}},L=async()=>{if(u.trim()==="")return a(f),d.warn("Search is Empty",{autoClose:1200});try{const s=await fetch("/api/tournamnetsearch",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tournid:u})}),t=await s.json();if(!s.ok)return d.warn(t.message,{autoClose:1500});a([t.query])}catch(s){console.log(s)}},I=s=>{N(`/tournaments/${s}`)};return e.jsxs("div",{className:"findtournas",children:[e.jsxs("div",{className:"conta",children:[e.jsxs("div",{className:"cate",children:[e.jsxs("div",{onClick:()=>m(0),className:"active",children:[e.jsx(M,{}),e.jsx("span",{children:"UPCOMING"})]}),e.jsxs("div",{onClick:()=>m(1),children:[e.jsx(R,{}),e.jsx("span",{children:"ONGOING"})]}),e.jsxs("div",{onClick:()=>m(2),children:[e.jsx(b,{}),e.jsx("span",{children:"COMPLETED"})]})]}),e.jsxs("div",{children:[e.jsx(A,{label:"Tournament Id...",fullWidth:!0,size:"small",className:"filled",value:u,onChange:s=>{const t=s.target.value;w(t),t===""&&a(f)}}),e.jsx(G,{onClick:L,title:"Search",className:"searchIcon"})]})]}),e.jsxs("div",{className:"cards",children:[j.length<1&&e.jsx("div",{className:"notfound",children:e.jsxs("div",{children:[e.jsx(_,{className:"sad"}),e.jsx("h2",{children:"No Tournament Found"}),e.jsx("p",{children:"This section will be auto updated once any Tournament comes under this section"})]})}),j.map(s=>{const t=new Date(s.createdAt).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}),o=new Date(s.createdAt).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",second:"numeric",hour12:!0});return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"img",children:[e.jsx("img",{loading:"lazy",src:s.tournment_logo?s.tournment_logo:S,alt:"logo"}),e.jsx("span",{title:s.title,children:s.title})]}),e.jsxs("h3",{className:"organiser",children:["- ",s.organiser]}),e.jsxs("div",{className:"time",children:[t,", ",o," ",e.jsx("span",{children:s.type})]}),e.jsxs("div",{className:"tournId",children:["ID :- ",s.tournid,e.jsx(z,{title:"Copy Id",onClick:()=>{navigator.clipboard.writeText(s.tournid),d.success("Copied",{autoClose:1e3})}})]}),e.jsxs("div",{className:"controller",children:[e.jsx(F,{size:"small",onClick:()=>I(s._id),variant:"contained",endIcon:e.jsx(P,{}),children:"READ MORE"}),e.jsx("p",{className:"status",title:"Status",children:s.status})]})]},s._id)})]})]})};export{B as default};