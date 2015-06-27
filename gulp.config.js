module.exports = function() {
  var app            = './app/';
  var assets         = app + 'assets/';
  var report         = './report/';
  var specRunnerFile = 'specs.html';
  var temp           = './.tmp/';
  var wiredep        = require('wiredep');
  var bowerFiles     = wiredep({devDependencies: true})['js'];

  var config = {
    // File paths
    watchFiles: [
      temp + '**/*.{js,css,html}',
      app + '**/*.{js}'
    ],
    alljs: [
      app + '**/*.js',
      './*.js'
    ],
    build: './build/',
    app: app,
    css: temp + '**/*.css',
    fonts: assets + 'fonts/**/*.*',
    htmltemplates: [
      temp + '**/*.html',
      '!' + temp + 'index.html'
    ],
    images: assets + 'images/**/*.*',
    index: app + 'index.jade',
    indexHtml: temp + 'index.html',
    jade: app + '**/*.jade',
    js: [
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],
    report: report,
    sass: app + '**/*.scss',
    temp: temp,

    // Optimized files
    optimized: {
      app: 'app.js',
      vendor: 'vendor.js'
    },

    // Template cache
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'topcoder-account',
        standAlone: false
      }
    },

    // Bower and npm locations
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    },

    // specs.html: our HTML spec runner
    specRunner: app + specRunnerFile,
    specRunnerFile: specRunnerFile,
    testlibraries: [
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'node_modules/mocha-clean/index.js',
      'node_modules/sinon-chai/lib/sinon-chai.js'
    ],
    specs: [app + '**/*.spec.js'],

    // Karma and testing settings
    specHelpers: ['tests/test-helpers/*.js'],
    serverIntegrationSpecs: ['tests/server-integration/**/*.spec.js']
  };

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  config.karma = getKarmaOptions();

  return config;

  ///////////////////

  function getKarmaOptions() {
    var options = {
      files: [].concat(
        bowerFiles,
        config.specHelpers,
        app + '**/*.js',
        temp + config.templateCache.file,
        config.serverIntegrationSpecs
      ),
      exclude: [],
      coverage: {
        dir: report + 'coverage',
        reports: [
          {type: 'html', subdir: 'report-html'},
          {type: 'lcov', subdir: 'report-lcov'},
          {type: 'text-summary'}
        ]
      },
      preprocessors: {}
    };
    options.preprocessors[app + '**/!(*.spec)+(.js)'] = ['coverage'];
    return options;
  }
};
