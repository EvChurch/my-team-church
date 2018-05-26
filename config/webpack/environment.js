const { environment } = require('@rails/webpacker')

const assets =  require('./loaders/assets');
const babel =  require('./loaders/babel');
const erb =  require('./loaders/erb');
const graphqlTag =  require('./loaders/graphql-tag');
const html =  require('./loaders/html');
const sass =  require('./loaders/sass');

environment.loaders.append('assets', assets)
environment.loaders.append('babel', babel)
environment.loaders.append('erb', erb)
environment.loaders.append('graphql-tag', graphqlTag)
environment.loaders.append('html', html)
environment.loaders.append('sass', sass)

module.exports = environment
