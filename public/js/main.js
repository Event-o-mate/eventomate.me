$(document).ready(function () {
	$( '.register-button' ).click(function() {
	  $( '.registar-dopdown-menu' ).css( 'opacity', '1');
	  $( '.login-dopdown-menu' ).css( 'opacity', '0');
	  $( '.register-button' ).css( 'color', '#FCB549');
	  $( '.login-button' ).css( 'color', 'white');
	});


	$( '.login-button' ).click(function() {
	  $( '.login-dopdown-menu' ).css( 'opacity', '1');
	 $( '.registar-dopdown-menu' ).css( 'opacity', '0');
	 $( '.login-button' ).css( 'color', '#FCB549');
	 $( '.register-button' ).css( 'color', 'white');
	});

	console.log("Loaded jquery")
})
