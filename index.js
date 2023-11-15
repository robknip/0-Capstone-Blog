import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

let blogList = []

const port = 3000

const app = express()

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.render("index.ejs", { bList: blogList })
})

app.get('/addblog', (req, res) => {
    res.render('addblog.ejs', { bList: [] })
})

app.post('/submit', (req, res) => {
    // console.log("Req Body line 23", req.body, "Whole blog list", blogList)

    let newRow = {}
    newRow = req.body
    const addBlog = [newRow, ...blogList]
    blogList = addBlog
    // console.log("blog list after unshift", blogList)
    res.render("index.ejs", { bList: addBlog })
})

app.post('/edit', (req, res) => {
    console.log(req.body)
    if (req.body.choice == "trash") {
        removePostObject(req)
    }
    res.render("index.ejs", { bList: blogList })
})

app.post('/trash', (req, res) => {
    removePostObject(req)
    res.render("index.ejs", { bList: blogList })
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})

function createPostObject(req) {
    let newRow = {}
    newRow = req.body
    console.log(blogList)

    blogList.unshift(newRow)


}
function removePostObject(req) {

    var removeFromList = blogList.filter(blog => {

        return blog.id != req.body.id
    })
    blogList = removeFromList
}
