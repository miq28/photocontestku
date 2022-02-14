const { Photo, User } = require('../../../model')
const { verifyJWT } = require('../../../middleware/authJwt')
const { uploadPhoto, storageUser } = require('../../../utils/upload')
const { modifyImagePath } = require('../../../middleware/modifyReqImagePath')

//API to upload a photo (or many photos) to a collection/galery User
const uploadPhotoUser = async(req, res,next) => {
    // kita error tadi karena salah field pass request
    // kenapa?? karena field file nya harus nya user-photo bukan path 
    // definisi field nya di sini 
    // let uploadPhoto = upload.single('user-photo')
    // contoh request, metode tetap menggunakan multipart/form-data
    // body
    // {
    //     "title": "test",
    //     "description": "test",

    //     user-photo = file yang di upload

    // tadi kita salah..
    // karena field file nya namanya user-photo bukan path
    // }

    try {
        let { title, description } = req.body
            // kita ambil format path dari req yang kita buat di multer storage
        let pathPhoto = `${req._filepath}` // di sini kita sudah dapat fullpath string dari file yang diupload
            // tinggal massukkan ke database
        const id = parseInt(req.user.id)
        let option = {}
            // lanjutkan memasukkan ke data base
        // option.where = { userid : id}
        option.data = {
            title,
            description,
            path: pathPhoto,
            userid: id
        }
        console.log(title, description, pathPhoto)
        const result = await Photo.create(option)
        const imageUrl = `${req.protocol}://${req.headers.host}${result.path}`
        result.path = imageUrl
        req.result = result
        next()
    } catch (err) {
        next(err)
    }

}

//API to get all photos from a specific user
const getAllPhotoUser = async(req, res,next) => {
    try {
        const id = parseInt(req.user.id)
        let option = {}
        option.where = { userid: id }
        let result = await Photo.findMany(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

//API to get a spesific photos from a specific user
const getOnePhotoUser = async(req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let option = {}
        option.where = { id: parseInt(id)}
        let result = await Photo.findUnique(option)
        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

const updatePhotoDetail = async (req, res) => {
    try {
        const id = parseInt(req.user.id)
        const { title, description } = req.body
        let option = {}
        option.where = { id: parseInt(id)}
        option.data = { title, description }
        const result = await Photo.update(option)
        res.json(result)
    } catch (err) {
        console.log(err)
        code = err.code || 'Unknown'
        message = err.message || "Error occurred."
        res.status(400).json({ code, message });
    }
}


// const delPhoto = async(req, res) => {
//     try {
//         let { id } = req.body
//         id = Number(id)
//         let option = {}
//         option.where = { id: id }
//         const result = await Photo.delete(option)
//         res.json(result)
//     } catch (err) {
//         console.log(err)
//         code = err.code || 'Unknown'
//         message = err.message || "Error occurred."
//         res.status(400).json({ code, message })
//     }
// }

module.exports = routes => {
    // disini sama dengan baseurl/api/photos/
    routes.get('/',
        verifyJWT,
        getAllPhotoUser,
        modifyImagePath
    )
    routes.get('/:id',
        verifyJWT,
        getOnePhotoUser,
        modifyImagePath
    )
    routes.post('/upload/',
        verifyJWT,
        uploadPhoto,
        uploadPhotoUser
    )
    // routes.delete('/',
    //     verifyJWT,
    //     delPhoto
    // )
    routes.put('/:id', 
        verifyJWT,
        updatePhotoDetail
    )

}