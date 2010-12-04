/*@cc_on _d=document;eval('var document=_d')@*/
if(!/MSIE.+Mac/.test(navigator.userAgent)){
	(function(){
		if (!document.getElementsByTagName) return;
		function getSharedDir() {
			var s = document.getElementsByTagName("script");
			var ptn = /(.*\/?common\/fs01\/).+$/;
			for(var i=s.length-1;i>=0;i--){
				if(ptn.test(s[i].src)){
					return RegExp.$1;
				}
			}
		}
		var sharedDir = getSharedDir() + 'js/';
		var require = function(){
			for(var i=0,l=arguments.length;i<l;i++){
				document.write('<script type="text/javascript" src="' + sharedDir + arguments[i] + '"><\/script>');
			}
		}
		require('jquery-1.2.6.pack.js');
		require('navigation.js');
		require('site-selector.js');
		require('init.js');
	})();
}
