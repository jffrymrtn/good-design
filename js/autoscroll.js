/*
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Jeffrey Martin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
$(function() {
    /* Amount of times the user needs to scroll to trigger an scroll */
    var SCROLL_COUNTER_LIMIT = 1;

    /* Scrolling speed in ms */
    var SCROLL_SPEED = 750;

    /* The delay in ms until a user can scroll again. This is to handle inertial scrolling */
    var SCROLL_DELAY = 2500;

    /* Keep track of a counter indicating when it is time to scroll */
    var scrollCounter = 0;

    /* The current page we're on. On load, it's page 1 */
    var page = 1;

    /* On load, make sure the first page is showing */
    scrollToPage(page);

    /* Detect user scrolling on Firefox */
    $(window).bind('DOMMouseScroll', function(e) {
        e.preventDefault();

        // Don't do anything if there are no more pages to scroll to
        if ($(this).scrollTop() != $('.page-' + page).offset().top) {
            return false;
        }

        // Prevent scroll when it is not time yet
        if (++scrollCounter != SCROLL_COUNTER_LIMIT) {
            return false;
        }

        // When it is time to scroll, then scroll like the wind
        if (e.originalEvent.detail < 0) {
            scrollUp();
        } else {
            scrollDown();
        }
    });

    /* Detect user scrolling on Webkit, Opera, and IE */
    $(window).bind('mousewheel', function(e) {
        e.preventDefault();

        // Don't do anything if there are no more pages to scroll to
        if ($(this).scrollTop() != $('.page-' + page).offset().top) {
            return false;
        }

        // Prevent scroll when it is not time yet
        if (++scrollCounter != SCROLL_COUNTER_LIMIT) {
            return false;
        }

        // When it is time to scroll, then scroll like the wind
        if (e.originalEvent.wheelDelta > 0) {
            scrollUp();
        } else {
            scrollDown();
        }
    });

    /* Detect arrow keys */
    $(document).keydown(function(e) {
        if ((e.keyCode == 38) || (e.keyCode == 33)){
            e.preventDefault();
            scrollUp();
        } else if ((e.keyCode == 40) || (e.keyCode == 34)) {
            e.preventDefault();
            scrollDown();
        }
    });

    /* Scroll up */
    function scrollUp() {
        if (!$('.page-' + (page - 1))[0]) {
            scrollCounter = 0;
            return false;
        } else {
            scrollToPage(--page);
        }
    }

    /* Scroll down */
    function scrollDown() {
        if (!$('.page-' + (page + 1))[0]) {
            scrollCounter = 0;
            return false;
        } else {
            scrollToPage(++page);
        }
    }

    /* Scroll to the specified page */
    function scrollToPage(page) {
        $('html, body').animate({
            scrollTop: $('.page-' + page).offset().top
        }, SCROLL_SPEED);

        // Start a timer for SCROLL_SPEED ms
        // Reset scrollCounter when the timer is finished
        setTimeout(function() {
            scrollCounter = 0;
        }, SCROLL_SPEED + SCROLL_DELAY);
    }
});
