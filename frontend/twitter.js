var FollowToggle = require('./follow_toggle.js');
var UsersSearch = require('./users_search.js');

$(function (){
  var $buttons = $('.follow-toggle');
  $buttons.each(function(index, element) {
    new FollowToggle(element);
  });
});
