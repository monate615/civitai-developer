# Civitai Developer Docs

Documentation for the Civitai platform

## Table of Content

- [Project Setup](#project-setup)
  - [Install](#install)
  - [Local Development](#local-development)
  - [Build](#build)
- [Docusaurus](#docsaurus)
- [Contributing](#contributing)

## Project Setup

### Install

```bash
$ yarn
```

### Local Development

```bash
$ yarn start
```

### Build

```bash
$ yarn build
```

## Docsaurus

This project is currently using [Docusaurus 2](https://docusaurus.io/).

### Adding external markdown

To import external markdown we use the "docusaurus-plugin-remote-content" plugin. In the `docusaurus.config.js` you will want to add a new plugin to the array. You can use the code below and update based on the comments below for your page.

```js
[
      "docusaurus-plugin-remote-content",
      {
        name: "post-intent-system", // This will be the route name
        sourceBaseUrl:
          "https://raw.githubusercontent.com/wiki/civitai/civitai/", // The base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "docs", // The base directory to output to. This determines how it shows in the sidebar
        documents: ["Post-Intent-System.md"], // All files in this list will be downloaded from the sourceBaseUrl
        modifyContent(filename, content) {
            // This is used to update a specific document. You can add more complexity here for many documents.
          if (filename.includes("Post-Intent-System")) {
            return {
                // Match this to the name but with .md (the new file)
              filename: "post-intent-system.md",
              // Here we update to add a title to the page.
              // The content item contains all of the markdown from the file
              content: `---
title: Post Intent System
---
${content}
              `,
            };
          }

          // we don't want to modify this item, since it doesn't contain "README" in the name
          return undefined;
        },
      },
    ],
```

## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the repository to your own GitHub account.
2. Create a new branch for your changes.
3. Make your changes to the code.
4. Commit your changes and push the branch to your forked repository.
5. Open a pull request on our repository.

Hop into the development channel in our [Discord server](https://discord.gg/UwX5wKwm6c) and let's chat!
