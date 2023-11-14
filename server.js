//importazione express
const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/post");

dotenv.config();

//istanza di express
const app = express();

//configurazione per file statici
app.use(express.static("public"));


//rotte per pizza
app.use("/", postsRouter);



// Avviamo il server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});