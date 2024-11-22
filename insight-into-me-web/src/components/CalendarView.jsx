import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";
import moment from "moment";

function CalendarView() {
    // Task 데이터 (더미)
    const tasks = [
      { date: "2024-11-25", tasks: ["Meeting", "Dinner"] },
      { date: "2024-11-26", tasks: ["Conference"] },
      { date: "2024-11-30", tasks: ["Workout", "Study", "Call"] },
    ];

  // 특정 날짜에 Task가 있는지 확인
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const taskData = tasks.find((t) => t.date === dateString);
    return taskData ? taskData.tasks.length : 0; // Task 개수 반환
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
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
    selectedDate.toISOString().split("T")[0] === date.toISOString().split("T")[0];


  return (
    <div className="calendar-container">
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
          return taskCount > 0 ? (<>
              { isSelectedDate(date)?
              <abbr className="selected-date">{moment(date).format("DD")}</abbr> 
                : <abbr className="">{moment(date).format("DD")}</abbr>}
            <div className="dot-container">
              {Array.from({ length: taskCount }).map((_, i) => (
                <span key={i} className="task-dot"></span>
              ))}
            </div>
          </>
          ) : ( 
          <>{ isSelectedDate(date)?
              <abbr className="selected-date">{moment(date).format("DD")}</abbr> 
                : <abbr className="">{moment(date).format("DD")}</abbr>}
          </> );
        }}
      />
    </div>
  );
}

export default CalendarView;
