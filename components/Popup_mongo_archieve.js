import styled from "styled-components";
import StyledCloseButton from "./styled/StyledCloseButton";
import Image from "next/image";
import Close from "../public/images/close.svg";
import {useArchive, useStates} from "../context/context";
import ArchiveCard from "./ArchiveCard";
import StyledArchiveCard from "./styled/StyledArchiveCard";
import StyledH2 from "./styled/StyledH2";
import StyledP from "./styled/StyledP";

function PopupMongo(props) {
  const {archive} = useArchive();
  const {closePopupMongo} = useStates();

  return (
    props.trigger && (
      <StyledPopup>
        <StyledPopupInner>
          <StyledCloseButton onClick={() => closePopupMongo()}>
            <Image alt="close" src={Close} />
          </StyledCloseButton>
          <StyledH2>SAVED IN DATABASE</StyledH2>
          <StyledArchiveCard header>
            <StyledP>ID</StyledP>
            <StyledP>TITLE</StyledP>
            <StyledP>LINK</StyledP>
            <StyledP>BLOCKCHAIN</StyledP>
            <StyledP>DATE</StyledP>
            <StyledP>DESCRIPTION</StyledP>
            <StyledP />
          </StyledArchiveCard>
          {archive &&
            archive.map((element, i) => {
              return (
                <ArchiveCard
                  key={i}
                  id={element._id}
                  title={element.title}
                  link={element.link}
                  blockchain={element.blockchain}
                  deadline={element.deadline}
                  description={element.description}
                ></ArchiveCard>
              );
            })}
        </StyledPopupInner>
      </StyledPopup>
    )
  );
}

export default PopupMongo;

const StyledPopup = styled.div`
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba (0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPopupInner = styled.div`
  position: relative;
  padding: 10px;
  width: 98%;
  max-height: 100vh;
  height: 70vh;
  border-left: 10px solid #ccd;
  background-color: lightslategray;
  border-radius: 20px;
  overflow-y: scroll;
  margin-bottom: 150px;
  margin-top: 150px;
  z-index: 100;
  opacity: 0.9;

  h2 {
    color: white;
  }
`;
