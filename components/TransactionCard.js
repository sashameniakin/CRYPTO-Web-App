import styled from "styled-components";

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
      <div>{time}</div>
    </StyledTransaction>
  );
}

export const StyledTransaction = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  color: white;
  margin-bottom: ${props => (props.header ? "30px" : "")};
`;
