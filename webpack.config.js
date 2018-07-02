const path = require('path');

//webpack needed to pass objs into the bundle.js file/client isde
//we use this to pass our env variable
const webpack=require('webpack');

const ExtractTextPlugin=require('extract-text-webpack-plugin');

 //if process.env.NODE not set to test, then will be set to development
 process.env.NODE_ENV=process.env.NODE_ENV || 'development'

 if(process.env.NODE_ENV==='test')
 {
  //using a npm module to help us read the .env file data for us 
  //dotenv helps us to read our environment files
  require('dotenv').config({path:'.env.test'});
 }
 else if(process.env.NODE_ENV==='development')
 {
  require('dotenv').config({path:'.env.development'});
 }
 //these env variables are not made accessible to the 
 //to javascript client side for security purposes
 //hence we need to manually pass them over 

module.exports = (env)=> {

  const isProduction=env==='production';
  // boolean to check if we need to do production optimisation

  const CSSExtract=new ExtractTextPlugin('styles.css');

 
  //setting up database 

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public','dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use:[
            {
              loader: 'css-loader',
              options:{
                sourceMap:true
              }
            },
            {
              loader:'sass-loader',
              options:{
                sourceMap:true
              }
            }
          ]
        })
      }]
    },
    plugins:[
      CSSExtract,
      new webpack.DefinePlugin({
        //values has to be string/ not variables
        'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL':JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID':JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)

      })
    ],
 
    devtool: isProduction? 'source-map':'inline-source-map',
    devServer: {
      //devServer looks for the bundle.js assets etc from root folder 
      contentBase: path.join(__dirname,'public'),
      historyApiFallback: true,
      publicPath:'/dist/'
      //hence, if we move bundle.js etc into dist/ folder, we need to specify this

    }
  }
};
