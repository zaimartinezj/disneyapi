const { Genre, Movie } = require("../dbconfig/config");
const { uploadFile } = require("../helpers/s3")
const decodeImage = require("../helpers/decodeImage");

const listGenres = async (req, res) => {

    try {
        const genres = await Genre.findAll({ attributes: ["id", "name", "image"], include: {model: Movie, attributes: ["id", "title"]}})
        
        if(!genres){
            res.status(200).json({
                success: true,
                msg: 'No genres'
            })
        }

        return res.status(200).json({
            success: true,
            genres
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })
    }
   
}

const newGenre = async (req, res) => {

    try {
        let {image, name} = req.body;
        let url = '';
        if(image){
            let {buffer, typeImage} = decodeImage(image);     
            const valid = ["jpg", "jpeg", "png"].find(val=>val===typeImage)
            if(!valid){
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid image"
                })
            }
            url = await uploadFile(buffer, name+'.'+typeImage, "s3-disney-characters")
            image=undefined;
            buffer=undefined;
            delete(image);
            delete(buffer);
        }
        const newGenre = Genre.build({name, image: url});
        await newGenre.save();

        return res.status(200).json({
            success: true,
            id: newGenre.id,
            genre: newGenre.name,
            image: newGenre.image
        })

    } catch (error) {
        
        console.log(error);

        return res.status(400).json({
            success: false,
            msg: 'Error'
        })

    }
    

}

const deleteGenre = async (req, res, next) => {

    try {
        const id = req.params.id;

        const genre = await Genre.findByPk(id);

        if(!genre){
            return res.status(400).json({
                success: false,
                msg: 'Invalid id'
            })
        }

        await genre.destroy();

        return res.status(200).json({
            success: true,
            msg: `genre ${id} deleted`
        })



    } catch (error) {
        console.log(error)
        return res.status(400).json({
                success: false,
                msg: 'Error'
            })
    }
}

module.exports = {listGenres, newGenre, deleteGenre}