const http       = require('http'),
      express    = require('express'),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
	path       = require('path'),
      httpErrors = require('httperrors');
	PORT_NUM   = '3000';
      app        = express();

// Get our API routes -- This connects into back end Logic // 
require('./api/config/mongoose.js');
const api = require('./api/config/routes.js');

 //Express App Build
app.use(session({
	secret:'secretLuca',
	resave: false,
	saveUninitialized : true,
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || PORT_NUM;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

