import { Header, Icon, Divider } from "semantic-ui-react";

const friendsHeader = () => {
  return (
    <>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Friends</Header.Content>
      </Header>
      <Divider section />
    </>
  )
};

export default friendsHeader;
