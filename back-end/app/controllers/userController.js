const UserOne = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")

const userController = {}

userController.register = (req,res) => 
{
    const body = req.body
    UserOne.findOne({"email":body.email})
        .then((user) => 
        {
            if(!user)
            {
                const user = new UserOne(body)
                bcrypt.genSalt()
                    .then((salt) => 
                    {
                        bcrypt.hash(user.password,salt)
                            .then((encryptedPassword) => 
                            {
                                user.password = encryptedPassword
                                user.save()
                                    .then((user) => 
                                    {
                                        res.json(user)
                                    })
                                    .catch((err) => 
                                    {
                                        res.json(err)
                                    })
                            })
                    })
            }
            else
            {
                res.json("User already exists")
            }
        })
        .catch((err) => 
        {
            console.log(err)
        })
    
}
userController.login = (req,res) => 
{
    const body = req.body
    UserOne.findOne({"email":body.email})
        .then((user) => 
        {
            if(!user)
            {
                res.json("Invalid email or password")
            }
            else
            {
                bcrypt.compare(body.password,user.password)
                    .then((match) => 
                    {
                        if(!match)
                        {
                            res.json("Invalid email or password")
                        }
                        else
                        {
                            const data ={
                                id:user._id,
                                name:user.name,
                                email:user.email
                            }
                            const token = jwt.sign(data,"app1",{expiresIn:"1d"})
                            res.json({
                                "token":`Bearer ${token}`
                            })
                        }
                    })
                    .catch((err) => 
                    {
                        res.json(err)
                    })
            }
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.show = (req,res) => 
{
    const id = req.user.id
    UserOne.findById(id)
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.update = (req,res) => 
{
    const id = req.user.id
    const body = req.body
    UserOne.findByIdAndUpdate(id,body,{new:true})
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.display = (req,res) => 
{
    const id = req.user.id
    UserOne.findById(id)
        .then((ele) => 
        {
            res.json(ele)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.showAll = (req,res) => 
{
    UserOne.find()
        .then((users) => 
        {
            res.json(users)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.destroy = (req,res) => 
{
    const id = req.params.id
    UserOne.findByIdAndDelete(id)
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.search = (req,res) =>
{
    const email = req.params.email
    // console.log(email)
    axios.get(`http://localhost:3055/api/app2/search-email/${email}`)
        .then((user) => 
        {
            res.json(user.data)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}
userController.searchUser = (req,res) => 
{
   const email = req.params.email
   UserOne.find({"email":email})
        .then((user) => 
        {
            res.json(user)
        })
        .catch((err) => 
        {
            res.json(err)
        })
}

module.exports = userController