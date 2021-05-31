import path from 'path';


export const entry = {
  app: ['./script/script.js']
};
export const output = {
  path: path.resolve(__dirname, 'build'),
  filename: 'app.bundle.js',
};
export const module = {
  loaders: [{
    test: /\.js?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['env'],
    },
  },
  ],
};
