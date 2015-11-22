(function(){
Template.__checkName("book");
Template["book"] = new Template("Template.book", (function() {
  var view = this;
  return HTML.DIV({
    "class": "ui centered special cards"
  }, "\n  ", HTML.DIV({
    "class": "card"
  }, "\n    ", HTML.DIV({
    "class": "image"
  }, "\n    	", HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("image"));
    }
  }), "\n    "), "\n    ", HTML.DIV({
    "class": "content"
  }, "\n      ", HTML.A({
    "class": "header",
    "data-id": function() {
      return Spacebars.mustache(view.lookup("_id"));
    }
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n      ", HTML.DIV({
    "class": "meta"
  }, "\n        ", HTML.SPAN({
    "class": "date"
  }, Blaze.View("lookup:autor", function() {
    return Spacebars.mustache(view.lookup("autor"));
  })), "\n      "), "\n    "), "\n    ", HTML.DIV({
    "class": "extra content"
  }, "\n       ", Blaze.View("lookup:price", function() {
    return Spacebars.mustache(view.lookup("price"));
  }), "\n    "), "\n  "), "\n");
}));

}).call(this);
