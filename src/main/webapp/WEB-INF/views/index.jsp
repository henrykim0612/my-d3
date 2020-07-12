<jsp:useBean id="sampleData" scope="request" type="java.lang.String"/>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <title>Henry's Spring APP</title>
    <style type="text/css">
        a {
            width: 150px;
        }
    </style>
</head>
<body>
    <div class="flex-container flex-col">
        <div class="flex-row justify-content-center">
            <h1>${sampleData}</h1>
            <img class="mb-20" src="${pageContext.request.contextPath}/resources/logo.jpg" width="100" height="100" alt="X"/>
        </div>

        <h1 class="mb-10">Examples</h1>
        <a href="${pageContext.request.contextPath}/d3/exam1">Exam1</a>
        <a href="${pageContext.request.contextPath}/d3/exam2">Exam2</a>

        <h1 class="mt-30 mb-10">Chapter 4</h1>
        <a href="${pageContext.request.contextPath}/d3/ch4/area">Area</a>
        <a href="${pageContext.request.contextPath}/d3/ch4/boxplot">Boxplot</a>
        <a href="${pageContext.request.contextPath}/d3/ch4/line">Line</a>
        <a href="${pageContext.request.contextPath}/d3/ch4/round-line">Round Line</a>
        <a href="${pageContext.request.contextPath}/d3/ch4/scatter">Scatter</a>

        <h1 class="mt-30 mb-10">Chapter 5(Layout)</h1>
        <a href="${pageContext.request.contextPath}/d3/ch5/pie">Pie</a>
        <a href="${pageContext.request.contextPath}/d3/ch5/histogram">Histogram</a>
        <a href="${pageContext.request.contextPath}/d3/ch5/circle-pack">Circle Pack</a>
        <a href="${pageContext.request.contextPath}/d3/ch5/dendrogram">Dendrogram</a>
        <a href="${pageContext.request.contextPath}/d3/ch5/stack">Stack</a>
        <a href="${pageContext.request.contextPath}/d3/ch5/word-cloud">Word Cloud</a>

        <h1 class="mt-30 mb-10">My Apps</h1>
        <a href="${pageContext.request.contextPath}/myapp/bar">Bar</a>
        <a href="${pageContext.request.contextPath}/myapp/horizontal-bar">Horizontal Bar</a>
        <a href="${pageContext.request.contextPath}/myapp/time-xaxis-bar">Time XAxis Bar</a>
        <a href="${pageContext.request.contextPath}/myapp/line">Line</a>
        <a href="${pageContext.request.contextPath}/myapp/pie">Pie</a>
        <a href="${pageContext.request.contextPath}/myapp/stack-layout">Stack Layout</a>
    </div>
</body>
</html>
