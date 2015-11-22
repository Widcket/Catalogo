(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/modules/modal.js                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Modal                                               //
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
  $.fn.modal = function (parameters) {                                 // 20
    var $allModules = $(this),                                         // 21
        $window = $(window),                                           //
        $document = $(document),                                       //
        $body = $('body'),                                             //
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 40
    },                                                                 //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 45
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.modal.settings, parameters) : $.extend({}, $.fn.modal.settings),
          selector = settings.selector,                                //
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $close = $module.find(selector.close),                       //
          $allModals,                                                  //
          $otherModals,                                                //
          $focusedElement,                                             //
          $dimmable,                                                   //
          $dimmer,                                                     //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          elementNamespace,                                            //
          id,                                                          //
          observer,                                                    //
          module;                                                      //
      module = {                                                       // 78
                                                                       //
        initialize: function () {                                      // 80
          module.verbose('Initializing dimmer', $context);             // 81
                                                                       //
          module.create.id();                                          // 83
          module.create.dimmer();                                      // 84
          module.refreshModals();                                      // 85
                                                                       //
          module.bind.events();                                        // 87
          if (settings.observeChanges) {                               // 88
            module.observeChanges();                                   // 89
          }                                                            //
          module.instantiate();                                        // 91
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 94
          module.verbose('Storing instance of modal');                 // 95
          instance = module;                                           // 96
          $module.data(moduleNamespace, instance);                     // 97
        },                                                             //
                                                                       //
        create: {                                                      // 102
          dimmer: function () {                                        // 103
            var defaultSettings = {                                    // 104
              debug: settings.debug,                                   // 106
              dimmerName: 'modals',                                    // 107
              duration: {                                              // 108
                show: settings.duration,                               // 109
                hide: settings.duration                                // 110
              }                                                        //
            },                                                         //
                dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings);
            if (settings.inverted) {                                   // 115
              dimmerSettings.variation = dimmerSettings.variation !== undefined ? dimmerSettings.variation + ' inverted' : 'inverted';
            }                                                          //
            if ($.fn.dimmer === undefined) {                           // 121
              module.error(error.dimmer);                              // 122
              return;                                                  // 123
            }                                                          //
            module.debug('Creating dimmer with settings', dimmerSettings);
            $dimmable = $context.dimmer(dimmerSettings);               // 126
            if (settings.detachable) {                                 // 127
              module.verbose('Modal is detachable, moving content into dimmer');
              $dimmable.dimmer('add content', $module);                // 129
            } else {                                                   //
              module.set.undetached();                                 // 132
            }                                                          //
            if (settings.blurring) {                                   // 134
              $dimmable.addClass(className.blurring);                  // 135
            }                                                          //
            $dimmer = $dimmable.dimmer('get dimmer');                  // 137
          },                                                           //
          id: function () {                                            // 139
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;                               // 141
            module.verbose('Creating unique id for element', id);      // 142
          }                                                            //
        },                                                             //
                                                                       //
        destroy: function () {                                         // 146
          module.verbose('Destroying previous modal');                 // 147
          $module.removeData(moduleNamespace).off(eventNamespace);     // 148
          $window.off(elementNamespace);                               // 152
          $close.off(eventNamespace);                                  // 153
          $context.dimmer('destroy');                                  // 154
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 157
          if ('MutationObserver' in window) {                          // 158
            observer = new MutationObserver(function (mutations) {     // 159
              module.debug('DOM tree modified, refreshing');           // 160
              module.refresh();                                        // 161
            });                                                        //
            observer.observe(element, {                                // 163
              childList: true,                                         // 164
              subtree: true                                            // 165
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 167
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 171
          module.remove.scrolling();                                   // 172
          module.cacheSizes();                                         // 173
          module.set.screenHeight();                                   // 174
          module.set.type();                                           // 175
          module.set.position();                                       // 176
        },                                                             //
                                                                       //
        refreshModals: function () {                                   // 179
          $otherModals = $module.siblings(selector.modal);             // 180
          $allModals = $otherModals.add($module);                      // 181
        },                                                             //
                                                                       //
        attachEvents: function (selector, event) {                     // 184
          var $toggle = $(selector);                                   // 185
          event = $.isFunction(module[event]) ? module[event] : module.toggle;
          if ($toggle.length > 0) {                                    // 192
            module.debug('Attaching modal events to element', selector, event);
            $toggle.off(eventNamespace).on('click' + eventNamespace, event);
          } else {                                                     //
            module.error(error.notFound, selector);                    // 200
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 204
          events: function () {                                        // 205
            module.verbose('Attaching events');                        // 206
            $module.on('click' + eventNamespace, selector.close, module.event.close).on('click' + eventNamespace, selector.approve, module.event.approve).on('click' + eventNamespace, selector.deny, module.event.deny);
            $window.on('resize' + elementNamespace, module.event.resize);
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 218
          id: function () {                                            // 219
            return (Math.random().toString(16) + '000000000').substr(2, 8);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 224
          approve: function () {                                       // 225
            if (settings.onApprove.call(element, $(this)) === false) {
              module.verbose('Approve callback returned false cancelling hide');
              return;                                                  // 228
            }                                                          //
            module.hide();                                             // 230
          },                                                           //
          deny: function () {                                          // 232
            if (settings.onDeny.call(element, $(this)) === false) {    // 233
              module.verbose('Deny callback returned false cancelling hide');
              return;                                                  // 235
            }                                                          //
            module.hide();                                             // 237
          },                                                           //
          close: function () {                                         // 239
            module.hide();                                             // 240
          },                                                           //
          click: function (event) {                                    // 242
            var $target = $(event.target),                             // 243
                isInModal = $target.closest(selector.modal).length > 0,
                isInDOM = $.contains(document.documentElement, event.target);
            if (!isInModal && isInDOM) {                               // 248
              module.debug('Dimmer clicked, hiding all modals');       // 249
              if (module.is.active()) {                                // 250
                module.remove.clickaway();                             // 251
                if (settings.allowMultiple) {                          // 252
                  module.hide();                                       // 253
                } else {                                               //
                  module.hideAll();                                    // 256
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
          debounce: function (method, delay) {                         // 261
            clearTimeout(module.timer);                                // 262
            module.timer = setTimeout(method, delay);                  // 263
          },                                                           //
          keyboard: function (event) {                                 // 265
            var keyCode = event.which,                                 // 266
                escapeKey = 27;                                        //
            if (keyCode == escapeKey) {                                // 270
              if (settings.closable) {                                 // 271
                module.debug('Escape key pressed hiding modal');       // 272
                module.hide();                                         // 273
              } else {                                                 //
                module.debug('Escape key pressed, but closable is set to false');
              }                                                        //
              event.preventDefault();                                  // 278
            }                                                          //
          },                                                           //
          resize: function () {                                        // 281
            if ($dimmable.dimmer('is active')) {                       // 282
              requestAnimationFrame(module.refresh);                   // 283
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        toggle: function () {                                          // 288
          if (module.is.active() || module.is.animating()) {           // 289
            module.hide();                                             // 290
          } else {                                                     //
            module.show();                                             // 293
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 297
          callback = $.isFunction(callback) ? callback : function () {};
          module.refreshModals();                                      // 302
          module.showModal(callback);                                  // 303
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 306
          callback = $.isFunction(callback) ? callback : function () {};
          module.refreshModals();                                      // 311
          module.hideModal(callback);                                  // 312
        },                                                             //
                                                                       //
        showModal: function (callback) {                               // 315
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.animating() || !module.is.active()) {          // 320
                                                                       //
            module.showDimmer();                                       // 322
            module.cacheSizes();                                       // 323
            module.set.position();                                     // 324
            module.set.screenHeight();                                 // 325
            module.set.type();                                         // 326
            module.set.clickaway();                                    // 327
                                                                       //
            if (!settings.allowMultiple && module.others.active()) {   // 329
              module.hideOthers(module.showModal);                     // 330
            } else {                                                   //
              settings.onShow.call(element);                           // 333
              if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                module.debug('Showing modal with css animations');     // 335
                $module.transition({                                   // 336
                  debug: settings.debug,                               // 338
                  animation: settings.transition + ' in',              // 339
                  queue: settings.queue,                               // 340
                  duration: settings.duration,                         // 341
                  useFailSafe: true,                                   // 342
                  onComplete: function () {                            // 343
                    settings.onVisible.apply(element);                 // 344
                    module.add.keyboardShortcuts();                    // 345
                    module.save.focus();                               // 346
                    module.set.active();                               // 347
                    if (settings.autofocus) {                          // 348
                      module.set.autofocus();                          // 349
                    }                                                  //
                    callback();                                        // 351
                  }                                                    //
                });                                                    //
              } else {                                                 //
                module.error(error.noTransition);                      // 357
              }                                                        //
            }                                                          //
          } else {                                                     //
            module.debug('Modal is already visible');                  // 362
          }                                                            //
        },                                                             //
                                                                       //
        hideModal: function (callback, keepDimmed) {                   // 366
          callback = $.isFunction(callback) ? callback : function () {};
          module.debug('Hiding modal');                                // 371
          if (settings.onHide.call(element, $(this)) === false) {      // 372
            module.verbose('Hide callback returned false cancelling hide');
            return;                                                    // 374
          }                                                            //
                                                                       //
          if (module.is.animating() || module.is.active()) {           // 377
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.remove.active();                                  // 379
              $module.transition({                                     // 380
                debug: settings.debug,                                 // 382
                animation: settings.transition + ' out',               // 383
                queue: settings.queue,                                 // 384
                duration: settings.duration,                           // 385
                useFailSafe: true,                                     // 386
                onStart: function () {                                 // 387
                  if (!module.others.active() && !keepDimmed) {        // 388
                    module.hideDimmer();                               // 389
                  }                                                    //
                  module.remove.keyboardShortcuts();                   // 391
                },                                                     //
                onComplete: function () {                              // 393
                  settings.onHidden.call(element);                     // 394
                  module.restore.focus();                              // 395
                  callback();                                          // 396
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.error(error.noTransition);                        // 402
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        showDimmer: function () {                                      // 407
          if ($dimmable.dimmer('is animating') || !$dimmable.dimmer('is active')) {
            module.debug('Showing dimmer');                            // 409
            $dimmable.dimmer('show');                                  // 410
          } else {                                                     //
            module.debug('Dimmer already visible');                    // 413
          }                                                            //
        },                                                             //
                                                                       //
        hideDimmer: function () {                                      // 417
          if ($dimmable.dimmer('is animating') || $dimmable.dimmer('is active')) {
            $dimmable.dimmer('hide', function () {                     // 419
              module.remove.clickaway();                               // 420
              module.remove.screenHeight();                            // 421
            });                                                        //
          } else {                                                     //
            module.debug('Dimmer is not visible cannot hide');         // 425
            return;                                                    // 426
          }                                                            //
        },                                                             //
                                                                       //
        hideAll: function (callback) {                                 // 430
          var $visibleModals = $allModals.filter('.' + className.active + ', .' + className.animating);
          callback = $.isFunction(callback) ? callback : function () {};
          if ($visibleModals.length > 0) {                             // 438
            module.debug('Hiding all visible modals');                 // 439
            module.hideDimmer();                                       // 440
            $visibleModals.modal('hide modal', callback);              // 441
          }                                                            //
        },                                                             //
                                                                       //
        hideOthers: function (callback) {                              // 447
          var $visibleModals = $otherModals.filter('.' + className.active + ', .' + className.animating);
          callback = $.isFunction(callback) ? callback : function () {};
          if ($visibleModals.length > 0) {                             // 455
            module.debug('Hiding other modals', $otherModals);         // 456
            $visibleModals.modal('hide modal', callback, true);        // 457
          }                                                            //
        },                                                             //
                                                                       //
        others: {                                                      // 463
          active: function () {                                        // 464
            return $otherModals.filter('.' + className.active).length > 0;
          },                                                           //
          animating: function () {                                     // 467
            return $otherModals.filter('.' + className.animating).length > 0;
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 473
          keyboardShortcuts: function () {                             // 474
            module.verbose('Adding keyboard shortcuts');               // 475
            $document.on('keyup' + eventNamespace, module.event.keyboard);
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 482
          focus: function () {                                         // 483
            $focusedElement = $(document.activeElement).blur();        // 484
          }                                                            //
        },                                                             //
                                                                       //
        restore: {                                                     // 488
          focus: function () {                                         // 489
            if ($focusedElement && $focusedElement.length > 0) {       // 490
              $focusedElement.focus();                                 // 491
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 496
          active: function () {                                        // 497
            $module.removeClass(className.active);                     // 498
          },                                                           //
          clickaway: function () {                                     // 500
            if (settings.closable) {                                   // 501
              $dimmer.off('click' + elementNamespace);                 // 502
            }                                                          //
          },                                                           //
          bodyStyle: function () {                                     // 507
            if ($body.attr('style') === '') {                          // 508
              module.verbose('Removing style attribute');              // 509
              $body.removeAttr('style');                               // 510
            }                                                          //
          },                                                           //
          screenHeight: function () {                                  // 513
            module.debug('Removing page height');                      // 514
            $body.css('height', '');                                   // 515
          },                                                           //
          keyboardShortcuts: function () {                             // 519
            module.verbose('Removing keyboard shortcuts');             // 520
            $document.off('keyup' + eventNamespace);                   // 521
          },                                                           //
          scrolling: function () {                                     // 525
            $dimmable.removeClass(className.scrolling);                // 526
            $module.removeClass(className.scrolling);                  // 527
          }                                                            //
        },                                                             //
                                                                       //
        cacheSizes: function () {                                      // 531
          var modalHeight = $module.outerHeight();                     // 532
          if (module.cache === undefined || modalHeight !== 0) {       // 535
            module.cache = {                                           // 536
              pageHeight: $(document).outerHeight(),                   // 537
              height: modalHeight + settings.offset,                   // 538
              contextHeight: settings.context == 'body' ? $(window).height() : $dimmable.height()
            };                                                         //
          }                                                            //
          module.debug('Caching modal and container sizes', module.cache);
        },                                                             //
                                                                       //
        can: {                                                         // 547
          fit: function () {                                           // 548
            return module.cache.height + settings.padding * 2 < module.cache.contextHeight;
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 553
          active: function () {                                        // 554
            return $module.hasClass(className.active);                 // 555
          },                                                           //
          animating: function () {                                     // 557
            return $module.transition('is supported') ? $module.transition('is animating') : $module.is(':visible');
          },                                                           //
          scrolling: function () {                                     // 563
            return $dimmable.hasClass(className.scrolling);            // 564
          },                                                           //
          modernBrowser: function () {                                 // 566
            // appName for IE11 reports 'Netscape' can no longer use   //
            return !(window.ActiveXObject || "ActiveXObject" in window);
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 572
          autofocus: function () {                                     // 573
            var $inputs = $module.find(':input').filter(':visible'),   // 574
                $autofocus = $inputs.filter('[autofocus]'),            //
                $input = $autofocus.length > 0 ? $autofocus.first() : $inputs.first();
            if ($input.length > 0) {                                   // 581
              $input.focus();                                          // 582
            }                                                          //
          },                                                           //
          clickaway: function () {                                     // 585
            if (settings.closable) {                                   // 586
              $dimmer.on('click' + elementNamespace, module.event.click);
            }                                                          //
          },                                                           //
          screenHeight: function () {                                  // 592
            if (module.can.fit()) {                                    // 593
              $body.css('height', '');                                 // 594
            } else {                                                   //
              module.debug('Modal is taller than page content, resizing page height');
              $body.css('height', module.cache.height + settings.padding * 2);
            }                                                          //
          },                                                           //
          active: function () {                                        // 603
            $module.addClass(className.active);                        // 604
          },                                                           //
          scrolling: function () {                                     // 606
            $dimmable.addClass(className.scrolling);                   // 607
            $module.addClass(className.scrolling);                     // 608
          },                                                           //
          type: function () {                                          // 610
            if (module.can.fit()) {                                    // 611
              module.verbose('Modal fits on screen');                  // 612
              if (!module.others.active() && !module.others.animating()) {
                module.remove.scrolling();                             // 614
              }                                                        //
            } else {                                                   //
              module.verbose('Modal cannot fit on screen setting to scrolling');
              module.set.scrolling();                                  // 619
            }                                                          //
          },                                                           //
          position: function () {                                      // 622
            module.verbose('Centering modal on page', module.cache);   // 623
            if (module.can.fit()) {                                    // 624
              $module.css({                                            // 625
                top: '',                                               // 627
                marginTop: -(module.cache.height / 2)                  // 628
              });                                                      //
            } else {                                                   //
              $module.css({                                            // 633
                marginTop: '',                                         // 635
                top: $document.scrollTop()                             // 636
              });                                                      //
            }                                                          //
          },                                                           //
          undetached: function () {                                    // 641
            $dimmable.addClass(className.undetached);                  // 642
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 646
          module.debug('Changing setting', name, value);               // 647
          if ($.isPlainObject(name)) {                                 // 648
            $.extend(true, settings, name);                            // 649
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 652
          } else {                                                     //
            return settings[name];                                     // 655
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 658
          if ($.isPlainObject(name)) {                                 // 659
            $.extend(true, module, name);                              // 660
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 663
          } else {                                                     //
            return module[name];                                       // 666
          }                                                            //
        },                                                             //
        debug: function () {                                           // 669
          if (settings.debug) {                                        // 670
            if (settings.performance) {                                // 671
              module.performance.log(arguments);                       // 672
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 676
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 680
          if (settings.verbose && settings.debug) {                    // 681
            if (settings.performance) {                                // 682
              module.performance.log(arguments);                       // 683
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 687
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 691
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 693
        },                                                             //
        performance: {                                                 // 695
          log: function (message) {                                    // 696
            var currentTime, executionTime, previousTime;              // 697
            if (settings.performance) {                                // 702
              currentTime = new Date().getTime();                      // 703
              previousTime = time || currentTime;                      // 704
              executionTime = currentTime - previousTime;              // 705
              time = currentTime;                                      // 706
              performance.push({                                       // 707
                'Name': message[0],                                    // 708
                'Arguments': [].slice.call(message, 1) || '',          // 709
                'Element': element,                                    // 710
                'Execution Time': executionTime                        // 711
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 714
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 717
            var title = settings.name + ':',                           // 718
                totalTime = 0;                                         //
            time = false;                                              // 722
            clearTimeout(module.performance.timer);                    // 723
            $.each(performance, function (index, data) {               // 724
              totalTime += data['Execution Time'];                     // 725
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 727
            if (moduleSelector) {                                      // 728
              title += ' \'' + moduleSelector + '\'';                  // 729
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 732
              if (console.table) {                                     // 733
                console.table(performance);                            // 734
              } else {                                                 //
                $.each(performance, function (index, data) {           // 737
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 741
            }                                                          //
            performance = [];                                          // 743
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 746
          var object = instance,                                       // 747
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 753
          context = element || context;                                // 754
          if (typeof query == 'string' && object !== undefined) {      // 755
            query = query.split(/[\. ]/);                              // 756
            maxDepth = query.length - 1;                               // 757
            $.each(query, function (depth, value) {                    // 758
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 764
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 767
                return false;                                          // 768
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 771
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 774
                return false;                                          // 775
              } else {                                                 //
                return false;                                          // 778
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 782
            response = found.apply(context, passedArguments);          // 783
          } else if (found !== undefined) {                            //
            response = found;                                          // 786
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 788
            returnedValue.push(response);                              // 789
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 792
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 795
          }                                                            //
          return found;                                                // 797
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 801
        if (instance === undefined) {                                  // 802
          module.initialize();                                         // 803
        }                                                              //
        module.invoke(query);                                          // 805
      } else {                                                         //
        if (instance !== undefined) {                                  // 808
          instance.invoke('destroy');                                  // 809
        }                                                              //
        module.initialize();                                           // 811
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 816
  };                                                                   //
                                                                       //
  $.fn.modal.settings = {                                              // 822
                                                                       //
    name: 'Modal',                                                     // 824
    namespace: 'modal',                                                // 825
                                                                       //
    debug: false,                                                      // 827
    verbose: false,                                                    // 828
    performance: true,                                                 // 829
                                                                       //
    observeChanges: false,                                             // 831
                                                                       //
    allowMultiple: false,                                              // 833
    detachable: true,                                                  // 834
    closable: true,                                                    // 835
    autofocus: true,                                                   // 836
                                                                       //
    inverted: false,                                                   // 838
    blurring: false,                                                   // 839
                                                                       //
    dimmerSettings: {                                                  // 841
      closable: false,                                                 // 842
      useCSS: true                                                     // 843
    },                                                                 //
                                                                       //
    context: 'body',                                                   // 847
                                                                       //
    queue: false,                                                      // 849
    duration: 500,                                                     // 850
    offset: 0,                                                         // 851
    transition: 'scale',                                               // 852
                                                                       //
    // padding with edge of page                                       //
    padding: 50,                                                       // 855
                                                                       //
    // called before show animation                                    //
    onShow: function () {},                                            // 858
                                                                       //
    // called after show animation                                     //
    onVisible: function () {},                                         // 861
                                                                       //
    // called before hide animation                                    //
    onHide: function () {                                              // 864
      return true;                                                     // 864
    },                                                                 //
                                                                       //
    // called after hide animation                                     //
    onHidden: function () {},                                          // 867
                                                                       //
    // called after approve selector match                             //
    onApprove: function () {                                           // 870
      return true;                                                     // 870
    },                                                                 //
                                                                       //
    // called after deny selector match                                //
    onDeny: function () {                                              // 873
      return true;                                                     // 873
    },                                                                 //
                                                                       //
    selector: {                                                        // 875
      close: '> .close',                                               // 876
      approve: '.actions .positive, .actions .approve, .actions .ok',  // 877
      deny: '.actions .negative, .actions .deny, .actions .cancel',    // 878
      modal: '.ui.modal'                                               // 879
    },                                                                 //
    error: {                                                           // 881
      dimmer: 'UI Dimmer, a required component is not included in this page',
      method: 'The method you called is not defined.',                 // 883
      notFound: 'The element you specified could not be found'         // 884
    },                                                                 //
    className: {                                                       // 886
      active: 'active',                                                // 887
      animating: 'animating',                                          // 888
      blurring: 'blurring',                                            // 889
      scrolling: 'scrolling',                                          // 890
      undetached: 'undetached'                                         // 891
    }                                                                  //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
