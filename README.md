### vec-js

A JavaScript library for working with vectors.

## Usage

```bash
npm install @taiyuuki/vec-js
```

```javascript
import { vec2, vec3, vec4 } from '@taiyuuki/vec-js'

const v3 = vec3(1, 2, 3)

console.log(v3.x) // 1
console.log(v3.y) // 2
console.log(v3.z) // 3
console.log(v3.r) // 1
console.log(v3.g) // 2
console.log(v3.b) // 3
console.log(v3.xx) // {x: 1, y: 1}
console.log(v3.xy) // {x: 1, y: 2}
console.log(v3.rgb) // [1, 2, 3]

```