package co.plus.prj.text.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.plus.prj.text.mapper.TextMapper;
import co.plus.prj.text.service.TextService;
import co.plus.prj.text.vo.TextVO;

@Repository("textDao")
public class TextServiceImpl implements TextService {
	@Autowired
	private TextMapper map;

	@Override
	public List<TextVO> textSelectList() {		// 글 목록 조회
		return map.textSelectList();
	}

	@Override
	public TextVO textSelect(TextVO vo) {		// 글 상세보기
		return map.textSelect(vo);
	}

	@Override
	public int textInsert(TextVO vo) {			// 글 생성
		return map.textInsert(vo);
	}

	@Override
	public int textUpdate(TextVO vo) {			// 글 수정
		return map.textUpdate(vo);
	}

	@Override
	public int textDelete(TextVO vo) {			// 글 삭제
		return map.textDelete(vo);
	}

}
