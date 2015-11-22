(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return HTML.DIV({
    "class": "ui left aligned container"
  }, "\n	  ", HTML.DIV({
    "class": "ui stackable grid"
  }, "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("books"));
  }, function() {
    return [ "\n				", HTML.DIV({
      "class": "three wide computer only column"
    }, "\n					", Spacebars.include(view.lookupTemplate("book")), "\n				"), "\n				", HTML.DIV({
      "class": "five wide tablet only column"
    }, "\n					", Spacebars.include(view.lookupTemplate("book")), "\n				"), "\n				", HTML.DIV({
      "class": "five wide mobile only column"
    }, "\n					", Spacebars.include(view.lookupTemplate("book")), "\n				"), "\n		  	" ];
  }), "\n		"), "\n	");
}));

}).call(this);
