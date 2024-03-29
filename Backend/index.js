const connectToMongo = require('./db');
const express = require('express')
const cors =require('cors')
require('dotenv').config({path:"./config/.env"})

connectToMongo();
const app = express()
const port = process.env.PORT || 4001

app.use(cors({origin:process.env.CLIENT_URL}))
app.use(express.json())

// app.use(function(req, res, next) {
//   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   next();
// });

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

