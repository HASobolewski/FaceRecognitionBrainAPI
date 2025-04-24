const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users')
	.returning('entries')
	.increment('entries', 1)
	.where('id', '=', id)
	.then(entries => res.json(entries[0].entries))
	.catch(() => res.status(400).json('Error getting entries'));
};

module.exports = {
	handleImage: handleImage
};