
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  
  
  
  res.redirect( '/unzip?entry=./data/book1.zip' );
};
