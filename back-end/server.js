const express = require('express');
var cors = require('cors');
const db = require('./database');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

require('dotenv').config();

const User = require('./route/user');
const Ticket = require('./route/ticket');
const Comment = require('./route/comment');

app.use(cors());
app.use(express.json());
app.use(db_connect); // Custom middleware to check if DB is available of not

/* 

API :
Ticket CRUD 
Comments CRUD 
POST: Login User
GET: ticket summary
GET: allTickets

*/
app.use('/user', User);
app.use('/ticket', checkAuth, Ticket);
app.use('/comment', checkAuth, Comment);

app.get('/', (req, res) => {
    res.send('Imagine api doc here');
});

app.listen(port);

function db_connect(req, res, next) {
    db.authenticate()
        .then(() => {
            console.log('Database Connected');
            next();
            return;
        })
        .catch((err) => {
            console.log('Error ', err);
            res.json({
                status: 'error',
                message: 'error occurred while connecting with database',
                data: {},
            });
            res.end();
        });
}

function checkAuth(req, res, next) {
    // Verify JWT here
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                status: 'error',
                message: 'JWT auth failed',
                data: {},
            });
            return;
        }

        req.user = user;

        next();
    });
}
