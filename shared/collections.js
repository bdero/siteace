Websites = new Mongo.Collection("websites");

Websites.allow({
  insert: function(userId, doc) {
    if (userId) {
      doc.submittedBy = Meteor.user()._id;
      doc.createdOn = new Date();
      doc.rating = 0;

      return doc.title && doc.url && doc.description;
    }

    return false;
  }
});
