const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")

const userController = {}

userController.register = (req,res) => 
{
    const body = req.body
    const user = new User(body)
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
userController.login = (req,res) => 
{
    const body = req.body
    User.findOne({"email":body.email})
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
    User.findById(id)
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
    User.findByIdAndUpdate(id,body,{new:true})
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
    User.findById(id)
        .then((ele) => 
        {
            res.json(ele)
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
   User.find({"email":email})
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