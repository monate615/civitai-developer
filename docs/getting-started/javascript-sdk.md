---
sidebar_position: 3
---

# JavaScript SDK

Currently the JavaScript SDK is utilized for image generation. If you are looking for other information such as your user, searching models, etc. please refer to our [Public REST API](/docs/api/public-rest)

## Installation

```bash
npm install civitai
```

## Usage

#### Create the client:

```js
// ESM (where `"type": module` in package.json or using .mjs extension)
import { Civitai } from "civitai";

// CommonJS (using .cjs extension)
const Civitai = require("civitai");
```

```js
const civitai = new Civitai({
  auth: "YOUR_API_TOKEN",
});
```

#### Create a txt2img job:

```js
import { Scheduler } from "civitai";

const input = {
  model: "urn:air:sd1:checkpoint:civitai:4201@130072",
  params: {
    prompt:
      "RAW photo, face portrait photo of 26 y.o woman, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt:
      "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3)",
    scheduler: Scheduler.EULER_A,
    steps: 20,
    cfgScale: 7,
    width: 512,
    height: 512,
    clipSkip: 2,
  },
};
```

Run a model:

```js
const response = await civitai.image.fromText(input);
```

Then fetch the result later:

```js
const output = civitai.jobs.get(response.token);
```

Or wait for the job to finish by running the generation in the background a.k.a long polling:

```js
const response = await civitai.image.fromText(input, true); // Add true flag
```

_Note: Jobs timeout after 10 minutes._
