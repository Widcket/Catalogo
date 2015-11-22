(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/modules/popup.js                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Popup                                               //
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
  $.fn.popup = function (parameters) {                                 // 20
    var $allModules = $(this),                                         // 21
        $document = $(document),                                       //
        $window = $(window),                                           //
        $body = $('body'),                                             //
        moduleSelector = $allModules.selector || '',                   //
        hasTouch = true,                                               //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 39
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.popup.settings, parameters) : $.extend({}, $.fn.popup.settings),
          selector = settings.selector,                                //
          className = settings.className,                              //
          error = settings.error,                                      //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          eventNamespace = '.' + settings.namespace,                   //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $target = settings.target ? $(settings.target) : $module,    //
          $popup,                                                      //
          $offsetParent,                                               //
          searchDepth = 0,                                             //
          triedPositions = false,                                      //
          openedWithTouch = false,                                     //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          elementNamespace,                                            //
          id,                                                          //
          module;                                                      //
                                                                       //
      module = {                                                       // 76
                                                                       //
        // binds events                                                //
        initialize: function () {                                      // 79
          module.debug('Initializing', $module);                       // 80
          module.createID();                                           // 81
          module.bind.events();                                        // 82
          if (!module.exists() && settings.preserve) {                 // 83
            module.create();                                           // 84
          }                                                            //
          module.instantiate();                                        // 86
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 89
          module.verbose('Storing instance', module);                  // 90
          instance = module;                                           // 91
          $module.data(moduleNamespace, instance);                     // 92
        },                                                             //
                                                                       //
        refresh: function () {                                         // 97
          if (settings.popup) {                                        // 98
            $popup = $(settings.popup).eq(0);                          // 99
          } else {                                                     //
            if (settings.inline) {                                     // 102
              $popup = $target.nextAll(selector.popup).eq(0);          // 103
              settings.popup = $popup;                                 // 104
            }                                                          //
          }                                                            //
          if (settings.popup) {                                        // 107
            $popup.addClass(className.loading);                        // 108
            $offsetParent = module.get.offsetParent();                 // 109
            $popup.removeClass(className.loading);                     // 110
            if (settings.movePopup && module.has.popup() && module.get.offsetParent($popup)[0] !== $offsetParent[0]) {
              module.debug('Moving popup to the same offset parent as activating element');
              $popup.detach().appendTo($offsetParent);                 // 113
            }                                                          //
          } else {                                                     //
            $offsetParent = settings.inline ? module.get.offsetParent($target) : module.has.popup() ? module.get.offsetParent($popup) : $body;
          }                                                            //
          if ($offsetParent.is('html') && $offsetParent[0] !== $body[0]) {
            module.debug('Setting page as offset parent');             // 128
            $offsetParent = $body;                                     // 129
          }                                                            //
          if (module.get.variation()) {                                // 131
            module.set.variation();                                    // 132
          }                                                            //
        },                                                             //
                                                                       //
        reposition: function () {                                      // 136
          module.refresh();                                            // 137
          module.set.position();                                       // 138
        },                                                             //
                                                                       //
        destroy: function () {                                         // 141
          module.debug('Destroying previous module');                  // 142
          // remove element only if was created dynamically            //
          if ($popup && !settings.preserve) {                          // 144
            module.removePopup();                                      // 145
          }                                                            //
          // clear all timeouts                                        //
          clearTimeout(module.hideTimer);                              // 148
          clearTimeout(module.showTimer);                              // 149
          // remove events                                             //
          $window.off(elementNamespace);                               // 151
          $module.off(eventNamespace).removeData(moduleNamespace);     // 152
        },                                                             //
                                                                       //
        event: {                                                       // 158
          start: function (event) {                                    // 159
            var delay = $.isPlainObject(settings.delay) ? settings.delay.show : settings.delay;
            clearTimeout(module.hideTimer);                            // 165
            if (!openedWithTouch) {                                    // 166
              module.showTimer = setTimeout(module.show, delay);       // 167
            }                                                          //
          },                                                           //
          end: function () {                                           // 170
            var delay = $.isPlainObject(settings.delay) ? settings.delay.hide : settings.delay;
            clearTimeout(module.showTimer);                            // 176
            module.hideTimer = setTimeout(module.hide, delay);         // 177
          },                                                           //
          touchstart: function (event) {                               // 179
            openedWithTouch = true;                                    // 180
            module.show();                                             // 181
          },                                                           //
          resize: function () {                                        // 183
            if (module.is.visible()) {                                 // 184
              module.set.position();                                   // 185
            }                                                          //
          },                                                           //
          hideGracefully: function (event) {                           // 188
            // don't close on clicks inside popup                      //
            if (event && $(event.target).closest(selector.popup).length === 0) {
              module.debug('Click occurred outside popup hiding popup');
              module.hide();                                           // 192
            } else {                                                   //
              module.debug('Click was inside popup, keeping popup open');
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        // generates popup html from metadata                          //
        create: function () {                                          // 201
          var html = module.get.html(),                                // 202
              title = module.get.title(),                              //
              content = module.get.content();                          //
                                                                       //
          if (html || content || title) {                              // 208
            module.debug('Creating pop-up html');                      // 209
            if (!html) {                                               // 210
              html = settings.templates.popup({                        // 211
                title: title,                                          // 212
                content: content                                       // 213
              });                                                      //
            }                                                          //
            $popup = $('<div/>').addClass(className.popup).data(metadata.activator, $module).html(html);
            if (settings.inline) {                                     // 221
              module.verbose('Inserting popup element inline', $popup);
              $popup.insertAfter($module);                             // 223
            } else {                                                   //
              module.verbose('Appending popup element to body', $popup);
              $popup.appendTo($context);                               // 229
            }                                                          //
            module.refresh();                                          // 233
            module.set.variation();                                    // 234
                                                                       //
            if (settings.hoverable) {                                  // 236
              module.bind.popup();                                     // 237
            }                                                          //
            settings.onCreate.call($popup, element);                   // 239
          } else if ($target.next(selector.popup).length !== 0) {      //
            module.verbose('Pre-existing popup found');                // 242
            settings.inline = true;                                    // 243
            settings.popups = $target.next(selector.popup).data(metadata.activator, $module);
            module.refresh();                                          // 245
            if (settings.hoverable) {                                  // 246
              module.bind.popup();                                     // 247
            }                                                          //
          } else if (settings.popup) {                                 //
            $(settings.popup).data(metadata.activator, $module);       // 251
            module.verbose('Used popup specified in settings');        // 252
            module.refresh();                                          // 253
            if (settings.hoverable) {                                  // 254
              module.bind.popup();                                     // 255
            }                                                          //
          } else {                                                     //
            module.debug('No content specified skipping display', element);
          }                                                            //
        },                                                             //
                                                                       //
        createID: function () {                                        // 263
          id = (Math.random().toString(16) + '000000000').substr(2, 8);
          elementNamespace = '.' + id;                                 // 265
          module.verbose('Creating unique id for element', id);        // 266
        },                                                             //
                                                                       //
        // determines popup state                                      //
        toggle: function () {                                          // 270
          module.debug('Toggling pop-up');                             // 271
          if (module.is.hidden()) {                                    // 272
            module.debug('Popup is hidden, showing pop-up');           // 273
            module.unbind.close();                                     // 274
            module.show();                                             // 275
          } else {                                                     //
            module.debug('Popup is visible, hiding pop-up');           // 278
            module.hide();                                             // 279
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 283
          callback = callback || function () {};                       // 284
          module.debug('Showing pop-up', settings.transition);         // 285
          if (module.is.hidden() && !(module.is.active() && module.is.dropdown())) {
            if (!module.exists()) {                                    // 287
              module.create();                                         // 288
            }                                                          //
            if (settings.onShow.call($popup, element) === false) {     // 290
              module.debug('onShow callback returned false, cancelling popup animation');
              return;                                                  // 292
            } else if (!settings.preserve && !settings.popup) {        //
              module.refresh();                                        // 295
            }                                                          //
            if ($popup && module.set.position()) {                     // 297
              module.save.conditions();                                // 298
              if (settings.exclusive) {                                // 299
                module.hideAll();                                      // 300
              }                                                        //
              module.animate.show(callback);                           // 302
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 308
          callback = callback || function () {};                       // 309
          if (module.is.visible() || module.is.animating()) {          // 310
            if (settings.onHide.call($popup, element) === false) {     // 311
              module.debug('onHide callback returned false, cancelling popup animation');
              return;                                                  // 313
            }                                                          //
            module.remove.visible();                                   // 315
            module.unbind.close();                                     // 316
            module.restore.conditions();                               // 317
            module.animate.hide(callback);                             // 318
          }                                                            //
        },                                                             //
                                                                       //
        hideAll: function () {                                         // 322
          $(selector.popup).filter('.' + className.visible).each(function () {
            $(this).data(metadata.activator).popup('hide');            // 326
          });                                                          //
        },                                                             //
        exists: function () {                                          // 333
          if (!$popup) {                                               // 334
            return false;                                              // 335
          }                                                            //
          if (settings.inline || settings.popup) {                     // 337
            return module.has.popup();                                 // 338
          } else {                                                     //
            return $popup.closest($context).length >= 1 ? true : false;
          }                                                            //
        },                                                             //
                                                                       //
        removePopup: function () {                                     // 348
          if (module.has.popup() && !settings.popup) {                 // 349
            module.debug('Removing popup', $popup);                    // 350
            $popup.remove();                                           // 351
            $popup = undefined;                                        // 352
            settings.onRemove.call($popup, element);                   // 353
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 357
          conditions: function () {                                    // 358
            module.cache = {                                           // 359
              title: $module.attr('title')                             // 360
            };                                                         //
            if (module.cache.title) {                                  // 362
              $module.removeAttr('title');                             // 363
            }                                                          //
            module.verbose('Saving original attributes', module.cache.title);
          }                                                            //
        },                                                             //
        restore: {                                                     // 368
          conditions: function () {                                    // 369
            if (module.cache && module.cache.title) {                  // 370
              $module.attr('title', module.cache.title);               // 371
              module.verbose('Restoring original attributes', module.cache.title);
            }                                                          //
            return true;                                               // 374
          }                                                            //
        },                                                             //
        animate: {                                                     // 377
          show: function (callback) {                                  // 378
            callback = $.isFunction(callback) ? callback : function () {};
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.set.visible();                                    // 381
              $popup.transition({                                      // 382
                animation: settings.transition + ' in',                // 384
                queue: false,                                          // 385
                debug: settings.debug,                                 // 386
                verbose: settings.verbose,                             // 387
                duration: settings.duration,                           // 388
                onComplete: function () {                              // 389
                  module.bind.close();                                 // 390
                  callback.call($popup, element);                      // 391
                  settings.onVisible.call($popup, element);            // 392
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.error(error.noTransition);                        // 398
            }                                                          //
          },                                                           //
          hide: function (callback) {                                  // 401
            callback = $.isFunction(callback) ? callback : function () {};
            module.debug('Hiding pop-up');                             // 403
            if (settings.onHide.call($popup, element) === false) {     // 404
              module.debug('onHide callback returned false, cancelling popup animation');
              return;                                                  // 406
            }                                                          //
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $popup.transition({                                      // 409
                animation: settings.transition + ' out',               // 411
                queue: false,                                          // 412
                duration: settings.duration,                           // 413
                debug: settings.debug,                                 // 414
                verbose: settings.verbose,                             // 415
                onComplete: function () {                              // 416
                  module.reset();                                      // 417
                  callback.call($popup, element);                      // 418
                  settings.onHidden.call($popup, element);             // 419
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.error(error.noTransition);                        // 425
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        change: {                                                      // 430
          content: function (html) {                                   // 431
            $popup.html(html);                                         // 432
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 436
          html: function () {                                          // 437
            $module.removeData(metadata.html);                         // 438
            return $module.data(metadata.html) || settings.html;       // 439
          },                                                           //
          title: function () {                                         // 441
            $module.removeData(metadata.title);                        // 442
            return $module.data(metadata.title) || settings.title;     // 443
          },                                                           //
          content: function () {                                       // 445
            $module.removeData(metadata.content);                      // 446
            return $module.data(metadata.content) || $module.attr('title') || settings.content;
          },                                                           //
          variation: function () {                                     // 449
            $module.removeData(metadata.variation);                    // 450
            return $module.data(metadata.variation) || settings.variation;
          },                                                           //
          popup: function () {                                         // 453
            return $popup;                                             // 454
          },                                                           //
          popupOffset: function () {                                   // 456
            return $popup.offset();                                    // 457
          },                                                           //
          calculations: function () {                                  // 459
            var targetElement = $target[0],                            // 460
                targetPosition = settings.inline || settings.popup && settings.movePopup ? $target.position() : $target.offset(),
                calculations = {},                                     //
                screen;                                                //
            calculations = {                                           // 468
              // element which is launching popup                      //
              target: {                                                // 470
                element: $target[0],                                   // 471
                width: $target.outerWidth(),                           // 472
                height: $target.outerHeight(),                         // 473
                top: targetPosition.top,                               // 474
                left: targetPosition.left,                             // 475
                margin: {}                                             // 476
              },                                                       //
              // popup itself                                          //
              popup: {                                                 // 479
                width: $popup.outerWidth(),                            // 480
                height: $popup.outerHeight()                           // 481
              },                                                       //
              // offset container (or 3d context)                      //
              parent: {                                                // 484
                width: $offsetParent.outerWidth(),                     // 485
                height: $offsetParent.outerHeight()                    // 486
              },                                                       //
              // screen boundaries                                     //
              screen: {                                                // 489
                scroll: {                                              // 490
                  top: $window.scrollTop(),                            // 491
                  left: $window.scrollLeft()                           // 492
                },                                                     //
                width: $window.width(),                                // 494
                height: $window.height()                               // 495
              }                                                        //
            };                                                         //
                                                                       //
            // add in container calcs if fluid                         //
            if (settings.setFluidWidth && module.is.fluid()) {         // 500
              calculations.container = {                               // 501
                width: $popup.parent().outerWidth()                    // 502
              };                                                       //
              calculations.popup.width = calculations.container.width;
            }                                                          //
                                                                       //
            // add in margins if inline                                //
            calculations.target.margin.top = settings.inline ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-top'), 10) : 0;
            calculations.target.margin.left = settings.inline ? module.is.rtl() ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-right'), 10) : parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-left'), 10) : 0;
            // calculate screen boundaries                             //
            screen = calculations.screen;                              // 519
            calculations.boundary = {                                  // 520
              top: screen.scroll.top,                                  // 521
              bottom: screen.scroll.top + screen.height,               // 522
              left: screen.scroll.left,                                // 523
              right: screen.scroll.left + screen.width                 // 524
            };                                                         //
            return calculations;                                       // 526
          },                                                           //
          id: function () {                                            // 528
            return id;                                                 // 529
          },                                                           //
          startEvent: function () {                                    // 531
            if (settings.on == 'hover') {                              // 532
              return 'mouseenter';                                     // 533
            } else if (settings.on == 'focus') {                       //
              return 'focus';                                          // 536
            }                                                          //
            return false;                                              // 538
          },                                                           //
          scrollEvent: function () {                                   // 540
            return 'scroll';                                           // 541
          },                                                           //
          endEvent: function () {                                      // 543
            if (settings.on == 'hover') {                              // 544
              return 'mouseleave';                                     // 545
            } else if (settings.on == 'focus') {                       //
              return 'blur';                                           // 548
            }                                                          //
            return false;                                              // 550
          },                                                           //
          distanceFromBoundary: function (offset, calculations) {      // 552
            var distanceFromBoundary = {},                             // 553
                popup,                                                 //
                boundary;                                              //
            offset = offset || module.get.offset();                    // 558
            calculations = calculations || module.get.calculations();  // 559
                                                                       //
            // shorthand                                               //
            popup = calculations.popup;                                // 562
            boundary = calculations.boundary;                          // 563
                                                                       //
            if (offset) {                                              // 565
              distanceFromBoundary = {                                 // 566
                top: offset.top - boundary.top,                        // 567
                left: offset.left - boundary.left,                     // 568
                right: boundary.right - (offset.left + popup.width),   // 569
                bottom: boundary.bottom - (offset.top + popup.height)  // 570
              };                                                       //
              module.verbose('Distance from boundaries determined', offset, distanceFromBoundary);
            }                                                          //
            return distanceFromBoundary;                               // 574
          },                                                           //
          offsetParent: function ($target) {                           // 576
            var element = $target !== undefined ? $target[0] : $module[0],
                parentNode = element.parentNode,                       //
                $node = $(parentNode);                                 //
            if (parentNode) {                                          // 584
              var is2D = $node.css('transform') === 'none',            // 585
                  isStatic = $node.css('position') === 'static',       //
                  isHTML = $node.is('html');                           //
              while (parentNode && !isHTML && isStatic && is2D) {      // 590
                parentNode = parentNode.parentNode;                    // 591
                $node = $(parentNode);                                 // 592
                is2D = $node.css('transform') === 'none';              // 593
                isStatic = $node.css('position') === 'static';         // 594
                isHTML = $node.is('html');                             // 595
              }                                                        //
            }                                                          //
            return $node && $node.length > 0 ? $node : $();            // 598
          },                                                           //
          positions: function () {                                     // 603
            return {                                                   // 604
              'top left': false,                                       // 605
              'top center': false,                                     // 606
              'top right': false,                                      // 607
              'bottom left': false,                                    // 608
              'bottom center': false,                                  // 609
              'bottom right': false,                                   // 610
              'left center': false,                                    // 611
              'right center': false                                    // 612
            };                                                         //
          },                                                           //
          nextPosition: function (position) {                          // 615
            var positions = position.split(' '),                       // 616
                verticalPosition = positions[0],                       //
                horizontalPosition = positions[1],                     //
                opposite = {                                           //
              top: 'bottom',                                           // 621
              bottom: 'top',                                           // 622
              left: 'right',                                           // 623
              right: 'left'                                            // 624
            },                                                         //
                adjacent = {                                           //
              left: 'center',                                          // 627
              center: 'right',                                         // 628
              right: 'left'                                            // 629
            },                                                         //
                backup = {                                             //
              'top left': 'top center',                                // 632
              'top center': 'top right',                               // 633
              'top right': 'right center',                             // 634
              'right center': 'bottom right',                          // 635
              'bottom right': 'bottom center',                         // 636
              'bottom center': 'bottom left',                          // 637
              'bottom left': 'left center',                            // 638
              'left center': 'top left'                                // 639
            },                                                         //
                adjacentsAvailable = verticalPosition == 'top' || verticalPosition == 'bottom',
                oppositeTried = false,                                 //
                adjacentTried = false,                                 //
                nextPosition = false;                                  //
            if (!triedPositions) {                                     // 646
              module.verbose('All available positions available');     // 647
              triedPositions = module.get.positions();                 // 648
            }                                                          //
                                                                       //
            module.debug('Recording last position tried', position);   // 651
            triedPositions[position] = true;                           // 652
                                                                       //
            if (settings.prefer === 'opposite') {                      // 654
              nextPosition = [opposite[verticalPosition], horizontalPosition];
              nextPosition = nextPosition.join(' ');                   // 656
              oppositeTried = triedPositions[nextPosition] === true;   // 657
              module.debug('Trying opposite strategy', nextPosition);  // 658
            }                                                          //
            if (settings.prefer === 'adjacent' && adjacentsAvailable) {
              nextPosition = [verticalPosition, adjacent[horizontalPosition]];
              nextPosition = nextPosition.join(' ');                   // 662
              adjacentTried = triedPositions[nextPosition] === true;   // 663
              module.debug('Trying adjacent strategy', nextPosition);  // 664
            }                                                          //
            if (adjacentTried || oppositeTried) {                      // 666
              module.debug('Using backup position', nextPosition);     // 667
              nextPosition = backup[position];                         // 668
            }                                                          //
            return nextPosition;                                       // 670
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 674
          position: function (position, calculations) {                // 675
                                                                       //
            // exit conditions                                         //
            if ($target.length === 0 || $popup.length === 0) {         // 678
              module.error(error.notFound);                            // 679
              return;                                                  // 680
            }                                                          //
            var offset, distanceAway, target, popup, parent, positioning, popupOffset, distanceFromBoundary;
                                                                       //
            calculations = calculations || module.get.calculations();  // 693
            position = position || $module.data(metadata.position) || settings.position;
                                                                       //
            offset = $module.data(metadata.offset) || settings.offset;
            distanceAway = settings.distanceAway;                      // 697
                                                                       //
            // shorthand                                               //
            target = calculations.target;                              // 700
            popup = calculations.popup;                                // 701
            parent = calculations.parent;                              // 702
                                                                       //
            if (target.width === 0 && target.height === 0 && !(target.element instanceof SVGGraphicsElement)) {
              module.debug('Popup target is hidden, no action taken');
              return false;                                            // 706
            }                                                          //
                                                                       //
            if (settings.inline) {                                     // 709
              module.debug('Adding margin to calculation', target.margin);
              if (position == 'left center' || position == 'right center') {
                offset += target.margin.top;                           // 712
                distanceAway += -target.margin.left;                   // 713
              } else if (position == 'top left' || position == 'top center' || position == 'top right') {
                offset += target.margin.left;                          // 716
                distanceAway -= target.margin.top;                     // 717
              } else {                                                 //
                offset += target.margin.left;                          // 720
                distanceAway += target.margin.top;                     // 721
              }                                                        //
            }                                                          //
                                                                       //
            module.debug('Determining popup position from calculations', position, calculations);
                                                                       //
            if (module.is.rtl()) {                                     // 727
              position = position.replace(/left|right/g, function (match) {
                return match == 'left' ? 'right' : 'left';             // 729
              });                                                      //
              module.debug('RTL: Popup position updated', position);   // 734
            }                                                          //
                                                                       //
            // if last attempt use specified last resort position      //
            if (searchDepth == settings.maxSearchDepth && typeof settings.lastResort === 'string') {
              position = settings.lastResort;                          // 739
            }                                                          //
                                                                       //
            switch (position) {                                        // 742
              case 'top left':                                         // 743
                positioning = {                                        // 744
                  top: 'auto',                                         // 745
                  bottom: parent.height - target.top + distanceAway,   // 746
                  left: target.left + offset,                          // 747
                  right: 'auto'                                        // 748
                };                                                     //
                break;                                                 // 750
              case 'top center':                                       // 751
                positioning = {                                        // 752
                  bottom: parent.height - target.top + distanceAway,   // 753
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  top: 'auto',                                         // 755
                  right: 'auto'                                        // 756
                };                                                     //
                break;                                                 // 758
              case 'top right':                                        // 758
                positioning = {                                        // 760
                  bottom: parent.height - target.top + distanceAway,   // 761
                  right: parent.width - target.left - target.width - offset,
                  top: 'auto',                                         // 763
                  left: 'auto'                                         // 764
                };                                                     //
                break;                                                 // 766
              case 'left center':                                      // 767
                positioning = {                                        // 768
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  right: parent.width - target.left + distanceAway,    // 770
                  left: 'auto',                                        // 771
                  bottom: 'auto'                                       // 772
                };                                                     //
                break;                                                 // 774
              case 'right center':                                     // 774
                positioning = {                                        // 776
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  left: target.left + target.width + distanceAway,     // 778
                  bottom: 'auto',                                      // 779
                  right: 'auto'                                        // 780
                };                                                     //
                break;                                                 // 782
              case 'bottom left':                                      // 782
                positioning = {                                        // 784
                  top: target.top + target.height + distanceAway,      // 785
                  left: target.left + offset,                          // 786
                  bottom: 'auto',                                      // 787
                  right: 'auto'                                        // 788
                };                                                     //
                break;                                                 // 790
              case 'bottom center':                                    // 790
                positioning = {                                        // 792
                  top: target.top + target.height + distanceAway,      // 793
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  bottom: 'auto',                                      // 795
                  right: 'auto'                                        // 796
                };                                                     //
                break;                                                 // 798
              case 'bottom right':                                     // 798
                positioning = {                                        // 800
                  top: target.top + target.height + distanceAway,      // 801
                  right: parent.width - target.left - target.width - offset,
                  left: 'auto',                                        // 803
                  bottom: 'auto'                                       // 804
                };                                                     //
                break;                                                 // 806
            }                                                          // 806
            if (positioning === undefined) {                           // 808
              module.error(error.invalidPosition, position);           // 809
            }                                                          //
                                                                       //
            module.debug('Calculated popup positioning values', positioning);
                                                                       //
            // tentatively place on stage                              //
            $popup.css(positioning).removeClass(className.position).addClass(position).addClass(className.loading);
                                                                       //
            popupOffset = module.get.popupOffset();                    // 822
                                                                       //
            // see if any boundaries are surpassed with this tentative position
            distanceFromBoundary = module.get.distanceFromBoundary(popupOffset, calculations);
                                                                       //
            if (module.is.offstage(distanceFromBoundary, position)) {  // 827
              module.debug('Position is outside viewport', position);  // 828
              if (searchDepth < settings.maxSearchDepth) {             // 829
                searchDepth++;                                         // 830
                position = module.get.nextPosition(position);          // 831
                module.debug('Trying new position', position);         // 832
                return $popup ? module.set.position(position, calculations) : false;
              } else {                                                 //
                if (settings.lastResort) {                             // 839
                  module.debug('No position found, showing with last position');
                } else {                                               //
                  module.debug('Popup could not find a position to display', $popup);
                  module.error(error.cannotPlace, element);            // 844
                  module.remove.attempts();                            // 845
                  module.remove.loading();                             // 846
                  module.reset();                                      // 847
                  return false;                                        // 848
                }                                                      //
              }                                                        //
            }                                                          //
            module.debug('Position is on stage', position);            // 852
            module.remove.attempts();                                  // 853
            module.remove.loading();                                   // 854
            if (settings.setFluidWidth && module.is.fluid()) {         // 855
              module.set.fluidWidth(calculations);                     // 856
            }                                                          //
            return true;                                               // 858
          },                                                           //
                                                                       //
          fluidWidth: function (calculations) {                        // 861
            calculations = calculations || module.get.calculations();  // 862
            module.debug('Automatically setting element width to parent width', calculations.parent.width);
            $popup.css('width', calculations.container.width);         // 864
          },                                                           //
                                                                       //
          variation: function (variation) {                            // 867
            variation = variation || module.get.variation();           // 868
            if (variation && module.has.popup()) {                     // 869
              module.verbose('Adding variation to popup', variation);  // 870
              $popup.addClass(variation);                              // 871
            }                                                          //
          },                                                           //
                                                                       //
          visible: function () {                                       // 875
            $module.addClass(className.visible);                       // 876
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 880
          loading: function () {                                       // 881
            $popup.removeClass(className.loading);                     // 882
          },                                                           //
          variation: function (variation) {                            // 884
            variation = variation || module.get.variation();           // 885
            if (variation) {                                           // 886
              module.verbose('Removing variation', variation);         // 887
              $popup.removeClass(variation);                           // 888
            }                                                          //
          },                                                           //
          visible: function () {                                       // 891
            $module.removeClass(className.visible);                    // 892
          },                                                           //
          attempts: function () {                                      // 894
            module.verbose('Resetting all searched positions');        // 895
            searchDepth = 0;                                           // 896
            triedPositions = false;                                    // 897
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 901
          events: function () {                                        // 902
            module.debug('Binding popup events to module');            // 903
            if (settings.on == 'click') {                              // 904
              $module.on('click' + eventNamespace, module.toggle);     // 905
            }                                                          //
            if (settings.on == 'hover' && hasTouch) {                  // 909
              $module.on('touchstart' + eventNamespace, module.event.touchstart);
            }                                                          //
            if (module.get.startEvent()) {                             // 914
              $module.on(module.get.startEvent() + eventNamespace, module.event.start).on(module.get.endEvent() + eventNamespace, module.event.end);
            }                                                          //
            if (settings.target) {                                     // 920
              module.debug('Target set to element', $target);          // 921
            }                                                          //
            $window.on('resize' + elementNamespace, module.event.resize);
          },                                                           //
          popup: function () {                                         // 925
            module.verbose('Allowing hover events on popup to prevent closing');
            if ($popup && module.has.popup()) {                        // 927
              $popup.on('mouseenter' + eventNamespace, module.event.start).on('mouseleave' + eventNamespace, module.event.end);
            }                                                          //
          },                                                           //
          close: function () {                                         // 934
            if (settings.hideOnScroll === true || settings.hideOnScroll == 'auto' && settings.on != 'click') {
              $document.one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully);
              $context.one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully);
            }                                                          //
            if (settings.on == 'hover' && openedWithTouch) {           // 943
              module.verbose('Binding popup close event to document');
              $document.on('touchstart' + elementNamespace, function (event) {
                module.verbose('Touched away from popup');             // 947
                module.event.hideGracefully.call(element, event);      // 948
              });                                                      //
            }                                                          //
            if (settings.on == 'click' && settings.closable) {         // 952
              module.verbose('Binding popup close event to document');
              $document.on('click' + elementNamespace, function (event) {
                module.verbose('Clicked away from popup');             // 956
                module.event.hideGracefully.call(element, event);      // 957
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        unbind: {                                                      // 964
          close: function () {                                         // 965
            if (settings.hideOnScroll === true || settings.hideOnScroll == 'auto' && settings.on != 'click') {
              $document.off('scroll' + elementNamespace, module.hide);
              $context.off('scroll' + elementNamespace, module.hide);  // 970
            }                                                          //
            if (settings.on == 'hover' && openedWithTouch) {           // 974
              $document.off('touchstart' + elementNamespace);          // 975
              openedWithTouch = false;                                 // 978
            }                                                          //
            if (settings.on == 'click' && settings.closable) {         // 980
              module.verbose('Removing close event from document');    // 981
              $document.off('click' + elementNamespace);               // 982
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 989
          popup: function () {                                         // 990
            return $popup && $popup.length > 0;                        // 991
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 995
          offstage: function (distanceFromBoundary, position) {        // 996
            var offstage = [];                                         // 997
            // return boundaries that have been surpassed              //
            $.each(distanceFromBoundary, function (direction, distance) {
              if (distance < -settings.jitter) {                       // 1002
                module.debug('Position exceeds allowable distance from edge', direction, distance, position);
                offstage.push(direction);                              // 1004
              }                                                        //
            });                                                        //
            if (offstage.length > 0) {                                 // 1007
              return true;                                             // 1008
            } else {                                                   //
              return false;                                            // 1011
            }                                                          //
          },                                                           //
          active: function () {                                        // 1014
            return $module.hasClass(className.active);                 // 1015
          },                                                           //
          animating: function () {                                     // 1017
            return $popup && $popup.hasClass(className.animating);     // 1018
          },                                                           //
          fluid: function () {                                         // 1020
            return $popup && $popup.hasClass(className.fluid);         // 1021
          },                                                           //
          visible: function () {                                       // 1023
            return $popup && $popup.hasClass(className.visible);       // 1024
          },                                                           //
          dropdown: function () {                                      // 1026
            return $module.hasClass(className.dropdown);               // 1027
          },                                                           //
          hidden: function () {                                        // 1029
            return !module.is.visible();                               // 1030
          },                                                           //
          rtl: function () {                                           // 1032
            return $module.css('direction') == 'rtl';                  // 1033
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 1037
          module.remove.visible();                                     // 1038
          if (settings.preserve) {                                     // 1039
            if ($.fn.transition !== undefined) {                       // 1040
              $popup.transition('remove transition');                  // 1041
            }                                                          //
          } else {                                                     //
            module.removePopup();                                      // 1047
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 1051
          if ($.isPlainObject(name)) {                                 // 1052
            $.extend(true, settings, name);                            // 1053
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 1056
          } else {                                                     //
            return settings[name];                                     // 1059
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 1062
          if ($.isPlainObject(name)) {                                 // 1063
            $.extend(true, module, name);                              // 1064
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 1067
          } else {                                                     //
            return module[name];                                       // 1070
          }                                                            //
        },                                                             //
        debug: function () {                                           // 1073
          if (settings.debug) {                                        // 1074
            if (settings.performance) {                                // 1075
              module.performance.log(arguments);                       // 1076
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 1080
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 1084
          if (settings.verbose && settings.debug) {                    // 1085
            if (settings.performance) {                                // 1086
              module.performance.log(arguments);                       // 1087
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 1091
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 1095
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 1097
        },                                                             //
        performance: {                                                 // 1099
          log: function (message) {                                    // 1100
            var currentTime, executionTime, previousTime;              // 1101
            if (settings.performance) {                                // 1106
              currentTime = new Date().getTime();                      // 1107
              previousTime = time || currentTime;                      // 1108
              executionTime = currentTime - previousTime;              // 1109
              time = currentTime;                                      // 1110
              performance.push({                                       // 1111
                'Name': message[0],                                    // 1112
                'Arguments': [].slice.call(message, 1) || '',          // 1113
                'Element': element,                                    // 1114
                'Execution Time': executionTime                        // 1115
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 1118
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 1121
            var title = settings.name + ':',                           // 1122
                totalTime = 0;                                         //
            time = false;                                              // 1126
            clearTimeout(module.performance.timer);                    // 1127
            $.each(performance, function (index, data) {               // 1128
              totalTime += data['Execution Time'];                     // 1129
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 1131
            if (moduleSelector) {                                      // 1132
              title += ' \'' + moduleSelector + '\'';                  // 1133
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 1136
              if (console.table) {                                     // 1137
                console.table(performance);                            // 1138
              } else {                                                 //
                $.each(performance, function (index, data) {           // 1141
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 1145
            }                                                          //
            performance = [];                                          // 1147
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 1150
          var object = instance,                                       // 1151
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 1157
          context = element || context;                                // 1158
          if (typeof query == 'string' && object !== undefined) {      // 1159
            query = query.split(/[\. ]/);                              // 1160
            maxDepth = query.length - 1;                               // 1161
            $.each(query, function (depth, value) {                    // 1162
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 1168
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 1171
                return false;                                          // 1172
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 1175
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 1178
                return false;                                          // 1179
              } else {                                                 //
                return false;                                          // 1182
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 1186
            response = found.apply(context, passedArguments);          // 1187
          } else if (found !== undefined) {                            //
            response = found;                                          // 1190
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1192
            returnedValue.push(response);                              // 1193
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1196
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1199
          }                                                            //
          return found;                                                // 1201
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 1205
        if (instance === undefined) {                                  // 1206
          module.initialize();                                         // 1207
        }                                                              //
        module.invoke(query);                                          // 1209
      } else {                                                         //
        if (instance !== undefined) {                                  // 1212
          instance.invoke('destroy');                                  // 1213
        }                                                              //
        module.initialize();                                           // 1215
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1220
  };                                                                   //
                                                                       //
  $.fn.popup.settings = {                                              // 1226
                                                                       //
    name: 'Popup',                                                     // 1228
                                                                       //
    // module settings                                                 //
    debug: false,                                                      // 1231
    verbose: false,                                                    // 1232
    performance: true,                                                 // 1233
    namespace: 'popup',                                                // 1234
                                                                       //
    // callback only when element added to dom                         //
    onCreate: function () {},                                          // 1237
                                                                       //
    // callback before element removed from dom                        //
    onRemove: function () {},                                          // 1240
                                                                       //
    // callback before show animation                                  //
    onShow: function () {},                                            // 1243
                                                                       //
    // callback after show animation                                   //
    onVisible: function () {},                                         // 1246
                                                                       //
    // callback before hide animation                                  //
    onHide: function () {},                                            // 1249
                                                                       //
    // callback after hide animation                                   //
    onHidden: function () {},                                          // 1252
                                                                       //
    // when to show popup                                              //
    on: 'hover',                                                       // 1255
                                                                       //
    // whether to add touchstart events when using hover               //
    addTouchEvents: true,                                              // 1258
                                                                       //
    // default position relative to element                            //
    position: 'top left',                                              // 1261
                                                                       //
    // name of variation to use                                        //
    variation: '',                                                     // 1264
                                                                       //
    // whether popup should be moved to context                        //
    movePopup: true,                                                   // 1267
                                                                       //
    // element which popup should be relative to                       //
    target: false,                                                     // 1270
                                                                       //
    // jq selector or element that should be used as popup             //
    popup: false,                                                      // 1273
                                                                       //
    // popup should remain inline next to activator                    //
    inline: false,                                                     // 1276
                                                                       //
    // popup should be removed from page on hide                       //
    preserve: false,                                                   // 1279
                                                                       //
    // popup should not close when being hovered on                    //
    hoverable: false,                                                  // 1282
                                                                       //
    // explicitly set content                                          //
    content: false,                                                    // 1285
                                                                       //
    // explicitly set html                                             //
    html: false,                                                       // 1288
                                                                       //
    // explicitly set title                                            //
    title: false,                                                      // 1291
                                                                       //
    // whether automatically close on clickaway when on click          //
    closable: true,                                                    // 1294
                                                                       //
    // automatically hide on scroll                                    //
    hideOnScroll: 'auto',                                              // 1297
                                                                       //
    // hide other popups on show                                       //
    exclusive: false,                                                  // 1300
                                                                       //
    // context to attach popups                                        //
    context: 'body',                                                   // 1303
                                                                       //
    // position to prefer when calculating new position                //
    prefer: 'opposite',                                                // 1306
                                                                       //
    // specify position to appear even if it doesn't fit               //
    lastResort: false,                                                 // 1309
                                                                       //
    // delay used to prevent accidental refiring of animations due to user error
    delay: {                                                           // 1312
      show: 50,                                                        // 1313
      hide: 70                                                         // 1314
    },                                                                 //
                                                                       //
    // whether fluid variation should assign width explicitly          //
    setFluidWidth: true,                                               // 1318
                                                                       //
    // transition settings                                             //
    duration: 200,                                                     // 1321
    transition: 'scale',                                               // 1322
                                                                       //
    // distance away from activating element in px                     //
    distanceAway: 0,                                                   // 1325
                                                                       //
    // number of pixels an element is allowed to be "offstage" for a position to be chosen (allows for rounding)
    jitter: 2,                                                         // 1328
                                                                       //
    // offset on aligning axis from calculated position                //
    offset: 0,                                                         // 1331
                                                                       //
    // maximum times to look for a position before failing (9 positions total)
    maxSearchDepth: 15,                                                // 1334
                                                                       //
    error: {                                                           // 1336
      invalidPosition: 'The position you specified is not a valid position',
      cannotPlace: 'Popup does not fit within the boundaries of the viewport',
      method: 'The method you called is not defined.',                 // 1339
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',
      notFound: 'The target or popup you specified does not exist on the page'
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1344
      activator: 'activator',                                          // 1345
      content: 'content',                                              // 1346
      html: 'html',                                                    // 1347
      offset: 'offset',                                                // 1348
      position: 'position',                                            // 1349
      title: 'title',                                                  // 1350
      variation: 'variation'                                           // 1351
    },                                                                 //
                                                                       //
    className: {                                                       // 1354
      active: 'active',                                                // 1355
      animating: 'animating',                                          // 1356
      dropdown: 'dropdown',                                            // 1357
      fluid: 'fluid',                                                  // 1358
      loading: 'loading',                                              // 1359
      popup: 'ui popup',                                               // 1360
      position: 'top left center bottom right',                        // 1361
      visible: 'visible'                                               // 1362
    },                                                                 //
                                                                       //
    selector: {                                                        // 1365
      popup: '.ui.popup'                                               // 1366
    },                                                                 //
                                                                       //
    templates: {                                                       // 1369
      escape: function (string) {                                      // 1370
        var badChars = /[&<>"'`]/g,                                    // 1371
            shouldEscape = /[&<>"'`]/,                                 //
            escape = {                                                 //
          "&": "&amp;",                                                // 1375
          "<": "&lt;",                                                 // 1376
          ">": "&gt;",                                                 // 1377
          '"': "&quot;",                                               // 1378
          "'": "&#x27;",                                               // 1379
          "`": "&#x60;"                                                // 1380
        },                                                             //
            escapedChar = function (chr) {                             //
          return escape[chr];                                          // 1383
        };                                                             //
        if (shouldEscape.test(string)) {                               // 1386
          return string.replace(badChars, escapedChar);                // 1387
        }                                                              //
        return string;                                                 // 1389
      },                                                               //
      popup: function (text) {                                         // 1391
        var html = '',                                                 // 1392
            escape = $.fn.popup.settings.templates.escape;             //
        if (typeof text !== undefined) {                               // 1396
          if (typeof text.title !== undefined && text.title) {         // 1397
            text.title = escape(text.title);                           // 1398
            html += '<div class="header">' + text.title + '</div>';    // 1399
          }                                                            //
          if (typeof text.content !== undefined && text.content) {     // 1401
            text.content = escape(text.content);                       // 1402
            html += '<div class="content">' + text.content + '</div>';
          }                                                            //
        }                                                              //
        return html;                                                   // 1406
      }                                                                //
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
