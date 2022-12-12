(function(){
	var public_func	= {
		callbackFunctions:{}
	};
	var getNativePacket	= function(param, success, error){
		var packet	= {
			"param":{}
			,"success":""
			,"error":""
		};
		if(param != null){
			packet["param"]	= param;
		}
		if(success != null){
			packet["success"]	= success;
		}
		if(error != null){
			packet["error"]	= error;
		}
		return JSON.stringify(packet);
	};
	var getNativeUrlEncodePacket	= function(param, success, error){
		var packet	= {
				"param":{}
			,"success":""
			,"error":""
		};
		if(param != null){
			packet["param"]	= param;
		}
		if(success != null){
			packet["success"]	= success;
		}
		if(error != null){
			packet["error"]	= error;
		}
		return encodeURIComponent(JSON.stringify(packet));
	};

	// 사용하지 않음....
	/** =============== 최초 뷰 로딩 후 초기화. ================= */
	public_func.deviceReady	= function(param){
		if(param == null){
			param	= {};
		}
	};

	/** =============== 홈으로 이동. ================= */
	public_func.home	= function(){
		if(_env.mobile_type == "desktop"){
			document.location.href = "http://localhost:8080/home2/device/dash";
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"home", "param":"", "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"home", "param":"", "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	/** =============== 로그아웃. ================= */
	// 20200923 수
	// Callback 추가 ....
	public_func.logout	= function(success){

		if( typeof(success) === 'undefined')
		{
			success = null;
		}


		public_func.callbackFunctions["logoutCallback"]	= {
				"success":success
				,"error":null
			};

		var successFunName = "";

		if( success != null)
		{
			successFunName = "logoutSuccess"
		}


		if(_env.mobile_type == "desktop"){
			document.location.href = "/home2/main/login";
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"logout", "param":"", "success":successFunName, "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"logout", "param":"", "success":successFunName, "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};

	window.logoutSuccess = function(result){
		var callback	= public_func.callbackFunctions["logoutCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};


	/** =============== 로딩창을 띄운다. ================= */
	public_func.showProgress	= function(isShow){
		var param	= {
			"isShow":"0"
		};
		if(isShow){
			param["isShow"]	= "1";
		}
		if(_env.mobile_type == "desktop"){
			console.log("################### showProgress....param:"+param["isShow"]);
			return true;
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"showProgress", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"showProgress", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}


	};

	//프로그래스(timeout 시간 추가)
	public_func.showProgressTimeout	= function(arg){
		//alert(arg["isShow"] + " / " + arg["timeout"]);
		var param	= {
			"isShow":"0"
		};
		if(arg["isShow"]){
			param["isShow"]	= "1";
			if(arg["timeout"] != null){
				param["timeout"] = ""+arg["timeout"];
			}
		}
		if(_env.mobile_type == "desktop"){
			return true;
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"showProgress", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"showProgress", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};


	// /** =============== 20200828 추가..  ================= */
	// /** =============== Popup UI(Activity/ViewController) 열기 실행.. ================= */
	public_func.openPopupUI	= function(url, passParam){

		if( typeof(passParam) === 'undefined')
		{
			passParam = null;
		}

		var param	= {
			"url":url,
			"params": passParam
		};

		if(_env.mobile_type == "desktop"){
			console.log("################### openPopupUI....param:"+param);
			return true;
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"openPopupUI", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openPopupUI", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	// /** =============== Popup UI(Activity/ViewController) 닫기 실행.. ================= */
	public_func.closePopupUI	= function(parentFn, passParam){

		if( typeof(parentFn) === 'undefined')
		{
			parentFn = null;
		}

		if( typeof(passParam) === 'undefined')
		{
			passParam = null;
		}

		var param	= {
			"fun": parentFn,
			"params":  passParam
			};

		if(_env.mobile_type == "desktop"){
			console.log("################### closePopupUI....param:"+param);
			return true;
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"closePopupUI", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"closePopupUI", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	// /** =============== 20200828 추가..  ================= */
	// /** =============== App 실행 및 설치 페이지 열기 실행.. ================= */
	public_func.openOtherApp	= function(appname, iosScheme, iosUrl, androidScheme, androidUrl){
		var param	= {
			"app":appname,
			"scheme":"",
			"url":""
		};

		if(_env.mobile_type == "desktop"){
			console.log("################### openOtherApp....param:"+param);
			return true;
		}
		else if(_env.mobile_type == "android"){

			param.scheme = androidScheme;
			param.url = androidUrl

			var ajson = {"func":"openOtherApp", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){

			param.scheme = iosScheme;
			param.url = iosUrl

			var ajson = {};
			var ijson = {"func":"openOtherApp", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	// /** =============== 20200908 추가..  ================= */
	// /** =============== App 설치 여부 확인 . ================= */
	public_func.checkOtherApp	= function(appname, iosScheme, androidScheme, success){

		public_func.callbackFunctions["checkOtherAppCallback"]	= {
				"success":success
				,"error":null
			};

		var param	= {
			"app":appname,
			"scheme":""
		};

		if(_env.mobile_type == "desktop"){
			console.log("################### checkOtherApp....param:"+param);
			return true;
		}
		else if(_env.mobile_type == "android"){

			param.scheme = androidScheme;

			var ajson = {"func":"checkOtherApp", "param":param, "success":"checkOtherAppSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){

			param.scheme = iosScheme;

			var ajson = {};
			var ijson = {"func":"checkOtherApp", "param":param, "success":"checkOtherAppSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	window.checkOtherAppSuccess	= function(result){
		var callback	= public_func.callbackFunctions["checkOtherAppCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};




	/** =============== 팝업을 띄운다. ================= */
	var popupHandle	= null;
	public_func.showPopup	= function(param, success, error){
		public_func.callbackFunctions[param.handle_id]	= {
			"success":success
			,"error":error
		};
		param["url_type"]	= _env.popupInfo.popupType;
		if(_env.mobile_type == "desktop"){
			if(param.meta != null ){
				$("#"+param.meta.form_id).attr("target", param.meta.popup_id);
				common.addElement($("#"+param.meta.form_id), "handle_id", param.meta.handle_id);
				common.addElement($("#"+param.meta.form_id), "popup_id", param.meta.popup_id);
				popupHandle	= window.open("about:blank",param.meta.popup_id, param.meta.option);
				return true;
			}
		}else if(_env.mobile_type == "android"){
			delete param["meta"];
			var ajson = {"func":"showPopup", "param":param, "success":"nativePopupSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			delete param["meta"];
			if(param["EncodeData"] != null){
				param["EncodeData"]	= param["EncodeData"].decode();
			}

			var ajson = {};
			var ijson = {"func":"showPopup", "param":param, "success":"nativePopupSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}

		return false;
	};
	window.nativePopupSuccess	= function(param){
		try{
			var json	= eval("("+param.decode()+")");
			var callback	= public_func.callbackFunctions[json.parent_id];
			if(callback != null && callback["success"] != null){
				callback["success"](json);
			}
		}catch(e){}
	};
	/** =============== //팝업을 띄운다. ================= */


	/** =============== 팝업을 닫는다. ================= */
	public_func.closePopup	= function(param, successname){

		if( typeof(successname) === 'undefined')
		{
			successname = null;
		}

		if(param == null){
			param	= {};
		}

		if (successname == null)
		{
			successname = ""
		}

		param["handle_id"]	= _env.popupInfo.handle_id;
		param["parent_id"]	= _env.popupInfo.parent_id;
		if(_env.mobile_type == "desktop"){
			opener.nativePopupSuccess(JSON.stringify(param).encode());
			self.close();
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"closePopup", "param":param, "success":successname, "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"closePopup", "param":param, "success":successname, "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};


	public_func.closeWindowOpen	= function(fname, fparam){

		var param = {
			"fname":  fname,
			"fparam": fparam
		};

		if(_env.mobile_type == "desktop"){
			eval("opener."+fname+"('"+fparam+"');");
			self.close();
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"closeWindowOpen", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"closeWindowOpen", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};


	/** =============== PASS앱 사용 여부 정보 연동... ================= */
	public_func.getPassAppInfo	= function(success){

		public_func.callbackFunctions["getPassAppInfoCallback"]	= {
				"success":success
				,"error":null
			};

		var param = {
		};

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getPassAppInfo", "param":param, "success":"getPassAppInfoSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getPassAppInfo", "param":param, "success":"getPassAppInfoSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	window.getPassAppInfoSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getPassAppInfoCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	public_func.setPassAppInfo	= function(appuse, success){

		public_func.callbackFunctions["setPassAppInfoCallback"]	= {
				"success":success
				,"error":null
			};

		var param = {
			"appuse": appuse
		};

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"setPassAppInfo", "param":param, "success":"setPassAppInfoSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"setPassAppInfo", "param":param, "success":"setPassAppInfoSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	window.setPassAppInfoSuccess	= function(result){
		var callback	= public_func.callbackFunctions["setPassAppInfoCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};



	/** =============== 생체 인증 정보 연동... ================= */
	public_func.getBioAuthInfo	= function(success){

		public_func.callbackFunctions["getBioAuthInfoCallback"]	= {
				"success":success
				,"error":null
			};

		var param = {
		};

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getBioAuthInfo", "param":param, "success":"getBioAuthInfoSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getBioAuthInfo", "param":param, "success":"getBioAuthInfoSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	window.getBioAuthInfoSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getBioAuthInfoCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	public_func.setBioAuthInfo	= function(biouse, success){

		public_func.callbackFunctions["setBioAuthInfoCallback"]	= {
				"success":success
				,"error":null
			};

		var param = {
			"biouse": biouse
		};

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"setBioAuthInfo", "param":param, "success":"setBioAuthInfoSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"setBioAuthInfo", "param":param, "success":"setBioAuthInfoSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	window.setBioAuthInfoSuccess	= function(result){
		var callback	= public_func.callbackFunctions["setBioAuthInfoCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};


	/** =============== 앱 종료. ================= */
	public_func.closeApp	= function(){
		var param	= {};
		if(_env.mobile_type == "desktop"){
			opener.nativePopupSuccess(JSON.stringify(param).encode());
			self.close();
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"closeApp", "param":"", "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"closeApp", "param":"", "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};


	/** =============== 메뉴를 열거나 닫는다. ================= */
	public_func.menu	= function(isShow){
		var param	= {
			"isShow":"0"
		};
		if(isShow){
			param["isShow"]	= "1";
		}
		if(_env.mobile_type == "desktop"){
			if(isShow)
				location.href = "/home2/common/menu"
			else
				location.href = "/home2/device/dash"

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"menu", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"menu", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};

	/** =============== 세션데이터를 native에 저장한다. ================= */
	public_func.setSession	= function(param, success){
		public_func.callbackFunctions["setSessionCallback"]	= {
				"success":success
				,"error":null
			};
		if(_env.mobile_type == "desktop"){
			setSessionSuccess("{\"result\":\"1\"}".encode());
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"setSession", "param":param, "success":"setSessionSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"setSession", "param":param, "success":"setSessionSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	window.setSessionSuccess	= function(result){
		var callback	= public_func.callbackFunctions["setSessionCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	//ty : "1" : 로그인 종료...   "2" : 경비 장소 변경 종료...
	public_func.setSessionEnd	= function(ty){

		var param	= {
			"types":ty
		};

		if(_env.mobile_type == "desktop"){

		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"setSessionEnd", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"setSessionEnd", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};



	/** =============== 메인 대시 화면에서 URL 연결 처리 ================= */
	public_func.openMainLink	= function(url){
		var param	= {
			"url":url
		};
		if(_env.mobile_type == "desktop"){
			document.location.href = url
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"openMainLink", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openMainLink", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	/** =============== 메뉴화면에서 URL 연결 처리 ================= */
	public_func.openMenuLink	= function(act, url){
		var param	= {
			"act": act,
			"url":url
		}
		if(_env.mobile_type == "desktop"){
			document.location.href = url
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"openMenuLink", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openMenuLink", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	/** =============== 보관함 호출 처리 ================= */
	public_func.openLocalStorage = function(){
		var param	= {}
		if(_env.mobile_type == "desktop"){

		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"openLocalStorage", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openLocalStorage", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	/** =============== 전화를 건다 ================= */
	public_func.telephoneCall	= function(phoneNumber){
		var param	= {
			"phone_num":phoneNumber
		}
		if(_env.mobile_type == "desktop"){
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"telephoneCall", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"telephoneCall", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	/** =============== Pin번호를 호출한다================= */
	public_func.openPin	= function(param, success, error){
		public_func.callbackFunctions["nativePin"]	= {
				"success":success
				,"error":error
			};
		if(param == null){
			param	= {};
		}
		if(_env.mobile_type == "desktop"){
			nativePinSuccess('{"result":"1"}');

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openPin", "param":param, "success":"nativePinSuccess", "error": "nativePinError"};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openPin", "param":param, "success":"nativePinSuccess", "error": "nativePinError"};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};
	window.nativePinSuccess	= function(result){
		var callback	= public_func.callbackFunctions["nativePin"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};
	window.nativePinError	= function(result){
		var callback	= public_func.callbackFunctions["nativePin"];
		if(callback != null && callback["error"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["error"](json);
			}catch(e){}
		}
	};


	/** =============== Snooze 비밀번호를 호출한다================= */
	public_func.openSnooze	= function(param, success, error){
		public_func.callbackFunctions["nativeSnooze"]	= {
				"success":success
				,"error":error
			};
		if(param == null){
			param	= {};
		}
		if(_env.mobile_type == "desktop"){
			nativeSnoozeSuccess('{"result":"1"}');

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openSnooze", "param":param, "success":"nativeSnoozeSuccess", "error": "nativeSnoozeError"};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openSnooze", "param":param, "success":"nativeSnoozeSuccess", "error": "nativeSnoozeError"};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};
	window.nativeSnoozeSuccess	= function(result){
		var callback	= public_func.callbackFunctions["nativeSnooze"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};
	window.nativeSnoozeError	= function(result){
		var callback	= public_func.callbackFunctions["nativeSnooze"];
		if(callback != null && callback["error"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	/** =============== 주소록을 조회한다 ================= */
	public_func.openPhoneBook	= function(success, error){
		if(success != null){
			public_func.callbackFunctions["openPhoneBook"]	= {
					"success":success
					,"error":error
			};
		}
		var param	= {}
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openPhoneBook", "param":"", "success":"openPhoneBookSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openPhoneBook", "param":"", "success":"openPhoneBookSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	};
	public_func.addPhoneBookEvent	= function(success, error){
		public_func.callbackFunctions["openPhoneBook"]	= {
				"success":success
				,"error":error
			};
	}
	window.openPhoneBookSuccess	= function(result){
		var callback	= public_func.callbackFunctions["openPhoneBook"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	/** =============== 앱버전 조회한다 ================= */
	public_func.getVersion	= function(success, error){
		public_func.callbackFunctions["getVersion"]	= {
			"success":success
			,"error":error
		};
		var param	= {}
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getVersion", "param":"", "success":"getVersionSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getVersion", "param":"", "success":"getVersionSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}
	window.getVersionSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getVersion"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};


	/** =============== 20181029 추가..  ================= */
	/** =============== OS Version  조회한다.   ================= */
	public_func.getOSVersion	= function(success, error){
		public_func.callbackFunctions["getOSVersion"]	= {
			"success":success
			,"error":error
		};
		var param	= {}
		if(_env.mobile_type == "desktop"){
			success({version:'10'});
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getOSVersion", "param":"", "success":"getOSVersionSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);
		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getOSVersion", "param":"", "success":"getOSVersionSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}
	window.getOSVersionSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getOSVersion"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};



	/** =============== 20180911 추가..  ================= */
	/** =============== push DeviceToken  조회한다.   ================= */
	public_func.getDeviceToken	= function(success, error){
		public_func.callbackFunctions["getDeviceToken"]	= {
			"success":success
			,"error":error
		};
		var param	= {}
		if(_env.mobile_type == "desktop"){
			success({token:'346345345345'});
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"getDeviceToken", "param":param, "success":"getDeviceTokenSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getDeviceToken", "param":param, "success":"getDeviceTokenSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}


	}
	window.getDeviceTokenSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getDeviceToken"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	/** =============== 20200904 추가..  ================= */
	/** =============== 자동로그인을 위한 push DeviceToken  조회한다.   ================= */

	public_func.getDeviceTokenAutoLogin	= function(success, error){
		public_func.callbackFunctions["getDeviceTokenAutoLogin"]	= {
			"success":success
			,"error":error
		};
		var param	= {}
		if(_env.mobile_type == "desktop"){
			success({token:'346345345345'});
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"getDeviceTokenAutoLogin", "param":param, "success":"getDeviceTokenAutoLoginSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getDeviceTokenAutoLogin", "param":param, "success":"getDeviceTokenAutoLoginSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}


	}
	window.getDeviceTokenAutoLoginSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getDeviceTokenAutoLogin"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};


	/** =============== 20180322 추가..  ================= */
	/** =============== Activity/ViewController  종료 처리.. ================= */
	public_func.closeView = function(success, error){

		var param	= {}
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"closeView", "param":"", "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"closeView", "param":"", "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== 20180411 추가..  ================= */
	/** =============== getImages  S3 10초 동영사용 이미지 리스트 정보 App 전달  ================= */

	public_func.getImages	= function(p, event){

		if( typeof(event) === 'undefined')
		{
			event = null;
		}

		var param	= {
			"url":p,
			"event":event
		}

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getImages", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getImages", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== 20200825 추가..  ================= */
	/** =============== back 버튼 처리 함수..  ================= */
	public_func.webBack	= function(url, success){

		if( typeof(success) === 'undefined')
		{
			success = null;
		}


		public_func.callbackFunctions["webBackCallback"]	= {
			"success":success
			,"error":null
		};

		var successfnname = ""

		if (success != null)
		{
			successfnname = "webBackSuccess"
		}

		var param	= {
			"url":url
		}
		if(_env.mobile_type == "desktop"){
			if(!url) {
				if(success) success();
				else history.back();
				return;
			}else{
				location.href=url;
			}
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"webBack", "param":param, "success":successfnname, "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"webBack", "param":param, "success":successfnname, "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}
	window.webBackSuccess	= function(result){
		var callback	= public_func.callbackFunctions["webBackCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};



	/** =============== 20190903 추가..  ================= */
	/** =============== getDownloadUrls  S3 동영상 URL 리스트 json 배열  정보 App 전달  ================= */

	public_func.getDownloadUrls	= function(p){

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getDownloadUrls", "param":p, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getDownloadUrls", "param":p, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== goLiveView  라이브 영상 뷰어 실행 명령 App 전달... (파라미터 추후 확장 가능...)   ================= */

	public_func.goLiveView	= function(p, addSvcYn){

		var param	= {
			"battery":p,
			"addSvcYn":addSvcYn
		};
		if(_env.mobile_type == "desktop"){
			console.log("### call Live on Demand Viewer in App......"+p);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"goLiveView", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"goLiveView", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== goRotate 현재 화면 회전/복구 관련 실행 명령 App 전달... (파라미터 추후 확장 가능...)   ================= */

	public_func.goRotate	= function(p){

		if(_env.mobile_type == "desktop"){
			console.log("### change rotate in App......"+p);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"goRotate", "param":"", "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"goRotate", "param":"", "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}
	//20210419..
	// web에서 crashreport
	public_func.report	= function(msg){

		if( typeof(msg) === 'undefined')
		{
			msg = "";
		}

		var param	= {
			"message": msg
		}

		if(_env.mobile_type == "desktop"){
			console.log("### report  in App......"+msg);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"report", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"report", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}



	//20191021...
	/** =============== goWifiSetting OS Wifi 설정 화면으로 이동 실행 명령 App 전달... (파라미터 추후 확장 가능...)   ================= */
	// 기존 goWifiSetting2 통합 처리... types (String) 변수로 구별... '1':Doorguard  '2;: SOS
	//20210309...
	// 	장치 타입 정보 추가 (dtype.) 도어가드 1.0, 2.0  wifi설정 Native UI 이미지분기 처리를 위해서 추가...
	//	dtype 값 정보   "1": 도어가드 1.0    "2": 도어가드 2.0
	public_func.goWifiSetting	= function(ty, pam, dtype){

		if( typeof(dtype) === 'undefined')
		{
			dtype = "0";
		}

		var param	= {
			"types": ty,
			"ssid": pam,
			"dtype": dtype
		}

		if(_env.mobile_type == "desktop"){
			console.log("### go Wifi Setting  in App......"+pam);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"goWifiSetting", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"goWifiSetting", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}

	//20200812...
	// PASS 앱 연동 관련 추가 인터페이스...
	public_func.passApp = function(carrier, success, error){

		public_func.callbackFunctions["passApp"]	= {
			"success":success
			,"error":error
		};
		var param	= {
			"carrier":carrier
		}
		if(_env.mobile_type == "desktop"){
			if(location.hostname!='localhost') return;
			success({
				result:1,
 			    code : 0000,
 			    error : "",
 			    message : "\Uc131\Uacf5\Uc785\Ub2c8\Ub2e4.",
 			    user :{
 			        agegroup :40,
 			        birthdate : "AYr970S1Nv/Lb96K9L934g==",
 			        birthday : "Dr0GGCj/6+mMqnFeadhsEw==",
 			        ci : "5LepN+GWKTHkEYZS3kJKRS5JgQGuLBjxnUyXhKmXhnMCaUcdrwrb9uNC9yAIZSF3mJKlaoF5tdatLS2NUIgcRwJy8jW70z1Qb/RKTLdpCRn7+r1hSwIj3YYOcjFvFErB",
 			        foreign : 'L',
 			        gender : 'M',
 			        name : "uUTP6c2rPuazld2eFIMLhA==",
 			        phoneNo : "zcjhlrCNDu38hHPegWIFAA==",
 			        plid : "6dab3441-25bf-419d-9c7b-902b6b9c3672",
 			        telcoCd : 'K'
 			    }
 			});
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"passApp", "param":param, "success":"passAppSuccess", "error": "passAppError"};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"passApp", "param":param, "success":"passAppSuccess", "error": "passAppError"};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}
	window.passAppSuccess	= function(result){
		var callback	= public_func.callbackFunctions["passApp"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};
	window.passAppError	= function(result){
		var callback	= public_func.callbackFunctions["passApp"];
		if(callback != null && callback["error"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["error"](json);
			}catch(e){}
		}
	};


	//20200820...
	// 웹 Session time-out 로그아웃 전달
	public_func.sessionTimeout = function(){

		var param	= {
		}
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"sessionTimeout", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"sessionTimeout", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	//20200918...
	// Popup 닫고 Sub 이동
	public_func.goSub = function(url){

		var param	= {
			"url":url
		}
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"goSub", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"goSub", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== 이미지 크게보기를 열거나 이미지를 다운로드한다.================= */
	public_func.openImage	= function(p){
		var param	= {
			"url":p.url
		};
		if(_env.mobile_type == "desktop"){
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openImage", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openImage", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}
	public_func.downloadImage	= function(p){
		var param	= {
			"url":p.url,
			"event":""
		};

		if (p.event != null)
		{
			param.event = p.event
		}

		if(_env.mobile_type == "desktop"){
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"downloadImage", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"downloadImage", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== 20210115 ================= */
	public_func.faceCamera	= function(p){

		if( typeof(p) === 'undefined')
		{
			p = null;
		}

		var param	= {
		};


		if(_env.mobile_type == "desktop"){
			console.log('######## call face camera....');
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"faceCamera", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"faceCamera", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	public_func.goOSWifiSetting	= function(p){

		if( typeof(p) === 'undefined')
		{
			p = null;
		}

		var param	= {
		}

		if(_env.mobile_type == "desktop"){
			console.log("### go OS Wifi Setting  in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"goOSWifiSetting", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"goOSWifiSetting", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}


	public_func.getCurrentSsid	= function(p){

		if( typeof(p) === 'undefined')
		{
			p = null;
		}

		var param	= {
		}

		if(_env.mobile_type == "desktop"){
			console.log("### getCurrentSsid  in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getCurrentSsid", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getCurrentSsid", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}

	public_func.apPwd	= function(p){

		var param	= {
			"pw": p
		}

		if(_env.mobile_type == "desktop"){
			console.log("###apPwd in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"apPwd", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"apPwd", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}

	public_func.deviceMac	= function(mac, dtype){

		var param	= {
			"device": dtype,
			"mac": mac
		}

		if(_env.mobile_type == "desktop"){
			console.log("###deviceMac in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"deviceMac", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"deviceMac", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}

	public_func.deviceConnect	= function(){

		var param	= {

		}

		if(_env.mobile_type == "desktop"){
			console.log("###deviceConnect in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"deviceConnect", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"deviceConnect", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}


	public_func.setDrt	= function(drt){

		var param	= {
			"recordtime":drt

		}

		if(_env.mobile_type == "desktop"){
			console.log("###setDrt in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"setDrt", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"setDrt", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}


	/** =============== 앱갤러리를 연다================= */
	public_func.openGallery	= function(p){
		var param	= {
		};
		if(_env.mobile_type == "desktop"){
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openGallery", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openGallery", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== 핀번호 설정 ================= */
	public_func.openPinSet	= function(param, success, error){
		public_func.callbackFunctions["openPinSet"]	= {
				"success":success
				,"error":error
		};
		if(param == null){
			param	= {};
		}
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openPinSet", "param":param, "success":"openPinSetSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openPinSet", "param":param, "success":"openPinSetSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}
	window.openPinSetSuccess	= function(result){
		var callback	= public_func.callbackFunctions["openPinSet"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	/** =============== 내장 브라우저 열기 ================= */
	public_func.openBrowser	= function(param){
		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openBrowser", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openBrowser", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}


	/** =============== toast 팝업 ================= */
	public_func.showToast	= function(param){
		if(_env.mobile_type == "desktop"){
			alert(param.msg);
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"showToast", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"showToast", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	/** =============== 더이상 보지 않기..처리.. ================= */
	//20210309 추가...
	//20210324..
	// 파라미터 page 추가.. (가이드, 얼굴등록 가이드 분리)
	// page 값    "0" : default 깂   "1" : 사용 가이드   "2": 얼굴등록 가이드   "3": 얼굴인식 가이드
	public_func.checkOnOff = function(onoff, page){

		if( typeof(page) === 'undefined')
		{
			page = "0";
		}


		var param	= {
			"isOn":"0",
			"page":page
		};
		if(onoff){
			param["isOn"]	= "1";
		}

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"checkOnOff", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"checkOnOff", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}
	// page 변수 추가...
	public_func.getOnOff = function(success, page){

		if( typeof(page) === 'undefined')
		{
			page = "0";
		}

		public_func.callbackFunctions["getOnOff"]	= {
			"success":success
			,"error":null
		};

		var param	= {
			"page":page
		};

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getOnOff", "param":param, "success":"getOnOffSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getOnOff", "param":param, "success":"getOnOffSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	window.getOnOffSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getOnOff"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};




	/** =============== Key정보 저..처리.. ================= */
	public_func.setKeyData = function(key, val){

		var param	= {
			"key":key,
			"value":val
		};

		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"setKeyData", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"setKeyData", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	public_func.getKeyData = function(key, success){

		public_func.callbackFunctions["getKeyData"]	= {
			"success":success
			,"error":null
		};

		var param	= {
			"key":key
		};


		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getKeyData", "param":param, "success":"getKeyDataSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getKeyData", "param":param, "success":"getKeyDataSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	window.getKeyDataSuccess	= function(result){
		var callback	= public_func.callbackFunctions["getKeyData"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};


	public_func.getKeyDataT = function(key, success){

		public_func.callbackFunctions["getKeyDataT"]	= {
			"success":success
			,"error":null
		};

		var param	= {
			"key":key
		};


		if(_env.mobile_type == "desktop"){

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"getKeyDataT", "param":param, "success":"getKeyDataSuccessT", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);


		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"getKeyDataT", "param":param, "success":"getKeyDataSuccessT", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}

	window.getKeyDataSuccessT	= function(result){
		var callback	= public_func.callbackFunctions["getKeyDataT"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};


	/** =============== 외부앱 실행 ================= */
	public_func.openExternalApp	= function(param){
		var appInfo	= param[_env.mobile_type];
		if(appInfo != null && appInfo["market_url"] == ""){
			if(_env.mobile_type == "ios"){
				alert("IOS "+param["name"]+" 앱이 존재하지 않습니다.");
			}else if(_env.mobile_type == "android"){
				alert("안드로이드 "+param["name"]+" 앱이 존재하지 않습니다.");
			}
			return;
		}

		if(_env.mobile_type == "desktop"){
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"openExternalApp", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"openExternalApp", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);

		}
	}
	/** =============== native 푸쉬 콜백을 받는다================= */
	var notifyCallback	= null;
	public_func.addNotifyCallback	= function(func){
		notifyCallback	= func;
	}
	window.notificationFromApp	= function(ret){
		if(notifyCallback != null){
			var json	= null;
			if(ret != null && ret.length != 0){
				json	= eval("("+ret.decode()+")");
			}
			notifyCallback(json);
		}
	}
	var notifySimpleCallback	= null;
	public_func.addNotifySimpleCallback	= function(func){
		notifySimpleCallback	= func;
	}
	window.notificationSimpleFromApp	= function(ret){
		if(notifySimpleCallback != null){
			var json	= null;
			if(ret != null){
				json	= eval("("+ret.decode()+")");
			}
			notifySimpleCallback(json);
		}
	}

	/** =============== 뒤로가기 이벤트 제어================= */
	public_func.addOnBackPress	= function(func){
	 	public_func.callbackFunctions["addOnBackPress"]	= {
	 		"success":func
	 	};
	 	var param	= {
	 		"function":"addOnBackPressCallback"
	 	}

	 	if(_env.mobile_type == "desktop"){
	 	}else if(_env.mobile_type == "android"){


	 	}else if(_env.mobile_type == "ios"){

	 	}
	 }
	 window.addOnBackPressCallback	= function(){
	 	if(public_func.callbackFunctions["addOnBackPress"] != null && public_func.callbackFunctions["addOnBackPress"]["success"]){
	 		try{
	 			public_func.callbackFunctions["addOnBackPress"]["success"]();
	 		}catch(e){}
	 	}
	}

	var ios_event_queue	= [];
	var event_handle	= null;
	var addIOSEvent	= function(event){
		ios_event_queue.push(event);
		if(event_handle == null) EventTicker();
	};
	var EventTicker	= function(){
		event_handle	= setTimeout(function(){
			if(ios_event_queue != null && ios_event_queue.length > 0){
				var event	= ios_event_queue.shift();
				document.location = event;
				EventTicker();
			}else{
				event_handle	= null;
			}
		}, 20);
	};

	//** ============== DIY 기기 검색 (SmartConfig로 기기 검색하여 기기 등록 요청) ================== */
    public_func.deviceScan  = function(dtype){
        var param  = {
            "device": dtype
        }

        if(_env.mobile_type == "desktop"){
                console.log('######## call device scan....');
        }else if(_env.mobile_type == "android"){
                var ajson = {"func":"deviceScan", "param":param, "success":"", "error": ""};
                var ijson = {};
                SyworksAppWeb.wtoa(ajson, ijson);

        }else if(_env.mobile_type == "ios"){
                var ajson = {};
                var ijson = {"func":"deviceScan", "param":param, "success":"", "error": ""};
                SyworksAppWeb.wtoa(ajson, ijson);

        }
	}

	public_func.diyApPwd	= function(p){

		var param	= {
			"pw": p
		}

		if(_env.mobile_type == "desktop"){
			console.log("###diyApPwd in App......"+param);

		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"diyApPwd", "param":param, "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"diyApPwd", "param":param, "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	}

	public_func.reload	= function(param, success){
		public_func.callbackFunctions["reloadCallback"]	= {
				"success":success
				,"error":null
			};
		if(_env.mobile_type == "desktop"){
			reloadSuccess("{\"result\":\"1\"}".encode());
		}
		else if(_env.mobile_type == "android"){
			var ajson = {"func":"reload", "param":param, "success":"reloadSuccess", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"reload", "param":param, "success":"reloadSuccess", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};
	window.reloadSuccess	= function(result){
		var callback	= public_func.callbackFunctions["reloadCallback"];
		if(callback != null && callback["success"] != null){
			try{
				var json	= eval("("+result.decode()+")");
				callback["success"](json);
			}catch(e){}
		}
	};

	public_func.homeReload	= function(){
		if(_env.mobile_type == "desktop"){
			document.location.href = "http://localhost:8080/home2/device/dash";
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"homeReload", "param":"", "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"homeReload", "param":"", "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	public_func.homePreReload	= function(){
		if(_env.mobile_type == "desktop"){
		}else if(_env.mobile_type == "android"){
			var ajson = {"func":"homePreReload", "param":"", "success":"", "error": ""};
			var ijson = {};
			SyworksAppWeb.wtoa(ajson, ijson);

		}else if(_env.mobile_type == "ios"){
			var ajson = {};
			var ijson = {"func":"homePreReload", "param":"", "success":"", "error": ""};
			SyworksAppWeb.wtoa(ajson, ijson);
		}
	};

	window.mobile	= public_func;
}());