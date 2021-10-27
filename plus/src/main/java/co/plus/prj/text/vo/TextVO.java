package co.plus.prj.text.vo;

import lombok.Data;

@Data
public class TextVO {
	
	private int notiId;			// 게시글 번호
	
	private String txtTtl;		// 글 제목
	private String txtCntn;		// 글 내용
	private String txtPl;		// 글 장소
	private String txtFile;		// 글 첨부파일
}
