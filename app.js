const express = require("express");
const morgan = require("morgan");
const gnews = require("google-news-json");

const app = express();

// logging
app.use(morgan("dev"));

app.get("/headlines", async (req, res) => {
  news = await gnews.getNews(gnews.TOP_NEWS, null, "en-US");
  res.send(news);
});

// start server
app.listen(3000, () => {
  console.log("Charity listening on port 3000");
});
