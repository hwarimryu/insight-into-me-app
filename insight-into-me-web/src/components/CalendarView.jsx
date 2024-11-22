import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { useSwipeable } from "react-swipeable";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";
import moment from "moment";

function CalendarView({ tasks, selectedDate, setSelectedDate }) {

  // 특정 날짜에 Task가 있는지 확인
  const getTasksForDate = (date) => {
    const dateString = date.toLocaleDateString();
    const taskData = tasks.filter((t) => new Date(t.date).toLocaleDateString() === dateString);
    return taskData ? taskData.length : 0; // Task 개수 반환
  };

  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [yearRange, setYearRange] = useState({
    startYear: selectedDate.getFullYear() - 3,
    endYear: selectedDate.getFullYear() + 3,
  });
  
  const [years, setYears] = useState([]);

  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth() + 1);
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

  useEffect(() => {
    setYear(selectedDate.getFullYear());
    setMonth(selectedDate.getMonth() + 1);
  }, [selectedDate]);

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1); // 1~12월
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    setSelectedDate(new Date(selectedYear, month - 1, 1));
  };

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setSelectedDate(new Date(year, selectedMonth - 1, 1));
  };

  // 다음 월로 이동
  const goToNextMonth = () => {
    const nextMonth = moment(selectedDate).add(1, "month").toDate();
    setMonth(nextMonth);
    setSelectedDate(nextMonth);
  };

  // 이전 월로 이동
  const goToPreviousMonth = () => {
    const previousMonth = moment(selectedDate).subtract(1, "month").toDate();
    setMonth(previousMonth);
    setSelectedDate(previousMonth);
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
            `.dropdown-item[data-value="${year}"]`
          );
          if (yearElement) {
            yearScrollRef.current.scrollTop =
              yearElement.offsetTop - yearScrollRef.current.offsetTop - 35; // 가운데 맞추기
          }
        }
        if (monthScrollRef.current) {
          const monthElement = monthScrollRef.current.querySelector(
            `.dropdown-item[data-value="${month}"]`
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
    <div {...swipeHandlers} className="calendar-container">
      <div className="calendar-header">
        <div className="custom-dropdown" onClick={toggleDropdown}>
          <span className="selected-value">
            {`${year} . ${month.toString().padStart(2, "0")}`}
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
                      className={`dropdown-item ${y === year ? "active" : ""}`}
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
                      className={`dropdown-item ${m === month ? "active" : ""}`}
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
        value={selectedDate} // 오늘 날짜 기본 선택
        onChange={setSelectedDate}
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
