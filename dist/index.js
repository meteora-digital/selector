var t={9306:(t,e,r)=>{var n=r(4901),i=r(6823),s=TypeError;t.exports=function(t){if(n(t))return t;throw new s(i(t)+" is not a function")}},3506:(t,e,r)=>{var n=r(3925),i=String,s=TypeError;t.exports=function(t){if(n(t))return t;throw new s("Can't set "+i(t)+" as a prototype")}},6469:(t,e,r)=>{var n=r(8227),i=r(2360),s=r(4913).f,o=n("unscopables"),a=Array.prototype;void 0===a[o]&&s(a,o,{configurable:!0,value:i(null)}),t.exports=function(t){a[o][t]=!0}},8551:(t,e,r)=>{var n=r(34),i=String,s=TypeError;t.exports=function(t){if(n(t))return t;throw new s(i(t)+" is not an object")}},9617:(t,e,r)=>{var n=r(5397),i=r(5610),s=r(6198),o=function(t){return function(e,r,o){var a=n(e),c=s(a);if(0===c)return!t&&-1;var l,u=i(o,c);if(t&&r!=r){for(;c>u;)if((l=a[u++])!=l)return!0}else for(;c>u;u++)if((t||u in a)&&a[u]===r)return t||u||0;return!t&&-1}};t.exports={includes:o(!0),indexOf:o(!1)}},4576:(t,e,r)=>{var n=r(9504),i=n({}.toString),s=n("".slice);t.exports=function(t){return s(i(t),8,-1)}},7740:(t,e,r)=>{var n=r(9297),i=r(5031),s=r(7347),o=r(4913);t.exports=function(t,e,r){for(var a=i(e),c=o.f,l=s.f,u=0;u<a.length;u++){var p=a[u];n(t,p)||r&&n(r,p)||c(t,p,l(e,p))}}},2211:(t,e,r)=>{var n=r(9039);t.exports=!n((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},2529:t=>{t.exports=function(t,e){return{value:t,done:e}}},6699:(t,e,r)=>{var n=r(3724),i=r(4913),s=r(6980);t.exports=n?function(t,e,r){return i.f(t,e,s(1,r))}:function(t,e,r){return t[e]=r,t}},6980:t=>{t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},6840:(t,e,r)=>{var n=r(4901),i=r(4913),s=r(283),o=r(9433);t.exports=function(t,e,r,a){a||(a={});var c=a.enumerable,l=void 0!==a.name?a.name:e;if(n(r)&&s(r,l,a),a.global)c?t[e]=r:o(e,r);else{try{a.unsafe?t[e]&&(c=!0):delete t[e]}catch(t){}c?t[e]=r:i.f(t,e,{value:r,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return t}},9433:(t,e,r)=>{var n=r(4475),i=Object.defineProperty;t.exports=function(t,e){try{i(n,t,{value:e,configurable:!0,writable:!0})}catch(r){n[t]=e}return e}},3724:(t,e,r)=>{var n=r(9039);t.exports=!n((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4055:(t,e,r)=>{var n=r(4475),i=r(34),s=n.document,o=i(s)&&i(s.createElement);t.exports=function(t){return o?s.createElement(t):{}}},7400:t=>{t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},9296:(t,e,r)=>{var n=r(4055)("span").classList,i=n&&n.constructor&&n.constructor.prototype;t.exports=i===Object.prototype?void 0:i},9392:t=>{t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7388:(t,e,r)=>{var n,i,s=r(4475),o=r(9392),a=s.process,c=s.Deno,l=a&&a.versions||c&&c.version,u=l&&l.v8;u&&(i=(n=u.split("."))[0]>0&&n[0]<4?1:+(n[0]+n[1])),!i&&o&&(!(n=o.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=o.match(/Chrome\/(\d+)/))&&(i=+n[1]),t.exports=i},8727:t=>{t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},6518:(t,e,r)=>{var n=r(4475),i=r(7347).f,s=r(6699),o=r(6840),a=r(9433),c=r(7740),l=r(2796);t.exports=function(t,e){var r,u,p,h,f,d=t.target,v=t.global,m=t.stat;if(r=v?n:m?n[d]||a(d,{}):n[d]&&n[d].prototype)for(u in e){if(h=e[u],p=t.dontCallGetSet?(f=i(r,u))&&f.value:r[u],!l(v?u:d+(m?".":"#")+u,t.forced)&&void 0!==p){if(typeof h==typeof p)continue;c(h,p)}(t.sham||p&&p.sham)&&s(h,"sham",!0),o(r,u,h,t)}}},9039:t=>{t.exports=function(t){try{return!!t()}catch(t){return!0}}},616:(t,e,r)=>{var n=r(9039);t.exports=!n((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},9565:(t,e,r)=>{var n=r(616),i=Function.prototype.call;t.exports=n?i.bind(i):function(){return i.apply(i,arguments)}},350:(t,e,r)=>{var n=r(3724),i=r(9297),s=Function.prototype,o=n&&Object.getOwnPropertyDescriptor,a=i(s,"name"),c=a&&"something"===function(){}.name,l=a&&(!n||n&&o(s,"name").configurable);t.exports={EXISTS:a,PROPER:c,CONFIGURABLE:l}},6706:(t,e,r)=>{var n=r(9504),i=r(9306);t.exports=function(t,e,r){try{return n(i(Object.getOwnPropertyDescriptor(t,e)[r]))}catch(t){}}},9504:(t,e,r)=>{var n=r(616),i=Function.prototype,s=i.call,o=n&&i.bind.bind(s,s);t.exports=n?o:function(t){return function(){return s.apply(t,arguments)}}},7751:(t,e,r)=>{var n=r(4475),i=r(4901);t.exports=function(t,e){return arguments.length<2?(r=n[t],i(r)?r:void 0):n[t]&&n[t][e];var r}},5966:(t,e,r)=>{var n=r(9306),i=r(4117);t.exports=function(t,e){var r=t[e];return i(r)?void 0:n(r)}},4475:function(t,e,r){var n=function(t){return t&&t.Math===Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof r.g&&r.g)||n("object"==typeof this&&this)||function(){return this}()||Function("return this")()},9297:(t,e,r)=>{var n=r(9504),i=r(8981),s=n({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,e){return s(i(t),e)}},421:t=>{t.exports={}},397:(t,e,r)=>{var n=r(7751);t.exports=n("document","documentElement")},5917:(t,e,r)=>{var n=r(3724),i=r(9039),s=r(4055);t.exports=!n&&!i((function(){return 7!==Object.defineProperty(s("div"),"a",{get:function(){return 7}}).a}))},7055:(t,e,r)=>{var n=r(9504),i=r(9039),s=r(4576),o=Object,a=n("".split);t.exports=i((function(){return!o("z").propertyIsEnumerable(0)}))?function(t){return"String"===s(t)?a(t,""):o(t)}:o},3706:(t,e,r)=>{var n=r(9504),i=r(4901),s=r(7629),o=n(Function.toString);i(s.inspectSource)||(s.inspectSource=function(t){return o(t)}),t.exports=s.inspectSource},1181:(t,e,r)=>{var n,i,s,o=r(8622),a=r(4475),c=r(34),l=r(6699),u=r(9297),p=r(7629),h=r(6119),f=r(421),d="Object already initialized",v=a.TypeError,m=a.WeakMap;if(o||p.state){var g=p.state||(p.state=new m);g.get=g.get,g.has=g.has,g.set=g.set,n=function(t,e){if(g.has(t))throw new v(d);return e.facade=t,g.set(t,e),e},i=function(t){return g.get(t)||{}},s=function(t){return g.has(t)}}else{var y=h("state");f[y]=!0,n=function(t,e){if(u(t,y))throw new v(d);return e.facade=t,l(t,y,e),e},i=function(t){return u(t,y)?t[y]:{}},s=function(t){return u(t,y)}}t.exports={set:n,get:i,has:s,enforce:function(t){return s(t)?i(t):n(t,{})},getterFor:function(t){return function(e){var r;if(!c(e)||(r=i(e)).type!==t)throw new v("Incompatible receiver, "+t+" required");return r}}}},4901:t=>{var e="object"==typeof document&&document.all;t.exports=void 0===e&&void 0!==e?function(t){return"function"==typeof t||t===e}:function(t){return"function"==typeof t}},2796:(t,e,r)=>{var n=r(9039),i=r(4901),s=/#|\.prototype\./,o=function(t,e){var r=c[a(t)];return r===u||r!==l&&(i(e)?n(e):!!e)},a=o.normalize=function(t){return String(t).replace(s,".").toLowerCase()},c=o.data={},l=o.NATIVE="N",u=o.POLYFILL="P";t.exports=o},4117:t=>{t.exports=function(t){return null==t}},34:(t,e,r)=>{var n=r(4901);t.exports=function(t){return"object"==typeof t?null!==t:n(t)}},3925:(t,e,r)=>{var n=r(34);t.exports=function(t){return n(t)||null===t}},6395:t=>{t.exports=!1},757:(t,e,r)=>{var n=r(7751),i=r(4901),s=r(1625),o=r(7040),a=Object;t.exports=o?function(t){return"symbol"==typeof t}:function(t){var e=n("Symbol");return i(e)&&s(e.prototype,a(t))}},3994:(t,e,r)=>{var n=r(7657).IteratorPrototype,i=r(2360),s=r(6980),o=r(687),a=r(6269),c=function(){return this};t.exports=function(t,e,r,l){var u=e+" Iterator";return t.prototype=i(n,{next:s(+!l,r)}),o(t,u,!1,!0),a[u]=c,t}},1088:(t,e,r)=>{var n=r(6518),i=r(9565),s=r(6395),o=r(350),a=r(4901),c=r(3994),l=r(2787),u=r(2967),p=r(687),h=r(6699),f=r(6840),d=r(8227),v=r(6269),m=r(7657),g=o.PROPER,y=o.CONFIGURABLE,b=m.IteratorPrototype,x=m.BUGGY_SAFARI_ITERATORS,O=d("iterator"),w="keys",S="values",E="entries",L=function(){return this};t.exports=function(t,e,r,o,d,m,_){c(r,e,o);var j,T,k,P=function(t){if(t===d&&I)return I;if(!x&&t&&t in A)return A[t];switch(t){case w:case S:case E:return function(){return new r(this,t)}}return function(){return new r(this)}},C=e+" Iterator",M=!1,A=t.prototype,N=A[O]||A["@@iterator"]||d&&A[d],I=!x&&N||P(d),F="Array"===e&&A.entries||N;if(F&&(j=l(F.call(new t)))!==Object.prototype&&j.next&&(s||l(j)===b||(u?u(j,b):a(j[O])||f(j,O,L)),p(j,C,!0,!0),s&&(v[C]=L)),g&&d===S&&N&&N.name!==S&&(!s&&y?h(A,"name",S):(M=!0,I=function(){return i(N,this)})),d)if(T={values:P(S),keys:m?I:P(w),entries:P(E)},_)for(k in T)(x||M||!(k in A))&&f(A,k,T[k]);else n({target:e,proto:!0,forced:x||M},T);return s&&!_||A[O]===I||f(A,O,I,{name:d}),v[e]=I,T}},7657:(t,e,r)=>{var n,i,s,o=r(9039),a=r(4901),c=r(34),l=r(2360),u=r(2787),p=r(6840),h=r(8227),f=r(6395),d=h("iterator"),v=!1;[].keys&&("next"in(s=[].keys())?(i=u(u(s)))!==Object.prototype&&(n=i):v=!0),!c(n)||o((function(){var t={};return n[d].call(t)!==t}))?n={}:f&&(n=l(n)),a(n[d])||p(n,d,(function(){return this})),t.exports={IteratorPrototype:n,BUGGY_SAFARI_ITERATORS:v}},6269:t=>{t.exports={}},6198:(t,e,r)=>{var n=r(8014);t.exports=function(t){return n(t.length)}},283:(t,e,r)=>{var n=r(9504),i=r(9039),s=r(4901),o=r(9297),a=r(3724),c=r(350).CONFIGURABLE,l=r(3706),u=r(1181),p=u.enforce,h=u.get,f=String,d=Object.defineProperty,v=n("".slice),m=n("".replace),g=n([].join),y=a&&!i((function(){return 8!==d((function(){}),"length",{value:8}).length})),b=String(String).split("String"),x=t.exports=function(t,e,r){"Symbol("===v(f(e),0,7)&&(e="["+m(f(e),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),r&&r.getter&&(e="get "+e),r&&r.setter&&(e="set "+e),(!o(t,"name")||c&&t.name!==e)&&(a?d(t,"name",{value:e,configurable:!0}):t.name=e),y&&r&&o(r,"arity")&&t.length!==r.arity&&d(t,"length",{value:r.arity});try{r&&o(r,"constructor")&&r.constructor?a&&d(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(t){}var n=p(t);return o(n,"source")||(n.source=g(b,"string"==typeof e?e:"")),t};Function.prototype.toString=x((function(){return s(this)&&h(this).source||l(this)}),"toString")},741:t=>{var e=Math.ceil,r=Math.floor;t.exports=Math.trunc||function(t){var n=+t;return(n>0?r:e)(n)}},2360:(t,e,r)=>{var n,i=r(8551),s=r(6801),o=r(8727),a=r(421),c=r(397),l=r(4055),u=r(6119),p="prototype",h="script",f=u("IE_PROTO"),d=function(){},v=function(t){return"<"+h+">"+t+"</"+h+">"},m=function(t){t.write(v("")),t.close();var e=t.parentWindow.Object;return t=null,e},g=function(){try{n=new ActiveXObject("htmlfile")}catch(t){}var t,e,r;g="undefined"!=typeof document?document.domain&&n?m(n):(e=l("iframe"),r="java"+h+":",e.style.display="none",c.appendChild(e),e.src=String(r),(t=e.contentWindow.document).open(),t.write(v("document.F=Object")),t.close(),t.F):m(n);for(var i=o.length;i--;)delete g[p][o[i]];return g()};a[f]=!0,t.exports=Object.create||function(t,e){var r;return null!==t?(d[p]=i(t),r=new d,d[p]=null,r[f]=t):r=g(),void 0===e?r:s.f(r,e)}},6801:(t,e,r)=>{var n=r(3724),i=r(8686),s=r(4913),o=r(8551),a=r(5397),c=r(1072);e.f=n&&!i?Object.defineProperties:function(t,e){o(t);for(var r,n=a(e),i=c(e),l=i.length,u=0;l>u;)s.f(t,r=i[u++],n[r]);return t}},4913:(t,e,r)=>{var n=r(3724),i=r(5917),s=r(8686),o=r(8551),a=r(6969),c=TypeError,l=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p="enumerable",h="configurable",f="writable";e.f=n?s?function(t,e,r){if(o(t),e=a(e),o(r),"function"==typeof t&&"prototype"===e&&"value"in r&&f in r&&!r[f]){var n=u(t,e);n&&n[f]&&(t[e]=r.value,r={configurable:h in r?r[h]:n[h],enumerable:p in r?r[p]:n[p],writable:!1})}return l(t,e,r)}:l:function(t,e,r){if(o(t),e=a(e),o(r),i)try{return l(t,e,r)}catch(t){}if("get"in r||"set"in r)throw new c("Accessors not supported");return"value"in r&&(t[e]=r.value),t}},7347:(t,e,r)=>{var n=r(3724),i=r(9565),s=r(8773),o=r(6980),a=r(5397),c=r(6969),l=r(9297),u=r(5917),p=Object.getOwnPropertyDescriptor;e.f=n?p:function(t,e){if(t=a(t),e=c(e),u)try{return p(t,e)}catch(t){}if(l(t,e))return o(!i(s.f,t,e),t[e])}},8480:(t,e,r)=>{var n=r(1828),i=r(8727).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,i)}},3717:(t,e)=>{e.f=Object.getOwnPropertySymbols},2787:(t,e,r)=>{var n=r(9297),i=r(4901),s=r(8981),o=r(6119),a=r(2211),c=o("IE_PROTO"),l=Object,u=l.prototype;t.exports=a?l.getPrototypeOf:function(t){var e=s(t);if(n(e,c))return e[c];var r=e.constructor;return i(r)&&e instanceof r?r.prototype:e instanceof l?u:null}},1625:(t,e,r)=>{var n=r(9504);t.exports=n({}.isPrototypeOf)},1828:(t,e,r)=>{var n=r(9504),i=r(9297),s=r(5397),o=r(9617).indexOf,a=r(421),c=n([].push);t.exports=function(t,e){var r,n=s(t),l=0,u=[];for(r in n)!i(a,r)&&i(n,r)&&c(u,r);for(;e.length>l;)i(n,r=e[l++])&&(~o(u,r)||c(u,r));return u}},1072:(t,e,r)=>{var n=r(1828),i=r(8727);t.exports=Object.keys||function(t){return n(t,i)}},8773:(t,e)=>{var r={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,i=n&&!r.call({1:2},1);e.f=i?function(t){var e=n(this,t);return!!e&&e.enumerable}:r},2967:(t,e,r)=>{var n=r(6706),i=r(8551),s=r(3506);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,r={};try{(t=n(Object.prototype,"__proto__","set"))(r,[]),e=r instanceof Array}catch(t){}return function(r,n){return i(r),s(n),e?t(r,n):r.__proto__=n,r}}():void 0)},4270:(t,e,r)=>{var n=r(9565),i=r(4901),s=r(34),o=TypeError;t.exports=function(t,e){var r,a;if("string"===e&&i(r=t.toString)&&!s(a=n(r,t)))return a;if(i(r=t.valueOf)&&!s(a=n(r,t)))return a;if("string"!==e&&i(r=t.toString)&&!s(a=n(r,t)))return a;throw new o("Can't convert object to primitive value")}},5031:(t,e,r)=>{var n=r(7751),i=r(9504),s=r(8480),o=r(3717),a=r(8551),c=i([].concat);t.exports=n("Reflect","ownKeys")||function(t){var e=s.f(a(t)),r=o.f;return r?c(e,r(t)):e}},7750:(t,e,r)=>{var n=r(4117),i=TypeError;t.exports=function(t){if(n(t))throw new i("Can't call method on "+t);return t}},687:(t,e,r)=>{var n=r(4913).f,i=r(9297),s=r(8227)("toStringTag");t.exports=function(t,e,r){t&&!r&&(t=t.prototype),t&&!i(t,s)&&n(t,s,{configurable:!0,value:e})}},6119:(t,e,r)=>{var n=r(5745),i=r(3392),s=n("keys");t.exports=function(t){return s[t]||(s[t]=i(t))}},7629:(t,e,r)=>{var n=r(6395),i=r(4475),s=r(9433),o="__core-js_shared__",a=t.exports=i[o]||s(o,{});(a.versions||(a.versions=[])).push({version:"3.36.0",mode:n?"pure":"global",copyright:"© 2014-2024 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE",source:"https://github.com/zloirock/core-js"})},5745:(t,e,r)=>{var n=r(7629);t.exports=function(t,e){return n[t]||(n[t]=e||{})}},4495:(t,e,r)=>{var n=r(7388),i=r(9039),s=r(4475).String;t.exports=!!Object.getOwnPropertySymbols&&!i((function(){var t=Symbol("symbol detection");return!s(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&n&&n<41}))},5610:(t,e,r)=>{var n=r(1291),i=Math.max,s=Math.min;t.exports=function(t,e){var r=n(t);return r<0?i(r+e,0):s(r,e)}},5397:(t,e,r)=>{var n=r(7055),i=r(7750);t.exports=function(t){return n(i(t))}},1291:(t,e,r)=>{var n=r(741);t.exports=function(t){var e=+t;return e!=e||0===e?0:n(e)}},8014:(t,e,r)=>{var n=r(1291),i=Math.min;t.exports=function(t){var e=n(t);return e>0?i(e,9007199254740991):0}},8981:(t,e,r)=>{var n=r(7750),i=Object;t.exports=function(t){return i(n(t))}},2777:(t,e,r)=>{var n=r(9565),i=r(34),s=r(757),o=r(5966),a=r(4270),c=r(8227),l=TypeError,u=c("toPrimitive");t.exports=function(t,e){if(!i(t)||s(t))return t;var r,c=o(t,u);if(c){if(void 0===e&&(e="default"),r=n(c,t,e),!i(r)||s(r))return r;throw new l("Can't convert object to primitive value")}return void 0===e&&(e="number"),a(t,e)}},6969:(t,e,r)=>{var n=r(2777),i=r(757);t.exports=function(t){var e=n(t,"string");return i(e)?e:e+""}},6823:t=>{var e=String;t.exports=function(t){try{return e(t)}catch(t){return"Object"}}},3392:(t,e,r)=>{var n=r(9504),i=0,s=Math.random(),o=n(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+o(++i+s,36)}},7040:(t,e,r)=>{var n=r(4495);t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},8686:(t,e,r)=>{var n=r(3724),i=r(9039);t.exports=n&&i((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},8622:(t,e,r)=>{var n=r(4475),i=r(4901),s=n.WeakMap;t.exports=i(s)&&/native code/.test(String(s))},8227:(t,e,r)=>{var n=r(4475),i=r(5745),s=r(9297),o=r(3392),a=r(4495),c=r(7040),l=n.Symbol,u=i("wks"),p=c?l.for||l:l&&l.withoutSetter||o;t.exports=function(t){return s(u,t)||(u[t]=a&&s(l,t)?l[t]:p("Symbol."+t)),u[t]}},3792:(t,e,r)=>{var n=r(5397),i=r(6469),s=r(6269),o=r(1181),a=r(4913).f,c=r(1088),l=r(2529),u=r(6395),p=r(3724),h="Array Iterator",f=o.set,d=o.getterFor(h);t.exports=c(Array,"Array",(function(t,e){f(this,{type:h,target:n(t),index:0,kind:e})}),(function(){var t=d(this),e=t.target,r=t.index++;if(!e||r>=e.length)return t.target=void 0,l(void 0,!0);switch(t.kind){case"keys":return l(r,!1);case"values":return l(e[r],!1)}return l([r,e[r]],!1)}),"values");var v=s.Arguments=s.Array;if(i("keys"),i("values"),i("entries"),!u&&p&&"values"!==v.name)try{a(v,"name",{value:"values"})}catch(t){}},2953:(t,e,r)=>{var n=r(4475),i=r(7400),s=r(9296),o=r(3792),a=r(6699),c=r(687),l=r(8227)("iterator"),u=o.values,p=function(t,e){if(t){if(t[l]!==u)try{a(t,l,u)}catch(e){t[l]=u}if(c(t,e,!0),i[e])for(var r in o)if(t[r]!==o[r])try{a(t,r,o[r])}catch(e){t[r]=o[r]}}};for(var h in i)p(n[h]&&n[h].prototype,h);p(s,"DOMTokenList")}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var s=e[n]={exports:{}};return t[n].call(s.exports,s,s.exports,r),s.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};(()=>{r.d(n,{A:()=>t}),r(2953);class t{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.events={},this.selection=[],this.active=!1,this.disable=null,this.form=!!t.form&&t.form,this.default={select:t,options:t.children},this.id="SimpleSelector_"+this.default.select.id||0,this.settings={search:!1,autoClose:!0,class:"selector",originalNames:!1,taglist:!1,placeholder:this.default.select.getAttribute("placeholder")||"Select"};for(let t in this.settings)this.settings.hasOwnProperty(t)&&e.hasOwnProperty(t)&&(this.settings[t]=e[t]);this.select=document.createElement("div"),this.optgroups={},this.options=[],this.template={header:document.createElement("div"),placeholder:document.createElement("span"),list:document.createElement("div"),options:[],search:document.createElement("input")},this.select.className=this.settings.class,this.select.id=this.id;for(let t in this.template)this.template.hasOwnProperty(t)&&(this.template[t].className="".concat(this.settings.class,"__").concat(t));this.template.header.appendChild(this.template.placeholder),this.select.appendChild(this.template.header),this.select.appendChild(this.template.list),this.settings.search&&(this.template.search.type="text",this.template.search.placeholder="Search",this.template.list.appendChild(this.template.search),this.template.search.addEventListener("input",(()=>this.filter(this.template.search.value)))),this.default.select.addEventListener("change",(()=>this.update())),this.form&&this.form.addEventListener("reset",(()=>{setTimeout((()=>{this.update()}),100)})),this.template.header.setAttribute("tabindex","0"),this.settings.autoClose&&window.addEventListener("click",(t=>{let e=t.target.parentNode;if(t.target!==this.select){for(;e&&e!==this.select;)e=e.parentNode;e!==this.select&&this.close()}})),this.template.header.addEventListener("click",(t=>{"BUTTON"!=t.target.tagName&&(t.preventDefault(),this.active?this.close():this.open())})),this.template.header.addEventListener("keypress",(t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.active?this.close():this.open())})),this.default.select.parentNode.insertBefore(this.select,this.default.select),this.reinit(),this.update(),new MutationObserver((()=>{this.reinit(),this.update()})).observe(this.default.select,{childList:!0,subtree:!0,attributes:!0})}reinit(){try{this.changeEvent=new Event("change")}catch(t){let e=document.createEvent("CustomEvent");e.initCustomEvent("change",!1,!1,void 0),this.changeEvent=e}if(this.default.optgroups=!!this.default.select.querySelector("optgroup")&&this.default.select.querySelectorAll("optgroup"),this.default.optgroups)for(let t=0;t<this.default.optgroups.length;t++){const e=this.default.optgroups[t],r=e.getAttribute("label");this.optgroups[t]={label:r,options:e.children||[]}}else this.optgroups[0]={label:!1,options:this.default.select.children||[]};[...this.template.list.children].forEach((t=>{t!==this.template.search&&this.template.list.removeChild(t)})),this.options=[],this.template.options=[];for(let t=0;t<Object.keys(this.optgroups).length;t++){const e=this.optgroups[t];if(e.label){const t=document.createElement("span");t.className="".concat(this.settings.class,"__group"),t.innerHTML=e.label,this.template.list.appendChild(t)}for(let t=0;t<e.options.length;t++){const r={},n=e.options[t],i=document.createElement("input"),s=document.createElement("label"),o=[...this.default.select.options].indexOf(n);i.type="select-one"==this.default.select.type?"radio":"checkbox",i.value=n.value,i.name=this.settings.originalNames?this.default.select.name:this.id,i.id="".concat(this.id,"_").concat(o),s.innerHTML=n.innerHTML,s.className="".concat(this.settings.class,"__option"),s.htmlFor=i.id;for(let e=0;e<n.attributes.length;e++){const e=n.attributes[t];e&&e.nodeName.indexOf("data-")>-1&&i.setAttribute(e.nodeName,e.nodeValue)}i.disabled=!0,r.default=n,r.input=i,r.label=s,r.disabled=n.disabled,this.options.push(r),r.field=document.createElement("div"),r.field.className="".concat(this.settings.class,"__item"),r.input.addEventListener("change",(t=>{t.preventDefault(),"select-multiple"==this.default.select.type?(""==r.default.value?this.options.filter((t=>1==t.default.selected)).forEach((t=>t.default.selected=!1)):this.options.filter((t=>""==t.default.value)).forEach((t=>t.default.selected=!1)),r.input.checked?r.default.selected=!0:r.default.selected=!1):this.default.select.selectedIndex=o,this.default.select.dispatchEvent(this.changeEvent),this.change()})),"select-one"==this.default.select.type&&this.settings.autoClose&&(r.input.addEventListener("keypress",(t=>{t.preventDefault(),"Enter"!=t.key&&"Escape"!=t.key||this.close()})),r.label.addEventListener("click",(()=>{this.close()}))),this.template.options.push(r.input),r.field.appendChild(r.input),r.field.appendChild(r.label),this.template.list.appendChild(r.field)}}this.callback("reinit",this)}update(){this.selection=[],this.select.classList.toggle("".concat(this.settings.class,"--disabled"),this.default.select.disabled);for(let t=0;t<this.options.length;t++){const e=this.options[t];e.default.selected?(e.input.checked=!0,""!=e.default.value&&this.selection.push(e)):e.input.checked=!1,e.disabled=e.default.disabled}if(this.settings.taglist)this.template.placeholder.innerHTML=this.selection.length?"":this.settings.placeholder,this.template.placeholder.className="".concat(this.settings.class,"__placeholder"),this.selection.forEach((t=>{const e=document.createElement("div"),r=document.createElement("div"),n=document.createElement("button");e.className="".concat(this.settings.class,"__tag"),r.className="".concat(this.settings.class,"__tag-text"),n.className="".concat(this.settings.class,"__tag-remove"),r.innerHTML=t.label.innerHTML,n.innerHTML="×",e.appendChild(r),e.appendChild(n),n.addEventListener("click",(e=>{e.preventDefault(),t.default.selected=!1,this.default.select.dispatchEvent(this.changeEvent)})),this.template.placeholder.appendChild(e)}));else switch(this.selection.length){case 0:this.template.placeholder.innerHTML=this.settings.placeholder,this.template.placeholder.className="".concat(this.settings.class,"__placeholder");break;case 1:this.template.placeholder.innerHTML=this.selection[0].label.innerHTML,this.template.placeholder.classList.add("".concat(this.settings.class,"__placeholder--single")),this.template.placeholder.classList.remove("".concat(this.settings.class,"__placeholder--multiple"));break;default:this.template.placeholder.innerHTML="Multiple Selected",this.template.placeholder.classList.remove("".concat(this.settings.class,"__placeholder--single")),this.template.placeholder.classList.add("".concat(this.settings.class,"__placeholder--multiple"))}this.callback("update",this)}change(){this.callback("change",this.selection)}open(){if(this.active)return;if(this.default.select.disabled)return;clearTimeout(this.disable),this.template.list.scrollTop=0,this.select.classList.add("".concat(this.settings.class,"--active")),this.active=!0,this.options.forEach((t=>{t.input.disabled=t.disabled,t.field.classList.toggle("".concat(this.settings.class,"__item--disabled"),t.disabled)}));const t=this.options.filter((t=>0==t.disabled));t.length&&t[0].input.focus(),this.callback("open",this)}close(){this.active&&(this.select.classList.remove("".concat(this.settings.class,"--active")),this.settings.search&&(this.template.search.value="",this.filter()),this.active=!1,this.disable=setTimeout((()=>{this.options.forEach((t=>t.input.disabled=!0))}),100),this.callback("close",this))}filter(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.options.forEach((e=>{e.label.innerText.toLowerCase().indexOf(t.toLowerCase())>-1||0===t.length?(e.field.classList.remove("".concat(this.settings.class,"__item--hidden")),e.input.disabled=!1):(e.field.classList.add("".concat(this.settings.class,"__item--hidden")),e.input.disabled=!0)})),this.callback("filter",this)}callback(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.events[t]&&this.events[t].forEach((t=>t(e)))}on(t,e){t&&"on"!=t&&"callback"!=t&&this[t]&&e&&"function"==typeof e&&(null==this.events[t]&&(this.events[t]=[]),this.events[t].push(e))}}})();var i=n.A;export{i as default};