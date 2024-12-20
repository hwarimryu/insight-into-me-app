import { useEffect, useRef, useState, useContext } from "react";
import { TaskStateContext, DoneStateContext } from "../App";
import TimelineTaskItem from "./TimelineTaskItem";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./TimelineView.css";
import ButtonCustom from "./ButtonCustom";
import { CalendarIcon } from '@chakra-ui/icons'
import { Box,
  Button,
  VStack,
  Text,
  HStack,
  Flex, } from '@chakra-ui/react'

import Header from "./common/Header";
import { getTasksAtDate, generateTimeSlots } from "../utils/DateTimeUtil";

function TimelineView({ selectedDate, onDateChange, onTaskSelect, toggleViewType }) {
  const plans = useContext(TaskStateContext);
  const dones = useContext(DoneStateContext);
  const timelineRef = useRef(null);
  const nowRef = useRef(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // 선택된 날짜와 현재 시간
  const formattedDate = selectedDate.toLocaleDateString();
  const now = new Date();
  const plansForDate = getTasksAtDate(formattedDate, plans);
  const logsForDate = getTasksAtDate(formattedDate, dones);

  // 시간 표시를 위한 범위 생성
  const timeSlots = generateTimeSlots();

  // 시작 시간을 픽셀 위치로 변환
  const timeToPosition = (time) => {
    const [hour, minute] = new Date(time).toTimeString().split(":").map(Number);
    const hourHeight = 80; // 1시간에 80px
    const minuteHeight = hourHeight / 60; // 1분에 해당하는 높이
    return 20 + hour * hourHeight + minute * minuteHeight;
  };
  
  // 현재 시간을 픽셀 위치로 변환
  const nowPosition = timeToPosition(now);

  // 현재 시간을 타임라인의 중심에 위치시킴
  useEffect(() => {
    if (nowRef.current) {
      nowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

  }, [timeSlots]);

    return (<>
      <Box position="fixed" top={10} left={0} right={0} ml={5} mr={5} zIndex={10} bg="white">
        <Header
            className="timeline-title"
            title={
              <HStack spacing={2}>
                <Button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>{formattedDate}</Button>
                {isDatePickerOpen && (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      onDateChange(date);
                      setIsDatePickerOpen(false);
                    }}
                    inline
                  />
                )}
              </HStack>
            }
            rightChild={<ButtonCustom text={<CalendarIcon />} type={"PRIMARY"} onClick={toggleViewType}/>}
          />
      </Box>

      <VStack ref={timelineRef} align="stretch" p={4} className="timeline-view" mt="80px" overflowY="auto" maxH="calc(100vh - 80px)" css={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <Flex className="timeline-container" alignItems="flex-start">
        <VStack h="2200px" className="tasks-left" align="stretch" w="48%" position="relative">
          {plansForDate.map((task, index) => {
            const start = timeToPosition(task.startDateTime);
            const end = timeToPosition(task.endDateTime);
            const height = end - start;
            return (
              <Box
                key={index}
                className="task-block"
                bg="blue.100"
                p={0}
                borderRadius="md"
                position="absolute"
                border={"1px solid var(--plan-border-color)"}
                top={`${start}px`}
                height={`${height}px`}
                w="full"
                ref={
                  new Date(task.startDateTime).toTimeString() <= now.toTimeString().split(" ")[0] &&
                  now.toTimeString().split(" ")[0] < new Date(task.endDateTime).toTimeString()
                    ? nowRef
                    : null
                }
                onClick={() => onTaskSelect(task)}
              >
                <TimelineTaskItem
                  key={index}
                  title={task.title}
                />
              </Box>
            );
          })}
        </VStack>
        <VStack className="timeline-center" w="4%" align="center">
          <Box className="timeline-center-line" h="2200px" w="1px" bg="gray.200" zIndex={100}/>
          <VStack className="time-overlay" spacing={2} align="center">
            {timeSlots.map((time, index) => (
              <Text key={index} className="time-slot">
                {time}
              </Text>
            ))}
            <Box
              className="current-time-marker"
              position="absolute"
              top={`${nowPosition}px`}
              w="90vw"
              h="1px"
              borderRadius="full"
              bg="red.500"
            />
          </VStack>
        </VStack>
        <VStack h="2200px" className="tasks-right" align="stretch" w="48%" position="relative">
          {logsForDate.map((task, index) => {
            const start = timeToPosition(task.startDateTime);
            const end = timeToPosition(task.endDateTime);
            const height = end - start;
            console.log(task.title + ": "+ start)
            return (
              <Box
                key={index}
                className="task-block"
                bg="gray.100"
                p={0}
                borderRadius="md"
                border={"1px solid var(--done-border-color)"}
                position="absolute"
                top={`${start}px`}
                height={`${height}px`}
                w="full"
                onClick={() => onTaskSelect(task)}
              >
                <TimelineTaskItem
                  key={index}
                  title={task.title}
                />
              </Box>
            );
          })}
        </VStack>
      </Flex>
    </VStack>
  </>
     
    );
}

export default TimelineView;