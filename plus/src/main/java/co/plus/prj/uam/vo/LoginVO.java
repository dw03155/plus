package co.plus.prj.uam.vo;

import lombok.Data;

@Data
public class LoginVO {
	//member
	private String memId;			//회원id
	private String email; 			//이메일
	private String pwd;				//비밀번호
	private String name;			//회원이름
	private String memPerm;			//회원권한
	
	//mem_status
	private String memSt;			//회원상태
}
