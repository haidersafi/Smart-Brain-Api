const handleRegister=(req,res,bcrypt,db)=>{
	const {name,email,password}=req.body;
	if (!email||!name||!password)
	{
		return res.status(400).json('FormIncomplete')
	}
	const hash = bcrypt.hashSync(password); 
	db.transaction(trx=>{
		trx.insert({
			email:email,hash:hash
		}).into('login').returning('email').then(loginemail=>{
			return trx.insert({name:name,email:loginemail[0],joined:new Date()}).into('users').returning('*')
			.then(user=>{
	res.json(user[0])})
		}).then(trx.commit).catch(trx.rollback)
	})
.catch(err=>res.status('404').json('Unable to Register'))
}

module.exports={handleRegister:handleRegister}