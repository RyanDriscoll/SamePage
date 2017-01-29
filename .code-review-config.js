module.exports = {
  directories: {
    models: 'db/models',
    routes: 'server',
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
  dbInstance: 'db/index.js',
}