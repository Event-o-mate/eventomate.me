(function(){
  
  'use strict'
  
  angular
	  .module('EventoMate')
	  .directive('sntAddEventSection', sntAddEventSection)
	  .directive('sntRemoveEventSection', sntRemoveEventSection)

  function sntAddEventSection($templateRequest, $compile) {
  	var directive = {
      link: link,
      restrict: 'AEC',
      controller: "CreateEventController"
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
			controller: "CreateEventController"
		}

		return directive

		function link(scope, element, attribute, ctrl) {
			element.bind('click', function() {
				var widget_type = element.find('.container').attr('type')
				element.closest('.event-section').remove()
				ctrl.removeSection(widget_type)
			})
		}
	}
})()