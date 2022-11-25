import styled from "styled-components";

// This is a demo component to demonstrate Styled Components integration

export function OctopusCard({octopus}) {
  return (
    <StyledCard color={octopus.color}>
      <h1>🐙 {octopus.name}</h1>
      <p>Age: {octopus.age}</p>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({color}) => color};
  border: 1px solid black;
  border-radius: 5px;
  width: 400px;
  height: 400px;
`;
