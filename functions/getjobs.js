const axios = require('axios');

exports.handler= (event, context, callback)=>{
     const val = event.body;
   const API_URL = `https://jobs.github.com/positions.json?description=${val}` ;

    const URL = `${API_URL}`;


    const send =(body)=>{
        callback(null,{
            statusCode:200,
            body:JSON.stringify(body),
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            }

        })
    }

    const getJobs =()=>{
       axios.get(URL)
            .then(res=>send(res.data))
            .catch(err=>send(err))
    }

    if (event.httpMethod= 'GET') {

        getJobs();
        
    }

    
}