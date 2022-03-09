import app from "./app"
import createClassRoom from "./endpoints/createClassRoom"
import createModule from "./endpoints/createModule"
import createUser from './endpoints/createUser'
import editClassRoom from "./endpoints/editClassRoom"
import editModules from "./endpoints/editModule"
import getClassRoom from "./endpoints/getClassRoom"
import getModules from "./endpoints/getModules"
import login from "./endpoints/login"


app.post('/users/signup', createUser)
app.post('/users/login',login)
app.post('/modules',createModule)
app.post('/class',createClassRoom)

app.put('/modules', editModules)
app.put('/class', editClassRoom)

app.get('/modules', getModules)
app.get('/class/:id', getClassRoom)

