const mongoose = require( 'mongoose' ); 
const dotenv = require("dotenv");
dotenv.config();

const options = {
  useCreateIndex: true, // para acabar com este warning: (node:11180) DeprecationWarning: collection.ensureIndex is deprecated
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false // esta opção aparece devido ao metodo findOnAndUpdate()
};

// mongoose.connect(process.env.CONECT_POSDB_MONGODB, options) 
mongoose.connect(process.env.CONECT_ATLAS_MONGODB, options) 

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});