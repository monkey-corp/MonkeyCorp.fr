//TODO
import express from 'express'
import About from './model/About.ts'

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
