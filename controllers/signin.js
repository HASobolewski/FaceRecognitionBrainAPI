const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('Incorrect form');
	}
	db
	.select('email', 'hash')
	.from('logins')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			return db
			.select('*')
			.from('users')
			.where('email', '=', email)
			.then(user => res.json(user[0]))
			.catch(() => res.status(400).json('Unable getting user'));
		} else {
			res.status(400).json('Wrong credentials');
		}
	})
	.catch(() => res.status(400).json('Unable to sign in'));
};

module.exports = {
	handleSignin: handleSignin
};