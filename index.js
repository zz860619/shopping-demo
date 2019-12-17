const express = require('express'),
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session'),
      passport = require('passport'),
      keys = require('./config/keys');




require('./models/User');
require('./models/Items');
require('./services/passport');


const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./routes/authRoutes')(app);
require('./routes/itemsRoutes')(app);


mongoose.connect(keys.mongoURI, {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.set('useFindAndModify', false);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/client/build'));


    const path = require('path');

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT);