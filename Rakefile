require 'erb'

# generate the site
desc "Generate the html files for the site"
task :gensite do
  ep = YAML::load( File.open('episodes.yaml') )

  counter = 0
  @content = ''
  ep['episodes'].each do |section|
    if(counter += 1) == 4
      @content += '<div class="span-6 last">'
    else
      @content += '<div class="span-5">'
    end
    @content += "<h2>" +  section['section'] + "</h2>"
    section['values'].each do |episode|
      @content += "<div class='episode'>"
      @content += '<b>' + episode['name'] + '</b>'
      @content += '<p>' + episode['desc'] + '</p>'
      @content += "</div>"
    end
    @content += "</div>"
  end
  
  out = ERB.new(File.read('template/index.erb.html')).result
  File.open('index.html', 'w') { |f| f.write(out) }
end
