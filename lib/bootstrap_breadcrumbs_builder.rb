# frozen_string_literal: true

class BootstrapBreadcrumbsBuilder < BreadcrumbsOnRails::Breadcrumbs::Builder
  def render
    @context.content_tag(:nav, class: 'breadcrumb') do
      elements_count = @elements.size
      i = 0
      @elements.collect do |element|
        i += 1
        render_element(element, i == elements_count)
      end.join.html_safe
    end
  end

  def render_element(element, last = false)
    if last
      @context.content_tag(:a, class: 'breadcrumb-item active') do
        compute_name(element)
      end
    else
      @context.link_to(compute_name(element), compute_path(element), element.options.merge(class: 'breadcrumb-item'))
    end
  end
end
