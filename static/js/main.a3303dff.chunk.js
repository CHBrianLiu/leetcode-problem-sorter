(this.webpackJsonppages=this.webpackJsonppages||[]).push([[0],{109:function(e,t,i){},114:function(e,t){},116:function(e,t){},126:function(e,t,i){"use strict";i.r(t);var n=i(0),s=i.n(n),a=i(39),r=i.n(a),c=(i(109),i(34)),d=i.n(c),o=i(60),l=i(30),u=i(176),b=i(172),m=i(17),f=i(173),h=i(3),j=i(6),k=Object(h.A)({likes:{textAlign:"center"}}),p=[{key:"id",name:"ID",fieldName:"id",minWidth:10,maxWidth:40,isRowHeader:!0,isSorted:!0,isSortedDescending:!1,data:"string",isPadded:!0},{key:"title",name:"Title",onRender:function(e){return Object(j.jsx)(u.a,{href:"https://leetcode.com".concat(e.uri,"/"),target:"new",children:e.title})},minWidth:300,maxWidth:400,isRowHeader:!0,data:"string",isPadded:!0,isResizable:!0},{key:"likes",name:"Likes",fieldName:"likes",className:k.likes,minWidth:40,maxWidth:40,isRowHeader:!0,data:"number",isPadded:!0},{key:"dislikes",name:"Dislikes",fieldName:"dislikes",className:k.likes,minWidth:40,maxWidth:40,isRowHeader:!0,data:"number",isPadded:!0},{key:"ratio",name:"Ratio",fieldName:"ratio",className:k.likes,minWidth:40,maxWidth:40,isRowHeader:!0,data:"number",isPadded:!0},{key:"difficulty",name:"Difficulty",fieldName:"difficulty",minWidth:50,maxWidth:50,isRowHeader:!0,data:"string",isPadded:!0}],O=[{key:"all",text:"all",selected:!0},{key:"easy",text:"easy"},{key:"medium",text:"medium"},{key:"hard",text:"hard"}],x=function(e){var t=Object(n.useCallback)((function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=t,s=e.slice();return s.sort((function(e,t){return(i?e[n]<t[n]:e[n]>t[n])?1:-1})),s}),[]),i=Object(n.useMemo)((function(){return e.items}),[e.items]),s=Object(n.useState)(e.items),a=Object(l.a)(s,2),r=a[0],c=a[1],d=Object(n.useState)(p),o=Object(l.a)(d,2),u=o[0],h=o[1],k=Object(n.useCallback)((function(e,i){var n=u.slice(),s=n.filter((function(e){return i.key===e.key}))[0];s.isSorted?s.isSortedDescending=!s.isSortedDescending:(s.isSorted=!0,s.isSortedDescending=!1,n.forEach((function(e){i.key!==e.key&&(e.isSorted=!1)})));var a=t(r.slice(),s.key,s.isSortedDescending);c(a),h(n)}),[u,r,t]),x=Object(n.useCallback)((function(e,n,s){if(n){var a="all"===n.key?i.slice():i.filter((function(e){return n.key===e.difficulty})),r=u.filter((function(e){return e.isSorted}))[0];c(t(a,r.key,r.isSortedDescending))}}),[i,t,u]);return Object(n.useEffect)((function(){c(t(e.items,"id"))}),[e.items,t]),u.forEach((function(e){e.onColumnClick=k})),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(b.a,{placeholder:"Select an option",label:"Difficulty filter",options:O,onChange:x,style:{width:100}}),Object(j.jsx)(f.a,{columns:u,items:r,selectionMode:m.b.none,enableShimmer:e.loading})]})},g=i(81),y=function(){var e=Object(n.useState)(!0),t=Object(l.a)(e,2),i=t[0],s=t[1],a=Object(n.useState)([]),r=Object(l.a)(a,2),c=r[0],u=r[1],b=Object(n.useCallback)(Object(o.a)(d.a.mark((function e(){var t,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://raw.githubusercontent.com/CHBrianLiu/leetcode-problem-sorter/web/static/list.csv");case 2:return e.next=4,e.sent.text();case 4:return t=e.sent,i=Object(g.a)(t,{header:!0}),e.abrupt("return",i.data.slice(0,i.data.length-1));case 7:case"end":return e.stop()}}),e)}))),[]),m=Object(n.useCallback)((function(e){return{id:Number(e.id),title:e.title,uri:"/problems/".concat(e.title_slug),likes:Number(e.likes),dislikes:Number(e.dislikes),ratio:e.dislikes?Number((e.likes/e.dislikes).toPrecision(2)):999,difficulty:e.difficulty,isPaidOnly:!1}}),[]);return Object(n.useEffect)((function(){Object(o.a)(d.a.mark((function e(){var t,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:t=e.sent,i=t.map(m),u(i),s(!1);case 6:case"end":return e.stop()}}),e)})))()}),[m,b]),Object(j.jsx)(x,{loading:i,items:c})},w=i(178),v=function(){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(w.a,{variant:"xxLargePlus",children:"Leetcode Problems With Likes and Dislikes"}),Object(j.jsx)(w.a,{children:"A convenient entry to Leetcode problems with likes and dislikes helps you focus on superb exercises."}),Object(j.jsx)(w.a,{children:"Because Leetcode's official problem list doesn't provide likes and dislikes besides the titles, we sometimes wrongly pick a bad one which is time-wasting. This page provides you a snapshot of the problems. If you want an up-to-date version of the list, consider using the CLI tool to generate a list in CSV format."}),Object(j.jsx)(u.a,{href:"https://github.com/CHBrianLiu/leetcode-problem-sorter",children:"CHBrianLiu/leetcode-problem-sorter"})]})},S=i(177),C=i(84),N=i(175),W={root:{padding:10}},D={childrenGap:10};var L=function(){return Object(C.a)(),Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(N.a,{styles:W,tokens:D,children:[Object(j.jsx)(v,{}),Object(j.jsx)(S.a,{}),Object(j.jsx)(y,{})]})})},P=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,183)).then((function(t){var i=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;i(e),n(e),s(e),a(e),r(e)}))};r.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(L,{})}),document.getElementById("root")),P()}},[[126,1,2]]]);
//# sourceMappingURL=main.a3303dff.chunk.js.map