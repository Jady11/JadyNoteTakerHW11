const fs = require("fs");
const util = require("util");
const notesData = require("../db/db.json")
const { v4:uuid } = require("uuid")
const router = require("express").Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

    router.get("/notes", function(req, res){
        return readFileAsync("db/db.json", "utf8")
        .then(function(data){
            console.log(data)
            data = JSON.parse(data);
            return res.json(data)
        })
    });

    router.post("/notes/", function(req, res){
        return readFileAsync("db/db.json", "utf8")
        .then(function(data){
            console.log(data)
            data = JSON.parse(data);
            data.push({...req.body, id:uuid()});
            // const filteredNotes = JSON.parse(data).filter(note => note.id !== req.params.id);
            // console.log(filteredNotes);
            return writeFileAsync("db/db.json", JSON.stringify(data))
            .then(function(){
                console.log('random');
                return res.json({ok:true})
            })
            .catch(function(err){
                throw err
                })
        })
        // notesData.push(req.body)
        // res.json(true)
        // console.log(req.body)
        // notesData.push({...req.body, id:uuid()})
        // fs.writeFile("db/db.json",JSON.stringify(notesData), function(err, log){
        //     if (err){
        //         throw err 
        //     } else {
        //         res.json(true)
        //     }
        // })
    });

    router.delete("/notes/:id", function(req,res){
        return readFileAsync("db/db.json", "utf8")
        .then(function(data){
            const filteredNotes = JSON.parse(data).filter(note => note.id !== req.params.id);
            console.log(filteredNotes);
            return writeFileAsync("db/db.json", JSON.stringify(filteredNotes))
            .then(function(){
                console.log('random');
                return res.json({ok:true})
            })
            .catch(function(err){
                throw err
                
            })
        })
    })

    
    module.exports = router;
    