package co.plus.prj.company.mapper;

import co.plus.prj.company.vo.CompanyVO;

public interface CompanyMapper {
	//회사url로 단일회사정보 가져오기
	public CompanyVO getCompany(CompanyVO vo);
          
}
