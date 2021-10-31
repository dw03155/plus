package co.plus.prj.pnw.mapper;

import java.util.List;

import co.plus.prj.pnw.vo.PNWVO;

public interface NoticeWritingMapper {

	// 전체 메뉴
	List<PNWVO> 
	
	
	// 프로젝트 홈
	List<PNWVO> pnwList(PNWVO vo); // 프로젝트 홈 (게시글 목록)

	PNWVO tskList(PNWVO vo); // 프로젝트 업무탭
	PNWVO scheList(PNWVO vo); // 프로젝트 일정탭
	PNWVO todoSelect(PNWVO vo); // 할일 자세히보기(아코디언)
	List<PNWVO> replyList(PNWVO vo);
	
	int txtInsert(PNWVO vo); // 글 입력

	int UpdateTxt(PNWVO vo); // 글 생성

	int DeleteTxt(PNWVO vo); // 글 삭제

	int insertTsk(PNWVO vo); // 업무 생성

	int UpdateTsk(PNWVO vo); // 업무 수정

	int DeleteTsk(PNWVO vo); // 업무 삭제

	int insertSche(PNWVO vo); // 일정 생성

	int UpdateSche(PNWVO vo); // 일정 수정

	int DeleteSche(PNWVO vo); // 일정 삭제

	int insertTodo(PNWVO vo); // 할일 생성

	int UpdateTodo(PNWVO vo); // 할일 수정

	int DeleteTodo(PNWVO vo); // 할일 삭제

	// 프로젝트 선택 후
	
	int replyInsert(PNWVO vo); // 댓글 생성

	int replyUpdate(PNWVO vo); // 댓글 수정

	int replyDelete(PNWVO vo); // 댓글 삭제

}
