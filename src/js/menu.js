(function(){
	"use strict";

	function MenuComponent(menuButtonSelector, menuOverlaySelector)
	{
		var self = this;
		this.$menuButton = null;
		this.$menuOverlay = null;

		(function initialize()
		{
			if( ! menuButtonSelector || ! menuOverlaySelector)
				throw new Error("Constructor parameters are invalid");

			this.$menuButton = loadMenuButton();
			this.$menuOverlay = loadMenuOverlay();

			this.$menuButton.click(function(){
				$menuOverlay.fadeIn("fast", function(){
					console.log("menu overlay is now being shown");
				});
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
	}
})();