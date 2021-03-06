// Karma configuration
// Generated on Wed Jul 15 2015 09:44:02 GMT+0200 (Romance Daylight Time)

module.exports = function(config) {
  'use strict';
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular2/bundles/angular2-polyfills.js', // 'Uncaught reflect-metadata shim is required when using class decorators'
      'node_modules/traceur/bin/traceur-runtime.js',         // TypeError: undefined is not a constructor (evaluating 'new exports.Map()')
      {pattern: 'www/build/test/test.bundle.js', included: true},
      {pattern: 'www/build/test/test.bundle.js.map', included: false},
      {pattern: 'www/build/**/*.html', included: false},
    ],

    // list of files to exclude
    exclude: [
      'node_modules/angular2/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'www/build/test/test.bundle.js': 'coverage'
    },

    // options on how to report coverage:
    coverageReporter: {
      reporters: [
        {type: 'json', dir: 'coverage', subdir: 'istanbul-remap'}
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // GOTCHA -- Karma proxies _everything_ through base first..
    //           Also any files you want to serve need to be in the files array above with serverd: true
    proxies: {
      '/build': '/base/www/build'
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
    ],

    // https://github.com/lathonez/clicker/issues/82
    // try increasing this value if you see the error "Disconnected (1 times), because no message in 30000 ms."
    browserNoActivityTimeout: 30000
  });

};
