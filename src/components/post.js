import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import SinglePost from './singlePost';
import { Container, Button, Grid, GridRow, GridColumn, Header, Icon, Divider } from "semantic-ui-react";
import Comments from "./comments";
import { getRequest } from "../utils/postRequests";
import FriendsHeader from "./friendsHeader";

const Post = ({ id }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const postResp = await getRequest(`posts?id=${id}`)();
      setPost(postResp);
    };

    getPost();
  }, [id]);

  if (!Object.keys(post).length) return <div />;

  return (
    <div>
      <Container>
      <FriendsHeader />
      <Divider section/>
        <Grid stackable columns={2}>
          <GridRow>
            <GridColumn>
        <SinglePost postResp={{...post, id}}/>
        </GridColumn>
        <GridColumn>
        <Comments commentsList={post.comments} postId={id}/>
        </GridColumn>
        </GridRow>
        <GridRow>
        <Link to="/"><Button primary>Go back</Button></Link>
        </GridRow>
        </Grid>
      </Container>
    </div>
  );
};

export default Post;