(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a41db86"],{1681:function(t,e,i){},a844:function(t,e,i){"use strict";var a=i("5530"),n=(i("a9e3"),i("1681"),i("8654")),o=i("58df"),r=Object(o["a"])(n["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(a["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},n["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=n["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){n["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},b016:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"mt-8 pa-5",attrs:{light:""}},[i("v-form",[i("v-container",["add"===t.type?i("div",[i("h1",{staticClass:"h1"},[t._v("Open Support Ticket")]),i("p",{staticClass:"caption"},[t._v(" Please fill in the form below to open a new ticket. ")])]):"update"===t.type?i("div",[i("h1",{staticClass:"h1"},[t._v("Update Your Ticket")]),i("p",{staticClass:"caption"},[t._v(" Please fill in the form below to update your ticket. ")])]):i("div",[i("h1",{staticClass:"h1"},[t._v("Your Ticket")])]),i("v-row",{staticClass:"mt-4 pa-2"},[i("v-col",{attrs:{cols:"12"}},[i("v-text-field",{attrs:{label:"Subject",name:"subject",rules:t.subjectRules,disabled:t.ifView,required:""},model:{value:t.subject,callback:function(e){t.subject=e},expression:"subject"}})],1),i("v-col",{attrs:{cols:"12"}},[i("v-select",{attrs:{items:t.priorities,label:"Priority",name:"priority",rules:t.priorityRules,disabled:t.ifView,required:""},model:{value:t.priority,callback:function(e){t.priority=e},expression:"priority"}})],1),i("v-col",{attrs:{cols:"12"}},[i("v-text-field",{attrs:{name:"contactNo",label:"Contact Number",disabled:t.ifView,rules:t.contactNumberRules},model:{value:t.contactNumber,callback:function(e){t.contactNumber=e},expression:"contactNumber"}})],1),i("v-col",{attrs:{cols:"12"}},[i("v-textarea",{attrs:{name:"description",label:"Description",disabled:t.ifView,rules:t.descriptionRules},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),i("v-col",{attrs:{cols:"12"}},[t.ifView?t._e():i("v-btn",{attrs:{block:"",color:"primary",dark:""}},[t._v("Submit")])],1)],1)],1)],1)],1)},n=[],o={props:["type"],data:function(){return{priorities:["","P1 -- Critical","P2 -- High","P3 -- Medium"],subject:null,priority:null,contactNumber:null,description:null,formValidated:"false",subjectRules:[function(t){return!!t||"Subject is required"},function(t){return t&&t.length>=10||"Subject must be more than 10 characters"}],priorityRules:[function(t){return!!t||"Please select a priority level."}],contactNumberRules:[function(t){return!t||(10!==t.length?"Invalid length":!!/^[6-9]\d{9}$/.test(t)||"Invalid mobile number")}],descriptionRules:[function(t){return!!t||"Please write a valid description."},function(t){return t&&t.length>=50||"Description must be more than 50 characters"}]}},computed:{isFormValid:function(){},ifView:function(){return!this.type}}},r=o,s=i("2877"),l=i("6544"),c=i.n(l),u=i("8336"),p=i("b0af"),d=i("62ad"),h=i("a523"),f=i("4bd4"),b=i("0fd9"),m=i("b974"),v=i("8654"),w=i("a844"),g=Object(s["a"])(r,a,n,!1,null,null,null);e["default"]=g.exports;c()(g,{VBtn:u["a"],VCard:p["a"],VCol:d["a"],VContainer:h["a"],VForm:f["a"],VRow:b["a"],VSelect:m["a"],VTextField:v["a"],VTextarea:w["a"]})}}]);
//# sourceMappingURL=chunk-0a41db86.5c4899c4.js.map