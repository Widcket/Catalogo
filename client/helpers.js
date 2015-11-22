Template.layout.helpers({
	books: function () {
		return Libros.find().fetch();
	}
});
