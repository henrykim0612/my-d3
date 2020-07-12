<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Circle Pack</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/ch5/word-cloud.css">
	<script src="${pageContext.request.contextPath}/js/common/d3.layout.cloud.js"></script>
	<script src="${pageContext.request.contextPath}/js/d3-exam/ch5/word_cloud.js"></script>
</head>
<body>
    <div class="flex-container flex-col">
        <div class="mb-20 flex-row justify-content-center layer" id="svgDiv">
        </div>
    </div>
</body>
</html>
