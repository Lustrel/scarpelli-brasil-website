(function()
{
	function ContactForm(formSelector, submitBtnSelector)
	{
		(function initialize()
		{
			var $form = $(formSelector);
			var $button = $(submitBtnSelector);

			if( ! $form || ! $button )
				throw new Error("Constructor parameters are not valid or does not match any DOM element.");

			$button.click(function()
			{
				var name = $form.find("input[name='name']").val();
				var email = $form.find("input[name='email']").val();
				var phone = $form.find("input[name='phone']").val();
				var message = $form.find("textarea[name='message']").val();

				var buttonOldText = $button.text();
				$button.addClass("sending");
				$button.text("Enviando...");
			
				setTimeout(function(){
					$button.removeClass("sending");
					$button.text(buttonOldText);
				}, 2000);
			});
		})();
	}

	window.ScarpelliBrasil = window.ScarpelliBrasil || {};
	window.ScarpelliBrasil.ContactForm = ContactForm;

	
})();