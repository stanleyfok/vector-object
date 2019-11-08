Vector Object
=======

[![Build Status](https://travis-ci.org/stanleyfok/vector-object.png?branch=master)](https://travis-ci.org/stanleyfok/vector-object)
[![NPM version](https://img.shields.io/npm/v/vector-object.svg)](https://www.npmjs.com/package/vector-object)

This is a n-dimensional vector implementation in javascript. A vector can be created using json objects, with the object keys as the components. It is useful for cases like word vector calculations. For example, calculating the cosine similarity of two word vectors.

The advantage of using json object over array to define a vector is that we do not need the two vectors have the same number of components for calculations. Take the following example:

Using this library:
```js
const a = new Vector({ react: 1, nodejs: 2, angular: 1 });
const b = new Vector({ nodejs: 2, marko: 3, nextjs: 2 });

const similarity = a.getCosineSimilarity(b);
```

Compare what if using array (**Note: this is not supported in this library**):
```js
// assume index 0: react, index 1: nodejs, index 2: angular, index 3: marko, index 4: nextjs
const a = new Vector([1, 2, 1, 0, 0]);
const b = new Vector([0, 2, 0, 3, 2]);

const similarity = a.getCosineSimilarity(b);
```

It is much easier to define vector in object than array as we need to pad much zeros into the array if two vectors have very few overlapping components. The vectors can be large but sparse if we are doing word analyzation.

## Installation

`npm install vector-object`

And then import the Vector class
```js
const Vector = require('vector-object');
```

## Major Change Log

#### 1.3.0

Upgrade dependency to fix security alerts

#### 1.2.0

Fix the issue if the word vector contains words which are same as the instance methods

#### 1.1.0

The vector operations now would update the instance itself, rather than creating a new vector object. It is for better performance so less objects are created during the calculations. This is a **NON-COMPATIBLE** change. If you are using versions < 1.1.0, you may need rewrite a bit your code. Sorry for that 🙏🏼

## Usage

* [constructor](#constructor)
* [clone()](#clone)
* [toObject()](#toobject)
* [getComponents()](#getcomponents)
* [get(component)](#getcomponent)
* [set(component, value)](#setcomponent-value)
* [isEqual(vector)](#isequalvector)
* [getDistance(vector)](#getdistancevector)
* [getLength()](#getlength)
* [getDotProduct(vector)](#getdotproductvector)
* [getCosineSimilarity(vector)](#getcosinesimilarityvector)
* [normalize()](#normalize)
* [add(vector)](#addvector)
* [subtract(vector)](#subtractvector)
* [multiply(scalar)](#multiplyscalar)
* [divide(scalar)](#dividescalar)
* [chainability](#chainability)

### constructor

create a new vector object
```js
const a = new Vector({ x: 1, y: 2, z: 3 });
```

### clone()

return a copy of the vector object
```js
const a = new Vector({ x: 1, y: 2, z: 3 });
const b = a.clone();

console.log(b); // return { x: 1, y: 2, z: 3 }
```

### toObject()

return an json object of the vector
```js
const a = new Vector({ x: 1, y: 2, z: 3 });

console.log(a.toObject()); // return { x: 1, y: 2, z: 3 }
```

### getComponents()

return array of the components in the vector object
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

console.log(a); // return { react: 10, angular: 2, vue: 2, marko: 1 }
```

### isEqual(vector)

return a boolean value if the input vector is same as itself
```js
const a = new Vector({ a: 1, b: 2, c: 3 });
const b = new Vector({ a: 1, b: 2, c: 3 });
const c = new Vector({ a: 1, b: 2 });

console.log(a.isEqual(b)); // return true
console.log(a.isEqual(c)); // return false
console.log(c.isEqual(a)); // return false
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
const a = new Vector({ ant: 1, bird: 2, cat: 3 });
const b = new Vector({ bird: 2, cat: 2, dog: 2 });
const similarityAA = a.getCosineSimilarity(a);
const similarityAB = a.getCosineSimilarity(b);

console.log(similarityAA); // return 1
console.log(similarityAB); // return 0.6236095644623236
```

### normalize()

normalized the vector and return itself
```js
const a = new Vector({ a: 3, b: 4 });
a.normalize();

console.log(a); // return { a: 0.6, b: 0.8 }
```

### add(vector)

perform additional with the input vector and return itself
```js
const a = new Vector({ a: 1, b: 2 });
const b = new Vector({ b: 1, c: 2 });
a.add(b);

console.log(a); // return { a: 1, b: 3, c: 2 }
```

### subtract(vector)

perform subtraction with the input vector and return itself
```js
const a = new Vector({ a: 1, b: 2 });
const b = new Vector({ b: 1, c: 2 });

console.log(a); // return { a: 1, b: 0, c: -2 }
```

### multiply(scalar)

perform scalar multiplication and return itself
```js
const a = new Vector({ a: 1, b: 2, c: 1 });
a.multiply(10);

console.log(a); // return { a: 10, b: 20, c: 10 }
```

### divide(scalar)

perform scalar division and return itself
```js
const a = new Vector({ a: 1, b: 2, c: 1 });
a.divide(10);

console.log(a); // return { a: 0.1, b: 0.2, c: 0.1 }
```

### chainability

The vector calculation methods are chainable so you can write your expression in the following way:
```js
const a = new Vector({ a: 1, b: 2, c: 1 });
const b = new Vector({ a: 2, b: 1 });
const c = new Vector({ a: 1, b: 4, d: 2 });

const v = a.clone().add(b).subtract(c).normalize();
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
