import React from "react";
import {graphql, StaticQuery} from "gatsby"
import config from "../../config"

const Video = (props) => {
    const videoTitle = props.title;
    const publicIdRoot = config.rootFolder
    return (
    <StaticQuery
        query = {graphql `
           query {
            allCloudinaryMedia{
                edges{
                    node{
                        public_id
                        url
                        format
                        resource_type
                    }
                }
            }
           } 
        
        `}
        render= { data => {
        const videos = data.allCloudinaryMedia.edges;
            return (
                <div>
                    {videos
                        .filter((video) => video.node.public_id === `${publicIdRoot}/${videoTitle}`)
                        .map((eachVideo => (
                            <>
                                <video controls style={videoStyle}>
                                    <source key ={eachVideo.node.public_id} src={eachVideo.node.url} type={`${eachVideo.node.resource_type}/${eachVideo.node.format}`}/>
                                </video>
                            </>
                        )))
                        }
                </div>
            )}
        }

    />
    )
}

const videoStyle = {
    margin: "10px auto",
    display: "flex"
}

export default Video
