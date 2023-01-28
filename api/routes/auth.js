const router= require("express").Router()

const User= require("../models/User")
const bcrypt= require("bcrypt")
// REGISTER

router.post("/register", async(req,res)=>{
    try {
        const salt= await bcrypt.genSalt(10);  // bcrypt
        const hashedPass= await bcrypt.hash(req.body.password, salt)   // bcrypt

        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user= await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})



// LOGIN
router.post("/login", async(req,res)=>{
    try {
        const user= await User.findOne({username: req.body.username})
        if(!user){
            res.status(400).json("Wrong credentials user do not exist")
        }
            const validated= await bcrypt.compare(req.body.password, user.password)
            if(!validated){
                res.status(400).json("Wrong credentials")
            }
            const{password,...others}= user._doc
            res.status(200).json(others)
        
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports=router