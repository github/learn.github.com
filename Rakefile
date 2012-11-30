require 'rubygems'
require 'erb'
require 'maruku'
require 'yaml'

def generate_page(page_data)
  page = page_data['page']
  puts "generating #{page}"
  
  @title = page_data['name']
  @desc = page_data['desc']
  @pcontent = '<div class="span-21">'
  
  if s = page_data['size']
    w, h = s.split('x')
  else
    w = '640'
    h = '360'
  end
  
  # add video if present
  if code = page_data['cast']
    @pcontent += '<center><embed src="http://blip.tv/play/' + code  
    @pcontent += '" type="application/x-shockwave-flash" width="' + w + '" height="' + h + '" '
    @pcontent += 'allowscriptaccess="always" allowfullscreen="true"></embed></center>'
  end
  
  @pcontent += '<hr/>'

  # render markdown from page, if present
  mpage = "pages/#{page}.markdown"
  if File.exists?(mpage)
    content = File.read(mpage)
    doc = Maruku.new(content)
    @pcontent += doc.to_html
    @pcontent += '<br/><br/><hr/>'
  end

  @pcontent += '</div>'
  
  @pcontent += "<div class=\"span-10\">"
  if (n = @nextlast[:last][page]) && (nname = @nextlast[:lastname][page])
    @pcontent += "<a href=\"#{n}.html\">&laquo; #{nname}</a>"
  else
    @pcontent += "&nbsp;"
  end
  @pcontent += "</div>"

  if (n = @nextlast[:next][page]) && (nname = @nextlast[:nextname][page])
    @pcontent += "<div style=\"text-align:right\" class=\"span-11 last\"><a href=\"#{n}.html\">#{nname} &raquo;</a></div>"
  end

  @pcontent += '<div class="span-24 last">&nbsp;</div><hr/>'
    
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
    
    @content += '<div class="span-24 last">'
    @content += "<h2>" +  section['section'] + "</h2>"
    @content += '</div>'

    section['values'].each do |episode|
      counter += 1
      if ((counter % 6) == 0)
        @content += "<div class='span-4 episode last'>"
      else
        @content += "<div class='span-4 episode'>"
      end
      if episode['page'] 
        @content += "<b><a href=\"p/" + episode['page'] + ".html\">" + episode['name'] + "</a></b>"
        generate_page(episode)
      else
        @content += '<b>' + episode['name'] + '</b>'
      end
      @content += '<p>' + episode['desc'] + '</p>'
      @content += "</div>"
      if ((counter % 6) == 0)
        @content += "<div class='span-24 last'><br/></div>"
      end
    end
  end
  
  out = ERB.new(File.read('template/index.erb.html')).result
  File.open('index.html', 'w') { |f| f.write(out) }
end

task :default => [:gensite]
