const dns = require('dns');
const mongoose = require('mongoose');
var adler32 = require('adler32');

const urlsSchema = new mongoose.Schema({
    original: String,
    short: String
  });
    const Url = mongoose.model('url', urlsSchema)

module.exports={
    addUrl:async(req,res)=>{
        console.log('addUrl', req.body)
        dns.lookup(req.body.url, (err,address,family)=>{
            if(err){
                return res.json({error: 'invalid url'})
            }
            else{
                console.log(err,address,family)
                const original=req.body.url
                const short=adler32.sum(original).toString(16)
                const newUrl= new Url({original,short})
                newUrl.save()
	            .then(()=> res.json({original,short}))
	            .catch(err => res.status(400).json('Error: '+ err));
            }
        })
    },
    getUrl: async(req,res)=>{
        const {short}=req.params
        console.log(short)
        Url.find({short}).then(e=>{
            console.log(e)
            res.redirect('http://'+e[0].original)}).catch(err => res.status(400).json('Error: '+ err));       
        
    }
}