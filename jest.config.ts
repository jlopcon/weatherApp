import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.scss$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "\\.css$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["/node_modules/(?!your-package-to-transform)/"],
};

export default config;
