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
    // createPostObject(req)

    let newRow = {}
    newRow = req.body
    console.log("new row", newRow)
    console.log("blog list", blogList)
    const addBlog = [newRow, ...blogList]
    // console.log(addBlog)
    // blogList.unshift(newRow)
    blogList = addBlog
    console.log("blog list after unshift", blogList)
    res.render("index.ejs", { bList: addBlog })
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
    // let addBlog = [...blogList]
    // console.log(addBlog)
    blogList.unshift(newRow)
    // blogList = addBlog
    // console.log(blogList)

}
function removePostObject(req) {

    var removeFromList = blogList.filter(blog => {

        return blog.id != req.body.id
    })
    blogList = removeFromList
}

// { title: "Could this really be the case?", body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea ipsa, molestias rerum iste accusamus et fugiat minima rem cumque repellat necessitatibus reprehenderit eligendi distinctio quam? Dicta eius quo tempore, sed deleniti quaerat labore assumenda eum voluptate itaque! Id iusto omnis vitae, quisquam mollitia non sit labore repudiandae assumenda totam dolorem tenetur ullam eaque aut unde ut nam repellat. Voluptas est quisquam autem. Minus velit sed aliquam tempora in eligendi quidem recusandae, quos aspernatur adipisci esse, quasi reiciendis corporis! Numquam ea maiores soluta veritatis cum itaque, reprehenderit unde corrupti dolore voluptates sequi id sit molestiae facere, maxime quisquam doloribus! Accusantium, suscipit.", date: new Date().toLocaleString().split(',')[0], author: "Robert Knippel", id: Math.floor(Math.random() * 100000) },
// { title: "Here is title 2", body: "Here is some lorem ipsum text number 2", date: "11/02/2023", author: "John Frost", id: Math.floor(Math.random() * 100000) }