(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b5d26"],{"1b10":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"col-sm"},[s("h4",{staticClass:"row"},[t._v(" "+t._s("Visible "+t.issues.length+" issues of "+t.totalIssues+" total:")+" ")]),s("form",{staticClass:"row"},[s("div",{staticClass:"col-sm"},[t.user?s("div",{staticClass:"row form-group"},[s("label",{staticClass:"col-sm-1 pl-sm-0",attrs:{for:"read-dr"}},[t._v(" Status: ")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedReadStatus,expression:"selectedReadStatus"}],staticClass:"col-sm-2",attrs:{id:"read-dr"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedReadStatus=e.target.multiple?s:s[0]}}},t._l(t.readStatuses,(function(e){return s("option",{key:e},[t._v(" "+t._s(e)+" ")])})),0)]):s("div",[s("p",{staticStyle:{color:"orange"}},[t._v("Please log in to mark issues as read")])])])])]),s("section",{staticClass:"row"},[s("table",{staticClass:"table table-bordered table-striped table-sm"},[s("thead",{staticClass:"text-sm-center"},[s("tr",[t.user?s("th",[t._v("Read:")]):t._e(),s("th",[t._v("Issue name:")]),s("th",[t._v("Publication date:")]),s("th",[t._v("Volume:")]),s("th",[t._v("Issue no:")]),s("th",[t._v("Stories:")])])]),s("tbody",t._l(t.issues,(function(e,a){return s("tr",{key:a},[[t.user?s("td",["wait"===e.status?s("IconLoading"):s("div",{staticClass:"btn-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"issue.selected"}],staticClass:"form-check-inline mt-sm-2 ml-sm-1",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.selected)?t._i(e.selected,null)>-1:e.selected},on:{change:function(s){var a=e.selected,i=s.target,n=!!i.checked;if(Array.isArray(a)){var u=null,r=t._i(a,u);i.checked?r<0&&t.$set(e,"selected",a.concat([u])):r>-1&&t.$set(e,"selected",a.slice(0,r).concat(a.slice(r+1)))}else t.$set(e,"selected",n)}}}),"read"===e.status||"character"===e.status?s("button",{staticClass:"btn btn-danger",on:{click:function(s){return t.changeStatus([e._id],"clear")}}},[t._v(" Unread ")]):[s("button",{staticClass:"btn btn-primary",on:{click:function(s){return t.changeStatus([e._id],"read")}}},[t._v(" Read ")]),s("div",{staticClass:"btn-group"},[s("button",{staticClass:"btn btn-primary dropdown-toggle",attrs:{"data-toggle":"dropdown"}}),s("div",{staticClass:"dropdown-menu"},[s("button",{staticClass:"dropdown-item",on:{click:function(s){return t.changeFavouriteState(a,e._id,!e.isFavourite)}}},[t._v(" "+t._s(e.isFavourite?"Unfavourite":"Favourite")+" ")]),s("button",{staticClass:"dropdown-item",on:{click:function(s){return t.addIssueToIgnored(a,e._id)}}},[t._v(" Ignore ")])])])]],2)],1):t._e(),s("td",[e.isFavourite?s("img",{staticStyle:{width:"15px"},attrs:{src:"/img/FavIcon.png"}}):t._e(),s("a",{staticClass:"text-info",attrs:{type:"button"},on:{click:function(s){return t.showIssueDetails(e._id)}}},[t._v(" "+t._s(e.name)+" ")])]),s("td",[t._v(t._s(t._f("timestampToDate")(e.publishDateTimestamp)))]),s("td",[t._v(t._s(e.volume))]),s("td",[t._v(t._s(e.issueNo))]),s("td",[s("table",{staticClass:"table"},[s("tbody",t._l(e.subtitles,(function(e,a){return s("tr",{key:a,staticStyle:{"background-color":"inherit"}},[s("td",[t._v(t._s(e))])])})),0)])])]],2)})),0)])]),s("div",{staticClass:"footer"},[s("div",{staticClass:"btn-group-sm card-footer"},[t.allVisibleIssuesShouldBeSelected?s("button",{staticClass:"btn btn-dark btn-sm",on:{click:function(e){t.allVisibleIssuesShouldBeSelected=!1}}},[t._v(" Unselect all visible issues ")]):s("button",{staticClass:"btn btn-dark btn-sm",on:{click:function(e){t.allVisibleIssuesShouldBeSelected=!0}}},[t._v(" Select all visible issues ")]),s("button",{staticClass:"btn btn-dark btn-sm",on:{click:function(e){return t.changeStateOfSelectedIssues("read")}}},[t._v(" Read selected issues ")]),s("button",{staticClass:"btn btn-dark btn-sm",on:{click:function(e){return t.changeStateOfSelectedIssues("clear")}}},[t._v(" Unread selected issues ")])])])])},i=[],n=(s("4de4"),s("7db0"),s("4160"),s("caad"),s("a15b"),s("d81d"),s("4fad"),s("2532"),s("159b"),s("96cf"),s("1da1")),u=s("3835"),r=s("5530"),o=s("c5329"),c=s("0a65"),l=s("bc3a"),d=s.n(l),h=s("2f62"),f={data:function(){return{readStatuses:["All","Read","Not read"],selectedReadStatus:"Not read",totalIssues:0,visibleIssues:0,issueName:"",issueVolume:"",issuesData:void 0,allVisibleIssuesShouldBeSelected:!1}},watch:{isUserLoadInProgress:function(t){t||this.loadIssuePage()}},computed:Object(r["a"])({},Object(h["c"])("user",["user","isUserLoadInProgress"]),{issues:function(){var t=this;if(!this.issuesData)return{};var e=this.selectedReadStatus;return this.issuesData.filter((function(s){return s.selected=!1,!s.isIgnored&&(!(!("Read"!==e||s.status&&"clear"!==s.status)||"Not read"===e&&s.status&&"wait"!==s.status&&"clear"!==s.status)&&(s.selected=t.allVisibleIssuesShouldBeSelected,!0))}))}}),methods:Object(r["a"])({},Object(h["b"])("issue",["changeIgnoreStateOfIssue","changeFavouriteStateOfIssue","changeStatusOfIssues"]),{changeStateOfSelectedIssues:function(t){var e=this.issues.filter((function(t){return t.selected})).map((function(t){return t._id}));this.changeStatus(e,t)},changeStatus:function(t,e){var s=this,a=this.issues;a.filter((function(e){return t.includes(e._id)})).forEach((function(t){return t.status="wait"})),this.changeStatusOfIssues({issuesIds:t,status:e}).then((function(t){for(var e=function(){var t=Object(u["a"])(i[a],2),e=t[0],n=t[1];s.issues.find((function(t){return t._id===e})).status=n.status},a=0,i=Object.entries(t.data);a<i.length;a++)e();s.allVisibleIssuesShouldBeSelected=!1})).catch((function(t){console.error(t),s.$fire({text:"You are not authorized to do such action",type:"error"}),s.loadIssuePage()}))},loadIssuePage:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.issueName=t.$route.query.issueName,t.issueVolume=t.$route.query.issueVolume,d.a.get("getAllVolumeOfIssues",{params:{issueName:t.issueName,issueVolume:t.issueVolume},mcamAuthenticated:!0}).then((function(e){t.issuesData=e.data,t.totalIssues=e.data.length})).catch((function(t){console.error(t)}));case 3:case"end":return e.stop()}}),e)})))()},showIssueDetails:function(t){this.$modal.show(c["a"],{issueId:t,markIssueAsFn:this.markIssueAs},{height:"auto",scrollable:!0,width:1e3})},changeFavouriteState:function(t,e,s){var a=this;this.changeFavouriteStateOfIssue({issueId:e,state:s}).then((function(){a.issues[t].isFavourite=s})).catch((function(t){console.error(t)}))},addIssueToIgnored:function(t,e){var s=this;this.changeIgnoreStateOfIssue({issueId:e,state:!0}).then((function(){s.totalIssues-=1,s.issues[t].isIgnored=!0})).catch((function(t){console.error(t)}))},markIssueAs:function(t,e,s){var a=this.issuesData.find((function(e){return e._id===t}));"favourite"===e?a.isFavourite=s:"ignore"===e?(this.totalIssues+=s?-1:1,a.isIgnored=s):"character"!==e&&(a.status=e)}}),filters:{timestampToDate:function(t){var e=new Date(t),s=e.getFullYear(),a=""+(e.getMonth()+1);return a.length<2&&(a="0"+a),[s,a].join("-")}},beforeRouteUpdate:function(t,e,s){s(),this.loadIssuePage()},mounted:function(){this.loadIssuePage()},components:{IconLoading:o["a"]}},v=f,b=s("2877"),m=Object(b["a"])(v,a,i,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d0b5d26.dbae7b0d.js.map