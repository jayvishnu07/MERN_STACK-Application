const express = require('express')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/mern')
    .then(() => { console.log("Connected to Database...") })
    .catch((err) => { console.log(err) });

const schema = mongoose.Schema({
    title: String,
    description: String,
    time : String
})

const Todo = mongoose.model('Todo', schema)

app.get('/', (req, res) => {
    res.send("Hello World...");
})

app.get('/all-todos', (req, res) => {
    Todo.find()
    .then((item) => res.json(item))
})


app.post('/create-todo', async (req, res) => {
    // console.log(req.body);
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            time : req.body.time
        })
        const result = await todo.save();
        // console.log(result);
    } catch (error) {
        console.log(error.message);
    }
})
+
app.put('/update-todo', (req, res) => {
        console.log("gong...",req.body);
        Todo.findByIdAndUpdate(req.body._id,{
            title : req.body.title,
            description : req.body.description
        })
        .then((res)=>console.log(res))
        .catch((err)=>{console.log(err)})
})

app.delete('/delete-todo/:id',(req,res)=>{
    // console.log(req.params.id);
    Todo.findByIdAndDelete(req.params.id)
    .then(
        // (res)=>console.log(res)
        )
    .catch((err)=>console.log(err.message))
})


app.listen(8080, () => { console.log("server is running...") })