
const express = require('express');
const { exec } = require( 'child_process' ) ;
// const CDP  = require('chrome-remote-interface') ;

const app = express();
const PORT = 3000;

const lc = () =>{
    const url = 'https://www.google.com' ;
    const command = `start chrome --remote-debugging-port=9222 ${url}` ;

    exec( command , (e)=>{
        if( e ){
            console.error('Failed' , e ) ;
        }
        else{
            console.log('done' ) ;
        }
    } ) ;
} ;


lc(); 


app.get('/start', (req, res)=>{

    const url = req.query.url ;

    if( !url ){
        return res.send("No url ");
    }
     
    const command = `start chrome ${url}` ;

    exec( command,(e)=>{
        if(e){
            // console.error('error' , e ) ;
            return res.send('Failed to start chrome') ;
        }

            // console.log('Call successful') ;
            res.send(`Call Successfully running at ${url}`) ;

    }) ;
});


// to get url of all the tabs

// app.get('/allUrls' , async( req , res ) => {
//     try{
//         const tabs = await CDP.List() ;
//         const urls = tabs.map( tab => tab.url ) ;
//         res.json({ openTabs: urls}) ;
//     }
//     catch(err){
//         console.error('error in opening tabs',err) ;
//         res.send('Failed') ;
//     } 
// }) ;



app.listen(PORT, () =>{
 
    console.log("Server is Successfully Running, and App is listening on port "+ PORT)

});
