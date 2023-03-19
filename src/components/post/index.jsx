import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, Share as ShareIcon } from "@mui/icons-material";
import React from "react";
import { useState } from 'react';
import  "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.locale('ru');
dayjs.extend(relativeTime);

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto'
}));



export const Post = ({image, title, text, created_at, author, ...props}) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <Grid2 sx={{display: 'flex'}} item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{display: 'flex', flexDirection: 'column'}}>
            <CardHeader
                avatar={
                    <Avatar src={author.avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {author.name.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={author.name}
                subheader={dayjs(created_at).fromNow()}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h5" component="h4" gutterBottom>{title}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {text}
                </Typography>

            </CardContent>
            <CardActions sx={{marginTop: 'auto'}} disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}

                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, mollitia tempore iure aperiam, quasi voluptates dolores eum corrupti aut voluptatibus velit saepe molestiae repellat libero? Ullam optio placeat accusantium aspernatur.</Typography>
                </CardContent>
            </Collapse>
        </Card>
        </Grid2>
        
    )
}