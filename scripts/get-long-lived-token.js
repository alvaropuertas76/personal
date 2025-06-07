const getInstagramLongLivedToken = async (shortLivedToken) => {
  try {
    // Reemplaza APP_ID y APP_SECRET con tus valores
    const APP_ID = 'TU_APP_ID';
    const APP_SECRET = 'TU_APP_SECRET';
    
    const response = await fetch(
      `https://graph.instagram.com/access_token?` +
      `grant_type=ig_exchange_token&` +
      `client_secret=${APP_SECRET}&` +
      `access_token=${shortLivedToken}`
    );

    const data = await response.json();
    console.log('Token de larga duración:', data.access_token);
    console.log('Expira en:', data.expires_in, 'segundos');
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Reemplaza esto con tu token de corta duración
const shortLivedToken = 'TU_TOKEN_CORTA_DURACION';
getInstagramLongLivedToken(shortLivedToken);
