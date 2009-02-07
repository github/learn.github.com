require 'erb'

def generate_page(page_data)
  page = page_data['page']
  @title = page_data['name']
  @desc = page_data['desc']
  @pcontent = '<div class="span-21">'
  
  # add video if present
  if code = page_data['cast']
    @pcontent += '<embed src="http://blip.tv/play/' + code  
    @pcontent += '" type="application/x-shockwave-flash" width="790" height="400" '
    @pcontent += 'allowscriptaccess="always" allowfullscreen="true"></embed>'
    @pcontent += '<hr/>'
  end
  
  # render markdown from page, if present
  mpage = "pages/#{page}.markdown"
  if File.exists?(mpage)
    content = File.read(mpage)
    @pcontent += content
    @pcontent += '<br/><br/><hr/>'
  end

  @pcontent += '</div>'
  
  pname = "p/#{page}.html"
  out = ERB.new(File.read('template/page.erb.html')).result
  File.open(pname, 'w') { |f| f.write(out) }
end

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
      if episode['page'] 
        @content += "<b><a href=\"p/" + episode['page'] + ".html\">" + episode['name'] + "</a></b>"
        generate_page(episode)
      else
        @content += '<b>' + episode['name'] + '</b>'
      end
      @content += '<p>' + episode['desc'] + '</p>'
      @content += "</div>"
    end
    @content += "</div>"
  end
  
  out = ERB.new(File.read('template/index.erb.html')).result
  File.open('index.html', 'w') { |f| f.write(out) }
end
