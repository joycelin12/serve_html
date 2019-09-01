"use strict";

const port = 3000,
	http = require("http"),
        httpStatus = require("http-status-codes"),
        fs = require("fs"); //require the fs module which interacts with filesystem on behalf of application

const sendErrorResponse = res => {           //create an error -handling function
    res.writeHead(httpStatus.NOT_FOUND, {
     "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

http
    .createServer((req,res) =>{
     let url = req.url; //store request url in variable url 
     if( url.indexOf(".html") != -1) { // check URL to see whether it contains a file extension 
         res.writeHead(httpStatus.OK, {
             "Content-Type": "text/html"
	 });

	 customReadFile(`./views${url}`, res); // call readFile to read file contents , customise the response's content type
     } else if (url.indexOf(".js") != -1) {
	 res.writeHead(httpStatus.OK, {
             "Content-Type": "text/javascript"
	 });

	 customReadFile(`./public/js${url}`, res); // call readFile to read file contents
	
     } else if (url.indexOf(".css") != -1) {
	 res.writeHead(httpStatus.OK, {
             "Content-Type": "text/css"
	 });

	 customReadFile(`./public/css${url}`, res); // call readFile to read file contents
	
     } else if (url.indexOf(".png") != -1) {
	 res.writeHead(httpStatus.OK, {
             "Content-Type": "img/png"
	 });

	 customReadFile(`./public/images${url}`, res); // call readFile to read file contents
	
     } 	else {
              sendErrorResponse(res);

     }   	  	    
     })
    .listen(port);
   
    console.log(`The server has started and is listening on port number: ${port}`);

    const customReadFile = (file_path, res) => {  //Look for a file by name requested
         if (fs.existsSync(file_path)) { //check whether the file exists
           fs.readFile(file_path, (error, data) => {
              if (error) {
                 console.log(error);
		 sendErrorResponse(res);
		 return;      
	      }
	      res.write(data);
              res.end();		   
	   });
	 } else {
            sendErrorResponse(res);
	 }
          
    };
