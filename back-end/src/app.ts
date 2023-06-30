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
app.use(cors());

app.use("/api/scheduledevents", EventRoutes)
app.use("/api/user", userRoutes)
app.use("/api/scheduledevents/search", searchRoutes)
app.use("/", (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    ${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);

    console.dir(req.body)
    res.status(403).send("No auth")
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});
// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

// const httpsServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'privkey.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'fullchain.pem')),
// },
// app
// )

// httpsServer.listen(3100, () => {
//     console.log("Server Started!");
// })

app.listen(3001);