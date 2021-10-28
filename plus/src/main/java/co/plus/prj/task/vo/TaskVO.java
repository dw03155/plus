package co.plus.prj.task.vo;

import java.util.Date;

import lombok.Data;

@Data
public class TaskVO {
	
	private int notiId; 		// 게시글 번호
	private String notiTtl;		// 게시글 제목(업무명)
	private String memId;		// 담당자
	
	private String tskPrgs;		// 업무 진행상태
	private Date tskBgnDt;		// 업무 시작일
	private Date tskEndDt;		// 업무 마감일
	private String tskCntn;		// 업무 내용
	//private String tskFile; 	// 업무 첨부 파일
	
	private String notiDttm; 	// 업무 등록일
	private String name; 		// 회원 이름
}
