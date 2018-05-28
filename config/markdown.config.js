process.env.NODE_ENV = 'development';

const glob = require('glob');

const path = require('path');

const upath = require('upath');

const fs = require('fs');

const webpack = require('webpack');

const webpackDevServer = require('webpack-dev-server');

const webpackDevMiddleware = require('webpack-dev-middleware');

const app = require('express')();

const HtmlWebpackPlugin = require('html-webpack-plugin');

const atoolDocUtil = require('atool-doc-util');

const chalk = require('chalk');

const {
  commonConfig
} = require('./webpack.config.common');

const {
  homePage,
  name,
  version
} = require('../package.json');

const APP_CWD = process.cwd();

const markdownPath = 'examples';

const entry = getEntry(APP_CWD, markdownPath);

commonConfig.mode = 'development';

commonConfig.entry = entry;

let link = {};

Object.keys(entry).forEach((k) => {
  link[path.relative(APP_CWD, k)] = k;
})

commonConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: `${APP_CWD}/templates/index.ejs`,
    inject: 'body',
    chunks: [],
    title: `${name}@${version}`,
    link,
    homePage,
    readme: atoolDocUtil.marked(fs.readFileSync(`${APP_CWD}/README.md`, 'utf-8'))
  })
)

const compiler = webpack(commonConfig);

app.use(webpackDevMiddleware(compiler, {

})).listen(8080, () => {
  console.log(chalk.cyan('Starting the development server...\n'));
})

// const server = new webpackDevServer(compiler, {
//   historyApiFallback: true,
//   hot: true,
//   inline: true,
//   stats: 'errors-only',
//   quiet: true
// }).listen('8080', 'localhost', () => {
//   console.log(chalk.cyan('Starting the development server...\n'));
// })

function geDomFiles(dir, name) {
  return glob.sync(path.join(`${dir}/${name}`, `**/*.{js,jsx,html,md}`))
}

function getEntry(APP_CWD, markdownPath) {
  const files = geDomFiles(APP_CWD, markdownPath);
  let entry = {};
  files.forEach(file => {
    file = upath.normalize(file);
    const ext = path.extname(file);
    const name = `examples/${path.basename(file, ext)}`;

    if (ext === '.md' || (ext === '.js' || ext === '.jsx') && files.indexOf(pathWithoutExt + '.html') !== -1) {
      entry[name] = file
    }
  });

  return entry;
}