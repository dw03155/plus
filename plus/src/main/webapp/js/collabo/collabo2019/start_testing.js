var start_testing = (function() {
	
	var func_name = [
			"프로젝트 이동",	
			"글작성",
			"글작성2.0",	
			"업무",
			"일정", 
			"할일"
	]

	return {
		testStart : testStart,	
	}; 
	
	function testStart(){
		if(cf_getCookie("test") === ""){
			cf_setCookie("test","start");
			$location.href = '';
		} else {
			func_name.forEach(function(v, i){
				box_func(v, i+1);
			});
		}
	}
	
	function box_func(name, sec){
		setTimeout(function(){
			start3(name);
			test_func(name);
			stop3(name);
		}, sec * 1000);
	}
	
	function test_func(name){
		
		if(name == func_name[0]){
			
			$("#mainList").find(".flowList_[colabo_srno=535530]").click();
			
		} else if (name == func_name[1]){
			
			$("#post-input-layer").find("#text-cntn").text("안녕하십니까\n테스트입니까\n테스트입니다");
			$("#post-input-layer").find("#post-document-submit").click();
			
		} else if (name == func_name[2]){
			
			$("#post-input-layer").find(".ico5").click();
			$("#post-input-layer").find("#document-title").text("테스트글작성2.0");
			$("#post-input-layer").find("#document-edit-contents .editable").html("<p>안녕하십니까\n테스트입니까\n테스트입니다</p>");
			$("#post-input-layer").find("#post-document-submit").click();
			
		} else if (name == func_name[3]){
			
			$("#post-input-layer").find(".ico4").click();
			var taskObj = $("#post-input-layer").find("#task-layer");
			taskObj.find("input[name=TASK_NM]").val("테스트업무");
			taskObj.find(".workTab .tab5").click();
			taskObj.find("input[name=WORKER]").click();
			taskObj.find("#worker-select-list li:first").click();
			taskObj.find(".workwriteCont .workmore").click();
			taskObj.find("#PRIORITY_LINE input[name=imptcInput]").click();
			taskObj.find("#PRIORITY_LINE #PRIORITY_LAYER li:eq(2) button").click();
			taskObj.find("#task-cntn").text("안녕하십니까\n테스트입니까\n테스트입니다");
			$("#post-input-layer").find("#post-document-submit").click();
			
		} else if (name == func_name[4]){
			
			$("#post-input-layer").find(".ico3").click();
			var taskObj = $("#post-input-layer").find("#schedule-edit");
			taskObj.find("input#TTL").val("테스트일정");
			taskObj.find("#SCHD_STTG_TM").click();
			taskObj.find("#SEL_SCHD_STTG_TM li:eq(5)").click();
			taskObj.find("#SCHD_FNSH_TM").click();
			taskObj.find("#SEL_SCHD_FNSH_TM li:eq(15)").click();
			taskObj.find("#pac-input").val("경리나라");
			taskObj.find("#pac-input").trigger( jQuery.Event( "keydown", { keyCode: 34 } ) );
			taskObj.find("#MEMO").text("안녕하십니까\n테스트입니까\n테스트입니다");
			$("#post-input-layer").find("#post-document-submit").click();
			
		} else {
			
		}
 	}
	
})();	