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
			resizeBoxesContent(self.$pagerSections);

			$(window).resize(function(){
				resizeBoxesContent(self.$pagerSections);
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
				var $boxContent = $pagerSection.find(".box-content");

				var marginBottom = 40;

				// jQuery's .height() method excludes padding/margin
				// jQuery's .innerHeight() method includes padding but no border
				$boxContent.innerHeight( $pagerSection.height() - marginBottom );
			});
		}
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.BoxContent = BoxContent;
})();