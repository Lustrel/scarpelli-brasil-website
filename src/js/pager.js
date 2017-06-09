/**
 * Pager is a little plugin which makes each section as a full page element.
 * It was built using Vanilla-JS and will be converted to jQuery soon.
 * 
 * @author Stanley Sathler <stanley@lustrel.com.br>
 */

(function(){

	"use strict";

	function Pager()
	{
		var sectionsElements = [];
		var self = this;

		/*
		 * Events names
		 */
		var ON_BEFORE_CHANGE = "Pager.onBeforeChange";
		var ON_AFTER_CHANGE = "Pager.onAfterChange";

		/*
		 * Events instances
		 */
		this.events = {
			beforeChange: null,
			afterChange: null
		};

		(function initialize(){
			mapSectionsElements();
			hideSections();
			applyFullScreenOnSections();
			setInitialActiveSection();
			createUrlChangeListener();
		})();

		function mapSectionsElements()
		{
			var sections = document.getElementsByClassName("pager-section");

			if( ! sections || sections.length < 1) 
				throw new Error("You must have at least one pager-section element for use PagerJS");

			for(var i = 0; i < sections.length; i++)
			{
				var sectionId = sections[i].id;
				var element = { id: sectionId, element: document.getElementById(sectionId) };
				sectionsElements.push(element);
			}
		}

		function hideSections()
		{
			sectionsElements.forEach(function(element){
				hideElement(element.element);
			});
		}

		function hideElement(element)
		{
			element.style.display = "none";
		}

		function applyFullScreenOnSections()
		{
			sectionsElements.forEach(function(element){
				element = element.element;

				var elementClasses = getClasses(element);
				elementClasses.push("pager-fullscreen");
				element.className = toClasses(elementClasses);
			});
		}

		function getClasses(element)
		{
			var className = element.className;
			return className ? element.className.split(" ") : [];
		}

		function toClasses(classes)
		{
			return classes.join(" ");
		}

		function setInitialActiveSection()
		{
			var url = window.location.hash;

			if(!url || url.length < 1)
				//return setActiveSectionById(sectionsElements[0].id);
				return false;

			url = url.substring(1);
			return setActiveSectionById(url);
		}

		function setActiveSectionById(sectionId)
		{
			triggerBeforePageChange({id: sectionId});

			sectionsElements.forEach(function(element){
				if(element.id === sectionId) showElement(element.element);
				else hideElement(element.element);
			});

			triggerAfterPageChange({id: sectionId});
		}

		function showElement(element)
		{
			element.style.display = "block";
		}

		function createUrlChangeListener()
		{
			window.addEventListener("hashchange", function(event){
				var newURL = event.newURL;
				var targetSectionId = newURL.substring( newURL.indexOf("#") + 1 );
				setActiveSectionById(targetSectionId);
			});
		}

		function triggerBeforePageChange(data)
		{
			var events = self.events;

			if( ! events.beforeChange )
				events.beforeChange = new CustomEvent(ON_BEFORE_CHANGE);

			document.dispatchEvent(events.beforeChange);
		}

		function triggerAfterPageChange(data)
		{
			var events = self.events;

			if( ! events.afterChange )
				events.afterChange = new CustomEvent(ON_AFTER_CHANGE);

			document.dispatchEvent(events.afterChange);
		}

		return {
			triggerBeforePageChange: triggerBeforePageChange,
			triggerAfterPageChange: triggerAfterPageChange,
			setActiveSectionById: setActiveSectionById
		};
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.Pager = Pager;

})();