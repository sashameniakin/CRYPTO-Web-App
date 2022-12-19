import {Hashloader} from "react-spinners";
import styled from "styled-components";

const Loader = () => {
  return (
    <Wrapper>
      <Hashloader color="#eeeeee" size={80} />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
