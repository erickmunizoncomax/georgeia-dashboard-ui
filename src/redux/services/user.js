import client from '../apiClient'; 

export const getNetSales = (body) => {
  // return client.post('/data-router/data/mssql/search', body)
  // return client.post('snowflake/data/search', body)
  return client.post('/api/search', body)
}