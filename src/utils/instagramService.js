/**
 * Servicio para obtener datos de Instagram
 * Nota: Para obtener datos reales de Instagram, necesitarás configurar
 * el Instagram Graph API y obtener un token de acceso.
 * Más información: https://developers.facebook.com/docs/instagram-basic-display-api
 */

// Función para obtener feed de Instagram
// Esta es una implementación de ejemplo que devuelve datos simulados
export const getInstagramFeed = async () => {
  try {
    // En un caso real, aquí harías una llamada a la API de Instagram
    // Por ejemplo:
    // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${process.env.INSTAGRAM_TOKEN}`);
    // const data = await response.json();
    // return data.data;

    // Por ahora, devolvemos datos de ejemplo
    return [
      {
        id: 'post1',
        media_url: './assets/images/mds2022.jpg',
        caption: 'Marathon des Sables 2022 - Una experiencia increíble atravesando el desierto del Sahara.',
        permalink: 'https://www.instagram.com/',
        timestamp: '2022-04-05T10:00:00Z'
      },
      {
        id: 'post2',
        media_url: './assets/images/bilbao.jpeg',
        caption: 'Entrenando por las calles de Bilbao. Preparándome para el próximo desafío.',
        permalink: 'https://www.instagram.com/',
        timestamp: '2023-06-10T14:30:00Z'
      },
      {
        id: 'post3',
        media_url: './assets/images/frankfurt-ironman.jpeg',
        caption: 'Ironman de Frankfurt - Superando límites en cada disciplina.',
        permalink: 'https://www.instagram.com/',
        timestamp: '2023-08-15T09:15:00Z'
      },
      {
        id: 'post4',
        media_url: './assets/images/fire-ice-ultra.jpg',
        caption: 'Fire & Ice Ultra - La belleza salvaje de Islandia pone a prueba tu resistencia.',
        permalink: 'https://www.instagram.com/',
        timestamp: '2023-09-20T11:45:00Z'
      },
      {
        id: 'post5',
        media_url: './assets/images/perfil.jpg',
        caption: 'Compartiendo conocimientos sobre arquitectura de software en el último meetup tecnológico.',
        permalink: 'https://www.instagram.com/',
        timestamp: '2023-10-05T16:20:00Z'
      },
      {
        id: 'post6',
        media_url: './assets/images/placeholder-race.jpg',
        caption: 'Nuevas metas, nuevos horizontes. Siempre mirando hacia adelante.',
        permalink: 'https://www.instagram.com/',
        timestamp: '2023-11-12T08:30:00Z'
      }
    ];
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    throw new Error('No se pudieron cargar las publicaciones de Instagram. Por favor, inténtalo de nuevo más tarde.');
  }
};