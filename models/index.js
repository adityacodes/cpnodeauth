const { Sequelize } = require('sequelize');
// const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);

var sequelize = new Sequelize('cetbin_apibricks', 'cetbin_apiadmin', '=-4$4)9avH+Q', {
      dialect: "mariadb", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
});

const modelDefiners = [
	require('./user.model'),
	require('./userroles.model'),
	require('./role.model'),
	// Add more models here...
	// require('./models/item'),
];


for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize);

const { roles, users, userroles } = sequelize.models;
// roles.hasMany(userroles);
roles.belongsToMany(users, {through: userroles});
users.belongsToMany(roles, {through: userroles});

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;