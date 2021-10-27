package co.plus.prj.task.service;

import java.util.List;

import co.plus.prj.task.vo.TaskVO;

public interface TaskService {
	
	List<TaskVO> taskSelectList();		// 업무 목록
	TaskVO taskSelect(TaskVO vo);		// 업무 상세보기
	int taskInsert(TaskVO vo);			// 업무 생성
	int taskUpdate(TaskVO vo);			// 업무 수정
	int taskDelete(TaskVO vo);			// 업무 삭제
	
	int taskPrgsUpdate(TaskVO vo); 		// 업무 상태 수정
}

