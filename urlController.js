const dns = require('dns');
const mongoose = require('mongoose');
var adler32 = require('adler32');
const axios = require('axios')

const urlsSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
  });
    const Url = mongoose.model('url', urlsSchema)

module.exports={
    addUrl:async(req,res)=>{
//       const options = {  
//   hints: dns.ADDRCONFIG | dns.V4MAPPED,
// };
        const saveUrl=()=>{
            const original_url=req.body.url
                const short_url=adler32.sum(original_url).toString(16)
                const newUrl= new Url({original_url,short_url})
                newUrl.save()
	            .then(()=> res.json({original_url,short_url}))
	            .catch(err => res.status(400).json('Error: '+ err));

        }
        console.log('addUrl', req.body)
       await dns.lookup(req.body.url, async (err)=>{
            if(err){

               await axios.get(err.hostname).then(res=>{
                 console.log('this is status code',res.status)
                 if(res.status!==200){
                   res.json({error: 'invalid url'})             

                 }

            else{
                saveUrl()
            }

                 
               }).catch(e=>res.json({error: 'invalid url'}) )
            }
            else{
              saveUrl()
            }

            
        })
    },
    getUrl: async(req,res)=>{
        const {short}=req.params
        console.log(short)
       Url.findOne({short_url:short}).exec().then(e=>{
            console.log(e)
            res.redirect(e.original_url)}).catch(err => res.status(400).json('Error: '+ err));        
        
    }
}