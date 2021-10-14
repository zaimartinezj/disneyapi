const { Movie, Genre, Character, CharactersMovie } = require("../dbconfig/config")
const {uploadFile} = require("../helpers/s3");
const decodeImage = require("../helpers/decodeImage");

const listMovies = async (req, res) => {

    try {

        let query = req.query;
        const querykeys = Object.keys(query)
       
        const {genre, ...rest} = query;

        if(genre){
            query = {...rest, genre_id: req.query.genre}
        }

        let movies = [];

        if (querykeys.find((value)=>value.toLowerCase()==="order")){
            const {order, ...restQuery} = query;

            query = restQuery;
            
            movies = await Movie.findAll({order: [['dateCreated', order]], attributes: ["id", "title", "image", "dateCreated"], where: query });
            
        }else{
            
            movies = await Movie.findAll({where: query, attributes: ["id", "title", "image", "dateCreated"]});

        }

        return res.status(200).json({
            success: true,
            movies
        })
 
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({
                success: false,
                msg: 'Error'
            })
    }
}

const movieById = async (req, res) => {

    try {
        
        const id = req.params.id;

        const movie = await Movie.findByPk(id, {attributes: ["id", "title", "dateCreated", "rating", "image"], include: [{model: Genre, attributes: ["id", "name"]}, {model: Character,  attributes: ["id", "name"], through: {attributes: []}}]});

        if (!movie){
            return res.status(400).json({
                success: false,
                msg: 'Invalid id'
            })
        }

        return res.status(200).json({
            success: true,
            movie
        })

    } catch (error) {
        console.log(error)
    }

}

const newMovie = async (req, res) => {

    try {
        
        let {genre, title, rating, dateCreated, image} = req.body;
        
        const genreFetched = await Genre.findOne({where: {name: genre}})
        if(!genreFetched){
            return res.status(400).json({
                success: false,
                msg: 'Invalid genre'
            })
        }
        let url = '';
        if (image){
            let {buffer, typeImage} = decodeImage(image);     
            const valid = ["jpg", "jpeg", "png"].find(val=>val===typeImage)
            console.log(valid)
            if(!valid){
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid image"
                })
            }
            url = await uploadFile(buffer, title+'.'+typeImage, "s3-disney-movies");
            image=undefined;
            delete(image);
            buffer=null;
        }
        const newMovie = Movie.build({title, genre, rating, dateCreated, image: url});
        await newMovie.save();
        await newMovie.setGenre(genreFetched); // agrego genero mediante asociacion

        return res.status(200).json({
             success: true,
             id: newMovie.id,
             title: newMovie.title,
             genre: newMovie.genre,
             rating: newMovie.rating,
             image: newMovie.image
         })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }

}

const editMovie = async (req, res) => {

    try {
        
        const id = req.params.id;
        const {title, genre, image, rating, dateCreated} = req.body;
    
        const movie = await Movie.findByPk(id);
 
        if (!movie){
            return res.status(400).json({
                success: false,
                msg: 'Invalid movie id'
            })
        }

        const genreFetched = await Genre.findOne({where: {'name': genre}});

        if(!genreFetched){
            return res.status(400).json({
                success: false,
                msg: 'Invalid genre'
            })
        }

        let url = '';
        if (image){
            let {buffer, typeImage} = decodeImage(image);     
            const valid = ["jpg", "jpeg", "png"].find(val=>val===typeImage)
            if(!valid){
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid image"
                })
            }
            url = await uploadFile(buffer, title+'.'+typeImage, "s3-disney-movies");
            image=undefined;
            delete(image);
            buffer=null;
        }

        await movie.setGenre(genre);
        const updatedMovie = await movie.update({title, genre, image:url, rating, dateCreated});


        return res.status(200).json({
            success: true,
            id: updatedMovie.id,
            title: updatedMovie.title,
            genre: updatedMovie.genre,
            rating: updatedMovie.rating,
            image: updatedMovie.image
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        }) 
    }

}

const deleteMovie = async (req, res) => {

    try {
        
        const id = req.params.id;

        const movie = await Movie.findByPk(id);

        if (!movie){
            return res.status(400).json({
                status: false,
                msg: 'Id invalid'
            })
        }

        await movie.destroy();

        res.status(200).json({
            success: true,
            id
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }

}

module.exports = {
    newMovie,
    listMovies,
    deleteMovie,
    movieById,
    editMovie
}