function FollowToggle (el) {
  this.el = el;
  this.$el = $(el);
  this.userId = this.$el.data('user-id');
  this.followState = this.$el.data('initial-follow-state').toString();
  this.render();
  this.disabled = false;
  this.$el.on('click', this.handleClick.bind(this))
}

FollowToggle.prototype.render = function () {

  if (this.followState === "following") {
    this.$el.prop("disabled", true);
  } else if (this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
  } else {
    this.$el.prop("disabled", false);
  }
  if (this.followState === 'true') {
    this.el.innerHTML = "Unfollow";
  } else if (this.followState === 'false'){
    this.el.innerHTML = "Follow";
  } else if (this.followState === 'unfollowing'){
    this.el.innerHTML = "Unfollowing";
  } else if (this.followState === 'following'){
    this.el.innerHTML = "Following";
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  var method = null;

  if (this.followState === 'false') {
    method = "POST";
    this.followState = "following";
    this.render();
  } else if (this.followState === 'true'){
    method = "DELETE";
    this.followState = 'unfollowing';
    this.render();
  }
  $.ajax({
    url: '/users/' + this.userId + '/follow',
    type: method,
    dataType: 'json',
    success: function () {
      if (this.followState === "following") {
        this.followState = "true";
      } else if (this.followState === "unfollowing") {
        this.followState = "false";
      }
      this.render();
    }.bind(this)
  });
};

module.exports = FollowToggle;
