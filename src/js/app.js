(function()
{
	"use strict";

	var HomeVideo = (new ScarpelliBrasil.VideoPage());
	var Pager = (new ScarpelliBrasil.Pager());
	var Menu = (new ScarpelliBrasil.Menu("#menu-icon", "#menu", "#menu-close"));
	var BoxContent = (new ScarpelliBrasil.BoxContent());
	var ContactForm = (new ScarpelliBrasil.ContactForm("#form-contact", "#form-contact-submit"));

	if( HomeVideo.isWatched() ){
		var sectionId = sectionIdFromURL();

		if( ! sectionId )
			Pager.setActiveSectionById("quem-somos");
		else
			Pager.setActiveSectionById(sectionId);
	} else {
		Pager.setActiveSectionById("video");
		HomeVideo.play();
	}

	function sectionIdFromURL()
	{
		var id = window.location.hash;

		// Remove #
		id = id.substring(1);

		// Remove / at the end if exists
		if( id[id.length - 1] == '/' )
			id = id.substring(0, id.length - 1);

		return id;
	}
})();