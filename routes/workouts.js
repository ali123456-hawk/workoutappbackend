const express = require('express');
const {createWorkout,
         getAllWorkouts,
            getAWorkout,
                deleteAWorkout,
                    updateAWorkout} = require('../controllers/WorkoutControllers');
const requireAuth = require('../middleware/requireAuth')



const router = express.Router();

router.use(requireAuth)

router.get('/',getAllWorkouts)

router.get('/:id',getAWorkout)


router.post('/',createWorkout)


router.delete('/:id',deleteAWorkout)


router.patch('/:id',updateAWorkout)




module.exports = router;