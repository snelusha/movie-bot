const axios = require("axios").default;

module.exports = {
  name: "search",
  aliases: ["tv"],
  description: "Search what you want!",
  enabled: true,
  execute: async (client, message, args) => {
    const query = encodeURI(args.join(" "));
    const url = `https://api.themoviedb.org/3/search/tv?api_key=a7575750860ce28cfd1be68d1fd54890&query=${query}`;
    const response = await axios.get(url);
    const movie = response.data.results[0];
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
          description: movie.overview,
          thumbnail: {
            url: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
          },
          image: {
            url: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
          },
          fields: [
            {
              name: "ID",
              value: movie.id,
              inline: true,
            },
            {
              name: "LNG",
              value: movie.original_language?.toUpperCase(),
              inline: true,
            },
            {
              name: "First release",
              value: movie.first_air_date,
              inline: true,
            },
          ],
        },
      ],
    });
  },
};
