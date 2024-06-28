---
sidebar_position: 5
title: Diffusion Partner Program
---
To bring down the barrier of entry for people wanting to use models available on Civitai, we partner with image generation services to offer "Run Now" functionality for many models on the site.

If you own or operate an image generation service and would be interested in becoming a Diffusion Partner, we invite you to take a moment to read this to understand how the program works and then if you're interested complete our partner request form.

## What it looks like
![Demo of the Run Now functionality](https://user-images.githubusercontent.com/607609/206595823-6c3c8512-7faf-4e48-9166-aaf9b257ec5b.png)

## How it works
**Note**: Things in this industry are moving fast and this process is likely to change/improve.

### For "On-Demand" Diffusion Partners
1. You provide us with a specific URL to direct users to your service to load a specific model (eg. `https://diffusion.run/?model={downloadUrl}`, `https://diffusion.run/?modelVersionId={modelVersionId}`, `https://diffusion.run/?modelId={modelId}`).
2. We list you as a Diffusion Partner on every model that you support (you have the ability to disable NSFW and specific people models).
3. When a person selects your service from the run menu, we route them through our run endpoint and redirect them to the URL you provided.

### For "Limited Model" Diffusion Partners
1. We provide you with a unique endpoint you can hit at any time to update our records of which model you support (details on how that works below).
2. You periodically post the list of models you support via the provided endpoint.
3. We list you as a Diffusion Partner on every model that you support.
4. When a person selects your service from the run menu, we route them through our run endpoint and redirect them to the URL you provided.

#### Supported Models Endpoint (For "Limited Model" Diffusion Partners)
As a "Limited Model" partner you can use this endpoint at any time to update which models you're listed for on the site.

**Replace supported models**
`POST https://civitai.com/api/v1/partners/supported-models?token={sharedSecret}`
```
[{
  "modelVersionId": 1144,
  "runUrl": "https://diffusion.run/?yourSpecialParamsOrID"
}]
```

**Add supported models**
`PUT https://civitai.com/api/v1/partners/supported-models?token={sharedSecret}`
```
[{
  "modelVersionId": 1144,
  "runUrl": "https://diffusion.run/?yourSpecialParamsOrID"
}]
```

**Remove supported models**
`DELETE https://civitai.com/api/v1/partners/supported-models?token={sharedSecret}`
```
[{
  "modelVersionId": 1144
}]
```

## Interested in joining?
Awesome! We're excited to work with you. Please take a moment to complete the partner request form below:

**[Partner Request Form](https://forms.clickup.com/8459928/f/825mr-5768/VH7T2ZT9V3D9GT9ZXR)** (should only take 5 minutes)

              