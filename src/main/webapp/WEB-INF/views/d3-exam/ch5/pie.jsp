<%@ page contentType="text/html;charset=UTF-8" %>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/ch5/pie.css">

<script src="${pageContext.request.contextPath}/3rd-party-lib/d3.v3.min.js"></script>
<script src="${pageContext.request.contextPath}/js/d3-exam/ch5/pie.js"></script>

<html>
<head>
    <title>Pie</title>
</head>
<body>
    <svg id="svg" style="width: 960px; height: 500px; border: 1px solid lightgray;"></svg>
    <button onclick="main.change('numTweets')">Change to numTweets</button>
    <button onclick="main.change('numFavorites')">Change to numFavorites</button>
    <button onclick="main.change('numRetweets')">Change to numRetweets</button>
</body>
</html>
