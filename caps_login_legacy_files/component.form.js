/**
 * 폼 스크립트 컴포넌트.
 * 모듈 바인딩:window.component.form;
 */
(function(){

	var attr_options	= {
		service:"data-service"
		,callback:"data-callback"
		,bind:"data-bind"
		,bindField:"data-col"
		,option:"data-option"
		,page:"data-page"
	};

	var public_func		= {
		object:{}
	};
	//private 오브젝트는 외부로 노출되지 않는 내부용 함수 pack 이다.
	var private_func	= {
		//전송 파라미터 원형을 얻어온다.
		default_param:function(setting){
			var param	= {
					common:{}
					,header:{}
					,body:{
						request:{}
						,response:{}
					}
					,tail:{}
				}
			if (setting){
				$.extend(param, setting);
			}
			if (setting != null && setting.body){
				$.extend(param.body, setting.body);
			}
			return param;
		}
		//form의 init 문자열의 원형
		,attr_maps:function(){
			return {"onload":false, "view":false,"excel":false, "popup":false, "layer":false, "noprogress":false, "eventSet":[]};
		}
		//form의 init 문자열의 파싱
		,parseInit:function(init){
			var initArr		= private_func.attr_maps();
			var initSplit	= [];
			if(init != null && init != ""){
				if(init.split(" ") != null){
					initSplit	= init.split(" ");
				}
			}
			if(initSplit != null){
				for(var i=0;i<initSplit.length;i++){
					//onload 등은 기본 설정셋에 존재하고 버튼 아이디 등은 존재하지 않으므로 이벤트 대상이다.
					if(initArr[initSplit[i]] != null){
						initArr[initSplit[i]]	= true;
					}else{
						initArr["eventSet"].push(initSplit[i]);
					}
				}
			}
			return initArr;
		}
		//form의 callback attr 의 파싱
		,parseCallback:function(init){
			var initArr		= {before:null,success:null,error:null};
			var initSplit	= [];
			if(init != null && init != ""){
				if(init.split(",") != null){
					initSplit	= init.split(",");
				}
			}
			if(initSplit != null && initSplit.length > 0){
				for(var i=0;i<initSplit.length;i++){
					if(initSplit[i] != null){
						var callbackPair	= initSplit[i].split(":");
						if(callbackPair != null && callbackPair.length == 2){
							initArr[callbackPair[0]]	= callbackPair[1];
						}
					}
				}
			}
			return initArr;
		}
		,parseBind:function(init){
			var initArr		= {field:null,grid:null,select:null,data:null,clear:null,popup:"windowPopup",layer:"layerPopup"};
			var initSplit	= [];
			if(init != null && init != ""){
				if(init.split(",") != null){
					initSplit	= init.split(",");
				}
			}
			if(initSplit != null && initSplit.length > 0){
				for(var i=0;i<initSplit.length;i++){
					if(initSplit[i] != null){
						var callbackPair	= initSplit[i].split(":");
						if(callbackPair != null && callbackPair.length == 2){
							initArr[callbackPair[0]]	= callbackPair[1];
						}
					}
				}
			}
			return initArr;
		}
		,parsePage:function(init){
			var initArr		= {pageId:null,page:0,block:10,lines:20,totalKey:null};
			if(init != null && init != ""){
				//ex)pageDiv:[1/10/20/totalCount]
				if(init.split(":") != null){
					var initSplit	= init.split(":");
					if(initSplit != null && initSplit.length == 2){
						initArr.pageId	= initSplit[0];
						var pageInfo	= initSplit[1].split("/");
						if(pageInfo != null && pageInfo.length == 4){
							initArr.page	= pageInfo[0].replace(/[^0-9]/gi, "");
							initArr.block	= pageInfo[1].replace(/[^0-9]/gi, "");
							initArr.lines	= pageInfo[2].replace(/[^0-9]/gi, "");
							initArr.totalKey	= pageInfo[3].replace(/[\]]/gi, "");
						}
					}
				}
			}
			return initArr;
		}
		//form의 callback type 은 최초 문자열 파라미터기 때문에 이를 함수로 호출해준다.
		,invoke:function(func_name, p){
			if(func_name != null && func_name != ""){
				try{
					return eval(func_name+".apply(null, p)")
				}catch(e){
					//alert(e);
				}
			}
		}
	};
	public_func.getOption	= function(id){
		return public_func.object[id];
	}
	/**
	 * 외부 노출 함수
	 * 폼 객체가 ajax 혹은 view 타입으로 데이터를 주고 받는 컴포넌트로 동작하도록
	 * 초기화 함.
	 */
	public_func.init	= function(option){
		if(option == null){
			alert("Form option is not bound. form component init failed.");
			return;
		}
		option.param	= private_func.default_param(option.param);
		var formObj		= option.form;
		var initArray	= private_func.parseInit(option.init);

		var callback	= private_func.parseCallback($(option.form).attr(attr_options.callback));
		var bind		= private_func.parseBind($(option.form).attr(attr_options.bind));
		option.pageInfo	= private_func.parsePage($(option.form).attr(attr_options.page));
		if(option.pageInfo != null && option.pageInfo["pageId"] != null){
			$.extend(option.param.body.request, option.pageInfo);
			window.component.page.init({
				lines:option.pageInfo["lines"]
				,block:option.pageInfo["block"]
				,id:option.pageInfo["pageId"]
			});
		}

		var afterProcess	= null;
		$(formObj).append("<input type=\"hidden\" name=\"FORM_REQUEST\" />");

		//화면 이동전송
		if(initArray["view"]){
			var delayParam	= false;
			$(formObj).bind("submit", function(){
				var service		= $(this).attr(attr_options.service);

				if(!delayParam){

					//기본 유효성 검사
					if (!window.component.input.validation(this)){
						//alert("유효성 검사 실패");
						return false;
					}

					//전송전 유효성검사 콜백처리
					if(callback["before"] != null && !private_func.invoke(callback["before"], [option])){
						return false;
					}

					//param init and merge
					//				$.extend(option.param.body.request, $(formObj).toJson());
					$.extend(option.param.body.request, window.component.input.toJson(formObj));

					option.param.body.request["CHANNEL"]	= _env.channel;

					//전송 파라미터 json으로 담기
					$(formObj).find("input[name=FORM_REQUEST]").val(JSON.stringify(option.param.body.request));

					//로딩 외부 api 연동
					if(!initArray["noprogress"]){
						window.mobile.showProgress(true);
					}

					//아이폰 로딩 보정
					if($(this).attr("target") != null && $(this).attr("target") != ""){
						return true;
					}else{
						setTimeout(function(){
							delayParam	= true;
							$(formObj).submit();
						}, 30);
					}
				}
				return delayParam;
			});
		}else if(initArray["popup"]){
			//윈도우 팝업
			$(formObj).attr("target", bind["popup"]);
			$(formObj).bind("submit", function(){
				if(bind["popup"] == null){
					alert("팝업 id가 설정되지 않았습니다.");
					return false;
				}
				//전송전 유효성검사 콜백처리
				if(private_func.invoke(callback["before"], [option]) == false){
					return false;
				}else{
					var popupOption	= "width=600, height=500, scrollbars=yes, menubar=no, location=no, resizable=no top=100,left=200";
					if($(formObj).attr(attr_options.option) != null && $(formObj).attr(attr_options.option) != ""){
						popupOption	= $(formObj).attr(attr_options.option);
					}
					var popup_id	= bind["popup"];
					var handle_id	= $(formObj).attr("id");
					var form_id	= $(formObj).attr("id");
					var action		= $(formObj).attr("action");
					action	= action.replaceAll(_env.contextPath, "");

					//부모 ID가 없으면 최초 부모창이다.
					if(_env.popupInfo.parent_id == ""){
						handle_id	= _env.popupInfo.handle_id;
					}
					var formParam	= $(formObj).toJson();
					var popupParam	= {
						meta:{
							handle_id:handle_id
							,popup_id:popup_id
							,form_id:form_id
							,url:action
							,option:popupOption
						}
						,"handle_id":handle_id
						,"popup_id":popup_id
						,"url":action
					};

					if(formParam != null){
						$.extend(popupParam, formParam);
					}
					//로딩 외부 api 연동
					if(!initArray["noprogress"]){
						window.mobile.showProgress(true);
					}
					return window.mobile.showPopup(popupParam, function(param){
						private_func.invoke(callback["success"], [param]);
					});
				}
				return false;
			});
		}
		//엑셀 다운로드
		else if(initArray["excel"]){
			$(formObj).append("<iframe style=\"display:none;\" name=\"_excel_frame\" ></iframe>");
			$(formObj).attr("action", _env.contextPath+"/excel/download/"+$(formObj).attr(attr_options.service));
			$(formObj).attr("method", "post");
			//$(formObj).attr("target", "_excel_frame");
			$(formObj).bind("submit", function(){
				//로딩 외부 api 연동
				if(!initArray["noprogress"]){
					window.mobile.showProgress(true);
				}
				var service		= $(this).attr(attr_options.service);
				var form_id		= $(this).attr("id");
				//기본 유효성 검사
				if (!window.component.input.validation(this)){
					//alert("유효성 검사 실패");
					return false;
				}
				$.extend(option.param.body.request, window.component.input.toJson(formObj));

				//전송전 유효성검사 콜백처리
				if(callback["before"] != null && !private_func.invoke(callback["before"], [option])){
					window.mobile.showProgress(false);
					return false;
				}

				//프레임워크 공통부 셋팅
				option.param.header["CHANNEL"]	= _env.channel+"_SERVICE";

				//전송 파라미터 json으로 담기
				$(formObj).find("input[name=FORM_REQUEST]").val(JSON.stringify(option.param.body.request));

				return true;
			});
		}else{
			//ajax type 전송
			$(formObj).bind("submit", function(){
				//로딩 외부 api 연동
				var service		= $(this).attr(attr_options.service);
				var form_id		= $(this).attr("id");
				//기본 유효성 검사
				if (!window.component.input.validation(this)){
					//alert("유효성 검사 실패");
					return false;
				}

				//param init and merge
//				$.extend(option.param.body.request, $(formObj).toJson());
				$.extend(option.param.body.request, window.component.input.toJson(formObj));

				//바인딩된 그리드가 있으면 그리드 데이터 머지
				$("table[data-component]").each(function(idx, elem){
					var gridId	= $(elem).attr("id");
					var fromGrid	= $(elem).attr("data-bind");
					if(fromGrid != null && fromGrid != ""){
						var formInfo	= fromGrid.split(":");
						var formId		= "";
						var dataType	= "T";
						if(formInfo != null && formInfo.length == 1){
							formId		= formInfo[0];
							dataType	= "T";
						}else if(formInfo != null && formInfo.length == 2){
							formId		= formInfo[0];
							dataType	= formInfo[1];
						}else{
							alert("데이터가 바인딩된 테이블의 바인드 폼 정보가 잘못되었습니다.");
							return;
						}
						if(formId == form_id){	//나에게 바인딩된 테이블
							option.param.body.request[gridId]	= $("#"+gridId).getGridTransactionData();
							return;
						}
					}
				});

				//전송전 유효성검사 콜백처리
				if(callback["before"] != null && !private_func.invoke(callback["before"], [option])){
					window.mobile.showProgress(false);
					return false;
				}

				if(!initArray["noprogress"]){
					window.mobile.showProgress(true);
				}

				//프레임워크 공통부 셋팅
				option.param.header["CHANNEL"]	= _env.channel+"_SERVICE";
				if(bind["grid"] != null){
					$("#"+bind["grid"]).setGridInit();
				}
				//ajax 전송
				window.transaction.json({
					service:service
					,header:option.param.header
					,request:option.param.body.request
					,success:function(body, data){
						if(data["body"]["response"]["errCode"]){
							var errorCode	= body["response"]["errCode"];
							var errorMsg	= body["response"]["errHelpMessage"];

							mobile.showProgress(false);

							if(callback["error"]){
								private_func.invoke(callback["error"], [errorCode, errorMsg]);
								return;
							}
							if(errorCode !== "WEB_SECU_INVALID_SESSION" && errorCode !== "SYS00009"){
								alert(errorMsg);
							}else{
								alert("로그인 세션이 만료되었습니다.");
								location.href="/home2/main/native_session_timeout"
							}
							return;
						}

						if(data["common"] != null && data["common"]["FRAMEWORK_SUCCESS"] == "N"){
							var errorCode	= data["header"]["RESULT_CODE"];
							var errorMsg	= data["header"]["RESULT_MSG"];
							alert(errorMsg)
							return;
						}
						var dataKey	= service;
						if(bind["grid"] != null){
							if(bind["data"] != null) dataKey	= bind["data"];
							if(bind["clear"] == null || bind["clear"] == "true") $("#"+bind["grid"]).clearData();
							if(body["response"][dataKey] != null && body["response"][dataKey].length > 0){
								$("#"+bind["grid"]).addData(body["response"][dataKey]);
							}else{
								$("#"+bind["grid"]).clearData();
							}

							if(body.request["pageId"] != null && option.pageInfo["totalKey"] != null && body.response[option.pageInfo["totalKey"]] != null){
								window.component.page.draw(option.pageInfo["pageId"], form_id, Number(body.request["page"]), Number(body.response[option.pageInfo["totalKey"]]));
							}
						}
						if(bind["field"] != null){
							if(bind["data"] != null) dataKey	= bind["data"];
							if(bind["clear"] == null || bind["clear"] == "true") $("#"+bind["field"]).clearField();
							$("#"+bind["field"]).bindFieldFromMap(attr_options.bindField,body["response"][dataKey]);
						}
						if(bind["select"] != null){
							window.component.select.setData(bind["select"], body["response"][dataKey]);
						}
						setTimeout(function(){
							if(!initArray["noprogress"]){
								window.mobile.showProgress(false);
							}
						}, 500);
						private_func.invoke(callback["success"], [body, data]);
					}
					,error:function(errorResult,errorType,errorDetail){
//						errorResult.readyState
//						0: request not initialized
//						1: server connection established
//						2: request received
//						3: processing request
//						4: request finished and response is ready
						var errorCode="SYS99999";
						//var errorMsg="일시적으로 네트워크가 불안하오니 인터넷 연결상태를 확인해 주세요.\n";
						var errorMsg="오류가 발생하였습니다. 잠시 후 재시도 해주세요.\n";
						if(errorResult != null && errorResult.readyState == 4){	//서버로부터 응답 & 정상에러
							if(errorResult.status == 200 || errorResult.status == 500){
								var errorResponse	= JSON.parse(errorResult.responseText);
								errorCode	= errorResponse["body"]["response"]["errCode"];
								errorMsg	= errorResponse["body"]["response"]["errHelpMessage"];
							}
						}
						if(!initArray["noprogress"]){
							mobile.showProgress(false);
						}
						if(errorCode !== "WEB_SECU_INVALID_SESSION" && errorCode !== "SYS00009"){
							alert(errorMsg);
						}
						private_func.invoke(callback["error"], [errorCode, errorMsg]);
						if(errorCode == "WEB_SECU_INVALID_SESSION"){
							$("#CommonSessionValidForm").submit();
						}
						if(errorCode == "SYS00009"){
							alert(errorMsg);
							$("#CommonSessionValidForm").submit();
						}
					}
				});
				//ajax 전송을 위해 폼 전송은 막기
				return false;
			});
		}

		//최초 전송여부
		if(initArray["onload"]){
			afterProcess	= function(){
				$(formObj).submit();
			};
		}
		if(initArray["eventSet"] != null && initArray["eventSet"].length > 0){
			for ( var i=0;i<initArray["eventSet"].length;i++) {
				$("#"+initArray["eventSet"][i]).bind("click", function(){
					public_func.setPage($(formObj).attr("id"), {
						"page":"0"
					});
					$(formObj).submit();
				});
			}
		}
		var formId		= $(option.form).attr("id");
		public_func.object[formId]	= option;
		return afterProcess;
	}

	public_func.setService	= function(formId, service){
		var formoption	= public_func.object[formId];
		if(formoption != null){
			$("#"+formId).attr(attr_options.service, service);
		}
	}
	public_func.setPage	= function(formId, option){
		var formoption	= public_func.object[formId];
		if (option){
			$.extend(formoption.pageInfo, option);
			$.extend(formoption.param.body.request, formoption.pageInfo);
		}
		window.component.page.setOption(formoption.pageInfo["pageId"], formoption.pageInfo);
	}
	public_func.getPage= function(formId){
		var formoption	= public_func.object[formId];
		if (formoption != null && formoption.param.body.request.page != null){
			return formoption.param.body.request.page;
		}
		return -1;
	}

	window.component.form	= public_func;
}());