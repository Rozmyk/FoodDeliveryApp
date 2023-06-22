import { ListItemAvatar, ListItem, Skeleton, ListItemText} from "@mui/material";

const SinglePromptLoading = () => {
    return ( <>
    <ListItem>
        <ListItemAvatar>
            <Skeleton variant='circular' width={45} height={45}></Skeleton>
        </ListItemAvatar>
        <ListItemText primary={<Skeleton variant="text"></Skeleton>} secondary={<Skeleton variant="text"></Skeleton>}></ListItemText>
    </ListItem>
    </>);
}
 
export default SinglePromptLoading;