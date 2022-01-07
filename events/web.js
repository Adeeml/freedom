const web = require('express');

const app = web()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Test app listening at https://${process.env.WEB}\:${port}`)
})