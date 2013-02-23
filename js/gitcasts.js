$(function(){
  $('.js-gitcasts li a').click(function(){
    var ep = $(this).attr('href')
    var epURL = ep.split('v=')
    $('#js-youtubed').attr('src', 'http://www.youtube.com/embed/'+epURL[1]+'?rel=0')
    scroll(0,0)
    return false
  })
})