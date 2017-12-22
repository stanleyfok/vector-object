Vector Object
=======

[![Build Status](https://travis-ci.org/stanleyfok/vector-object.png?branch=master)](https://travis-ci.org/stanleyfok/vector-object)
[![NPM version](https://img.shields.io/npm/v/vector-object.svg)](https://www.npmjs.com/package/vector-object)

This is a n-dimensional vector implementation in javascript. A vector can be created using javascript objects, with the object keys as the components. It is useful for cases like word vector calculations. For example, calculating the cosine similarity of two word vectors.

## Installation

`npm install vector-object`

And then import the Vector class
```js
const Vector = require('vector-object');
```

## Usage

### constructor

create a new vector object
```js
const a = new Vector({ x: 1, y: 2, z: 3 });
```

### toObject()

return the components and values as object of the vector object
```js
const a = new Vector({ react: 5, angular: 2, vue: 2, marko: 1 });

console.log(a.toObject()); // return { react: 5, angular: 2, vue: 2, marko: 1 }
```

### clone()

return a copy of the vector object
```js
const a = new Vector({ x: 1, y: 2, z: 3 });
const b = a.clone();

console.log(b.toObject()); // return { x: 1, y: 2, z: 3 }
```

### getComponents()

return the components as array in the vector object
```js
const a = new Vector({ react: 5, angular: 2, vue: 2, marko: 1 });

console.log(a.getComponents()); // return ['react', 'angular', 'vue', 'marko']
```

### get(component)

return the value of the component in the vector object
```js
const a = new Vector({ react: 5, angular: 2, vue: 2, marko: 1 });

console.log(a.get('react')); // return 5
console.log(a.get('nextjs')); // return undefined
```

### set(component, value)

set the value of the component in the vector object
```js
const a = new Vector({ react: 5, angular: 2, vue: 2, marko: 1 });
a.set('react', 10);

console.log(a.toObject()); // return { react: 10, angular: 2, vue: 2, marko: 1 }
```

### isEqual(vector)

return a boolean value if the input vector is same as itself
```js
const a = new Vector({ a: 1, b: 2, c: 3 });
const b = new Vector({ a: 1, b: 2, c: 3 });
const c = new Vector({ b: 2, d: 4 });

console.log(a.isEqual(b)); // return true
console.log(a.isEqual(c)); // return false
```

### getDistance(vector)

return the distance between the target vector and the vector object
```js
const a = new Vector({ a: 1, b: 2, c: 3 });
const b = new Vector({ b: 2, c: 1, d: 2 });
const distance = a.getDistance(b);

console.log(distance); // return 3
```

### getLength()

return the length of the vector object
```js
const a = new Vector({ a: 3, b: 4 });
const length = a.getLength();

console.log(length); // return 5
```

### getDotProduct(vector)

return the dot product of the input vector and the vector object
```js
const a = new Vector({ a: 1, b: 2, c: 1 });
const b = new Vector({ b: 2, c: 2 });
const dotProduct = a.getDotProduct(b);

console.log(dotProduct); // return 6
```

### getCosineSimilarity(vector)

return the cosine similarity (range from 0 to 1, the larger the more similar between the two vectors) of the input vector and the vector object
```js
const a = new Vector({ a: 1, b: 2, c: 3 });
const b = new Vector({ b: 2, c: 2, d: 2 });
const similarityAA = a.getCosineSimilarity(a);
const similarityAB = a.getCosineSimilarity(b);

console.log(similarityAA); // return 1
console.log(similarityAB); // return 0.6236095644623236
```

### normalize()

return a normalized vector of the vector object
```js
const a = new Vector({ a: 3, b: 4 });
const n = a.normalize();

console.log(n.toObject()); // return { a: 0.6, b: 0.8 }
```

### add(vector)

return a vector after adding the input vector and the vector object
```js
const a = new Vector({ a: 1, b: 2 });
const b = new Vector({ b: 1, c: 2 });
const c = a.add(b);

console.log(c.toObject()); // return { a: 1, b: 3, c: 2 }
```

### subtract(vector)

return a vector after subtracting the input vector from the vector object
```js
const a = new Vector({ a: 1, b: 2 });
const b = new Vector({ b: 1, c: 2 });
const c = a.subtract(b);

console.log(c.toObject()); // return { a: 1, b: 0, c: -2 }
```

### multiply(c)

return a vector after scaling the vector object with constant c
```js
const a = new Vector({ a: 1, b: 2, c: 1 });
const b = a.multiply(10);

console.log(b.toObject()); // return { a: 10, b: 20, c: 10 }
```

### divide(c)

return a vector after dividing the vector object with constant c
```js
const a = new Vector({ a: 1, b: 2, c: 1 });
const b = a.divide(10);

console.log(b.toObject()); // return { a: 0.1, b: 0.2, c: 0.1 }
```

## Test

```bash
npm install
npm run test
```

## To-Dos

## Authors

  - [Stanley Fok](https://github.com/stanleyfok)

## License

  [MIT](./LICENSE)
