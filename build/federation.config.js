const dependencies = require('../package.json').dependencies;

const shared = {
  vue: {
    eager: true,
    requiredVersion: dependencies.vue,
    singleton: true
  },
  'vue-router': {
    requiredVersion: dependencies['vue-router'],
    singleton: true
  },
  "@icons8/design-system": {
    requiredVersion: dependencies['@icons8/design-system']
  }
};

const federationConfig = ({ isServer }) => {
  return {
    name: 'shell',
    remotes: {
      'auth': isServer
        ? 'auth@http://localhost:3002/node/remoteEntry.js'
        : 'auth@http://localhost:3002/web/remoteEntry.js'
    },
    shared
  };
};

module.exports = { federationConfig };
