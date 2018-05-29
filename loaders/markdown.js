const loaderUtils = require('loader-utils');

const MT = require('mark-twain');

const R = require('ramda');

const ejs = require('ejs');

const isCode = R.compose(R.contains(R.__, ['js', 'jsx', 'javascript']), R.path(['props', 'lang']));
const isStyle = R.whereEq({ type: 'code', props: { lang: 'css' } });
const isHtml = R.whereEq({ type: 'code', props: { lang: 'html' } });
const getChildren = R.compose(R.prop('children'), R.defaultTo({}));

const util = require('atool-doc-util');

module.exports = function (content) {

  this.cacheable && this.cacheable(); // 开启缓存
  
  const options = this.options;

  const webpackOptions = loaderUtils.getOptions(this); // 获取webpack设置options

  const resourcePath = this.resourcePath; // md路径

  // const resource = new util.Resource(options.cwd, options.demoSource, resourcePath);

  const fileContentTree = MT(content).content;

  const code = getChildren(fileContentTree.find(isCode));

  const style = getChildren(fileContentTree.find(isStyle));

  const html = getChildren(fileContentTree.find(isHtml));
  
  return code;
};

