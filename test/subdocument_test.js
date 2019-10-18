const assert = require('assert');
const User = require('../src/User');

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'post title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'post title');
        done();
      });
  });

  it('can add subdocuments in existing records', done => {
    const joe = new User({
      name: 'Joe',
      posts: [],
    });

    joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
      user.posts.push({ title: 'new post' });
      return user.save();
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
      assert(user.posts[0].title === 'new post');
      done();
    })
    .catch(err => console.log(`O erro é: ${err}`));
  });

  it('can remove an existing subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'new post '}],
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});