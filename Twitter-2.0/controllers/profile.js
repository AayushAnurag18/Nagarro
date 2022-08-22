const db = require("../config/dbConfig");

module.exports.getProfile = function (req, res) {
  const { userId } = req.params;
  db.searchByHash({
    table: "user",
    hashValues: [userId],
    attributes: ["*"],
  })
    .then((result) => {
      const userData = result.data[0];
      //   console.log(userData);
      // console.log(req.user);
      const currentUser = typeof req.user === "undefined" ? null : req.user.data[0].id;
      // console.log(currentUser);
      db.query(
        `SELECT u.id as userId, u.avatar as avatar, u.email as email, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.likeCount as likeCount, t.__createdtime__ as tweetTime, l.isLiked as isLiked FROM twitter.tweets as t INNER JOIN twitter.user as u ON u.id = t.userId LEFT OUTER JOIN twitter.tweetLikes as l on t.id = l.tweetId AND l.userId = "${currentUser}" where t.userId = "${userData.id}" ORDER BY t.__createdtime__ DESC` /*LIMIT 10*/
      )
        .then((result) => {
          const tweets = result.data;
          tweets.forEach((tweet) => {
            tweet.tweetTime =
              (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
            if (tweet.tweetTime >= 24) {
              tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + "d ago";
            } else if (tweet.tweetTime < 1) {
              tweet.tweetTime = "less than 1h ago";
            } else {
              tweet.tweetTime = Math.floor(tweet.tweetTime) + "h ago";
            }
          });
          res.render("profile", { userData, tweets, currentUser });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports.getYourProfile = function (req, res) {
  if(req.isAuthenticated()) {
    res.redirect(`/profile/${req.user.data[0].id}`);
  } else {
    res.redirect("/");
  }
}