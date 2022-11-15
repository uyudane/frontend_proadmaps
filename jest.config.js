// jestの設定ファイル

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // jestの設定ファイルがpackage.jsonではなく、このファイルであるという記述
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // node_modulesのディレクトリを指定
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
