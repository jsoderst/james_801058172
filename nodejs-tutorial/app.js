/*
    Basics on how to import modules
*/

// const tutorial = require('./tutorial');
// console.log(tutorial.sum(1,1));
// console.log(tutorial.PI);
// console.log(new tutorial.SomeMathObject());

/*
    The events module allows you to bring event driven programming to nodejs
    The events module is built in to nodejs
*/

// const EventEmitter = require('events');

// const eventEmitter = new EventEmitter;
//eventEmitter.on('<listener>,<function>')
// eventEmitter.on('tutorial',(num1, num2)=>{
//     console.log(num1 + num2);
// });

//emit method triggers specified event
// eventEmitter.emit('tutorial',1, 2);

// class Person extends EventEmitter{
//     constructor(name){
//         super();
//         this._name = name;
//     }

//     get name(){
//         return this._name;
//     }
// }

// let james = new Person('James');
// let christina = new Person('Christina');

//()=> is used to create a callback function
// james.on('name', ()=>{
//     console.log('My name is ' + james.name)
// });

// christina.on('name', ()=>{
//     console.log('My name is ' + christina.name);
// });

// james.emit('name');
// christina.emit('name');

/*
    ReadLine module
    Prompting user and getting user input
*/

// const readline = require('readline');
//configuration
// const rl = readline.createInterface({input : process.stdin, output : process.stdout});

// let num1 = Math.floor((Math.random() * 10) + 1);
// let num2 = Math.floor((Math.random() * 10) + 1);
// let ans = num1 + num2;

// rl.question(`What is ${ num1 } + ${ num2 }?\n`, (userInput)=>{
//     if (userInput.trim() == ans){
//         rl.close();
//     }
//     else {
//         rl.setPrompt('Incorrect resonse. Please try again \n');
//         rl.prompt();
//         rl.on('line', (userInput)=>{
//             if (userInput.trim() == ans){
//                 rl.close();
//             }
//             else {
//                 rl.setPrompt(`Your answer of ${ userInput } is incorrect. Try again. \n`);
//                 rl.prompt();
//             }
//         })
//     }
// });

// rl.on('close', ()=>{
//     console.log('Well done!');
// });


/*
    semantic versioning ^xx.xx.xx -> major.minor.patch, ^ in this case means don't use a major update, but can use minor/patch update
                                            ~xx.xx.xx   ~ would indicate that only patch updates are acceptable
                                                        including neither would mean only that specific version is guaranteed to work
*/

/*
    express is a web framework for nodejs -> used to build APIs
    npm i express
*/
// const _ = require('lodash');
// let example = _.fill([1,2,3,4,5], 'banana', 1, 4);
// console.log(example);

const express = require('express'); 
const app = express();//returns an object
const path = require('path');
const bodyparser = require('body-parser');
const joi = require('joi');

// app.get('/', (req, res)=>{
//     res.send('Hello World');
// });

// app.get('/example', (req, res)=>{
//     res.send('Hitting example endpoint');
// });

/*
    serving static resources with express
*/

app.use('/public', express.static(path.join(__dirname, 'static'))); //anytime you see use, means you are using middleware, first arg is the alias for that resource, will take the dirname where app.js is located and use it to find static folder but on client side it will be called public in static to obfuscate source
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//handling get
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

//handling post
app.post('/', (req, res)=>{
    console.log(req.body);
    //input validation
    const schema = joi.object().keys({
        email: joi.string().trim().email().required(),
        password: joi.string().min(5).max(10).required()
    });

    // console.log(schema.validate(req.body));

    joi.validate(req.body, schema, (err, result)=>{
        if(err){
            console.log(err);
            res.send("An error has occurred");
        }
        else{
            res.send("Successfully posted data");
            console.log(result);
        }
    });
    // database stuff here
});

/*
    route parameters and query parameters
    route parameters should be used when variables are required
    query parameters should be used for optional vars
*/

// app.get('/example/:name/:age', (req, res)=>{
//     console.log(req.params);
//     console.log(req.query) //will be an empty object unless you pass something into it, do this by using ?var=value&otherVar=otherValue
//     res.send(req.params.name + " : " + req.params.age);
// });

app.listen(3000);

/*
    handing POST request
    body-parser module is used to parse form data
*/
