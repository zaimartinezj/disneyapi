const { Character, Movie } = require("../dbconfig/config");
const { Op } = require("sequelize");
const { uploadFile } = require("../helpers/s3");
const decodeImage = require("../helpers/decodeImage");
const listCharacters = async (req, res) => {

    try {
    
        let query = req.query;
        const keyquerys = Object.keys(query);
        let movieFiter = null;
        if(keyquerys.find(key=>key==="movies")){

            const {movies, ...restQuery} = query;
            query = restQuery;
            movieFiter = movies;
        }

        const characters = await Character.findAll({where: query, attributes: ["id", "name", "image", "history"], include: {model: Movie, attributes: ["id", "title"], where: {'title': movieFiter}, through: {attributes: []}}});
              
        return res.status(200).json({
            success: true,
            characters
        })


    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }
    
}

const newCharacter = async (req, res) => {

    try {
        
        const {name, weight, age, movies, image, history} = req.body;
        let url = '';
        if(image){
            const {buffer, typeImage} = decodeImage(image);     
            const valid = ["jpg", "jpeg", "png"].find(val=>val===typeImage)
            console.log(valid)
            if(!valid){
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid image"
                })
            }
            url = await uploadFile(buffer, name+'.'+typeImage, "s3-disney-characters")
        }

        const moviesFetch = await Movie.findAll( {where: {id: {[Op.or]: movies}}} );
        
        if (moviesFetch.length !== movies.length){
            return res.status(400).json({
                success: false,
                msg: 'Invalid movie'
            })
        }
        //poner una imagen x default en el bucket para cuando no pasan
        const newCharacter = Character.build({name, age, weight, image:url, history});
        await newCharacter.save();
        await newCharacter.addMovie(moviesFetch); // add to the table Characters_Movie 
        
        
        return res.status(200).json({
            success: true,
            character_id: newCharacter.id,
            character_name: newCharacter.name
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }

}

const editCharacter = async (req, res) => {

    try {
        
        const id = req.params.id;
        let url = '';

        const {movies, image, ...detailsCharacter} = req.body;
        
        const oldCharacter = await Character.findByPk(id);
        
        if(!oldCharacter){
            return res.status(400).json({
                success: false,
                msg: 'Invalid id'
            })
        }

        if(image){
            const {buffer, typeImage} = decodeImage(image);     
            const valid = ["jpg", "jpeg", "png"].find(val=>val===typeImage)
            if(!valid){
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid image"
                })
            }
            url = await uploadFile(buffer, oldCharacter.name+'.'+typeImage, "s3-disney-characters")
        }
        
        if(movies){ //si me paso peliculas para agregar
            const moviesFetch = await Movie.findAll( {where: {id: {[Op.or]: movies}}} );
        
        if (moviesFetch.length !== movies.length){
            return res.status(400).json({
                success: false,
                msg: 'Invalid movie'
            })
        }
    
        const newCharacter = await oldCharacter.update(detailsCharacter)
        await newCharacter.addMovie(moviesFetch);
        //agregarle peliculas al personaje
    }
    
        return res.status(200).json({
            success: true,
            newCharacter
        })
        

    } catch (error) {
        console.log(error)
        return res.status(400).json({
                success: false,
                msg: 'Error'
            })
    }

}

const deleteCharacter = async (req, res) => {

    try {
        const id = req.params.id;

        const character = await Character.findByPk(id);

        if(!character){
            return res.status(400).json({
                success: false,
                msg: 'Invalid id'
            })
        }

        await character.destroy();

        return res.status(200).json({
            success: true,
            msg: `Character ${id} deleted`
        })



    } catch (error) {
        console.log(error)
        return res.status(400).json({
                success: false,
                msg: 'Error'
            })
    }

}

const characterById = async (req, res) => {
    
    try {
    
        const id = req.params.id;
        const character = await Character.findByPk(id, {
            attributes: ["id", "name", "image", "age", "weight", "history"], include: {model: Movie, attributes: ["id", "title"], through: {attributes: []}}}
        );

        if(!character){
            return res.status(400).json({
                success: false,
                msg: 'Invalid id'
            })
        }

        return res.status(200).json({
            success: true,
            character
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
                success: false,
                msg: 'Error'
            })
    }

} 

module.exports = {
    listCharacters,
    newCharacter,
    editCharacter,
    deleteCharacter,
    characterById
}