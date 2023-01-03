import styled from "styled-components";
import StyledTransaction from "../components/styled/StyledTransaction";

export default function TransactionCard({
  id,
  action,
  name,
  amount,
  price,
  date,
  time,
}) {
  return (
    <StyledTransaction>
      <StyledDiv>{id}</StyledDiv>
      <StyledDiv>{action}</StyledDiv>
      <StyledDiv>{name}</StyledDiv>
      <StyledDiv>{amount}</StyledDiv>
      <StyledDiv>{price}</StyledDiv>
      <StyledDiv>{date}</StyledDiv>
      <StyledDiv>{time}</StyledDiv>
    </StyledTransaction>
  );
}

const StyledDiv = styled.div`
  text-align: start;
`;
