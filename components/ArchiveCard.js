import StyledArchiveCard from "./styled/StyledArchiveCard";
import styled from "styled-components";
import StyledImage from "./styled/StyledImage";
import StyledButton from "./styled/StyledButton";
import Delete from "../public/images/delete.svg";
import {useArchive} from "../context/context";

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
    <>
      <StyledArchiveCard>
        <StyledP>{id}</StyledP>
        <StyledP>{title}</StyledP>
        <StyledP>{link}</StyledP>
        <StyledP>{blockchain}</StyledP>
        <StyledP>{deadline}</StyledP>
        <StyledP>{description}</StyledP>
        <StyledButton onClick={() => handleDelete(id)}>
          <StyledImage alt="delete" src={Delete} width="25px" height="25px" />
        </StyledButton>
      </StyledArchiveCard>
    </>
  );
}

export const StyledP = styled.p`
  word-break: break-all;
  white-space: normal;
  font-size: small;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 30px;
  border-radius: 50px;
`;
