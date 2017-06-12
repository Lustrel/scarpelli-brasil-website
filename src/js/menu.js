(function(){
	"use strict";

	function MenuComponent(menuButtonSelector, menuOverlaySelector, menuCloseSelector)
	{
		var self = this;
		this.$menuButton = null;
		this.$menuOverlay = null;
		this.$menuClose = null;

		(function initialize()
		{
			if( ! menuButtonSelector || ! menuOverlaySelector)
				throw new Error("Constructor parameters are invalid");

			self.$menuButton = loadMenuButton();
			self.$menuOverlay = loadMenuOverlay();
			self.$menuClose = loadMenuClose();

			self.$menuButton.click(function(){
				self.$menuOverlay.fadeIn(500);
			});

			self.$menuClose.click(function(){
				self.$menuOverlay.fadeOut(500);
			});
		})();

		function loadMenuButton()
		{
			var $menuButton = $(menuButtonSelector);
			if( ! $menuButton || $menuButton.length < 1 )
				throw new Error("Given menu button selector doesn't match any element in DOM.");

			return $menuButton;
		}

		function loadMenuOverlay()
		{
			var $menuOverlay = $(menuOverlaySelector);
			if( ! $menuOverlay || $menuOverlay.length < 1 )
				throw new Error("Given menu overlay selector doesn't match any element in DOM.");

			return $menuOverlay;
		}

		function loadMenuClose()
		{
			var $menuClose = $(menuCloseSelector);
			if( ! $menuClose || $menuClose.length < 1 )
				throw new Error("Given menu close selector doesn't match any element in DOM.");

			return $menuClose;
		}
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.Menu = MenuComponent;
})();