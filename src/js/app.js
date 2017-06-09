(function()
{
	"use strict";

	var HomeVideo = (new ScarpelliBrasil.VideoPage());
	var Pager = (new ScarpelliBrasil.Pager());

	(function initialize()
	{
		if(isHomeVideoWatched()){
			Pager.setActiveSectionById("quem-somos");
		} else {
			Pager.setActiveSectionById("video");
			HomeVideo.play();
		}
	})();

	function isHomeVideoWatched()
	{
		var isWatched = localStorage.getItem("isVideoAlreadyWatched");
		return JSON.parse(isWatched);
	}
})();