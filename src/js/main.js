(function () {

	function init() {
		$("a[id]").waypoint(setNavigation);
		$(".content").waypoint(changeHeader);
	}

	function changeHeader(direction) {
		$("#header").toggleClass("inverse", direction == "down");
	}

	function setNavigation(direction) {
		var anchor = $(this)[0];
		var navLink = $("#header a[href=#" + anchor.id + "]");

		navLink.toggleClass("nav-active", direction == "down");
	}

	$(function () { init(); });

})();