(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/seed.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var seedDB = function () {                                             // 1
    if (Libros.find().count() === 0) {                                 // 2
                                                                       //
        Libros.insert({                                                // 4
            "_id": "564ec5b64d6f636c01100400",                         // 6
            "title": "The Lean Startup",                               // 7
            "autor": "Eric Ries",                                      // 8
            "image": "/img/lean.jpg",                                  // 9
            "price": "$225"                                            // 10
        });                                                            //
                                                                       //
        console.log("Inserted lean");                                  // 13
                                                                       //
        Libros.insert({                                                // 15
            "_id": "564dbcf361a3e3339a752166",                         // 17
            "title": "The Art of War",                                 // 18
            "autor": "Sun Tzu",                                        // 19
            "image": "/img/war.jpg",                                   // 20
            "price": "$135"                                            // 21
        });                                                            //
                                                                       //
        console.log("Inserted war");                                   // 24
                                                                       //
        Libros.insert({                                                // 26
            "_id": "564dbcf3f7a1a18aaca60999",                         // 28
            "title": "Lord of the flies",                              // 29
            "autor": "William Golding",                                // 30
            "image": "/img/flies.jpg",                                 // 31
            "price": "$180"                                            // 32
        });                                                            //
                                                                       //
        console.log("Inserted flies");                                 // 35
                                                                       //
        Libros.insert({                                                // 37
            "_id": "564dbcf3356c949ba5464bc5",                         // 39
            "title": "Zero to One",                                    // 40
            "autor": "Pether Thiel and Blake Masters",                 // 41
            "image": "/img/zero.jpg",                                  // 42
            "price": "$190"                                            // 43
        });                                                            //
                                                                       //
        console.log("Inserted one");                                   // 46
                                                                       //
        Libros.insert({                                                // 48
            "_id": "564dbcf3682c07848b9a79c5",                         // 50
            "title": "Ready Player One",                               // 51
            "autor": "Ernest Cline",                                   // 52
            "image": "/img/player.jpg",                                // 53
            "price": "$280"                                            // 54
        });                                                            //
                                                                       //
        console.log("Inserted player");                                // 57
                                                                       //
        Libros.insert({                                                // 59
            "_id": "564dbcf337096a8e41c3e918",                         // 61
            "title": "Running Lean: Iterating from Plan A to a Plan that Works",
            "autor": "Ash Maurya",                                     // 63
            "image": "/img/running.jpg",                               // 64
            "price": "$250"                                            // 65
        });                                                            //
                                                                       //
        console.log("Inserted runnning");                              // 68
                                                                       //
        Libros.insert({                                                // 70
            "_id": "564dbcf34f534030e8088170",                         // 72
            "title": "Ender's Game",                                   // 73
            "autor": "Orson Scott Card",                               // 74
            "image": "/img/ender.jpg",                                 // 75
            "price": "$230"                                            // 76
        });                                                            //
                                                                       //
        console.log("Inserted ender");                                 // 79
                                                                       //
        Libros.insert({                                                // 81
            "_id": "564dbcf34f534030t8088170",                         // 83
            "title": "The Little Book on Coffeescript",                // 84
            "autor": "Alex MacCaw",                                    // 85
            "image": "/img/coffeescript.jpg",                          // 86
            "price": "$140"                                            // 87
        });                                                            //
                                                                       //
        console.log("Inserted coffeescript");                          // 90
                                                                       //
        Libros.insert({                                                // 92
            "_id": "56idbcf34f534030e8088170",                         // 94
            "title": "What Makes Silicon Valley Tick?",                // 95
            "autor": "Tapan Munroe",                                   // 96
            "image": "/img/tick.jpg",                                  // 97
            "price": "$200"                                            // 98
        });                                                            //
                                                                       //
        console.log("Inserted tick");                                  // 101
                                                                       //
        Libros.insert({                                                // 103
            "_id": "564dbcf34f5340h0e8088170",                         // 105
            "title": "Personal Kanban: Mapping Work | Navigating Life",
            "autor": "Jim Benson y Tonianne DeMaria Barry",            // 107
            "image": "/img/kanban.jpg",                                // 108
            "price": "$195"                                            // 109
        });                                                            //
                                                                       //
        console.log("Inserted kanban");                                // 112
                                                                       //
        Libros.insert({                                                // 114
            "_id": "564dbcf34fu34030e8088170",                         // 116
            "title": "How to Take Good Notes: The Science Behind Note Taking",
            "autor": "Angelos Georgakis",                              // 118
            "image": "/img/notes.jpg",                                 // 119
            "price": "$170"                                            // 120
        });                                                            //
                                                                       //
        console.log("Inserted notes");                                 // 123
                                                                       //
        Libros.insert({                                                // 125
            "_id": "5g4dbcf34fu34030e8088170",                         // 127
            "title": "JavaScript: The Good Parts",                     // 128
            "autor": "Douglas Crockford",                              // 129
            "image": "/img/parts.jpg",                                 // 130
            "price": "$235"                                            // 131
        });                                                            //
                                                                       //
        console.log("Inserted parts");                                 // 134
                                                                       //
        Libros.insert({                                                // 136
            "_id": "5g4dbcf34fu34030e80881j0",                         // 138
            "title": "Managing Oneself",                               // 139
            "autor": "Peter Drucker",                                  // 140
            "image": "/img/oneself.jpg",                               // 141
            "price": "$175"                                            // 142
        });                                                            //
                                                                       //
        console.log("Inserted oneself");                               // 145
                                                                       //
        Libros.insert({                                                // 147
            "_id": "5ggdbcf34fu34030e80881j0",                         // 149
            "title": "Eloquent JavaScript: a Modern Introducion to Programming",
            "autor": "Marijn Haverbeke",                               // 151
            "image": "/img/eloquent.jpg",                              // 152
            "price": "$175"                                            // 153
        });                                                            //
                                                                       //
        console.log("Inserted eloquent");                              // 156
    }                                                                  //
};                                                                     //
seedDB();                                                              // 159
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=seed.js.map
