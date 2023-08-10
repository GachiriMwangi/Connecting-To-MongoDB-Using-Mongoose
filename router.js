const express = require('express')
const router = express.Router()
const Member = require('./create_schema_and_model')
const connectToDb = require('./db')
connectToDb()
router.get('/', async(req, res) => {
    const members = await Member.find()
    if(!members){
    res.status(400).json({msg: 'Members not found.'})
    }else{
         res.json(members)
    }
   
})

//Get a single member 
router.get('/:id', async(req, res) => {
    const findMember = await Member.findById(req.params.id)
    if(findMember){
        res.json(findMember)
    }
    else{
        res.status(400).json({ msg: `Member with id ${req.params.id} not found`})
    }
   })

   //Create a member.
   router.post('/', async(req, res) => {
    const {name, email, status} = req.body
    const newMember = await Member.create({
        name, 
        email, 
        status 
    })
     if(newMember){
        await newMember.save()
        res.json(newMember)
     }
     else{
        res.status(500).json({msg: 'An error occurred while creating the member.'})
     }
   })

   //Update a member 

   router.put('/:id', async(req, res) => {
    const found = await Member.findById(req.params.id)
    if(found){
           const upMember = req.body
          const updated = await Member.findByIdAndUpdate(req.params.id, upMember, {new: true}) 
          if(updated){
await updated.save()
            res.json(updated)
          }
          else{
            res.json({msg: 'Failed to update the member'})
          }
          
        } 
    
    else{
        res.status(200).json({msg: `No member with id ${req.params.id} has been updated.`})
    }

   })


   //Delete a member 
   router.delete('/:id', async(req, res) => {
    const members = await Member.find()
    const memberToDelete = await Member.findByIdAndDelete(req.params.id)
    if(memberToDelete){
        res.json({
            msg: 'Member deleted successfully.', 
            members
          })
    }
    else{
        res.status(400).json({ msg: `Member with id ${req.params.id} not found`})
    }
   })



   module.exports = router