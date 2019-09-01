"use strict";

const port = 3000,
	http = require("http"),
        httpStatus = require("http-status-codes"),
        fs = require("fs"); //require the fs module which interacts with filesystem on behalf of application

const getViewUrl = (url) => { //create a function to interpolate URL into file path
   return `views${url}.html`;
}

http
    .createServer((req,res) =>{
     let viewUrl = getViewUrl(req.url);
     fs.readFile(viewUrl, (error, data) => {
	     if(error) {
               res.writeHead(httpStatus.NOT_FOUND);
               res.write("<h1>FILE NOT FOUND</h1>");
	     } else {
                res.writeHead(httpStatus.OK, {
                "Content-Type":"text/html"
		});
		     res.write(data);
	     }
	     res.end();
         });
    })
    .listen(port);
   
    console.log(`The server has started and is listening on port number: ${port}`);
