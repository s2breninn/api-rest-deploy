import app from './app'

const port = 5555 ?? process.env.PORT

app.listen(port, () => {
  console.log(`https://localhost:${port}`)
})