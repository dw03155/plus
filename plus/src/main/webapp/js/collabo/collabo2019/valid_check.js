//@190605 안광선 : 정상적인 URL인지 체크
function VaildURL(str) {
    var url = str
    if(url !== "")
    {
        if (url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null)
            return true;
        else {
        	cmf_layerMsg("2","URL"+c18n("AA0168","형식이 올바르지 않습니다."));
            return false;
        }
    }
}

function cmf_checkExt(FILE_NM) {
	var IMG_FORMAT = "\.(bmp|gif|jpg|jpeg|png|ico)$"; // 문서만 첨부하게 하려면 이 부분 바꿔주시면 되겠죠? ^^
	if ((new RegExp(IMG_FORMAT, "i")).test(FILE_NM))
		return true;
	return false;
}

/**
 * 서브도메인 주소 체크(영문숫자 50자이하)
 * @param chk
 * @returns {Boolean}
 */
function cmf_subDomainValidate(chk) {
	var pattern = /^[A-Za-z0-9-]{3,50}$/;
	if (pattern.test(chk)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 도메인 닷컴 체크(영문숫자 50자이하)
 * @param chk
 * @returns {Boolean}
 */
function cmf_subDotComValidate(chk) {
	var pattern = /^[.,a-z0-9]{5,50}$/;
	if (pattern.test(chk)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 숫자 체크
 * @param chk
 * @returns {Boolean}
 */
function cmf_numValidate(chk) {
	var pattern = /[^0-9]/;
	if (pattern.test(chk)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 숫자 체크(4자인지)
 * @param chk
 * @returns {Boolean}
 */
function cmf_num_count4_Validate(chk) {
	var pattern = /^[0-9]{4,4}$/;
	if (pattern.test(chk)) { 
		return true;
	} else {
		return false;
	}
}

/**
 * 핸드폰번 체크(9~15자인지)
 * @param chk
 * @returns {Boolean}
 * return 아니면 true 맞으면 false
 *
 */
function cmf_pNumber_Validate(chk) {
	var pattern = /^[0-9]{9,15}$/;
	if (!pattern.test(chk)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 쿠폰코드 체크(대문자, 숫자 6자)
 * @param chk
 * @returns {Boolean}
 */
function cmf_couponValidate(chk) {
	var pattern = /^[A-Z0-9]{6,6}$/;
	if (pattern.test(chk)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 3자리마다 ,찍기
 * @param {} x 
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 특수문자 체크
 * @param chk
 * @returns {Boolean} 특수문자 존제 -> true, 없음 -> false
 */
function cmf_isSpecialCharacterExist(chk) {
	if ((/[.*+?!@#^${}()|[\]\\\<\>\'\"]/).test(chk)) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * 비밀번호 체크(영문숫자)
 * @param chk
 * @returns {Boolean} 문제있으면 true, 없으면 false
 */
function cmf_validate(ObjUserPassword) {
	/*
	if( location.origin.indexOf("flowdev.info") > -1){
		//숫자, 영문, 길이체크
		var pattern = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/g;
		if (!pattern.test(ObjUserPassword)){
			return true;
		}else{
			//done.
		}
		
		if( 0 == VarCharCount(ObjUserPassword) ){
			return true;
		}else{
			//done.
		}
		
		
		if( pwContinue(ObjUserPassword) ){
			return true;
		}else{
			//done.
		}
			
		if( pwSame(ObjUserPassword) ){
			return true;
		}else{
			//done.
		}
		
		return false;
	}else{
		*/
		//b_kimchang 이 존재하고, b_kimchang이 true 이면...
		if(window.b_kimchang){
			if( 0 == VarCharCount(ObjUserPassword) ){
				return true;
			}else{
				//done.
			}
			var pattern = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/g;
			if (!pattern.test(ObjUserPassword)) return true;
			else return false;
		} else {
			var pattern = /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/g;
			if (!pattern.test(ObjUserPassword)) return true;
			else return false;
		}
	//}
	return false;
}
//특수문자 한개 포함해야함.
function VarCharCount(aInputBox) {  // aInputBox에 있는 특수문자의 갯수 return
   var comp = "\`~!@#$%^&*-_+=\\,./?:;\"{[}]";
   var aInputBoxValue = aInputBox;
   var len = aInputBoxValue.length;
   var count = 0;
   if(len > 0){
       for(var i=0; i<len; i++) {
           if(comp.indexOf(aInputBoxValue.substring(i,i+1)) != -1) {
               count++;
           }
       }       
   }
   return count;
}
//연속된 문자, 숫자 체크(3자리)
function pwContinue(validpw){   
	 var cnt = 0;
	 var cnt2 = 0;
	 var tmp = "";
	 var tmp2 = "";
	 var tmp3 = "";
	 for(i=0; i<validpw.length; i++){
	  tmp = validpw.charAt(i);
	  tmp2 = validpw.charAt(i+1);
	  tmp3 = validpw.charAt(i+2);
	  
	  if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == 1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == 1){
	   cnt = cnt + 1;
	  }
	  if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == -1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == -1){
	   cnt2 = cnt2 + 1;
	  }
	 }
	 if(cnt > 0 || cnt2 > 0){
	  return true;
	 }else{
	  return false;
	 }
	}

// 비밀번호에 3자리 이상 연속된 동일한 문자(예:aaa)는 사용할 수 없습니다.
function pwSame(validpw){   //동일 문자, 숫자 체크(3자리)
	var tmp = "";
	var cnt = 0;
	for(i=0; i<validpw.length; i++){
		tmp = validpw.charAt(i);
		if(tmp == validpw.charAt(i+1) && tmp == validpw.charAt(i+2)){
			cnt = cnt + 1;
		}
	}
	if(cnt > 0){
		return true;
	}else{
		return false;
	}
}
/*
	// 비밀번호가 아이디와 동일하거나 3자리 이상 일치할 경우 사용할 수 없습니다.
	function idValuePw(){
	 validid = document.frm01.usrId.value;
	 validpw = document.frm01.pw.value;
	 var tmp = "";
	 var cnt = 0;
	 for(i=0; i<validid.length-2; i++){
	  tmp = validid.charAt(i) + validid.charAt(i+1) + validid.charAt(i+2);
	  if(validpw.indexOf(tmp) > -1){
	   cnt = cnt + 1;
	  }
	 }
	 if(cnt > 0){
	  return true;
	 }else{
	  return false;
	 }
	}
*/

		
/**
 * song
 * [2020-06-19]
 */
function cmf_empty_space_check(chk){
	var pattern = /\S*/g;
	var temp = pattern.exec(chk);
	if(null2void(temp[0],"").length !== 0)
	{
		var pattern_1 = /\s*/g;
		var pattern_2 = /\s*$/g;
		temp = pattern_1.exec(chk);
		if(null2void(temp[0],"").length !== 0){
			return true;
		}
		temp = pattern_2.exec(chk);
		if(null2void(temp[0],"").length !== 0){
			return true;
		}
		return false;
	}
	else
	{
		pattern = /\s/g;
		if(pattern.test(chk)) return true;
	}
	return false;
}
/**
 * 공백 string or none체크
 * 문제있으면 true, 없으면 false
 */
function cmf_spacecheck(chk){
	var pattern = /\s/g;
	if(pattern.test(chk)) return true;
	else return false;
}

/**
 *
 * 이메일 체크
 * @param chk
 * @returns {Boolean} 문제있으면 true, 없으면 false
 */
function cmf_emailcheck(chk) {
	//var pattern = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\.\-]+$/g;			//[10885] 2019.5.20 jkw 수정 [2020.06.18 송제섭 수정] [$] 를 통해 마지막을 표시
	if (!pattern.test(chk)) return true;
	else return false;
}

function cmf_registerNumberCheck(value){
	if(cmf_emptyCheck(value)){
		return false;
	}

	var pattern = /[0-9]{10}/g;
	return !pattern.test(value);
}

function cmf_emptyCheck(value){
	return trim(value).length == 0 ? true : false;
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function isEmojiExist(chk){
	var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	if(regex.test(chk)){
		return true;
	}
	return false;
}
/**
 * 콜백 매개변수가 존재하는지 확인할때 사용함
 * @param {object} test 테스트할 변수
 */
function isFunctionExist(test) {
	return (test && typeof test === "function"); 
}

/**
 * input tag set blur valid function
 * validated_function : {}
 * error_call_function : {}
 * flag_control_function : function
 * @param _OBJ
 * @param validated_functions
 * @param error_call_functions
 * @param flag_control_function
 */
function setValidatedFunction(_OBJ,validated_functions,error_call_functions,flag_control_function,jex_validated_functions){
    var accept_flag = false;
    var str;
	if(validated_functions == undefined || validated_functions == null || error_call_functions == undefined || error_call_functions == null ||
	validated_functions == "" || error_call_functions == "" || !(validated_functions instanceof Object) || !(error_call_functions instanceof Object))
	{
		alert("setValidatedFunction Error");
		return;
	}
    if(validated_functions.length != error_call_functions.length)
	{
		alert("validated_function & error_call_function did not match");
		return;
	}
    for(var key in validated_functions){
    	var exists= false;
    	for(var key2 in error_call_functions){
    		if(key == key2){
    			exists = true;
			}
		}
    	if(!exists){
    		alert("vlidated_functions key & error_call_functions key not match");
			return;
		}
	}
	if(!(_OBJ instanceof jQuery)){
		alert("_OBJ error! not jQuery");
		return;
	}
	_OBJ.off('blur').on('blur',function(){
		if(_OBJ.val() === "") return;
		for(var key3 in validated_functions){
			if((str = validated_functions[key3](_OBJ.val()))){
				if((typeof str) ==="string"){
					err = str;
				}else {
					var err = error_call_functions[key3](_OBJ);
				}
				if(accept_flag != null || accept_flag != undefined){
					accept_flag = false;
				}
				flag_control_function(false,err);
				break;
			}
			else {
				flag_control_function(true);
				accept_flag = true;
			}
		}

		//중복 확인을 위한 Jex Functions
		if(accept_flag != null || accept_flag != undefined || jex_validated_functions != null || jex_validated_functions != undefined){
			if(!accept_flag) return;
			for(var key4 in jex_validated_functions)
			{
				jex_validated_functions[key4]();
			}
		}
	});

}
function setCopyValidatedFunction(_OBJ,validated_functions,error_call_functions,flag_control_function){
	var accept_flag = false;
	if(validated_functions == undefined || validated_functions == null || error_call_functions == undefined || error_call_functions == null ||
		validated_functions == "" || error_call_functions == "" || !(validated_functions instanceof Object) || !(error_call_functions instanceof Object))
	{
		alert("setValidatedFunction Error");
		return;
	}
	if(validated_functions.length != error_call_functions.length)
	{
		alert("validated_function & error_call_function did not match");
		return;
	}
	for(var key in validated_functions){
		var exists= false;
		for(var key2 in error_call_functions){
			if(key == key2){
				exists = true;
			}
		}
		if(!exists){
			alert("vlidated_functions key & error_call_functions key not match");
			return;
		}
	}
	if(!(_OBJ instanceof jQuery)){
		alert("_OBJ error! not jQuery");
		return;
	}
	_OBJ.on('keyup',function(){
		if(_OBJ.val() === "") return;
		for(var key3 in validated_functions){
			if(validated_functions[key3](_OBJ.val())){
				var err = error_call_functions[key3](_OBJ);
				if(accept_flag != null || accept_flag != undefined){
					accept_flag = false;
				}
				if(!flag_control_function instanceof Function) {
					flag_control_function(false, err);
				}
				break;
			}
			else {
				if(!flag_control_function instanceof Function) {
					flag_control_function(true);
				}
				accept_flag = true;
			}
		}
	});
}

// @김시훈 2020-11-30 대구은행 요건
function checkValidate(text) {
	if(isFuncDeployList("PRIVACY_VALIDATE_CHECK")) {
		if (text.match(/\d{2}(?:0[1-9]|1[0-2])[0-9]\d{1}(-|\^-\^|\^-|-\^|\.|\.|\^\.\^|\^\.|\.\^| |\^\^|\^ | \^|\^)[1-4]\d{6}/)) {
			toast('2', c18n("", "주민등록번호를 입력할 수 없습니다."));
			return false;
		} else if (text.match(/\d{2}(?:0[1-9][1[0-2])[0-9]\d{1}[1-4]\d{6}/)) {
			toast('2', c18n("", "주민등록번호를 입력할 수 없습니다."));
			return false;
		} else if (text.match(/\d{2}(?:0[1-9|1[0-2])[0-9]\d{1}(-|\^ -\^|\^-|-\^|\.|\^\.\^|\^\.|\.\^| |\^\^|\^ | \^ |\^|\^)[5-8]\d{6}/)) {
			toast('2', c18n("", "외국인등록번호를 입력할 수 없습니다."));
			return false;
		} else if (text.match(/\d{2}(?:0[1-9]|[0-2])[0-9]\d{1}[5-8]\d{6}/)) {
			toast('2', c18n("", "외국인등록번호를 입력할 수 없습니다."));
			return false;
		// } else if (text.match(/(?:\(?(?:02|0[3-4][1-3]|0[5-6][1-4|070)\)?(-|\^-\^|\^-|-\^)\d{3,4}(-|\^-\^|\^-|-\^)?\d{4}|01[016-9]?(-|\^-\^|\^-|-\^)[0-9]\d{2,3}?(-|\^-\^|\^-|-\^)\d{4}))/)) {
		// 	//전화번호 패턴수정 2차 01000000000와 같은 연속 전화번호는 다른 필터에서 막히기 때문에 보류
		// 	toast('2', c18n("", "전화번호를 입력할 수 없습니다."));
		// 	return false;
		// }
		// else if (text.match(/(?:\(?(?:02|0[3-4][1-3]|0[5-6][1-4]|070|01|[016-9]?)\)?\d{4})/)) {
		// 	toast('2', c18n("", "전화번호를 입력할 수 없습니다."));
		// 	return false;
		// }
		} else if (text.match(/(?:[A-Z]{1}\d{8})/)) {
			//정상적인 전자여권 번호 외 다른 번호가 들어올 시 여권번호 입력하라는 오류 수정 ( 2018/07/26 JM)
			return true;
		} else if (text.match(/(?:[a-z]{1}\d{8})/)) {
			// 전자여권
			toast('2', c18n("", "전자여권 번호를 입력할 수 없습니다."));
			return false;
		} else if (text.match(/(?:[A-Z]{2}\d{7})/)) {
			// 기존여권
			toast('2', c18n("", "기존 여권번호를 입력할 수 없습니다."));
			return false;
		} else if (text.match(/(?:[a-z]{2}\d{7})/)) {
			// 기존여권
			toast('2', c18n("", "기존 여권번호를 입력할 수 없습니다."));
			return false;
		} else if (text.match(/(?:서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주|11|12|13|14|15|16|17|18|19|20|21|22|23|25|26)(-|\^-\^|\^-|-\^| |\^ \^|\^ |\^|\^)\d{2}(-|\^-\^|\^-|-\^)\d{6}(-|\^-\^|\^-|-\^)\d{2}/)) {
			toast('2', c18n("", "운전 면허번호를 입력할 수 없습니다."));
			return false;
		}
	}
	return true;
}

function createCode(objArr, iLength) {
	var arr = objArr;
	var randomStr = "";

	for (var j=0; j<iLength; j++) {
		randomStr += arr[Math.floor(Math.random()*arr.length)];
	}

	return randomStr
}

// 숫자 + 소문자 + 대문자 + 특수문자
function getRandomCode(iLength) {
	var arr="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");
	return createCode(arr, iLength);
}

// 문자(대문자, 소문자 모두)
function getRandomLetter(iLength) {
	var arr="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
	return createCode(arr, iLength);
}

// 대문자
function getRandomBigLetter(iLength) {
	var arr="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
	return createCode(arr, iLength);
}

// 소문자
function getRandomSmallLetter(iLength) {
	var arr="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
	return createCode(arr, iLength);
}

// 특수문자
function getRandomSpecialLetter(iLength) {
	var arr="~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");
	return createCode(arr, iLength);
}

// 숫자
function getRandomNum(iLength) {
	var arr="0,1,2,3,4,5,6,7,8,9".split(",");
	return createCode(arr, iLength);
}
