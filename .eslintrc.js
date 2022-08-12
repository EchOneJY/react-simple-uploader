module.exports = {
  // Umi 项目
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-case-declarations': 'off',
    'react/button-has-type': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
