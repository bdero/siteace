Meteor.methods({
  vote: function(website_id, upvote) {
    if (Meteor.user()) {
      Websites.update({_id: website_id}, {
        $inc: {rating: upvote ? 1 : -1}
      });
    } else {
      throw new Meteor.Error(
        "logged-out",
        "The user must be logged in to vote."
      );
    }
  }
});
