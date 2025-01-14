import api from '../api/api';

// export const getLiveAQI = async (zipCode) => {
//   const response = await api.get(`/aqi/live/${zipCode}`);
//   return response.data; // Replace with actual API data
// };

export const getLiveAQI = async (zipCode) => {
  // Temporarily hard-code AQI data for testing purposes
  const hardCodedData = {
    data: {
      aqi: 45, // Example AQI value
      components: {
        pm2_5: 12.3,  // Example PM2.5 level
        pm10: 15.8,   // Example PM10 level
        co: 0.3,      // Example CO level
        no2: 0.4,     // Example NO2 level
        so2: 0.2,     // Example SO2 level
        o3: 0.1       // Example Ozone level
      },
      city: {
        name: 'Cupertino',
        state: 'CA',
        country: 'USA'
      }
    }
  };

  // Return hardcoded data for now
  return hardCodedData.data;
};
