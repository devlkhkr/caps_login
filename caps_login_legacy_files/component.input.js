/**
 * input 스크립트 컴포넌트.
 * 모듈 바인딩:window.component.input;
 */
(function(){

	var attr_options	= {
		rule:"data-component"
		,name:"data-name"
		,check:"data-check"
	};
	
	var public_func		= {
		object:[]
		,$id:{}
	};
	
	//private 오브젝트는 외부로 노출되지 않는 내부용 함수 pack 이다.
	var private_func	= {
		attr_maps:function(){
				return {"required":false, "date":false, "type":"text", "validation":[]};
			}
		//validation의 init 문자열의 파싱
		, parseInit:function(option){
			var init	= option.init;
			var initArr = private_func.attr_maps();
			var initSplit = [];
			if(init != null && init != ""){
				if(init.split(" ") != null){
					initSplit = init.split(" ");
				}
			}else{
				//아무것도 없으면 text 타입
				initArr["validation"].push("text");
				initArr["type"]	= "text";
			}
			if(option.obj != null && $(option.obj).attr("type") == "checkbox"){
				initArr["type"]	= "check";
			}
			
			if(initSplit != null){
				for(var i=0;i<initSplit.length;i++){
					if(initArr[initSplit[i]] != null){
						initArr[initSplit[i]] = true;
					}else{
						initArr["validation"].push(initSplit[i]);
					}
				}
			}
			return initArr;
		}
		//validation의 init 문자열의 파싱
		, validMessage:function(elem, type, p1){
			var name 	= $(elem).attr(attr_options.name);
			var ERR_MSG	= "";
			if(name == null || name == ""){
				if(_env.nation == "ko"){
					name	= "대상 항목";
				}else{
					name	= "This input field";
				}
			}
			if(_env.nation == "ko"){
				if(type == "blank") ERR_MSG = name + " 은(는) 필수입력 항목 입니다.";
				else if(type == "number") ERR_MSG = name + " 은(는) 숫자만입력가능합니다.";
				else if(type == "phone") ERR_MSG = name + " 은(는) 전화번호만 입력 가능합니다.";
				else if(type == "password") ERR_MSG = name + " 이(가) 올바른 비밀번호 형식이 아닙니다.";	//Please enter a valid passwrod.
				else if(type == "email") ERR_MSG = name + " 의 형식이 올바른 메일 형식이 아닙니다.";	//Please enter a valid email address.
				else if(type == "alphanumeric") ERR_MSG = name + " 은(는) 은 영문,숫자만 입력할 수 있습니다."
				else if(type == "alphabet") ERR_MSG = name + " 은(는) 영문만 입력 할 수 있습니다."	//Letters, only please.
				else if(type == "hangle") ERR_MSG = name + " 은(는) 한글만 입력 할 수 있습니다."
				else if(type == "url") ERR_MSG = name + " 항목이 올바른 URL형식이 아닙니다."
				else if(type == "ipv4") ERR_MSG = name + " 의 입력 형식이 올바른 IP형식이 아닙니다."
				else if(type == "html") ERR_MSG = name + " 의 입력 형식이 올바른 HTML형식이 아닙니다."
				else if(type == "min") ERR_MSG = name + " 의 값은 "+p1+" 보다 커야 합니다."
				else if(type == "alphahannumeric") ERR_MSG = name + " 은(는) 한글,영문,숫자만 입력 할 수 있습니다."
			}else{
				if(type == "blank") ERR_MSG = name + " is essential input.";
				else if(type == "number") ERR_MSG = name + " is only number field.";
				else if(type == "phone") ERR_MSG = name + " is only phone number field.";
				else if(type == "password") ERR_MSG = name + " is invalid password type.";
				else if(type == "email") ERR_MSG = name + " is invalid email type.";
				else if(type == "alphanumeric") ERR_MSG = name + " is only letter and number.";
				else if(type == "alphabet") ERR_MSG = name + " is only letter field.";	//Letters, only please.
				else if(type == "hangle") ERR_MSG = name + "은(는) 한글만 입력 할 수 있습니다.";
				else if(type == "url") ERR_MSG = name + " is url type filed.";
				else if(type == "ipv4") ERR_MSG = name + " is ip type filed.";
				else if(type == "html") ERR_MSG = name + " is html filed.";
				else if(type == "min") ERR_MSG = name + " value is greater than "+p1;
				else if(type == "alphahannumeric") ERR_MSG = name + " is only letter and number."
			}
			return ERR_MSG;
		}
		// 공백 체크
		, blank:function(elem){
			var message	= private_func.validMessage(elem, "blank");
			if ($(elem).val() == "" || $(elem).val() == null) {
				alert(message);
				$(elem).focus();
				return false;
			}
		    return true;
		}		
		// 숫자 validate 정의
		, number:function(elem){
			var message	= private_func.validMessage(elem, "number");
			var rule=/[^0-9]/gi;
			var val	= $(elem).val();
			if(val != null && val.indexOf("-") > -1){
				val	= val.replaceAll("-", "");
			}
			if (val.replace(/[0-9]/gi, "").replaceAll("-", "") != "") {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// 숫자 validate 정의
	 	, number_keyup:function(elem){
			var rule=/[^0-9]/gi;
			$(elem).val($(elem).val().replace(rule,""));
		}
	 	, minValue:function(elem, baseMin){
			var message	= private_func.validMessage(elem, "min");
	 		var rule=/[^0-9]/gi;
	 		var minVal	= Number($(elem).val().replace(rule,""));
	 		if(minVal < baseMin){
	 			minVal	= baseMin;
	 			$(elem).focus();
	 			alert(message);
	 		}
	 	}
	 	, minValue_keyup:function(elem, baseMin){
	 		var rule=/[^0-9]/gi;
	 		var minVal	= Number($(elem).val().replace(rule,""));
	 		if(minVal < baseMin){
	 			minVal	= baseMin;
	 			$(elem).val(minVal);
	 		}
	 	}
		// password validate 정의
		, password:function(elem){
			var message	= private_func.validMessage(elem, "password");
			var rule =  /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
			if ($(elem).val().match(rule) == null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// Email validate 정의
		, email:function(elem){
			//유효성 검사 전에 " "를 ""로 모두 변경
			var inputEmail = elem.value;
			elem.value = inputEmail.replace(/\s/gi,'');
			//elem.value = inputEmail.replace(/ /gi,'');
			
			var message	= private_func.validMessage(elem, "email");
			var rule = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
			if ($(elem).val().match(rule) == null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					//$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// Letters, numbers validate 정의
		, alphanumeric:function(elem){
			var message	= private_func.validMessage(elem, "alphanumeric");
			var rule = /[^a-zA-Z0-9_]/gi;
			if ($(elem).val().match(rule) != null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// Letters, numbers validate 정의
	 	, alphanumeric_keyup:function(elem){
	 		var rule = /[^a-zA-Z0-9_]/gi;
	 		var ori_val	= $(elem).val();
	 		var replace_val	= $(elem).val().replace(rule,"");
	 		if(ori_val != replace_val){
	 			$(elem).val(replace_val);
	 		}
		}
		// alphabet validate 정의
		, alphabet:function(elem){
			var message	= private_func.validMessage(elem, "alphabet");
			var rule = /[^a-zA-Z]/gi;
			if ($(elem).val().match(rule) != null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// alphabet validate 정의
	 	, alphabet_keyup:function(elem){
			var message	= private_func.validMessage(elem, "alphabet_keyup");
	 		var rule = /[^a-zA-Z]/gi;
	 		var ori_val	= $(elem).val();
	 		var replace_val	= $(elem).val().replace(rule,"");
	 		if(ori_val != replace_val){
	 			$(elem).val(replace_val);
	 		}
		}
		// 한글 validate 정의
		, hangle:function(elem){
			var message	= private_func.validMessage(elem, "hangle");
//			var rule = /^[\uAC00-\uD7A3]+$/i;
			var rule = /([^ㄱ-ㅣ가-힣_\\s\\.\\?\\!\\-\\,|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55])/gi;
			if ($(elem).val().match(rule) != null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// 한글 validate 정의
	 	, hangle_keyup:function(elem){
	 		var rule = /([^ㄱ-ㅣ가-힣_\\s\\.\\?\\!\\-\\,|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55])/gi;
	 		var ori_val	= $(elem).val();
	 		var replace_val	= $(elem).val().replaceAll(rule,"");
	 		if(ori_val != replace_val){
	 			$(elem).val(replace_val);
	 		}
		}
		// URL validate 정의
		, url:function(elem){
			var message	= private_func.validMessage(elem, "url");
			var rule = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/;
			if ($(elem).val().match(rule) == null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// IPv4 validate 정의
		, ipv4:function(elem){
			var message	= private_func.validMessage(elem, "ipv4");
			var rule = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
			if ($(elem).val().match(rule) == null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
	 	, ipv4_keyup:function(elem){
	 		var rule = /[^a-zA-Z]/gi;
	 		var rule = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi;
			$(elem).val($(elem).val().replace(rule,""));
		}		
	 	, phone:function(elem){
	 		var message	= private_func.validMessage(elem, "phone");
	 		var rule = /[^0-9]/gi;
	 		var pNumber	= $(elem).val().replace(rule,"");
	 		
	 		return true;
	 	}
	 	// 전화번호 필드
	 	, phone_keyup:function(elem){
	 		var rule = /[^0-9]/gi;
	 		var pNumber	= $(elem).val().replace(rule,"");
	 		$(elem).val(pNumber.toPhoneFormat());
	 	}		
		// HTML Tag validate 정의
		, html:function(elem){
			var message	= private_func.validMessage(elem, "html");
			var rule = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
			if ($(elem).val().match(rule) == null && $(elem).val().length > 0) {
				alert(message);
				if ($(elem).val().length > 0) {
					$(elem).focus();
				}
				return false;
			}
		    return true;
		}
		// 체크박스 키업
	 	, checkbox_check:function(elem, val){
	 		var checkString	= $(elem).attr(attr_options.check);
	 		var checkArray	= ["Y", "N"]; 
	 		if(checkString != null && checkString != "" && checkString.split(",").length == 2){
	 			checkArray	= checkString.split(",");
	 		}
	 		if(val == null || val == ""){
	 			private_func.checkbox_keyup(elem);
	 		}else{
	 			if(checkArray[0] == val){
	 				$(elem).prop("checked","checked");
	 			}else if(checkArray[1] == val){
	 				$(elem).prop("checked","");
	 			}
	 		}
		}
	 	, checkbox_keyup:function(elem){
	 		var checkString	= $(elem).attr(attr_options.check);
	 		var checkArray	= ["Y", "N"]; 
	 		if(checkString != null && checkString != "" && checkString.split(",").length == 2){
	 			checkArray	= checkString.split(",");
	 		}
	 		if($(elem).is(":checked")){
	 			$(elem).val(checkArray[0]);
	 		}else{
	 			$(elem).val(checkArray[1]);
	 		}
	 	}
	 	// 알파벳, 한글, 숫자 validate 정의
	 	, alphahannumeric:function(elem){
	 		var message	= private_func.validMessage(elem, "alphahannumeric");
	 		var rule = /[^ㄱ-ㅣ가-힣a-zA-Z0-9_ \\s|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]/gi;
	 		if ($(elem).val().match(rule) == null && $(elem).val().length > 0) {
	 			alert(message);
	 			if ($(elem).val().length > 0) {
	 				$(elem).focus();
	 			}
	 			return false;
	 		}
	 	    return true;
	 	}
		// alphabet validate 정의
	 	, alphahannumeric_keyup:function(elem){
			var message	= private_func.validMessage(elem, "alphahannumeric");
	 		var rule = /[^ㄱ-ㅣ가-힣a-zA-Z0-9_ \\s|\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55]/gi;
	 		var ori_val	= $(elem).val();
	 		var replace_val	= $(elem).val().replaceAll(rule,"");
	 		if(ori_val != replace_val){
	 			$(elem).val(replace_val);
	 		}
	 	}
		
	};
	
	/**
	 * 외부 노출 함수
	 * input 컴포넌트의 validate가 동작하도록 
	 * 초기화 함.
	 */
	public_func.init	= function(option){
		if(option == null){
			alert("Input option is not bound. input component init failed.");
			return;
		}
		
		var obj = option.obj;
		if($(obj).attr("id") == null ||$(obj).attr("id") == ""){
			$(obj).attr("id", $(obj).attr("name"));
		} 
		
		var initArray = private_func.parseInit(option);
//		if(initArray["required"]) {
//			$(obj).blur(function() {
//				private_func.blank(obj);
//			});
//		}
		option.initArray	= initArray;
		
		if(initArray["type"] == "check"){
			private_func.checkbox_check(obj, $(obj).val());
			$(obj).click(function() {
				private_func.checkbox_keyup(obj);
			});
			
		}else{
			for(var i=0;i<initArray["validation"].length;i++){
				if(initArray["validation"][i] == "number") {
					$(obj).keyup(function() {
						private_func.number_keyup(obj);
					});
				}
				else if(initArray["validation"][i] == "password") {
					$(obj).blur(function() {
						private_func.password(obj);
					});
				}
				else if(initArray["validation"][i] == "email") {
					$(obj).blur(function() {
						private_func.email(obj);
					});
				}
				else if(initArray["validation"][i] == "alphanumeric") {
					$(obj).keyup(function() {
						private_func.alphanumeric_keyup(obj);
					});
				}
				else if(initArray["validation"][i] == "alphabet") {
					$(obj).keyup(function() {
						private_func.alphabet_keyup(obj);
					});
				}
				else if(initArray["validation"][i] == "hangle") {
					$(obj).keyup(function() {
						private_func.hangle_keyup(obj);
					});
				}
				else if(initArray["validation"][i] == "url") {
					$(obj).blur(function() {
						private_func.url(obj);
					});
				}
				else if(initArray["validation"][i] == "ipv4") {
					$(obj).keyup(function() {
						private_func.ipv4_keyup(obj);
					});
				}
				else if(initArray["validation"][i] == "phone") {
					$(obj).keyup(function() {
						private_func.phone_keyup(obj);
					});
				}
				else if(initArray["validation"][i] == "html") {
					$(obj).blur(function() {
						private_func.html(obj);
					});
				}
				else if(initArray["validation"][i].indexOf("min") >= 0) {
					$(obj).keyup(function() {
						var rule=/[^0-9]*$/;
						var val	= initArray["validation"][i].replace(rule, "");
						private_func.number_keyup(obj);
						private_func.minValue_keyup(obj, Number(val));
					});
				}
				else if(initArray["validation"][i] == "alphahannumeric") {
					$(obj).keyup(function() {
						private_func.alphahannumeric_keyup(obj);
					});
				}
			}
		}

		public_func.$id[$(obj).attr("id")]	= option;
		public_func.object.push(option);
	}
	
	public_func.validation = function(elem) {
		if(elem == null){
			alert("component init failed.");
			return;
		}
		var valid	= true;
		$("#"+$(elem).attr("id") + " ["+attr_options.rule+"]").each(function(idx, elem){
			var initString = $(elem).attr(attr_options.rule);
			valid	= public_func.inspectField(elem, initString);
			return valid;
		});
		
		return valid;
	};
	public_func.inspectField = function(elem, initString) {
		var initArray 	= private_func.parseInit({
			init:initString
			,obj:elem
		});
		var valid		= true;
		if(elem == null){
			return false;
		}
		
		if(initArray["required"]) {
			if (!private_func.blank(elem)) {
				valid	= false;
			}
		}
		for(var j=0;j<initArray["validation"].length;j++){
			if(initArray["validation"][j] == "number") {
				if (!private_func.number(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "password") {
				if (!private_func.password(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "email") {
				if (!private_func.email(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "alphanumeric") {
				if (!private_func.alphanumeric(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "alphabet") {
				if (!private_func.alphabet(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "hangle") {
				if (!private_func.hangle(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "url") {
				if (!private_func.url(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "ipv4") {
				if (!private_func.ipv4(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "html") {
				if (!private_func.html(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j] == "phone") {
				if (!private_func.phone(elem)) {
					valid	= false;
				}
			}
			else if(initArray["validation"][j].indexOf("min") >= 0) {
				if (!private_func.number(elem)) {
					valid	= false;
				}else{
					if (!private_func.minValue(elem)) {
						valid	= false;
					}
				}
			}
			else if(initArray["validation"][j] == "alphahannumeric") {
				if (!private_func.alphahannumeric(elem)) {
					valid	= false;
				}
			}
		}
		return valid;
		
	};

	public_func.toJson = function(form) {
		var paramJson	= {};
		var requestMeta	= {
			"encoded":{}
		};
		var isEncodedMeta	= function(inputElem){
			var inputOption	= public_func.$id[$(inputElem).attr("id")];
			if(inputOption != null && inputOption.initArray != null){
				for(var i=0;i<inputOption.initArray["validation"].length;i++){
					//인코딩 된 데이터 명기시 메타 데이터에 남긴다.
					if(inputOption.initArray["validation"][i] == "encoded"){
						requestMeta["encoded"][$(inputElem).attr("name")]	= "encoded";
					}
				}
			}
		}
		$(form).find("input[type=text],input[type=tel],input[type=number],input[type=date],input[type=email]").each(function(idx, elem){
			var inputOption	= public_func.$id[$(elem).attr("id")];
			if(inputOption != null && inputOption.initArray != null
			&& inputOption.initArray["date"] == true){
				paramJson	[$(elem).attr("name")] = $(elem).val().replaceAll("-", "");
			}else{
				paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			}
			isEncodedMeta(elem);
		});
		$(form).find("input[type=password]").each(function(idx, elem){
			paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val()) ;
		});
		$(form).find("input[type=hidden]").each(function(idx, elem){
			paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val()) ;
			isEncodedMeta(elem);
		});
		$(form).find("select").each(function(idx, elem){
			paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			isEncodedMeta(elem);
		});
		$(form).find("input[type=radio]").each(function(idx, elem){
			if($(elem).is(":checked")){
				paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
			}
		});
		$(form).find("input[type=checkbox]").each(function(idx, elem){
//			if($(elem).is(":checked")){
//				paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
//			}else{
//				paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
//			}
			paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
		});
		$(form).find("textarea").each(function(idx, elem){
			paramJson	[$(elem).attr("name")] =encodeURIComponent($(elem).val());
		});
		paramJson.requestMeta	= requestMeta;
		return paramJson;
	};
	window.component.input	= public_func;
}());