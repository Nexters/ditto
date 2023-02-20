module.exports = {
  multipass: true,
  plugins: [
    {
      // set of built-in plugins enabled by default
      name: 'preset-default',
      params: {
        overrides: {
          // viewBox is required to resize SVGs with CSS.
          // @see https://github.com/svg/svgo/issues/1128
          removeViewBox: false,
        },
      },
    },

    // enable built-in plugins by name
    'prefixIds',
  ],
};
