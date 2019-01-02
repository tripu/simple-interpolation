# Simple Interpolation

A Simple interpolation Node.js module that construct new data points within the range of a discrete set of known data points

## Module Installation 

You can install this module using NPM:

```sh
npm install simple-interpolation --save
```

## Module Single Interpolation

```sh
  Simple Schema of Single interpolation

  ---|---|
  x1 |v1 |
  ---|---|
   x | v |
  ---|---|
  x2 |v2 |
  ---|---|
```
Simple using way

```javascript
import { single } from 'simple-interpolation';

const points = [{ x: 1, v: 1}, { x: 2, v: 2 }];

single(points)({ x: 1.5 }); // v -> 1.5
single(points)({ v: 1.5 }); // x -> 1.5
```

Or you can using JavaScript alternative

```javascript
var simple = require('simple-interpolation');

var points = [{ x: 1, v: 1}, { x: 2, v: 2 }];
var single = simple.single(points);

single({ x: 1.5 }); // v -> 1.5
single({ v: 1.5 }); // x -> 1.5
```

Or you can using JavaScript(Babale) alternative

```javascript
import { single } from 'simple-interpolation';

const points = [{ x: 1, v: 1}, { x: 2, v: 2 }];

const f = single(points);

f({ x: 1.5 }); // v -> 1.5
f({ v: 1.5 }); // x -> 1.5
```

Or you can using TypeScript alternative

```typescript
import { single } from "simple-interpolation";

const points = [{ x: 1, v: 1}, { x: 2, v: 2 }];

const f = single(points);

f({ x: 1.5 }); // v -> 1.5
f({ v: 1.5 }); // x -> 1.5
```

## Module Double Interpolation

```sh
  Simple Schema of Double interpolation

     |x1 | x |x2 |
  ---|---|---|---|
  y1 |v11|   |v12|
  ---|---|---|---|
   y |   | v |   |
  ---|---|---|---|
  y2 |v21|   |v22|
  ---|---|---|---|
```

Simple using way

```javascript
import { double } from 'simple-interpolation';

const points = [{ x: 1, y: 1, v: 11 }, { x: 2, y: 1, v: 12 }, { x: 1, y: 2, v: 21 }, { x: 2, y: 2, v: 22 }];

double(points)({ x: 1.5, y: 1.5 }); // v -> 1.5
double(points)({ x: 1.5, v: 1.5 }); // y -> 1.5
double(points)({ y: 1.5, v: 1.5 }); // x -> 1.5
```

Or you can using JavaScript alternative

```javascript
var simple = require('simple-interpolation');
var points = [{ x: 1, y: 1, v: 11 }, { x: 2, y: 1, v: 12 }, { x: 1, y: 2, v: 21 }, { x: 2, y: 2, v: 22 }];

var f = simple.double(points);

f({ x: 1.5, y: 1.5 }); // v -> 1.5
f({ x: 1.5, v: 1.5 }); // y -> 1.5
f({ y: 1.5, v: 1.5 }); // x -> 1.5
```

Or you can using JavaScript(Babale) alternative

```javascript
import { double } from 'simple-interpolation';

const points = [{ x: 1, y: 1, v: 11 }, { x: 2, y: 1, v: 12 }, { x: 1, y: 2, v: 21 }, { x: 2, y: 2, v: 22 }];

const f = double(points);

f({ x: 1.5, y: 1.5 }); // v -> 1.5
f({ x: 1.5, v: 1.5 }); // y -> 1.5
f({ y: 1.5, v: 1.5 }); // x -> 1.5
```

Or you can using TypeScript alternative

```typescript
import { double } from "simple-interpolation";

const points = [{ x: 1, y: 1, v: 11 }, { x: 2, y: 1, v: 12 }, { x: 1, y: 2, v: 21 }, { x: 2, y: 2, v: 22 }];

const f = double(points);

f({ x: 1.5, y: 1.5 }); // v -> 1.5
f({ x: 1.5, v: 1.5 }); // y -> 1.5
f({ y: 1.5, v: 1.5 }); // x -> 1.5
```

## Module Test 

For run module tests execute

```sh
npm run test
```

## Module License
Except where noted otherwise, files are licensed under the MIT License.

## More Information

- [Single or Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation).
- [Double or Bilinea interpolation](https://en.wikipedia.org/wiki/Bilinear_interpolation).
