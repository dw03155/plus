package co.plus.prj.uam.web;

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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import co.plus.prj.uam.vo.ExcelData;

@Controller
public class ExcelController {

	@PostMapping("/xlsxUplord.do")
	public String readExcel(@RequestParam("file") MultipartFile file, Model model) throws IOException {
		
		List<ExcelData> dataList = new ArrayList<>();
		
		String extension = FilenameUtils.getExtension(file.getOriginalFilename());
		
		if(!extension.equals("xlsx") && !extension.equals("xls")) {
			throw new IOException("엑셀파일만 업로드해주세요.");
		}
		
		Workbook workbook = null;
		
		if(extension.equals("xlsx")) {
			workbook = new XSSFWorkbook(file.getInputStream());
		}else if (extension.equals("xls")) {
			workbook = new HSSFWorkbook(file.getInputStream());
		}
		
		Sheet worksheet = workbook.getSheetAt(0);
		
		for (int i = 1; i< worksheet.getPhysicalNumberOfRows(); i++) {
			 Row row = worksheet.getRow(i);
			
			ExcelData data = new ExcelData();
			
			data.setName(row.getCell(0).getStringCellValue());
			data.setEmail(row.getCell(1).getStringCellValue());
			data.setPersTel(row.getCell(2).getStringCellValue());
			data.setDept(row.getCell(3).getStringCellValue());
			data.setWkpo(row.getCell(4).getStringCellValue());
			data.setCoTel(row.getCell(5).getStringCellValue());
			
			dataList.add(data);
		}
		model.addAttribute("datas",dataList);
		
		return "uam/admin/menu/excelList";
	}
}
