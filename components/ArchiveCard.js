import StyledArchiveCard from "./styled/StyledArchiveCard";
import StyledImage from "./styled/StyledImage";
import StyledButton from "./styled/StyledButton";
import Delete from "../public/images/delete.svg";
import {useArchive} from "../context/context";
import styled from "styled-components";

export default function ArchiveCard({
  id,
  title,
  link,
  blockchain,
  deadline,
  description,
}) {
  const {handleDelete} = useArchive();
  return (
    <StyledArchiveCard>
      <StyledP wordbreak>{id}</StyledP>
      <StyledP>{title}</StyledP>
      <StyledP wordbreak>{link}</StyledP>
      <StyledP align>{blockchain}</StyledP>
      <StyledP align>{deadline}</StyledP>
      <StyledP align>{description}</StyledP>
      <StyledButton onClick={() => handleDelete(id)}>
        <StyledImage alt="delete" src={Delete} width="25px" height="25px" />
      </StyledButton>
    </StyledArchiveCard>
  );
}

const StyledP = styled.p`
  word-break: ${props => (props.wordbreak ? "break-all" : "")};
  white-space: normal;
  font-size: x-small;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  width: auto;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.align ? "center" : "")};
`;
