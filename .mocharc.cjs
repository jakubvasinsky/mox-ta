module.exports = {
  color: true,
  parallel: false,
  recursive: true,
  'forbid-only': process.env.CI === 'true',
  'full-trace': true,
  require: ['./src/tests/setup/hooks.ts'],
  loader: 'ts-node/esm',

  extension: ['ts', 'tsx'],

  reporter: 'mocha-multi-reporters',
  'reporter-option': ['configFile=backend.reporter.config.json'],
};
