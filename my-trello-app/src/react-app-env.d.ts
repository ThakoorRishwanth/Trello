/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_API_KEY: string;
      readonly REACT_APP_TOKEN: string;
      // add other environment variables here if needed
    }
  }
  