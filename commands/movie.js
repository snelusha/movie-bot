const axios = require("axios").default;

module.exports = {
  name: "movie",
  aliases: ["m"],
  description: "Search and download any movie!",
  enabled: true,
  execute: async (_, message, args) => {
    const query = encodeURI(args.join(" "));
    const tvhub_url = `https://tvhub.online/api/?name=${query}&apikey=s1232u323d11232u6232p879u23910k3227a544`;
    const tvhub_response = await axios.get(tvhub_url);
    const result = tvhub_response.data;
    if (result.length === 0)
      return message.reply({
        embeds: [
          {
            color: 0xff6347,
            description: "No result found!",
          },
        ],
      });
    const movie_url = `https://api.themoviedb.org/3/search/tv?api_key=a7575750860ce28cfd1be68d1fd54890&query=${query}`;
    const movie_response = await axios.get(movie_url);
    const movie = movie_response.data.results[0];
    if (!movie)
      return message.reply({
        embeds: [
          {
            color: 0xff6347,
            description: "No result found!",
          },
        ],
      });
    message.reply({
      embeds: [
        {
          color: 0x32cd32,
          title: movie.name,
          description: `${movie.overview}\n\n[**Download**](https://tvhub.online/movie_details.php?id=${result.data.id})`,
          thumbnail: {
            url: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
          },
        },
      ],
    });
  },
};
