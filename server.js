const express = require('express');
const {Sequelize, Datatypes, Model, STRING} = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_nouns_db');
const morgan = require('morgan');

const app = express();

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
        const [moe, lucy, larry] = await Promise.all(names.map( name => {
            return Person.create({name})
        }))

    // await Person.bulkCreate({records:[{name:'Moe'},{name:'Lucy'},{name:'Larry'}]});
    // await Places.bulkCreate({records:[{name:'NYC'},{name:'Chicago'},{name:'LA'},{name:'Dallas'}]});
    // await Things.bulkCreate({records:[{name:'Foo'},{name:'Bar'},{name:'Baz'},{name:'Qua'}]});   

   //await Person.bulkCreate({records:[{name:'Moe'},{name:'Lucy'},{name:'Larry'}]})
   //await Places.bulkCreate({records:[{name:'NYC'},{name:'Chicago'},{name:'LA'},{name:'Dallas'}]})

}
catch(ex){
    console.log(ex);
}

}
seeder();
app.use(morgan('dev'));
app.get('/', async(req,res,next) => {
    try{
        res.send('Hello')
    }
    catch(ex){
        next(ex)
    }
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on ${port}`))