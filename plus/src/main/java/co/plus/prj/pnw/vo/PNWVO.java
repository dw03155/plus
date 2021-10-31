package co.plus.prj.pnw.vo;

import java.util.Date;

import lombok.Data;

@Data		
public class PNWVO {
	
	// NoticeWriting
	private int notiId;				// 게시글 번호
	private int prjId;				// 프로젝트 번호
	private String notiKnd;			// 게시글 종류
	private int memId;				// 회원 번호
	private Date notiDttm;			// 게시글 작성일시
	private String notiOpenPerm;	// 게시글 공개권한
	
	// Member
	private String name;			// 회원이름
	private String coUrl;			// 회사URL
	
	// PrjParti
	private String prjColor;		// 프로젝트 컬러
	private String prjPerm;			// 프로젝트 권한
	
	//
	private String notiTtl;			// 게시글명
	
	//Project
	private String prjTtl;			// 프로젝트 제목
	
	// Text
	private String txtCntn; 		// 글 내용
	private String txtPl;			// 글 장소
	private String txtFile;			// 글 첨부파일
	
	// Task
	private String tskPrgs;			// 업무 진행상태
	private Date tskBgnDt;			// 업무 시작일
	private Date tskEndDt;			// 업무 마감일
	private String tskCntn; 		// 업무 내용
	private String tskFile; 		// 업무 첨부파일
	
	// SubTask
	private String subtskPrgs;		// 하위업무 진행상태
	private Date subtskBgnDt;		// 하위업무 시작일
	private Date subtskEndDt;		// 하위업무 마감일
	private String subtskCntn;		// 하위업무 내용
	
	// Todo
	private String todoCntn;		// 할일 내용
	private Date todoEndDate;		// 할일 마감일
	private String todoYn;			// 할일 완료 여부
	private String todoId;			// 할일 번호
	
	// Sche
	private Date scheDttm; 			// 일정 작성 일시
	private String schePl;			// 일정 장소
	private String scheCntn;		// 일정 내용
	 
	// Reply
	private int repId;				// 댓글 번호
	private String repCntn;			// 댓글 내용
	private Date repDttm;			// 댓글 일시
	
	//Bookmark
	
	//Finset
	
}
