package co.plus.prj.uam.vo;

import lombok.Data;

@Data
public class MemberVO {
		//member
		private String memId;			//회원id
		private String email; 			//이메일
		private String pwd;				//비밀번호
		private String name;			//회원이름
		private String dept;			//부서이름
		private String wkpo;			//회원 직위
		private String persTel;			//회원전화번호
		private String coTel;			//회사전화번호
		private String memPerm;			//회원권한
		private String accSt;			//회원계정생태
		private String coUrl;			//회사URL
		
		//company
		private String coName;			//회사이름
		private String coLogo;			//회사로고
		
		//mem_status
		private String memSt;			//회원상태
		

}
