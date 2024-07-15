const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash =require("connect-flash")


const sessionOptions = {
    secret: "mysupersecretstring", reverse: false, saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/registre",(req,res)=>{
    let {name ="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","welcome to my site")
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.send(`hllo , ${req.session.name}`);
});
// app.get ("/test",(req,res)=>{
//     res.send("test successful");
// })
// const cookieParser= require("cookie-parser");
// app.use(cookieParser("secretcode"));

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello",{signed:true});
//     res.send("sent you some cookies");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.cookies);
//     res.send("verified");
// })

// app.get("/greet", (req, res) => {
//     let{name="anonymous"}=req.cookies;
//     res.send(`hi,${name} `);
// });

// app.use("/users", users);
// app.use("/posts", posts);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
