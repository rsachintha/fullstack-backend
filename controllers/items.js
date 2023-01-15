const asyncHandler = require('express-async-handler')

const Item = require('../models/itemModel')

//Get all items
const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find()

    res.status(200).json(items)
})

//Add new item
const createItem = asyncHandler(async (req, res) => {
    const item = await Item.create({
        user: req.user.id,
        _id: req.body._id,
        itemName: req.body.itemName,
        itemDesc: req.body.itemDesc,
        supplier: req.body.supplier,
        quantity: req.body.quantity
    })

    res.status(200).json(item)
})

//Get stats
const getStats = asyncHandler(async (req, res) => {
    const count = await Item.count()
    const max = await Item.findOne().sort({ quantity: -1 })
    const min = await Item.findOne().sort({ quantity: +1 })

    res.status(200).json({
        Count: count,
        Max: max,
        Min: min
    })
})


//Get a specific iitem
const getItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if (!item) {
        res.status(400)
        throw new Error('Item not found!')
    }

    res.status(200).json(item)
})

//Delete a specific item
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if (!item) {
        res.status(400)
        throw new Error('Item not found!')
    }

    await item.remove()

    res.status(200).json({ id: req.params.id })
})

//Update a specific item
const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if (!item) {
        res.status(400)
        throw new Error('Item not found!')
    }

    const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        { $set: { itemName: req.body.itemName, itemDesc: req.body.itemDesc, supplier: req.body.supplier, quantity: req.body.quantity } },
        { new: true },
    )

    res.status(200).json(updatedItem)
})

module.exports = {
    getItems,
    createItem,
    getItem,
    deleteItem,
    updateItem,
    getStats
}