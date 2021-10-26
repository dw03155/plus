package co.plus.prj.company.serivce.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.company.mapper.CompanyMapper;
import co.plus.prj.company.serivce.CompanyService;
import co.plus.prj.company.vo.CompanyVO;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	public CompanyMapper map;

	@Override
	public CompanyVO getCompany(CompanyVO vo) {
		// 회사정보 검색
		return map.getCompany(vo);
	}

}
