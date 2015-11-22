(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/globals/site.js                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Site                                                //
 * http://github.com/semantic-org/semantic-ui/                         //
 *                                                                     //
 *                                                                     //
 * Copyright 2015 Contributors                                         //
 * Released under the MIT license                                      //
 * http://opensource.org/licenses/MIT                                  //
 *                                                                     //
 */                                                                    //
;(function ($, window, document, undefined) {                          // 15
                                                                       //
  $.site = $.fn.site = function (parameters) {                         // 17
    var time = new Date().getTime(),                                   // 18
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.site.settings, parameters) : $.extend({}, $.site.settings),
        namespace = settings.namespace,                                //
        error = settings.error,                                        //
        eventNamespace = '.' + namespace,                              //
        moduleNamespace = 'module-' + namespace,                       //
        $document = $(document),                                       //
        $module = $document,                                           //
        element = this,                                                //
        instance = $module.data(moduleNamespace),                      //
        module,                                                        //
        returnedValue;                                                 //
    module = {                                                         // 44
                                                                       //
      initialize: function () {                                        // 46
        module.instantiate();                                          // 47
      },                                                               //
                                                                       //
      instantiate: function () {                                       // 50
        module.verbose('Storing instance of site', module);            // 51
        instance = module;                                             // 52
        $module.data(moduleNamespace, module);                         // 53
      },                                                               //
                                                                       //
      normalize: function () {                                         // 58
        module.fix.console();                                          // 59
        module.fix.requestAnimationFrame();                            // 60
      },                                                               //
                                                                       //
      fix: {                                                           // 63
        console: function () {                                         // 64
          module.debug('Normalizing window.console');                  // 65
          if (console === undefined || console.log === undefined) {    // 66
            module.verbose('Console not available, normalizing events');
            module.disable.console();                                  // 68
          }                                                            //
          if (typeof console.group == 'undefined' || typeof console.groupEnd == 'undefined' || typeof console.groupCollapsed == 'undefined') {
            module.verbose('Console group not available, normalizing events');
            window.console.group = function () {};                     // 72
            window.console.groupEnd = function () {};                  // 73
            window.console.groupCollapsed = function () {};            // 74
          }                                                            //
          if (typeof console.markTimeline == 'undefined') {            // 76
            module.verbose('Mark timeline not available, normalizing events');
            window.console.markTimeline = function () {};              // 78
          }                                                            //
        },                                                             //
        consoleClear: function () {                                    // 81
          module.debug('Disabling programmatic console clearing');     // 82
          window.console.clear = function () {};                       // 83
        },                                                             //
        requestAnimationFrame: function () {                           // 85
          module.debug('Normalizing requestAnimationFrame');           // 86
          if (window.requestAnimationFrame === undefined) {            // 87
            module.debug('RequestAnimationFrame not available, normalizing event');
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
              setTimeout(callback, 0);                                 // 93
            };                                                         //
          }                                                            //
        }                                                              //
      },                                                               //
                                                                       //
      moduleExists: function (name) {                                  // 99
        return $.fn[name] !== undefined && $.fn[name].settings !== undefined;
      },                                                               //
                                                                       //
      enabled: {                                                       // 103
        modules: function (modules) {                                  // 104
          var enabledModules = [];                                     // 105
          modules = modules || settings.modules;                       // 108
          $.each(modules, function (index, name) {                     // 109
            if (module.moduleExists(name)) {                           // 110
              enabledModules.push(name);                               // 111
            }                                                          //
          });                                                          //
          return enabledModules;                                       // 114
        }                                                              //
      },                                                               //
                                                                       //
      disabled: {                                                      // 118
        modules: function (modules) {                                  // 119
          var disabledModules = [];                                    // 120
          modules = modules || settings.modules;                       // 123
          $.each(modules, function (index, name) {                     // 124
            if (!module.moduleExists(name)) {                          // 125
              disabledModules.push(name);                              // 126
            }                                                          //
          });                                                          //
          return disabledModules;                                      // 129
        }                                                              //
      },                                                               //
                                                                       //
      change: {                                                        // 133
        setting: function (setting, value, modules, modifyExisting) {  // 134
          modules = typeof modules === 'string' ? modules === 'all' ? settings.modules : [modules] : modules || settings.modules;
          modifyExisting = modifyExisting !== undefined ? modifyExisting : true;
          $.each(modules, function (index, name) {                     // 145
            var namespace = module.moduleExists(name) ? $.fn[name].settings.namespace || false : true,
                $existingModules;                                      //
            if (module.moduleExists(name)) {                           // 152
              module.verbose('Changing default setting', setting, value, name);
              $.fn[name].settings[setting] = value;                    // 154
              if (modifyExisting && namespace) {                       // 155
                $existingModules = $(':data(module-' + namespace + ')');
                if ($existingModules.length > 0) {                     // 157
                  module.verbose('Modifying existing settings', $existingModules);
                  $existingModules[name]('setting', setting, value);   // 159
                }                                                      //
              }                                                        //
            }                                                          //
          });                                                          //
        },                                                             //
        settings: function (newSettings, modules, modifyExisting) {    // 165
          modules = typeof modules === 'string' ? [modules] : modules || settings.modules;
          modifyExisting = modifyExisting !== undefined ? modifyExisting : true;
          $.each(modules, function (index, name) {                     // 174
            var $existingModules;                                      // 175
            if (module.moduleExists(name)) {                           // 178
              module.verbose('Changing default setting', newSettings, name);
              $.extend(true, $.fn[name].settings, newSettings);        // 180
              if (modifyExisting && namespace) {                       // 181
                $existingModules = $(':data(module-' + namespace + ')');
                if ($existingModules.length > 0) {                     // 183
                  module.verbose('Modifying existing settings', $existingModules);
                  $existingModules[name]('setting', newSettings);      // 185
                }                                                      //
              }                                                        //
            }                                                          //
          });                                                          //
        }                                                              //
      },                                                               //
                                                                       //
      enable: {                                                        // 193
        console: function () {                                         // 194
          module.console(true);                                        // 195
        },                                                             //
        debug: function (modules, modifyExisting) {                    // 197
          modules = modules || settings.modules;                       // 198
          module.debug('Enabling debug for modules', modules);         // 199
          module.change.setting('debug', true, modules, modifyExisting);
        },                                                             //
        verbose: function (modules, modifyExisting) {                  // 202
          modules = modules || settings.modules;                       // 203
          module.debug('Enabling verbose debug for modules', modules);
          module.change.setting('verbose', true, modules, modifyExisting);
        }                                                              //
      },                                                               //
      disable: {                                                       // 208
        console: function () {                                         // 209
          module.console(false);                                       // 210
        },                                                             //
        debug: function (modules, modifyExisting) {                    // 212
          modules = modules || settings.modules;                       // 213
          module.debug('Disabling debug for modules', modules);        // 214
          module.change.setting('debug', false, modules, modifyExisting);
        },                                                             //
        verbose: function (modules, modifyExisting) {                  // 217
          modules = modules || settings.modules;                       // 218
          module.debug('Disabling verbose debug for modules', modules);
          module.change.setting('verbose', false, modules, modifyExisting);
        }                                                              //
      },                                                               //
                                                                       //
      console: function (enable) {                                     // 224
        if (enable) {                                                  // 225
          if (instance.cache.console === undefined) {                  // 226
            module.error(error.console);                               // 227
            return;                                                    // 228
          }                                                            //
          module.debug('Restoring console function');                  // 230
          window.console = instance.cache.console;                     // 231
        } else {                                                       //
          module.debug('Disabling console function');                  // 234
          instance.cache.console = window.console;                     // 235
          window.console = {                                           // 236
            clear: function () {},                                     // 237
            error: function () {},                                     // 238
            group: function () {},                                     // 239
            groupCollapsed: function () {},                            // 240
            groupEnd: function () {},                                  // 241
            info: function () {},                                      // 242
            log: function () {},                                       // 243
            markTimeline: function () {},                              // 244
            warn: function () {}                                       // 245
          };                                                           //
        }                                                              //
      },                                                               //
                                                                       //
      destroy: function () {                                           // 250
        module.verbose('Destroying previous site for', $module);       // 251
        $module.removeData(moduleNamespace);                           // 252
      },                                                               //
                                                                       //
      cache: {},                                                       // 257
                                                                       //
      setting: function (name, value) {                                // 259
        if ($.isPlainObject(name)) {                                   // 260
          $.extend(true, settings, name);                              // 261
        } else if (value !== undefined) {                              //
          settings[name] = value;                                      // 264
        } else {                                                       //
          return settings[name];                                       // 267
        }                                                              //
      },                                                               //
      internal: function (name, value) {                               // 270
        if ($.isPlainObject(name)) {                                   // 271
          $.extend(true, module, name);                                // 272
        } else if (value !== undefined) {                              //
          module[name] = value;                                        // 275
        } else {                                                       //
          return module[name];                                         // 278
        }                                                              //
      },                                                               //
      debug: function () {                                             // 281
        if (settings.debug) {                                          // 282
          if (settings.performance) {                                  // 283
            module.performance.log(arguments);                         // 284
          } else {                                                     //
            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
            module.debug.apply(console, arguments);                    // 288
          }                                                            //
        }                                                              //
      },                                                               //
      verbose: function () {                                           // 292
        if (settings.verbose && settings.debug) {                      // 293
          if (settings.performance) {                                  // 294
            module.performance.log(arguments);                         // 295
          } else {                                                     //
            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
            module.verbose.apply(console, arguments);                  // 299
          }                                                            //
        }                                                              //
      },                                                               //
      error: function () {                                             // 303
        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
        module.error.apply(console, arguments);                        // 305
      },                                                               //
      performance: {                                                   // 307
        log: function (message) {                                      // 308
          var currentTime, executionTime, previousTime;                // 309
          if (settings.performance) {                                  // 314
            currentTime = new Date().getTime();                        // 315
            previousTime = time || currentTime;                        // 316
            executionTime = currentTime - previousTime;                // 317
            time = currentTime;                                        // 318
            performance.push({                                         // 319
              'Element': element,                                      // 320
              'Name': message[0],                                      // 321
              'Arguments': [].slice.call(message, 1) || '',            // 322
              'Execution Time': executionTime                          // 323
            });                                                        //
          }                                                            //
          clearTimeout(module.performance.timer);                      // 326
          module.performance.timer = setTimeout(module.performance.display, 500);
        },                                                             //
        display: function () {                                         // 329
          var title = settings.name + ':',                             // 330
              totalTime = 0;                                           //
          time = false;                                                // 334
          clearTimeout(module.performance.timer);                      // 335
          $.each(performance, function (index, data) {                 // 336
            totalTime += data['Execution Time'];                       // 337
          });                                                          //
          title += ' ' + totalTime + 'ms';                             // 339
          if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
            console.groupCollapsed(title);                             // 341
            if (console.table) {                                       // 342
              console.table(performance);                              // 343
            } else {                                                   //
              $.each(performance, function (index, data) {             // 346
                console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
              });                                                      //
            }                                                          //
            console.groupEnd();                                        // 350
          }                                                            //
          performance = [];                                            // 352
        }                                                              //
      },                                                               //
      invoke: function (query, passedArguments, context) {             // 355
        var object = instance,                                         // 356
            maxDepth,                                                  //
            found,                                                     //
            response;                                                  //
        passedArguments = passedArguments || queryArguments;           // 362
        context = element || context;                                  // 363
        if (typeof query == 'string' && object !== undefined) {        // 364
          query = query.split(/[\. ]/);                                // 365
          maxDepth = query.length - 1;                                 // 366
          $.each(query, function (depth, value) {                      // 367
            var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
            if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
              object = object[camelCaseValue];                         // 373
            } else if (object[camelCaseValue] !== undefined) {         //
              found = object[camelCaseValue];                          // 376
              return false;                                            // 377
            } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
              object = object[value];                                  // 380
            } else if (object[value] !== undefined) {                  //
              found = object[value];                                   // 383
              return false;                                            // 384
            } else {                                                   //
              module.error(error.method, query);                       // 387
              return false;                                            // 388
            }                                                          //
          });                                                          //
        }                                                              //
        if ($.isFunction(found)) {                                     // 392
          response = found.apply(context, passedArguments);            // 393
        } else if (found !== undefined) {                              //
          response = found;                                            // 396
        }                                                              //
        if ($.isArray(returnedValue)) {                                // 398
          returnedValue.push(response);                                // 399
        } else if (returnedValue !== undefined) {                      //
          returnedValue = [returnedValue, response];                   // 402
        } else if (response !== undefined) {                           //
          returnedValue = response;                                    // 405
        }                                                              //
        return found;                                                  // 407
      }                                                                //
    };                                                                 //
                                                                       //
    if (methodInvoked) {                                               // 411
      if (instance === undefined) {                                    // 412
        module.initialize();                                           // 413
      }                                                                //
      module.invoke(query);                                            // 415
    } else {                                                           //
      if (instance !== undefined) {                                    // 418
        module.destroy();                                              // 419
      }                                                                //
      module.initialize();                                             // 421
    }                                                                  //
    return returnedValue !== undefined ? returnedValue : this;         // 423
  };                                                                   //
                                                                       //
  $.site.settings = {                                                  // 429
                                                                       //
    name: 'Site',                                                      // 431
    namespace: 'site',                                                 // 432
                                                                       //
    error: {                                                           // 434
      console: 'Console cannot be restored, most likely it was overwritten outside of module',
      method: 'The method you called is not defined.'                  // 436
    },                                                                 //
                                                                       //
    debug: false,                                                      // 439
    verbose: false,                                                    // 440
    performance: true,                                                 // 441
                                                                       //
    modules: ['accordion', 'api', 'checkbox', 'dimmer', 'dropdown', 'embed', 'form', 'modal', 'nag', 'popup', 'rating', 'shape', 'sidebar', 'state', 'sticky', 'tab', 'transition', 'visit', 'visibility'],
                                                                       //
    siteNamespace: 'site',                                             // 465
    namespaceStub: {                                                   // 466
      cache: {},                                                       // 467
      config: {},                                                      // 468
      sections: {},                                                    // 469
      section: {},                                                     // 470
      utilities: {}                                                    // 471
    }                                                                  //
                                                                       //
  };                                                                   //
                                                                       //
  // allows for selection of elements with data attributes             //
  $.extend($.expr[":"], {                                              // 477
    data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
      return function (elem) {                                         // 480
        return !!$.data(elem, dataName);                               // 481
      };                                                               //
    }) : function (elem, i, match) {                                   //
      // support: jQuery < 1.8                                         //
      return !!$.data(elem, match[3]);                                 // 486
    }                                                                  //
  });                                                                  //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
