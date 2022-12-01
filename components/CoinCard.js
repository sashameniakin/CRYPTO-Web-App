import styled from "styled-components";

export default function CoinCard({id}) {
  return (
    <StyledCard>
      <div> {id}</div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vh;
  height: 50px;
  background: rgba(238, 237, 237, 0.75);
  border-radius: 2px;
`;
