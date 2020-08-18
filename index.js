const express = require('express');
const Sequelize = require('sequelize');


const app = express();
const bodyParser  = require('body-parser');
const cors  = require('cors');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

var sequelize = new Sequelize('cetbin_apibricks', 'cetbin_apiadmin', '=-4$4)9avH+Q', {
      dialect: "mariadb", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
});




app.get('/', (req, res) => {
    
    sequelize
      .authenticate()
      .then(function(err) {
        res.send('Connection has been established successfully.');
      }, function (err) { 
        res.send('Unable to connect to the database:', err);
      });
    
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);



app.get('/setup', (req, res) => {
    require('./setup');
    
    res.send("Setup done!");
});



// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
