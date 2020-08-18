const sequelize = require('./models');


function pickRandom(args) {
	return args[Math.floor(Math.random() * args.length)];
}

async function reset() {
    
    await sequelize.sync({ force: true });

	await sequelize.models.users.bulkCreate([
		{ 
		    username: 'jacksparrow', 
		    email: 'jack@gmail.com', 
		    password: 'Password@1234' 
		    
		}
	]);
	
	await sequelize.models.roles.bulkCreate([
		{  name: 'user'	},
		{  name: 'moderator'},
	]);
    
    
    const user = await sequelize.models.users.create({ 
		    username: 'adityacodes', 
		    email: 'aditya@gmail.com', 
		    password: 'Password@1234' 
		    
	});
    const role = await sequelize.models.roles.create({ name: 'admin' });
    await user.addRole(role,  { through: { status: 'pending' } });
    // user.setRole({ status: 'pending' });
    
    
	console.log('Done with database work!');
}

reset();