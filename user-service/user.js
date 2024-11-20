const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const users = [{
    user_id: 1, username: "deadpool", email:"dead34@gamil.com"
},
{
     user_id: 2, username: "spider", email:"spider34@gamil.com"
}
];

app.post("/notify",(req,res)=>{
    const {user_id, message} = req.body;

    if(!user_id || !message)
    {
        return res.status(400).json({error:"missing required filed userId or message"});
    }

    const user = users.find((u)=>u.user_id===user_id);

    if(!user){
        return res.status(404).json({error:" user not found"});
    }

    console.log(`notifying ${user.username}: ${message}`);

    res.status(200).json({message:"user notified successfully"});

})

app.listen(4000,()=>{
    console.log("userservice is running at port 4000");
})