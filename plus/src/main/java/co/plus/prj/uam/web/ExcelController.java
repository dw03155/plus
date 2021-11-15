package co.plus.prj.uam.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import co.plus.prj.uam.vo.ExcelData;

@Controller
public class ExcelController {

	@PostMapping("/xlsxUplord.do")
	@ResponseBody
	public List<ExcelData> readExcel(MultipartHttpServletRequest request) throws Exception {
		List<ExcelData> dataList = new ArrayList<>();
		
		System.out.println("업로드중");
		MultipartFile file = request.getFile("file");
		
		if(file != null && file.getSize() >0 && !file.getOriginalFilename().isEmpty()) {
			file.transferTo(new File("D:\\fileUp", file.getOriginalFilename()));
		}else {
			throw new IOException("엑셀파일만 업로드해주세요.");
		}
		
		String extension = FilenameUtils.getExtension(file.getOriginalFilename());
		
		if(!extension.equals("xlsx") && !extension.equals("xls")) {
			throw new IOException("엑셀파일만 업로드해주세요.");
		}
		
		Workbook workbook = null;
		
		FileInputStream files = new FileInputStream(new File("D:\\fileUp", file.getOriginalFilename()));
		if(extension.equals("xlsx")) {
			workbook = new XSSFWorkbook(files);
		}else if (extension.equals("xls")) {
			workbook = new HSSFWorkbook(files);
		}
		
		Sheet worksheet = workbook.getSheetAt(0);
		//worksheet.getPhysicalNumberOfRows()
		for (int i = 2; i<102; i++) {
			 Row row = worksheet.getRow(i);
			 if (row != null) {			 
				 ExcelData data = new ExcelData();
				 System.out.println(i+"================="+ worksheet.getPhysicalNumberOfRows());
				 data.setName(row.getCell(0) != null? row.getCell(0).getStringCellValue():"");
				 data.setEmail(row.getCell(1) != null? row.getCell(1).getStringCellValue():"");
				 data.setPersTel(row.getCell(2) != null? row.getCell(2).getStringCellValue():"");
				 data.setDept(row.getCell(3) != null? row.getCell(3).getStringCellValue():"");
				 data.setWkpo(row.getCell(4) != null? row.getCell(4).getStringCellValue():"");
				 data.setCoTel(row.getCell(5) != null? row.getCell(5).getStringCellValue():"");
				 
				 dataList.add(data);
			}
		}

		
		return dataList;
	}
}
