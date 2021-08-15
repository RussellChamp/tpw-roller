const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tpw/'
    : '/',
  preprocess: sveltePreprocess()
}