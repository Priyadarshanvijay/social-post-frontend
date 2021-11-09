import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { Card, Image, Button } from 'semantic-ui-react'
import { postRequest } from "../utils/postRequests";

const Post = ({ postResp }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost({
      ...postResp,
      upvotes: (postResp.upvotes || 0),
      downvotes: (postResp.downvotes || 0)
    });
  }, []);

  const incrementVote = (action) => {
    setPost((state) =>  ({
        ...(state || {}),
        [`${action}s`]: state[`${action}s`] + 1
      })
    )
  }

  const vote = (id) => (action) => async () => {
    const body = {
      postId: id,
      action
    };
    try {
      const response = await postRequest(`vote`)(body);
      incrementVote(action);
    } catch (e) {
      console.error(e.message);
    }
  }

  const openPost = (id) => () => {
    const path = `/posts/${id}`;
    navigate(path);
  }

  if (!Object.keys(post).length) return <div />;

  return (


      <Card fluid onClick={() => { }}>
        <Image onClick={openPost(post.id)} src={post.mediaContent} size='medium' wrapped centered />
        <Card.Content onClick={openPost(post.id)}>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>{post.username}</Card.Meta>
          <Card.Description>
            {post.textContent}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group basic size='small'>
            <Button icon='arrow up' onClick={vote(post.id)('upvote')}>
              {post.upvotes || 0} upvotes
            </Button>
            <Button icon='arrow down' onClick={vote(post.id)('downvote')}>
              {post.downvotes || 0} downvotes
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    // </Container>
  );
};

export default Post;