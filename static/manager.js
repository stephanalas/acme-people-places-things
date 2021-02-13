// const {Sequelize, Datatypes, Model, STRING} = require('sequelize');
// const db = new Sequelize('postgres://localhost/acme_nouns_db');



// class Person extends Model{};
// class Places extends Model{};
// class Things extends Model{};


// Person.init({
//     name:{
//         type: STRING,
//         allowNull: false,
//     }

// },{sequelize:db,modelName:'People'})

// Places.init({
//     name:{
//         type: STRING,
//         allowNull: false,
//     }

// },{sequelize:db, modelName:'Locations'})

// Things.init({
//     name:{
//         type: STRING,
//         allowNull: false,
//     }

// },{sequelize:db, modelName:'Things'})

// const seeder = async() => {
//     try{
//        await db.sync({force:true})
        
//         const names = ['moe','lucy','larry'];
//         const [moe, lucy, larry] = await Promise.all(names.map( name => {
//             return Person.create({name})
//         }))
//         const places = ['NYC','Chicago','LA', 'Dallas'];
//         const [nyc, chi, la, dallas] = await Promise.all(places.map( name => {
//             return Places.create({name})
//         }))
//         const things = ['foo','bar','bazz','quq'];
//         const [foo, bar, bazz,quq] = await Promise.all(things.map( name => {
//             return Things.create({name})
//         }))
//     }
//     catch(ex){
//         console.log(ex);
//     }

// }




// module.exports = seeder;