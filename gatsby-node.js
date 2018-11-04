const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
      graphql(`
        {
            allMdx {
            edges {
                node {
                    fields {
                        slug
                    }
                    id
                    parent {
                        ... on File {
                        name
                        sourceInstanceName
                        }
                    }
                    code {
                        scope
                    }
                }
            }
            }
        }
      `
  ).then(result => {
        result.data.allMdx.edges.forEach(({ node }) => {
            createPage({
            path: node.fields.slug,
            component: componentWithMDXScope(
                path.resolve("./src/templates/blog-post.js"),
                node.code.scope
            ),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.fields.slug,
                id: node.id
            },
            })
        })
        resolve()
      })
    })
  }