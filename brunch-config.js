module.exports = {
  files: {
    javascripts: {
      joinTo: 'app.js'
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },
  paths: {
    public: 'static',
    watched: [ 'src' ]
  },
  plugins: {
    sass: {
      mode: 'native'
    }
  }
};
