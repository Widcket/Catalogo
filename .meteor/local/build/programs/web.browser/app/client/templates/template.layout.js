(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return HTML.DIV({
    "class": "ui left aligned container"
  }, "\n	    ", HTML.DIV({
    "class": "computer only ui five column stackable grid"
  }, "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("books"));
  }, function() {
    return [ "\n				", HTML.DIV({
      "class": "column"
    }, "\n					", Spacebars.include(view.lookupTemplate("book")), "\n				"), "\n		  	" ];
  }), "\n		"), "\n		", HTML.DIV({
    "class": "tablet only ui three column stackable grid"
  }, "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("books"));
  }, function() {
    return [ "\n				", HTML.DIV({
      "class": "column"
    }, "\n					", Spacebars.include(view.lookupTemplate("book")), "\n				"), "\n		  	" ];
  }), "\n		"), "\n		", HTML.DIV({
    "class": "mobile only ui one column stackable grid"
  }, "\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("books"));
  }, function() {
    return [ "\n				", HTML.DIV({
      "class": "column"
    }, "\n					", Spacebars.include(view.lookupTemplate("book")), "\n				"), "\n		  	" ];
  }), "\n		"), "\n	");
}));

}).call(this);
