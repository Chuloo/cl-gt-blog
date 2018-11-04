const config = require("./config")

module.exports = {
    siteMetadata: {
      title: `Memes 101`,
    },
    plugins: [
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src/`,
        },
      },
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography.js`,
        },
      },
      {
        resolve:`gatsby-source-cloudinary`,
        options:{
          cloudName: config.cloudName,
          apiKey: config.apiKey,
          apiSecret: config.apiSecret,
          resourceType: 'video',
          type: 'upload',
          maxResults: 20,
          tags:true,
          prefix: 'gatsby-video-blog/'
        }
      },
      {
        resolve: `gatsby-mdx`,
        options: {
          defaultLayouts: {
            posts: require.resolve("./src/components/layout.js"),
            default: require.resolve("./src/components/layout.js")
          }
        }
      },
    ],
}