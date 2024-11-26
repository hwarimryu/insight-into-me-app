import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { useSwipeable } from "react-swipeable";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";
import moment from "moment";

function CalendarView({layoutState, tasks, onSelectedDateChanged }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 활성화된 월
  const [titleYear, setTitleYear] = useState(selectedDate.getFullYear());
  const [titleMonth, setTitleMonth] = useState(selectedDate.getMonth() + 1);

  // 특정 날짜에 Task가 있는지 확인
  const getTasksForDate = (date) => {
    const dateString = date.toLocaleDateString();
    const taskData = tasks.filter((t) => new Date(t.date).toLocaleDateString() === dateString);
    return taskData ? taskData.length : 0; // Task 개수 반환
  };

  // 날짜 클릭 시 처리
  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectedDateChanged(date); // 부모 컴포넌트에 업데이트 전달
  };

  // 월 변경 시 연, 월 업데이트
  const updateYearAndMonth = (date) => {
    setTitleYear(date.getFullYear());
    setTitleMonth(date.getMonth() + 1);
  };

  // 월 변경 시 처리
  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
    updateYearAndMonth(activeStartDate)
    onSelectedDateChanged(activeStartDate); // 부모 컴포넌트에 업데이트 전달
  };

  // 다음 월로 이동
  const goToNextMonth = () => {
    const nextMonth = moment(currentMonth).add(1, "month").toDate()
    nextMonth.setDate(1)
    setSelectedDate(nextMonth)
    setCurrentMonth(nextMonth);
    updateYearAndMonth(nextMonth)
    onSelectedDateChanged(nextMonth); // 부모 컴포넌트에 업데이트 전달
  };

  // 이전 월로 이동
  const goToPreviousMonth = () => {
    const previousMonth = moment(currentMonth).subtract(1, "month").toDate();
    previousMonth.setDate(1)
    setSelectedDate(previousMonth)
    setCurrentMonth(previousMonth);
    updateYearAndMonth(previousMonth)
    onSelectedDateChanged(previousMonth); // 부모 컴포넌트에 업데이트 전달
  };


  const [yearRange, setYearRange] = useState({
    startYear: selectedDate.getFullYear() - 3,
    endYear: selectedDate.getFullYear() + 3,
  });
  
  const [years, setYears] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const yearScrollRef = useRef(null);
  const monthScrollRef = useRef(null);

  useEffect(() => {
    loadYears(yearRange.startYear, yearRange.endYear);
  }, [yearRange]);

  const loadYears = (start, end) => {
    const newYears = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    setYears((prevYears) => {
      const uniqueYears = Array.from(new Set([...prevYears, ...newYears]));
      return uniqueYears.sort((a, b) => a - b);
    });
  };

  const handleYearScroll = () => {
    const container = yearScrollRef.current;
    if (!container) return;

    if (container.scrollTop === 0) {
      // Load previous years
      setYearRange((prev) => ({
        startYear: prev.startYear - 10,
        endYear: prev.endYear,
      }));
    }

    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      // Load next years
      setYearRange((prev) => ({
        startYear: prev.startYear,
        endYear: prev.endYear + 10,
      }));
    }
  };

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1); // 1~12월
  };

  const handleYearChange = (selectedYear) => {
    const newDate = new Date(selectedYear, titleMonth - 1, 1);
    setTitleYear(selectedYear);
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
    onSelectedDateChanged(selectedDate)
  };

  const handleMonthChange = (selectedMonth) => {
    const newDate = new Date(titleYear, selectedMonth - 1, 1);
    setTitleMonth(selectedMonth);
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
    onSelectedDateChanged(selectedDate)
  };

  // Swipeable 설정
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNextMonth, // 왼쪽 스와이프 → 다음 월
    onSwipedRight: goToPreviousMonth, // 오른쪽 스와이프 → 이전 월
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // 마우스 드래그로도 동작
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      // 스크롤 초기화
      setTimeout(() => {
        if (yearScrollRef.current) {
          const yearElement = yearScrollRef.current.querySelector(
            `.dropdown-item[data-value="${titleYear}"]`
          );
          if (yearElement) {
            yearScrollRef.current.scrollTop =
              yearElement.offsetTop - yearScrollRef.current.offsetTop - 35; // 가운데 맞추기
          }
        }
        if (monthScrollRef.current) {
          const monthElement = monthScrollRef.current.querySelector(
            `.dropdown-item[data-value="${titleMonth}"]`
          );
          if (monthElement) {
            monthScrollRef.current.scrollTop =
              monthElement.offsetTop - monthScrollRef.current.offsetTop - 35; // 가운데 맞추기
          }
        }
      }, 0);
    }
  };

  // 선택된 날짜인지 확인
  const isSelectedDate = (date) =>
    selectedDate.toLocaleDateString() === date.toLocaleDateString();

  return (
    <div {...swipeHandlers} className={`calendar-container ${layoutState}`}>
      <div className="calendar-header">
        <div className="custom-dropdown" onClick={toggleDropdown}>
          <span className="selected-value">
            {`${titleYear} . ${titleMonth.toString().padStart(2, "0")}`}
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-column">
                <div className="dropdown-scroll" 
                    ref={yearScrollRef}
                    onScroll= {handleYearScroll}>
                  {years.map((y) => (
                    <div
                      key={y}
                      data-value={y}
                      className={`dropdown-item ${y === titleYear ? "active" : ""}`}
                      onClick={() => handleYearChange(y)}
                    >
                      {y.toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>
              <div className="dropdown-column">
                <div className="dropdown-scroll" ref={monthScrollRef}>
                  {generateMonths().map((m) => (
                    <div
                      key={m}
                      data-value={m}
                      className={`dropdown-item ${m === titleMonth ? "active" : ""}`}
                      onClick={() => handleMonthChange(m)}
                    >
                      {m.toString().padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Calendar
        value={selectedDate} // 현재 선택된 날짜
        onChange={handleDateChange} // 날짜 선택 이벤트
        onActiveStartDateChange={handleActiveStartDateChange} // 활성화된 월 변경 이벤트
        activeStartDate={currentMonth} // 현재 활성화된 월
        showNavigation={false} /* 상단 기본 연월 숨김 */
        formatDay={(locale, date) => null}
        tileContent={({ date }) => {
          const taskCount = getTasksForDate(date);
          return (
            <>
              <abbr className={isSelectedDate(date) ? "selected-date" : ""}>
                {moment(date).format("DD")}
              </abbr>
              {taskCount > 0 && (
                <div className="dot-container">
                  {Array.from({ length: Math.min(taskCount, 3) }).map((_, i) => (
                    <span key={i} className="task-dot"></span>
                  ))}
                  {taskCount > 3 && <span className="more-dots">+</span>}
                </div>
              )}
            </> );
        }}
      />
    </div>
  );
}

export default CalendarView;
