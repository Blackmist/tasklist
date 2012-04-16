var mongoose = require('mongoose')
  , task = require('../models/task.js');

mongoose.connect('mongodb://mongooseserveraddr/tasks');

/*
 * GET home page.
 */

exports.index = function(req, res){
  task.find({}, function(err, items){
  	res.render('index',{title: 'My ToDo List ', tasks: items})
  })
};

exports.updateItem = function (req, res){
	if(req.body.item){
		newTask = new task();
		newTask.itemName = req.body.item.name;
		newTask.itemCategory = req.body.item.category;

		newTask.save(function(err){
			if(err){
				console.log(err);
			}
		});
	}else{
    for(key in req.body){
    	conditions = { _id: key };
    	update = { itemCompleted: req.body[key] };
    	task.update(conditions, update, function(err){
    		if(err){
    			console.log(err);
    		}
    	});
    }
	}
	res.redirect('home');
}