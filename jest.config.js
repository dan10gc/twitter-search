// jest.config.js
module.exports = {
    // [...]
    // Replace `ts-jest` with the preset you want to use
    // from the above list
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
  }