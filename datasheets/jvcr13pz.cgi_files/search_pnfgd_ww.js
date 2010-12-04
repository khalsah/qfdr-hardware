//==========================================================
//
// E-Catalog Part-No. Search JavaScript
//
//==========================================================
//------------------
// Part-No. Search
//------------------
function SearchPnfgd() {
	if ( InputCheck() ) {
		document.SearchPnfgdForm.action = "/www-cgi/jvcr31pz.cgi?E+PZ+1++1+WW";
		document.SearchPnfgdForm.submit();
	}
}
//------------------
// Check Input
//------------------
function InputCheck() {
	fm = document.SearchPnfgdForm.pnfgd;
	if( fm.value == "" || fm.value.length < 3 ) {
		alert( '3 or more letters, please.' );
		fm.focus();
		return false;
	}
	if( fm.value.slice(0,1) == "*" || fm.value.slice(0,1) == "?" ||
		fm.value.slice(1,2) == "*" || fm.value.slice(1,2) == "?" ||
		fm.value.slice(2,3) == "*" || fm.value.slice(2,3) == "?" ) {
		alert( '3 or more letters, please.' );
		fm.focus();
		return false;
	}
	if (!chkSingleByte(fm.value)) {
		alert( 'Single byte only.' );
		fm.focus();
		return false;
	}
	pnfgd = fm.value.toUpperCase();
	fm.value = pnfgd;
	return true;
}
//------------------
// Check Single Byte
//------------------
function chkSingleByte(strSrc) {
	return /^[a-zA-Z0-9-/*?]+$/.test(strSrc);
}
//------------------
// Default Word
//------------------
function setDefWord(id,sw) {
	if (sw == 'on'){
		if (id.value.indexOf('3 or more letters') > -1) {
			id.value='';
		}
	} else {
		if (id.value == '') {
			id.value = '> 3 or more letters';
		}
	}
}
