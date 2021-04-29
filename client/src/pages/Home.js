import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import PostCard from '../component/Postcard'

const Home = () => {
    const { 
        loading, 
        data
    } = useQuery(FETCH_POST_QUERY)
    const posts = !loading && data.getPosts
   
    return <Grid columns={3}>
        <Grid.Row className='page-title'>
            <h1> Recent Post </h1>
        </Grid.Row>
        <Grid.Row>
        {loading ? <h2> loading post... </h2> : (
            posts && posts.map((post) => (
                <Grid.Column key={post.id} style={{marginBottom: '30px'}}>
                    <PostCard post={post} />
                </Grid.Column>
            ))
            )}
            </Grid.Row>
    </Grid>
}

const FETCH_POST_QUERY = gql`
{
    getPosts{
        id 
        body 
        createdAt 
        username
        comments {
            id 
            body 
            username 
            createdAt
        }
        likes {
            id 
            username
            createdAt
        }
        likeCount
        commentCount
    }
}
`

export default Home