import styled from "styled-components";

export default function CoinCard({coin}) {
  return (
    <StyledCard color={coin.color}>
      <div> {coin.name}</div>
      <p>Age: {coin.age}</p>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*   background-color: ${({color}) => color}; */
  border: 1px solid black;
  border-radius: 5px;
  width: 400px;
  height: 50px;
`;
