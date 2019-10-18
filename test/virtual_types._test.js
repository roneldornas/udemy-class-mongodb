const assert = require('assert');
const User = require('../src/User');

describe('Virtual types', () => {
  it('postCount return  number of posts', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'new post' }],
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(joe.postCount === 1);
        done();
      })
  });
});