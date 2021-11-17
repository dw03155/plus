package co.plus.prj.nwm.vo;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data		
//홈(1개 프로젝트의 전체 게시글 목록 조회)
public class NoticeWritingVO { 	
	private int notiId;				// 게시글 번호
	private int prjId;				// 프로젝트 번호
	private String notiKnd;			// 게시글 종류
	private String memId;			// 회원 번호
	private Date notiDttm;			// 게시글 작성일시
	private String notiOpenPerm;	// 게시글 공개권한
	private String coUrl;			// 회사URL
	
	private String name;			// 회원이름
	private String notiTtl;			// 게시글명
	private String prjTtl;			// 프로젝트 제목
	
	// 글
	private String txtCntn; 		// 글 내용
	private String txtPl;			// 글 장소
	private String txtFile;			// 글 첨부파일
	
	// 업무
	private String tskCntn; 		// 업무 내용
	private String tskPrgs;			// 업무 상태
	private Date tskBgnDt;			// 업무 시작일
	private Date tskEndDt;			// 업무 마감일
	private String tskFile; 		// 업무 첨부파일
	
	//하위업무
	private String subtskCnt; 		// 하위 업무 갯수
	private String subtskPrgs;		// 하위 업무 상태
	private String subtskCntn;		// 하위 업무 내용
	private Date subtskBgnDt;		// 하위 업무 시작일
	private Date subtskEndDt; 		// 하위 업무 마감일
	private String subtskFile;		// 하위 업무 첨부 파일
	private String notiId2; 		// 상위 업무 번호
	
	private List<NoticeWritingVO> taskDetail; // 프로젝트 별 업무목록 (아코디언)
	
	// 할 일
	private String todoCntn;		// 할 일 내용
	private Date todoEndDate;		// 할 일 마감일
	private String todoYn;			// 할 일 완료 여부
	private String todoId;			// 할 일 번호
	
	// 일정
	private String scheCntn;		// 일정 내용
	private String schePl;			// 일정 장소
	private Date scheDttm; 			// 일정 작성 일시
	private Date scheBgnDt;			// 일정 시작일
	private Date scheEndDt;			// 일정 마감일
	
	
	// 댓글
	private String repId;			// 댓글 번호
	private String 
	
	private String addList;			// 게시글 부가정보
	private String subtskTtl;   	// 하위업무제목
	
	private String bmyn;			// 북마크 유무
	private String subtskyn;		// 하위업무 유뮤

}
