import express from 'express';
import cors from 'cors';
import FileUpload from "express-fileupload";
import UserRoute from './routes/Route.js';
import db from './config/database.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);

db.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running`);
    });
})
.catch(error => {
    console.error('Error syncing the database:', error);
});
