import styled from "styled-components";

export default function Header() {
  return (
    <>
      <StyledHeader></StyledHeader>
      <StyledSection></StyledSection>
    </>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  top: 0%;
  bottom: 94.44%;
  background-color: rgba(165, 202, 210, 0.6);
`;

const StyledSection = styled.section`
  margin-top: 20%;
`;
