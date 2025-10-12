const dateEl = document.getElementById("date");
const mealEl = document.getElementById("meal");
const calendarBtn = document.getElementById("calendar-btn");
const calendarBox = document.getElementById("calendar-box");

let currentDate = new Date();

// 수동 급식 데이터
const meals = {
  "2025-10-01": ["백일장📝"],
  "2025-10-02": ["현미밥", "조랭이떡미역국", "돼지갈비찜", "돌미나리무생채", "동그랑때전","애호박전","배추김치","우리밀약과&식혜"],
  "2025-10-03": ["개천절🏛️"],

  "2025-10-06": ["추석🌰"],
  "2025-10-07": ["추석연휴🍂"],
  "2025-10-08": ["추석연휴🍁"],
  "2025-10-09": ["한글날🌸"],
  "2025-10-10": ["재량휴업일👒"],

  "2025-10-13": ["칼슘강화찹쌉밥", "쑥갓어묵국", "오이지무침", "연탄불고기", "치즈핫도그","배추김치","오렌지"],
  "2025-10-14": ["차조밥", "바지락순두부찌개", "분모자찜닭", "콩나물무침", "심쿵하트전","총각김치","르뱅애플잼쿠키"],
  "2025-10-15": ["쌀밥","탄탄멘","샤오롱바오","중국식오이무침","배추김치","초간장","수제흑당버블티","반달단무지"],
  "2025-10-16":  ["혼합잡곡밥","크룽지","당면사리","한방닭곰탕","부추겉절이","오이고추된장무침","수제새송이떡갈비롤","깍두기"],
  "2025-10-17":  ["쌀밥","나물비빔밥","아욱된장국","명엽채호두조림","계란후라이","회오리감자튀김","배추김치","연시1/2"],

  "2025-10-20": ["기장밥","참치김치찌개","시금치무침","어묵볶음","고구마치즈돈까스","총각김치","돈까스소스","배"],
  "2025-10-21": ["차수수밥","맑은콩나물국","제육고추장볶음","계란말이","배추김치","페스츄리호두과자","친환경모듬쌈","쌈장"],
  "2025-10-22": ["쌀밥","바지락칼국수육수","칼국수면","참나물사과무침","수제닭꼬치튀김","직접담근배추겉절이","샤인머스캣"],
  "2025-10-23": ["흑미밥","소고기샤브샤브국","숙주맛살무침","도시락김","고등어양념구이","배추김치","마시는요거트"],
  "2025-10-24": ["스파게티면","목살스테이크","오이피클","배추김치","로제스파게티소스","오리엔탈드레싱","그릴새우샐러드"],

  "2025-10-27": ["개교기념일🏫"],
  "2025-10-28": ["칼슘강화찹쌀밥","볼케이노닭다리오븐구이","깍두기","카레소스","망고라씨","토마토치커리유자무침"],
  "2025-10-29": ["쌀밥","가쓰오장국","순대찜","단무지무침","국물떡볶이","김말이&수제야채튀김","배추김치","파인애플"],
  "2025-10-30": ["기장조밥","소면사리","설렁탕","도토리묵야채무침","수제김치전","깍두기","미니버터소금쿠키","야채스틱&쌈장"],
  "2025-10-31": ["쌀밥","짬뽕","해파리냉채","짜사이무침","탕수육&소스","배추김치","푸딩"]
};

// 날짜 포맷
function formatDate(date) {
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const d = ("0" + date.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
}

// 요일 가져오기
function getDayOfWeek(date) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
}

// 급식 표시
function displayMeal() {
  const key = formatDate(currentDate);
  const dayOfWeek = getDayOfWeek(currentDate);
  dateEl.textContent = `${key} (${dayOfWeek})`;

  if (meals[key]) {
    mealEl.innerText = meals[key].join("\n");
  } else {
    mealEl.innerText = "급식 정보가 없습니다.";
  }
}

// 날짜 이동
function changeDay(offset) {
  currentDate.setDate(currentDate.getDate() + offset);
  displayMeal();
}

// 버튼 이벤트
document.getElementById("prev").addEventListener("click", () => changeDay(-1));
document.getElementById("next").addEventListener("click", () => changeDay(1));

// 달력 버튼
calendarBtn.addEventListener("click", () => {
  if (calendarBox.style.display === "none") {
    showCalendar();
    calendarBox.style.display = "block";
  } else {
    calendarBox.style.display = "none";
  }
});

// 달력 표시
function showCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const today = new Date();

  let table = `<table><tr>`;
  const days = ["일","월","화","수","목","금","토"];
  for (let d of days) table += `<th>${d}</th>`;
  table += `</tr><tr>`;

  for (let i = 0; i < startDay; i++) table += `<td></td>`;

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateKey = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const todayClass = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d) ? "today" : "";

    table += `<td class="${todayClass}" data-date="${dateKey}">${d}</td>`;
    if ((d + startDay) % 7 === 0) table += `</tr><tr>`;
  }

  table += `</tr></table>`;
  calendarBox.innerHTML = table;

  // 날짜 클릭 이벤트
  document.querySelectorAll("#calendar-box td").forEach(td => {
    td.addEventListener("click", () => {
      if (td.dataset.date) {
        currentDate = new Date(td.dataset.date);
        displayMeal();
        calendarBox.style.display = "none";
      }
    });
  });
}

// 초기 실행
displayMeal();

// PWA 서비스 워커 등록
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}


