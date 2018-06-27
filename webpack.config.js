const path = require('path');

const ExtractTextPlugin=require('extract-text-webpack-plugin');


module.exports = (env)=> {

  const isProduction=env==='production';
  // boolean to check if we need to do production optimisation

  const CSSExtract=new ExtractTextPlugin('styles.css');


  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
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
      CSSExtract
    ],
    //source-map takes a longer time to build -> more suited for production build
    //takes up less space than cheap-module-eval-source-map
    //source-map can take up to few mbs of size.
    //source-map will make 2 bundle.js, one is soley for the script, another is only
    //going to be opened when user opens up the developer tools.
    //https://webpack.js.org/configuration/devtool/#devtool
    //cheap-module-eval-sourcemap changes to inline-source-map ->
    //because cheap-module.. does not trace css files 
    devtool: isProduction? 'source-map':'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  }
};
