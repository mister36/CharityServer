const express = require("express");
const morgan = require("morgan");
const gnews = require("google-news-json");
const axios = require("axios");
const scraper = require("./scraper");

const app = express();

// logging
app.use(morgan("dev"));

// stores category and associated query
const queryMapper = {
  gun_violence: "gun violence",
  poverty: "poverty",
  politics: "politics",
  covid: "covid",
  hunger: "hunger",
  civil_rights: "civil rights",
  natural_disaster: "natural disaster",
  conflict: "conflict",
  lgbt: "lgbt",
  racism: "racism",
};

app.get("/headlines", async (req, res) => {
  let headlines = [];
  let orgs = [];

  //   grabs news from google news
  //   TODO: Find use for rest of news info
  news = await gnews.getNews(gnews.TOP_NEWS, null, "en-US");
  items = news.items;

  //  adds news headline to array
  // find organization from headline
  for (item of items) {
    headlines.push(item.title);

    // gets category from headline
    const nlp = await axios.post("http://localhost:5005/model/parse", {
      text: item.title,
    });

    const category = nlp.data.intent.name;

    //   nothing if category is "other" or "nlu_fallback"
    if (category !== "other" && category !== "nlu_fallback") {
      //   gets query from category
      let query = queryMapper[category];

      let scraperResults = await scraper(query);
      // console.log(scraperResults);
      //   looks up charities, saves to array
      orgs.push(scraperResults);
    }
  }

  // enables cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // sends
  res.send({ headlines, orgs });
});

// start server
app.listen(4000, () => {
  console.log("Charity listening on port 4000");
});
