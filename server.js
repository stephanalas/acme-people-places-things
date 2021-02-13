const express = require('express');
const {Sequelize, Datatypes, Model, STRING} = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_nouns_db');
const morgan = require('morgan');
const path = require('path');
const app = express();
// const seeder = require('./static/manager');


class Person extends Model{};
class Places extends Model{};
class Things extends Model{};


Person.init({
    name:{
        type: STRING,
        allowNull: false,
    }

},{sequelize:db,modelName:'People'})

Places.init({
    name:{
        type: STRING,
        allowNull: false,
    }

},{sequelize:db, modelName:'Locations'})

Things.init({
    name:{
        type: STRING,
        allowNull: false,
    }

},{sequelize:db, modelName:'Things'})

const seeder = async() => {
    try{
       await db.sync({force:true})
        
        const names = ['moe','lucy','larry'];
        await Promise.all(names.map( name => {
            return Person.create({name})
        }))
        const places = ['NYC','Chicago','LA', 'Dallas'];
        await Promise.all(places.map( name => {
            return Places.create({name})
        }))
        const things = ['foo','bar','bazz','quq'];
        await Promise.all(things.map( name => {
            return Things.create({name})
        }))
    }
    catch(ex){
        console.log(ex);
    }

}

seeder();
express.static(path.join(__dirname,'static'))
// app.use('/', )
app.use(morgan('dev'));
app.get('/', async(req,res,next) => {
    try{
        const people = await Person.findAll();
        const places = await Places.findAll();
        const things = await Things.findAll();

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Acme Nouns</title>
        </head>
        <body>
            <h1>People, Places and Things w/ Dates</h1>
            <div class="list">
                <ul id="people">
                    ${people.map(peep => `<li>${peep.name}</li>`).join('')}
                </ul>
                <ul id="places"></ul>
                <ul id="things"></ul>
            </div>
            <form class="transaction">
                <select name="person" id="person-select">
                    <option value="">-person-</option>
                </select>
                <select name="place" id="place-select">
                    <option value="">-place-</option>
                </select>
                <select name="things" id="thing-select">
                    <option value="">-things-</option>
                </select>
                <input type="text" class="count">
                <input type="text" class="date">
        
            </form>
        </body>
        </html>`)
    }
    catch(ex){
        next(ex)
    }
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on ${port}`))