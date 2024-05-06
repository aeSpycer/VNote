const app = require('./app.js');
const { connectDB } = require('./db.js');

connectDB();
app.listen(5000);
console.log('Server on port', 5000);