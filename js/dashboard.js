
    google.charts.load('current', {

		callback: function () {

		var numRows;
		
		var today = new Date();
		var todayStr = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
		document.getElementById('date').innerHTML = todayStr;

		drawChart();
		getQuestion();
		
		
		setInterval(drawChart, 20000);
		setInterval(getQuestion, 100000);

		function drawChart() {
	
			var queryString = encodeURIComponent('SELECT A, B, C, D WHERE A = date "' + todayStr + '"');

			var query = new google.visualization.Query(
			  'https://docs.google.com/spreadsheets/d/1wG78VuxjG8T6vnC-hYKn5rcwkApzMS6VnGaftsk10lI/gviz/tq?gid=0&headers=1&tq=' + queryString);
			query.send(handleTableQueryResponse);
		}
		
		function handleTableQueryResponse(response) {
			
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			
			// Hide timestamp column
			var dataResponse = response.getDataTable();
			var view = new google.visualization.DataView(dataResponse);
			view.setColumns([1,2,3]);
			
			var cssNames = {
				evenTableRow : 'odd-row-background',
				hoverTableRow: 'hover-table-row'
			};

			var options = {
				width: '100%',
				height: '100%',
				cssNames: cssNames
			};

			var chart = new google.visualization.Table(document.getElementById('chart'));
			chart.draw(view, options);
			
		}
	
		function getQuestion() {

			var queryString = encodeURIComponent('SELECT A, B, C WHERE A = date "' + todayStr + '"');

			var query = new google.visualization.Query(
			  'https://docs.google.com/spreadsheets/d/1wG78VuxjG8T6vnC-hYKn5rcwkApzMS6VnGaftsk10lI/gviz/tq?gid=1053256824&headers=1&tq=' + queryString);
			  
			query.send(handleQuestionQueryResponse);
		}
	
		function handleQuestionQueryResponse(response) {
		
			if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}

			var data = response.getDataTable();
			var questionText, user;
			
			if (data.getNumberOfRows() > 0) {
				questionText = data.getValue(data.getNumberOfRows()-1, 1);
				user = data.getValue(data.getNumberOfRows()-1, 2);
			} else {
				questionText = "Ask a question!";
				user = "";	
			}
			
			document.getElementById('question_text').innerHTML = questionText;
			// document.getElementById('user').innerHTML = user;
	}

  },
  packages: ['table']
});
		