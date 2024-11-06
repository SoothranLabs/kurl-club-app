module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 72],
    'subject-empty': [2, 'never'],
  },
};
