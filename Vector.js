class Vector {
  constructor(object) {
    this.vector = Object.assign({}, object)
  }

  clone() {
    return new Vector(this.toObject());
  }

  toObject() {
    return Object.assign({}, this.vector);
  }

  getComponents() {
    return Object.keys(this.vector);
  }

  get(component) {
    return this.vector[component];
  }

  set(component, value) {
    this.vector[component] = value;
  }

  isEqual(vector) {
    const keys = this.getComponents();
    const vectorKeys = vector.getComponents();

    if (keys.length !== vectorKeys.length) {
      return false;
    }

    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];

      if (this.vector[k] !== vector.vector[k]) {
        return false;
      }
    }

    return true;
  }

  getDistance(vector) {
    const tmpVector = this.clone().subtract(vector);
    let d = 0;

    tmpVector.getComponents().forEach((k) => {
      d += tmpVector.vector[k] * tmpVector.vector[k];
    });

    return Math.sqrt(d);
  }

  getLength() {
    let l = 0;

    this.getComponents().forEach((k) => {
      l += this.vector[k] * this.vector[k];
    });

    return Math.sqrt(l);
  }

  getDotProduct(vector) {
    let dotProduct = 0;

    this.getComponents().forEach((k) => {
      if (vector.vector[k] !== undefined) {
        dotProduct += this.vector[k] * vector.vector[k];
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
      if (this.vector[k] !== undefined) {
        this.vector[k] += vector.vector[k];
      } else {
        this.vector[k] = vector.vector[k];
      }
    });

    return this;
  }

  subtract(vector) {
    vector.getComponents().forEach((k) => {
      if (this.vector[k] !== undefined) {
        this.vector[k] -= vector.vector[k];
      } else {
        this.vector[k] = -vector.vector[k];
      }
    });

    return this;
  }

  multiply(scalar) {
    this.getComponents().forEach((k) => {
      this.vector[k] *= scalar;
    });

    return this;
  }

  divide(scalar) {
    this.getComponents().forEach((k) => {
      this.vector[k] /= scalar;
    });

    return this;
  }
}

module.exports = Vector;
