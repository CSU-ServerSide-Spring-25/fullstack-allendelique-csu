const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { forecastApi, currentApi, alertsApi } = require('./externalApi/externalApiCalls'); // add additional functions comma separated example { foo, bar }

const app = express();
const PORT = 9001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for testing purposes
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello from the server!');
});

app.get('/forecast', async (req, res) => {  // example with data /forecast?location=31909&days=3
    try {
        const result = await forecastApi(req.query.location, req.query.days);
        res.json(result);
    } catch (error) {
        console.error("Error in forecast function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// app.get /current location
app.get('/current', async (req, res) => {
    try {
        const result = await currentApi(req.query.location);
        res.set('Content-Type', 'application/json');
        res.json(result);
    } catch (error) {
        console.error("Error in forecast function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
})

//app.get /alerts
app.get('/alerts', async (req, res) => {
    try {
        const result = await alertsApi(req.query.location);
        res.json(result);
    } catch (error) {
        console.error("Error in forecast function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});