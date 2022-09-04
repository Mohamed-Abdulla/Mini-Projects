import { Container, Stack } from "react-bootstrap";
import img from "../../public/imgs/github.png";
const Home = () => {
  return (
    <Container className="d-flex align-items-center justify-content-space-between">
      <Stack gap={4}>
        <h1>Check the store tab</h1>
        <h5>This advanced shopping cart is build using typescript and react</h5>
      </Stack>

      <div>
        <span>Source code -- </span>
        <a href="https://github.com/Mohamed-Abdulla/Mini-Projects/tree/cart" target="_blank" rel="">
          <img src={img} alt="github" />
        </a>
      </div>
    </Container>
  );
};

export default Home;
