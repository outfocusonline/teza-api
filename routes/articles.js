const express = require('express');

// Bring in models
const Article = require('../models/articles');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if(err) console.log(err);
    res.json({
      title: "Articles",
      articles: articles
    });
  });
});

module.exports = router;
