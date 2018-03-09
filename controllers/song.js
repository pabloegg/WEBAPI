var Song = require('../models/song');
var Album = require('../models/album');

exports.getSongs = function(req, res, next){

    Song.find(function(err, songs) {

        if (err){
            res.send(err);
        }

        res.json(songs);

    });

}

exports.createSong = function(req, res, next){

    var name = req.body.name;
    var seconds = req.body.seconds;
    var releaseDate = req.body.releaseDate;
    var albumId = req.body.albumId;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    if(!albumId){
        return res.status(400).send({error: 'You must enter an album id'});
    }

    Album.findOne({_id:albumId}, function(err, existingAlbum){

        if(err){
            return next(err);
        }

        if(!existingAlbum){
            return res.status(404).send({error: 'Artist not found'});
        }


        Song.findOne({name:name}, function(err, existingSong){

          if(err){
            return next(err);
          }

          if(existingSong){
            return res.status(400).send({error: 'That Song is already in our records'});
          }

          var song = new Song({
            name: name,
            seconds: seconds,
            releaseDate: releaseDate,
            _album: existingAlbum._id
          });

          song.save(function(err, song){

            if(err){
              return next(err);
            }

            res.status(201).json({
              Song: song
            });
          });
        });
    })


}

exports.deleteAlbum = function(req, res, next){

    Song.remove({
        _id : req.params.Song_id
    }, function(err, Song) {
        res.json(Song);
    });

}
