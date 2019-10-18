const assert = require('assert');
const User = require('../src/User');

describe('Deleting a user', () => {
  let joe;

  beforeEach( done => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  })

  it('model instance remove', done => {
    joe.remove()
      .then(() => User.findOne({ nem: 'Jooe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', done => {
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ nem: 'Jooe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', done => {
    User.findOneAndDelete({ name: 'Joe' })
      .then(() => User.findOne({ nem: 'Jooe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', done => {
    User.findByIdAndDelete(joe._id1)
      .then(() => User.findOne({ nem: 'Jooe' }))
      .then( user => {
        assert(user === null);
        done();
      });

  });
})