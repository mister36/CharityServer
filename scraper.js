const axios = require("axios");
const cheerio = require("cheerio");

const scraper = async (query) => {
  let orgs = []; // organizations that are found
  const queryPlus = query.replace(" ", "+"); // makes query suitable for web searching
  try {
    const results = await axios.get(
      `https://www.charitynavigator.org/index.cfm?keyword_list=${queryPlus}&bay=search.results`
    );

    const $ = cheerio.load(results.data);

    $(".search-tr").each((i, link) => {
      orgs.push(link.attribs["aria-label"]);
    });
  } catch (error) {
    console.log(error);
  } finally {
    return orgs;
  }
};

// scraper("violence");

module.exports = scraper;
