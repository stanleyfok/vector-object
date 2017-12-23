class Vector {
  constructor(object) {
    if (object !== undefined) {
      Object.keys(object).forEach((k) => {
        this[k] = object[k];
      });
    }
  }

  clone() {
    return new Vector(this);
  }

  getComponents() {
    return Object.keys(this);
  }

  get(component) {
    return this[component];
  }

  set(component, value) {
    this[component] = value;
  }

  isEqual(vector) {
    const keys = this.getComponents();
    const vectorKeys = vector.getComponents();

    if (keys.length !== vectorKeys.length) {
      return false;
    }

    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];

      if (this[k] !== vector[k]) {
        return false;
      }
    }

    return true;
  }

  getDistance(vector) {
    const tmpVector = this.clone().subtract(vector);
    let d = 0;

    tmpVector.getComponents().forEach((k) => {
      d += tmpVector[k] * tmpVector[k];
    });

    return Math.sqrt(d);
  }

  getLength() {
    let l = 0;

    this.getComponents().forEach((k) => {
      l += this[k] * this[k];
    });

    return Math.sqrt(l);
  }

  getDotProduct(vector) {
    let dotProduct = 0;

    this.getComponents().forEach((k) => {
      if (vector[k] !== undefined) {
        dotProduct += this[k] * vector[k];
      }
    });

    return dotProduct;
  }

  getCosineSimilarity(vector) {
    return this.getDotProduct(vector) / (this.getLength() * vector.getLength());
  }

  normalize() {
    const l = this.getLength();

    return this.divide(l);
  }

  add(vector) {
    vector.getComponents().forEach((k) => {
      if (this[k] === undefined) {
        this[k] = 0;
      }

      this[k] += vector[k];
    });

    return this;
  }

  subtract(vector) {
    vector.getComponents().forEach((k) => {
      if (this[k] === undefined) {
        this[k] = 0;
      }

      this[k] -= vector[k];
    });

    return this;
  }

  multiply(c) {
    this.getComponents().forEach((k) => {
      this[k] *= c;
    });

    return this;
  }

  divide(c) {
    this.getComponents().forEach((k) => {
      this[k] /= c;
    });

    return this;
  }
}

module.exports = Vector;
