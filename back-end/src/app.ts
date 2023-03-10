import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import EventRoutes from "./routes/eventRoutes"
import userRoutes from "./routes/userRoutes"
import searchRoutes from "./routes/searchRoutes"

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const cors = require('cors');
const corsOptions = {
    origin: [ 'http//localhost:3001', 'http//localhost:3000' ]
};

app.use(cors(corsOptions));

// routes
app.use("/api/scheduledevents", EventRoutes)
app.use("/api/user", userRoutes)
app.use("/api/scheduledevents/search", searchRoutes)


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});
// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3001);