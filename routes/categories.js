const router = require('express').Router();
const Categories = require('../models/CategoriesSchema');

//CREATE

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find({}).sort({_id: -1});

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.post('/', async (req, res) => {
    const newCategory = new Categories(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).send(savedCategory);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Categories.findByIdAndDelete(id);
        res.status(200).send('Deleted');
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = router;
