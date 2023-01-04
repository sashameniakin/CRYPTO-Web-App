import StyledArchiveCard from "./styled/StyledArchiveCard";
import StyledImage from "./styled/StyledImage";
import StyledButton from "./styled/StyledButton";
import Delete from "../public/images/delete.svg";
import {useArchive} from "../context/context";
import StyledP from "./styled/StyledP";

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
