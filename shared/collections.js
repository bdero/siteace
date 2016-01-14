Websites = new Mongo.Collection("websites");

Websites.allow({
  insert: function(userId, doc) {
    if (userId) {
      doc.submittedBy = userId;
      doc.createdOn = new Date();
      doc.upvotes = doc.downvotes = 0;

      return doc.title && doc.url && doc.description;
    }

    return false;
  }
});

Comments = new Mongo.Collection("comments");

Comments.allow({
  insert: function(userId, doc) {
    if (userId) {
      doc.submittedBy = userId;
      doc.createdOn = new Date();

      return doc.message && Websites.find({_id: doc.website_id}).count();
    }

    return false;
  }
});
