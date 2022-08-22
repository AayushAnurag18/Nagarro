const db = require("../config/dbConfig");

module.exports.searchProfile = (req, res) => {
    const { query } = req.query;
    db.query(`select name, username, avatar, id from ${process.env.DB_SCHEMA}.user where name like "%${query}%" or username like "%${query}%" or email like "%${query}%" limit 10`)
    .then(result => {
        // console.log(result.data);
        res.send(result.data);
    })
    .catch(err => {
        console.log(err);
    });
}