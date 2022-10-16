function extractDataDict() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			dataArray = JSON.parse(this.responseText);
			regionsDataDict = {}; 
			for (n = 0; n <= dataArray.length; n++) {
				regionsDataDict[n+1] = dataArray[n];
			}
			delete regionsDataDict[18];
			//regionsDataDict.pop();
		}
	};
	xhttp.open("GET", "read_csv.php?data=1", true);
	xhttp.send();	
}

function extractDengueCases() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			dataArray = JSON.parse(this.responseText);
			regionsDengueCases = {}; 
			for (n = 0; n <= dataArray.length; n++) {
				regionsDengueCases[n+1] = dataArray[n];
			}
			delete regionsDengueCases[18];
			//regionsDataDict.pop();
		}
	};
	xhttp.open("GET", "read_csv.php?data=2", true);
	xhttp.send();	
}


extractDataDict();
extractDengueCases();