var mongoose = require('mongoose')
  , taskModel = require('../models/taskModel.js');

mongoose.connect('mongodb://192.168.1.80/tasksx');

/*
 * GET home page.
 */

exports.index = function(req, res){
  taskModel.find({}, function(err, items){
  	console.log(items);
  	res.render('index',{title: 'My ToDo List ', tasks: items})
  })
};

exports.newItem = function (req, res){
	task = new taskModel();
	task.itemName = req.body.item.name;
	task.itemCategory = req.body.item.category;

	task.save(function(err){
		if(err){
			console.log(err);
		}
		res.redirect('home');
	});
}