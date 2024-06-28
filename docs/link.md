---
sidebar_position: 3
title: Link
tags:
  - link
  - models
---

To make it easier to interact with your SD instance wherever it is, we've created a linking service that communicates between the SD instance and one to many clients from a single user.

Ideally, this could be used to expose your SD instance to any front-end that then opts to use the Civitai Link, making it possible to generate right from any page that integrates it.

### Special Features

- Accessible from any site that integrates the link service
- Can be used from any device, allow you to managing resources and generating images from your beefy desktop while browsing on your mobile device
- No need to setup special firewall permissions, cors permissions, or API access, just install the extension and establish your link.

### Initial Use Cases

- Manage the resources on your SD instance
- Generate on sites using your own SD instance from any device

# Integrating Civitai Link

### Interested in having Civitai Link connect to your Stable Diffusion service?

We've provided a brief outline of how it works below and would be happy to meet with you to discuss integration. The best way to reach us is in the [Development channel on our Discord server](https://civitai.com/discord).

### Interested in using Civitai Link as part of your web app?

Cool! We're excited to hear what you have in mind. The best way to reach us is in the [Development channel on our Discord server](https://civitai.com/discord).

# How the Link works

## First Connection

```sequence
Client->Server: POST LinkInstance
Note over Server: Generates LinkInstance
Server->Client: Returns LinkKey
Client->Server: Join room with LinkKey
Client-->Extension: User copies over LinkKey
Extension->Server: Join room\nwith LinkKey
Note over Server: Upgrades LinkKey
Note over Server: Moves to upgrade room
Server->Extension: Gives new LinkKey
Note over Extension: Stores new LinkKey
Client->Extension: Makes requests in room
Note over Extension: Perform actions
Extension->Client: Responds with status in room
Note over Server: On Disconnect notify room
```

## Following Connections

## Client

```sequence
Client->Server: GET LinkInstances
Note over Server: Finds LinkInstances for User
Server->Client: Returns LinkInstances
Note over Client: Selects LinkInstance
Client->Server: Join room with LinkKey
```

## Extension

```sequence
Note over Extension: Load stored LinkKey
Extension->Server: Join room with LinkKey
```

**Note:** If the LinkKey no longer exists, the extension is disconnected and the stored LinkKey is removed.

# Link Commands

Once the link is established, it can be used for a variety of purposes. Here are a few of the commands we'd like to support initially.

:a: = Alpha feature
:b: = Beta feature

## Base Command

```
{
  id: 'uuid', // The identifier for the request
  version: 'semantic version', // Version of the request
  createdAt: Date,
  updateAt?: Date
}
```

## `activities:list` :a:

**Request**

```
{}
```

**Response**

```
[{
  ... Response of last 10 requests
}]
```

## `resources:add` :a:

**Request**

```
{
  id: 'uuid',
  resources: [{
    type: 'lora' | 'checkpoint' ...;
    hash: 'sha256',
    name: 'name of file',
    previewImage: 'url to preview image',
    url: 'url to download if missing'
  }]
}
```

**Response**

```
{
  id: 'uuid',
  resources: [{
    //... props from request
    status: 'pending' | 'processing' | 'success' | 'error' | 'canceled',
    progress: 0-100.00
  }]
  status: 'pending' | 'processing' | 'success' | 'error',
}
```

## `resources:add:cancel` :a:

**Request**

```
{
  id: 'uuid', // id of initial add request
  resources: [{
    type: 'lora' | 'checkpoint' ...;
    hash: 'sha256'
  }]
}
```

**Response**

```
{
  id: 'uuid',
  resources: [{
    //... props from request
    status: 'canceled'
  }]
  status: 'success',
}
```

## `resources:remove` :a:

**Request**

```
{
  id: 'uuid',
  resources: [{
    type: 'lora' | 'checkpoint' ...;
    hash: 'sha256',
  }]
}
```

**Response**

```
{
  id: 'uuid',
  resources: [{
    //... props from request
    status: 'pending' | 'processing' | 'success' | 'error',
  }]
  status: 'pending' | 'processing' | 'success' | 'error',
}
```

## `resources:list` :a:

**Request**

```
{
  id: 'uuid',
  types: [
    'checkpoint',
    'lora',
    //...
  ]
}
```

**Response**

```
{
  id: 'uuid',
  resources: [{
    type: 'lora' | 'checkpoint' ...;
    hash: 'sha256',
    name: 'name of file',
    path: 'optional path to file on fs'
  }]
}
```

## `image:txt2img` :b:

**Note:** It's likely that the connection will be upgraded to WebRTC before doing image generation requests to reduce latency and remove our service as a middleman
**Request**

```
{
  id: 'uuid',
  quantity: 1, // How many to generate
  batchSize: 1,
  model: hash,
  vae: hash,
  additionalNetworks: [{
    type: 'hypernet' | 'lora',
    hash: 'hash',
    name: 'name',
    strength: 0.000-1.000
  }],
  params: {
    prompt,
    negativePrompt,
    sampler,
    seed,
    steps,
    width,
    height,
    cfgScale
  }
}
```

**Response**

```
{
  id: 'uuid',
  images: ['base64']
}
```

## `image:img2img` :b:

**Note:** It's likely that the connection will be upgraded to WebRTC before doing image generation requests to reduce latency and remove our service as a middleman
**Request**

```
{
  //... content of txt2img
  params: {
    //... content of txt2img.params
    initImage: 'url or base64',
    maskImage: 'url or base64',
    denoiseStrength: 0.00-1.00,
    maskedOnly: false
  }
}
```

**Response**

```
{
  id: 'uuid',
  images: ['base64']
}
```
