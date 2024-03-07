const express = require('express');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
const PORT = 3002;

const secretKey = 'rahasia';

const users = [];


// authentication middleware
app.use((req, res, next) => {
    const { cookies } = req;
    // console.log(cookies);

    if (!cookies || !cookies.token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(cookies.token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});

app.post('/register', (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const id = uuid.v4();
    const session_exp = Math.floor(Date.now() / 1000) + 3600;

    const user = { id, username, session_exp };
    users.push(user);

    const token = jwt.sign(user, secretKey);
    // console.log(token);
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ id, username, session_exp });
});

app.get('/user', (req, res) => {
    const { id, username, session_exp } = req.user;
    res.json({ id, username, session_exp });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
