(function()
{
	"use strict";

	function VideoPage()
	{
		var self = this;
		this.$video = null;
		this.$overlay = null;
		this.$menuIcon = null;
		this.$button = null;

		(function initialize()
		{
			loadVideoFromDOM();
			loadOverlayFromDOM();
			loadMenuIconFromDOM();
			loadButtonFromDOM();
		
			hideMenuIconOnScreen();
			hideOverlayOnScreen();
			addVideoEndListener();
			addButtonListener();
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

		function loadButtonFromDOM()
		{
			var $button = $("#video .meet");

			if( ! $button || $button.length < 1)
				throw new Error("No button found.");

			self.$button = $button;
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
			self.$video.on("ended", showOverlayOnScreen);
		}

		function addButtonListener()
		{
			self.$button.click(function(){
				localStorage.setItem("isVideoAlreadyWatched", "true");
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
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.VideoPage = VideoPage;
})();