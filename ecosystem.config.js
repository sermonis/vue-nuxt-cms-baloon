module.exports = {
  apps: [{
      name: 'nuxt',
      port: 3000,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'user-service',
      port: 4000,
      script: './services/user/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
