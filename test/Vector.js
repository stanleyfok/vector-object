const chai = require('chai');
const Vector = require('../lib/Vector');

chai.should();

const set1 = { a: 1, b: 2, c: 3 };
const set2 = { b: 2, c: 1, d: 2 };
const set3 = { a: 1, b: 2 };

describe('Vector', () => {
  describe('clone()', () => {
    it('should be able to clone a vector', () => {
      const a = new Vector(set1);
      const v = a.clone();

      v.should.to.deep.equal(a);
    });
  });

  describe('toObject()', () => {
    it('should be able to return a json object of the vector', () => {
      const a = new Vector(set1);
      const obj = a.toObject();

      obj.should.to.deep.equal(set1);
      obj.should.to.be.an.instanceof(Object);
      a.should.to.be.an.instanceof(Vector);
      obj.should.not.to.be.an.instanceof(Vector);
    });
  });

  describe('getComponents()', () => {
    it('should be able to getComponents of a vector', () => {
      const a = new Vector(set1);
      const keys = a.getComponents();

      keys.should.to.have.members(['a', 'b', 'c']);
      keys.should.to.have.lengthOf(3);
    });
  });

  describe('get(component)', () => {
    it('should be able to get the value of a component', () => {
      const a = new Vector(set1);

      a.get('a').should.to.be.equal(1);
      a.get('b').should.to.be.equal(2);
      a.get('c').should.to.be.equal(3);
    });
  });

  describe('set(component, value)', () => {
    it('should be able to set the value of a component', () => {
      const a = new Vector(set1);
      a.set('a', 10);

      const newSet = Object.assign({}, set1);
      newSet.a = 10;
      const b = new Vector(newSet);

      a.should.to.deep.equal(b);
    });
  });

  describe('isEqual(vector)', () => {
    it('should be able to check if target vector is equal to itself', () => {
      const a = new Vector(set1);
      const b = new Vector(set2);
      const c = new Vector(set3);

      a.isEqual(a).should.to.be.equal(true);
      a.isEqual(b).should.to.be.equal(false);
      a.isEqual(c).should.to.be.equal(false);
      c.isEqual(a).should.to.be.equal(false);
    });
  });

  describe('getDistance(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    const d = a.getDistance(b);

    it('should be able to calculate the distane to the target vector', () => {
      d.should.to.be.equal(3);
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('getLength()', () => {
    const a = new Vector(set1);
    const l = a.getLength();

    it('should be able to the length of itself', () => {
      l.should.to.be.equal(Math.sqrt(14));
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('getDotProduct(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);

    it('should be able to get dot product with the target vector', () => {
      a.getDotProduct(b).should.to.be.equal(7);
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('getCosineSimilarity(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);

    it('should be able to get cosine similarity with the target vector', () => {
      a.getCosineSimilarity(b).should.to.be.equal(0.6236095644623235);
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('normalize()', () => {
    const a = new Vector(set1);
    const l = a.getLength();
    const v = a.normalize();

    it('should be able to get a normalized vector', () => {
      v.toObject().should.to.deep.equal({ a: 1 / l, b: 2 / l, c: 3 / l });
    });
  });

  describe('add(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    a.add(b);

    it('should be able to add two vector', () => {
      a.toObject().should.to.deep.equal({
        a: 1, b: 4, c: 4, d: 2,
      });
    });

    it('the input vector should be untouched', () => {
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('subtract(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    a.subtract(b);

    it('should be able to subtract two vector', () => {
      a.toObject().should.to.deep.equal({
        a: 1, b: 0, c: 2, d: -2,
      });
    });

    it('the input vector should be untouched', () => {
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('multiply(vector)', () => {
    const a = new Vector(set1);
    a.multiply(10);

    it('should be able to multiply a vector', () => {
      a.toObject().should.to.deep.equal({ a: 10, b: 20, c: 30 });
    });
  });

  describe('divide(vector)', () => {
    const a = new Vector(set1);
    a.divide(10);

    it('should be able to divide a vector', () => {
      a.toObject().should.to.deep.equal({ a: 0.1, b: 0.2, c: 0.3 });
    });
  });

  describe('chainability', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    const c = new Vector(set3);
    const v = a.add(b).subtract(c);

    it('the result is assigned to vector v', () => {
      v.toObject().should.to.deep.equal({
        a: 0, b: 2, c: 4, d: 2,
      });
    });

    it('the vector a should be updated', () => {
      a.toObject().should.to.deep.equal({
        a: 0, b: 2, c: 4, d: 2,
      });
    });

    it('the input vector should be untouched', () => {
      b.toObject().should.to.deep.equal(set2);
      c.toObject().should.to.deep.equal(set3);
    });
  });
});
