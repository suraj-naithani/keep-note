require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./utils/db');
const router = require('./router/auth-router');
const noteRouter = require('./router/note-router');

const corsOptions = {
    origin: "keep-notes-apk.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', router);
app.use('/api/note', noteRouter);

const PORT = process.env.PORT;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    })
})
