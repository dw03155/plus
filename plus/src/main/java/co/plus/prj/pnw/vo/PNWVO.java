package co.plus.prj.pnw.vo;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data		
public class PNWVO {
	
	private PNWVO() {}
	
	// Project
	private String prjId;			// 프로젝트 번호
	private String prjKnd;			// 프로젝트 종류
	private String prjTtl;			// 프로젝트 제목
	private String prjCntn;			// 프로젝트 내용(설명)
	private String prjOpenPerm;		// 프로젝트 공개권한
	
	// Fold
	private String foldId;			// 카테고리 번호
	private String foldName;		// 카테고리 이름
	
	// Category
	private String ctgryId;			// 카테고리 번호
	private String ctgryName;		// 카테고리 이름
	
	// PrjParti
	private String prjColor;		// 프로젝트 컬러
	private String prjPerm;			// 프로젝트 권한
	private String PartiCnt;		// 프로젝트 참여자 수
	
	// MemStatus
	private String memSt;			// 회원상태
	// NoticeWriting
	private String notiId;			// 게시글 번호
	private String notiKnd;			// 게시글 종류
	private Date notiDttm;			// 게시글 작성일시
	private String notiOpenPerm;	// 게시글 공개권한
	
	// Member
	private String memId;			// 회원 번호
	private String name;			// 회원 이름
	private String wkpo;			// 회원 직위
	private String coUrl;			// 회사URL
	private String dept;			// 부서 이름
	
	// Board (view)
	private String notiTtl;			// 게시글명
	
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
	private String subtskFile;		// 하위업무 첨부파일
	
	// Todo
	private String todoCntn;		// 할일 내용
	private Date todoEndDate;		// 할일 마감일
	private String todoYn;			// 할일 완료 여부
	private String todoId;			// 할일 번호
	
	// Schedule
	private Date scheDttm; 			// 일정 작성 일시
	private String schePl;			// 일정 장소
	private String scheCntn;		// 일정 내용
	 
	// Reply
	private String repId;			// 댓글 번호
	private String repCntn;			// 댓글 내용
	private Date repDttm;			// 댓글 일시
	
	// Bookmark
	
	// Finset
	
	// 프로젝트 : 홈
	private String addList;			// 게시글 부가정보
	private String allCnt;			// 전체 참여자 수
	private String tskCnt;			// 전체 업무 진행상황에 따른 개수
	// 프로젝트 : 업무
	private List<PNWVO> tsks;		// 업무탭	
	// 전체 프로젝트
	private String partiYn;			// 프로젝트 참여여부 (참여중)
	
}
