module.exports = function (api) {
    api.cache(true);
    return {
        sourceType: 'unambiguous',
        presets: ['@nuxt/babel-preset-app'],
        plugins: ['@babel/plugin-proposal-object-rest-spread']
    };
}