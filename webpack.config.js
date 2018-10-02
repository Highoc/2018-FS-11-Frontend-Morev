module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
	        test: /\.js/,
                loader: 'babel-loader',
                include: __dirname + '/src',			
            }
        ],
    }
};
