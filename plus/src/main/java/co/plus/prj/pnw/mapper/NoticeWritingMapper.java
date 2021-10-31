package co.plus.prj.pnw.mapper;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;
import co.plus.prj.pnw.vo.PNWVO;

public interface NoticeWritingMapper {

	// 전체 메뉴
	List<PNWVO> 
	
	
	// 프로젝트 선택 후 메뉴
	List<PNWVO> pnwSelect(PNWVO vo); // 프로젝트 선택 -> 홈 (게시물 목록 조회)

	PNWVO txtSelect(PNWVO vo); // 글 자세히보기(아코디언)

	int insertTxt(PNWVO vo); // 글 입력

	int UpdateTxt(PNWVO vo); // 글 생성

	int DeleteTxt(PNWVO vo); // 글 삭제

	NoticeWritingVO tskList(NoticeWritingVO vo); // 프로젝트 선택 후 -> 업무 (1개 프로젝트)

	NoticeWritingVO tskSelect(NoticeWritingVO vo); // 업무 자세히보기(아코디언)

	int insertTsk(NoticeWritingVO vo); // 업무 생성

	int UpdateTsk(NoticeWritingVO vo); // 업무 수정

	int DeleteTsk(NoticeWritingVO vo); // 업무 삭제

	NoticeWritingVO scheList(NoticeWritingVO vo); // 프로젝트 선택 후 -> 일정 (1개 프로젝트)

	NoticeWritingVO scheSelect(NoticeWritingVO vo); // 일정 자세히보기(아코디언)

	int insertSche(NoticeWritingVO vo); // 일정 생성

	int UpdateSche(NoticeWritingVO vo); // 일정 수정

	int DeleteSche(NoticeWritingVO vo); // 일정 삭제

	NoticeWritingVO todoSelect(NoticeWritingVO vo); // 할일 자세히보기(아코디언)

	int insertTodo(NoticeWritingVO vo); // 할일 생성

	int UpdateTodo(NoticeWritingVO vo); // 할일 수정

	int DeleteTodo(NoticeWritingVO vo); // 할일 삭제

	// 프로젝트 선택 후
	int replyInsert(NoticeWritingVO vo); // 댓글 생성

	int replyUpdate(NoticeWritingVO vo); // 댓글 수정

	int replyDelete(NoticeWritingVO vo); // 댓글 삭제

}
