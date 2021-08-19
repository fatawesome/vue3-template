const dependencies = require('../package.json').dependencies;

const shared = {
  vue: {
    requiredVersion: dependencies.vue,
    singleton: true,
    eager: true
  },
  'vue-router': {
    requiredVersion: dependencies['vue-router'],
    singleton: true,
    eager: true
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
