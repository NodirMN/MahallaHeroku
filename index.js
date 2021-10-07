const express = require('express') 
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const csrf = require('csurf') 
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash') // !
const helmet = require("helmet");
const compression = require('compression')

///////////////router
const pageRouter = require('./router/page')
const usersRouter = require('./router/users')
const authRouter  = require('./router/auth')
const bookRouter  = require('./router/book')
const genreRouter = require('./router/genre')
const invalidbRouter  = require('./router/invalidb')
const invalidgRouter = require('./router/invalidg')
const ironbRouter  = require('./router/ironb')
const irongRouter = require('./router/irong')
const profileRouter = require('./router/profile')

//middlevare
const varMid = require('./middleware/var')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys/pro')


const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(express.urlencoded({extended:true})) 

app.use(express.static(__dirname+'/public'))
app.use('/images',express.static('images')) 


const store = new MongoStore({
    collection: 'session',
    uri: keys.MONGODB_URI
})
app.use(session({
    secret: keys.SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    store
}))

////////////////////////////////

app.use(fileMiddleware.single('img'))
app.use(csrf()) 
app.use(flash()) 
app.use(varMid)
app.use(helmet())
app.use(compression())


////////////////////////////////
app.use(pageRouter)
app.use('/users',usersRouter) 
app.use('/auth',authRouter) 
app.use('/book',bookRouter) 
app.use('/genre',genreRouter) 
app.use('/invalidb',invalidbRouter) 
app.use('/invalidg',invalidgRouter) 
app.use('/ironb',ironbRouter) 
app.use('/irong',irongRouter) 
app.use('/profile',profileRouter)

// const PORT = 

async function dev() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true
        })
        app.listen(process.env.PORT, () => {
            console.log('Server is running')
        })
    } catch (error) {
        console.log(error)
    }
}
dev()