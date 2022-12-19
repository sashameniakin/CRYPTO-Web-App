import styled from "styled-components";
import {useEffect, useState} from "react";

export default function ProgressBar(props) {
  const {tasksCount, tasksDone} = props;
  const percent = (100 * tasksDone) / tasksCount;
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);
  return (
    <>
      {winReady && (
        <>
          <StyledP>
            {tasksDone} / {tasksCount}
          </StyledP>
          <StyledContainer>
            <StyledFiller completed={percent} />
          </StyledContainer>
        </>
      )}
    </>
  );
}

const StyledContainer = styled.div`
  height: 10px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 10px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
`;
const StyledFiller = styled.div`
  height: 100%;
  width: ${props => props.completed + "%"};
  background-color: rgba(255, 123, 137);
  border-radius: 10px;
  transition: width 1s ease-in-out;
`;
const StyledP = styled.p`
  font-weight: bold;
  color: #575757;
  margin-bottom: 3px;
`;
