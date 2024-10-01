import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from  "./models/Posts.js";
import { posts, users} from "./data/index.js"

//config
const app = express();
app.use(express.json({limit: "30mb", extended: true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(helmet());
app.use(
    helmet({
      crossOriginEmbedderPolicy: false, // Disable the problematic header
      // You can configure other Helmet policies here as well
    })
  );  
app.use(cors())
app.use(morgan("common"))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use('/assets', express.static(path.join(__dirname, "public/asserts")));

//File Storage

const storage = multer.diskStorage({
    destination: function(req, path, cb ) {
        cb(null, "public/asserts")
    }, 
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

//Routers with file

app.post('/auth/register', upload.single("picture"), register)
app.post("/posts", verifyToken , upload.single("picture"), createPost);

//Routes 

app.use('/auth', authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes)

//mongoose setup
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log("Server is running on 3000🔥"))
    // Post.insertMany(users);
    // User.insertMany(posts);

}).catch((error) => {
    console.log(error);
})
