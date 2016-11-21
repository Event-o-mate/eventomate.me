(function(){
  'use strict'
  angular
  .module('EventoMate')
  .directive('ngLogin', ngLogin);

  function ngLogin($location) {
    var directive = {
      link: link
    }
    return directive 

    function link ( scope, element, attrs ) {
      $(".login-button").bind( 'click', function () {
        if( $('.registar-dopdown-menu').css('display') == 'block') {
          $('.registar-dopdown-menu').css("display", "none")  
        }
        
        if(element.css('display') == 'block'){
          element.css("opacity", 0)
          element.css("display", "none")
        }
        else {
          element.css("display", "block")
          element.css("opacity", 1)
        }
      });
    };
  }
})()