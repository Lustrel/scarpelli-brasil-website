(function()
{
	"use strict";

	var HomeVideo = (new ScarpelliBrasil.VideoPage());
	var Pager = (new ScarpelliBrasil.Pager());

	if( HomeVideo.isWatched() ){
		Pager.setActiveSectionById("quem-somos");
	} else {
		Pager.setActiveSectionById("video");
		HomeVideo.play();
	}
})();