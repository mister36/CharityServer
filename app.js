const express = require("express");
const morgan = require("morgan");
const gnews = require("google-news-json");

const app = express();

// logging
app.use(morgan("dev"));

app.get("/headlines", async (req, res) => {
  let headlines = [];

  //   grabs news from google news
  //   TODO: Find use for rest of news info
  news = await gnews.getNews(gnews.TOP_NEWS, null, "en-US");
  items = news.items;

  //   adds news titles to array
  items.forEach((item) => {
    headlines.push(item.title);
  });

  // enables cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // sends
  res.send({ headlines });
});

// start server
app.listen(4000, () => {
  console.log("Charity listening on port 4000");
});
