import { Button, Container, CssBaseline, GlobalStyles } from "@mui/material"
import { Delete, DeleteForever, Download, Upload } from "@mui/icons-material";
import { AppHeader } from "../app-header";
import { PostList } from "../post-list";
import { postData } from "../../postData";
//если не нужно ререндерить компонет описываем его до export а потом в него вставляем ссылку
const globalStyles = <GlobalStyles styles={{h1: {color: 'grey'}}} />
const cssBaseLine = <CssBaseline /> //аналог normalize.css

export const AppMui = () => {
    
    
    
    return (
        <>
            {globalStyles}
            {cssBaseLine}
            <Container>
                <AppHeader />   
                <PostList posts={postData}/> 
            </Container>
            
            

        </>
    )
}