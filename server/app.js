import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));


app.get("/",(req,res)=>{
    res.send("server running...🚀")
});

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
