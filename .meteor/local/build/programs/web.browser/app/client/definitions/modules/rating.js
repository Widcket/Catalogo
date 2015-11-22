(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/modules/rating.js                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Rating                                              //
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
  $.fn.rating = function (parameters) {                                // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 33
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.rating.settings, parameters) : $.extend({}, $.fn.rating.settings),
          namespace = settings.namespace,                              //
          className = settings.className,                              //
          metadata = settings.metadata,                                //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          element = this,                                              //
          instance = $(this).data(moduleNamespace),                    //
          $module = $(this),                                           //
          $icon = $module.find(selector.icon),                         //
          module;                                                      //
                                                                       //
      module = {                                                       // 58
                                                                       //
        initialize: function () {                                      // 60
          module.verbose('Initializing rating module', settings);      // 61
                                                                       //
          if ($icon.length === 0) {                                    // 63
            module.setup.layout();                                     // 64
          }                                                            //
                                                                       //
          if (settings.interactive) {                                  // 67
            module.enable();                                           // 68
          } else {                                                     //
            module.disable();                                          // 71
          }                                                            //
          module.set.rating(module.get.initialRating());               // 73
          module.instantiate();                                        // 74
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 77
          module.verbose('Instantiating module', settings);            // 78
          instance = module;                                           // 79
          $module.data(moduleNamespace, module);                       // 80
        },                                                             //
                                                                       //
        destroy: function () {                                         // 85
          module.verbose('Destroying previous instance', instance);    // 86
          module.remove.events();                                      // 87
          $module.removeData(moduleNamespace);                         // 88
        },                                                             //
                                                                       //
        refresh: function () {                                         // 93
          $icon = $module.find(selector.icon);                         // 94
        },                                                             //
                                                                       //
        setup: {                                                       // 97
          layout: function () {                                        // 98
            var maxRating = module.get.maxRating(),                    // 99
                html = $.fn.rating.settings.templates.icon(maxRating);
            module.debug('Generating icon html dynamically');          // 103
            $module.html(html);                                        // 104
            module.refresh();                                          // 107
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 111
          mouseenter: function () {                                    // 112
            var $activeIcon = $(this);                                 // 113
            $activeIcon.nextAll().removeClass(className.selected);     // 116
            $module.addClass(className.selected);                      // 120
            $activeIcon.addClass(className.selected).prevAll().addClass(className.selected);
          },                                                           //
          mouseleave: function () {                                    // 129
            $module.removeClass(className.selected);                   // 130
            $icon.removeClass(className.selected);                     // 133
          },                                                           //
          click: function () {                                         // 137
            var $activeIcon = $(this),                                 // 138
                currentRating = module.get.rating(),                   //
                rating = $icon.index($activeIcon) + 1,                 //
                canClear = settings.clearable == 'auto' ? $icon.length === 1 : settings.clearable;
            if (canClear && currentRating == rating) {                 // 146
              module.clearRating();                                    // 147
            } else {                                                   //
              module.set.rating(rating);                               // 150
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        clearRating: function () {                                     // 155
          module.debug('Clearing current rating');                     // 156
          module.set.rating(0);                                        // 157
        },                                                             //
                                                                       //
        bind: {                                                        // 160
          events: function () {                                        // 161
            module.verbose('Binding events');                          // 162
            $module.on('mouseenter' + eventNamespace, selector.icon, module.event.mouseenter).on('mouseleave' + eventNamespace, selector.icon, module.event.mouseleave).on('click' + eventNamespace, selector.icon, module.event.click);
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 171
          events: function () {                                        // 172
            module.verbose('Removing events');                         // 173
            $module.off(eventNamespace);                               // 174
          }                                                            //
        },                                                             //
                                                                       //
        enable: function () {                                          // 180
          module.debug('Setting rating to interactive mode');          // 181
          module.bind.events();                                        // 182
          $module.removeClass(className.disabled);                     // 183
        },                                                             //
                                                                       //
        disable: function () {                                         // 188
          module.debug('Setting rating to read-only mode');            // 189
          module.remove.events();                                      // 190
          $module.addClass(className.disabled);                        // 191
        },                                                             //
                                                                       //
        get: {                                                         // 196
          initialRating: function () {                                 // 197
            if ($module.data(metadata.rating) !== undefined) {         // 198
              $module.removeData(metadata.rating);                     // 199
              return $module.data(metadata.rating);                    // 200
            }                                                          //
            return settings.initialRating;                             // 202
          },                                                           //
          maxRating: function () {                                     // 204
            if ($module.data(metadata.maxRating) !== undefined) {      // 205
              $module.removeData(metadata.maxRating);                  // 206
              return $module.data(metadata.maxRating);                 // 207
            }                                                          //
            return settings.maxRating;                                 // 209
          },                                                           //
          rating: function () {                                        // 211
            var currentRating = $icon.filter('.' + className.active).length;
            module.verbose('Current rating retrieved', currentRating);
            return currentRating;                                      // 216
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 220
          rating: function (rating) {                                  // 221
            var ratingIndex = rating - 1 >= 0 ? rating - 1 : 0,        // 222
                $activeIcon = $icon.eq(ratingIndex);                   //
            $module.removeClass(className.selected);                   // 228
            $icon.removeClass(className.selected).removeClass(className.active);
            if (rating > 0) {                                          // 235
              module.verbose('Setting current rating to', rating);     // 236
              $activeIcon.prevAll().andSelf().addClass(className.active);
            }                                                          //
            settings.onRate.call(element, rating);                     // 243
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 247
          module.debug('Changing setting', name, value);               // 248
          if ($.isPlainObject(name)) {                                 // 249
            $.extend(true, settings, name);                            // 250
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 253
          } else {                                                     //
            return settings[name];                                     // 256
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 259
          if ($.isPlainObject(name)) {                                 // 260
            $.extend(true, module, name);                              // 261
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 264
          } else {                                                     //
            return module[name];                                       // 267
          }                                                            //
        },                                                             //
        debug: function () {                                           // 270
          if (settings.debug) {                                        // 271
            if (settings.performance) {                                // 272
              module.performance.log(arguments);                       // 273
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 277
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 281
          if (settings.verbose && settings.debug) {                    // 282
            if (settings.performance) {                                // 283
              module.performance.log(arguments);                       // 284
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 288
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 292
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 294
        },                                                             //
        performance: {                                                 // 296
          log: function (message) {                                    // 297
            var currentTime, executionTime, previousTime;              // 298
            if (settings.performance) {                                // 303
              currentTime = new Date().getTime();                      // 304
              previousTime = time || currentTime;                      // 305
              executionTime = currentTime - previousTime;              // 306
              time = currentTime;                                      // 307
              performance.push({                                       // 308
                'Name': message[0],                                    // 309
                'Arguments': [].slice.call(message, 1) || '',          // 310
                'Element': element,                                    // 311
                'Execution Time': executionTime                        // 312
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 315
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 318
            var title = settings.name + ':',                           // 319
                totalTime = 0;                                         //
            time = false;                                              // 323
            clearTimeout(module.performance.timer);                    // 324
            $.each(performance, function (index, data) {               // 325
              totalTime += data['Execution Time'];                     // 326
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 328
            if (moduleSelector) {                                      // 329
              title += ' \'' + moduleSelector + '\'';                  // 330
            }                                                          //
            if ($allModules.length > 1) {                              // 332
              title += ' ' + '(' + $allModules.length + ')';           // 333
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 336
              if (console.table) {                                     // 337
                console.table(performance);                            // 338
              } else {                                                 //
                $.each(performance, function (index, data) {           // 341
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 345
            }                                                          //
            performance = [];                                          // 347
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 350
          var object = instance,                                       // 351
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 357
          context = element || context;                                // 358
          if (typeof query == 'string' && object !== undefined) {      // 359
            query = query.split(/[\. ]/);                              // 360
            maxDepth = query.length - 1;                               // 361
            $.each(query, function (depth, value) {                    // 362
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 368
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 371
                return false;                                          // 372
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 375
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 378
                return false;                                          // 379
              } else {                                                 //
                return false;                                          // 382
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 386
            response = found.apply(context, passedArguments);          // 387
          } else if (found !== undefined) {                            //
            response = found;                                          // 390
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 392
            returnedValue.push(response);                              // 393
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 396
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 399
          }                                                            //
          return found;                                                // 401
        }                                                              //
      };                                                               //
      if (methodInvoked) {                                             // 404
        if (instance === undefined) {                                  // 405
          module.initialize();                                         // 406
        }                                                              //
        module.invoke(query);                                          // 408
      } else {                                                         //
        if (instance !== undefined) {                                  // 411
          instance.invoke('destroy');                                  // 412
        }                                                              //
        module.initialize();                                           // 414
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 419
  };                                                                   //
                                                                       //
  $.fn.rating.settings = {                                             // 425
                                                                       //
    name: 'Rating',                                                    // 427
    namespace: 'rating',                                               // 428
                                                                       //
    debug: false,                                                      // 430
    verbose: false,                                                    // 431
    performance: true,                                                 // 432
                                                                       //
    initialRating: 0,                                                  // 434
    interactive: true,                                                 // 435
    maxRating: 4,                                                      // 436
    clearable: 'auto',                                                 // 437
                                                                       //
    onRate: function (rating) {},                                      // 439
                                                                       //
    error: {                                                           // 441
      method: 'The method you called is not defined',                  // 442
      noMaximum: 'No maximum rating specified. Cannot generate HTML automatically'
    },                                                                 //
                                                                       //
    metadata: {                                                        // 447
      rating: 'rating',                                                // 448
      maxRating: 'maxRating'                                           // 449
    },                                                                 //
                                                                       //
    className: {                                                       // 452
      active: 'active',                                                // 453
      disabled: 'disabled',                                            // 454
      selected: 'selected',                                            // 455
      loading: 'loading'                                               // 456
    },                                                                 //
                                                                       //
    selector: {                                                        // 459
      icon: '.icon'                                                    // 460
    },                                                                 //
                                                                       //
    templates: {                                                       // 463
      icon: function (maxRating) {                                     // 464
        var icon = 1,                                                  // 465
            html = '';                                                 //
        while (icon <= maxRating) {                                    // 469
          html += '<i class="icon"></i>';                              // 470
          icon++;                                                      // 471
        }                                                              //
        return html;                                                   // 473
      }                                                                //
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
