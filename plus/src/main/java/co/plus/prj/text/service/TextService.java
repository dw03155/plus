package co.plus.prj.text.service;


import co.plus.prj.text.vo.TextVO;

public interface TextService {
	
	TextVO textSelect(TextVO vo);		// 글 상세보기
	int textInsert(TextVO vo);			// 글 생성
	int textUpdate(TextVO vo);			// 글 수정
	int textDelete(TextVO vo);			// 글 삭제
}
