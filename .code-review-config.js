module.exports = {
  directories: {
    models: 'app/db/models',
    routes: 'app/server',
    reducers: 'app/reducers',
    components: 'app/background'
  },
  exclude: [
    'Jokes.jsx',
    'Jokes.test.jsx',
    'auth.js',
    'out.js',
  ],
  reduxStore: 'app/background/store.js',
  dbInstance: 'app/db/index.js',
}