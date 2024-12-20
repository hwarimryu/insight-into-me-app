import {
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'

const AddPlanForm = () => {
    return (
        <>
          <FormControl>
          <FormLabel>제목</FormLabel>
          <Input placeholder='제목 입력'type="text"value={title} onChange={(e) => setTitle(e.target.value)}
              required/>
           <div className="form-group">
            <label>제목</label>
             <input
              type="text"
              placeholder="Task 제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group datetime">
            <label>시작</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group datetime">
            <label>종료</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>#태그</label>
            <input
              type="text"
              placeholder="태그 입력 (쉼표로 구분)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </FormControl>
        <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' />
        </FormControl>

        <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
        </FormControl>
    </>  
    )
}

export { AddPlanForm };