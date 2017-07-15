(function(){
  
  'use strict';
  
  angular
	  .module('EventoMate')
	  .directive('ngDateTime', ngDateTime)

	  function ngDateTime(dateFilter) {
	  	var directive = {
	      require:'ngModel',
	      link: formatDate
	    }
	    
	    return directive

	    function formatDate(scope, elm, attrs, ctrl) {
	      var dateFormat = attrs['date'] || 'yyyy-MM-dd';     
	      ctrl.$formatters.unshift(function (modelValue) {
	          return dateFilter(modelValue, dateFormat);
	      });   
	    }
		}

})()
