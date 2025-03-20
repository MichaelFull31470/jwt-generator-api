const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const { api_key, api_secret, workspace_id } = req.query;

  if (!api_key || !api_secret || !workspace_id) {
    return res.status(400).json({ error: 'Missing params' });
  }

  const token = jwt.sign(
    {
      iss: api_key,
      sub: workspace_id,
      exp: Math.floor(Date.now() / 1000) + 3600
    },
    api_secret,
    { algorithm: 'HS256' }
  );

  res.status(200).json({ token });
};
