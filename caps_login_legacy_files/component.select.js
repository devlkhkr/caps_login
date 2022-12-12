/**
 * 폼 스크립트 컴포넌트.
 * 모듈 바인딩:window.component.form;
 */
(function(){

	var attr_options	= {
		callback:"data-callback"
		,bind:"data-bind"
		,bindField:"data-col"
	};
	
	var public_func		= {
		$:{}
		,object:{}
	};
	//private 오브젝트는 외부로 노출되지 않는 내부용 함수 pack 이다.
	var private_func	= {
		//form의 init 문자열의 원형
		attr_maps:function(){
			return {"onload":false, "view":false};
		}
		//form의 callback attr 의 파싱
		,parseCallback:function(init){
			var initArr		= {change:null};
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
			var initArr		= {form:null,data:null};
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
		,parseCol:function(init){
			var initArr		= {value:"val",text:"text"};
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
		//form의 callback type 은 최초 문자열 파라미터기 때문에 이를 함수로 호출해준다. 
		,invoke:function(func_name, p){
			if(func_name != null && func_name != ""){
				try{
					return eval(func_name+".apply(null, p)")
				}catch(e){
					//alert(e);
				}
			}
			return null;
		}
	};
	
	/**
	 * 외부 노출 함수
	 * 폼 객체가 ajax 혹은 view 타입으로 데이터를 주고 받는 컴포넌트로 동작하도록 
	 * 초기화 함.
	 */
	public_func.init	= function(option){
		if(option == null){
			alert("Form option is not bound. select component init failed.");
			return;
		}
		var selectObj	= option.object;
		var id			= $(selectObj).attr("id");
		option.initHtml	= $(selectObj).html();
		
		var callback	= private_func.parseCallback($(option.object).attr(attr_options.callback));
		var bind		= private_func.parseBind($(option.object).attr(attr_options.bind));
		var col			= private_func.parseCol($(option.object).attr(attr_options.bindField));
		option.col		= col;
		if(callback["change"] != null){
			$(selectObj).bind("change", function(){
				var text	= $(selectObj).find("option[value="+$(selectObj).val()+"]").text();
				var row	= null;
				if(option.data != null && option.data.length > 0){
					for(var i=0;i<option.data.length;i++){
						if(option.data[i][col["value"]] == $(selectObj).val()){
							row = option.data[i];
							break;
						}
					}
				}
				
				var ret	= private_func.invoke(callback["change"], [$(selectObj).val(), text, option, row]);
				if(ret == null || ret == true){
					//$("#"+bind["form"]).submit();
				}
			});
		}

		public_func.$[id]		= $(selectObj);
		public_func.object[id]	= option;
	}
	
	/**
	 * 데이터 셋팅
	 */
	public_func.setData	= function(id, data){
		var option	= public_func.object[id];
		if(data != null && data.length > 0){
			for(var i=0;i<data.length;i++){
				data[id+"idx"]		= i;
				data[id+"view"]	= true;
			}
			option.data	= data;
			public_func.drawData(id);
		}
	};
	public_func.getData	= function(id){
		var option	= public_func.object[id];
		if(option != null && option.data != null){
			return option.data;
		}
	};
	public_func.getRow = function(id, idx) {
		var option	= public_func.object[id];
		if(option != null && option.data != null){
			return option.data[idx];
		}
		return null;
	};
	/**
	 * 데이터 표현
	 */
	public_func.drawData	= function(id){
		var option	= public_func.object[id];
		var html	= option.initHtml;
		var data	= option.data;
		if(data != null){
			var col		= private_func.parseCol(public_func.$[id].attr(attr_options.bindField));
			for(var i=0;i<data.length;i++){
				if(data[i][id+"view"] == null || data[i][id+"view"] == true){
					html	+= "<option value='"+data[i][col["value"]]+"'>"+data[i][col["text"]]+"</option>";
				}
			}
		}
		public_func.$[id].html(html);
	};
	/**
	 * 임의숨김
	 */
	public_func.hide	= function(id, hideIdx){
		var option	= public_func.object[id];
		var data	= option.data;
		if(data != null && data.length > 0){
			for(var i=0;i<data.length;i++){
				data[i][id+"view"]	= true;
			}
			
			for(var i=0;i<hideIdx.length;i++){
				if(data[hideIdx[i]] != null){
					data[hideIdx[i]][id+"view"]	= false;
				}
			}
			option.data	= data;
			public_func.drawData(id);
		}
	};
	
	window.component.select	= public_func;
}());