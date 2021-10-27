package co.plus.prj.task.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.plus.prj.task.mapper.TaskMapper;
import co.plus.prj.task.service.TaskService;
import co.plus.prj.task.vo.TaskVO;

@Repository("taskDao")
public class TaskServiceImpl implements TaskService {
	@Autowired
	private TaskMapper map;
	
	@Override
	public List<TaskVO> taskSelectList() {		// 업무 목록 조회
		return map.taskSelectList();
	}

	@Override
	public TaskVO taskSelect(TaskVO vo) {		// 업무 상세보기
		return map.taskSelect(vo);
	}

	@Override
	public int taskInsert(TaskVO vo) {			// 업무 상세
		return map.taskInsert(vo);
	}

	@Override
	public int taskUpdate(TaskVO vo) {			// 업무 수정
		return map.taskUpdate(vo);
	}

	@Override
	public int taskDelete(TaskVO vo) {			// 업무 삭제
		return map.taskDelete(vo);
	}

	@Override
	public int taskPrgsUpdate(TaskVO vo) {		// 업무 상태 수정
		return map.taskPrgsUpdate(vo);
	}

}
