var dateListApp = {};
var daySize = 86400000;

function offsetDate(date, days) {
  return new Date(date + days * (daySize));
}

function daysBetween(first, second) {
  return Math.round((second - first) / daySize);
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
  var d = new Date();
  var listEl = document.getElementById("dateList");
  startDate = startDate || (new Date()).setDate(d.getDate() - 31);
  endDate = endDate || (new Date()).setDate(d.getDate() + 31);
  var days = daysBetween(startDate, endDate);

  for (var x = 0; x <= days; x++) {
    var el = document.createElement("div");
    var currentDate = offsetDate(startDate, x);
    var currentDateString = getFormattedDateString(currentDate);
    el.setAttribute("data-date", currentDateString);
    el.innerHTML = "<span class='month'>" +
      (currentDate.getMonth() + 1) +
      "</span><span class='date'>" +
      currentDate.getDate() + "</span>";
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
  var el = document.getElementById("dateList");
  el.classList.toggle('show');
}

function init() {
  var date = new Date();
  var dateString = getFormattedDateString(date);
  loadList(dateString);
  generateDateList();
  setInterval(saveList, 5000);
}
init();