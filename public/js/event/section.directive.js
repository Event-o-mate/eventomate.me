(function(){
  
  'use strict'
  
  angular
	  .module('EventoMate')
	  .directive('sntAddEventSection', sntAddEventSection)
	  .directive('sntRemoveEventSection', sntRemoveEventSection)

  function sntAddEventSection($templateRequest, $compile) {
  	var directive = {
      link: link,
      restrict: 'AEC'
    }
    
    return directive

    function link(scope, element, attribute) {
    	element.bind("click", function(){
    		$templateRequest('templates/new_section').then(function(html){
          var template = angular.element(html);
          element.before(template);
          $compile(template)(scope)
        });
    	})
    }
	}

	function sntRemoveEventSection() {
		var directive = {
			link: link,
			restrict: 'AEC',
		}

		return directive

		function link(scope, element, attribute) {
			element.bind('click', function() {
				element.closest('.event-section').remove()
				console.log("remove section")
			})
		}
	}
})()