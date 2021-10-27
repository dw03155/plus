package co.plus.prj.noticeWriting.vo;

import lombok.Data;

@Data
public class NoticeWritingVO {
	
	private int notiId;				// 게시글 번호
	private int prjId;				// 프로젝트 번호
	private String notiKnd;			// 게시글 종류
	private int memId;				// 회원 번호
	private String notiDttm;		// 게시글 작성일시
	private String notiOpenPerm;	// 게시글 공개권한
	
	private String memName;			// 회원이름
	private String notiTtl;			// 게시글명
	private String prjTtl;			// 프로젝트 제목
	
	private String txtCntn; 		// 글 내용
	private String txtPl;			// 글 장소
	private String txtFile;			// 글 첨부파일
	
	private String tskCntn; 		// 업무 내용
	private String tskPrgs;			// 업무 진행상태
	private String tskBgnDt;		// 업무 시작일
	private String tskEndDt;		// 업무 마감일
	private String tskFile; 		// 업무 첨부파일
	
	private String subtaskCntn;		// 하위 업무 내용
	
	private String todoCntn;		// 할 일 내용
	private String todoEndDate;		// 할 일 마감일
	private String todoYn;			// 할 일 완료 여부
	private String todoId;			// 할 일 번호
	
	private String scheCntn;		// 일정 내용
	private String schePl;			// 일정 장소
	private String scheDttm; 		// 일정 작성 일시
	 
}
