(function()
{
	"use strict";

	function VideoPage()
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
			self.$video.on("ended", function(){
				showOverlayOnScreen();
				setVideoAsWatched();
			});
		}

		function showOverlayOnScreen()
		{
			self.$video.addClass("ended");

			self.$overlay.removeClass("invisible");
			self.$overlay.addClass("visible");
		}

		function setVideoAsWatched()
		{
			localStorage.setItem("isVideoAlreadyWatched", "true");
		}

		function play()
		{
			var video = self.$video.get(0);
			video.play();
		}

		function isWatched()
		{
			var isWatched = localStorage.getItem("isVideoAlreadyWatched");
			return JSON.parse( isWatched );
		}
	
		return {
			play: play,
			isWatched: isWatched
		};
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.VideoPage = VideoPage;
})();