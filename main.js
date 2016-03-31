var dateListApp = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var daySize = 86400000;

function offsetDate(date, days) {
  return new Date(date.getTime() + (days * daySize));
}

function daysBetween(first, second) {
  return Math.abs(Math.ceil((second.getTime() - first.getTime()) / daySize));
}

function getFormattedDateString(date) {
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

function saveList() {
  var outArray = {
    length: 10
  };
  for (var x = 0; x < 10; x++) {
    var currentElement = document.getElementById("item-" + x);
    outArray[x] = currentElement.value;
  }
  window.localStorage.setItem(dateListApp.dateString, JSON.stringify(outArray));
}

function loadList(dateString) {
  var inArray = window.localStorage.getItem(dateString);
  var dateEl = document.getElementById("date");
  inArray = inArray ? JSON.parse(inArray) : [];
  for (var x = 0; x < 10; x++) {
    var currentElement = document.getElementById("item-" + x);
    currentElement.value = inArray[x] || "";
  }
  dateEl.innerText = dateString;
  dateListApp.date = new Date(dateString);
  dateListApp.dateString = dateString;
}

function generateDateList(startDate, endDate) {
  var d = new Date(dateListApp.date);
  var listEl = document.getElementById("dateList");
  startDate = startDate || offsetDate(d,0-d.getDay());  // new Date((new Date()).setDate(d.getDate() - d.getDay()));
  endDate = endDate || offsetDate(d,6-d.getDay());      // new Date((new Date()).setDate(d.getDate() + (6 - d.getDay())));
  var days = daysBetween(endDate, startDate);
  
  dateListApp.startDate =startDate;
  dateListApp.endDate = endDate;

  listEl.innerHTML = "";
  for (var x = 0; x <= days; x++) {
    var el = document.createElement("div");
    var currentDate = offsetDate(startDate, x);
    var currentDateString = getFormattedDateString(currentDate);
    el.setAttribute("data-date", currentDateString);
    var html = "";
    
    if (currentDate.getDate() === 1) {
      html += "<span class='month'>" + dateListApp.monthNames[currentDate.getMonth()] + "</span>";
    }
    
    html += "<span class='date'>" + currentDate.getDate() + "</span>";
    
    el.innerHTML = html;
    if (currentDateString == dateListApp.dateString) {
      el.className = "today";
    }
    el.onclick = function () {
      loadList(this.getAttribute('data-date'));
    };
    listEl.appendChild(el);
  }
}

function toggleDateList() {
  var el = document.getElementById("dateListWrapper"),
      toggleEl = document.getElementById("dateListToggle");
  el.classList.toggle('show');
  if(el.classList.contains('show')){
    toggleEl.innerText = '-';
  } else {
    toggleEl.innerText = '+';
  }
}

function prevWeek(){
  var startDate = offsetDate(dateListApp.startDate, -6),
      endDate = offsetDate(dateListApp.endDate, - 6);
  generateDateList(startDate, endDate);
}

function nextWeek(){
  var startDate = dateListApp.endDate,
      endDate = offsetDate(dateListApp.endDate, 6);
  generateDateList(startDate, endDate);
}

function init() {
  var date = new Date();
  var dateString = getFormattedDateString(date);
  loadList(dateString);
  generateDateList();
  setInterval(saveList, 5000);
}
init();