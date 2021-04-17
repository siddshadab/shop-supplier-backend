require('dotenv').config()
const env_dev=require('./env_dev.json');
const env_prod =require('./env_prod.json');
const env_local =require('./env.json');

const loadEnvVariable = envName => {
  var env
  if(envName === "dev"){
    env = env_dev;
}else if(envName === "prod"){
    env = env_prod;
}else{
    env =env_local;
}
  if (env == null) {
    throw new Error(`Environment variable => ${envName} is undefined.`);
  }
  return env;
};

const config = {
  APP: {
    PORT:  loadEnvVariable(process.env.ENV).PORT || 8080,    
  },
  DB:{
    username:  'username' || 'username',
    pswd:  'pswd' || 'pswd',
    mongoDBHost:  'mongoDBHost' || 'mongoDBHost',
  }   
};


module.exports = config;
