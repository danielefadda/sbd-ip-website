# frozen_string_literal: true

# Ensure generated HTML keeps asset/feed links portable on nested pages.
# This complements the relative_url override for cases where theme templates
# emit bare relative links like "assets/..." without depth prefixes.
module PostRenderFixRelativeAssets
  module_function

  def apply!(doc)
    return unless html_doc?(doc)
    return unless pure_relative_paths_enabled?(doc)

    prefix = depth_prefix(doc.url)
    return if prefix.empty?

    output = doc.output

    output = output.gsub(/(href|src|content)=(['"])assets\//i) do
      %(#{$1}=#{$2}#{prefix}assets/)
    end

    output = output.gsub(/(href|src)=(['"])(atom\.xml|rss\.xml|feed\.xml|search\.json)\2/i) do
      %(#{$1}=#{$2}#{prefix}#{$3}#{$2})
    end

    output = output.gsub(/url\((['"]?)assets\//i) do
      "url(#{$1}#{prefix}assets/"
    end

    doc.output = output
  end

  def html_doc?(doc)
    return false unless doc.respond_to?(:output_ext)

    doc.output_ext.to_s.downcase == ".html"
  end

  def pure_relative_paths_enabled?(doc)
    site_config = doc&.site&.config
    return false unless site_config.is_a?(Hash)

    site_config["pure_relative_paths"] == true
  rescue StandardError
    false
  end

  def depth_prefix(url)
    page_url = url.to_s
    return "" if page_url.empty? || page_url == "/"

    trimmed = page_url.sub(%r{\A/}, "")
    segments = trimmed.split("/").reject(&:empty?)
    return "" if segments.empty?

    depth = if page_url.end_with?("/")
      segments.length
    else
      [segments.length - 1, 0].max
    end

    "../" * depth
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  PostRenderFixRelativeAssets.apply!(page)
end

Jekyll::Hooks.register :documents, :post_render do |document|
  PostRenderFixRelativeAssets.apply!(document)
end
