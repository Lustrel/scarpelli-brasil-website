(function()
{
	"use strict";

	function FullScreen()
	{
		var self = this;
		this.$elements = [];

		(function initialize()
		{
			loadElementsFromDOM();
			makeElementsFullScreen();
		})();

		function loadElementsFromDOM()
		{
			var $elements = $("[data-full-screen]");

			if(areElementsEmpty($elements)) 
				return false;
		
			$elements.each(function()
			{
				self.$elements.push($(this));
			});
		}

		function areElementsEmpty(elements)
		{
			return ( ! elements || elements.length < 1);
		}

		function makeElementsFullScreen()
		{
			if(areElementsEmpty(self.$elements))
				return false;

			self.$elements.each(function()
			{
				$elements.css({
					"position": "absolute",
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				});
			});
		}
	}
});