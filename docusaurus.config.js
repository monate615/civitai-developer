// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Civitai | Developer Portal",
  tagline: "Documentation for Civitai APIs for use in your applications",
  url: "https://civitai.github.io",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  organizationName: "civitai",
  projectName: "developer",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: "Civitai",
        logo: {
          alt: "Civitai",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            label: "API",
            position: "left",
            to: "/docs/category/api",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/civitai",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/civitai",
              },
              {
                label: "Discord",
                href: "https://civitai.com/discord",
              },
              {
                label: "X",
                href: "https://civitai.com/twitter",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/civitai",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Civitai, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["ruby", "csharp", "php"],
      },
    }),

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "orchestration",
        docsPluginId: "classic",
        config: {
          orchestration: {
            specPath: "examples/orchestration.json",
            outputDir: "docs/api/orchestration",
            // downloadUrl:
            //   "https://image-generation.civitai.com/swagger/consumer-v1/swagger.json",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          },
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        name: "javascript-sdk", // used by CLI, must be path safe
        sourceBaseUrl:
          "https://raw.githubusercontent.com/civitai/civitai-javascript/master/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "docs/api", // the base directory to output to.
        documents: ["README.md"], // the file names to download
        modifyContent(filename, content) {
          if (filename.includes("README")) {
            return {
              filename: "javascript-sdk.md",
              content: `---
title: JavaScript SDK
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
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        name: "python-sdk", // used by CLI, must be path safe
        sourceBaseUrl:
          "https://raw.githubusercontent.com/civitai/civitai-python/master/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "docs/api", // the base directory to output to.
        documents: ["README.md"], // the file names to download
        modifyContent(filename, content) {
          if (filename.includes("README")) {
            return {
              filename: "python-sdk.md",
              content: `---
title: Python SDK
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
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        name: "post-intent-system", // used by CLI, must be path safe
        sourceBaseUrl:
          "https://raw.githubusercontent.com/wiki/civitai/civitai/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "docs", // the base directory to output to.
        documents: ["Post-Intent-System.md", "Diffusion-Partner-Program.md"], // the file names to download
        modifyContent(filename, content) {
          if (filename.includes("Post-Intent-System")) {
            return {
              filename: "post-intent-system.md",
              content: `---
title: Post Intent System
---
${content}
              `,
            };
          }

          if (filename.includes("Diffusion-Partner-Program")) {
            return {
              filename: "diffusion-partner-program.md",
              content: `---
sidebar_position: 5
title: Diffusion Partner Program
---
${content}
              `,
            };
          }

          if (filename.includes("Civitai-Link-Integration")) {
            return {
              filename: "link.md",
              content: `---
sidebar_position: 3
title: Link
tags:
  - link
  - models
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
    [
      "docusaurus-plugin-remote-content",
      {
        // options here
        name: "public-rest", // used by CLI, must be path safe
        sourceBaseUrl:
          "https://raw.githubusercontent.com/wiki/civitai/civitai/", // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: "docs/api", // the base directory to output to.
        documents: ["REST-API-Reference.md"], // the file names to download
        modifyContent(filename, content) {
          if (filename.includes("REST-API-Reference")) {
            return {
              filename: "public-rest.mdx",
              content: `---
sidebar_position: 1
title: Public REST API
tags:
  - rest
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
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

module.exports = config;
