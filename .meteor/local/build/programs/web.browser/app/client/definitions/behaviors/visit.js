(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/behaviors/visit.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Visit                                               //
 * http://github.com/semantic-org/semantic-ui/                         //
 *                                                                     //
 *                                                                     //
 * Copyright 2015 Contributors                                         //
 * Released under the MIT license                                      //
 * http://opensource.org/licenses/MIT                                  //
 *                                                                     //
 */                                                                    //
                                                                       //
;(function ($, window, document, undefined) {                          // 16
                                                                       //
  "use strict";                                                        // 18
                                                                       //
  $.visit = $.fn.visit = function (parameters) {                       // 20
    var $allModules = $.isFunction(this) ? $(window) : $(this),        // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 35
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.visit.settings, parameters) : $.extend({}, $.fn.visit.settings),
          error = settings.error,                                      //
          namespace = settings.namespace,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = namespace + '-module',                     //
          $module = $(this),                                           //
          $displays = $(),                                             //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
      module = {                                                       // 55
                                                                       //
        initialize: function () {                                      // 57
          if (settings.count) {                                        // 58
            module.store(settings.key.count, settings.count);          // 59
          } else if (settings.id) {                                    //
            module.add.id(settings.id);                                // 62
          } else if (settings.increment && methodInvoked !== 'increment') {
            module.increment();                                        // 65
          }                                                            //
          module.add.display($module);                                 // 67
          module.instantiate();                                        // 68
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 71
          module.verbose('Storing instance of visit module', module);  // 72
          instance = module;                                           // 73
          $module.data(moduleNamespace, module);                       // 74
        },                                                             //
                                                                       //
        destroy: function () {                                         // 79
          module.verbose('Destroying instance');                       // 80
          $module.removeData(moduleNamespace);                         // 81
        },                                                             //
                                                                       //
        increment: function (id) {                                     // 86
          var currentValue = module.get.count(),                       // 87
              newValue = +currentValue + 1;                            //
          if (id) {                                                    // 91
            module.add.id(id);                                         // 92
          } else {                                                     //
            if (newValue > settings.limit && !settings.surpass) {      // 95
              newValue = settings.limit;                               // 96
            }                                                          //
            module.debug('Incrementing visits', newValue);             // 98
            module.store(settings.key.count, newValue);                // 99
          }                                                            //
        },                                                             //
                                                                       //
        decrement: function (id) {                                     // 103
          var currentValue = module.get.count(),                       // 104
              newValue = +currentValue - 1;                            //
          if (id) {                                                    // 108
            module.remove.id(id);                                      // 109
          } else {                                                     //
            module.debug('Removing visit');                            // 112
            module.store(settings.key.count, newValue);                // 113
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 117
          count: function () {                                         // 118
            return +module.retrieve(settings.key.count) || 0;          // 119
          },                                                           //
          idCount: function (ids) {                                    // 121
            ids = ids || module.get.ids();                             // 122
            return ids.length;                                         // 123
          },                                                           //
          ids: function (delimitedIDs) {                               // 125
            var idArray = [];                                          // 126
            delimitedIDs = delimitedIDs || module.retrieve(settings.key.ids);
            if (typeof delimitedIDs === 'string') {                    // 130
              idArray = delimitedIDs.split(settings.delimiter);        // 131
            }                                                          //
            module.verbose('Found visited ID list', idArray);          // 133
            return idArray;                                            // 134
          },                                                           //
          storageOptions: function (data) {                            // 136
            var options = {};                                          // 137
            if (settings.expires) {                                    // 140
              options.expires = settings.expires;                      // 141
            }                                                          //
            if (settings.domain) {                                     // 143
              options.domain = settings.domain;                        // 144
            }                                                          //
            if (settings.path) {                                       // 146
              options.path = settings.path;                            // 147
            }                                                          //
            return options;                                            // 149
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 153
          visited: function (id, ids) {                                // 154
            var visited = false;                                       // 155
            ids = ids || module.get.ids();                             // 158
            if (id !== undefined && ids) {                             // 159
              $.each(ids, function (index, value) {                    // 160
                if (value == id) {                                     // 161
                  visited = true;                                      // 162
                }                                                      //
              });                                                      //
            }                                                          //
            return visited;                                            // 166
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 170
          count: function (value) {                                    // 171
            module.store(settings.key.count, value);                   // 172
          },                                                           //
          ids: function (value) {                                      // 174
            module.store(settings.key.ids, value);                     // 175
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 179
          module.store(settings.key.count, 0);                         // 180
          module.store(settings.key.ids, null);                        // 181
        },                                                             //
                                                                       //
        add: {                                                         // 184
          id: function (id) {                                          // 185
            var currentIDs = module.retrieve(settings.key.ids),        // 186
                newIDs = currentIDs === undefined || currentIDs === '' ? id : currentIDs + settings.delimiter + id;
            if (module.has.visited(id)) {                              // 192
              module.debug('Unique content already visited, not adding visit', id, currentIDs);
            } else if (id === undefined) {                             //
              module.debug('ID is not defined');                       // 196
            } else {                                                   //
              module.debug('Adding visit to unique content', id);      // 199
              module.store(settings.key.ids, newIDs);                  // 200
            }                                                          //
            module.set.count(module.get.idCount());                    // 202
          },                                                           //
          display: function (selector) {                               // 204
            var $element = $(selector);                                // 205
            if ($element.length > 0 && !$.isWindow($element[0])) {     // 208
              module.debug('Updating visit count for element', $element);
              $displays = $displays.length > 0 ? $displays.add($element) : $element;
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 218
          id: function (id) {                                          // 219
            var currentIDs = module.get.ids(),                         // 220
                newIDs = [];                                           //
            if (id !== undefined && currentIDs !== undefined) {        // 224
              module.debug('Removing visit to unique content', id, currentIDs);
              $.each(currentIDs, function (index, value) {             // 226
                if (value !== id) {                                    // 227
                  newIDs.push(value);                                  // 228
                }                                                      //
              });                                                      //
              newIDs = newIDs.join(settings.delimiter);                // 231
              module.store(settings.key.ids, newIDs);                  // 232
            }                                                          //
            module.set.count(module.get.idCount());                    // 234
          }                                                            //
        },                                                             //
                                                                       //
        check: {                                                       // 238
          limit: function (value) {                                    // 239
            value = value || module.get.count();                       // 240
            if (settings.limit) {                                      // 241
              if (value >= settings.limit) {                           // 242
                module.debug('Pages viewed exceeded limit, firing callback', value, settings.limit);
                settings.onLimit.call(element, value);                 // 244
              }                                                        //
              module.debug('Limit not reached', value, settings.limit);
              settings.onChange.call(element, value);                  // 247
            }                                                          //
            module.update.display(value);                              // 249
          }                                                            //
        },                                                             //
                                                                       //
        update: {                                                      // 253
          display: function (value) {                                  // 254
            value = value || module.get.count();                       // 255
            if ($displays.length > 0) {                                // 256
              module.debug('Updating displayed view count', $displays);
              $displays.html(value);                                   // 258
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        store: function (key, value) {                                 // 263
          var options = module.get.storageOptions(value);              // 264
          if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
            window.localStorage.setItem(key, value);                   // 268
            module.debug('Value stored using local storage', key, value);
          } else if ($.cookie !== undefined) {                         //
            $.cookie(key, value, options);                             // 272
            module.debug('Value stored using cookie', key, value, options);
          } else {                                                     //
            module.error(error.noCookieStorage);                       // 276
            return;                                                    // 277
          }                                                            //
          if (key == settings.key.count) {                             // 279
            module.check.limit(value);                                 // 280
          }                                                            //
        },                                                             //
        retrieve: function (key, value) {                              // 283
          var storedValue;                                             // 284
          if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
            storedValue = window.localStorage.getItem(key);            // 288
          }                                                            //
          // get by cookie                                             //
          else if ($.cookie !== undefined) {                           //
              storedValue = $.cookie(key);                             // 292
            } else {                                                   //
              module.error(error.noCookieStorage);                     // 295
            }                                                          //
          if (storedValue == 'undefined' || storedValue == 'null' || storedValue === undefined || storedValue === null) {
            storedValue = undefined;                                   // 298
          }                                                            //
          return storedValue;                                          // 300
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 303
          if ($.isPlainObject(name)) {                                 // 304
            $.extend(true, settings, name);                            // 305
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 308
          } else {                                                     //
            return settings[name];                                     // 311
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 314
          module.debug('Changing internal', name, value);              // 315
          if (value !== undefined) {                                   // 316
            if ($.isPlainObject(name)) {                               // 317
              $.extend(true, module, name);                            // 318
            } else {                                                   //
              module[name] = value;                                    // 321
            }                                                          //
          } else {                                                     //
            return module[name];                                       // 325
          }                                                            //
        },                                                             //
        debug: function () {                                           // 328
          if (settings.debug) {                                        // 329
            if (settings.performance) {                                // 330
              module.performance.log(arguments);                       // 331
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 335
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 339
          if (settings.verbose && settings.debug) {                    // 340
            if (settings.performance) {                                // 341
              module.performance.log(arguments);                       // 342
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 346
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 350
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 352
        },                                                             //
        performance: {                                                 // 354
          log: function (message) {                                    // 355
            var currentTime, executionTime, previousTime;              // 356
            if (settings.performance) {                                // 361
              currentTime = new Date().getTime();                      // 362
              previousTime = time || currentTime;                      // 363
              executionTime = currentTime - previousTime;              // 364
              time = currentTime;                                      // 365
              performance.push({                                       // 366
                'Name': message[0],                                    // 367
                'Arguments': [].slice.call(message, 1) || '',          // 368
                'Element': element,                                    // 369
                'Execution Time': executionTime                        // 370
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 373
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 376
            var title = settings.name + ':',                           // 377
                totalTime = 0;                                         //
            time = false;                                              // 381
            clearTimeout(module.performance.timer);                    // 382
            $.each(performance, function (index, data) {               // 383
              totalTime += data['Execution Time'];                     // 384
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 386
            if (moduleSelector) {                                      // 387
              title += ' \'' + moduleSelector + '\'';                  // 388
            }                                                          //
            if ($allModules.length > 1) {                              // 390
              title += ' ' + '(' + $allModules.length + ')';           // 391
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 394
              if (console.table) {                                     // 395
                console.table(performance);                            // 396
              } else {                                                 //
                $.each(performance, function (index, data) {           // 399
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 403
            }                                                          //
            performance = [];                                          // 405
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 408
          var object = instance,                                       // 409
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 415
          context = element || context;                                // 416
          if (typeof query == 'string' && object !== undefined) {      // 417
            query = query.split(/[\. ]/);                              // 418
            maxDepth = query.length - 1;                               // 419
            $.each(query, function (depth, value) {                    // 420
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 426
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 429
                return false;                                          // 430
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 433
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 436
                return false;                                          // 437
              } else {                                                 //
                return false;                                          // 440
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 444
            response = found.apply(context, passedArguments);          // 445
          } else if (found !== undefined) {                            //
            response = found;                                          // 448
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 450
            returnedValue.push(response);                              // 451
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 454
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 457
          }                                                            //
          return found;                                                // 459
        }                                                              //
      };                                                               //
      if (methodInvoked) {                                             // 462
        if (instance === undefined) {                                  // 463
          module.initialize();                                         // 464
        }                                                              //
        module.invoke(query);                                          // 466
      } else {                                                         //
        if (instance !== undefined) {                                  // 469
          instance.invoke('destroy');                                  // 470
        }                                                              //
        module.initialize();                                           // 472
      }                                                                //
    });                                                                //
    return returnedValue !== undefined ? returnedValue : this;         // 477
  };                                                                   //
                                                                       //
  $.fn.visit.settings = {                                              // 483
                                                                       //
    name: 'Visit',                                                     // 485
                                                                       //
    debug: false,                                                      // 487
    verbose: false,                                                    // 488
    performance: true,                                                 // 489
                                                                       //
    namespace: 'visit',                                                // 491
                                                                       //
    increment: false,                                                  // 493
    surpass: false,                                                    // 494
    count: false,                                                      // 495
    limit: false,                                                      // 496
                                                                       //
    delimiter: '&',                                                    // 498
    storageMethod: 'localstorage',                                     // 499
                                                                       //
    key: {                                                             // 501
      count: 'visit-count',                                            // 502
      ids: 'visit-ids'                                                 // 503
    },                                                                 //
                                                                       //
    expires: 30,                                                       // 506
    domain: false,                                                     // 507
    path: '/',                                                         // 508
                                                                       //
    onLimit: function () {},                                           // 510
    onChange: function () {},                                          // 511
                                                                       //
    error: {                                                           // 513
      method: 'The method you called is not defined',                  // 514
      missingPersist: 'Using the persist setting requires the inclusion of PersistJS',
      noCookieStorage: 'The default storage cookie requires $.cookie to be included.'
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
