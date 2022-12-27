import styled, {keyframes} from "styled-components";

export default function Help() {
  return (
    <Container>
      <TooltipLens>
        <Ballon>
          <WrapperContent>
            <p>Hey, there!</p>
          </WrapperContent>
        </Ballon>
      </TooltipLens>
    </Container>
  );
}

const ballong = keyframes`
    0% {
      transform: translateY(28px);
      opacity: 1;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    50% {
      transform: translateY(-18px);
      opacity: 1;
      width: 30px;
      height: 30px;
      border-radius: 50%;
  
    }
    100% {
      transform: translateY(-10px);
      opacity: 1;
      width: 180px;
      height: 90px;
      border-radius: 5px;
    }
  `;

const ballongContentArrow = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;
const ballongContent = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

const shake = keyframes`
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(5deg);
    }
    60% {
      transform: rotate(-5deg);
    }
    70% {
      transform: rotate(5deg);
    }
    80% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  `;

const Container = styled.div`
  width: 20%;
  height: 100px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent; /* fallback for old browsers */
  background: transparent; /* Chrome 10-25, Safari 5.1-6 */
  background: transparent; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const TooltipLens = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 5;
  animation: ${shake} cubic-bezier(0.36, 0.07, 0.19, 0.97) 1000ms forwards;
  animation-delay: 2000ms;
`;

const Ballon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: solid 2px white;
  background: rgb(255, 255, 255, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  animation: ${ballong} cubic-bezier(0.68, -0.55, 0.27, 1.55) 2000ms forwards;

  &:after {
    content: "";
    height: 20px;
    width: 20px;
    background: rgb(255, 255, 255, 0.1);
    z-index: -1;
    border: solid 2px rgb(255, 255, 255, 0.1);
    transform: rotate(45deg);
    position: absolute;
    bottom: -5px;
    opacity: 0;
    animation: ${ballongContentArrow} cubic-bezier(0.68, -0.55, 0.27, 1.55)
      2000ms forwards;
    animation-delay: 800ms;
  }
`;

const WrapperContent = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${ballongContent} cubic-bezier(0.68, -0.55, 0.27, 1.55) 2000ms
    forwards;
  animation-delay: 1000ms;

  p {
    font-family: "Poppins";
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    padding: 5px;
    border-radius: 5px;
    font-weight: 700;
  }
`;
