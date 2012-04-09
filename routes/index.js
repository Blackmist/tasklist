var mongoose = require('mongoose')
  , taskModel = require('../models/taskModel.js');

mongoose.connect('mongodb://mongooseserveraddr/tasks');

/*
 * GET home page.
 */

exports.index = function(req, res){
  taskModel.find({}, function(err, items){
  	res.render('index',{title: 'My ToDo List ', tasks: items})
  })
};

exports.updateItem = function (req, res){
	if(req.body.item){
		task = new taskModel();
		task.itemName = req.body.item.name;
		task.itemCategory = req.body.item.category;

		task.save(function(err){
			if(err){
				console.log(err);
			}
		});
	}else{
    for(key in req.body){
    	conditions = { _id: key };
    	update = { itemCompleted: req.body[key] };
    	taskModel.update(conditions, update, function(err){
    		if(err){
    			console.log(err);
    		}
    	});
    }
	}
	res.redirect('home');
}