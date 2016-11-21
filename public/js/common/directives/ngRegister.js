(function(){
  'use strict'
  angular
  .module('EventoMate')
  .directive('ngRegister', ngRegister);

  function ngRegister($location) {
    var directive = {
      link: link
    }
    return directive 

    function link ( scope, element, attrs ) {
      $(".register-button").bind( 'click', function () {
        if($('.login-dopdown-menu').css('display') == 'block') {
          $('.login-dopdown-menu').css("display", "none")  
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