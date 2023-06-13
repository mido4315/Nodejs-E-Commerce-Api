const express = require("express");
const authRouter = require('./routes/auth');
const PORT = 6969;

const app = express();
app.use(authRouter);
app.listen(PORT, "0.0.0.0",() => { 
    console.log(`Server is live on port : ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("hello people this is my first nodejs app");
})