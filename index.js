const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const civilianRouter = require('./routes/accountsRoutes'); 
const crimeReportsRouter = require("./routes/crimeReports"); 
const firRouter = require("./routes/firRegistration");
const softDeleteRouter = require('./routes/softDeleteRouter');
const checkStatusRouter = require('./routes/checkStatusRoute');
const forgotPasswordRouter = require('./routes/forgetPassword');
const path = require('path')
const multerRouter = require('./multer/multer');
const zonesRoute = require('./routes/zonesRouter');
const crimeTypeRouter = require('./routes/crimeTypeRouter')
const wantedListRouter = require('./routes/wantedListRoutes');
const appRouter = require('./routes/applicationRoutes');
const adminRouter = require("./routes/adminRouter");
const inspectorRouter = require('./routes/inspectorRouter');
const subinspectorRouter = require('./routes/sub-inspector');
const allAccountsRouter = require('./routes/allAccountsRouter');
const adminToInsRouter = require('./routes/AdminToInspectorRoute');
const zonesRouter = require('./routes/zonesRouter');
const updateEmailRouter = require('./routes/updateRoute');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Cop");

app.use('/',express.static(path.join(__dirname,'/public'))) 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/", civilianRouter);
app.use("/", crimeReportsRouter);
app.use("/", firRouter);
app.use('/',softDeleteRouter);
app.use("/", checkStatusRouter);
app.use("/",forgotPasswordRouter);
app.use("/",multerRouter);
app.use('/',zonesRoute);
app.use('/',crimeTypeRouter);
app.use('/',wantedListRouter);
app.use('/',appRouter);
app.use('/',adminRouter);
app.use('/',inspectorRouter);
app.use('/',subinspectorRouter);
app.use('/',allAccountsRouter);
app.use('/',adminToInsRouter);
app.use('/',zonesRouter);
app.use('/',updateEmailRouter)









app.listen(3001, () => {
    console.log("Server is running on 3001");
});

