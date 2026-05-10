module.exports = {
  default: {
    require: ['steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    paths: ['features/**/*.feature'],
    dryRun: false,
    failFast: false,
    parallel: 1,
  },
};
