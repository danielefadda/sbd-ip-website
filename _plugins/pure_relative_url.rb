# frozen_string_literal: true

# Override Jekyll's relative_url behavior to generate pure file-relative paths
# based on the current page output location. This keeps links portable when
# url/baseurl are empty and the site is served from any subdirectory or file://.
module PureRelativeUrlFilter
  ABSOLUTE_URI = %r{\A(?:[a-z][a-z0-9+.-]*:)?//}i

  def relative_url(input)
    return default_relative_url(input) unless pure_relative_paths_enabled?

    return input if input.nil?

    value = input.to_s
    return value if value.empty?
    return value if value.match?(ABSOLUTE_URI)
    return value if value.start_with?("mailto:", "tel:", "#")

    target = value.sub(%r{\A/+}, "").sub(%r{\A\./+}, "")
    page_url = current_page_url
    prefix = "../" * depth_from_page_url(page_url)

    "#{prefix}#{target}"
  end

  private

  def pure_relative_paths_enabled?
    site_register = @context&.registers&.dig(:site)
    site_config = site_register&.config
    return false unless site_config.is_a?(Hash)

    site_config["pure_relative_paths"] == true
  rescue StandardError
    false
  end

  def default_relative_url(input)
    Jekyll::Filters::URLFilters.instance_method(:relative_url).bind(self).call(input)
  end

  def current_page_url
    include_hash = @context && @context["include"]
    if include_hash.is_a?(Hash)
      page_url = include_hash["pageurl"]
      return page_url.to_s unless page_url.nil? || page_url.to_s.empty?

      include_page = include_hash["page"]
      if include_page.is_a?(Hash) && include_page["url"]
        return include_page["url"].to_s
      end
    end

    page_from_context = @context && @context["page"]
    if page_from_context.is_a?(Hash) && page_from_context["url"]
      return page_from_context["url"].to_s
    end

    if @context&.respond_to?(:environments)
      @context.environments.each do |env|
        next unless env.is_a?(Hash)

        env_page = env["page"]
        if env_page.is_a?(Hash) && env_page["url"]
          return env_page["url"].to_s
        end
      end
    end

    if @context&.respond_to?(:scopes)
      @context.scopes.reverse_each do |scope|
        next unless scope.is_a?(Hash)

        scope_page = scope["page"]
        if scope_page.is_a?(Hash) && scope_page["url"]
          return scope_page["url"].to_s
        end

        scope_jekyll = scope["jekyll"]
        if scope_jekyll.is_a?(Hash)
          jekyll_page = scope_jekyll["page"]
          if jekyll_page.is_a?(Hash) && jekyll_page["url"]
            return jekyll_page["url"].to_s
          end
        end
      end
    end

    jekyll_context = @context && @context["jekyll"]
    if jekyll_context.is_a?(Hash)
      jekyll_page = jekyll_context["page"]
      if jekyll_page.is_a?(Hash) && jekyll_page["url"]
        return jekyll_page["url"].to_s
      end
    end

    page_register = @context&.registers&.dig(:page)
    if page_register.is_a?(Hash) && page_register["url"]
      return page_register["url"].to_s
    end

    "/"
  rescue StandardError
    "/"
  end

  def depth_from_page_url(page_url)
    return 0 if page_url.nil? || page_url.empty? || page_url == "/"

    trimmed = page_url.sub(%r{\A/}, "")
    segments = trimmed.split("/").reject(&:empty?)
    return 0 if segments.empty?

    if page_url.end_with?("/")
      segments.length
    else
      [segments.length - 1, 0].max
    end
  end
end

Liquid::Template.register_filter(PureRelativeUrlFilter)
