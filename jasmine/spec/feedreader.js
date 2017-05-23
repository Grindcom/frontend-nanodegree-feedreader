  /* feedreader.js
   *
   * This is the spec file that Jasmine will read and contains
   * all of the tests that will be run against your application.
   */

  /* We're placing all of our tests within the $() function,
   * since some of these tests may require DOM elements. We want
   * to ensure they don't run until the DOM is ready.
   */
  $(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it('are defined', function () {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });


      /* COMPLETED TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it('Each URL defined and not empty', function () {
        allFeeds.forEach(function (feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url).toBeTruthy();// found at http://jsfiddle.net/lucassus/ScTrG/
        });
      });

      /* COMPLETED TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it('Each Name is defined and not empty', function () {
        allFeeds.forEach(function (feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name).toBeTruthy();// found at http://jsfiddle.net/lucassus/ScTrG/
        });
      });
    });


    /* COMPLETE TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
      /* COMPLETED TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('menu hidden by default', function () {
        /**
         * Test that the menu-hidden class is visible, because
         * if it isn't the menu is showing.
         */
        expect($('.menu-hidden').is(':visible')).toBe(true);
      });
      /* COMPLETE TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      describe('menu changes visibility when icon is clicked', function () {
        beforeEach(function () {
          $('.menu-icon-link').click();
        });
        it('menu displays on first click', function () {
          // If the menu is hidden
          // Expect a click to show it
          expect($('.menu-hidden').is(':visible')).toBe(false);
        });
        it('menu hides on second click', function () {
          // Expect a click to hide it
          expect($('.menu-hidden').is(':visible')).toBe(true);
        });
      });
    });
    /* COMPLETE TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
      /* COMPLETE TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      // Run loadFeed function and wait for completion
      beforeEach(function (done) {
        loadFeed(0, function () {
          done();
        });// remove 0 to cause fail

      });
      it('after loadFeed is called there is at least a single .entry element in the container',
              function (done) {
                expect($('.entry').length).toBeGreaterThan(0);
                done();
              });
    });
    /* COMPLETE TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
      var seedTitles = [];
      var compTitles = [];
      //
      beforeEach(function (done) {
        loadFeed(0, function () {
          // iterate through articles and load the titles
          $('article').each(function (index, value) {
            var title = $('h2', this).text();
            seedTitles.push(title);
          });
        });
        loadFeed(2, function () {
          // iterate through articles and load the titles
          $('article').each(function (index, value) {
            var title = $('h2', this).text();
            compTitles.push(title);
          });
          done();
        });
      });
      /* COMPLETE TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('will change', function (done) {
        var i = 0;
        compTitles.forEach(function(title){
          expect(title).not.toEqual(seedTitles[i++]);
        });
        expect(compTitles).not.toEqual(seedTitles);
        done();        
      });
    });
  }());
