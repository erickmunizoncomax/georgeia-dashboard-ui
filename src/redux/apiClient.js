import axios from 'axios';

const client = axios.create({
  // baseURL: 'http://localhost:8080/'
  baseURL: 'https://georgiadashboardapi-wckqd7o3eq-uw.a.run.app/'
  //UAT_NEW_URL
  // baseURL: 'https://uat.sfps.executivedashboard.innive.com/'

  //dev URL
  // baseURL: 'https://snowflakeaustinapi-wckqd7o3eq-uw.a.run.app/'
  
  //UAT URL
  // baseURL: 'https://snowflakeaustinapiuat-wckqd7o3eq-uw.a.run.app/'
});

export default client;
