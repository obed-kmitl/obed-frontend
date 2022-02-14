const nodeEnv = process.env.REACT_APP_NODE_ENV || "development";

const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '1075818370617-olki93anh4mfpcasj4chcb9seci5leqj.apps.googleusercontent.com'
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '1075818370617-olki93anh4mfpcasj4chcb9seci5leqj.apps.googleusercontent.com'
  },
};

export default config[nodeEnv];
