import { ITodoData } from './../src/js/type';
import express, { Application, json } from 'express';
import { readFile, writeFile } from './utils';
const app : Application = express();
app.use(express.urlencoded({ extended : true }))
app.use(express.json());

app.all('*',(req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'POST,GET,PUT,DELETE,OPTIONS');
    next();
});

app.get('/todoList', (req,res) => {
    const todoList : string = readFile('todo.json');
    res.send(todoList);
})

app.post('/toggle', (req,res) => {
    const id : number = parseInt(req.body.id);
    
    let todoList : ITodoData[] = JSON.parse(readFile('todo.json') || '[]');

    todoList = todoList.map((todo : ITodoData) => {
        if(todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo; 
    })

    writeFile('todo.json', todoList);

    res.send({
        msg : 'ok',
        statusCode : 200
    })
})

app.post('/remove', (req,res) => {
    const id : number = parseInt(req.body.id);

    let todoList : ITodoData[] = JSON.parse(readFile('todo.json') || '[]');

    todoList = todoList.filter((todo : ITodoData) => todo.id !== id);

    writeFile('todo.json', todoList);

    res.send({
        msg : 'ok',
        statusCode : 200
    })
})

app.post('/add', (req,res) => {
    const todo : ITodoData = JSON.parse(req.body.todo);

    let todoList : ITodoData[] = JSON.parse(readFile('todo.json') || '[]');

    const isExist = todoList.find((t : ITodoData) => t.content === todo.content);

    if(isExist) {
        res.send({
            msg : 'exist',
            statusCode : 100
        });
        return;
    }

    todoList.push(todo);
    writeFile('todo.json', todoList);
    res.send({
        msg : 'ok',
        statusCode : 200
    })
    

})


app.listen('8888',() => {
    console.log('server running!!');
})

 

