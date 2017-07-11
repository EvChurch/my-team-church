// app/assets/javascripts/objectives.js

function toggleObjectiveKind() {
  var selected = $('#objective_kind').find(':selected').val();
  $('#value_objective_kind').hide();
  $('#objective_objective_kind').hide();
   if (selected === 'objective') {
    $('#value_objective_kind').hide();
    $('#objective_objective_kind').show();
  } else if (selected === 'value') {
    $('#value_objective_kind').show();
    $('#objective_objective_kind').hide();
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

    $('#objective_kind').on('change', toggleObjectiveKind);
    toggleObjectiveKind();
});
