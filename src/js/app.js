(function()
{
	"use strict";

	var HomeVideo = (new ScarpelliBrasil.VideoPage());
	var Pager = (new ScarpelliBrasil.Pager());
	var Sidebar = (new ScarpelliBrasil.Sidebar("menu-icon", "side-menu"));

	if( HomeVideo.isWatched() ){
		Pager.setActiveSectionById("quem-somos");
	} else {
		Pager.setActiveSectionById("video");
		HomeVideo.play();
	}
})();