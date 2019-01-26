/* luminateExtend.js | Version: 1.8.2 (26-JAN-2019) */
!function(m){var g=function(e){return e&&m.inArray(e,["es_US","en_CA","fr_CA","en_GB","en_AU"])<0&&(e="en_US"),e},a=function(e){return e&&(e=g(e),luminateExtend.sessionVars.set("locale",e)),e},s=function(e,t){return(e?luminateExtend.global.path.secure+"S":luminateExtend.global.path.nonsecure)+"PageServer"+(luminateExtend.global.routingId&&""!==luminateExtend.global.routingId?";"+luminateExtend.global.routingId:"")+"?pagename=luminateExtend_server&pgwrap=n"+(t?"&"+t:"")},u=function(e,l){if(e.responseFilter&&e.responseFilter.array&&e.responseFilter.filter&&luminateExtend.utils.stringToObj(e.responseFilter.array,l)){var t,a,n=e.responseFilter.filter.split("==")[0].split("!=")[0].replace(/^\s+|\s+$/g,"");if(-1!==e.responseFilter.filter.indexOf("!=")?(t="nequal",a=e.responseFilter.filter.split("!=")[1]):-1!==e.responseFilter.filter.indexOf("==")&&(t="equal",a=e.responseFilter.filter.split("==")[1]),t&&a){a=a.replace(/^\s+|\s+$/g,"");var o=[],i=!1;if(m.each(luminateExtend.utils.ensureArray(luminateExtend.utils.stringToObj(e.responseFilter.array,l)),function(){"nequal"===t&&this[n]===a||"equal"===t&&this[n]!==a?i=!0:o.push(this)}),i){var r=e.responseFilter.array.split(".");m.each(l,function(i,e){i===r[0]&&m.each(e,function(n,e){n===r[1]&&(2===r.length?l[i][n]=o:m.each(e,function(a,e){a===r[2]&&(3===r.length?l[i][n][a]=o:m.each(e,function(e,t){e===r[3]&&4===r.length&&(l[i][n][a][e]=o)}))}))})})}}}var s=m.noop;e.callback&&("function"==typeof e.callback?s=e.callback:e.callback.error&&l.errorResponse?s=e.callback.error:e.callback.success&&!l.errorResponse&&(s=e.callback.success));var u=-1!==e.data.indexOf("&method=login")&&-1===e.data.indexOf("&method=loginTest"),d=-1!==e.data.indexOf("&method=logout");if(u||d){var c={callback:function(){s(l)},useCache:!1,useHTTPS:e.useHTTPS};u&&l.loginResponse&&l.loginResponse.nonce&&(c.nonce="NONCE_TOKEN="+l.loginResponse.nonce),luminateExtend.api.getAuth(c)}else s(l)};window.luminateExtend=function(e){luminateExtend.init(e||{})},luminateExtend.library={version:"1.8.2"},luminateExtend.global={update:function(e,t){e&&(e.length?t&&("locale"===e&&(t=a(t)),luminateExtend.global[e]=t):(e.locale&&(e.locale=a(e.locale)),luminateExtend.global=m.extend(luminateExtend.global,e)))}},luminateExtend.init=function(e){var t=m.extend({apiCommon:{},auth:{type:"auth"},path:{}},e||{});(t.locale&&(t.locale=g(t.locale)),t.supportsCORS=!1,window.XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest&&(t.supportsCORS=!0));return luminateExtend.global=m.extend(luminateExtend.global,t),luminateExtend},luminateExtend.api=function(e){luminateExtend.api.request(e||{})},luminateExtend.api.bind=function(e){return 0<m(e=e||"form.luminateApi").length&&m(e).each(function(){"form"===this.nodeName.toLowerCase()&&m(this).bind("submit",function(e){e.cancelBubble=!0,e.returnValue=!1,e.stopPropagation&&(e.stopPropagation(),e.preventDefault()),m(this).attr("id")||m(this).attr("id","luminateApi-"+(new Date).getTime());var t,a=m(this).attr("action"),n=a.split("?"),i=m(this).data("luminateapi"),l=-1!==n[0].indexOf("/site/")?n[0].split("/site/")[1]:n[0],o=m(this).attr("enctype"),r=1<n.length?n[1]:"",s="#"+m(this).attr("id"),u=!1,d=!1;i&&(i.callback&&(t=luminateExtend.utils.stringToObj(i.callback)),i.requiresAuth&&"true"===i.requiresAuth&&(u=!0),(0===a.indexOf("https:")||"https:"===window.location.protocol&&-1===a.indexOf("http"))&&(d=!0)),luminateExtend.api.request({api:l,callback:t,contentType:o,data:r,form:s,requiresAuth:u,useHTTPS:d})})}),luminateExtend},luminateExtend.api.getAuth=function(e){var t=m.extend({useCache:!0,useHTTPS:!1},e||{});if(luminateExtend.api.getAuthLoad)if(luminateExtend.api.getAuthLoad=!1,t.useCache&&luminateExtend.global.auth.type&&luminateExtend.global.auth.token)luminateExtend.api.getAuthLoad=!0,t.callback&&t.callback();else{var l=function(e){luminateExtend.global.update(e),luminateExtend.api.getAuthLoad=!0,t.callback&&t.callback()};luminateExtend.global.supportsCORS?m.ajax({url:(t.useHTTPS?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"CRConsAPI",data:"luminateExtend="+luminateExtend.library.version+(t.nonce&&""!==t.nonce?"&"+t.nonce:"")+"&api_key="+luminateExtend.global.apiKey+"&method=getLoginUrl&response_format=json&v=1.0",xhrFields:{withCredentials:!0},dataType:"json",success:function(e){var t=e.getLoginUrlResponse,a=t.url,n=t.routing_id,i=t.JSESSIONID;n||-1===a.indexOf("CRConsAPI;jsessionid=")||(n=a.split("CRConsAPI;jsessionid=")[1].split("?")[0]),l({auth:{type:"auth",token:t.token},routingId:n?"jsessionid="+n:"",sessionCookie:i?"JSESSIONID="+i:""})}}):m.ajax({url:s(t.useHTTPS,"action=getAuth&callback=?"),dataType:"jsonp",success:l})}else setTimeout(function(){luminateExtend.api.getAuth(t)},1e3)},luminateExtend.api.getAuthLoad=!0;var r=function(e){var n=m.extend({contentType:"application/x-www-form-urlencoded",data:"",requiresAuth:!1,useHTTPS:null},e||{});if(0<=m.inArray(n.api.toLowerCase(),["addressbook","advocacy","connect","cons","content","datasync","donation","email","group","orgevent","recurring","survey","teamraiser"])&&(n.api="CR"+n.api.charAt(0).toUpperCase()+n.api.slice(1).toLowerCase()+"API",n.api=n.api.replace("Addressbook","AddressBook").replace("Datasync","DataSync").replace("Orgevent","OrgEvent")),luminateExtend.global.path.nonsecure&&luminateExtend.global.path.secure&&luminateExtend.global.apiKey&&n.api){"multipart/form-data"===n.contentType.split(";")[0]?n.contentType="multipart/form-data":n.contentType="application/x-www-form-urlencoded",n.contentType+="; charset=UTF-8",n.data="luminateExtend="+luminateExtend.library.version+(""===n.data?"":"&"+n.data),n.form&&0<m(n.form).length&&(n.data+="&"+m(n.form).eq(0).serialize()),-1===n.data.indexOf("&api_key=")&&(n.data+="&api_key="+luminateExtend.global.apiKey),luminateExtend.global.apiCommon.centerId&&-1===n.data.indexOf("&center_id=")&&(n.data+="&center_id="+luminateExtend.global.apiCommon.centerId),luminateExtend.global.apiCommon.categoryId&&-1===n.data.indexOf("&list_category_id=")&&(n.data+="&list_category_id="+luminateExtend.global.apiCommon.categoryId),-1!==n.data.indexOf("&response_format=xml")?n.data=n.data.replace(/&response_format=xml/g,"&response_format=json"):-1===n.data.indexOf("&response_format=")&&(n.data+="&response_format=json"),luminateExtend.global.apiCommon.source&&-1===n.data.indexOf("&source=")&&(n.data+="&source="+luminateExtend.global.apiCommon.source),luminateExtend.global.apiCommon.subSource&&-1===n.data.indexOf("&sub_source=")&&(n.data+="&sub_source="+luminateExtend.global.apiCommon.subSource),-1===n.data.indexOf("&suppress_response_codes=")&&(n.data+="&suppress_response_codes=true"),luminateExtend.global.locale&&-1===n.data.indexOf("&s_locale=")&&(n.data+="&s_locale="+luminateExtend.global.locale),-1===n.data.indexOf("&v=")&&(n.data+="&v=1.0");var i="http://",t=luminateExtend.global.path.nonsecure.split("http://")[1];"CRDonationAPI"===n.api||"CRTeamraiserAPI"===n.api||"CRConnectAPI"!==n.api&&("https:"===window.location.protocol&&null==n.useHTTPS||1==n.useHTTPS)?n.useHTTPS=!0:n.useHTTPS=!1,n.useHTTPS&&(i="https://",t=luminateExtend.global.path.secure.split("https://")[1]),i+=t+n.api;var a,l=!1,o=!1,r=!1;window.location.protocol===i.split("//")[0]&&document.domain===t.split("/")[0]?o=l=!0:luminateExtend.global.supportsCORS?o=!0:"postMessage"in window&&(r=!0),o?a=function(){luminateExtend.global.routingId&&""!==luminateExtend.global.routingId&&(i+=";"+luminateExtend.global.routingId),n.requiresAuth&&-1===n.data.indexOf("&"+luminateExtend.global.auth.type+"=")&&(n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token),luminateExtend.global.sessionCookie&&""!==luminateExtend.global.sessionCookie&&(n.data+="&"+luminateExtend.global.sessionCookie),n.data+="&ts="+(new Date).getTime(),m.ajax({url:i,data:n.data,xhrFields:{withCredentials:!0},contentType:n.contentType,dataType:"json",type:"POST",success:function(e){u(n,e)}})}:r&&(a=function(){var e=(new Date).getTime(),t="luminateApiPostMessage"+e,a=s(n.useHTTPS,"action=postMessage");luminateExtend.global.routingId&&""!==luminateExtend.global.routingId&&(i+=";"+luminateExtend.global.routingId),n.requiresAuth&&-1===n.data.indexOf("&"+luminateExtend.global.auth.type+"=")&&(n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token),luminateExtend.global.sessionCookie&&""!==luminateExtend.global.sessionCookie&&(n.data+="&"+luminateExtend.global.sessionCookie),n.data+="&ts="+e,luminateExtend.api.request.postMessageEventHandler||(luminateExtend.api.request.postMessageEventHandler={},luminateExtend.api.request.postMessageEventHandler.handler=function(e){if(-1!==luminateExtend.global.path.nonsecure.indexOf(e.origin)||-1!==luminateExtend.global.path.secure.indexOf(e.origin)){var t=m.parseJSON(e.data),a=t.postMessageFrameId,n=m.parseJSON(decodeURIComponent(t.response));luminateExtend.api.request.postMessageEventHandler[a]&&luminateExtend.api.request.postMessageEventHandler[a](a,n)}},void 0!==window.addEventListener?window.addEventListener("message",luminateExtend.api.request.postMessageEventHandler.handler,!1):void 0!==window.attachEvent&&window.attachEvent("onmessage",luminateExtend.api.request.postMessageEventHandler.handler)),luminateExtend.api.request.postMessageEventHandler[t]=function(e,t){u(n,t),m("#"+e).remove(),delete luminateExtend.api.request.postMessageEventHandler[e]},m("body").append('<iframe style="position: absolute; top: 0; left: -999em;" name="'+t+'" id="'+t+'"></iframe>'),m("#"+t).bind("load",function(){var e='{"postMessageFrameId": "'+m(this).attr("id")+'", "requestUrl": "'+i+'", "requestContentType": "'+n.contentType+'", "requestData": "'+n.data+'"}',t=i.split("/site/")[0].split("/admin/")[0];document.getElementById(m(this).attr("id")).contentWindow.postMessage(e,t)}),m("#"+t).attr("src",a)}),n.requiresAuth||!o&&!l&&!luminateExtend.global.sessionCookie?luminateExtend.api.getAuth({callback:a,useHTTPS:n.useHTTPS}):a()}};luminateExtend.api.request=function(l){if(m.isArray(l)){l.reverse();var o=[];m.each(l,function(e){var t=m.extend({async:!0},this);if(t.async||e===l.length-1)o.push(t);else if((n=l[e+1]).callback&&"function"!=typeof n.callback){var a=n.callback.success||m.noop;n.callback.success=function(e){a(e),r(t)}}else{var n,i=(n=l[e+1]).callback||m.noop;n.callback={success:function(e){i(e),r(t)},error:function(e){i(e)}}}}),o.reverse(),m.each(o,function(){r(this)})}else r(l)},luminateExtend.sessionVars={set:function(e,t,a){var n={};a&&(n.callback=a),e&&(n.data="s_"+e+"="+(t||""),luminateExtend.utils.ping(n))}},luminateExtend.tags=function(e,t){luminateExtend.tags.parse(e,t)},luminateExtend.tags.parse=function(e,n){luminateExtend.widgets?luminateExtend.widgets(e,n):(e=e&&"all"!==e?luminateExtend.utils.ensureArray(e):["cons"],n=n||"body",m.each(e,function(e,t){if("cons"===t){var a=m(n).find(document.getElementsByTagName("luminate:cons"));if(0<a.length){luminateExtend.api.request({api:"cons",callback:function(e){a.each(function(){e.getConsResponse?m(this).replaceWith(luminateExtend.utils.stringToObj(m(this).attr("field"),e.getConsResponse)):m(this).remove()})},data:"method=getUser",requiresAuth:!0})}}}))},luminateExtend.utils={ensureArray:function(e){return m.isArray(e)?e:e?[e]:[]},stringToObj:function(e,t){var a=t||window;if(e)for(var n=e.split("."),i=0;i<n.length;i++){if(i<n.length-1&&!a[n[i]])return{};a=a[n[i]]}return a},ping:function(e){var t=m.extend({data:null},e||{}),a="luminatePing"+(new Date).getTime();m("body").append('<img style="position: absolute; left: -999em; top: 0;" id="'+a+'" />'),m("#"+a).bind("load",function(){m(this).remove(),t.callback&&t.callback()}),m("#"+a).attr("src",("https:"===window.location.protocol?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"EstablishSession"+(luminateExtend.global.routingId&&""!==luminateExtend.global.routingId?";"+luminateExtend.global.routingId:"")+"?"+(null==t.data?"":t.data+"&")+"NEXTURL="+encodeURIComponent(("https:"===window.location.protocol?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"PixelServer"))},simpleDateFormat:function(e,t,r){if(r=r||luminateExtend.global.locale,r=g(r),t=t||(0<=m.inArray(r,["en_CA","fr_CA","en_GB","en_AU"])?"d/M/yy":"M/d/yy"),!((e=e||new Date)instanceof Date)){var a=e.split("T")[0].split("-"),n=1<e.split("T").length?e.split("T")[1].split(".")[0].split("Z")[0].split("-")[0].split(":"):["00","00","00"];e=new Date(a[0],a[1]-1,a[2],n[0],n[1],n[2])}var s=function(e){return 0===(e=""+e).indexOf("0")&&"0"!==e?e.substring(1):e},u=function(e){return e=Number(e),isNaN(e)?"00":(e<10?"0":"")+e},d={month:u(e.getMonth()+1),date:u(e.getDate()),year:u(e.getFullYear()),day:e.getDay(),hour24:e.getHours(),hour12:e.getHours(),minutes:u(e.getMinutes()),ampm:"AM"};11<d.hour24&&(d.ampm="PM"),d.hour24=u(d.hour24),0===d.hour12&&(d.hour12=12),12<d.hour12&&(d.hour12=d.hour12-12),d.hour12=u(d.hour12);var i=function(e){var t=e.replace(/yy+(?=y)/g,"yy").replace(/MMM+(?=M)/g,"MMM").replace(/d+(?=d)/g,"d").replace(/EEE+(?=E)/g,"EEE").replace(/a+(?=a)/g,"").replace(/k+(?=k)/g,"k").replace(/h+(?=h)/g,"h").replace(/m+(?=m)/g,"m").replace(/yyy/g,d.year).replace(/yy/g,d.year.substring(2)).replace(/y/g,d.year).replace(/dd/g,d.date).replace(/d/g,s(d.date)),a=function(e,t,a){for(var n=1;n<e.length;n++)if(!isNaN(e[n].substring(0,1))){var i=e[n].substring(0,2);e[n]=e[n].substring(2),isNaN(i.substring(1))&&(e[n]=i.substring(1)+e[n],i=i.substring(0,1)),23<(i=Number(i))&&(i=23);var l="+"===a?i:0-i;"kk"===t||"k"===t?24<(l=Number(d.hour24)+l)?l-=24:l<0&&(l+=24):(24<(l=Number(d.hour12)+l)?l-=24:l<0&&(l+=24),12<l&&(l-=12)),l=""+l,"kk"!==t&&"hh"!==t||(l=u(l)),("h"===t&&0===l||"hh"===t&&"00"===l)&&(l="12"),e[n]=l+e[n]}return e.join("")};-1!==t.indexOf("k+")&&(t=a((t=a(t.split("kk+"),"kk","+")).split("k+"),"k","+")),-1!==t.indexOf("k-")&&(t=a((t=a(t.split("kk-"),"kk","-")).split("k-"),"k","-")),-1!==(t=t.replace(/kk/g,d.hour24).replace(/k/g,s(d.hour24))).indexOf("h+")&&(t=a((t=a(t.split("hh+"),"hh","+")).split("h+"),"h","+")),-1!==t.indexOf("h-")&&(t=a((t=a(t.split("hh-"),"hh","-")).split("h-"),"h","-")),t=(t=(t=t.replace(/hh/g,d.hour12<12&&d.hour12.indexOf&&0!==d.hour12.indexOf("0")?"0"+d.hour12:d.hour12).replace(/h/g,s(d.hour12))).replace(/mm/g,d.minutes).replace(/m/g,s(d.minutes))).replace(/a/g,"A");var n=["January","February","march","april","may","June","July","august","September","October","November","December"];"es_US"===r&&(n=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]),"fr_CA"===r&&(n=["janvier","f&#233;vrier","mars","avril","mai","juin","juillet","ao&#251;t","septembre","octobre","novembre","d&#233;cembre"]);var i=n[Number(d.month)-1].substring(0,3);"fr_CA"===r&&("f&#"===i?i="f&#233;v":"ao&"===i?i="ao&#251;":"d&#"===i&&(i="d&#233;c")),t=t.replace(/MMMM/g,n[Number(d.month)-1]).replace(/MMM/g,i).replace(/MM/g,d.month).replace(/M/g,s(d.month));var l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];"es_US"===r&&(l=["domingo","lunes","martes","mi&eacute;rcoles","jueves","viernes","s&aacute;bado"]),"fr_CA"===r&&(l=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]);var o=l[d.day].substring(0,3);return"es_US"===r&&("mi&"===o?o="mi&eacute;":"s&a"===o&&(o="s&aacute;b")),t=(t=t.replace(/EEEE/g,l[d.day]).replace(/EEE/g,o).replace(/EE/g,o).replace(/E/g,o)).replace(/A/g,d.ampm).replace(/apr/g,"Apr").replace(/aug/g,"Aug"),"es_US"!==r&&"fr_CA"!==r&&(t=t.replace(/mar/g,"Mar").replace(/may/g,"May")),t};if(-1!==t.indexOf("'")){var l=t.replace(/\'+(?=\')/g,"''").split("''");if(1===l.length){l=t.split("'");for(var o=0;o<l.length;o++)o%2==0&&(l[o]=i(l[o]));return l.join("")}for(o=0;o<l.length;o++){for(var c=l[o].split("'"),p=0;p<c.length;p++)p%2==0&&(c[p]=i(c[p]));l[o]=c.join("")}return l.join("'")}return i(t)}}}("undefined"==typeof jQuery&&"function"==typeof Zepto?Zepto:jQuery);