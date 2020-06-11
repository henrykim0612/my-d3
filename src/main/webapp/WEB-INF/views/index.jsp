<jsp:useBean id="sampleData" scope="request" type="java.lang.String"/>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<html>
  <head>
    <title>Henry's Spring APP</title>
  </head>
  <body>
    <h1>${sampleData}</h1>
    <img src="${pageContext.request.contextPath}/resources/logo.jpg" width="612" height="612" alt="X"/>
  </body>
</html>
