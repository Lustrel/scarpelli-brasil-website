(function()
{
	"use strict";

	function VideoPage()
	{
		var self = this;
		this.$video = null;
		this.$overlay = null;
		this.$menuIcon = null;

		(function initialize()
		{
			loadVideoFromDOM();
			loadOverlayFromDOM();
			loadMenuIconFromDOM();
		
			hideMenuIconOnScreen();
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

		function loadMenuIconFromDOM()
		{
			var $menuIcon = $("#menu-icon");

			if( ! $menuIcon || $menuIcon.length < 1)
				throw new Error("No menu icon found.");

			self.$menuIcon = $menuIcon;
		}

		function hideMenuIconOnScreen()
		{
			self.$menuIcon.addClass("invisible");
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

		function showMenuIconOnScreen()
		{
			self.$menuIcon.removeClass("invisible");
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
	
		return {
			play: play
		};
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.VideoPage = VideoPage;
})();