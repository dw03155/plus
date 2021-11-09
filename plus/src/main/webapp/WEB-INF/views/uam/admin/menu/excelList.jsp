<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
  <table class="table table-striped">
    <thead>
    <tr>
      <th >이름</th>
      <th>이메일</th>
      <th>부서</th>
      <th>직위</th>
      <th>회사전화번호</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="data" items="${datas }">
    <tr>
      <td>${data.name }</td>
      <td>${data.email }</td>
      <td>${data.dept }</td>
      <td>${data.wkpo }</td>
      <td>${data.coTel }</td>
    </tr>
    </c:forEach>
    </tbody>
  </table>
</body>
</html>