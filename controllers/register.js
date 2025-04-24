const handleRegister = (db, bcrypt) => (req, res) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('Incorrect form');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx
		.returning('email')
		.insert({
			email: email,
			hash: hash
		})
		.into('logins')
		.then(loginEmail => 
			trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0].email,
				joined: new Date(),
				name: name
			})
			.then(user => res.json(user[0]))
		)
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(() => res.status(400).json('Unable to register'));
};

module.exports = {
	handleRegister: handleRegister
};