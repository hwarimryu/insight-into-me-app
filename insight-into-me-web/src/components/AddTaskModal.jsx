import { useState, useContext } from "react";
import { TaskDispathchContext } from "../App";
// import "./TaskFormModal.css";
import CommonModal from "./common/Modal";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import ButtonCustom from "./ButtonCustom";
import { TaskType } from "../codes/Type";

function AddTaskModal({ type, onClose }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tags, setTags] = useState([]);
  const [review, setReview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [highlightedTag, setHighlightedTag] = useState(null);
  const { onCreate } = useContext(TaskDispathchContext);

  const handleSubmit = () => {
    onCreate(
      type,
      undefined,
      new Date(`${startDate} ${startTime}`).getTime(), 
      new Date(`${endDate} ${endTime}`).getTime(),
      title, false, tags); // 상위 컴포넌트로 Task 전달
      
    onClose(); // 모달 닫기
  };


  // 태그 추가 핸들러
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();

      // 중복 태그 검사
      if (tags.some((tag) => tag.value === newTag)) {
        setHighlightedTag(newTag); // 중복된 태그 강조
      } else {
        setTags([...tags, { value: newTag, color: "teal" }]); // 새 태그 추가
        setHighlightedTag(null); // 강조 제거
      }
      setTagInput(""); // 입력 필드 초기화
    }
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag.value !== tagToRemove));
    if (highlightedTag === tagToRemove) setHighlightedTag(null);
  };

  return (
    <>
    {type === TaskType.PLAN &&
      <CommonModal 
      title={<h2>PLAN 추가</h2>}
      content={
        <>
        <FormControl mb={4} mt={4}>
        <HStack align="center" justify="space-between" spacing={2}>
        <FormLabel width="60px">제목</FormLabel>
        <Input size="sm" placeholder='제목 입력'type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </HStack>
        </FormControl>

        <FormControl mb={4}>
        <HStack align="center" justify="space-between" spacing={2} >
          <FormLabel width="60px">시작</FormLabel>
          <Input size="sm" 
            width='auto'
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input size="sm" 
            type="time"
            width='auto'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </HStack>
        </FormControl>

        <FormControl mb={4}>
        <HStack align="center" justify="space-between" spacing={2} >
        <FormLabel width="60px">종료</FormLabel>
          <Input size="sm" 
            type="date"
            width='auto'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Input size="sm" 
            type="time"
            width='auto'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </HStack>
        </FormControl>

        <FormControl mb={4}>
          <HStack align="center" justify="space-between" spacing={2} >
          <FormLabel width="60px">태그</FormLabel>
          <Input size="sm" 
            type="text"
            placeholder="태그 입력 (엔터로 추가)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyPress}
            />
          </HStack>

          {/* 태그 목록 표시 */}
          <HStack align="start" spacing={2}>
            {tags.map((tag, index) => (
              <Tag
                size="md"
                key={index}
                colorScheme={"teal"}
                borderRadius="full"
              >
                <TagLabel>{tag.value}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag.value)} />
              </Tag>
            ))}
          </HStack>
        </FormControl>
        </>
        }
        buttons={
          <Flex justify="space-between" width="100%" mt={4}>
            <ButtonCustom onClick={() => onClose()} text={"취소"} type={'CANCEL'}/>
            <ButtonCustom onClick={handleSubmit} text={"추가"} type={'PRIMARY'}/>
          </Flex>}
      />
    }

    {type === TaskType.LOG &&
      <CommonModal 
      title={<h2>Log 추가</h2>}
      content={
        <>
        <FormControl mb={4} mt={4}>
        <HStack align="center" justify="space-between" spacing={2}>
        <FormLabel size="sm" width="60px">제목</FormLabel>
        <Input size="sm" placeholder='제목 입력'type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </HStack>
        </FormControl>

        <FormControl mb={4}>
        <HStack align="center" justify="space-between" spacing={2} >
          <FormLabel width="60px">시작</FormLabel>
          <Input size="sm" 
            width='auto'
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input size="sm" 
            type="time"
            width='auto'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </HStack>
        </FormControl>

        <FormControl mb={4}>
        <HStack align="center" justify="space-between" spacing={2} >
        <FormLabel size="sm" width="60px">종료</FormLabel>
          <Input size="sm" 
            type="date"
            width='auto'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Input size="sm" 
            type="time"
            width='auto'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </HStack>
        </FormControl>

        <FormControl mb={4} mt={4}>
        <HStack align="center" justify="space-between" spacing={2}>
        <FormLabel width="60px">리뷰</FormLabel>
        <Textarea size="sm" placeholder='리뷰' value={review} onChange={(e) => setReview(e.target.value)}/>
        </HStack>
        </FormControl>

        <FormControl mb={4}>
          <HStack align="center" justify="space-between" spacing={2} >
          <FormLabel width="60px">태그</FormLabel>
          <Input size="sm" 
            type="text"
            placeholder="태그 입력 (엔터로 추가)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyPress}
            />
          </HStack>

          {/* 태그 목록 표시 */}
          <HStack align="start" spacing={2}>
            {tags.map((tag, index) => (
              <Tag
                size="md"
                key={index}
                colorScheme={"teal"}
                borderRadius="full"
              >
                <TagLabel>{tag.value}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag.value)} />
              </Tag>
            ))}
          </HStack>
        </FormControl>
        </>
        }
        buttons={
          <Flex justify="space-between" width="100%" mt={4}>
            <ButtonCustom onClick={() => onClose()} text={"취소"} type={'CANCEL'}/>
            <ButtonCustom onClick={handleSubmit} text={"추가"} type={'PRIMARY'}/>
          </Flex>}
      />
    }

    {type === TaskType.TODO &&
      <CommonModal 
      title={<h2>TODO 추가</h2>}
      content={
        <>
        <FormControl mb={4} mt={4}>
        <HStack align="center" justify="space-between" spacing={2}>
        <FormLabel width="60px">제목</FormLabel>
        <Input size="sm" placeholder='제목 입력'type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </HStack>
        </FormControl>
{/* 
        <FormControl mb={4}>
        <HStack align="center" justify="space-between" spacing={2} >
          <FormLabel width="60px">시작</FormLabel>
          <Input size="sm" 
            width='auto'
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input size="sm" 
            type="time"
            width='auto'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </HStack>
        </FormControl>

        <FormControl mb={4}>
        <HStack align="center" justify="space-between" spacing={2} >
        <FormLabel width="60px">종료</FormLabel>
          <Input size="sm" 
            type="date"
            width='auto'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Input size="sm" 
            type="time"
            width='auto'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </HStack>
        </FormControl> */}

        <FormControl mb={4}>
          <HStack align="center" justify="space-between" spacing={2} >
          <FormLabel width="60px">태그</FormLabel>
          <Input size="sm" 
            type="text"
            placeholder="태그 입력 (엔터로 추가)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyPress}
            />
          </HStack>

          {/* 태그 목록 표시 */}
          <HStack align="start" spacing={2}>
            {tags.map((tag, index) => (
              <Tag
                size="md"
                key={index}
                colorScheme={"teal"}
                borderRadius="full"
              >
                <TagLabel>{tag.value}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag.value)} />
              </Tag>
            ))}
          </HStack>
        </FormControl>
        </>
        }
        buttons={
          <Flex justify="space-between" width="100%" mt={4}>
            <ButtonCustom onClick={() => onClose()} text={"취소"} type={'CANCEL'}/>
            <ButtonCustom onClick={handleSubmit} text={"추가"} type={'PRIMARY'}/>
          </Flex>}
      />
    }
    </>
  );
}

export default AddTaskModal;
