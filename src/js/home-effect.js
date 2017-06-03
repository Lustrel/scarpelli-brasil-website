(function()
{
	"use strict";

	function HomeEffect()
	{
		var self = this;
		this.$video = null;
		this.$content = null;

		(function initialize()
		{
			loadVideoFromDOM();
			loadContentFromDOM();

			hideContentOnScreen();
			addVideoEndListener();
		})();

		function loadVideoFromDOM()
		{
			var $video = $("#video > video");

			if( ! $video || $video.length < 1)
				throw new Error("No video found.");

			self.$video = $video;
		}

		function loadContentFromDOM()
		{
			var $content = $("#video > .content");

			if( ! $content || $content.length < 1)
				throw new Error("No content found.");

			self.$content = $content;
		}

		function hideContentOnScreen()
		{
			self.$content.css({
				"opacity": 0
			});
		}

		function addVideoEndListener()
		{
			self.$video.on("ended", showContentOnScreen);
		}

		function showContentOnScreen()
		{
			self.$content.css({
				"opacity": 1
			});
		}
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.HomeEffect = HomeEffect;
})();