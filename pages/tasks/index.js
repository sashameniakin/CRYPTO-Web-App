import styled from "styled-components";
/* import {setGlobalState, useGlobalState} from "../../state";
import PopupForm from "../../components/Popup_form";
import Task from "../../components/Task";
import {StyledSection} from "../home"; */
import {useActivities} from "../../context/context";
/* import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"; */
import {useState, useEffect} from "react";
/* import ProgressBar from "../../components/Progress-bar";
import {StyledContainerDetails} from "../../components/Task"; */

export default function Tasks() {
  /*  const [openForm] = useGlobalState("openForm"); */
  const {activities, setActivities} = useActivities();
  const [tasks, updateTasks] = useState(activities);
  /*   const [winReady, setWinReady] = useState(false);
  const [length, setLength] = useState(null); */

  useEffect(() => {
    updateTasks(activities);
  }, [activities]);

  useEffect(() => {
    setActivities(tasks);
  }, [tasks]);

  /*   useEffect(() => {
    setLength(activities.length);
  }, [activities]); */

  /*  useEffect(() => {
    setWinReady(true);
  }, []); */

  /*  function openFormPopup() {
    setGlobalState("openForm", true);
  } */

  /*   function handleOnDragEnd(result) {
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTasks(items);
  } */

  /*  const tasksDone = activities?.filter(
    selected => selected?.selected === true
  ).length; */

  return (
    <>
      <StyledBody>
        {/*     <PopupForm trigger={openForm}></PopupForm>
        <StyledContainerDetails active={openForm}>
          <StyledButton onClick={() => openFormPopup()}>
            Add activity
          </StyledButton>
          <StyledBar>
            <ProgressBar tasksCount={length} tasksDone={tasksDone} />
          </StyledBar>
        </StyledContainerDetails>
        {winReady && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {provided => (
                <StyledSection
                  tasks
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  active={openForm}
                >
                  {tasks &&
                    tasks.map(
                      (
                        {
                          id,
                          titel,
                          link,
                          blockchain,
                          date,

                          description,
                        },
                        i
                      ) => {
                        return (
                          winReady && (
                            <Draggable
                              key={id}
                              draggableId={id ? id.toString() : "0"}
                              index={i}
                            >
                              {provided => (
                                <Task
                                  refff={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  index={i}
                                  key={i}
                                  id={id}
                                  titel={titel}
                                  link={link}
                                  blockchain={blockchain}
                                  date={date}
                                  description={description}
                                />
                              )}
                            </Draggable>
                          )
                        );
                      }
                    )}
                  {provided.placeholder}
                </StyledSection>
              )}
            </Droppable>
          </DragDropContext>
        )} */}
      </StyledBody>
    </>
  );
}

const StyledBody = styled.main`
  margin-top: 9%;
  margin-bottom: 9%;
`;

/* const StyledButton = styled.button`
  width: 228px;
  height: 44px;
  margin-left: 10px;
  border: none;
  background: rgba(165, 202, 210, 0.75);
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #575757;
  font-weight: bold;
`;
const StyledBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  align-items: flex-end;
  justify-content: end;
`; */
