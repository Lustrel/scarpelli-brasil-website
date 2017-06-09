(function(){

	"use strict";

	function Sidebar(menuIconId, menuPanelId)
	{
		var self = this;
		self._menuIconElement;
		self._menuPanelElement;
		self._overlayElement;

		(function initialize(){
			validateConstructorParameters(menuIconId, menuPanelId);
			loadElementsFromDOM(menuIconId, menuPanelId);
			makeMenuPanelInvisible();
			createMenuIconListener();
			//createCloseMenuListener();
			createMenuItemListener();
		})();

		function validateConstructorParameters(menuIconId, menuPanelId)
		{
			if(!menuIconId) throw new Error("You must specify the menu icon element id");
			if(!menuPanelId) throw new Error("You must specify the menu panel element id");
		}

		function loadElementsFromDOM(menuIconId, menuPanelId)
		{
			var menuIconElement = document.getElementById(menuIconId);
			if(!menuIconElement) throw new Error("An element with the given menu icon id was not found");

			var menuPanelElement = document.getElementById(menuPanelId);
			if(!menuPanelElement) throw new Error("An element with the given menu panel id was not found");

			self._menuIconElement = menuIconElement;
			self._menuPanelElement = menuPanelElement;
		}

		function makeMenuPanelInvisible()
		{
			var panelWidth = self._menuPanelElement.offsetWidth;
			self._menuPanelElement.style.marginRight = (panelWidth * -1) + "px";

			removeTransparentBackground();
			removeElementClass(self._menuPanelElement, "open");
		}

		function makeMenuPanelVisible()
		{
			self._menuPanelElement.style.marginRight = 0;
			addTransparentBackground();
			addElementClass(self._menuPanelElement, "open");
		}

		function addTransparentBackground()
		{
			createTransparentBackgroundElement();
			createTransparentBackgroundListener();
		}

		function createTransparentBackgroundElement()
		{
			var bodyElement = document.getElementsByTagName("body")[0];
			self._overlayElement = document.createElement("section");
			self._overlayElement.className = "sidebar-overlay";
			bodyElement.appendChild(self._overlayElement);
		}

		function createTransparentBackgroundListener()
		{
			self._overlayElement.addEventListener("click", makeMenuPanelInvisible);
		}

		function removeTransparentBackground()
		{
			if(!self._overlayElement) return false;

			self._overlayElement.parentNode.removeChild(self._overlayElement);
			self._overlayElement = null;
		}

		function createMenuIconListener()
		{
			self._menuIconElement.addEventListener("click", function(event){
				makeMenuPanelVisible();
			});
		}

		function createCloseMenuListener()
		{
			var closeElement = findElementChildByClass(self._menuPanelElement, "close");
			closeElement.addEventListener("click", function(event){
				makeMenuPanelInvisible();
			});
		}

		function createMenuItemListener()
		{
			var listElement = self._menuPanelElement.getElementsByTagName("ul")[0];
			if(!listElement) throw new Error("The menu panel must have a ul element inside it");

			var listItems = listElement.getElementsByTagName("li");
			for(var i = 0; i < listItems.length; i++)
			{
				listItems[i].addEventListener("click", function(event){
					makeMenuPanelInvisible();
				});
			}
		}

		/*
		 * Utilities
		 */
		function addElementClass(element, classToAdd)
		{
			var classes = element.className.split(" ");

			if(!classes || classes.length < 1) 
				return false;

			classes.push(classToAdd);
			return element.className = classes.join(" ");
		}

		function removeElementClass(element, classToRemove)
		{
			var classes = element.className.split(" ");

			if(!classes || classes.length < 1)
				return false;

			for(var i = 0; i < classes.length; i++)
			{
				if(classes[i] == classToRemove)
					classes.splice(i, 1);
			}

			return element.className = classes.join(" ");
		}

		function findElementChildByClass(parentElement, className)
		{
			var children = parentElement.childNodes;
			if(!children || children.length < 1) return false;

			for(var i = 0; i < children.length; i++)
			{
				if(elementHasClass(children[i], className))
					return children[i];
			}
		}

		function elementHasClass(element, className)
		{
			if(!element.className) return false;

			var classes = element.className.split(" ");
			return classes.some(function(theClass){
				return theClass == className;
			});
		}
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.Sidebar = Sidebar;
})();