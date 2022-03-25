const getGoals = (req, res) => {
    res.status(200).json({message: "get goal"})
}

const setGoal = (req, res) => {
    if(!req.body.text) {
        res.status(400).json({message: "Goal is required"});
    }
    res.status(201).json({message: "goal created"})
}

const updateGoal = (req, res) => {
    res.status(200).json({message: `updated goal ${req.params.id}`})
}

const deleteGoal = (req, res) => {
    res.status(200).json({message: `deleted goal ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};