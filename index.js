const express = require('express');
const Joi = require('joi')
const app = express();
app.use(express.json())


const categories = [
    { id: 1, name: 'front-end' },
    { id: 2, name: 'back-end' },
    { id: 3, name: 'dev-ops' },
    { id: 4, name: 'database' },
]

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/categories', (req, res) => {
    res.send(categories);
})


app.get('/api/categories/:id', (req, res) => {
    const categ = categories.find(b => b.id === parseInt(req.params.id))
    if (!categ) {
        res.status(404).send('Malumot Topilmadi')
    }
    res.send(categ)
})

app.post('/api/categories', (req, res) => {
    const schema = {
        name: Joi.string().required().min(3)
    }

    const category = {
        id: categories.length + 1,
        name: req.body.name,
    }

    categories.push(category)
    res.send(category);



})

app.put('/api/categories/:id',(req,res)=>{
    const categ = categories.find(b => b.id === parseInt(req.params.id))
    if (!categ) {
        res.status(404).send('Malumot Topilmadi')
    }

    categ.name = req.body.name;
    res.status(201).send(categ);
})

app.delete('/api/categories/:id',(req,res)=>{
    const categ = categories.find(b => b.id === parseInt(req.params.id))
    if (!categ) {
        res.status(404).send('Malumot Topilmadi')
    }
    
    const catIndex = categories.indexOf(categ);
    categories.splice(catIndex,1)
    res.send(categ)

})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port} ni tinglamoqdaman...`);
})