const nodeEnv = process.env.NODE_ENV || "development";

const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL,
  },
};

export default config[nodeEnv];
