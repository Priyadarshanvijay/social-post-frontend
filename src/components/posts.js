import React, { useEffect, useState } from "react";
import SinglePost from './singlePost';
import { CardGroup, Button, Grid, GridColumn, GridRow, Header, Icon, Container, Form, Image, Segment, Divider } from "semantic-ui-react";
import CloudinaryUploadWidget from './imageUploader';
import { getRequest, postRequest } from "../utils/postRequests";
import { appendToStateArray } from "../utils/stateUpdate";
import FriendsHeader from "./friendsHeader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [morePostsRemaining, setMorePostsRemaining] = useState(false);
  const [cursor, setCursor] = useState('');
  const [posting, setPosting] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [mediaContent, setMediaContent] = useState('');
  const [title, setTitle] = useState('');
  const [username, setusername] = useState('');

  const getPosts = async () => {
    const response = await getRequest(`posts?cursor=${cursor}&limit=10`)();
    setMorePostsRemaining(response.success && !response.list_complete);
    appendToStateArray(setPosts)(response.posts);
    setCursor(response.cursor);
  };

  const handleChangeMap = {
    username: setusername,
    textContent: setTextContent,
    mediaContent: setMediaContent,
    title: setTitle
  }

  const handleChange = (e, { name, value }) => {
    handleChangeMap[name](value)
  };

  const addPost = async () => {
    const body = {
      title,
      username,
      textContent,
      mediaContent: mediaContent || undefined
    };
    try {
      const response = await postRequest(`posts`)(body);
      const newPost = {
        title,
        username,
        textContent,
        mediaContent,
        id: response.postId
      };
      appendToStateArray(setPosts)([newPost], true);
    } catch (e) {
      console.log(e)
    } finally {
      setPosting(false);
      setusername('');
      setTextContent('');
      setMediaContent('');
      setTitle('');
    }
  }

  function LoadMore(props) {
    const anyMorePosts = props.morePosts;
    if (anyMorePosts) {
      return <Button primary fluid onClick={getPosts}>Load More Posts</Button>;
    }
    return <></>;
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <FriendsHeader />
      <Grid divided columns='equal'>
        <GridRow>
          <GridColumn width='12'>
            {posts.length > 0 ? <></> : <Segment textAlign='center'>No posts to show</Segment>}
            <CardGroup >
              {posts.map((post) => (
                <SinglePost key={post.id} postResp={post} />
              ))}
            </CardGroup>
          </GridColumn>
          <GridColumn >
            <Header as='h3' dividing>
              Add a new Post
            </Header>
            <Segment>
              <Image hidden={!mediaContent} src={mediaContent} size='medium' wrapped centered />
              <Form loading={posting} onSubmit={addPost}>

                <Form.Input label='Username' name='username' value={username} onChange={handleChange} />
                <Form.Input label='Title' name='title' value={title} onChange={handleChange} />
                <Form.TextArea label='Post' name='textContent' value={textContent} onChange={handleChange} />
              </Form>
            </Segment>
            <Segment basic>
                <CloudinaryUploadWidget setImageURL={setMediaContent} />  
                </Segment>
              <Segment basic padded>
                <Form loading={posting} onSubmit={addPost}>
                  <Button fluid content='Add Post' labelPosition='left' icon='send' primary />
                </Form>
            </Segment>
          </GridColumn>
        </GridRow>
        <GridRow>
          <LoadMore morePosts={morePostsRemaining} />
        </GridRow>
      </Grid>
    </Container>
  );
};

export default Posts;