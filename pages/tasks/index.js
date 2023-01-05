import styled from "styled-components";
import {setGlobalState, useGlobalState} from "../../state";
import PopupForm from "../../components/Popup_form";
import Task from "../../components/Task";
import StyledSection from "../../components/styled/StyledSection";
import {useActivities, useStates} from "../../context/context";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useState, useEffect} from "react";
import ProgressBar from "../../components/Progress-bar";
import StyledContainerDetails from "../../components/styled/StyledContainerDetails";
import StyledBody from "../../components/styled/StyledBody";
import PopupWellDone from "../../components/Popup_welldone";
import PopupMongo from "../../components/Popup_mongo_archieve";
import StyledButtonMain from "../../components/styled/StyledButtonMain";
import FeatureBackground from "../../components/styled/FeatureBackground";
import PopupSended from "../../components/Popup_sended";

export default function Tasks() {
  const [openForm] = useGlobalState("openForm");
  const [openPopupWellDone] = useGlobalState("openPopupWellDone");
  const [openPopupSended] = useGlobalState("openPopupSended");
  const {popupMongo} = useStates();
  const {activities, setActivities} = useActivities();
  const [tasks, updateTasks] = useState(activities);
  const [winReady, setWinReady] = useState(false);
  const [length, setLength] = useState(null);

  useEffect(() => {
    updateTasks(activities);
  }, [activities]);

  useEffect(() => {
    setActivities(tasks);
  }, [tasks]);

  useEffect(() => {
    setLength(activities.length);
  }, [activities]);

  useEffect(() => {
    setWinReady(true);
  }, []);

  function openFormPopup() {
    setGlobalState("openForm", true);
  }

  function handleOnDragEnd(result) {
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
  }

  const tasksDone = activities?.filter(
    selected => selected?.selected === true
  ).length;

  function magic(event) {
    const {currentTarget: el, clientX: x, clientY: y} = event;
    const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  return (
    <>
      <StyledBody>
        <PopupWellDone trigger={openPopupWellDone} />
        <PopupForm trigger={openForm} />
        <PopupMongo trigger={popupMongo} />
        <PopupSended trigger={openPopupSended} />
        <FeatureBackground
          onPointerMove={magic}
          tasks
          active={
            openForm || openPopupWellDone || popupMongo || openPopupSended
          }
        >
          <h2>CURRENT ACTIVITIES</h2>
          <StyledContainerDetails>
            <StyledButtonMain onClick={() => openFormPopup()}>
              ADD ACTIVITY
            </StyledButtonMain>
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
                    active={
                      openForm ||
                      openPopupWellDone ||
                      popupMongo ||
                      openPopupSended
                    }
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
          )}
        </FeatureBackground>
      </StyledBody>
    </>
  );
}

const StyledBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 10px;
  align-items: flex-end;
  justify-content: end;
`;
