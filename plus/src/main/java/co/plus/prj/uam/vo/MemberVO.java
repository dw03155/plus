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
		
		//category
		private String ctgryId;			//카테고리 번호
		private String ctgryName;		//카테고리 이름
		private String cnt;				//카테고리명 별 프로젝트 갯수
		
		//project
		private String prjId;			//프로젝트 번호
		private String prjKnd;			//프로젝트 종류
		private String prjTtl;			//프로젝트 제목
		private String prjOpenPerm;		//프로젝트 공개 권한
		private String pmCnt;			//프로젝트별 관리자수
		private String memCnt;			//프로젝트별 참여자수
		private String notiCnt;			//프로젝트별 게시글
		
		//프로젝트 참여자
		private String prjPerm;			//프로젝트 권한
		
}
