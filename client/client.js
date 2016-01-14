Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('navbar', {
    to: 'navbar'
  });

  this.render('listing_page', {
    to: 'page'
  });
});

Router.route('/website/:_id', function () {
  this.render('navbar', {
    to: 'navbar',
  });

  this.render('detail_page', {
    to: 'page',
    data: function() {
      return Websites.findOne({_id: this.params._id});
    }
  });
});

/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({}, {sort: {rating: -1}});
  }
});

var item_helpers = {
  getRating: function() {
    return this.upvotes - this.downvotes;
  }
};
Template.website_item.helpers(item_helpers);
Template.detail_page.helpers(item_helpers);


/////
// template events
/////

var voteCallback = function(error) {
  if (error) {
    console.log(error.message);
  }
};

var item_events = {
  "click .js-upvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;

    Meteor.call("vote", website_id, true, voteCallback);

    return false;// prevent the button from reloading the page
  },
  "click .js-downvote":function(event){

    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;

    Meteor.call("vote", website_id, false, voteCallback);

    return false;// prevent the button from reloading the page
  }
};
Template.website_item.events(item_events);
Template.detail_page.events(item_events);

Template.website_form.events({
  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');
  },
  "submit .js-save-website-form":function(event){
    Websites.insert({
      title: event.target.title.value,
      url: event.target.url.value,
      description: event.target.description.value
    });

    $("#website_form").toggle('slow');

    return false;// stop the form submit from reloading the page
  }
});
