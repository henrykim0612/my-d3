<%@ page contentType="text/html;charset=UTF-8" %>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/d3ia.css">

<script src="${pageContext.request.contextPath}/3rd-party-lib/d3.v3.min.js"></script>
<script src="${pageContext.request.contextPath}/js/d3-exam/soccerviz.js"></script>
<script src="${pageContext.request.contextPath}/js/d3-exam/colorbrewer.js"></script>

<html>
<head>
    <title>Exam 1</title>
</head>
<body onload="createSoccerViz()">

    <div id="viz">
        <svg style="width: 500px; height: 500px; border: 1px solid lightgray;"></svg>
    </div>
    <div id="controls"></div>

</body>
</html>
