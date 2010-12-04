jQuery.noConflict();
jQuery(function(){
	if (Object.prototype.extend) Object.prototype.extend = function(){ return this };
//	window.onerror = function(){ return true; };
	jQuery.fn.rollover = function(overSuffix,downSuffix) {
		var _TARGET = '_rollover_target';	//setting default prefix

		var setEvent = function(targetObj){

			var _swapImage = function(swapSrc){
				if(targetObj[_TARGET][0].src){
					jQuery.each(targetObj[_TARGET],function(i,v){ if (v[swapSrc]) v.src = v[swapSrc];})
				}else{
					if (targetObj[swapSrc]) targetObj[_TARGET][0].style.backgroundImage = targetObj[swapSrc];
				}
			}

			jQuery(targetObj).mouseover(function(){_swapImage('_overSrc')});
			jQuery(targetObj).mousedown(function(){_swapImage('_downSrc')});
			jQuery(targetObj).mouseout(function(){_swapImage('_originalSrc')});
		};

		return this.each(function(){
			var _orgsrc = '';
			var _temp_extPattern;
			
			if(jQuery(this).is('img, :image')){
				_orgsrc = this.src;
				_extptn = /\.(gif|jpe?g?|png)$/;
			}else if(jQuery(this).css('background-image') != 'none'){
				_orgsrc = jQuery(this).css('background-image').replace(/^url\(["']/, "").replace(/["']\)$/, "");
				_extptn = /\.(gif|jpe?g?|png)\)$/;
			}

			this._originalSrc = _orgsrc;
			if(overSuffix) (new Image()).src = this._overSrc = _orgsrc.replace(_extptn,function($0){return(overSuffix + $0)});
			if(downSuffix) (new Image()).src = this._downSrc = _orgsrc.replace(_extptn,function($0){return(downSuffix + $0)});

			var _event_were_set = false;
			if(jQuery(this).is('img')){
				var _pn = jQuery(this).parent("a[href]");
				if(!_pn[_TARGET]) _pn[_TARGET] = new Array();
				_pn[_TARGET].push(this);
				setEvent(_pn);
				_event_were_set = true;
			}

			if((jQuery(this).is('img') && !_event_were_set) || jQuery(this).is(':image') || jQuery(this).css('background-image') != 'none'){
				var _selfElem = this;
				_selfElem[_TARGET] = new Array(_selfElem);
				setEvent(_selfElem);
			}
		});
	};
	jQuery("#fs01-site-title a[href] img, div#fs01-site-header-area ul#fs01-parents li a[href] img, ul#fs01-relational-link li a[href] img, p#fs01-breadcrumbs a[href] img, p#p0401-breadcrumbs a[href] img, div#fs01-current-site a[href] img").rollover("o");
	jQuery("input#fs01-search-submit").rollover("o", "a");
	jQuery("input#ind-pnsearch-button").rollover("o", "a");
	jQuery("input#MF_form_phrase").focus(
		function(e){
			jQuery(this).addClass("fs01-focus");
		}
	).blur(
		function(e){
			jQuery(this).removeClass("fs01-focus");
		}
	);
	jQuery("div#fs01-site-selector").mouseover(
		function(e){
			if (e.target == this || e.target == jQuery("div", this)[0]) jQuery(this).addClass("fs01-hover");
		}
	).mouseout(
		function(e){
			jQuery(this).removeClass("fs01-hover");
		}
	);
	jQuery("div#fs01-current-site a[href]").mouseover(
		function(e){
			jQuery("img", this).mouseover();
		}
	).mouseout(
		function(e){
			jQuery("img", this).mouseout();
		}
	);
});
