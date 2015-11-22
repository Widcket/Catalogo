(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/behaviors/visibility.js                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Visibility                                          //
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
  $.fn.visibility = function (parameters) {                            // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 34
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.visibility.settings, parameters) : $.extend({}, $.fn.visibility.settings),
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          error = settings.error,                                      //
          metadata = settings.metadata,                                //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $window = $(window),                                         //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $placeholder,                                                //
          selector = $module.selector || '',                           //
          instance = $module.data(moduleNamespace),                    //
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);                                       // 63
      },                                                               //
          element = this,                                              //
          disabled = false,                                            //
          observer,                                                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 72
                                                                       //
        initialize: function () {                                      // 74
          module.debug('Initializing', settings);                      // 75
                                                                       //
          module.setup.cache();                                        // 77
                                                                       //
          if (module.should.trackChanges()) {                          // 79
                                                                       //
            if (settings.type == 'image') {                            // 81
              module.setup.image();                                    // 82
            }                                                          //
            if (settings.type == 'fixed') {                            // 84
              module.setup.fixed();                                    // 85
            }                                                          //
                                                                       //
            if (settings.observeChanges) {                             // 88
              module.observeChanges();                                 // 89
            }                                                          //
            module.bind.events();                                      // 91
          }                                                            //
                                                                       //
          module.save.position();                                      // 94
          if (!module.is.visible()) {                                  // 95
            module.error(error.visible, $module);                      // 96
          }                                                            //
                                                                       //
          if (settings.initialCheck) {                                 // 99
            module.checkVisibility();                                  // 100
          }                                                            //
          module.instantiate();                                        // 102
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 105
          module.debug('Storing instance', module);                    // 106
          $module.data(moduleNamespace, module);                       // 107
          instance = module;                                           // 110
        },                                                             //
                                                                       //
        destroy: function () {                                         // 113
          module.verbose('Destroying previous module');                // 114
          if (observer) {                                              // 115
            observer.disconnect();                                     // 116
          }                                                            //
          $window.off('load' + eventNamespace, module.event.load).off('resize' + eventNamespace, module.event.resize);
          $context.off('scrollchange' + eventNamespace, module.event.scrollchange);
          $module.off(eventNamespace).removeData(moduleNamespace);     // 125
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 131
          if ('MutationObserver' in window) {                          // 132
            observer = new MutationObserver(function (mutations) {     // 133
              module.verbose('DOM tree modified, updating visibility calculations');
              module.timer = setTimeout(function () {                  // 135
                module.verbose('DOM tree modified, updating sticky menu');
                module.refresh();                                      // 137
              }, 100);                                                 //
            });                                                        //
            observer.observe(element, {                                // 140
              childList: true,                                         // 141
              subtree: true                                            // 142
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 144
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 148
          events: function () {                                        // 149
            module.verbose('Binding visibility events to scroll and resize');
            if (settings.refreshOnLoad) {                              // 151
              $window.on('load' + eventNamespace, module.event.load);  // 152
            }                                                          //
            $window.on('resize' + eventNamespace, module.event.resize);
            // pub/sub pattern                                         //
            $context.off('scroll' + eventNamespace).on('scroll' + eventNamespace, module.event.scroll).on('scrollchange' + eventNamespace, module.event.scrollchange);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 168
          resize: function () {                                        // 169
            module.debug('Window resized');                            // 170
            if (settings.refreshOnResize) {                            // 171
              requestAnimationFrame(module.refresh);                   // 172
            }                                                          //
          },                                                           //
          load: function () {                                          // 175
            module.debug('Page finished loading');                     // 176
            requestAnimationFrame(module.refresh);                     // 177
          },                                                           //
          // publishes scrollchange event on one scroll                //
          scroll: function () {                                        // 180
            if (settings.throttle) {                                   // 181
              clearTimeout(module.timer);                              // 182
              module.timer = setTimeout(function () {                  // 183
                $context.triggerHandler('scrollchange' + eventNamespace, [$context.scrollTop()]);
              }, settings.throttle);                                   //
            } else {                                                   //
              requestAnimationFrame(function () {                      // 188
                $context.triggerHandler('scrollchange' + eventNamespace, [$context.scrollTop()]);
              });                                                      //
            }                                                          //
          },                                                           //
          // subscribes to scrollchange                                //
          scrollchange: function (event, scrollPosition) {             // 194
            module.checkVisibility(scrollPosition);                    // 195
          }                                                            //
        },                                                             //
                                                                       //
        precache: function (images, callback) {                        // 199
          if (!(images instanceof Array)) {                            // 200
            images = [images];                                         // 201
          }                                                            //
          var imagesLength = images.length,                            // 203
              loadedCounter = 0,                                       //
              cache = [],                                              //
              cacheImage = document.createElement('img'),              //
              handleLoad = function () {                               //
            loadedCounter++;                                           // 209
            if (loadedCounter >= images.length) {                      // 210
              if ($.isFunction(callback)) {                            // 211
                callback();                                            // 212
              }                                                        //
            }                                                          //
          };                                                           //
          while (imagesLength--) {                                     // 217
            cacheImage = document.createElement('img');                // 218
            cacheImage.onload = handleLoad;                            // 219
            cacheImage.onerror = handleLoad;                           // 220
            cacheImage.src = images[imagesLength];                     // 221
            cache.push(cacheImage);                                    // 222
          }                                                            //
        },                                                             //
                                                                       //
        enableCallbacks: function () {                                 // 226
          module.debug('Allowing callbacks to occur');                 // 227
          disabled = false;                                            // 228
        },                                                             //
                                                                       //
        disableCallbacks: function () {                                // 231
          module.debug('Disabling all callbacks temporarily');         // 232
          disabled = true;                                             // 233
        },                                                             //
                                                                       //
        should: {                                                      // 236
          trackChanges: function () {                                  // 237
            if (methodInvoked) {                                       // 238
              module.debug('One time query, no need to bind events');  // 239
              return false;                                            // 240
            }                                                          //
            module.debug('Callbacks being attached');                  // 242
            return true;                                               // 243
          }                                                            //
        },                                                             //
                                                                       //
        setup: {                                                       // 247
          cache: function () {                                         // 248
            module.cache = {                                           // 249
              occurred: {},                                            // 250
              screen: {},                                              // 251
              element: {}                                              // 252
            };                                                         //
          },                                                           //
          image: function () {                                         // 255
            var src = $module.data(metadata.src);                      // 256
            if (src) {                                                 // 259
              module.verbose('Lazy loading image', src);               // 260
              settings.once = true;                                    // 261
              settings.observeChanges = false;                         // 262
                                                                       //
              // show when top visible                                 //
              settings.onOnScreen = function () {                      // 265
                module.debug('Image on screen', element);              // 266
                module.precache(src, function () {                     // 267
                  module.set.image(src);                               // 268
                });                                                    //
              };                                                       //
            }                                                          //
          },                                                           //
          fixed: function () {                                         // 273
            module.debug('Setting up fixed');                          // 274
            settings.once = false;                                     // 275
            settings.observeChanges = false;                           // 276
            settings.initialCheck = true;                              // 277
            settings.refreshOnLoad = true;                             // 278
            if (!parameters.transition) {                              // 279
              settings.transition = false;                             // 280
            }                                                          //
            module.create.placeholder();                               // 282
            module.debug('Added placeholder', $placeholder);           // 283
            settings.onTopPassed = function () {                       // 284
              module.debug('Element passed, adding fixed position', $module);
              module.show.placeholder();                               // 286
              module.set.fixed();                                      // 287
              if (settings.transition) {                               // 288
                if ($.fn.transition !== undefined) {                   // 289
                  $module.transition(settings.transition, settings.duration);
                }                                                      //
              }                                                        //
            };                                                         //
            settings.onTopPassedReverse = function () {                // 294
              module.debug('Element returned to position, removing fixed', $module);
              module.hide.placeholder();                               // 296
              module.remove.fixed();                                   // 297
            };                                                         //
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 302
          placeholder: function () {                                   // 303
            module.verbose('Creating fixed position placeholder');     // 304
            $placeholder = $module.clone(false).css('display', 'none').addClass(className.placeholder).insertAfter($module);
          }                                                            //
        },                                                             //
                                                                       //
        show: {                                                        // 314
          placeholder: function () {                                   // 315
            module.verbose('Showing placeholder');                     // 316
            $placeholder.css('display', 'block').css('visibility', 'hidden');
          }                                                            //
        },                                                             //
        hide: {                                                        // 323
          placeholder: function () {                                   // 324
            module.verbose('Hiding placeholder');                      // 325
            $placeholder.css('display', 'none').css('visibility', '');
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 333
          fixed: function () {                                         // 334
            module.verbose('Setting element to fixed position');       // 335
            $module.addClass(className.fixed).css({                    // 336
              position: 'fixed',                                       // 339
              top: settings.offset + 'px',                             // 340
              left: 'auto',                                            // 341
              zIndex: '1'                                              // 342
            });                                                        //
          },                                                           //
          image: function (src) {                                      // 346
            $module.attr('src', src);                                  // 347
            if (settings.transition) {                                 // 350
              if ($.fn.transition !== undefined) {                     // 351
                $module.transition(settings.transition, settings.duration);
              } else {                                                 //
                $module.fadeIn(settings.duration);                     // 355
              }                                                        //
            } else {                                                   //
              $module.show();                                          // 359
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 364
          onScreen: function () {                                      // 365
            var calculations = module.get.elementCalculations();       // 366
            return calculations.onScreen;                              // 369
          },                                                           //
          offScreen: function () {                                     // 371
            var calculations = module.get.elementCalculations();       // 372
            return calculations.offScreen;                             // 375
          },                                                           //
          visible: function () {                                       // 377
            if (module.cache && module.cache.element) {                // 378
              return !(module.cache.element.width === 0 && module.cache.element.offset.top === 0);
            }                                                          //
            return false;                                              // 381
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 385
          module.debug('Refreshing constants (width/height)');         // 386
          if (settings.type == 'fixed') {                              // 387
            module.remove.fixed();                                     // 388
            module.remove.occurred();                                  // 389
          }                                                            //
          module.reset();                                              // 391
          module.save.position();                                      // 392
          if (settings.checkOnRefresh) {                               // 393
            module.checkVisibility();                                  // 394
          }                                                            //
          settings.onRefresh.call(element);                            // 396
        },                                                             //
                                                                       //
        reset: function () {                                           // 399
          module.verbose('Reseting all cached values');                // 400
          if ($.isPlainObject(module.cache)) {                         // 401
            module.cache.screen = {};                                  // 402
            module.cache.element = {};                                 // 403
          }                                                            //
        },                                                             //
                                                                       //
        checkVisibility: function (scroll) {                           // 407
          module.verbose('Checking visibility of element', module.cache.element);
                                                                       //
          if (!disabled && module.is.visible()) {                      // 410
                                                                       //
            // save scroll position                                    //
            module.save.scroll(scroll);                                // 413
                                                                       //
            // update calculations derived from scroll                 //
            module.save.calculations();                                // 416
                                                                       //
            // percentage                                              //
            module.passed();                                           // 419
                                                                       //
            // reverse (must be first)                                 //
            module.passingReverse();                                   // 422
            module.topVisibleReverse();                                // 423
            module.bottomVisibleReverse();                             // 424
            module.topPassedReverse();                                 // 425
            module.bottomPassedReverse();                              // 426
                                                                       //
            // one time                                                //
            module.onScreen();                                         // 429
            module.offScreen();                                        // 430
            module.passing();                                          // 431
            module.topVisible();                                       // 432
            module.bottomVisible();                                    // 433
            module.topPassed();                                        // 434
            module.bottomPassed();                                     // 435
                                                                       //
            // on update callback                                      //
            if (settings.onUpdate) {                                   // 438
              settings.onUpdate.call(element, module.get.elementCalculations());
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        passed: function (amount, newCallback) {                       // 444
          var calculations = module.get.elementCalculations(),         // 445
              amountInPixels;                                          //
          // assign callback                                           //
          if (amount && newCallback) {                                 // 450
            settings.onPassed[amount] = newCallback;                   // 451
          } else if (amount !== undefined) {                           //
            return module.get.pixelsPassed(amount) > calculations.pixelsPassed;
          } else if (calculations.passing) {                           //
            $.each(settings.onPassed, function (amount, callback) {    // 457
              if (calculations.bottomVisible || calculations.pixelsPassed > module.get.pixelsPassed(amount)) {
                module.execute(callback, amount);                      // 459
              } else if (!settings.once) {                             //
                module.remove.occurred(callback);                      // 462
              }                                                        //
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        onScreen: function (newCallback) {                             // 468
          var calculations = module.get.elementCalculations(),         // 469
              callback = newCallback || settings.onOnScreen,           //
              callbackName = 'onScreen';                               //
          if (newCallback) {                                           // 474
            module.debug('Adding callback for onScreen', newCallback);
            settings.onOnScreen = newCallback;                         // 476
          }                                                            //
          if (calculations.onScreen) {                                 // 478
            module.execute(callback, callbackName);                    // 479
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 482
          }                                                            //
          if (newCallback !== undefined) {                             // 484
            return calculations.onOnScreen;                            // 485
          }                                                            //
        },                                                             //
                                                                       //
        offScreen: function (newCallback) {                            // 489
          var calculations = module.get.elementCalculations(),         // 490
              callback = newCallback || settings.onOffScreen,          //
              callbackName = 'offScreen';                              //
          if (newCallback) {                                           // 495
            module.debug('Adding callback for offScreen', newCallback);
            settings.onOffScreen = newCallback;                        // 497
          }                                                            //
          if (calculations.offScreen) {                                // 499
            module.execute(callback, callbackName);                    // 500
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 503
          }                                                            //
          if (newCallback !== undefined) {                             // 505
            return calculations.onOffScreen;                           // 506
          }                                                            //
        },                                                             //
                                                                       //
        passing: function (newCallback) {                              // 510
          var calculations = module.get.elementCalculations(),         // 511
              callback = newCallback || settings.onPassing,            //
              callbackName = 'passing';                                //
          if (newCallback) {                                           // 516
            module.debug('Adding callback for passing', newCallback);  // 517
            settings.onPassing = newCallback;                          // 518
          }                                                            //
          if (calculations.passing) {                                  // 520
            module.execute(callback, callbackName);                    // 521
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 524
          }                                                            //
          if (newCallback !== undefined) {                             // 526
            return calculations.passing;                               // 527
          }                                                            //
        },                                                             //
                                                                       //
        topVisible: function (newCallback) {                           // 532
          var calculations = module.get.elementCalculations(),         // 533
              callback = newCallback || settings.onTopVisible,         //
              callbackName = 'topVisible';                             //
          if (newCallback) {                                           // 538
            module.debug('Adding callback for top visible', newCallback);
            settings.onTopVisible = newCallback;                       // 540
          }                                                            //
          if (calculations.topVisible) {                               // 542
            module.execute(callback, callbackName);                    // 543
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 546
          }                                                            //
          if (newCallback === undefined) {                             // 548
            return calculations.topVisible;                            // 549
          }                                                            //
        },                                                             //
                                                                       //
        bottomVisible: function (newCallback) {                        // 553
          var calculations = module.get.elementCalculations(),         // 554
              callback = newCallback || settings.onBottomVisible,      //
              callbackName = 'bottomVisible';                          //
          if (newCallback) {                                           // 559
            module.debug('Adding callback for bottom visible', newCallback);
            settings.onBottomVisible = newCallback;                    // 561
          }                                                            //
          if (calculations.bottomVisible) {                            // 563
            module.execute(callback, callbackName);                    // 564
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 567
          }                                                            //
          if (newCallback === undefined) {                             // 569
            return calculations.bottomVisible;                         // 570
          }                                                            //
        },                                                             //
                                                                       //
        topPassed: function (newCallback) {                            // 574
          var calculations = module.get.elementCalculations(),         // 575
              callback = newCallback || settings.onTopPassed,          //
              callbackName = 'topPassed';                              //
          if (newCallback) {                                           // 580
            module.debug('Adding callback for top passed', newCallback);
            settings.onTopPassed = newCallback;                        // 582
          }                                                            //
          if (calculations.topPassed) {                                // 584
            module.execute(callback, callbackName);                    // 585
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 588
          }                                                            //
          if (newCallback === undefined) {                             // 590
            return calculations.topPassed;                             // 591
          }                                                            //
        },                                                             //
                                                                       //
        bottomPassed: function (newCallback) {                         // 595
          var calculations = module.get.elementCalculations(),         // 596
              callback = newCallback || settings.onBottomPassed,       //
              callbackName = 'bottomPassed';                           //
          if (newCallback) {                                           // 601
            module.debug('Adding callback for bottom passed', newCallback);
            settings.onBottomPassed = newCallback;                     // 603
          }                                                            //
          if (calculations.bottomPassed) {                             // 605
            module.execute(callback, callbackName);                    // 606
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 609
          }                                                            //
          if (newCallback === undefined) {                             // 611
            return calculations.bottomPassed;                          // 612
          }                                                            //
        },                                                             //
                                                                       //
        passingReverse: function (newCallback) {                       // 616
          var calculations = module.get.elementCalculations(),         // 617
              callback = newCallback || settings.onPassingReverse,     //
              callbackName = 'passingReverse';                         //
          if (newCallback) {                                           // 622
            module.debug('Adding callback for passing reverse', newCallback);
            settings.onPassingReverse = newCallback;                   // 624
          }                                                            //
          if (!calculations.passing) {                                 // 626
            if (module.get.occurred('passing')) {                      // 627
              module.execute(callback, callbackName);                  // 628
            }                                                          //
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 632
          }                                                            //
          if (newCallback !== undefined) {                             // 634
            return !calculations.passing;                              // 635
          }                                                            //
        },                                                             //
                                                                       //
        topVisibleReverse: function (newCallback) {                    // 640
          var calculations = module.get.elementCalculations(),         // 641
              callback = newCallback || settings.onTopVisibleReverse,  //
              callbackName = 'topVisibleReverse';                      //
          if (newCallback) {                                           // 646
            module.debug('Adding callback for top visible reverse', newCallback);
            settings.onTopVisibleReverse = newCallback;                // 648
          }                                                            //
          if (!calculations.topVisible) {                              // 650
            if (module.get.occurred('topVisible')) {                   // 651
              module.execute(callback, callbackName);                  // 652
            }                                                          //
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 656
          }                                                            //
          if (newCallback === undefined) {                             // 658
            return !calculations.topVisible;                           // 659
          }                                                            //
        },                                                             //
                                                                       //
        bottomVisibleReverse: function (newCallback) {                 // 663
          var calculations = module.get.elementCalculations(),         // 664
              callback = newCallback || settings.onBottomVisibleReverse,
              callbackName = 'bottomVisibleReverse';                   //
          if (newCallback) {                                           // 669
            module.debug('Adding callback for bottom visible reverse', newCallback);
            settings.onBottomVisibleReverse = newCallback;             // 671
          }                                                            //
          if (!calculations.bottomVisible) {                           // 673
            if (module.get.occurred('bottomVisible')) {                // 674
              module.execute(callback, callbackName);                  // 675
            }                                                          //
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 679
          }                                                            //
          if (newCallback === undefined) {                             // 681
            return !calculations.bottomVisible;                        // 682
          }                                                            //
        },                                                             //
                                                                       //
        topPassedReverse: function (newCallback) {                     // 686
          var calculations = module.get.elementCalculations(),         // 687
              callback = newCallback || settings.onTopPassedReverse,   //
              callbackName = 'topPassedReverse';                       //
          if (newCallback) {                                           // 692
            module.debug('Adding callback for top passed reverse', newCallback);
            settings.onTopPassedReverse = newCallback;                 // 694
          }                                                            //
          if (!calculations.topPassed) {                               // 696
            if (module.get.occurred('topPassed')) {                    // 697
              module.execute(callback, callbackName);                  // 698
            }                                                          //
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 702
          }                                                            //
          if (newCallback === undefined) {                             // 704
            return !calculations.onTopPassed;                          // 705
          }                                                            //
        },                                                             //
                                                                       //
        bottomPassedReverse: function (newCallback) {                  // 709
          var calculations = module.get.elementCalculations(),         // 710
              callback = newCallback || settings.onBottomPassedReverse,
              callbackName = 'bottomPassedReverse';                    //
          if (newCallback) {                                           // 715
            module.debug('Adding callback for bottom passed reverse', newCallback);
            settings.onBottomPassedReverse = newCallback;              // 717
          }                                                            //
          if (!calculations.bottomPassed) {                            // 719
            if (module.get.occurred('bottomPassed')) {                 // 720
              module.execute(callback, callbackName);                  // 721
            }                                                          //
          } else if (!settings.once) {                                 //
            module.remove.occurred(callbackName);                      // 725
          }                                                            //
          if (newCallback === undefined) {                             // 727
            return !calculations.bottomPassed;                         // 728
          }                                                            //
        },                                                             //
                                                                       //
        execute: function (callback, callbackName) {                   // 732
          var calculations = module.get.elementCalculations(),         // 733
              screen = module.get.screenCalculations();                //
          callback = callback || false;                                // 737
          if (callback) {                                              // 738
            if (settings.continuous) {                                 // 739
              module.debug('Callback being called continuously', callbackName, calculations);
              callback.call(element, calculations, screen);            // 741
            } else if (!module.get.occurred(callbackName)) {           //
              module.debug('Conditions met', callbackName, calculations);
              callback.call(element, calculations, screen);            // 745
            }                                                          //
          }                                                            //
          module.save.occurred(callbackName);                          // 748
        },                                                             //
                                                                       //
        remove: {                                                      // 751
          fixed: function () {                                         // 752
            module.debug('Removing fixed position');                   // 753
            $module.removeClass(className.fixed).css({                 // 754
              position: '',                                            // 757
              top: '',                                                 // 758
              left: '',                                                // 759
              zIndex: ''                                               // 760
            });                                                        //
          },                                                           //
          occurred: function (callback) {                              // 764
            if (callback) {                                            // 765
              var occurred = module.cache.occurred;                    // 766
              if (occurred[callback] !== undefined && occurred[callback] === true) {
                module.debug('Callback can now be called again', callback);
                module.cache.occurred[callback] = false;               // 771
              }                                                        //
            } else {                                                   //
              module.cache.occurred = {};                              // 775
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 780
          calculations: function () {                                  // 781
            module.verbose('Saving all calculations necessary to determine positioning');
            module.save.direction();                                   // 783
            module.save.screenCalculations();                          // 784
            module.save.elementCalculations();                         // 785
          },                                                           //
          occurred: function (callback) {                              // 787
            if (callback) {                                            // 788
              if (module.cache.occurred[callback] === undefined || module.cache.occurred[callback] !== true) {
                module.verbose('Saving callback occurred', callback);  // 790
                module.cache.occurred[callback] = true;                // 791
              }                                                        //
            }                                                          //
          },                                                           //
          scroll: function (scrollPosition) {                          // 795
            scrollPosition = scrollPosition + settings.offset || $context.scrollTop() + settings.offset;
            module.cache.scroll = scrollPosition;                      // 797
          },                                                           //
          direction: function () {                                     // 799
            var scroll = module.get.scroll(),                          // 800
                lastScroll = module.get.lastScroll(),                  //
                direction;                                             //
            if (scroll > lastScroll && lastScroll) {                   // 805
              direction = 'down';                                      // 806
            } else if (scroll < lastScroll && lastScroll) {            //
              direction = 'up';                                        // 809
            } else {                                                   //
              direction = 'static';                                    // 812
            }                                                          //
            module.cache.direction = direction;                        // 814
            return module.cache.direction;                             // 815
          },                                                           //
          elementPosition: function () {                               // 817
            var element = module.cache.element,                        // 818
                screen = module.get.screenSize();                      //
            module.verbose('Saving element position');                 // 822
            // (quicker than $.extend)                                 //
            element.fits = element.height < screen.height;             // 824
            element.offset = $module.offset();                         // 825
            element.width = $module.outerWidth();                      // 826
            element.height = $module.outerHeight();                    // 827
            // store                                                   //
            module.cache.element = element;                            // 829
            return element;                                            // 830
          },                                                           //
          elementCalculations: function () {                           // 832
            var screen = module.get.screenCalculations(),              // 833
                element = module.get.elementPosition();                //
            // offset                                                  //
            if (settings.includeMargin) {                              // 838
              element.margin = {};                                     // 839
              element.margin.top = parseInt($module.css('margin-top'), 10);
              element.margin.bottom = parseInt($module.css('margin-bottom'), 10);
              element.top = element.offset.top - element.margin.top;   // 842
              element.bottom = element.offset.top + element.height + element.margin.bottom;
            } else {                                                   //
              element.top = element.offset.top;                        // 846
              element.bottom = element.offset.top + element.height;    // 847
            }                                                          //
                                                                       //
            // visibility                                              //
            element.topVisible = screen.bottom >= element.top;         // 851
            element.topPassed = screen.top >= element.top;             // 852
            element.bottomVisible = screen.bottom >= element.bottom;   // 853
            element.bottomPassed = screen.top >= element.bottom;       // 854
            element.pixelsPassed = 0;                                  // 855
            element.percentagePassed = 0;                              // 856
                                                                       //
            // meta calculations                                       //
            element.onScreen = element.topVisible && !element.bottomPassed;
            element.passing = element.topPassed && !element.bottomPassed;
            element.offScreen = !element.onScreen;                     // 861
                                                                       //
            // passing calculations                                    //
            if (element.passing) {                                     // 864
              element.pixelsPassed = screen.top - element.top;         // 865
              element.percentagePassed = (screen.top - element.top) / element.height;
            }                                                          //
            module.cache.element = element;                            // 868
            module.verbose('Updated element calculations', element);   // 869
            return element;                                            // 870
          },                                                           //
          screenCalculations: function () {                            // 872
            var scroll = module.get.scroll();                          // 873
            module.save.direction();                                   // 876
            module.cache.screen.top = scroll;                          // 877
            module.cache.screen.bottom = scroll + module.cache.screen.height;
            return module.cache.screen;                                // 879
          },                                                           //
          screenSize: function () {                                    // 881
            module.verbose('Saving window position');                  // 882
            module.cache.screen = {                                    // 883
              height: $context.height()                                // 884
            };                                                         //
          },                                                           //
          position: function () {                                      // 887
            module.save.screenSize();                                  // 888
            module.save.elementPosition();                             // 889
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 893
          pixelsPassed: function (amount) {                            // 894
            var element = module.get.elementCalculations();            // 895
            if (amount.search('%') > -1) {                             // 898
              return element.height * (parseInt(amount, 10) / 100);    // 899
            }                                                          //
            return parseInt(amount, 10);                               // 901
          },                                                           //
          occurred: function (callback) {                              // 903
            return module.cache.occurred !== undefined ? module.cache.occurred[callback] || false : false;
          },                                                           //
          direction: function () {                                     // 909
            if (module.cache.direction === undefined) {                // 910
              module.save.direction();                                 // 911
            }                                                          //
            return module.cache.direction;                             // 913
          },                                                           //
          elementPosition: function () {                               // 915
            if (module.cache.element === undefined) {                  // 916
              module.save.elementPosition();                           // 917
            }                                                          //
            return module.cache.element;                               // 919
          },                                                           //
          elementCalculations: function () {                           // 921
            if (module.cache.element === undefined) {                  // 922
              module.save.elementCalculations();                       // 923
            }                                                          //
            return module.cache.element;                               // 925
          },                                                           //
          screenCalculations: function () {                            // 927
            if (module.cache.screen === undefined) {                   // 928
              module.save.screenCalculations();                        // 929
            }                                                          //
            return module.cache.screen;                                // 931
          },                                                           //
          screenSize: function () {                                    // 933
            if (module.cache.screen === undefined) {                   // 934
              module.save.screenSize();                                // 935
            }                                                          //
            return module.cache.screen;                                // 937
          },                                                           //
          scroll: function () {                                        // 939
            if (module.cache.scroll === undefined) {                   // 940
              module.save.scroll();                                    // 941
            }                                                          //
            return module.cache.scroll;                                // 943
          },                                                           //
          lastScroll: function () {                                    // 945
            if (module.cache.screen === undefined) {                   // 946
              module.debug('First scroll event, no last scroll could be found');
              return false;                                            // 948
            }                                                          //
            return module.cache.screen.top;                            // 950
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 954
          if ($.isPlainObject(name)) {                                 // 955
            $.extend(true, settings, name);                            // 956
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 959
          } else {                                                     //
            return settings[name];                                     // 962
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 965
          if ($.isPlainObject(name)) {                                 // 966
            $.extend(true, module, name);                              // 967
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 970
          } else {                                                     //
            return module[name];                                       // 973
          }                                                            //
        },                                                             //
        debug: function () {                                           // 976
          if (settings.debug) {                                        // 977
            if (settings.performance) {                                // 978
              module.performance.log(arguments);                       // 979
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 983
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 987
          if (settings.verbose && settings.debug) {                    // 988
            if (settings.performance) {                                // 989
              module.performance.log(arguments);                       // 990
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 994
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 998
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 1000
        },                                                             //
        performance: {                                                 // 1002
          log: function (message) {                                    // 1003
            var currentTime, executionTime, previousTime;              // 1004
            if (settings.performance) {                                // 1009
              currentTime = new Date().getTime();                      // 1010
              previousTime = time || currentTime;                      // 1011
              executionTime = currentTime - previousTime;              // 1012
              time = currentTime;                                      // 1013
              performance.push({                                       // 1014
                'Name': message[0],                                    // 1015
                'Arguments': [].slice.call(message, 1) || '',          // 1016
                'Element': element,                                    // 1017
                'Execution Time': executionTime                        // 1018
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 1021
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 1024
            var title = settings.name + ':',                           // 1025
                totalTime = 0;                                         //
            time = false;                                              // 1029
            clearTimeout(module.performance.timer);                    // 1030
            $.each(performance, function (index, data) {               // 1031
              totalTime += data['Execution Time'];                     // 1032
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 1034
            if (moduleSelector) {                                      // 1035
              title += ' \'' + moduleSelector + '\'';                  // 1036
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 1039
              if (console.table) {                                     // 1040
                console.table(performance);                            // 1041
              } else {                                                 //
                $.each(performance, function (index, data) {           // 1044
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 1048
            }                                                          //
            performance = [];                                          // 1050
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 1053
          var object = instance,                                       // 1054
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 1060
          context = element || context;                                // 1061
          if (typeof query == 'string' && object !== undefined) {      // 1062
            query = query.split(/[\. ]/);                              // 1063
            maxDepth = query.length - 1;                               // 1064
            $.each(query, function (depth, value) {                    // 1065
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 1071
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 1074
                return false;                                          // 1075
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 1078
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 1081
                return false;                                          // 1082
              } else {                                                 //
                module.error(error.method, query);                     // 1085
                return false;                                          // 1086
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 1090
            response = found.apply(context, passedArguments);          // 1091
          } else if (found !== undefined) {                            //
            response = found;                                          // 1094
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1096
            returnedValue.push(response);                              // 1097
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1100
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1103
          }                                                            //
          return found;                                                // 1105
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 1109
        if (instance === undefined) {                                  // 1110
          module.initialize();                                         // 1111
        }                                                              //
        instance.save.scroll();                                        // 1113
        instance.save.calculations();                                  // 1114
        module.invoke(query);                                          // 1115
      } else {                                                         //
        if (instance !== undefined) {                                  // 1118
          instance.invoke('destroy');                                  // 1119
        }                                                              //
        module.initialize();                                           // 1121
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1126
  };                                                                   //
                                                                       //
  $.fn.visibility.settings = {                                         // 1132
                                                                       //
    name: 'Visibility',                                                // 1134
    namespace: 'visibility',                                           // 1135
                                                                       //
    debug: false,                                                      // 1137
    verbose: false,                                                    // 1138
    performance: true,                                                 // 1139
                                                                       //
    // whether to use mutation observers to follow changes             //
    observeChanges: true,                                              // 1142
                                                                       //
    // check position immediately on init                              //
    initialCheck: true,                                                // 1145
                                                                       //
    // whether to refresh calculations after all page images load      //
    refreshOnLoad: true,                                               // 1148
                                                                       //
    // whether to refresh calculations after page resize event         //
    refreshOnResize: true,                                             // 1151
                                                                       //
    // should call callbacks on refresh event (resize, etc)            //
    checkOnRefresh: true,                                              // 1154
                                                                       //
    // callback should only occur one time                             //
    once: true,                                                        // 1157
                                                                       //
    // callback should fire continuously whe evaluates to true         //
    continuous: false,                                                 // 1160
                                                                       //
    // offset to use with scroll top                                   //
    offset: 0,                                                         // 1163
                                                                       //
    // whether to include margin in elements position                  //
    includeMargin: false,                                              // 1166
                                                                       //
    // scroll context for visibility checks                            //
    context: window,                                                   // 1169
                                                                       //
    // visibility check delay in ms (defaults to animationFrame)       //
    throttle: false,                                                   // 1172
                                                                       //
    // special visibility type (image, fixed)                          //
    type: false,                                                       // 1175
                                                                       //
    // image only animation settings                                   //
    transition: 'fade in',                                             // 1178
    duration: 1000,                                                    // 1179
                                                                       //
    // array of callbacks for percentage                               //
    onPassed: {},                                                      // 1182
                                                                       //
    // standard callbacks                                              //
    onOnScreen: false,                                                 // 1185
    onOffScreen: false,                                                // 1186
    onPassing: false,                                                  // 1187
    onTopVisible: false,                                               // 1188
    onBottomVisible: false,                                            // 1189
    onTopPassed: false,                                                // 1190
    onBottomPassed: false,                                             // 1191
                                                                       //
    // reverse callbacks                                               //
    onPassingReverse: false,                                           // 1194
    onTopVisibleReverse: false,                                        // 1195
    onBottomVisibleReverse: false,                                     // 1196
    onTopPassedReverse: false,                                         // 1197
    onBottomPassedReverse: false,                                      // 1198
                                                                       //
    // utility callbacks                                               //
    onUpdate: false, // disabled by default for performance            // 1201
    onRefresh: function () {},                                         // 1202
                                                                       //
    metadata: {                                                        // 1204
      src: 'src'                                                       // 1205
    },                                                                 //
                                                                       //
    className: {                                                       // 1208
      fixed: 'fixed',                                                  // 1209
      placeholder: 'placeholder'                                       // 1210
    },                                                                 //
                                                                       //
    error: {                                                           // 1213
      method: 'The method you called is not defined.',                 // 1214
      visible: 'Element is hidden, you must call refresh after element becomes visible'
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
