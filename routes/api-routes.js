const db = require('../models');

module.exports = function(app) {

    app.get('/api/workouts', (req, res) => {
        // db.Workout.find({}).then(dbWorkout => {
        //     res.json(dbWorkout);
        // })
        // .catch(err => {
        //     res.status(400).json(err);
        // });
        db.Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }]) .then(dbWorkout => 
            {
                res.json(dbWorkout)
                        }) 
                        .catch(err => {
                            res.status(400).json(err);
                        })
    })

    app.get('/api/workouts/range', ({}, res) => {
    // db.Workout.find({}).then((dbWorkout) => {
    //     res.json(dbWorkout);
    // }).catch(err => {
    //     res.status(400).json(err);
    // });
        db.Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }]).sort({_id: -1}).limit(7)
        .then(dbWorkout => 
            {
                res.json(dbWorkout)
                        }) 
                        .catch(err => {
                            res.status(400).json(err);
                        })
});

    app.post('/api/workouts', (req, res) => {
        db.Workout.create(req.body).then((dbWorkout) => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
    });

    app.put('/api/workouts/:id', (req, res) => {
        db.Workout.findByIdAndUpdate(
            req.params.id, { $push: { exercises: req.body }}
        ).then((dbWorkout) => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
    });
    };