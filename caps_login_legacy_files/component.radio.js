/**
 * input 스크립트 컴포넌트.
 * 모듈 바인딩:window.component.input;
 */
(function(){

	var attr_options	= {
		rule:"data-component"
	};
	
	var public_func		= {
		object:[]
		,$id:{}
	};
	
	//private 오브젝트는 외부로 노출되지 않는 내부용 함수 pack 이다.
	var private_func	= {
		attr_maps:function(){
				//select:연계된 데이터로 미리 선택을 해 준다, 없으면 선택 안함
				return {"select":false, "eventSet":[]};
			}
		//validation의 init 문자열의 파싱
		, parseInit:function(init){
			var initArr		= private_func.attr_maps();
			var initSplit	= [];
			if(init != null && init != ""){
				if(init.split(" ") != null){
					initSplit	= init.split(" "); 
				}
			}
			if(initSplit != null){
				for(var i=0;i<initSplit.length;i++){
					//select 등은 기본 설정셋에 존재하고 버튼 아이디 등은 존재하지 않으므로 이벤트 대상이다.
					if(initArr[initSplit[i]] != null){
						initArr[initSplit[i]]	= true;
					}else{
						initArr["eventSet"].push(initSplit[i]);
					}
				}
			}
			return initArr;
		}
		
	};
	
	/**
	 * 외부 노출 함수
	 * input 컴포넌트의 validate가 동작하도록 
	 * 초기화 함.
	 */
	public_func.init	= function(option){
		if(option == null){
			alert("radio option is not bound. input component init failed.");
			return;
		}
		
		var obj = option.object;
		if($(obj).attr("id") == null || $(obj).attr("id") == ""){
			$(obj).attr("id", $(obj).attr("name"));
		}
		if(public_func.$id[$(obj).attr("id")] != null){
			return;
		}
		
		var initArray = private_func.parseInit($(obj).attr(attr_options.rule));
		option.initArray	= initArray;
		
		//먼저 선택 해줄 경우
		if(initArray["select"]){
			if(initArray["eventSet"] != null && initArray["eventSet"].length > 0){
				var val	= $("#"+initArray["eventSet"][0]).val();
				$("input[name="+$(obj).attr("name")+"]").each(function(idx, elem){
					if($(elem).val() == val){
						$(elem).prop("checked", "checked");
					}
				});
			}
		}
		$("input[name="+$(obj).attr("name")+"]").bind("click", function(){
			if(initArray["eventSet"] != null && initArray["eventSet"].length > 0){
				for(var i=0;i<initArray["eventSet"].length;i++){
					$("#"+initArray["eventSet"][i]).val($(this).val());
					$("input[name="+initArray["eventSet"][i]+"]").val($(this).val());
				}
			}
		});

		public_func.$id[$(obj).attr("id")]	= option;
		public_func.object.push(option);
	}
	
	window.component.radio	= public_func;
}());