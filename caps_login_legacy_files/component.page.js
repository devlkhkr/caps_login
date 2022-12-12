/**
 * 폼 스크립트 컴포넌트.
 * 모듈 바인딩:window.component.form;
 */
(function(){

	var attr_options	= {
		callback:"data-callback"
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
			var initArr		= {before:null};
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
		var id			= option.id;
		var pageObj		= $("#"+id);
		var callback	= private_func.parseCallback($(pageObj).attr(attr_options.callback));
		var formSubmit	= function(formId, page){
			if(callback.before == null || callback.before(option)){
				var formOpt	= window.component.form.getOption(formId);
				if(formOpt != null && formOpt.param.body.request.page != null){
					formOpt.param.body.request.page = page;
					formOpt.pageInfo.page = page;
				}
				$("#"+formId).submit();
			}
		};
		window[id+"_submit"]	= formSubmit;
		
		public_func.$[id]		= $(pageObj);
		public_func.object[id]	= option;
	}
	public_func.setOption	= function(id, option){
		var pOption	= public_func.object[id];
		if(pOption != null){
			if (option != null){
				$.extend(pOption, option);
			}
		}else{
			public_func.init(option);
		}
	}
	public_func.getOption	= function(id){
		var pOption	= public_func.object[id];
		return pOption;
	}
	/**
	 * id			page id
	 * currPage		현재 페이지
	 * block		페이지 표시갯수
	 * lines		한페이지 표현 갯수
	 * total		게시물 총 갯수
	 */
	public_func.draw	= function(id, formId, currPage, total){
		var pageGroupStart 	= 0;		// 페이지 리스트 시작 번호
		var pageGroupEnd 	= 0;		// 페이지 리스트 끝 번호
		var pageCount 		= 0;		// 실제 표시될 페이지 리스트 수
		var pageHtml		= "";
		var option			= public_func.object[id];
		var lines	= Number(option.lines);
		var block	= Number(option.block);
		currPage	= Number(currPage);
		
		pageCount = Math.floor(total / lines);
		if(pageCount < 0){
			pageCount = 0;
		}
		if(total > lines && total % lines > 0){
			pageCount++;
		}
		option.pageCount = pageCount;
		pageGroupStart = currPage - (block/2);
		
		if (pageGroupStart < 0) {
			pageGroupStart = 0;
		}
		pageGroupEnd = pageGroupStart + Number(block);
		
		if (pageGroupEnd > pageCount) {
			pageGroupEnd = pageCount;
		}

		var hasPreviousPage = currPage == 0?false:true;
		var hasNextPage = currPage >= (pageGroupEnd-1)?false:true;
		var page_event	= "#none;"
		//이전페이지
		if (hasPreviousPage) {
			//<a href='#page_event#' class=\"pbtn prev\"><span>이전 페이지</span></a>
			page_event	= "javascript:"+id+"_submit('"+formId+"',"+(currPage-1)+")";
			pageHtml	+= _env.page.template.prev.replaceAll("#page_event#", page_event);
		}
		
		// 라벨 [페이지번호]
		//<a href=\"#page_event#\" class=\"#cls#\" title=\"#title#\">%s</a>
		page_event	= "#none;"
		for (var i = pageGroupStart; i < pageGroupEnd; i++) {
			var cls	= "";
			if (i == currPage) {
				cls	= "on";
				page_event	= "#none;"
			} else {
				page_event	= "javascript:"+id+"_submit('"+formId+"',"+(i)+")";
			}
			var repeat	= _env.page.template.repeat.replaceAll("#page_event#", page_event);
			repeat		= repeat.replaceAll("#page#", (i+1));
			repeat		= repeat.replaceAll("#cls#", cls);
			pageHtml	+= repeat;
		}
		
		//다음 페이지
		page_event	= "#none;"
		if (hasNextPage) {
			//<a href='#page_event#' class=\"pbtn next\"><span>다음 페이지</span></a>
			page_event	= "javascript:"+id+"_submit('"+formId+"',"+(currPage+1)+")";
			pageHtml	+= _env.page.template.next.replaceAll("#page_event#", page_event);
		}
		
		pageHtml	= _env.page.template.outline.replaceAll("#content#", pageHtml);
		pageHtml	= pageHtml.replaceAll("#contextpath#", _env.contextPath);
		public_func.$[id].html(pageHtml);
		public_func.$[id].show();
	};
	
	window.component.page	= public_func;
}());