$(function(){
  $('.js-gitcasts a').click(function(){
    var ep = $(this).attr('href')
    var epURL = ep.split('v=')
    var embed = 'http://www.youtube.com/embed/'+epURL[1]+'?rel=0'
    $('#js-youtubed').attr('src', embed)
    scroll(0,0)
    return false
  })
})