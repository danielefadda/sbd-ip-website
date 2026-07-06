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

  def fetch_key(container, key)
    return nil if container.nil?

    if container.is_a?(Hash)
      return container[key] if container.key?(key)

      sym_key = key.to_sym
      return container[sym_key] if container.key?(sym_key)
      return nil
    end

    return nil unless container.respond_to?(:[])

    begin
      value = container[key]
      return value unless value.nil?
    rescue StandardError
      nil
    end

    begin
      sym_key = key.to_sym
      container[sym_key]
    rescue StandardError
      nil
    end
  end

  def extract_url(candidate)
    return nil if candidate.nil?

    if candidate.is_a?(String)
      value = candidate.to_s
      return value unless value.empty?
      return nil
    end

    value = fetch_key(candidate, "url")
    if value.nil? && candidate.respond_to?(:url)
      begin
        value = candidate.url
      rescue StandardError
        value = nil
      end
    end

    return nil if value.nil?

    value = value.to_s
    return nil if value.empty?

    value
  end

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
    unless include_hash.nil?
      page_url = fetch_key(include_hash, "pageurl")
      page_url = extract_url(page_url)
      return page_url unless page_url.nil?

      include_page = fetch_key(include_hash, "page")
      include_page_url = extract_url(include_page)
      return include_page_url unless include_page_url.nil?
    end

    page_from_context = @context && @context["page"]
    page_from_context_url = extract_url(page_from_context)
    return page_from_context_url unless page_from_context_url.nil?

    if @context&.respond_to?(:environments)
      @context.environments.each do |env|
        next if env.nil?

        env_page = fetch_key(env, "page")
        env_page_url = extract_url(env_page)
        return env_page_url unless env_page_url.nil?
      end
    end

    if @context&.respond_to?(:scopes)
      @context.scopes.reverse_each do |scope|
        next if scope.nil?

        scope_page = fetch_key(scope, "page")
        scope_page_url = extract_url(scope_page)
        return scope_page_url unless scope_page_url.nil?

        scope_jekyll = fetch_key(scope, "jekyll")
        jekyll_page = fetch_key(scope_jekyll, "page")
        jekyll_page_url = extract_url(jekyll_page)
        return jekyll_page_url unless jekyll_page_url.nil?
      end
    end

    jekyll_context = @context && @context["jekyll"]
    jekyll_page = fetch_key(jekyll_context, "page")
    jekyll_page_url = extract_url(jekyll_page)
    return jekyll_page_url unless jekyll_page_url.nil?

    page_register = @context&.registers&.dig(:page)
    page_register_url = extract_url(page_register)
    return page_register_url unless page_register_url.nil?

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
