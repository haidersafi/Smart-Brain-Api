const express=require('express')
const bcrypt=require('bcrypt-nodejs')
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
const register=require('./controllers/register')
const entries=require('./controllers/entries')
const signIn=require('./controllers/signIn')
const searchProfile=require('./controllers/searchProfile')

const knex = require('knex')


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});


app.get('/',(req,res)=>{
	res.json(database.users)
})
app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,bcrypt,db)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)})
app.get('/profile/:id',(req,res)=>{searchProfile.handleSearchProfile(req,res,db)})
app.put('/image',(req,res)=>{entries.handleEntries(req,res,db)})
app.post('/imageurl',(req,res)=>{entries.handleApiCall(req,res)})


app.listen(3000,()=>{
	console.log('app is working')
})
/*

/=>get this is working
/signin=>post success or failed
/register=> post user
/image=>put user
/profile:id =>get userprofile
*/