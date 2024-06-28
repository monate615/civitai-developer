---
title: Post Intent System
---
# Post Intent System
*[Twitter style Web Intents](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent) but for Civitai*

### What it Does
It brings the user to a Civitai page with pre-made values for creating a media post. You can also set up an endpoint that will allow us to pull additional metadata about how the media was created so that we can present those details along-side the media, making it easier for other people to jump into your app and make something similar.

### Base URL
`https://civitai.com/intent/post`

### Media Requirements
- CORS enabled
- Accepts images
    - Types: `png, jpg, jpeg, webp`
    - Max size: `50 MB`
- Accepts video
    - Types: `mp4, webm`
    - Max size: `500 MB`
    - Max duration: `120 seconds`
    - Max dimensions: `4k`


### Query Parameters

| Name | Type | Restrictions | Description |
| -------- | -------- | -------- | -------- |
| mediaUrl | string* | URL | Absolute URL of the media to post |
| title | string | | Title to use for the post |
| description | string | | Text to use in the description of the post |
| tags | string | Comma-separated,<br/>Max of 5 | Tags to apply to the post |
| detailsUrl | string | URL | URL we should call to get additional parameters for the media (JSON).<br/>They can include parameters specific to your service so that people can have a better idea of how the media was made.<br/>Only for approved domains - contact us to be added. |

### Details URL Structure

| Name | Type  | Restrictions | Description |
| -------- | -------- | -------- | -------- |
| source | object | | Name and/or homepage for your service |
| source.name | string | | Name of your service |
| source.homepage | string | URL | Your service's home URL |
| createUrl | string | URL | Link back to the URL used to create the media |
| referenceUrl | string | URL | URL to link back to the source of the media |
| details | object | Max 10 params | Key-value object for custom parameters specific to your service.<br/> |
| details.[key: string] | string \| number \| boolean | | Key-value pair |

### Example Request URL
```
https://civitai.com/intent/post
    ?mediaUrl=https://yoursite.com/image.jpg
    &title=New%20Post&description=my%20great%20image
    &tags=person,forest,green
    &detailsUrl=https://yoursite.com/api/image-details/123
```


### Example Details URL Response

```json
"source": {
  "name": "Your Service",
  "homepage": "https://yoursite.com"
},
"createUrl": "https://yoursite.com/create/img?prompt=person%20in%20forest",
"referenceUrl": "https://yoursite.com/images/[id]",
"details": {
    "myParam": "special",
    "otherParam": 2,
    "anotherParam": true
}
```
              