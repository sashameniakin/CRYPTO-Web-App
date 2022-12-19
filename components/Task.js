import styled, {css} from "styled-components";
import {StyledImage} from "./Header";
import Archive from "../public/images/archive.svg";
import Delete from "../public/images/delete.svg";
import DeleteActiv from "../public/images/delete_activ.svg";
import DetailsDown from "../public/images/down.svg";
import DetailsUp from "../public/images/up.svg";
import {StyledButton} from "./Header";
import {useActivities} from "../context/context";
import Done from "../public/images/done.svg";
import DoneActiv from "../public/images/done_activ.svg";
import ArchiveActive from "../public/images/archive_activ.svg";
import DetailsActiveUp from "../public/images/up_activ.svg";
import DetailsActiveDown from "../public/images/down_activ.svg";
import {useState} from "react";

export default function Task(props) {
  const {refff, id, titel, link, blockchain, date, description, ...rest} =
    props;
  const {activities, handleDelete, handleDetails, handleClick, setUpdate} =
    useActivities();
  let isOpen = activities.find(activity => activity.id === id)?.isOpen;
  if (isOpen === undefined) {
    isOpen = false;
  }

  const isSelected = activities.find(activity => activity.id === id);
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(true);
  }
  function handleUpdatedDone(event) {
    if (event.key === "Enter") {
      setEdit(false);
    }
  }

  return (
    <>
      <StyledContainer isSelected={isSelected?.selected} ref={refff} {...rest}>
        <StyledButton>
          <StyledImage
            alt="archive"
            src={isSelected?.selected ? ArchiveActive : Archive}
            width="50px"
            height="50px"
          />
        </StyledButton>
        <StyledButton onClick={() => handleClick(id)}>
          <StyledImage
            alt="done"
            src={isSelected?.selected ? DoneActiv : Done}
            width="50px"
            height="50px"
          />
        </StyledButton>
        <StyledP>{titel}</StyledP>

        <StyledFlexContainer isSelected={isSelected?.selected}>
          <StyledButton onClick={() => handleDelete(id)}>
            <StyledImage
              alt="delete"
              src={isSelected?.selected ? DeleteActiv : Delete}
              width="25px"
              height="25px"
            />
          </StyledButton>
          <StyledButton onClick={() => handleDetails(id)}>
            <StyledImage
              alt="details"
              src={
                isOpen && isSelected?.selected
                  ? DetailsActiveUp
                  : isOpen && !isSelected?.selected
                  ? DetailsUp
                  : !isOpen && isSelected?.selected
                  ? DetailsActiveDown
                  : !isOpen && !isSelected?.selected
                  ? DetailsDown
                  : ""
              }
              width="25px"
              height="25px"
            />
          </StyledButton>
        </StyledFlexContainer>
      </StyledContainer>

      {isOpen && (
        <StyledFlexContainer isSelected={isSelected?.selected}>
          <StyledContainerDetails>
            <StyledP>
              Link:{" "}
              <a href={link} target="_blank" rel="noreferrer">
                {link}
              </a>
            </StyledP>
            <StyledP>Blockchain: {blockchain}</StyledP>
            <StyledP>Deadline: {date}</StyledP>
          </StyledContainerDetails>
          <StyledP description onDoubleClick={handleEdit} viewmode={edit}>
            Description: {description}
          </StyledP>
          <StyledInput
            type="text"
            editmode={edit}
            value={description}
            onChange={e => {
              setUpdate(e.target.value, id);
            }}
            onKeyDown={handleUpdatedDone}
          />
        </StyledFlexContainer>
      )}
    </>
  );
}

const StyledContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 8fr 1fr;
  justify-items: start;
  width: 100%;
  margin-top: 5px;
  border: none;
  background: ${props =>
    props.isSelected === true ? "rgba(165, 202, 210)" : "#6f5f90"};
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  &:hover,
  &:focus {
    transform: scale(1.02);
  }
`;

export const StyledContainerDetails = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  filter: ${props => (props.active === true ? "blur(2px)" : "")};
`;

const baseDetailsStyle = css`
  color: white;
  background-color: #6f5f90;
  opacity: 0.8;
  padding: 5px 14px;
  border-radius: 999px;
  background-color: lightslategray;
  margin-left: ${props => (props.description ? "20px" : "")};
  margin-right: ${props => (props.description ? "20px" : "")};
`;

const StyledP = styled.p`
  ${baseDetailsStyle}
  display: ${props => (props.viewmode === true ? "none" : "")};
`;
const StyledInput = styled.input`
  ${baseDetailsStyle}
  display: ${props => (props.editmode === false ? "none" : "")};
  margin-bottom: 5px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-items: center;
  justify-self: flex-end;
  align-self: center;
  background: #6f5f90;
  border-radius: 0px 0px 5px 5px;
  opacity: 0.7;
  border: none;
  background-color: ${props =>
    props.isSelected === true ? "#9ECAD3" : "#6f5f90"};
`;
