<%@ page contentType="text/html;charset=UTF-8" %>
<html>
	<head>
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/myapp/bar.css">
		<script src="${pageContext.request.contextPath}/js/myapp/bar.js"></script>
	</head>
	<body>
		<div id="content" class="flex-container flex-col">
			<div class="flex-row justify-content-center">
				<svg id="svg" style="width: 960px; height: 500px; border: 1px solid lightgray;"></svg>
			</div>
			<div class="flex-row justify-content-center">
				<button onclick="">Change to numTweets</button>
			    <button onclick="" class="ml-10">Change to numFavorites</button>
			    <button onclick="" class="ml-10">Change to numRetweets</button>
			</div>
		</div>
	</body>
</html>
