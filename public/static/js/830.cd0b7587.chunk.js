"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[830],{830:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var n=a(43),s=a(688),l=a(707),i=a(214),r=a(731),o=a(49),d=a(275),c=a(886),u=a(133),p=(a(284),a(171)),h=a(211),v=a(579);const m=()=>{const e=(0,n.useContext)(c.c),t=(0,s.W6)(),a=(0,s.g)().placeId,[m,x]=(0,n.useState)(),{sendRequest:f,error:j,clearError:y,isLoading:b}=(0,p.x)(),[A,C,g]=(0,u.m)({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1);(0,n.useEffect)((()=>{(async()=>{try{const e=await f(`https://project-02-backend.onrender.com/api/places/${a}`);x(e.place),g({title:{value:e.place.title,isValid:!0},description:{value:e.place.description,isValid:!0}},!0)}catch(j){console.log(j)}})()}),[f,a,g]);return b?(0,v.jsx)("div",{className:"center",children:(0,v.jsx)(o.A,{asOverlay:!0})}):m||j?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(h.A,{error:j,onClear:y}),!b&&m&&(0,v.jsxs)("form",{className:"place-form",onSubmit:async n=>{n.preventDefault();try{await f(`https://project-02-backend.onrender.com/api/places/${a}`,"PATCH",JSON.stringify({title:A.inputs.title.value,description:A.inputs.description.value}),{"Content-Type":"application/json",Authorization:"Bearer "+e.token}),t.push("/"+e.userId+"/places")}catch(j){console.log(j)}},children:[(0,v.jsx)(l.A,{id:"title",element:"input",type:"text",label:"Title",validators:[(0,d.B_)()],errorText:"Please enter a valid title.",onInput:C,initialValue:m.title,initialValid:!0}),(0,v.jsx)(l.A,{id:"description",element:"textarea",label:"Description",validators:[(0,d.Ik)(5)],errorText:"Please enter a valid description (min. 5 characters).",onInput:C,initialValue:m.description,initialValid:!0}),(0,v.jsx)(i.A,{type:"submit",disabled:!A.isValid,children:"UPDATE PLACE"})]})]}):(0,v.jsx)("div",{className:"center",children:(0,v.jsx)(r.A,{children:(0,v.jsx)("h2",{children:"Could not find place!"})})})}},214:(e,t,a)=>{a.d(t,{A:()=>l});a(43);var n=a(582),s=a(579);const l=e=>e.href?(0,s.jsx)("a",{className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,href:e.href,children:e.children}):e.to?(0,s.jsx)(n.N_,{to:e.to,exact:e.exact,className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,children:e.children}):(0,s.jsx)("button",{className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})},707:(e,t,a)=>{a.d(t,{A:()=>r});var n=a(43),s=a(275),l=a(579);const i=(e,t)=>{switch(t.type){case"CHANGE":return{...e,value:t.val,isValid:(0,s.tf)(t.val,t.validators)};case"TOUCH":return{...e,isTouched:!0};default:return e}},r=e=>{const[t,a]=(0,n.useReducer)(i,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),{id:s,onInput:r}=e,{value:o,isValid:d}=t;(0,n.useEffect)((()=>{r(s,o,d)}),[s,o,d,r]);const c=t=>{a({type:"CHANGE",val:t.target.value,validators:e.validators})},u=()=>{a({type:"TOUCH"})},p="input"===e.element?(0,l.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:c,onBlur:u,value:t.value}):(0,l.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:c,onBlur:u,value:t.value});return(0,l.jsxs)("div",{className:`form-control ${!t.isValid&&t.isTouched&&"form-control--invalid"}`,children:[(0,l.jsx)("label",{htmlFor:e.id,children:e.label}),p,!t.isValid&&t.isTouched&&(0,l.jsx)("p",{children:e.errorText})]})}},731:(e,t,a)=>{a.d(t,{A:()=>s});var n=a(579);const s=e=>(0,n.jsx)("div",{className:`card ${e.className}`,style:e.style,children:e.children})},211:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(95),s=a(214),l=a(579);const i=e=>(0,l.jsx)(n.A,{onCancel:e.onClear,header:"An Error Occurred!",show:e.error,footer:(0,l.jsx)(s.A,{onClick:e.onClear,children:"Okay"}),children:(0,l.jsx)("p",{children:e.error})})},95:(e,t,a)=>{a.d(t,{A:()=>d});var n=a(43),s=a(950),l=a(336),i=a(516),r=a(579);const o=e=>{const t=(0,r.jsxs)("div",{className:`modal ${e.className}`,style:e.style,children:[(0,r.jsx)("header",{className:`modal__header ${e.headerClass}`,children:(0,r.jsx)("h2",{children:e.header})}),(0,r.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:e=>e.preventDefault(),children:[(0,r.jsx)("div",{className:`modal__content ${e.contentClass}`,children:e.children}),(0,r.jsx)("footer",{className:`modal__footer ${e.footerClass}`,children:e.footer})]})]});return s.createPortal(t,document.getElementById("modal-hook"))},d=e=>(0,r.jsxs)(n.Fragment,{children:[e.show&&(0,r.jsx)(i.A,{onClick:e.onCancel}),(0,r.jsx)(l.A,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:(0,r.jsx)(o,{...e})})]})},133:(e,t,a)=>{a.d(t,{m:()=>l});var n=a(43);const s=(e,t)=>{switch(t.type){case"INPUT_CHANGE":let a=!0;for(const n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return{...e,inputs:{...e.inputs,[t.inputId]:{value:t.value,isValid:t.isValid}},isValid:a};case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},l=(e,t)=>{const[a,l]=(0,n.useReducer)(s,{inputs:e,isValid:t});return[a,(0,n.useCallback)(((e,t,a)=>{l({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),(0,n.useCallback)(((e,t)=>{l({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},171:(e,t,a)=>{a.d(t,{x:()=>s});var n=a(43);const s=()=>{const[e,t]=(0,n.useState)(!1),[a,s]=(0,n.useState)(),l=(0,n.useRef)([]);return{isLoading:e,error:a,sendRequest:(0,n.useCallback)((async function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};t(!0);const r=new AbortController;l.current.push(r);try{const s=await fetch(e,{method:a,body:n,headers:i,signal:r.signal}),o=await s.json();if(l.current=l.current.filter((e=>e===r)),!s.ok)throw new Error(o.message);return t(!1),o}catch(o){throw s(o.message),t(!1),o}}),[]),clearError:()=>{s(null)}}}},275:(e,t,a)=>{a.d(t,{B_:()=>r,Ik:()=>o,i$:()=>d,tf:()=>c});const n="REQUIRE",s="MINLENGTH",l="MAXLENGTH",i="EMAIL",r=()=>({type:n}),o=e=>({type:s,val:e}),d=()=>({type:i}),c=(e,t)=>{let a=!0;for(const r of t)r.type===n&&(a=a&&e.trim().length>0),r.type===s&&(a=a&&e.trim().length>=r.val),r.type===l&&(a=a&&e.trim().length<=r.val),"MIN"===r.type&&(a=a&&+e>=r.val),"MAX"===r.type&&(a=a&&+e<=r.val),r.type===i&&(a=a&&/^\S+@\S+\.\S+$/.test(e));return a}},284:()=>{}}]);
//# sourceMappingURL=830.cd0b7587.chunk.js.map