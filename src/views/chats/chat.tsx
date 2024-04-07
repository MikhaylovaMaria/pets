import { Card, Col, Row } from "antd";
import { Layout } from "../../components/layout/layout";
import NavDialogs from "../../components/chatComponents/navDialogs";
import Message from "../../components/chatComponents/Message";

const Chats = () => {
  const gridStyleDialogs: React.CSSProperties = {
    backgroundColor: "#FFFDF5",
    width: "25%",
    height: "95vh",
    textAlign: "left",
  };
  const gridStyleChat: React.CSSProperties = {
    width: "75%",
    textAlign: "center",
    backgroundColor: "#FFFDF5",
  };
  return (
    <Layout>
      <Card>
        <Card.Grid style={gridStyleDialogs}>
          <NavDialogs />
        </Card.Grid>
        <Card.Grid style={gridStyleChat}>
          <Message />
        </Card.Grid>
      </Card>
    </Layout>
  );
};

export default Chats;
