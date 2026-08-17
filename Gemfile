source "https://rubygems.org"

# Dipendenze core di Jekyll
gem "jekyll", "~> 3.10.0"
gem "nokogiri", "~> 1.16.7"
gem "kramdown", "~> 2.4.0"
gem "kramdown-parser-gfm", "~> 1.1.0"

# Isola github-pages SOLO in produzione per bloccare jekyll-github-metadata in locale
group :production do
  gem "github-pages", "~> 232"
end

# Plugin necessari per il design system e la compilazione del sito
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17.0"
  gem "jekyll-seo-tag", "~> 2.8.0"
  gem "jekyll-remote-theme", "~> 0.4.3"
  gem "jekyll-include-cache", "~> 0.2.1"
end

# Tema e utility per l'ambiente di sviluppo locale (offline)
gem "chulapa-jekyll"
gem "faraday-retry"

# Gemme necessarie per Windows
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster per watching directories su Windows
platforms :mingw, :x64_mingw, :mswin do
  gem "wdm", "~> 0.1.1"
end

# Lock http_parser.rb per JRuby
platforms :jruby do
  gem "http_parser.rb", "~> 0.6.0"
end