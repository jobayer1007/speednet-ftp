const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '4ff10c348f8701f439589e825ee25052',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
