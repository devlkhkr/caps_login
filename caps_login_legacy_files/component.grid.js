/**
 * json 형태의 데이터를 ajax로 가져와서 콜벡에 연결해 주는 jquery 플러그인
 * 
 * ex) $("#formid").gridLoad({data:(json data)
 * 							   ,col:[	 {name:"json data의 컬럼명"}
 * 										,{name:"json data의 컬럼명2"}
 * 									]});
 */
(function($) {
	var attr_options	= {
		col:"data-col"
		,custom:"data-custom"
		,callback:"data-callback"
		,template:"data-template"
		,option:"data-option"
	};
	var private_func	= {
		//form의 callback type 은 최초 문자열 파라미터기 때문에 이를 함수로 호출해준다. 
		invoke:function(func_name, p){
			if(func_name != null && func_name != ""){
				try{
					return eval(func_name+".apply(null, p)")
				}catch(e){
					//alert(e);
				}
			}
		}
		,parseCallback:function(init){
			var initArr		= {dblclick:null,click:null};
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
		,parseOption:function(init){
			var initArr		= {flip:"true"};
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
	};
	var configMap	= new Array();
	/**======================== 테이블 그리드 초기화 및 보이기 ======================== */
	$.fn.gridLoad = function(settings) {
		var config = {
				data : null
				,col:{}
				,editCallback:{}
				,selectCustomMap:{}
				,viewAction:true
				,isTable:true
				,rowClick:null
				,rowDblClick:null
				,formId:""
				,template:""
				,filter_id:""
				,initString:""
				,statusColor:true
				,template_id:"tbody"
				,dataBackup:null
				,paging:false
				,startHtml:"데이터를 조회중 입니다."
				,emptyHtml:"데이터가 존재하지 않습니다."
				,columnCount:0
				,align:null
				,showFlip:true
			};
		if (settings){
			$.extend(config, settings);
		}

		var callback	= private_func.parseCallback($(this).attr(attr_options.callback));
		var option	= private_func.parseOption($(this).attr(attr_options.option));
		
		if(option["flip"] == "false"){
			config.showFlip	= false;
		}
		
		if(callback["click"] != null){
			config.rowClick		= function(i, data){
				private_func.invoke(callback["click"], [i, data]);
			}
		}
		if(callback["dblclick"] != null){
			config.rowDblClick		= function(i, data){
				private_func.invoke(callback["dblclick"], [i, data]);
			}
		}
		
		//초기화가 처음이 아니면 취소
		if(configMap[$(this).attr("id")] != null){
			return $(this);
		}
		
		config.formId	= $(this).attr("id");
		configMap[$(this).attr("id")]	= config;

		//템플릿 백업영역 동적생성
		$(document.body).append("<div id='"+$(this).attr("id")+"_template_area' style='display:none'></div>");
		
		if(!config.isTable){
			config.template_id	= "["+attr_options.template+"]";
			config.template	= $("#"+$(this).attr("id")+" "+config.template_id).html();
			$("#"+$(this).attr("id")+" "+config.template_id).addClass("component");

			config.emptyHtml	= "<ul><li><p class='init_area'>"+config.emptyHtml+"</p></li></ul>";
			config.startHtml	= "<ul><li><p class='init_area'>"+config.startHtml+"</p></li></ul>";
			if(config.initString != ""){
				config.initString	= "<li><p class='init_area'>"+config.initString+"</p></li>";
			}
		}else{
			config.template	= $("#"+$(this).attr("id")+" "+config.template_id).html();

			//조회중 셋팅.
			config.columnCount	= $("#"+$(this).attr("id")+" thead th").length;

			config.emptyHtml	= "<tr><td style='text-align:center' colspan='"+config.columnCount+"'>"+config.emptyHtml+"</td></tr>";
			config.startHtml	= "<tr><td style='text-align:center' colspan='"+config.columnCount+"'>"+config.startHtml+"</td></tr>";
			if(config.initString != ""){
				config.initString	= "<tr><td style='text-align:center' colspan='"+config.columnCount+"'>"+config.initString+"</td></tr>";
			}
		}
		
		$("#"+$(this).attr("id")+"_template_area").html(config.template);
		
		
		//컬럼 기본정보 셋팅
		if(config.data != null && config.data.length > 0){
			//인코딩을 뒤집어 준다.
			for(var i=0;i<config.data.length;i++){
				if(config.data[i] != null){
					//config.data[i]	= jQuery.parseJSON(decodeURIComponent(JSON.stringify(config.data[i])));
					config.data[i]["status"]	= "R";	//조회된 상태
					config.data[i]["selected"]	= "N";	//선택된 상태
					config.data[i]["view"]		= true;	//row 데이터 모두 보임
					config.data[i]["name"]		= "";	//컬럼이름
					config.data[i]["paging"]		= config.paging;	//페이징여부
				}
			}
		}
		$(this).displayRow();
		if(config.data == null){
			if(config.initString != ""){
				$("#"+$(this).attr("id")+" "+config.template_id).html(config.initString);
			}else{
				$("#"+$(this).attr("id")+" "+config.template_id).html(config.startHtml);
			}
			if(config.showFlip){
				$("#"+$(this).attr("id")+" "+config.template_id).show();
			}
		}
		
		//필터 적용
		$(this).setGridFilter(config.filter_id);
		return $(this);
	};
	//입력된 데이터를 기준으로 테이블 데이터를 그린다
	$.fn.setGridOption = function(key, val) {
		var config	= configMap[$(this).attr("id")];
		if(config != null){
			config[key]	= val;
		}
		return $(this);
	};
	$.fn.setGridInit = function() {
		var config	= configMap[$(this).attr("id")];
		if(config != null && config.data != null && config.data.length > 0 ){
		}else{
			$("#"+$(this).attr("id")+" "+config.template_id).html(config.startHtml);
		}
		return $(this);
	};
	$.fn.selectControl = function(key, func) {
		var config	= configMap[$(this).attr("id")];
		if(config != null){
			config.selectCustomMap[key]	= func;
		}
		return $(this);
	};
	$.fn.alignGridData	= function(sorTypeNum, data, col){
		if(data == null){
			return data;
		}
		if (sorTypeNum) {
			data.sort(function(a, b) {
				var sortVal	= 0;
				try {
					var aVal	= String(a[col]).decode().replaceAll(",", "");
					var bVal	= String(b[col]).decode().replaceAll(",", "");
					sortVal	= Number(bVal) - Number(aVal);
				} catch (e) {
				}
				return sortVal;
			});
		}else{
			data.sort(function(a,b){
				var sortVal	= 0;
				try {
					var aVal	= String(a[col]).decode();
					var bVal	= String(b[col]).decode();
					sortVal	= Number(bVal) - Number(aVal);
					if (aVal < bVal)
						sortVal	= 1;
					else if (aVal == bVal)
						sortVal	= 0;
					else
						sortVal	= -1;
				} catch (e) {
				}
				return sortVal;
			});
		}
		return data;
	};
	//컬럼헤더 정렬이벥트
	$.fn.setAlignGridEvent = function(up_btn, down_btn, target) {
		var config	= configMap[$(this).attr("id")];
		if(config != null){
			var that	= $(this);
			var eventTarget	= that;
			if(target != null){
				eventTarget	= $(target);
			}
			$(eventTarget).find("th").each(function(idx, elem){
				var eventObj	= elem;
				var col	= $(elem).attr(attr_options.col);
				if(eventObj != null && col != null && col != ""){
					var align_up	= $(elem).find(up_btn);
					var align_down	= $(elem).find(down_btn);
					$(eventObj).css("cursor", "pointer");
					$(eventObj).bind("click", function(){
						var data	= $(that).alignGridData($(this).hasClass("sort_num"), config.data, col);
						//현재 오름차순정렬
						if($(align_up).is(":visible")){
							//내림차순으로
							$(align_up).hide();
							$(align_down).show();
							
						}else{
							//오름차순으로
							$(align_down).hide();
							$(align_up).show();
							data.reverse();
						}
						config.data	= data;
						that.displayRow();
					});
				}
			});
		}
		return $(this);
	};
	//입력된 데이터를 기준으로 테이블 데이터를 그린다
	$.fn.setGridFilter = function(id) {
		var config	= configMap[$(this).attr("id")];
		config.filter_id	= id;
		var that	= $(this);
		if(config.filter_id != ""){
			$("#"+config.filter_id).bind("keyup", function(){
				for(var i=0;i<config.data.length;i++){
					var row	= config.data[i];
					var filter_string	= row["filter_string"];
					if($(this).val() == "" || (filter_string != null && filter_string.indexOf($(this).val()) > 0)){
						row["view"]	= true;
					}else{
						row["view"]	= false;
					}
				}
				that.displayRow();
			});
		}
		return $(this);
	};
	//입력된 데이터를 기준으로 테이블 데이터를 그린다
	$.fn.colCustom = function(key, func) {
		var config	= configMap[$(this).attr("id")];
		var colConfig = {
				link_func:null
			};
		if(config.col[key] == null){
			config.col[key]	= {};
		}else{
			$.extend(config.col[key], colConfig);
		}
		config.col[key]["link_func"]	= func;
	};
	//수정된 데이터 성공 콜백
	$.fn.addOnEditSuccess = function(col, func) {
		var config	= configMap[$(this).attr("id")];
		var colConfig = {
				success:func
		};
		if(config.editCallback[col] != null){
			colConfig	= config.editCallback[col];
			colConfig["success"]	= func;
		}
		config.editCallback[col]	= colConfig;
	};
	//입력된 데이터를 기준으로 테이블 데이터를 그린다
	$.fn.displayRow = function() {
		var config	= configMap[$(this).attr("id")];
		if(config != null){
			if(config.isTable){
				colStr($(this).attr("id"));
			}else{
				templateStr($(this).attr("id"));
			}
		}
	};
	//해당 Col 의 데이터로 추출한 배열을 돌려준다.
	$.fn.getDataArray = function(col) {
		var config	= configMap[$(this).attr("id")];
		var arr	= new Array();
		if(config.data != null && config.data.length > 0){
			for(var i=0;i<config.data.length;i++){
				if(config.data[i] != null){
					arr.push(config.data[i][col]);
				}
			}
		}
		return arr;
	};
	//선택된 데이터를 찾아서 돌려준다
	$.fn.getSelectedData = function() {
		var config	= configMap[$(this).attr("id")];
		if(config.data != null && config.data.length > config.selectedIndex){
			return config.data[config.selectedIndex];
		}
		return null;
	};

	//선택된 데이터를 찾아서 돌려준다
	$.fn.getSelectedIndex = function() {
		var config	= configMap[$(this).attr("id")];
		return config.selectedIndex;
	};
	
	//선택된 데이터를 찾아서 삭제상태로 변경한다.
	$.fn.removeSelectedData = function() {
		var config	= configMap[$(this).attr("id")];
		if(config.data != null && config.data.length > config.selectedIndex){
			var delRow	= config.data[config.selectedIndex];
			if(delRow != null){
				if(config.data[config.selectedIndex]["status"] == "I"){
					config.data	= config.data.remove(config.selectedIndex);
					
				}else if(config.data[config.selectedIndex]["status"] == "U" || config.data[config.selectedIndex]["status"] == "R"){
					config.data[config.selectedIndex]["status"]	= "D";
					var tmpRoot	= $(this).find(config.template_id);
					if(config.data[idx]["grid_tr_element"] != null){
						var trElem	= tmpRoot.find(config.data[idx]["grid_tr_element"]);
						trElem.removeClass("grid_tr_delete");
						trElem.addClass("grid_tr_delete");
					}
				}
				
				config.selectedIndex	= -1;
				$(this).displayRow();
			}
			return delRow;
		}
		return null;
	};
	//입력된 데이터를 기준으로 테이블 데이터를 그린다
	$.fn.clearData = function() {
		var config	= configMap[$(this).attr("id")];
		config.data	= null;
		config.selectedIndex	= -1;
		$(this).displayRow();
	};
	//입력된 데이터를 기존의 데이터에 추가한다.
	$.fn.addData = function(data) {
		var config	= configMap[$(this).attr("id")];
		try{
			//컬럼 기본정보 셋팅
			var dataCnt	= 0;
			if(config != null && data != null && data.length > 0){
				if(config.data != null){
					dataCnt	= config.data.length;
					for(var i=0;i<data.length;i++){
						if(data[i] != null){
							data[i]["status"]	= "R";	//조회된 상태
							data[i]["selected"]	= "N";	//선택된 상태
							data[i]["view"]		= true;	//row 데이터 모두 보임
							data[i]["name"]		= "";
							config.data.push(data[i]);
						}
					}
				}else{
					for(var i=0;i<data.length;i++){
						if(data[i] != null){
							data[i]["status"]	= "R";	//조회된 상태
							data[i]["selected"]	= "N";	//선택된 상태
							data[i]["view"]		= true;	//row 데이터 모두 보임
							data[i]["name"]		= "";
						}
					}
					config.data	= data;
				}
			}
			$(this).displayRow();
		}catch(e){
			alert("component.grid.addData() error-"+e);
		}
	};
	$.fn.addRow = function(data) {
		var config	= configMap[$(this).attr("id")];
		try{
			if(data != null ){
			}else{
				data	= {};
			}
			data["status"]		= "I";	//새로 입력된 상태
			data["selected"]	= "N";	//선택된 상태
			data["view"]		= true;	//row 데이터 모두 보임
			data["name"]		= "";
			
			//컬럼 기본정보 셋팅
			if(config.data != null && config.data.length > 0){
				config.data.push(data);
			}else{
				config.data	= [];
				config.data.push(data);
			}
			$(this).displayRow();
			$(this).scrollToIndex(config.data.length-1);
		}catch(e){
			alert("component.grid.addData() error-"+e);
		}
		return data;
	};
	$.fn.scrollToIndex = function(idx) {
		$(this).parent().scrollTop($(this).find("tr:nth-child("+(idx+1)+")").height()*idx);
	};
	$.fn.scrollToPosition = function(pos) {
		$(this).parent().scrollTop(pos);
	};
	$.fn.getScrollTop = function() {
		return $(this).parent().scrollTop();
	};
	$.fn.removeGridData = function(idx) {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length >= idx){
				if(config.data[idx]["status"] == "I"){
					config.data	= config.data.remove(idx);
					config.selectedIndex	= -1;
					
				}else if(config.data[idx]["status"] == "U" || config.data[idx]["status"] == "R"){
					config.data[idx]["status"]	= "D";
					var tmpRoot	= $(this).find(config.template_id);
					if(config.data[idx]["grid_tr_element"] != null){
						var trElem	= tmpRoot.find(config.data[idx]["grid_tr_element"]);
						trElem.removeClass("grid_tr_delete");
						trElem.addClass("grid_tr_delete");
					}
				}
				$(this).displayRow();
			}
		}catch(e){
			alert("component.grid.removeData() error-"+e);
		}
	};
	//데이터를 완전 제거한다.
	$.fn.deleteData = function(idx) {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length > idx){
				config.data	= config.data.remove(idx);
				$(this).displayRow();
			}
		}catch(e){
			alert("component.grid.removeData() error-"+e);
		}
	};
	$.fn.dataToJson = function() {
		var config	= configMap[$(this).attr("id")];
		var dataStr	= "";
		try{
			//컬럼 기본정보 셋팅
			if(config.data != null && config.data.length > 0){
				dataStr	= JSON.stringify(config.data);
			}
		}catch(e){
			alert("component.grid.removeData() error-"+e);
		}
		return dataStr;
	};
	$.fn.getDataCount = function() {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length > 0){
				return config.data.length;
			}
		}catch(e){
			alert("component.grid.getDataCount() error-"+e);
		}
		return 0;
	};
	$.fn.getData = function() {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length > 0){
				return config.data;
			}
		}catch(e){
			alert("component.grid.getData() error-"+e);
		}
		return null;
	};
	$.fn.getRow = function(idx) {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length > idx ){
				return config.data[idx];
			}
		}catch(e){
			alert("component.grid.getRow() error-"+e);
		}
		return null;
	};
	$.fn.searchData = function(col, val) {
		var config	= configMap[$(this).attr("id")];
		var searchData	= null;
		try{
			if(config.data != null && config.data.length > 0 ){
				searchData	= [];
				for ( var i=0;i<config.data.length;i++) {
					var row	= config.data[i];
					if(row != null && row[col] && row[col] == val){
						searchData.push(row);
					}
				}
			}
		}catch(e){
			alert("component.grid.searchData() error-"+e);
		}
		return searchData;
	};
	$.fn.searchRow = function(col, val) {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length > 0 ){
				for ( var i=0;i<config.data.length;i++) {
					var row	= config.data[i];
					if(row != null && row[col] && row[col] == val){
						return row;
					}
				}
			}
		}catch(e){
			alert("component.grid.searchRow() error-"+e);
		}
		return null;
	};
	$.fn.getGridTransactionData = function() {
		var config	= configMap[$(this).attr("id")];
		var transData	= [];
		try{
			if(config.data != null && config.data.length > 0){
				for(var i=0;i<config.data.length;i++){
					if(config.data[i]["status"] != "R"){
						transData.push(config.data[i]);
					}
				}
				if(transData != null){
					for ( var idx in transData) {
						var row	= transData[idx];
						for ( var idx2 in row) {
							var val	= row[idx2];
							if(val	== null ||  String(val).toLowerCase() == "null"){
								row[idx2]	= "";
							}
						}
					}
				}
			}
		}catch(e){
			alert("component.grid.getGridTransactionData() error-"+e);
		}
		return transData;
	};
	$.fn.updateDataField = function(idx, key, val) {
		var config	= configMap[$(this).attr("id")];
		try{
			if(config.data != null && config.data.length >= idx){
				config.data[idx][key]	= val;
				if(config.data[idx]["status"] != "I" && config.data[idx]["status"] != "D"){
					config.data[idx]["status"]	= "U";
					if(config.data[idx]["grid_tr_element"] != null){
						var trElem	= $(this).find(config.template_id+" "+config.data[idx]["grid_tr_element"]);
						trElem.removeClass("grid_tr_update");
						trElem.addClass("grid_tr_update");
					}
				}
				$(this).displayRow();
			}
		}catch(e){
			alert("component.grid.updateDataField() error-"+e);
		}
	};
	$.fn.getCheckList = function(key) {
		var config		= configMap[$(this).attr("id")];
		var listData	= [];
		try{
			if(config.data != null && config.data.length > 0){
				$(this).find(config.template_id+" input[name="+key+"]").each(function(idx, elem){
					listData.push(config.data[$(elem).val()]);
				});
			}
		}catch(e){
			alert("component.grid.getCheckList() error-"+e);
		}
		return listData;
	};
	/**======================== //테이블 그리드 초기화 및 보이기 ======================== */
	
	var colStr	= function(formId){
		var config		= configMap[formId];
		var html	= "";
		if(config.data != null && config.data.length > 0){
			var tmpRoot	= $("#"+formId).find(config.template_id);
			//데이터 루프를 돌며 일단 html 을 만들어 둔다.
			for(var i=0;i<config.data.length;i++){
				var template	= config.template;
				if(template != null && template != ""){
					var row	= config.data[i];
					row["index_no"]		= i;
					row["index_vno"]	= i+1;
					for(var key in row){
						var val		= row[key];
						if(config.col[key] != null && config.col[key]["link_func"] != null){
							val	= config.col[key]["link_func"](i, row);
						}else{
							val			= String(val).decode().replaceAll("null", "");
						}
						template	= template.replaceAll("#"+key+"#", val);
					}
					html	+= template; 
				}	//template null if
			}	// data for
			tmpRoot.html(html);
			
			//데이터 루프로 만들어진 내용물에 데이터를 채워 준다.
			for(var i=0;i<config.data.length;i++){
				var row	= config.data[i];
				row["grid_tr_element"]	= "tr:nth-child("+(i+1)+")";

				if(config.statusColor){
					if(row["status"] == "U"){
						tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_update");
					}else if(row["status"] == "I"){
						tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_insert");
					}else if(row["status"] == "D"){
						tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_delete");
					}
					if(!row["view"]){
						tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_hide");
					}
					if(row["selected"] == "S"){
						tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_select");
					}
				}else{
					if(row["selected"] == "S"){
						tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_select");
					}
				}
				var filter_string	= "";
				
				//한줄의 각 셀 데이터 처리
				tmpRoot.find("tr:nth-child("+(i+1)+") td").each(function(dataIndex, row){
					return function(tdIdx, tdElem){
						var tdKey			= $(tdElem).attr(attr_options.col);
						var tdCustomFunc	= $(tdElem).attr(attr_options.custom);
						if(tdKey != null){
							var val				= "";
							var ori_val			= "";
							if(row[tdKey] != null){
								val		= String(row[tdKey]).decode().replaceAll("null", "");
								ori_val	= String(row[tdKey]).decode().replaceAll("null", "");
							}
							
							if(row != null && config.col[tdKey] != null && config.col[tdKey]["link_func"] != null){
								val	= config.col[tdKey]["link_func"](i, row);
							}else{
								val				= String(val).decode().replaceAll("null", "");
								ori_val			= String(ori_val).decode().replaceAll("null", "");
							}

							if(tdCustomFunc != null && tdCustomFunc != ""){
								val	= private_func.invoke(tdCustomFunc, [i, row]);
							}
							filter_string	+= val;
							
							//클래스 분석
							var clsVal		= $(tdElem).attr("class");
							var clsArr		= [];
							var dataType	= "text";
							if(clsVal != null && clsVal != ""){
								clsArr	= clsVal.split(" ");
								if(clsArr != null){
									clsArr		= toClsMap(clsArr);
									dataType	= getDataType(clsArr);
								}
							}
							if(dataType == "text"){
								$(tdElem).html(getFormatedStr(clsArr, val));
								if(clsArr["editable"]){
									$(tdElem).bind("dblclick", function(td_index, td_val){
										var maxlen	= $(tdElem).attr("maxlength");
										return function(){
											var elemName	= dataType+"_input_element";
											if(maxlen != null){
												maxlen	= "maxlength='"+maxlen+"'";
											}else{
												maxlen	= "";
											}
											$(this).html("<input type='text' id='"+elemName+"' "+maxlen+" value='' />");
											//각 셀의 넓이 가져오기
											var tdWidth	= $("#"+formId+" colgroup col:nth-child("+(td_index+1)+")").width();
											if(tdWidth < 20){
												$("#"+elemName).css("width", "80%");
											}else{
												$("#"+elemName).width(tdWidth-20);
											}
											$("#"+elemName).val(td_val);
											$("#"+elemName).focus();
											$("#"+elemName).bind("blur", function(){
												if(window.component.input.inspectField($("#"+elemName), clsVal)){
													var colData	= $("#"+elemName).val();
													if($("#"+elemName).val() != row[tdKey]){
														var pos	= $("#"+formId).getScrollTop();
														$("#"+formId).updateDataField(dataIndex, tdKey, $("#"+elemName).val());
														$("#"+formId).scrollToPosition(pos);
													}
													$(tdElem).html(getFormatedStr(clsArr, $("#"+elemName).val()));
													var editCallback	= config.editCallback[tdKey];
													if(editCallback != null && editCallback["success"]){
														try {
															editCallback["success"](row, colData);
														} catch (e) {alert(e);}
													}
												}else{
													$("#"+elemName).focus();
												}
											});
										};
									}(tdIdx, ori_val));
								}
							}else if(dataType == "check" || dataType == "check2"){
								var checkValue	= $(tdElem).find("input[type=checkbox]").attr("data-check");
								var chkArr	= ["Y", "N"];
								if(checkValue.split(",") != null){
									chkArr	= checkValue.split(",");
								}
								for (var idx in chkArr) {
									if(chkArr[idx] == ori_val){
										$(tdElem).find("input[type=checkbox]").val(ori_val);
										if(idx == 0){
											$(tdElem).find("input[type=checkbox]").attr("checked", true);
										}else{
											$(tdElem).find("input[type=checkbox]").attr("checked", false);
										}
									}
								}
								$(tdElem).find("input[type=checkbox]").bind("click", function(td_index, td_val){
									var chkThat	= $(tdElem).find("input[type=checkbox]");
									return function(){
										var pos	= $("#"+formId).getScrollTop();
										if($(chkThat).is(":checked")){
											$(chkThat).val(chkArr[0]);
										}else{
											$(chkThat).val(chkArr[1]);
										}
										if(dataType=="check"){
											$("#"+formId).updateDataField(dataIndex, tdKey, $(chkThat).val());
										}
										$("#"+formId).scrollToPosition(pos);
										var editCallback	= config.editCallback[tdKey];
										if(editCallback != null && editCallback["success"]){
											try {
												editCallback["success"](row, $(chkThat).val());
											} catch (e) {alert(e);}
										}
										
									};
								}(tdIdx, ori_val));
								
							}else if(dataType == "combo"){
								if(row["status"] == "I"){
									$(tdElem).bind("change", function(td_index, td_val){
										return function(){
											if($(tdElem).find("select").val() != row[tdKey]){
												var pos	= $("#"+formId).getScrollTop();
												$("#"+formId).updateDataField(dataIndex, tdKey, $(tdElem).find("select").val());
												$("#"+formId).scrollToPosition(pos);
											}
										};
									}(tdIdx, ori_val));
									$(tdElem).find("select").val(ori_val);
									var editCallback	= config.editCallback[tdKey];
									if(editCallback != null && editCallback["success"]){
										try {
											editCallback["success"](row, ori_val);
										} catch (e) {alert(e);}
									}
								}else if(clsArr["editable"]){
									$(tdElem).bind("dblclick", function(td_index, vVal, td_val, select_html){
										var tdThat	= this;
										return function(){
											$(this).html(select_html);
											//각 셀의 넓이 가져오기
											var tdWidth	= $("#"+formId+" colgroup col:nth-child("+(td_index+1)+")").width();
											if(tdWidth < 20){
												$(this).find("select").css("", "80%");
											}else{
												$(this).find("select").width(tdWidth-20);
											}
											var customObj	= config.selectCustomMap[tdKey];
											if(customObj != null){
												customObj($(this).find("select"),row);
											}
											$(this).find("select").val(td_val);
											$(this).find("select").focus();
											$(this).find("select").bind("change", function(){
												var pos	= $("#"+formId).getScrollTop();
												$("#"+formId).updateDataField(dataIndex, tdKey, $(this).val());
												$("#"+formId).scrollToPosition(pos);
												var editCallback	= config.editCallback[tdKey];
												if(editCallback != null && editCallback["success"]){
													try {
														editCallback["success"](row, $(this).val());
													} catch (e) {alert(e);}
												}
											});
											$(this).find("select").bind("blur", function(){
												$(tdElem).html($("#"+formId+"_template_area select[name="+$(tdElem).attr(attr_options.col)+"] option[value="+ori_val+"]").html());
											});
											
										};
									}(tdIdx, val, ori_val, $(tdElem).html()));
									var customObj	= config.selectCustomMap[tdKey];
									if(customObj != null){
										customObj($("#"+formId+"_template_area select[name="+$(tdElem).attr(attr_options.col)+"]"),row);
									}
									$(tdElem).html($("#"+formId+"_template_area select[name="+$(tdElem).attr(attr_options.col)+"] option[value="+ori_val+"]").html());
								}else{
									$(tdElem).html($("#"+formId+"_template_area select[name="+$(tdElem).attr(attr_options.col)+"] option[value="+ori_val+"]").html());
								}
							}
						}	//tdKey 값 존재
					};
				}(i, row));

				//필터 문자열 미리 생성
				row["filter_string"]		= filter_string;
				/**==========tr 이벤트 ==============*/
				
				if(config.rowDblClick != null || config.rowClick){
					tmpRoot.find("tr").css("cursor", "pointer");
				}
				//클릭시 선택 이벤트
				tmpRoot.find("tr:nth-child("+(i+1)+")").bind("click", function(idx, row){
					var that	= this;
					return function(){
						if(config.data != null){
							for(var j=0;j<config.data.length;j++){	//데이터 루프
								if(idx == j){
									config.data[j]["selected"] = "S";
								}else{
									config.data[j]["selected"] = "N";
								}
							}
						}
						if(config.rowClick != null){
							try{
								config.rowClick(idx, row);
							}catch(e){}
						}
						config.selectedIndex	= idx;
						tmpRoot.find("tr").removeClass("grid_tr_select");
						$(this).addClass("grid_tr_select");
					};
				}(i, row));
				//더블 클릭시 클릭 이벤트
				tmpRoot.find("tr:nth-child("+(i+1)+") td:not(.editable)").bind("dblclick", function(idx, row){
					return function(){
						if(row["status"] !="I" && row["status"] !="D"  && config.rowDblClick != null){
							try{
								config.rowDblClick(idx, row);
							}catch(e){}
						}
					};
				}(i, row));
				
				if(!row["view"]){	//false 면 숨기기
					tmpRoot.find("tr:nth-child("+(i+1)+")").removeClass("grid_tr_hide");
					tmpRoot.find("tr:nth-child("+(i+1)+")").addClass("grid_tr_hide");
				}
				/**==========//tr 이벤트 ==============*/
				
			}	// data for
			if(config.showFlip){
				tmpRoot.show();
			}
			
			//중간에 존재하는 셀렉트 박스나 라디오, 체크박스를 선택해준다.
			if(config.data != null && config.data.length > 0){
				for(var i=0;i<config.data.length;i++){	//데이터 루프
					var row	= config.data[i];
					tmpRoot.find("tr:nth-child("+(i+1)+") td.combo").each(function(dataIndex){
						return function(tdIdx, tdElem){
							var tdKey		= $(tdElem).find("select").attr(attr_options.col);
							if(tdKey != null){
								if(row["status"] != "I"){
									$(tdElem).find("select").val(row[tdKey]);
								}else{
									row[tdKey]	= $(tdElem).find("select").val();
								}
							}
						};
					}(i));
				}
			}
			if(config.showFlip){
				$("#"+formId).find(config.template_id).show();
			}
		}else{
			$("#"+formId).find(config.template_id).html(config.emptyHtml);
			if(config.showFlip){
				$("#"+formId).find(config.template_id).show();
			}
		}
		
		return html;
	};

	var templateStr	= function(formId){
		var config		= configMap[formId];
		var html	= "";
		if(config.data != null && config.data.length > 0){
			for(var i=0;i<config.data.length;i++){	//데이터 루프
				var template	= config.template;
				if(template != null && template != ""){
					var row	= config.data[i];
					row["index_no"]		= i;
					row["index_vno"]	= i+1;
					if(config.col != null){
						for(var key in config.col){
							if(config.col[key] != null && row[key] == null){
								row[key]	= "";
							}
						}
					}
					
					for(var key in row){
						var val		= row[key];
						if(config.col[key] != null && config.col[key]["link_func"] != null){
							val	= config.col[key]["link_func"](i, row);
						}
						val			= decodeURIComponent(String(val).replace(/\+/g, '%20'));
						template	= template.replaceAll("#"+key+"#", val);
					}
					html	+= template; 
				}	//template null if
			}	// data for
			
			$("#"+formId).find(config.template_id).html(html);
			if(config.showFlip){
				$("#"+formId).find(config.template_id).show();
			}
			
		}else{
			$("#"+formId).find(config.template_id).html(config.emptyHtml);
			if(config.showFlip){
				$("#"+formId).find(config.template_id).show();
			}
		}
		
		return html;
	};
	
	//셀의 데이터 타입을 얻어온다.
	var toClsMap	= function(clsVal){
		var attrList	= {"editable":false,"combo":false,"check":false,"check2":false,"radio":false,"text":false,"date":false,"money":false,"number":false,"per":false,"per2":false,"dateMM":false};
		var type	= [];
		if(clsVal != null){
			for(idx in clsVal){
				if(attrList[clsVal[idx]] != null){
					type[clsVal[idx]]	= true;
				}
			}
		}
		return type;
	};
	var getDataType	= function(clsVal){
		var type	= "text";
		if(clsVal != null){
			for(idx in clsVal){
				if(idx == "combo" && clsVal[idx]){
					type	= "combo";
				}else if(idx == "check" && clsVal[idx]){
					type	= "check";
				}else if(idx == "check2" && clsVal[idx]){
					type	= "check2";
				}else if(idx == "radio" && clsVal[idx]){
					type	= "radio";
				}
			}
		}
		return type;
	};
	var commify	= function(n) {
		var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
		n += ''; // 숫자를 문자열로 변환
		var commStr	= n;

		try {
			while (reg.test(commStr))
				commStr = commStr.replace(reg, '$1' + ',' + '$2');
		} catch (e) {
		}
		return commStr;
	};
	var getFormatedStr	= function(clsArr, val){
		if(val == null || val == ""){
			return "";
		}
		if(clsArr == null){
			return val;
		}
		if(clsArr["money"]){
			var commStr	= commify(val);
			if(commStr == ""){
				commStr	= "0";
			}
			//return commStr+" 원";
			return commStr;
		}else if(clsArr["number"]){
			var commStr	= commify(val);
			if(commStr == ""){
				commStr	= "0";
			}
			return commStr;
		}else if(clsArr["per"]){
			var numDigits	= val.split(".");
			var digitFront	= "0";
			if(numDigits != null){
				if(numDigits.length == 1){
					digitFront	= numDigits[0];
				}
				digitFront	= digitFront.replace("[^0-9]", "");
				var commStr	= commify(digitFront);
				return commStr+" %";
			}
		}else if(clsArr["per2"]){
			var numDigits	= val.split(".");
			var digitFront	= "0";
			var digitRear	= "00";
			if(numDigits != null){
				if(numDigits.length == 1){
					digitFront	= numDigits[0];
				}else if(numDigits.length > 1){
					digitFront	= numDigits[0];
					digitRear	= numDigits[1];
				}
				digitFront	= digitFront.replace("[^0-9]", "");
				digitRear	= digitRear.replace("[^0-9]", "");

				if(digitRear.length > 2){
					digitRear	= digitRear.substring(0,2);
				}else if(digitRear.length < 2){
					digitRear	= digitRear+"0";
				}
				var commStr	= commify(digitFront);
				return commStr+"."+digitRear+" %";
			}
		}else if(clsArr["date"]){
			var dateStr	= val.replace("[^0-9]", "");
			if(dateStr.length == 8){
				return dateStr.substring(0,4)+"-"+dateStr.substring(4,6)+"-"+dateStr.substring(6,8);
			}
		}else if(clsArr["dateMM"]){
			var dateStr	= val.replace("[^0-9]", "");
			if(dateStr.length == 6){
				return dateStr.substring(0,4)+"-"+dateStr.substring(4,6);
			}
		}
		return val;
	};
	
	
	window.component.grid	= configMap;
})(jQuery);