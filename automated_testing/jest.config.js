module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
