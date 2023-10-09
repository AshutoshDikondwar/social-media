import { Box, useTheme, Typography } from '@mui/material'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setFriends } from '../../state/Store'


const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
  
    const getFriends = async () => {
      const response = await fetch(
        `https://connect-beta-three.vercel.app/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    };
  
    useEffect(() => {
      getFriends();
    }, []); 
  
    return (
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Friend List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstname} ${friend.lastname}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default FriendListWidget;