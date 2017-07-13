$(document).on('turbolinks:load', function() {
  $('.descendant').hide();
  $('.descendant-toggle').click(function() {
    if($(this).hasClass('fa-plus-square-o')) {
      $('.parent-' + $(this).parents('tr').attr('id')).show();
    } else {
      $('.ancestor-' + $(this).parents('tr').attr('id')).hide();
    }
    $(this).toggleClass('fa-plus-square-o').toggleClass('fa-minus-square-o');
  });

  $('.delete-department').click(function() {
    var tr = $(this).parents('tr');
    $.ajax({
      url: '/departments/' + tr.attr('id'),
      type: 'DELETE',
      success: function() {
        tr.remove();
      }
    });
  });

  $('.new-unit-form').submit(function(event) {
    var input = $(this).children('input[type="text"]');
    if(input.val() !== '') {
      $.post({
        url: '/departments',
        data: $(this).serialize(),
        success: function() {
          input.val('');
        }
      });
    }
    event.preventDefault();
  });
});
