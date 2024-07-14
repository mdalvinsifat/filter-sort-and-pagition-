const express = require('express');
const cors = require("cors");
const ConnectDB = require('./Connect/Connect');
const router = require('./Routes/routes');
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(cors())


ConnectDB()
const PORT = 3000;
app.use("/", router)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
