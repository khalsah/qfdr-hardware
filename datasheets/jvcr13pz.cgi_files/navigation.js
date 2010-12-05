/* main-navigation */
function fs01NavigationObject() {
	this.titleId = "fs01-site-title";
	this.node    = null;
	this.stay    = {};
	this.stayClass = {
		"main" : "fs01-main-navigation-stay",
		"sub"  : "fs01-sub-navigation-stay"
	};
	this.cssTitle = "css-sub-navigation-stay";
	this.indexFileNames = [
		"index.htm",
		"index.html",
		"index.shtm",
		"index.shtml",
		"index.cgi",
		"index.cfm",
		"index.php",
		"default.asp",
		"Default.asp"
	]
	this.init();
}
fs01NavigationObject.prototype = {
	init : function() {
		function getSharedDir() {
			var s = jQuery("link");
			var ptn = /(.*\/?cs02\/css\/).+$/;
			for(var i=0,l=s.length;i<l;i++){
				if(ptn.test(s[i].href)){
					return RegExp.$1;
				}
			}
		}
		if (getSharedDir()) {
/* No need  for Industry Website. */
/*			document.write('<link rel="stylesheet" type="text/css" href="' + getSharedDir() + 'sub-navigation-closing.css" media="all">');*/
		} else {
			function getOldSharedDir() {
				var s = jQuery("link");
				var ptn = /(.*\/?css0401\/).+$/;
				for(var i=0,l=s.length;i<l;i++){
					if(ptn.test(s[i].href)){
						return RegExp.$1;
					}
				}
			}
			if (!window.opera && navigator.userAgent.indexOf("Gecko/") != -1) {
				jQuery(function(){
					if (typeof p0401NavigationObject == "function") {
						if (getOldSharedDir()) {
/* No need  for Industry Website. */
/*							jQuery("head").append('<link rel="stylesheet" type="text/css" href="' + getOldSharedDir() + 'sub-navigation-closing.css" media="all">');*/
						}
					}
				});
			} else {
/* No need  for Industry Website. */
/*				document.write('<link rel="stylesheet" type="text/css" href="' + getOldSharedDir() + 'sub-navigation-closing.css" media="all" id="' + this.cssTitle + '">');*/
			}
		}
		var _this = this;
		jQuery(function(){
			var node = jQuery("#" + _this.titleId);
			if (!node.length) return;
			var link = node.children("a:first");
			if (!link.length) return;
			if (_this.checkURL(link[0].href)) {
				node.html(jQuery("*", link));
			}
		});
		jQuery(function(){
			if (typeof(p0401Navigation) == "object" && typeof(p0401Navigation.stay) == "object") {
				if (!_this.stay && p0401Navigation.stay) {
					_this.stay = p0401Navigation.stay;
				}
				if (!_this.stay.main && p0401Navigation.stay.main) {
					_this.stay.main = p0401Navigation.stay.main;
				}
				if (!_this.stay.sub && p0401Navigation.stay.sub) {
					_this.stay.sub = p0401Navigation.stay.sub;
				}
			}
			if (!_this.stay || (!_this.stay.main && !_this.stay.sub)) {
				return;
			}
			if (_this.stay.main) {
				var node = jQuery("#" + _this.stay.main);
				if (!node.length) {
					node = jQuery("#" + _this.stay.main.replace("p0401", "fs01"));
					if (!node.length) return;
				}
				var link = node.children("a:first");
				if (!link.length) return;
				node.addClass(_this.stayClass["main"]);
				if (_this.checkURL(link[0].href)) {
					_this.removeLink(node);
				}
			}
			if (_this.stay.sub) {
				var node = jQuery("#" + _this.stay.sub);
				if (!node.length) {
					node = jQuery(".autoClosing #" + _this.stay.sub.replace("p0401", "fs01"));
					if (!node.length) return;
				}
				node.addClass(_this.stayClass["sub"]);
				node.parents("ul").addClass(_this.stayClass["sub"]);
				var link = node.children("a:first");
				if (!link.length) return;
				if (_this.checkURL(link[0].href)) {
					_this.removeLink(node);
				}
			}
		});
	},
	removeLink : function(node) {
		var link = node.children("a:first");
		link.remove();
		node.prepend("<em><span>" + link.text() + "</span></em>");
	},
	checkURL : function(url) {
		var _indexFileNames = this.indexFileNames;
		function chopIndexFileName(url) {
			var hashIndex = url.indexOf("#");
			if (hashIndex != - 1) {
				url = url.substr(0, url.indexOf("#"));
			}
			for (var i = 0, n = _indexFileNames.length; i < n; i++) {
				url = url.replace(new RegExp("\\/" + _indexFileNames[i].replace(/\./g, "\\.") + "$"), "/");
			}
			return url;
		}
		var pageurl   = chopIndexFileName(location.protocol + "//" + location.hostname + ((location.port) ? ":" + location.port : "") + location.pathname);
		var href      = chopIndexFileName(url);
		return (pageurl == href);
	}
}

if (typeof(p0401Navigation) != "object") {
	var p0401Navigation = {
		"stay" : {}
	}
}
var fs01Navigation = new fs01NavigationObject;
