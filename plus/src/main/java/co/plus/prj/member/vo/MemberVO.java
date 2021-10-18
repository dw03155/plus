package co.plus.prj.member.vo;

import lombok.Data;

@Data
public class MemberVO {
	//member
	private String memId;
	private String email;
	private String pwd;
	private String name;
	private int coId;
	private int deptId;
	private String wkpo;
	private String persTel;
	private String coTel;
	private String memPerm;
	private String accSt;
	
	//company
	private String coName;
	private String coUrl;
	
	
	

}
