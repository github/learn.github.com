require 'rubygems'
require 'erb'
require 'maruku'
require 'yaml'

def generate_page(page_data)
  page = page_data['page']
  puts "generating #{page}"
  
  @title = page_data['name']
  @desc = page_data['desc']
  @pcontent = ''
  
  if s = page_data['size']
    w, h = s.split('x')
  else
    w = '640'
    h = '360'
  end
  
  # add video if present
  if code = page_data['cast']
    @pcontent += '<center><embed src="http://www.youtube.com/v/' + code + '?hl=en_US&amp;version=3&amp;rel=0'
    @pcontent += '" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" '
    @pcontent += 'allowscriptaccess="always" allowfullscreen="true"></embed></center>'
  end
  
  # render markdown from page, if present
  mpage = "pages/#{page}.markdown"
  if File.exists?(mpage)
    content = File.read(mpage)
    doc = Maruku.new(content)
    @pcontent += doc.to_html
  end

  @pcontent += '<div class="page-turns">'
  if (n = @nextlast[:last][page]) && (nname = @nextlast[:lastname][page])
    @pcontent += "<a href=\"#{n}.html\" class=\"page-prev\">&laquo; #{nname}</a>"
  end
  if (n = @nextlast[:next][page]) && (nname = @nextlast[:nextname][page])
    @pcontent += "<a href=\"#{n}.html\" class=\"page-next\">#{nname} &raquo;</a>"
  end
  @pcontent += "</div>"

  pname = "p/#{page}.html"
  out = ERB.new(File.read('template/page.erb.html')).result
  File.open(pname, 'w') { |f| f.write(out) }
end

# generate the site
desc "Generate the html files for the site"
task :gensite do
  ep = YAML::load( File.open('episodes.yaml') )

  @content = ''

  # finding the next and last pages
  last = lastname = nil
  @nextlast = {:last => {}, :lastname => {}, :next => {}, :nextname => {}}
  ep['episodes'].each do |section|
    section['values'].each do |episode|
      if (p = episode['page']) && (pname = episode['name'])
        @nextlast[:last][p] = last
        @nextlast[:lastname][p] = lastname
        @nextlast[:next][last] = p
        @nextlast[:nextname][last] = pname
        last = p
        lastname = pname
      end
    end
  end
  
  ep['episodes'].each do |section|
    counter = 0
    
    @content += '<div class="episode-list">'
    @content += "<h2>" +  section['section'] + "</h2>"

    section['values'].each do |episode|
      counter += 1
      if ((counter % 6) == 0)
        @content += "<div class='episode last'>"
      else
        @content += "<div class='episode'>"
      end
      if episode['page'] 
        @content += "<h4><a href=\"p/" + episode['page'] + ".html\">" + episode['name'] + "</a></h4>"
        generate_page(episode)
      else
        @content += '<h4>' + episode['name'] + '</h4>'
      end
      @content += '<p>' + episode['desc'] + '</p>'
      @content += "</div>"
    end

    @content += "</div>"

  end
  
  out = ERB.new(File.read('template/index.erb.html')).result
  File.open('index.html', 'w') { |f| f.write(out) }
end

task :default => [:gensite]
