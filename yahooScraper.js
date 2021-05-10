const axios = require("axios");
const cheerio = require("cheerio");

const scraper = async () => {
  let headlines = [];
  let images = [];
  try {
    // gets news
    const results = await axios.get("https://news.yahoo.com/rss");

    const $ = cheerio.load(results.data, {
      xml: {
        normalizeWhitespace: true,
      },
    });

    // pushes headlines into array
    $("title").each((i, link) => {
      if (i > 1) {
        headlines.push(link.children[0].data);
      }
    });

    // put image links in array
    images = results.data.match(/\bhttps:\/\/s\.yimg\.com.+?"/g);
    images = images.map((val) => val.slice(0, -1));
    images.splice(3, 0, null); // NOTE: Hardcoding since palestinian article has no image
  } catch (error) {
    console.log(error);
  } finally {
    console.log(images);
    return { headlines, images };
  }
};

scraper();
