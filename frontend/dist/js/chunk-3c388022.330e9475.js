(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c388022"],{2532:function(t,e,s){"use strict";var i=s("23e7"),n=s("5a34"),r=s("1d80"),o=s("ab13");i({target:"String",proto:!0,forced:!o("includes")},{includes:function(t){return!!~String(r(this)).indexOf(n(t),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,s){var i=s("861d"),n=s("c6b6"),r=s("b622"),o=r("match");t.exports=function(t){var e;return i(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==n(t))}},"5a34":function(t,e,s){var i=s("44e7");t.exports=function(t){if(i(t))throw TypeError("The method doesn't accept regular expressions");return t}},ab13:function(t,e,s){var i=s("b622"),n=i("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(s){try{return e[n]=!1,"/./"[t](e)}catch(i){}}return!1}},b9df:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"row bg-dark p-sm-3"},[s("div",{staticClass:"text-center flex-fill"},[s("label",{staticClass:"pr-sm-2",attrs:{for:"issue-filter"}},[t._v("Search: ")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.issueFilter,expression:"issueFilter"}],attrs:{id:"issue-filter",placeholder:"Enter issue name",type:"text"},domProps:{value:t.issueFilter},on:{input:function(e){e.target.composing||(t.issueFilter=e.target.value)}}})])]),t._l(t.visibleIssues,(function(e,i){return s("div",{key:i,staticClass:"text-center row bg-secondary p-sm-2 h-100",staticStyle:{border:"1px dotted #82cc6f"}},[s("div",{staticClass:"col-sm my-auto font-weight-bold text-info"},[t._v(" "+t._s(i)+" ")]),s("div",{staticClass:"col-sm my-auto text-center font-italic font-weight-bold"},t._l(e,(function(e,n){return s("div",{key:n,staticClass:"p-sm-1"},["null"!==n?s("a",{attrs:{href:"#/issue?issueName="+encodeURIComponent(i)+"&issueVolume="+encodeURIComponent(n)}},[t._v(" "+t._s(n)+" ")]):s("a",{attrs:{href:"#/issue?issueName="+encodeURIComponent(i)}},[t._v(" n/a ")]),t._v(" (Issue count: "+t._s(e)+") ")])})),0)])}))],2)},n=[],r=(s("caad"),s("2532"),s("bc3a")),o=s.n(r),a={data:function(){return{issueList:{},issueFilter:""}},computed:{visibleIssues:function(){if(!this.issueFilter)return this.issueList;var t={};for(var e in this.issueList)e.toLowerCase().includes(this.issueFilter.toLowerCase())&&(t[e]=this.issueList[e]);return t}},created:function(){var t=this;o.a.get("issues").then((function(e){t.issueList=e.data})).catch((function(t){return console.log(t)}))}},u=a,c=s("2877"),l=Object(c["a"])(u,i,n,!1,null,null,null);e["default"]=l.exports},caad:function(t,e,s){"use strict";var i=s("23e7"),n=s("4d64").includes,r=s("44d2"),o=s("ae40"),a=o("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!a},{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),r("includes")}}]);
//# sourceMappingURL=chunk-3c388022.330e9475.js.map