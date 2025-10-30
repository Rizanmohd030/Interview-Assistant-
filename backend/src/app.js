const express = require('express');
const cors = require('cors');
const interviewRoutes = require('./routes/interview.routes');
const jobRoutes = require('./routes/job.routes');
const errorMiddleware = require('./middleware/error.middleware');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/interviews', interviewRoutes);
app.use('./api/jobs',jobRoutes);

app.get('/health',(req,res)=>{
    res.json({
        status:'ok',
        timestamp: new Date().toISOString()
    });
});

app.use(errorMiddleware);

module.exports = app;