const db = require("../server/config/mongodb");
const cors = require("cors");
const express = require('express');
const userApi = require("../server/routes/users");
const teamApi = require("../server/routes/teams");
const projectApi = require("../server/routes/projects");



const app = express();

// connects to db
db.connectMongodb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mount apiRouter on app

app.use('/v1', userApi);
app.use('/v1', teamApi);
app.use('/v1', projectApi);


app.listen(process.env.PORT || 8080, () => console.log('server running'));
