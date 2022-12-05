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
  height: 50px;
  top: 0%;
  bottom: 94.44%;
  background-color: rgba(165, 202, 210);
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledSection = styled.section`
  margin-top: 10%;
`;
