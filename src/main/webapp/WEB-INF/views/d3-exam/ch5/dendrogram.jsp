<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Circle Pack</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/ch5/dendrogram.css">
	<script src="${pageContext.request.contextPath}/js/d3-exam/ch5/dendrogram.js"></script>
</head>
<body>
    <div class="flex-container flex-col">
        <div class="mb-20 flex-row justify-content-center layer" id="vDiv"></div>
        <div class="mb-20 flex-row justify-content-center layer" id="hDiv"></div>
        <div class="flex-row justify-content-center layer" id="rDiv"></div>
    </div>
</body>
</html>
