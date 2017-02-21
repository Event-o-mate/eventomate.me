(function(){
  
  "use strict"
  
  angular
	  .module("EventoMate")
	  .directive("sntAddWidget", sntAddWidget)

	  function sntAddWidget($templateRequest, $compile) {
	  	var directive = {
	  		link: link,
	  		restrict: "AEC",
	  		controller: "CreateEventController",
	  	}

	  	return directive

	  	function link(scope, element, attr, ctrl) {	  		
	  		element.bind("click", function(event){
	  			var widget_type = $(this).attr("type")
	  			ctrl.addSection(widget_type)
	  			$templateRequest("templates/comments").then(function(html){
	  				var template = angular.element(html);
	  				element.closest(".widgets-list").remove();
	  				$(".remove-section-btn").after(template)
	  				$compile(template)(scope);
	  			})
	  		})
	  	}
	  }
})()