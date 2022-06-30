export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "@shelf/jest-mongodb",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: [
    '**/src/**/*.spec.ts',
  ]
};
