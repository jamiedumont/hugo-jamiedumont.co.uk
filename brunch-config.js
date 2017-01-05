module.exports = {
  paths: {
    public: 'static'
  },
  files: {
    javascripts: {
      joinTo: 'site.js'
    },
    stylesheets: {
      joinTo: 'site.css'
    }
  },
  plugins: {
    // sass-brunch - https://github.com/brunch/sass-brunch
    sass: {
      mode: 'native'
    }
  }
};
