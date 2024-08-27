// Import the SeaRoutes API library
import searoutesDocs from '@api/searoutes-docs';

// Authenticate with the SeaRoutes API using your API key
searoutesDocs.auth('0HRbbXZyd93PgEq5gfrP2rg1ibxzEhP6O46Tldu6');

// Asynchronous function to fetch and log the vessel's position and information
async function getVesselPosition() {
  try {
    // Make an API call to get vessel position data for the specified IMO number
    const response = await searoutesDocs.getVesselPosition({ imo: '9439620' });

    // Log the full response from the API for debugging purposes
    console.log('Full response:', response);

    // Extract the vessel information from the API response
    const vesselInfo = response.data[0].info;
    const vesselPosition = response.data[0].position;

    // Log the vessel's basic information
    console.log('Vessel Information:');
    console.log(`IMO: ${vesselInfo.imo}`);  // International Maritime Organization (IMO) number
    console.log(`Name: ${vesselInfo.name}`); // Name of the vessel
    console.log(`Length: ${vesselInfo.length}`); // Length of the vessel
    console.log(`Width: ${vesselInfo.width}`); // Width of the vessel

    // Log the vessel's position information
    console.log('Vessel Position:');
    console.log('Type:', vesselPosition.type);  // Type of position data (e.g., point, polygon)
    console.log('Properties:', vesselPosition.properties); // Additional properties of the position
    console.log('Geometry:', vesselPosition.geometry); // Geometric data like coordinates

  } catch (err) {
    // Handle any errors that occur during the API call
    console.error('Error fetching vessel position:', err);
  }
}

// Call the function to execute the API request and log the data
getVesselPosition();
