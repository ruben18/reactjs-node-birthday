import app from "./app.mjs"
const port = 3001

app.listen(port, () => {
    console.log(`Birthday backend API app listening on port ${port}`) 
});