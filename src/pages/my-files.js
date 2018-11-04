import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    console.log(data)
    return (
      <Layout>
        <div>
          <h1>My Cloudinary Files</h1>
          <table>
            <thead>
              <tr>
                <th>relativePath</th>
                <th>prettySize</th>
                <th>extension</th>
                <th>birthTime</th>
              </tr>
            </thead>
            <tbody>
              {data.allCloudinaryMedia.edges.map(({ node }, index) => (
                <tr key={index}>
                  <td>{node.url}</td>
                  <td>{node.format}</td>
                  <td>{node.public_id}</td>
                  <td>{node.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    )
}

export const query = graphql`
  query {
    allCloudinaryMedia{
        edges{
        node{
            url
            format
            public_id
            created_at(fromNow: true)
        }
        }
    }
  }
`