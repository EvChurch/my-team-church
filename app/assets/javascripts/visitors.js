$(document).on('turbolinks:load', function() {
	$("#headertext").typed({
		strings: ['Leadership Development ', 'Human Resource ', 'Process Documentation ', 'Time Saving '],
		typeSpeed: 0,
    backDelay: 5000,
    cursorChar: '<<',
    loop: true
	});
});
