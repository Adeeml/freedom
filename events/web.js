const express = require('express');
// const { port } = require('./config.json');

const app = express();

app.get('/', (request, response) => {
	return response.sendFile('/workspace/web/index.html');
});

app.listen(port, () => console.log(`App listening at http://localhost:${process.env.PORT}`));