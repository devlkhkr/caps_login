

(function(window, $) {
	var console;
	/* IE에서 console 변수가 오류를 일으키지 않도록 함 */
	if (!window.console){
		console = {};
		console.log = console.log || function(){};
		console.warn = console.warn || function(){};
		console.error = console.error || function(){};
		console.info = console.info || function(){};
		window.console	= console;
	}else{
		console	= window.console;
	}
	window.common	= {};

	var _env	= {
			mobile_type:"desktop"	//ios, android, desktop
			,nation:"ko"
			,service_center:"1588-6400"
			,channel:"ADT_HOME_ADMIN"
			,access_token:""
			,contextDomain:""
			,contextPath:""
			,transPath:"/transaction/"
			,popupInfo:{
				isPopup:false,
				popupType:"0",	//0:상대경로, 1:절대경로
				handle_id:"parent",
				parent_id:"",
				option:[
					{"type":"refresh"}
				]
			}
			,page:{
				template:{
					outline:"<div class=\"pagging\">#content#</div>",	//최외곽 껍데기
					repeat:"<a href=\"#page_event#\" class=\"#cls#\">#page#</a>",			//링크 반복부
					prev:"<a href=\"#page_event#\" class=\"prev\"><img src=\"#contextpath#/static/portal/images/btn_prev.gif\" alt=\"이전\" /></a>",	//이전버튼
					next:"<a href=\"#page_event#\" class=\"next\"><img src=\"#contextpath#/static/portal/images/btn_next.gif\" alt=\"다음\" /></a>" //다음버튼
				}
			}
			,app:{
				ios:{
					appstoreUrl:"http://itunes.apple.com/kr/app/id1093050972?mt=8"
					,appUrl:"ADTCAPSHOME://"
				}
				,android:{
					marketUrl:"market://details?id=com.ADTCaps.HomeService"
					,appUrl:"gsbk://calc"
					,intent:"intent://?#Intent;scheme=ADTCAPSHOME;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.ADTCaps.HomeService;end"
				}
			}
		};

		//스크립트 확장
		if(!String.prototype.decode){
			String.prototype.decode = function()
			{
			    return decodeURIComponent(this.replace(/\+/g, '%20'));
			};
		}
		if(!String.prototype.encode){
			String.prototype.encode = function(fixed)
			{
				if(fixed != null){
					return encodeURIComponent(this.replaceAll("/", fixed));
				}else{
					return encodeURIComponent(this);
				}
			};
		}
		if(!String.prototype.replaceAll){
			String.prototype.replaceAll = function( str, replacements )
			{
				var regex=new RegExp(str,'g');
				var temp = this+"";
				temp=temp.replace(regex, replacements);
				return temp;
			};
		}

		if(!String.prototype.toComma){
		    String.prototype.toComma = function()
		    {
		        var n = this.replaceAll(",", "");
		        var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
                        n += ''; // 숫자를 문자열로 변환
                        var commStr     = n;
                        try {
                                while (reg.test(commStr))
                                        commStr = commStr.replace(reg, '$1' + ',' + '$2');
                        } catch (e) {
                        }
                        return commStr;
		    };
		}

		if(!String.prototype.trim){
			String.prototype.trim = function() {
			    return this.replace(/(^\s*)|(\s*$)/gi, "");
			};
		}

		if(!String.prototype.toNumberString){
			String.prototype.toNumberString = function(min, max) {
				var MAX_INT = Math.pow(2, 53);
				if(min == null || min == ""){
					min	= MAX_INT*-1;
				}
				if(max == null || max == ""){
					max	= MAX_INT;
				}
				var val	= String(this).replaceAll(",", "");
				try{val	= Number(val);}catch(e){val=0;};
				if(val < min){
					val	= min;
				}
				if(val > max){
					val	= max;
				}
				return String(val).toComma();
			};
		}
		if(!String.prototype.toNumberNoCommaString){
			String.prototype.toNumberNoCommaString = function(min, max) {
				var MAX_INT = Math.pow(2, 53);
				if(min == null || min === ""){
					min	= MAX_INT*-1;
				}
				if(max == null || max === ""){
					max	= MAX_INT;
				}
				var val	= String(this).replaceAll(",", "");
				try{val	= Number(val);}catch(e){val=0;};
				if(val < min){
					val	= min;
				}
				if(val > max){
					val	= max;
				}
				return String(val);
			};
		}
		if(!String.prototype.toPhoneFormat){
			String.prototype.toPhoneFormat = function() {
				var num	= this;
				if(num != null && num != ""){
					num	= num.replace(/[^0-9]/gi,"");
					if(num.length < 7){
						return num;
					}else if(num.length == 7){
						return num.substring(0,3)+"-"+num.substring(3,7);
					}else if(num.length > 7){
						var fStr	= num.substring(0,3);
						var mStr	= num.substring(3,num.length-4);
						var rStr	= num.substring(num.length-4,num.length);
						return fStr+"-"+mStr+"-"+rStr;
					}
				}
				return "";
			};
		}
		if(!String.prototype.dateToAge){
			String.prototype.dateToAge	= function() {
				var birth	= this;
				var year=parseInt(new Date().getFullYear());
				var ck=parseInt(birth.substr(0,4));
				return String((year-ck)+1);
			};
		}
		if(!String.prototype.toTimeFormat){
			String.prototype.toTimeFormat	= function(type) {
				var time	= this;
				time	= time.replace("[^0-9]", "");
				if(time.length == 4){
					var h	= Number(time.substring(0,2));
					var m	= Number(time.substring(2,4));
					var ampm	= "";
					if(h < 10){
						h	= "0"+h;
					}
					if(m < 10){
						m	= "0"+m;
					}
					/*if(h != 24 && h >= 12){
						if(h != 12){
							h	= h-12;
						}
						ampm	= "오후";
						if(h < 10){
							h	= "0"+h;
						}
						if(m < 10){
							m	= "0"+m;
						}
					}else{
						ampm	= "오전";
						if(h == 00 || h == 24){
							h = "12";
						}
						if(h < 10){
							h	= "0"+h;
						}
						if(m < 10){
							m	= "0"+m;
						}
					}*/
					if(type != null && type == "1"){
						return h+":"+m;
					}else{
						return h+":"+m;
					}
				}
				return this;
			};
		}
		var addElement	= function(form, name, value){
			if($(form).find("input[name="+name+"]").length > 0){
				if(value != null){
					$(form).find("input[name="+name+"]").val(value);
				}
				return $(form).find("input[name="+name+"]")[0];
			}else{
				$(form).append("<input type=\"hidden\" name=\""+name+"\" />");
				if(value != null){
					$(form).find("input[name="+name+"]").val(value);
				}
				return $(form).find("input[name="+name+"]")[0];
			}
		};
		var getCurrentDate	= function(format){
			var newDate	= new Date();

			var yy1 = new String(newDate.getFullYear());
			var mm1 = newDate.getMonth() + 1;
			var dd1 = newDate.getDate();
			if(mm1 < 10){
				mm1 = "0"+String(newDate.getMonth()+1);
			}
			if(dd1 < 10){
				dd1 = "0"+String(newDate.getDate());
			}
			if(format != null){
				return yy1+format+mm1+format+dd1;
			}
			return String(yy1)+String(mm1)+String(dd1);
		};
		var dateToStr	= function(d, format){
			var newDate	= d;

			var yy1 = new String(newDate.getFullYear());
			var mm1 = newDate.getMonth() + 1;
			var dd1 = newDate.getDate();
			if(mm1 < 10){
				mm1 = "0"+String(newDate.getMonth()+1);
			}
			if(dd1 < 10){
				dd1 = "0"+String(newDate.getDate());
			}
			if(format != null){
				return yy1+format+mm1+format+dd1;
			}
			return String(yy1)+String(mm1)+String(dd1);
		};
		var toDateObj	= function(str){
			var currStr	= getCurrentDate();
			var yy1 = Number(currStr.split("-")[0]);
			var mm1 = Number(currStr.split("-")[1]);
			var dd1 = Number(currStr.split("-")[2]);
			if(str != null && str != "" && str.replaceAll("-", "")){
				if(str.length == 8){
					yy1 = str.substring(0, 4);
					mm1 = str.substring(4, 6);
					dd1 = str.substring(6, 8);
				}else if(str.length == 10){
					if(str.split("-") != null && str.split("-").length == 3){
						yy1 = Number(str.split("-")[0]);
						mm1 = Number(str.split("-")[1]);
						dd1 = Number(str.split("-")[2]);
					}
				}
			}
			return new Date(yy1+"/"+mm1+"/"+dd1);
		};

		if(!String.prototype.toDateObject){
			String.prototype.toDateObject = function() {
				return toDateObj(this);
			};
		}

		if(!String.prototype.toDateString){
			String.prototype.toDateString = function() {
				var d	= toDateObj(this);
				var yy1 = new String(d.getFullYear());
				var mm1 = d.getMonth()+1;
				var dd1 = d.getDate();
				if(mm1 < 10){
					mm1 = "0"+String(mm1);
				}
				if(dd1 < 10){
					dd1 = "0"+String(d.getDate());
				}

				return yy1+"-"+mm1+"-"+dd1;
			};
		}

		if(!String.prototype.toDateMMString){
			String.prototype.toDateMMString = function() {
				var d	= toDateObj(this);
				var yy1 = new String(d.getFullYear());
				var mm1 = d.getMonth();
				var dd1 = d.getDate();
				if(mm1 < 10){
					mm1 = "0"+String(d.getMonth()+1);
				}
				if(dd1 < 10){
					dd1 = "0"+String(d.getDate());
				}

				return yy1+"-"+mm1;
			};
		}

		if(!String.prototype.addMonth){
			String.prototype.addMonth = function(mm) {
				var dateStr	= this;
				if(dateStr == null){
					dateStr	= "".toDateString();
				}
				var yy1 = "";
				var mm1 = "";
				var dd1 = "";
				dateStr	= dateStr.replaceAll("-", "");
				if(dateStr.replaceAll("-", "").length == 8){
					yy1	= Number(dateStr.substring(0, 4));
					mm1	= Number(dateStr.substring(4, 6));
					dd1	= Number(dateStr.substring(6, 8));
				}else {
					yy1 = Number(dateStr.split("-")[0]);
					mm1 = Number(dateStr.split("-")[1]);
					dd1 = Number(dateStr.split("-")[2]);
				}

				mm1	+= mm;

				if(mm1 < 1){
					mm1	+= 12;
					yy1--;
				}else if(mm1 > 12){
					yy1++;
					mm1	-= 12;
				}

				if(mm1 < 10){
					mm1 = "0"+String(mm1);
				}
				if(dd1 < 10){
					dd1 = "0"+String(dd1);
				}

				return yy1+"-"+mm1+"-"+dd1;
			};
		};

		if(!String.prototype.addDays){
			String.prototype.addDays = function(dd,format) {
				var dateStr	= this;
				if(dateStr == null){
					dateStr	= "".toDateString();
				}
				var strDateObject	= dateStr.toDateObject();
				strDateObject.setDate(strDateObject.getDate() + dd);
				return dateToStr(strDateObject,format)
			};
		};

		$.fn.setMetaData = function(key, data) {
			var metaData	= $(this).data();
			if(metaData != null){
				metaData[key]	= data;
				$(this).data(metaData);
			}else{
				metaData	= {key:data};
				$(this).data(metaData);
			}
			return $(this);
		};
		$.fn.getMetaData = function(key) {
			var metaData	= $(this).data();
			if(metaData != null){
				return metaData[key];
			}else{
				return null;
			}
			return null;
		};
		//각 필드 컨트롤
		$.fn.setNumberField = function(min, max, emptyOk, callbackBefore, callbackAfter) {
			$(this).bind("focus", function(){
				$(this).select();
			});
			$(this).bind("keyup", function(e){
				if(e.keyCode <= 46){
					return true;
				}
				var val	= $(this).val();
				if(val != null && val != ""){
					if(val == "-"){
						$(this).val("-");
						return "";
					}

					var firstChar	= val.charAt(0);
					if(firstChar == "-"){
						val	= "-"+val.replace(new RegExp("[^0-9]", "g"), "");
					}else{
						val	= val.replace(new RegExp("[^0-9]", "g"), "");
					}
				}else{
					if(emptyOk){
						$(this).val("");
						return "";
					}
					val	= "0";
				}
				try{val	= Number(val);}catch(e){val	= 0;}
				if(val < min){
					val	= min;
				}
				if(val > max){
					val	= max;
				}
				if(callbackBefore != null){
					if(callbackBefore(val)){
						$(this).val(String(val).toComma());
					}
				}else{
					$(this).val(String(val).toComma());
				}
				if(callbackAfter != null){
					callbackAfter(val);
				}
			});
			$(this).bind("blur", function(){
				var val	= $(this).val();
				if(val != null && val != "" ){
					$(this).val(String(val).toComma());
					if(callbackAfter != null){
						callbackAfter(val);
					}
				}
			});
		};
		//각 필드 컨트롤
		$.fn.setPhoneField = function(callbackBefore, callbackAfter) {
			$(this).bind("keyup", function(e){
				if(e.keyCode <= 46){
					return true;
				}
				var val	= $(this).val();
				if(val != null && val != ""){
					if(val == "-"){
						$(this).val("");
						return "";
					}
					val	= val.replace(new RegExp("[^0-9]", "g"), "");
				}else{
					$(this).val("");
					return "";
				}
				if(callbackBefore != null){
					if(callbackBefore(val)){
						$(this).val(String(val).toComma());
					}
				}else{
					$(this).val(String(val).toComma());
				}
				if(callbackAfter != null){
					callbackAfter(val);
				}
			});
			$(this).bind("focus", function(){
				var val	= $(this).val();
				if(val != null && val != ""){
					val	= val.replace(new RegExp("[^0-9]", "g"), "");
					$(this).val(val);
					$(this).select();
				}
			});
			$(this).bind("blur", function(){
				var val	= $(this).val();
				if(val != null && val != "" && val.length >= 10){
					var phoneStr	= val;
					var front	= "";
					var middle	= "";
					var rear	= "";
					if(phoneStr.length > 4){
						rear	= phoneStr.substring(phoneStr.length-4, phoneStr.length);
						phoneStr	= phoneStr.substring(0, phoneStr.length-4);
					}
					if(phoneStr.length > 3){
						front	= phoneStr.substring(0, 3);
						middle	= phoneStr.substring(3, phoneStr.length);
					}
					$(this).val(front+"-"+middle+"-"+rear);
					val	= front+"-"+middle+"-"+rear;
				}else if(val != null && val != "" && val.length >= 7 && val.length <= 8){
					var phoneStr	= val;
					var front	= "";
					var rear	= "";
					if(phoneStr.length > 4){
						rear	= phoneStr.substring(phoneStr.length-4, phoneStr.length);
						front	= phoneStr.substring(0, phoneStr.length-4);
					}
					$(this).val(front+"-"+rear);
					val	= front+"-"+rear;
				}
				if(callbackAfter != null){
					callbackAfter(val);
				}
			});
		};

		if(!String.prototype.toJson){
			String.prototype.toJson = function() {
				var json	= null;
				try {
					json	= this.replace(/\\'/g, "'");
					json	= JSON.parse(json);
				} catch (e) {
					alert("String to json failed"+e);
				}
			    return json;
			};
		}
		$.fn.toJson = function() {
			var paramString	= {};
			$(this).find("input[type=text]").each(function(idx, elem){
				paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			});
			$(this).find("input[type=password]").each(function(idx, elem){
				paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val()) ;
			});
			$(this).find("input[type=hidden]").each(function(idx, elem){
				paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val()) ;
			});
			$(this).find("select").each(function(idx, elem){
				paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			});
			$(this).find("input[type=radio]").each(function(idx, elem){
				if($(elem).is(":checked")){
					paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
				}
			});
			$(this).find("input[type=checkbox]").each(function(idx, elem){
//				if($(elem).is(":checked")){
//					paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
//				}else{
//					paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
//				}
				paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			});
			$(this).find("textarea").each(function(idx, elem){
				paramString	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			});
			return paramString;
		};
		$.fn.clearField = function() {
			$(this).find("input[type=text],input[type=password],input[type=hidden],textarea").each(function(idx, elem){
				$(elem).val("");
			});
			$(this).find("select").each(function(idx, elem){
				$(elem).val($(elem).find("option")[0].value);
			});
		};
		//해당 폼에 있는 필드를 타겟으로 초기화
		$.fn.bindFieldFromTarget = function(formId) {
			$(this).find("input").each(function(idx, elem){
				var fName = $(elem).attr("name");
				if(fName != null && fName != "" && fName != "lines" && fName != "page"){
					$("#"+formId).find("input[name="+fName+"]").each(function(idx2, elem2){
						if($(elem2).hasClass("date")){
							$(elem).val($(elem2).val().replaceAll("-", ""));
						}else{
							$(elem).val($(elem2).val());
						}
					});
					$("#"+formId).find("select[name="+fName+"]").each(function(idx2, elem2){
						$(elem).val($(elem2).val());
					});
					$("#"+formId).find("textarea[name="+fName+"]").each(function(idx2, elem2){
						$(elem).val($(elem2).val());
					});
				}
			});
		};
		$.fn.bindFieldFromMap = function(fieldKey, map) {
			if(map != null){
				$(this).find("td,p,a,span,div,label").each(function(idx, elem){
					if($(elem).attr(fieldKey) != null && $(elem).attr(fieldKey) != "" && map[$(elem).attr(fieldKey)] != null){
						$(elem).text(map[$(elem).attr(fieldKey)]);
					}
				});
				$(this).find("input[type=text],input[type=password],input[type=hidden],textarea,select").each(function(idx, elem){
					if($(elem).attr(fieldKey) != null && $(elem).attr(fieldKey) != "" && map[$(elem).attr(fieldKey)] != null){
						$(elem).val(map[$(elem).attr(fieldKey)]);
					}
				});
			}
		};
		$.fn.checkAll = function() {
			if($(this).attr("type") == "checkbox" && $(this).attr("name") != ""){
				$("input[name="+$(this).attr("name")+"]").attr("checked", $(this).is(":checked"));
			}
			return $(this);
		};

		if(!Array.prototype.toJsonString){
			Array.prototype.toJsonString = function()
			{
				var newList	= [];
				var temp = this;
				//데이터의 값을 모두 인코딩 한다.
				for(var idx in temp){
					var map	= temp[idx];
					for(var key in map){
						map[key]	= map[key];
					}
					newList.push(map);
				}
				return JSON.stringify(newList);
			};
		}
		if(!Array.prototype.remove){
			Array.prototype.remove = function(i)
			{
				var newList	= [];
				var temp = this;
				//데이터의 값을 모두 인코딩 한다.
				for(var idx =0;idx<temp.length;idx++){
					if(idx != i){
						newList.push(temp[idx]);
					}
				}
				return newList;
			};
		}

		//루트패스 설정
		var setContextPath	= function(param){
			_env.contextPath	= param;
		};
		var getContextPath	= function(){
			return _env.contextPath;
		};

		var GUID = function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16)
						.substring(1);
			}
			return function() {
				return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-'
						+ s4() + s4() + s4();
			}();
		};

		$.fn.clearTextBox = function() {
			if(arguments != null &&  arguments.length > 0){
				for(var i=0; i<arguments.length; i++){
					$(this).find("input[name="+arguments[i]+"]").val("");
				}
			}
		};

		//모바일 기종에 따라 테스트
		var mobileNavi	= function(){
			var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
			if (mobile) {
				var userAgent = navigator.userAgent.toLowerCase();
				if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1)){
					//document.write("<b> ANDROID MOBILE <br>");
					return "android";
				}
				else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)){
					//document.write("<b> ANDROID TABLET <br>");
					return "android";
				}
				else if ((userAgent.search("blackberry") > -1)){
					//document.write("<b> BLACKBERRY DEVICE <br>");
					return "android";
				}
				else if ((userAgent.search("iphone") > -1)){
					//document.write("<b> IPHONE DEVICE <br>");
					if (userAgent.search("android") > -1) return "android";
					return "ios";
				}
				else if ((userAgent.search("ipod") > -1)){
					//document.write("<b> IPOD DEVICE <br>");
					if (userAgent.search("android") > -1) return "android";
					return "ios";
				}
				else if ((userAgent.search("ipad") > -1)){
					//document.write("<b> IPAD DEVICE <br>");
					if (userAgent.search("android") > -1) return "android";
					return "ios";
				}
				else{
					//document.write("<b> UNKNOWN DEVICE <br>");
					return "android";
				}
			}else{
				return "desktop";
			}
		};
		var getBrowserType	= function() {
			var _ua = navigator.userAgent;

			/* IE7,8,9,10,11 */
			if (navigator.appName == 'Microsoft Internet Explorer') {
				var rv = -1;
				var trident = _ua.match(/Trident\/(\d.\d)/i);

				//ie11에서는 MSIE토큰이 제거되고 rv:11 토큰으로 수정됨 (Trident표기는 유지)
				if (trident != null && trident[1] == "7.0")
					return rv = "IE" + 11;
				if (trident != null && trident[1] == "6.0")
					return rv = "IE" + 10;
				if (trident != null && trident[1] == "5.0")
					return rv = "IE" + 9;
				if (trident != null && trident[1] == "4.0")
					return rv = "IE" + 8;
				if (trident == null)
					return rv = "IE" + 7;

				var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(_ua) != null)
					rv = parseFloat(RegExp.$1);
				return rv;
			}

			/* etc */
			var agt = _ua.toLowerCase();
			if (agt.indexOf("chrome") != -1)
				return 'Chrome';
			if (agt.indexOf("opera") != -1)
				return 'Opera';
			if (agt.indexOf("staroffice") != -1)
				return 'Star Office';
			if (agt.indexOf("webtv") != -1)
				return 'WebTV';
			if (agt.indexOf("beonex") != -1)
				return 'Beonex';
			if (agt.indexOf("chimera") != -1)
				return 'Chimera';
			if (agt.indexOf("netpositive") != -1)
				return 'NetPositive';
			if (agt.indexOf("phoenix") != -1)
				return 'Phoenix';
			if (agt.indexOf("firefox") != -1)
				return 'Firefox';
			if (agt.indexOf("safari") != -1)
				return 'Safari';
			if (agt.indexOf("skipstone") != -1)
				return 'SkipStone';
			if (agt.indexOf("netscape") != -1)
				return 'Netscape';
			if (agt.indexOf("mozilla/5.0") != -1)
				return 'Mozilla';
		};

		var isIELowVersion	= function() {
			var brType	= getBrowserType();
			if(brType == "IE7" || brType == "IE8" || brType == "IE9"){
				return true;
			}else{
				return false;
			}
		};

		var control	= true;
		var isProgress	= function(){
			return control;
		};
		var setProgress	= function(isShow){
			control	= isShow;
		};

		var initYn	= true;
		var isCommonInit	= function(){
			return initYn;
		};
		var setCommonInit	= function(_initYn){
			initYn	= _initYn;
		};

		window.niceAuthResult	= function(ret){
		}
		window.smsAuthResult	= function(ret){
		}

		//api 바인드
		window.common.setContextPath		= setContextPath;
		window.common.getContextPath		= getContextPath;
		window.common.addElement			= addElement;
		window.common.GUID					= GUID;
		window._env							= _env;
		window.mobileNavi	        		= mobileNavi;
		window.getBrowserType	        	= getBrowserType;
		window.isIELowVersion	       		= isIELowVersion;
		window.getCurrentDate	       		= getCurrentDate;
		window.isProgress	       		= isProgress;
		window.setProgress	       		= setProgress;
		window.isCommonInit	       		= isCommonInit;
		window.setCommonInit	       	= setCommonInit;

		_env.mobile_type	= mobileNavi();
//		alert("11-"+_env.mobile_type);
})(window, jQuery);