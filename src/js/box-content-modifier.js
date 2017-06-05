(function()
{
	"use strict";

	function BoxContentModifier()
	{
		var self = this;
		this.$boxContent = null;

		(function initialize(){
			loadBoxContentFromDOM();
			resizeBoxContentHeight();
		})();

		function loadBoxContentFromDOM()
		{
			self.$boxContent = $(".box-content");
		}

		function isThereBoxContent()
		{
			return (self.$boxContent && self.$boxContent.length > 0);
		}

		

	}
})();