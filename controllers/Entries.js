const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ad7cc98726ce45cea7bf4005f3035b07'
});

const handleApiCall=(req,res)=>{
	console.log('req.body',req.body.input)
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data=>{
	res.json(data)}).catch(err=>res.status(400).json('unable to get data from API'))}
const handleEntries=(req,res,db)=>{
	const {id}=req.body;
	db('users')
  .where('id', '=', id)
  .increment('entries', 1).returning('entries').then(user=>{
  	res.json(user[0])
  })
	
}

module.exports={handleEntries:handleEntries,handleApiCall:handleApiCall}