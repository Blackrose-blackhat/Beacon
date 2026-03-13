import express from "express"

const app = express()

app.use(express.json())

app.post("/spans", (req, res) => {
  console.log("\n✅ SPAN RECEIVED:")
  console.log(JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})

app.listen(4444, () => {
  console.log("🚀 Ingestion server running on http://localhost:4444")
})
