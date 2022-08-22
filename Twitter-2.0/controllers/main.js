const axios = require("axios");
const _ = require("lodash");

module.exports.getMainPage = (req, res) => {
  if (req.isAuthenticated()) {
    const userData = req.user.data[0];
    // console.log(req.params.page);
    axios
      .get(`${process.env.BASE_URL}/tweet/${userData.id}`)
      .then((result) => {
        const tweets = result.data;
        // console.log(tweets);
        axios.get(`${process.env.BASE_URL}/tweet/trending`)
        .then(trendingResult => {
          const trendingTweets = trendingResult.data;
          // console.log(trendingTweets);
          res.render("main", { page: req.params.page, tweets, userData, trendingTweets, title: _.capitalize(req.params.page) });
        })
        .catch(err => {
          console.log(err);
          res.redirect("/");
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};