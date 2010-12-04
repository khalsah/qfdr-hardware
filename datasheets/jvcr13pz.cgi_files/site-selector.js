/* site-selector */
function siteSelector() {
	this.nodeId = "fs01-site-selector";
	this.currentId = "fs01-current-site";
	this.activeClass = "fs01-active-site-selector";
	this.node = null;
	this.isActive = false;
	this.timer = null;
	this.init();
}
siteSelector.prototype = {
	init : function() {
		var _this = this;
		jQuery(function(){
			_this.node = jQuery("#" + _this.nodeId);
			var current = jQuery("div", _this.node)[0];
			if (!_this.node.length) return;
			_this.node.click(function(e){
				if (e.target != current) return true;
				if (e.stopPropergation) {
					e.stopPropergation();
				}
				e.cancelBubble = true;
				if (!_this.isActive) {
					_this.activate();
				} else {
					_this.deactivate();
				}
				return false;
			});
			jQuery(document).click(function(e){
				_this.deactivate();
			});
		});
	},
	activate : function() {
		this.isActive = true;
		this.node.addClass(this.activeClass);
	},
	deactivate : function(e) {
		this.isActive = false;
		this.node.removeClass(this.activeClass);
	}
}
new siteSelector;
