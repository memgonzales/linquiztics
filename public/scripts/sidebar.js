function showSidebar() {
	document.getElementById("side-bar").style.width = "270px";
	document.getElementById("side-bar").style.visibility = "visible";
	document.getElementById("page").style.marginRight = "270px";
}

function hideSidebar() {
	document.getElementById("page").style.marginRight = "0";
	document.getElementById("side-bar").style.width = "0px";
	document.getElementById("side-bar").style.visibility = "hidden";
}
