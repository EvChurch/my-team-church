// app/assets/javascripts/goals.js

function toggleGoalKind() {
  var selected = $('#goal_kind').find(':selected').val();
  $('#value_goal_kind').hide();
  $('#objective_goal_kind').hide();
   if (selected === 'objective') {
    $('#value_goal_kind').hide();
    $('#objective_goal_kind').show();
  } else if (selected === 'value') {
    $('#value_goal_kind').show();
    $('#objective_goal_kind').hide();
  }
}

$(document).on('turbolinks:load', function() {
    $('#resource_type_select').on('change', function () {
        var selected = $(this).find(':selected').val();
        var url = $(this).attr('data-url').replace('selected', selected)

        $.ajax({
            url: url,
            processData: false,
            contentType: false,
            dataType: 'script'
        });
        return false;
    });

    $('#goal_kind').on('change', toggleGoalKind);
    toggleGoalKind();
});
