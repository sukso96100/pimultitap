var switchnum = 0;
function loadPref(num){
  switchnum = num;
  var nameInput = document.getElementById("name-input");
  var name = document.getElementById("name");
  var toggle = document.getElementById("toggle");

  var req = new XMLHttpRequest();
  req.open('GET', '/settings/load/'+num, true);
  req.onreadystatechange = function() {
    //Call a function when the state changes.
	if(req.readyState == 4 && req.status == 200) {
		// alert(req.responseText);
    var valueItem = JSON.parse(req.responseText)
    nameInput.value = valueItem.NAME;
    name.innerHTML = valueItem.NAME;
    if(valueItem.STATE == 0){
      toggle.checked = false;
    }else{
      toggle.checked = true;
    }
    console.log(valueItem);
	 }
  }
  req.send(null);
}

function savePref(){
  var num = switchnum;
  var nameInput = document.getElementById("name-input");
  var name = document.getElementById("name");
  var toggle = document.getElementById("toggle");

  var req = new XMLHttpRequest();
  req.open('POST', '/settings/save/'+num, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.onreadystatechange = function() {
    //Call a function when the state changes.
	if(req.readyState == 4 && req.status == 200) {
      showToast("Saved!")
      var menuitem = document.getElementById("i"+num);
      menuitem.innerHTML = nameInput.value;
	 }
  }
  req.send(JSON.stringify({name:nameInput.value, state:toggle.checked}));
}
