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

		function resizeBoxContentHeight()
		{
			if( ! isThereBoxContent() )
				return false;

			self.$boxContent.each(function(){
				var screenHeight = $(document).height();
				var $box = $(this);

				$box.height( screenHeight/100 * 70 );
			});
		}

		function isThereBoxContent()
		{
			return (self.$boxContent && self.$boxContent.length > 0);
		}
	}
})();