const express = require("express");
const { PORT } = require("./config/config");
const startDatabase = require("./database/startDB");

const app = express();

app.use(express.json());

// for handling routes
app.use('/', require('./routes'));


// for handling incorrect routes
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

startDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

