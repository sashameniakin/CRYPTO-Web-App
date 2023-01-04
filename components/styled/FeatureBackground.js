import styled from "styled-components";

const FeatureBackground = styled.div`
  width: ${props => (props.welcome || props.login ? "100%" : "98%")};
  height: ${props =>
    props.welcome ||
    props.transactions ||
    props.login ||
    props.tasks ||
    props.profile
      ? "100vh"
      : ""};
  opacity: 0.8;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 0;
  overflow-y: ${props => (props.transactions ? "scroll" : "")};
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
  display: ${props => (props.profile || props.login ? "flex" : "")};
  flex-direction: ${props => (props.profile || props.login ? "column" : "")};
  justify-content: ${props => (props.profile || props.login ? "center" : "")};
  align-items: ${props => (props.profile || props.login ? "center" : "")};
  gap: ${props => (props.profile ? "10px" : "")};
  h2 {
    border-top: solid 5px #ccd;
    border-bottom: solid 5px #ccd;
    color: white;
    text-align: center;
  }
  h3 {
    color: white;
  }
  p {
    color: white;
  }

  border-radius: 5px;
  margin: 0;
  padding: 20px;
  --x: calc(var(--posX, 0) * 1px);
  --y: calc(var(--posY, 0) * 1px);
  background-image: linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
    radial-gradient(
      90% 100% at calc(50% + var(--x)) calc(0% + var(--y)),
      rgb(200 200 200),
      rgb(022 000 045)
    ),
    radial-gradient(
      100% 100% at calc(80% - var(--x)) calc(0% - var(--y)),
      rgb(250 255 000),
      rgb(036 000 000)
    ),
    radial-gradient(
      150% 210% at calc(100% + var(--x)) calc(0% + var(--y)),
      rgb(020 175 125),
      rgb(000 010 255)
    ),
    radial-gradient(
      100% 100% at calc(100% - var(--x)) calc(30% - var(--y)),
      rgb(255 077 000),
      rgb(000 200 255)
    ),
    linear-gradient(60deg, rgb(255 000 000), rgb(120 086 255));
  background-blend-mode: overlay, overlay, difference, difference, difference,
    normal;
`;

export default FeatureBackground;
