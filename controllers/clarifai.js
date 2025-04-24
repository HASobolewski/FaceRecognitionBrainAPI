const handleClarifai = (req, res) => {
	const { input } = req.body;
  const PAT = process.env.PAT;
  const USER_ID = process.env.USER_ID;
  const APP_ID = process.env.APP_ID;
  const MODEL_ID = process.env.MODEL_ID;
  const IMAGE_URL = input;
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  fetch('https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs', requestOptions)
  .then(response => response.json())
  .then(result => res.json(result))
	.catch(() => res.status(400).json('Something went wrong'));
};

module.exports = {handleClarifai};