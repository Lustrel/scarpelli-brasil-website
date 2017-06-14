/**
 * This script works directly on the size of .box-content elements.
 * Due a bug in CSS rendering, we have to align the call-to-action button 
 * manually using JavaScript. Also, we have to set the height based on 
 * screen's size.
 * 
 * @author Stanley Sathler <stanley@lustrel.com.br>
 */

(function()
{
	"use strict";

	function BoxContent()
	{
		var self = this;
		this.$pagerSections = null;

		(function initialize(){
			self.$pagerSections = loadSections();

			$(document).ready(function(){
				resizeBoxesContent(self.$pagerSections);
				alignCallToAction(self.$pagerSections);
			});

			$(window).resize(function(){
				resizeBoxesContent(self.$pagerSections);
				alignCallToAction(self.$pagerSections);
			});

			$(document).on("Pager:onAfterPageChange", function(){
				alignCallToAction(self.$pagerSections);
			});
		})();

		function loadSections()
		{
			return loadElement("section.pager-section");
		}

		function loadElement(selector)
		{
			var $element = $(selector);
			if( ! $element || $element.length < 1 )
				return $([]);

			return $element;
		}

		function resizeBoxesContent($pagerSections)
		{
			$pagerSections.each(function(){
				var $pagerSection = $(this);
				var $boxContent = $pagerSection.find(".box-content:not(.no-resize)");

				var marginBottom = 40;

				// jQuery's .height() method excludes padding/margin
				// jQuery's .innerHeight() method includes padding but no border
				$boxContent.innerHeight( $pagerSection.height() - marginBottom );
			});
		}

		function alignCallToAction($pagerSections)
		{
			$pagerSections.each(function()
			{
				var $section = $(this);
				var $button = $section.find(".call-to-action");
				if( ! $button || $button.length < 1 )
					return;

				var targetSelector = $button.attr("data-target");
				var $target = $(targetSelector);

				if( ! $target || $target.length < 1 )
					return;

				var targetBottomY = ($target.position().top + $target.outerHeight());
				var targetMiddleX = ($target.position().left + ($target.outerWidth() / 2));
				var buttonHeight = $button.outerHeight();
				var buttonWidth = $button.outerWidth();
				var buttonY = (targetBottomY - buttonHeight / 2);
				var buttonX = (targetMiddleX - buttonWidth / 2);

				$button.css({ left: buttonX + "px", top: buttonY + "px", position: "absolute" });
			});
		}
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.BoxContent = BoxContent;
})();