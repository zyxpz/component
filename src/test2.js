import ejs from 'ejs';

export default function () {
  ejs.render('./template.ejs', {
    text: 'component测试案例2',
  });
}
