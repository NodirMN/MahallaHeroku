const {Router} = require('express')
const router = Router()
const Genre = require('../modeles/genre')
const Book = require('../modeles/book')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    const books = await Book.find().populate('genreId').lean()
    res.render('book/index', {
        title: 'Aholi ro`yhati',
        books
    })
})

router.get('/new', auth, async (req,res) => {
    const genres = await Genre.find().lean()
    res.render('book/new', {
        title: 'Yangi oila kiritish',
        genres
    })
})

router.post('/del', auth, async (req, res) => {
    const _id = req.body._id
    await Book.findByIdAndDelete({_id})
    res.redirect('/book/')
})

router.post('/', auth, async (req, res) => {
        let {
            name,
            namem,
            adress,
            year,
            count,
            tel,
            counts,
            genreId,
            child,
            marrid,
            text,
            typem,
            typef,
            mat,
            typema,
            yearmar,
            father,
            yearfat,
            mather,
            work,
            yearmat,
        } = req.body

        let img = 'images/noimage.jpg'
        if (req.file)
            img = req.file.path
        const book = await new Book({
            name,
            namem,
            img,
            genreId,
            adress,
            year,
            count,
            tel,
            mat,
            counts,
            child,
            marrid,
            text,
            typem,
            typef,
            typema,
            yearmar,
            father,
            yearfat,
            mather,
            work,
            yearmat,
        })
        await book.save()
        res.redirect('/book/')

})

router.post('/save', auth, async (req,res) => {
    const {
        name,
        namem,
        adress,
        year,
        count,
        genreId,
        tel,
        counts,
        child,
        marrid,
        text,
        typem,
        typef,
        typema,
        yearmar,
        father,
        yearfat,
        mather,
        work,
        yearmat,
        _id
    } = req.body
    const img = req.file.path
    const book = {
        name,
        namem,
        img,
        adress,
        year,
        count,
        genreId,
        tel,
        counts,
        child,
        marrid,
        text,
        typem,
        typef,
        typema,
        yearmar,
        father,
        yearfat,
        mather,
        work,
        yearmat,
    }
    await Book.findByIdAndUpdate({_id}, book)
    res.redirect('/book/'+_id)
})

router.get('/edit/:id', auth, async (req, res) => {
    const _id = req.params.id
    const genres = await Genre.find().lean()
    const book = await Book.findOne({
        _id
    }).lean()
    res.render('book/edit', {
        title: `${book.name} oilani o'zgartirish`,
        book,
        genres
    })
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id
    const book = await Book.findOne({
        _id
    }).populate('genreId').lean()
    // book.name = book.name.toUpperCase()
    res.render('book/view', {
        title: `${book.name}`,
        book
    })
})

module.exports = router