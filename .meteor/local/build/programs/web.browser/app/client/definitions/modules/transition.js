(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/definitions/modules/transition.js                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.6                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Transition                                          //
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
  $.fn.transition = function () {                                      // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        moduleArguments = arguments,                                   //
        query = moduleArguments[0],                                    //
        queryArguments = [].slice.call(arguments, 1),                  //
        methodInvoked = typeof query === 'string',                     //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 37
    },                                                                 //
        returnedValue;                                                 //
    $allModules.each(function (index) {                                // 41
      var $module = $(this),                                           // 43
          element = this,                                              //
                                                                       //
      // set at run time                                               //
      settings,                                                        // 48
          instance,                                                    //
          error,                                                       //
          className,                                                   //
          metadata,                                                    //
          animationEnd,                                                //
          animationName,                                               //
          namespace,                                                   //
          moduleNamespace,                                             //
          eventNamespace,                                              //
          module;                                                      //
                                                                       //
      module = {                                                       // 63
                                                                       //
        initialize: function () {                                      // 65
                                                                       //
          // get full settings                                         //
          settings = module.get.settings.apply(element, moduleArguments);
                                                                       //
          // shorthand                                                 //
          className = settings.className;                              // 71
          error = settings.error;                                      // 72
          metadata = settings.metadata;                                // 73
                                                                       //
          // define namespace                                          //
          eventNamespace = '.' + settings.namespace;                   // 76
          moduleNamespace = 'module-' + settings.namespace;            // 77
          instance = $module.data(moduleNamespace) || module;          // 78
                                                                       //
          // get vendor specific events                                //
          animationEnd = module.get.animationEndEvent();               // 81
                                                                       //
          if (methodInvoked) {                                         // 83
            methodInvoked = module.invoke(query);                      // 84
          }                                                            //
                                                                       //
          // method not invoked, lets run an animation                 //
          if (methodInvoked === false) {                               // 88
            module.verbose('Converted arguments into settings object', settings);
            if (settings.interval) {                                   // 90
              module.delay(settings.animate);                          // 91
            } else {                                                   //
              module.animate();                                        // 94
            }                                                          //
            module.instantiate();                                      // 96
          }                                                            //
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 100
          module.verbose('Storing instance of module', module);        // 101
          instance = module;                                           // 102
          $module.data(moduleNamespace, instance);                     // 103
        },                                                             //
                                                                       //
        destroy: function () {                                         // 108
          module.verbose('Destroying previous module for', element);   // 109
          $module.removeData(moduleNamespace);                         // 110
        },                                                             //
                                                                       //
        refresh: function () {                                         // 115
          module.verbose('Refreshing display type on next animation');
          delete module.displayType;                                   // 117
        },                                                             //
                                                                       //
        forceRepaint: function () {                                    // 120
          module.verbose('Forcing element repaint');                   // 121
          var $parentElement = $module.parent(),                       // 122
              $nextElement = $module.next();                           //
          if ($nextElement.length === 0) {                             // 126
            $module.detach().appendTo($parentElement);                 // 127
          } else {                                                     //
            $module.detach().insertBefore($nextElement);               // 130
          }                                                            //
        },                                                             //
                                                                       //
        repaint: function () {                                         // 134
          module.verbose('Repainting element');                        // 135
          var fakeAssignment = element.offsetWidth;                    // 136
        },                                                             //
                                                                       //
        delay: function (interval) {                                   // 141
          var direction = module.get.animationDirection(),             // 142
              shouldReverse,                                           //
              delay;                                                   //
          if (!direction) {                                            // 147
            direction = module.can.transition() ? module.get.direction() : 'static';
          }                                                            //
          interval = interval !== undefined ? interval : settings.interval;
          shouldReverse = settings.reverse == 'auto' && direction == className.outward;
          delay = shouldReverse || settings.reverse == true ? ($allModules.length - index) * settings.interval : index * settings.interval;
          module.debug('Delaying animation by', delay);                // 162
          setTimeout(module.animate, delay);                           // 163
        },                                                             //
                                                                       //
        animate: function (overrideSettings) {                         // 166
          settings = overrideSettings || settings;                     // 167
          if (!module.is.supported()) {                                // 168
            module.error(error.support);                               // 169
            return false;                                              // 170
          }                                                            //
          module.debug('Preparing animation', settings.animation);     // 172
          if (module.is.animating()) {                                 // 173
            if (settings.queue) {                                      // 174
              if (!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
              } else {                                                 //
                module.queue(settings.animation);                      // 179
              }                                                        //
              return false;                                            // 181
            } else if (!settings.allowRepeats && module.is.occurring()) {
              module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
              return false;                                            // 185
            } else {                                                   //
              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();                                     // 189
            }                                                          //
          }                                                            //
          if (module.can.animate()) {                                  // 192
            module.set.animating(settings.animation);                  // 193
          } else {                                                     //
            module.error(error.noAnimation, settings.animation, element);
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 200
          module.debug('Resetting animation to beginning conditions');
          module.remove.animationCallbacks();                          // 202
          module.restore.conditions();                                 // 203
          module.remove.animating();                                   // 204
        },                                                             //
                                                                       //
        queue: function (animation) {                                  // 207
          module.debug('Queueing animation of', animation);            // 208
          module.queuing = true;                                       // 209
          $module.one(animationEnd + '.queue' + eventNamespace, function () {
            module.queuing = false;                                    // 212
            module.repaint();                                          // 213
            module.animate.apply(this, settings);                      // 214
          });                                                          //
        },                                                             //
                                                                       //
        complete: function (event) {                                   // 219
          module.debug('Animation complete', settings.animation);      // 220
          module.remove.completeCallback();                            // 221
          module.remove.failSafe();                                    // 222
          if (!module.is.looping()) {                                  // 223
            if (module.is.outward()) {                                 // 224
              module.verbose('Animation is outward, hiding element');  // 225
              module.restore.conditions();                             // 226
              module.hide();                                           // 227
            } else if (module.is.inward()) {                           //
              module.verbose('Animation is outward, showing element');
              module.restore.conditions();                             // 231
              module.show();                                           // 232
            } else {                                                   //
              module.verbose('Static animation completed');            // 235
              module.restore.conditions();                             // 236
              settings.onComplete.call(element);                       // 237
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        force: {                                                       // 242
          visible: function () {                                       // 243
            var style = $module.attr('style'),                         // 244
                userStyle = module.get.userStyle(),                    //
                displayType = module.get.displayType(),                //
                overrideStyle = userStyle + 'display: ' + displayType + ' !important;',
                currentDisplay = $module.css('display'),               //
                emptyStyle = style === undefined || style === '';      //
            if (currentDisplay !== displayType) {                      // 252
              module.verbose('Overriding default display to show element', displayType);
              $module.attr('style', overrideStyle);                    // 254
            } else if (emptyStyle) {                                   //
              $module.removeAttr('style');                             // 259
            }                                                          //
          },                                                           //
          hidden: function () {                                        // 262
            var style = $module.attr('style'),                         // 263
                currentDisplay = $module.css('display'),               //
                emptyStyle = style === undefined || style === '';      //
            if (currentDisplay !== 'none' && !module.is.hidden()) {    // 268
              module.verbose('Overriding default display to hide element');
              $module.css('display', 'none');                          // 270
            } else if (emptyStyle) {                                   //
              $module.removeAttr('style');                             // 275
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 282
          direction: function (animation) {                            // 283
            var hasDirection = false;                                  // 284
            animation = animation || settings.animation;               // 287
            if (typeof animation === 'string') {                       // 288
              animation = animation.split(' ');                        // 289
              $.each(animation, function (index, word) {               // 290
                if (word === className.inward || word === className.outward) {
                  hasDirection = true;                                 // 292
                }                                                      //
              });                                                      //
            }                                                          //
            return hasDirection;                                       // 296
          },                                                           //
          inlineDisplay: function () {                                 // 298
            var style = $module.attr('style') || '';                   // 299
            return $.isArray(style.match(/display.*?;/, ''));          // 302
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 306
          animating: function (animation) {                            // 307
            var animationClass, direction;                             // 308
            // remove previous callbacks                               //
            module.remove.completeCallback();                          // 313
                                                                       //
            // determine exact animation                               //
            animation = animation || settings.animation;               // 316
            animationClass = module.get.animationClass(animation);     // 317
                                                                       //
            // save animation class in cache to restore class names    //
            module.save.animation(animationClass);                     // 320
                                                                       //
            // override display if necessary so animation appears visibly
            module.force.visible();                                    // 323
                                                                       //
            module.remove.hidden();                                    // 325
            module.remove.direction();                                 // 326
                                                                       //
            module.start.animation(animationClass);                    // 328
          },                                                           //
          duration: function (animationName, duration) {               // 331
            duration = duration || settings.duration;                  // 332
            duration = typeof duration == 'number' ? duration + 'ms' : duration;
            if (duration || duration === 0) {                          // 337
              module.verbose('Setting animation duration', duration);  // 338
              $module.css({                                            // 339
                'animation-duration': duration                         // 341
              });                                                      //
            }                                                          //
          },                                                           //
          direction: function (direction) {                            // 346
            direction = direction || module.get.direction();           // 347
            if (direction == className.inward) {                       // 348
              module.set.inward();                                     // 349
            } else {                                                   //
              module.set.outward();                                    // 352
            }                                                          //
          },                                                           //
          looping: function () {                                       // 355
            module.debug('Transition set to loop');                    // 356
            $module.addClass(className.looping);                       // 357
          },                                                           //
          hidden: function () {                                        // 361
            $module.addClass(className.transition).addClass(className.hidden);
          },                                                           //
          inward: function () {                                        // 367
            module.debug('Setting direction to inward');               // 368
            $module.removeClass(className.outward).addClass(className.inward);
          },                                                           //
          outward: function () {                                       // 374
            module.debug('Setting direction to outward');              // 375
            $module.removeClass(className.inward).addClass(className.outward);
          },                                                           //
          visible: function () {                                       // 381
            $module.addClass(className.transition).addClass(className.visible);
          }                                                            //
        },                                                             //
                                                                       //
        start: {                                                       // 389
          animation: function (animationClass) {                       // 390
            animationClass = animationClass || module.get.animationClass();
            module.debug('Starting tween', animationClass);            // 392
            $module.addClass(animationClass).one(animationEnd + '.complete' + eventNamespace, module.complete);
            if (settings.useFailSafe) {                                // 397
              module.add.failSafe();                                   // 398
            }                                                          //
            module.set.duration(settings.duration);                    // 400
            settings.onStart.call(element);                            // 401
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 405
          animation: function (animation) {                            // 406
            if (!module.cache) {                                       // 407
              module.cache = {};                                       // 408
            }                                                          //
            module.cache.animation = animation;                        // 410
          },                                                           //
          displayType: function (displayType) {                        // 412
            if (displayType !== 'none') {                              // 413
              $module.data(metadata.displayType, displayType);         // 414
            }                                                          //
          },                                                           //
          transitionExists: function (animation, exists) {             // 417
            $.fn.transition.exists[animation] = exists;                // 418
            module.verbose('Saving existence of transition', animation, exists);
          }                                                            //
        },                                                             //
                                                                       //
        restore: {                                                     // 423
          conditions: function () {                                    // 424
            var animation = module.get.currentAnimation();             // 425
            if (animation) {                                           // 428
              $module.removeClass(animation);                          // 429
              module.verbose('Removing animation class', module.cache);
            }                                                          //
            module.remove.duration();                                  // 434
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 438
          failSafe: function () {                                      // 439
            var duration = module.get.duration();                      // 440
            module.timer = setTimeout(function () {                    // 443
              $module.triggerHandler(animationEnd);                    // 444
            }, duration + settings.failSafeDelay);                     //
            module.verbose('Adding fail safe timer', module.timer);    // 446
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 450
          animating: function () {                                     // 451
            $module.removeClass(className.animating);                  // 452
          },                                                           //
          animationCallbacks: function () {                            // 454
            module.remove.queueCallback();                             // 455
            module.remove.completeCallback();                          // 456
          },                                                           //
          queueCallback: function () {                                 // 458
            $module.off('.queue' + eventNamespace);                    // 459
          },                                                           //
          completeCallback: function () {                              // 461
            $module.off('.complete' + eventNamespace);                 // 462
          },                                                           //
          display: function () {                                       // 464
            $module.css('display', '');                                // 465
          },                                                           //
          direction: function () {                                     // 467
            $module.removeClass(className.inward).removeClass(className.outward);
          },                                                           //
          duration: function () {                                      // 473
            $module.css('animation-duration', '');                     // 474
          },                                                           //
          failSafe: function () {                                      // 478
            module.verbose('Removing fail safe timer', module.timer);  // 479
            if (module.timer) {                                        // 480
              clearTimeout(module.timer);                              // 481
            }                                                          //
          },                                                           //
          hidden: function () {                                        // 484
            $module.removeClass(className.hidden);                     // 485
          },                                                           //
          visible: function () {                                       // 487
            $module.removeClass(className.visible);                    // 488
          },                                                           //
          looping: function () {                                       // 490
            module.debug('Transitions are no longer looping');         // 491
            if (module.is.looping()) {                                 // 492
              module.reset();                                          // 493
              $module.removeClass(className.looping);                  // 494
            }                                                          //
          },                                                           //
          transition: function () {                                    // 499
            $module.removeClass(className.visible).removeClass(className.hidden);
          }                                                            //
        },                                                             //
        get: {                                                         // 506
          settings: function (animation, duration, onComplete) {       // 507
            // single settings object                                  //
            if (typeof animation == 'object') {                        // 509
              return $.extend(true, {}, $.fn.transition.settings, animation);
            }                                                          //
            // all arguments provided                                  //
            else if (typeof onComplete == 'function') {                //
                return $.extend({}, $.fn.transition.settings, {        // 514
                  animation: animation,                                // 515
                  onComplete: onComplete,                              // 516
                  duration: duration                                   // 517
                });                                                    //
              }                                                        //
              // only duration provided                                //
              else if (typeof duration == 'string' || typeof duration == 'number') {
                  return $.extend({}, $.fn.transition.settings, {      // 522
                    animation: animation,                              // 523
                    duration: duration                                 // 524
                  });                                                  //
                }                                                      //
                // duration is actually settings object                //
                else if (typeof duration == 'object') {                //
                    return $.extend({}, $.fn.transition.settings, duration, {
                      animation: animation                             // 530
                    });                                                //
                  }                                                    //
                  // duration is actually callback                     //
                  else if (typeof duration == 'function') {            //
                      return $.extend({}, $.fn.transition.settings, {  // 535
                        animation: animation,                          // 536
                        onComplete: duration                           // 537
                      });                                              //
                    }                                                  //
                    // only animation provided                         //
                    else {                                             //
                        return $.extend({}, $.fn.transition.settings, {
                          animation: animation                         // 543
                        });                                            //
                      }                                                //
            return $.fn.transition.settings;                           // 546
          },                                                           //
          animationClass: function (animation) {                       // 548
            var animationClass = animation || settings.animation,      // 549
                directionClass = module.can.transition() && !module.has.direction() ? module.get.direction() + ' ' : '';
            return className.animating + ' ' + className.transition + ' ' + directionClass + animationClass;
          },                                                           //
          currentAnimation: function () {                              // 561
            return module.cache && module.cache.animation !== undefined ? module.cache.animation : false;
          },                                                           //
          currentDirection: function () {                              // 567
            return module.is.inward() ? className.inward : className.outward;
          },                                                           //
          direction: function () {                                     // 573
            return module.is.hidden() || !module.is.visible() ? className.inward : className.outward;
          },                                                           //
          animationDirection: function (animation) {                   // 579
            var direction;                                             // 580
            animation = animation || settings.animation;               // 583
            if (typeof animation === 'string') {                       // 584
              animation = animation.split(' ');                        // 585
              // search animation name for out/in class                //
              $.each(animation, function (index, word) {               // 587
                if (word === className.inward) {                       // 588
                  direction = className.inward;                        // 589
                } else if (word === className.outward) {               //
                  direction = className.outward;                       // 592
                }                                                      //
              });                                                      //
            }                                                          //
            // return found direction                                  //
            if (direction) {                                           // 597
              return direction;                                        // 598
            }                                                          //
            return false;                                              // 600
          },                                                           //
          duration: function (duration) {                              // 602
            duration = duration || settings.duration;                  // 603
            if (duration === false) {                                  // 604
              duration = $module.css('animation-duration') || 0;       // 605
            }                                                          //
            return typeof duration === 'string' ? duration.indexOf('ms') > -1 ? parseFloat(duration) : parseFloat(duration) * 1000 : duration;
          },                                                           //
          displayType: function () {                                   // 614
            if (settings.displayType) {                                // 615
              return settings.displayType;                             // 616
            }                                                          //
            if ($module.data(metadata.displayType) === undefined) {    // 618
              // create fake element to determine display state        //
              module.can.transition(true);                             // 620
            }                                                          //
            return $module.data(metadata.displayType);                 // 622
          },                                                           //
          userStyle: function (style) {                                // 624
            style = style || $module.attr('style') || '';              // 625
            return style.replace(/display.*?;/, '');                   // 626
          },                                                           //
          transitionExists: function (animation) {                     // 628
            return $.fn.transition.exists[animation];                  // 629
          },                                                           //
          animationStartEvent: function () {                           // 631
            var element = document.createElement('div'),               // 632
                animations = {                                         //
              'animation': 'animationstart',                           // 635
              'OAnimation': 'oAnimationStart',                         // 636
              'MozAnimation': 'mozAnimationStart',                     // 637
              'WebkitAnimation': 'webkitAnimationStart'                // 638
            },                                                         //
                animation;                                             //
            for (animation in babelHelpers.sanitizeForInObject(animations)) {
              if (element.style[animation] !== undefined) {            // 643
                return animations[animation];                          // 644
              }                                                        //
            }                                                          //
            return false;                                              // 647
          },                                                           //
          animationEndEvent: function () {                             // 649
            var element = document.createElement('div'),               // 650
                animations = {                                         //
              'animation': 'animationend',                             // 653
              'OAnimation': 'oAnimationEnd',                           // 654
              'MozAnimation': 'mozAnimationEnd',                       // 655
              'WebkitAnimation': 'webkitAnimationEnd'                  // 656
            },                                                         //
                animation;                                             //
            for (animation in babelHelpers.sanitizeForInObject(animations)) {
              if (element.style[animation] !== undefined) {            // 661
                return animations[animation];                          // 662
              }                                                        //
            }                                                          //
            return false;                                              // 665
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        can: {                                                         // 670
          transition: function (forced) {                              // 671
            var animation = settings.animation,                        // 672
                transitionExists = module.get.transitionExists(animation),
                elementClass,                                          //
                tagName,                                               //
                $clone,                                                //
                currentAnimation,                                      //
                inAnimation,                                           //
                directionExists,                                       //
                displayType;                                           //
            if (transitionExists === undefined || forced) {            // 683
              module.verbose('Determining whether animation exists');  // 684
              elementClass = $module.attr('class');                    // 685
              tagName = $module.prop('tagName');                       // 686
                                                                       //
              $clone = $('<' + tagName + ' />').addClass(elementClass).insertAfter($module);
              currentAnimation = $clone.addClass(animation).removeClass(className.inward).removeClass(className.outward).addClass(className.animating).addClass(className.transition).css('animationName');
              inAnimation = $clone.addClass(className.inward).css('animationName');
              displayType = $clone.attr('class', elementClass).removeAttr('style').removeClass(className.hidden).removeClass(className.visible).show().css('display');
              module.verbose('Determining final display state', displayType);
              module.save.displayType(displayType);                    // 710
                                                                       //
              $clone.remove();                                         // 712
              if (currentAnimation != inAnimation) {                   // 713
                module.debug('Direction exists for animation', animation);
                directionExists = true;                                // 715
              } else if (currentAnimation == 'none' || !currentAnimation) {
                module.debug('No animation defined in css', animation);
                return;                                                // 719
              } else {                                                 //
                module.debug('Static animation found', animation, displayType);
                directionExists = false;                               // 723
              }                                                        //
              module.save.transitionExists(animation, directionExists);
            }                                                          //
            return transitionExists !== undefined ? transitionExists : directionExists;
          },                                                           //
          animate: function () {                                       // 732
            // can transition does not return a value if animation does not exist
            return module.can.transition() !== undefined;              // 734
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 738
          animating: function () {                                     // 739
            return $module.hasClass(className.animating);              // 740
          },                                                           //
          inward: function () {                                        // 742
            return $module.hasClass(className.inward);                 // 743
          },                                                           //
          outward: function () {                                       // 745
            return $module.hasClass(className.outward);                // 746
          },                                                           //
          looping: function () {                                       // 748
            return $module.hasClass(className.looping);                // 749
          },                                                           //
          occurring: function (animation) {                            // 751
            animation = animation || settings.animation;               // 752
            animation = '.' + animation.replace(' ', '.');             // 753
            return $module.filter(animation).length > 0;               // 754
          },                                                           //
          visible: function () {                                       // 756
            return $module.is(':visible');                             // 757
          },                                                           //
          hidden: function () {                                        // 759
            return $module.css('visibility') === 'hidden';             // 760
          },                                                           //
          supported: function () {                                     // 762
            return animationEnd !== false;                             // 763
          }                                                            //
        },                                                             //
                                                                       //
        hide: function () {                                            // 767
          module.verbose('Hiding element');                            // 768
          if (module.is.animating()) {                                 // 769
            module.reset();                                            // 770
          }                                                            //
          element.blur(); // IE will trigger focus change if element is not blurred before hiding
          module.remove.display();                                     // 773
          module.remove.visible();                                     // 774
          module.set.hidden();                                         // 775
          module.force.hidden();                                       // 776
          settings.onHide.call(element);                               // 777
          settings.onComplete.call(element);                           // 778
          // module.repaint();                                         //
        },                                                             //
                                                                       //
        show: function (display) {                                     // 782
          module.verbose('Showing element', display);                  // 783
          module.remove.hidden();                                      // 784
          module.set.visible();                                        // 785
          module.force.visible();                                      // 786
          settings.onShow.call(element);                               // 787
          settings.onComplete.call(element);                           // 788
          // module.repaint();                                         //
        },                                                             //
                                                                       //
        toggle: function () {                                          // 792
          if (module.is.visible()) {                                   // 793
            module.hide();                                             // 794
          } else {                                                     //
            module.show();                                             // 797
          }                                                            //
        },                                                             //
                                                                       //
        stop: function () {                                            // 801
          module.debug('Stopping current animation');                  // 802
          $module.triggerHandler(animationEnd);                        // 803
        },                                                             //
                                                                       //
        stopAll: function () {                                         // 806
          module.debug('Stopping all animation');                      // 807
          module.remove.queueCallback();                               // 808
          $module.triggerHandler(animationEnd);                        // 809
        },                                                             //
                                                                       //
        clear: {                                                       // 812
          queue: function () {                                         // 813
            module.debug('Clearing animation queue');                  // 814
            module.remove.queueCallback();                             // 815
          }                                                            //
        },                                                             //
                                                                       //
        enable: function () {                                          // 819
          module.verbose('Starting animation');                        // 820
          $module.removeClass(className.disabled);                     // 821
        },                                                             //
                                                                       //
        disable: function () {                                         // 824
          module.debug('Stopping animation');                          // 825
          $module.addClass(className.disabled);                        // 826
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 829
          module.debug('Changing setting', name, value);               // 830
          if ($.isPlainObject(name)) {                                 // 831
            $.extend(true, settings, name);                            // 832
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 835
          } else {                                                     //
            return settings[name];                                     // 838
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 841
          if ($.isPlainObject(name)) {                                 // 842
            $.extend(true, module, name);                              // 843
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 846
          } else {                                                     //
            return module[name];                                       // 849
          }                                                            //
        },                                                             //
        debug: function () {                                           // 852
          if (settings.debug) {                                        // 853
            if (settings.performance) {                                // 854
              module.performance.log(arguments);                       // 855
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 859
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 863
          if (settings.verbose && settings.debug) {                    // 864
            if (settings.performance) {                                // 865
              module.performance.log(arguments);                       // 866
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 870
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 874
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 876
        },                                                             //
        performance: {                                                 // 878
          log: function (message) {                                    // 879
            var currentTime, executionTime, previousTime;              // 880
            if (settings.performance) {                                // 885
              currentTime = new Date().getTime();                      // 886
              previousTime = time || currentTime;                      // 887
              executionTime = currentTime - previousTime;              // 888
              time = currentTime;                                      // 889
              performance.push({                                       // 890
                'Name': message[0],                                    // 891
                'Arguments': [].slice.call(message, 1) || '',          // 892
                'Element': element,                                    // 893
                'Execution Time': executionTime                        // 894
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 897
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 900
            var title = settings.name + ':',                           // 901
                totalTime = 0;                                         //
            time = false;                                              // 905
            clearTimeout(module.performance.timer);                    // 906
            $.each(performance, function (index, data) {               // 907
              totalTime += data['Execution Time'];                     // 908
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 910
            if (moduleSelector) {                                      // 911
              title += ' \'' + moduleSelector + '\'';                  // 912
            }                                                          //
            if ($allModules.length > 1) {                              // 914
              title += ' ' + '(' + $allModules.length + ')';           // 915
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 918
              if (console.table) {                                     // 919
                console.table(performance);                            // 920
              } else {                                                 //
                $.each(performance, function (index, data) {           // 923
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 927
            }                                                          //
            performance = [];                                          // 929
          }                                                            //
        },                                                             //
        // modified for transition to return invoke success            //
        invoke: function (query, passedArguments, context) {           // 933
          var object = instance,                                       // 934
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 940
          context = element || context;                                // 941
          if (typeof query == 'string' && object !== undefined) {      // 942
            query = query.split(/[\. ]/);                              // 943
            maxDepth = query.length - 1;                               // 944
            $.each(query, function (depth, value) {                    // 945
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 951
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 954
                return false;                                          // 955
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 958
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 961
                return false;                                          // 962
              } else {                                                 //
                return false;                                          // 965
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 969
            response = found.apply(context, passedArguments);          // 970
          } else if (found !== undefined) {                            //
            response = found;                                          // 973
          }                                                            //
                                                                       //
          if ($.isArray(returnedValue)) {                              // 976
            returnedValue.push(response);                              // 977
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 980
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 983
          }                                                            //
          return found !== undefined ? found : false;                  // 985
        }                                                              //
      };                                                               //
      module.initialize();                                             // 991
    });                                                                //
    return returnedValue !== undefined ? returnedValue : this;         // 994
  };                                                                   //
                                                                       //
  // Records if CSS transition is available                            //
  $.fn.transition.exists = {};                                         // 1001
                                                                       //
  $.fn.transition.settings = {                                         // 1003
                                                                       //
    // module info                                                     //
    name: 'Transition',                                                // 1006
                                                                       //
    // debug content outputted to console                              //
    debug: false,                                                      // 1009
                                                                       //
    // verbose debug output                                            //
    verbose: false,                                                    // 1012
                                                                       //
    // performance data output                                         //
    performance: true,                                                 // 1015
                                                                       //
    // event namespace                                                 //
    namespace: 'transition',                                           // 1018
                                                                       //
    // delay between animations in group                               //
    interval: 0,                                                       // 1021
                                                                       //
    // whether group animations should be reversed                     //
    reverse: 'auto',                                                   // 1024
                                                                       //
    // animation callback event                                        //
    onStart: function () {},                                           // 1027
    onComplete: function () {},                                        // 1028
    onShow: function () {},                                            // 1029
    onHide: function () {},                                            // 1030
                                                                       //
    // whether timeout should be used to ensure callback fires in cases animationend does not
    useFailSafe: true,                                                 // 1033
                                                                       //
    // delay in ms for fail safe                                       //
    failSafeDelay: 100,                                                // 1036
                                                                       //
    // whether EXACT animation can occur twice in a row                //
    allowRepeats: false,                                               // 1039
                                                                       //
    // Override final display type on visible                          //
    displayType: false,                                                // 1042
                                                                       //
    // animation duration                                              //
    animation: 'fade',                                                 // 1045
    duration: false,                                                   // 1046
                                                                       //
    // new animations will occur after previous ones                   //
    queue: true,                                                       // 1049
                                                                       //
    metadata: {                                                        // 1051
      displayType: 'display'                                           // 1052
    },                                                                 //
                                                                       //
    className: {                                                       // 1055
      animating: 'animating',                                          // 1056
      disabled: 'disabled',                                            // 1057
      hidden: 'hidden',                                                // 1058
      inward: 'in',                                                    // 1059
      loading: 'loading',                                              // 1060
      looping: 'looping',                                              // 1061
      outward: 'out',                                                  // 1062
      transition: 'transition',                                        // 1063
      visible: 'visible'                                               // 1064
    },                                                                 //
                                                                       //
    // possible errors                                                 //
    error: {                                                           // 1068
      noAnimation: 'There is no css animation matching the one you specified. Please make sure your css is vendor prefixed, and you have included transition css.',
      repeated: 'That animation is already occurring, cancelling repeated animation',
      method: 'The method you called is not defined',                  // 1071
      support: 'This browser does not support CSS animations'          // 1072
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
