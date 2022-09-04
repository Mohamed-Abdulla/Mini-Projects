import { Container, Stack } from "react-bootstrap";
import img from "../../public/imgs/github.png";
const Home = () => {
  return (
    <Container>
      <Stack>
        <h1>Check the store tab</h1>
        <h5>This advanced shopping cart is build using typescript and react</h5>
      </Stack>

      <Container>
        <a href="" target="_blank" rel="no">
          <img src={img} alt="github" />
        </a>
      </Container>
    </Container>
  );
};

export default Home;
