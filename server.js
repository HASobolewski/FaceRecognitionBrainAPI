const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const clarifai = require('./controllers/clarifai');

const db = knex({
	client: 'pg',
	connection: {
 		connectionString: process.env.DATABASE_URL,
   		ssl: {
    		rejectUnauthorized: false
  		}
 	}
});

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.put('/image', image.handleImage(db));

app.post('/clarifai', clarifai.handleClarifai);

app.listen(process.env.PORT);