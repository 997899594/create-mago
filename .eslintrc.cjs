module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'standard'
    ],
    rules: {
      // 必须加分号
      semi: [2, 'always']
    }
  };
  