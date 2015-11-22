var seedDB = function() {
  if (Libros.find().count() === 0) {

    Libros.insert(
    {
      "_id": "564ec5b64d6f636c01100400",
      "title": "The Lean Startup",
      "autor": "Eric Ries",
      "image": "/img/lean.jpg",
      "price": "$225"
    });

    console.log("Inserted lean");

    Libros.insert(
    {
      "_id": "564dbcf361a3e3339a752166",
      "title": "The Art of War",
      "autor": "Sun Tzu",
      "image": "/img/war.jpg",
      "price": "$135"
    });

    console.log("Inserted war");

    Libros.insert(
    {
      "_id": "564dbcf3f7a1a18aaca60999",
      "title": "Lord of the flies",
      "autor": "William Golding",
      "image": "/img/flies.jpg",
      "price": "$180"
    });

    console.log("Inserted flies");

    Libros.insert(
    {
      "_id": "564dbcf3356c949ba5464bc5",
      "title": "Zero to One",
      "autor": "Pether Thiel and Blake Masters",
      "image": "/img/zero.jpg",
      "price": "$190"
    });

    console.log("Inserted one");

    Libros.insert(
    {
      "_id": "564dbcf3682c07848b9a79c5",
      "title": "Ready Player One",
      "autor": "Ernest Cline",
      "image": "/img/player.jpg",
      "price": "$280"
    });

    console.log("Inserted player");

    Libros.insert(
    {
      "_id": "564dbcf337096a8e41c3e918",
      "title": "Running Lean: Iterating from Plan A to a Plan that Works",
      "autor": "Ash Maurya",
      "image": "/img/running.jpg",
      "price": "$250"
    });

    console.log("Inserted runnning");

    Libros.insert(
    {
      "_id": "564dbcf34f534030e8088170",
      "title": "Ender's Game",
      "autor": "Orson Scott Card",
      "image": "/img/ender.jpg",
      "price": "$230"
    });

    console.log("Inserted ender");

    Libros.insert(
    {
      "_id": "564dbcf34f534030t8088170",
      "title": "The Little Book on Coffeescript",
      "autor": "Alex MacCaw",
      "image": "/img/coffeescript.jpg",
      "price": "$140"
    });

    console.log("Inserted coffeescript");

    Libros.insert(
    {
      "_id": "56idbcf34f534030e8088170",
      "title": "What Makes Silicon Valley Tick?",
      "autor": "Tapan Munroe",
      "image": "/img/tick.jpg",
      "price": "$200"
    });

    console.log("Inserted tick");

    Libros.insert(
    {
      "_id": "564dbcf34f5340h0e8088170",
      "title": "Personal Kanban: Mapping Work | Navigating Life",
      "autor": "Jim Benson y Tonianne DeMaria Barry",
      "image": "/img/kanban.jpg",
      "price": "$195"
    });

    console.log("Inserted kanban");

    Libros.insert(
    {
      "_id": "564dbcf34fu34030e8088170",
      "title": "How to Take Good Notes: The Science Behind Note Taking",
      "autor": "Angelos Georgakis",
      "image": "/img/notes.jpg",
      "price": "$170"
    });

    console.log("Inserted notes");

    Libros.insert(
    {
      "_id": "5g4dbcf34fu34030e8088170",
      "title": "JavaScript: The Good Parts",
      "autor": "Douglas Crockford",
      "image": "/img/parts.jpg",
      "price": "$235"
    });

    console.log("Inserted parts");

    Libros.insert(
    {
      "_id": "5g4dbcf34fu34030e80881j0",
      "title": "Managing Oneself",
      "autor": "Peter Drucker",
      "image": "/img/oneself.jpg",
      "price": "$175"
    });

    console.log("Inserted oneself");

    Libros.insert(
    {
      "_id": "5ggdbcf34fu34030e80881j0",
      "title": "Eloquent JavaScript: a Modern Introducion to Programming",
      "autor": "Marijn Haverbeke",
      "image": "/img/eloquent.jpg",
      "price": "$175"
    });

    console.log("Inserted eloquent");
    }
  }
  seedDB();
