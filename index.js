const express = require("express");
const PORT = 6969;

const app = express();

app.listen(PORT, "0.0.0.0", () => { 
    console.log(`Server is live on port : ${PORT}`);
});