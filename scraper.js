const axios = require("axios");
const cheerio = require("cheerio");

const scraper = async (query) => {
  const queryPlus = query.replace(" ", "+"); // makes query suitable for web searching
  try {
    const results = await axios.get(
      `https://www.charitynavigator.org/index.cfm?keyword_list=${queryPlus}&bay=search.results`
    );

    const $ = cheerio.load(results.data);

    $(".search-tr").each((i, link) => {
      console.log(link.attribs["aria-label"]);
    });
    // console.log($(".search-tr").attr());
  } catch (error) {
    console.log(error);
  }
};

scraper("violence");
