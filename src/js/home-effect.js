(function()
{
	"use strict";

	function HomeEffect()
	{
		var self = this;
		this.$video = null;
		this.$overlay = null;

		(function initialize()
		{
			loadVideoFromDOM();
			loadOverlayFromDOM();

			hideOverlayOnScreen();
			addVideoEndListener();
		})();

		function loadVideoFromDOM()
		{
			var $video = $("#video > video");

			if( ! $video || $video.length < 1)
				throw new Error("No video found.");

			self.$video = $video;
		}

		function loadOverlayFromDOM()
		{
			var $overlay = $("#video > .overlay");

			if( ! $overlay || $overlay.length < 1)
				throw new Error("No content found.");

			self.$overlay = $overlay;
		}

		function hideOverlayOnScreen()
		{
			self.$overlay.addClass("invisible");
		}

		function addVideoEndListener()
		{
			self.$video.on("ended", showOverlayOnScreen);
		}

		function showOverlayOnScreen()
		{
			self.$video.addClass("ended");

			self.$overlay.removeClass("invisible");
			self.$overlay.addClass("visible");
		}
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.HomeEffect = HomeEffect;
})();