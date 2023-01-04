import styled from "styled-components";
import StyledImage from "../components/styled/StyledImage";
import Archive from "../public/images/archive.svg";
import Delete from "../public/images/delete.svg";
import DeleteActiv from "../public/images/delete_activ.svg";
import DetailsDown from "../public/images/down.svg";
import DetailsUp from "../public/images/up.svg";
import {useActivities, useArchive} from "../context/context";
import Done from "../public/images/done.svg";
import DoneActiv from "../public/images/done_activ.svg";
import ArchiveActive from "../public/images/archive_activ.svg";
import DetailsActiveUp from "../public/images/up_activ.svg";
import DetailsActiveDown from "../public/images/down_activ.svg";
import {useState} from "react";
import StyledBaseDetails from "../components/styled/StyledBaseDetails";
import StyledContainerDetails from "../components/styled/StyledContainerDetails";
import StyledButton from "../components/styled/StyledButton";

export default function Task(props) {
  const {refff, id, titel, link, blockchain, date, description, ...rest} =
    props;
  const {activities, handleDelete, handleDetails, handleClick, setUpdate} =
    useActivities();
  const [edit, setEdit] = useState(false);
  const {sendToMongoArchive} = useArchive();
  let isOpen = activities.find(activity => activity.id === id)?.isOpen;
  if (isOpen === undefined) {
    isOpen = false;
  }

  const isSelected = activities.find(activity => activity.id === id);

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
        <StyledButton onClick={() => sendToMongoArchive(id)}>
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

        <StyledFlexContainer isSelected={isSelected?.selected} icons>
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
  margin-top: 5px;
  border: none;
  background: ${props =>
    props.isSelected === true
      ? "rgba(255, 123, 137, 0.4)"
      : "rgba(165, 202, 210, 0.2)"};
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  &:hover,
  &:focus {
    transform: scale(1.02);
  }
`;

const StyledP = styled.p`
  ${StyledBaseDetails}
  display: ${props => (props.viewmode === true ? "none" : "")};
  word-break: break-all;
  white-space: normal;
`;
const StyledInput = styled.input`
  ${StyledBaseDetails}
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
  border-radius: 0px 0px 5px 5px;
  border: none;
  background: ${props =>
    props.isSelected === true
      ? props.icons === true
        ? "rgba(255, 123, 137, 0)"
        : "rgba(255, 123, 137, 0.4)"
      : props.icons === true
      ? "rgba(165, 202, 210, 0)"
      : "rgba(165, 202, 210, 0.2)"};
`;
