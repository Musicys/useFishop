(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/walletlist/walletlist"],{"0cd1":function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){}));var n=function(){var e=this.$createElement;this._self._c},s=[]},"488d":function(e,t,a){},"51cd":function(e,t,a){"use strict";a.r(t);var n=a("0cd1"),s=a("af0e");for(var u in s)["default"].indexOf(u)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(u);a("a0f5");var c=a("f0c5"),i=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,"426e0f5d",null,!1,n["a"],void 0);t["default"]=i.exports},6337:function(e,t,a){"use strict";(function(e,t){var n=a("4ea4");a("f47a");n(a("66fd"));var s=n(a("51cd"));e.__webpack_require_UNI_MP_PLUGIN__=a,t(s.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},7500:function(e,t,a){"use strict";(function(e){var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(a("e7c9")),u={data:function(){return{data:[],usedata:[]}},methods:{setdata:function(){var t=this;s.default.request({url:"https://bjcore01.vanshin.fun/fish/user/record_list",header:{sessionid:JSON.parse(e.getStorageSync("user")).sessionid}}).then((function(e){t.data=e.data,t.setusedata()}))},setusedata:function(){this.usedata=this.data.filter((function(e){return"700000"==e.busicd||"700001"==e.busicd||"700003"==e.busicd||"700004"==e.busicd||"100102"==e.busicd||"100103"==e.busicd})),this.usedata.map((function(e){switch(e.busicd){case"700000":e.name="微信充值";break;case"700001":e.name="购买商品";break;case"700003":e.name="商品退款";break;case"700004":e.name="商品续费";break;case"100102":e.name="后台充值";break;case"100103":e.name="后台消费";break}})),console.log(this.usedata)}},mounted:function(){this.setdata(),console.log(JSON.parse(e.getStorageSync("user")).sessionid)}};t.default=u}).call(this,a("bc2e")["default"])},a0f5:function(e,t,a){"use strict";var n=a("488d"),s=a.n(n);s.a},af0e:function(e,t,a){"use strict";a.r(t);var n=a("7500"),s=a.n(n);for(var u in n)["default"].indexOf(u)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(u);t["default"]=s.a}},[["6337","common/runtime","common/vendor"]]]);