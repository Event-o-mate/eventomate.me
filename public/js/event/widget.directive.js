(function(){
  
  "use strict"
  
  angular
	  .module("EventoMate")
	  .directive("sntAddWidget", sntAddWidget)

	  function sntAddWidget($templateRequest, $compile) {
	  	var directive = {
	  		link: link,
	  		restrict: "AEC"
	  	}

	  	return directive

	  	function link(scope, element, attribute) {
	  		element.bind("click", function(event){
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