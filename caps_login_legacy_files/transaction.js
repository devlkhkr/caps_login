(function(){
	var public_func		= {};
	
	public_func.json	= function(option){
		var param	= {
			common:{}
			,header:{}
			,body:{
				request:{}
				,response:{}
			}
			,tail:{}
		}
		if(option == null){
			option	= {};
		}
		if(option.common != null) param.common			= option.common;
		if(option.header != null) param.header			= option.header;
		if(option.request != null) param.body.request	= option.request;
		if(option.response != null) param.body.response	= option.response;
		if(option.tail != null) param.tail				= option.tail;
		
		if(option.service == null || option.service == ""){
			alert("서비스 파라미터가 없습니다.");
			return;
		}
		//ajax 전송
		var header	= {
			'Cache-Control': 'max-age=123'
		}
		if(window._env.access_token != ""){
			header["Authorization"]	= "Bearer "+window._env.access_token; 
		}
		
		$.ajax({
			type: "post",
			dataType: "json",
			async: true,
			cache: true,
			crossDomain: true,
		    headers: header,
			url: window._env.contextDomain+window._env.contextPath+window._env.transPath+param.header["CHANNEL"]+"."+option.service,
			contentType: "application/json;charset=utf-8", 
			data: JSON.stringify(param),
			timeout:60000,
			success: function(data){
				if(option != null && option.success != null){
					option.success(data.body, data);
				}
			},
			error:function(a,b,c){
				if(option != null && option.error != null){
					option.error(a,b,c);
				}
			}
		});
	}
	
	window.transaction	= public_func;
}());