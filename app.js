const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')

app.use(cors({origin:true}))

app.get("/:location", (req, res,next) => {
	var woeid="";
    var options = {
        url: `https://www.metaweather.com/api/location/search/?query=${req.params.location}`,
        headers: {
			'User-Agent' : 'My Web Server' ,
            'content-type': 'application/json'
        }
    };
    function callback(error, response, body) {
        if(!error && response.statusCode === 200) {
			var data=JSON.parse(body);
			if(data.length!==0){
				request({
					url: `https://www.metaweather.com/api/location/${data[0].woeid}`,
				headers:{
					'content-type':'application/json'
				}
				},(error2,response2,body2)=>{
					if(JSON.parse(body).length===0)
						res.send({
							message:"Invalid location"
						})
						else if(!error2&&response2.statusCode===200)
							res.send(JSON.parse(body2));
						else
							res.send("Something wrong");
				});
			}
			else 
				res.send({
					message:"Invalid location"
				});
		return}
		res.send({
			message:"Something went wrong",
		"error":error});
	}
	
           
	
    request(options, callback);
});
app.listen(4000)