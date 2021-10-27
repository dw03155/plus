package co.plus.prj.text.service;

import java.util.List;

import co.plus.prj.text.vo.TextVO;

public interface TextService {
	
	List<TextVO> textSelectList(); 		// 글 목록 조회
	TextVO textSelect(TextVO vo);		// 글 상세보기
	int textInsert(TextVO vo);			// 글 생성
	int textUpdate(TextVO vo);			// 글 수정
	int textDelete(TextVO vo);			// 글 삭제
}
