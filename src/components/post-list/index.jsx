import { Post } from "../post"
import { Card, Grid, Unstable_Grid2 } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"





export const PostList = ({posts}) => {
    
    
    
    return (

        <Grid2 container spacing={4}>
            
            {posts.map((postData) => <Post key={postData._id} {...postData}/>)}
                  
        </Grid2>


        
    )
}