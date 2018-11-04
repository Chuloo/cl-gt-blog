import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "react-emotion"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Video from "../components/video"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          className={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          The Numero Uno for Memeeeees!
        </h1>
        <h4>{data.allMdx.totalCount} Posts</h4>
        {data.allMdx.edges.map(({ node }) => (
          <div key={node.id}>
          <Link
              to={node.fields.slug}
              className={css`
                text-decoration: none;
                color: inherit;
              `
              }
            >
            <h3
              className={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                className={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
            fields{
                slug
            }
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`