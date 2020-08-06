const express = require("express");
const bountiesRouter = express.Router();
const Bounty = require('../models/bounty')

// Get all and post
bountiesRouter
    .route("/")
    .get((req, res, next) => {
        Bounty.find((err, bounties) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bounties)
        })
    })
    .post((req, res, next) => {
        const newBounty = new Bounty(req.body);
        newBounty.save((err, savedBounty) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedBounty);
        })
    });

// Get one
bountiesRouter.get("/:bountyId", (req, res, next) => {
    // const bountyId = req.params.bountyId;
    // const foundBounty = bounties.find((bounty) => bounty._id === bountyId)
    // if(!foundBounty) {
    //     const error = new Error(`The item with id ${bountyId} found.`)
    //     res.status(500)
    //     return next(error)
    // };
    // res.status(200).send(foundBounty);
    Bounty.find({_id: req.params.bountyId}, (err, bounty) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounty)
    })
});

// Get by type
bountiesRouter.get("/search/faction", (req, res, next) => {
    Bounty.find({faction: req.query.faction}, (err, bounties) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
});

//Delete one
bountiesRouter.delete("/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({_id: req.params.bountyId}, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully removed the bounty on ${deletedItem.firstName} ${deletedItem.lastName}`)
    })
})

//Update one
bountiesRouter.put("/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate(
        {_id: req.params.bountyId}, 
        req.body, 
        {new: true},
        (err, updatedBounty) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        }
    )
});

module.exports = bountiesRouter;
