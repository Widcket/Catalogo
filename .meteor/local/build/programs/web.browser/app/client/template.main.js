(function(){
Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("layout"));
}));
Meteor.startup(Template.body.renderToDocument);

}).call(this);
