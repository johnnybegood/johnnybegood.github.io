(function () {

	function init() {
		$("a[id]").waypoint(setNavigation);
		$("#header-waypoint").waypoint(changeHeader);
	}

	function changeHeader(direction) {
		$("#header").toggleClass("inverse", direction == "down");
	}

	function setNavigation(direction) {
		var anchor = $(this)[0];
		var navbar = $("#header .nav-bar");
		var navLink = navbar.find("a[href=#" + anchor.id + "]");
		var otherLinks = navbar.find("a").not(navLink);

		navLink.toggleClass("nav-active", direction == "down");
		otherLinks.removeClass("nav-active");
	}

	$(function () { init(); });

})();