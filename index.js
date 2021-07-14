// const http = require('http')

// const server = http.createServer((req, res)=>{
//     res.status = 200;
//     res.setHeader('Content-Type', 'text-plain')
//     res.end('Hello World!')
// })

// server.listen(3000, ()=>{
//     console.log('Serve on port 3000')
// })


const express = require('express')
const morgan = require('morgan')
const app = express(); //Corre express y devuelve un objeto que lo guarada en app

//Middleware: Sirve para provesar datos antes de llegar a las rutas. Autenticación 
// function logger(req, res, next){
//     console.log(`Rout Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();

// }

//SETTINGS
app.set('appName', 'Fazt Express Tutorial')//Nombre de la aplicación
app.set('port', 3000)//Configuración del puerto
app.set('view engine', 'ejs')//Motor de plantillas

//MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'))



//ROUTES

// app.all('/user', (req, res, next)=>{
//     console.log('Por aquí pasó')
//     next();
// })

//Devolver cosas

app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.get('/user', (req, res)=>{
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    })
});

//Recibir datos y guardarlo en una bases de datos y desoués dar una respuesta
app.post('/user/:id', (req, res)=>{//ruta dinámica
    console.log(req.body);//Cuerpo de la petición
    console.log(req.params);//Parámetros de la petición
    res.send('POST REQUEST RECEIVED')
});

//Recibir datos del front-end para actualizarlos y después devolver algo al navegador
app.put('/user/:id', (req, res)=>{
    console.log(req.body)
    res.send(`User ${req.params.id}`)
});

//Tomar la petición y eliminar algún dato dentro del servidor y dar una respuesta
app.delete('/user/:userId', (req, res)=>{
    res.send(`User ${req.params.userId} deleted`)
})

app.use(express.static('public'));//Middleware



app.listen(app.get('port'), ()=>{
    console.log(app.get('appName'))
    console.log('Server on port ', app.get('port'))
})





