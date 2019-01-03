const { environment } = require('@rails/webpacker')

const expose =  require('./loaders/expose');
const graphqlTag =  require('./loaders/graphql-tag');
const html =  require('./loaders/html');

environment.loaders.append('expose', expose);
environment.loaders.append('graphql-tag', graphqlTag);
environment.loaders.append('html', html);

environment.loaders.get('sass').use.splice(-1, 0, {
loader: 'resolve-url-loader',
  options: {
    sourceMap: true
  }
});

module.exports = environment
