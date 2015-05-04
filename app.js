/*

Server for hmtl 5 multiplayer





*/


    var 
        gamePort    = process.env.PORT || 4004,

        io          = require("socket.io"),

        express     = require("express"),
        UUID        = require("uuid"),
        
        verbose     = false,
        http        = require("http"),
        app         = express(),
        server      = http.createServer(app);
        
    
    ///set up the express server
    
    
    //where are we listening for requests
    server.listen(gamePort);
    
    console.log("\t :: Express :: Listening on port " + gamePort);
    
    //default app.get
    app.get('/',function(req,res)
    {
        console.log('trying to load %s', __dirname + '/index.html');
        res.sendfile('/index.html', {root: __dirname});
    });
    
    
    //this listens for requests from any file from the root of our server
    app.get( '/*', function(req, res, next) {
        
        //this is the current file requested
        var file = req.params[0];
        
        //this is for debugging
        if(verbose)console.log('\t :: Express :: file requested : ' + file);
        
        //send the requested file
        res.sendfile(__dirname+ '/' + file);
    });
    
    
    /*
    Socket.IO server set up.
    
    */
    
    
    //create a socket.io instance
    var sio = io.listen(server);
    
    //configure socket.io
  
    
    
    
    /*
    Socket will call this function when the client connects
    We can use this opertunity to get teh client a unique ID 
    so we can maintain a list of players
    */
    sio.sockets.on('connection', function(client){
        
        /*
        Generate anew UUID and store this on their socket/connection
        */
        client.userid = UUID();
        //tell the player they connected and give UUID
        client.emit('onconnected', {id: client.userid});
        
        //log when player connects
        console.log('\t socket.io:: player ' + client.userid + ' connected')
        
        client.on('disconnect', function(){

             //Useful to know when someone disconnects
            console.log('\t socket.io:: client disconnected ' + client.userid );
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    