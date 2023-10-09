import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state/Store"
import PostWidget from "./PostWidget"

const PostsWidgets = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getPosts = async () => {
        const response = await fetch(`https://connect-rouge-nine.vercel.app/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }
    const getUserPosts = async () => {
        const response = await fetch(`https://connect-rouge-nine.vercel.app/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts()
        }
    }, [posts])

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstname,
                    lastname,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstname} ${lastname}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    ></PostWidget>
                )
            )}
        </>
    )
}

export default PostsWidgets