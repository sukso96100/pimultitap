function loadPref(num){

  var req = new XMLHttpRequest();
  req.open('GET', '/settings/load/'+num, true);
  req.onreadystatechange = function() {
    //Call a function when the state changes.
	if(req.readyState == 4 && req.status == 200) {
		// alert(req.responseText);
    var valueItem = JSON.parse(req.responseText)
    console.log(valueItem);
	}
}
req.send(null);
}
