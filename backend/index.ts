import express from 'express';
import { connectMongoose } from './db'; 
import cors from "cors";
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import authorization from './middleware/authorization';
import workspaceRouter from './routes/workspaceRoutes';



const app = express();

app.use(cors({
  origin:'*',
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
connectMongoose();

//Routes
app.use("/user", userRouter);
app.use("/workspace",authorization, workspaceRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
