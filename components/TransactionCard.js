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
      <div>{id}</div>
      <div>{action}</div>
      <div>{name}</div>
      <div>{amount}</div>
      <div>{price}</div>
      <div>{date}</div>
      <StyledDiv>{time}</StyledDiv>
    </StyledTransaction>
  );
}

const StyledDiv = styled.div`
  padding-left: 12px;
`;
