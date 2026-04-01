const roleModal = document.getElementById("roleModal");
const doctorPage = document.getElementById("doctorPage");
const patientPage = document.getElementById("patientPage");
const switchDoctor = document.getElementById("switchDoctor");
const switchPatient = document.getElementById("switchPatient");
const enterDoctor = document.getElementById("enterDoctor");
const enterPatient = document.getElementById("enterPatient");
const bookVisit = document.getElementById("bookVisit");
const bookSuccess = document.getElementById("bookSuccess");
const patientName = document.getElementById("patientName");
const specialtyName = document.getElementById("specialtyName");
const doctorName = document.getElementById("doctorName");
const visitDate = document.getElementById("visitDate");
const visitTime = document.getElementById("visitTime");
const complaint = document.getElementById("complaint");
const history = document.getElementById("history");
const allergy = document.getElementById("allergy");
const doctorQueueList = document.getElementById("doctorQueueList");
const doctorQueueEmpty = document.getElementById("doctorQueueEmpty");
const patientQueueNumber = document.getElementById("patientQueueNumber");
const patientQueueInfo = document.getElementById("patientQueueInfo");
const patientQueueCabinet = document.getElementById("patientQueueCabinet");
const patientResultDiagnosis = document.getElementById("patientResultDiagnosis");
const patientResultRecommendations = document.getElementById("patientResultRecommendations");
const patientResultNext = document.getElementById("patientResultNext");
const visitModal = document.getElementById("visitModal");
const closeVisitModal = document.getElementById("closeVisitModal");
const saveVisitResult = document.getElementById("saveVisitResult");
const visitResultSuccess = document.getElementById("visitResultSuccess");
const visitDiagnosis = document.getElementById("visitDiagnosis");
const visitRecommendations = document.getElementById("visitRecommendations");
const visitNext = document.getElementById("visitNext");
const visitTemplateText = document.getElementById("visitTemplateText");
const visitSummaryName = document.getElementById("visitSummaryName");
const visitSummaryDoctor = document.getElementById("visitSummaryDoctor");
const visitSummarySlot = document.getElementById("visitSummarySlot");
const visitSummaryAllergy = document.getElementById("visitSummaryAllergy");
const visitSummaryComplaint = document.getElementById("visitSummaryComplaint");
const visitSummaryHistory = document.getElementById("visitSummaryHistory");

let activeVisitId = null;
const doctorsBySpecialty = {
  Терапевт: ["Смирнов А.А.", "Егорова Л.В."],
  Кардиолог: ["Петрова Е.В.", "Волков М.С."],
  Невролог: ["Иванова Н.Н.", "Зайцев Д.П."],
  ЛОР: ["Кузнецов И.И.", "Орлова Т.С."],
};
const roomsBySpecialty = {
  Терапевт: "Кабинет 204",
  Кардиолог: "Кабинет 312",
  Невролог: "Кабинет 115",
  ЛОР: "Кабинет 221",
};
const timesByDay = {
  Сегодня: ["10:00", "10:30", "11:00", "11:30"],
  Завтра: ["12:00", "12:30", "13:00", "13:30"],
  "Послезавтра": ["14:00", "14:30", "15:00", "15:30"],
};

function renderDoctorsBySpecialty() {
  const specialty = specialtyName.value;
  const doctors = doctorsBySpecialty[specialty] || [];

  doctorName.innerHTML = "";
  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = `${specialty} - ${doctor}`;
    option.textContent = doctor;
    doctorName.appendChild(option);
  });
}

function initDoctorFilter() {
  specialtyName.innerHTML = "";
  Object.keys(doctorsBySpecialty).forEach((specialty) => {
    const option = document.createElement("option");
    option.value = specialty;
    option.textContent = specialty;
    specialtyName.appendChild(option);
  });
  renderDoctorsBySpecialty();
  specialtyName.addEventListener("change", renderDoctorsBySpecialty);
}

function setRole(role) {
  roleModal.classList.add("hidden");

  const isDoctor = role === "doctor";
  doctorPage.classList.toggle("view--active", isDoctor);
  patientPage.classList.toggle("view--active", !isDoctor);
  switchDoctor.classList.toggle("chip--active", isDoctor);
  switchPatient.classList.toggle("chip--active", !isDoctor);
}

function initTabs() {
  const tabGroups = [
    {
      root: document.getElementById("doctorPage"),
      tabs: ["docQueue"],
    },
    {
      root: document.getElementById("patientPage"),
      tabs: ["patBooking", "patQueue"],
    },
  ];

  tabGroups.forEach((group) => {
    const tabButtons = group.root.querySelectorAll(".tab");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.tab;

        tabButtons.forEach((tab) => tab.classList.remove("tab--active"));
        button.classList.add("tab--active");

        group.tabs.forEach((tabId) => {
          const view = document.getElementById(tabId);
          view.classList.toggle("view--active", tabId === targetId);
        });
      });
    });
  });
}

function initSlots() {
  visitDate.innerHTML = "";
  Object.keys(timesByDay).forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    visitDate.appendChild(option);
  });

  const renderTimesByDay = () => {
    const day = visitDate.value;
    const times = timesByDay[day] || [];
    visitTime.innerHTML = "";
    times.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      visitTime.appendChild(option);
    });
  };

  renderTimesByDay();
  visitDate.addEventListener("change", renderTimesByDay);
}

function getQueue() {
  try {
    return JSON.parse(localStorage.getItem("queueData") || "[]");
  } catch (_error) {
    return [];
  }
}

function setQueue(queue) {
  localStorage.setItem("queueData", JSON.stringify(queue));
}

function getCurrentPatientId() {
  return localStorage.getItem("currentPatientId");
}

function setCurrentPatientId(id) {
  localStorage.setItem("currentPatientId", id);
}

function selectedSlot() {
  if (!visitDate.value || !visitTime.value) return "";
  return `${visitDate.value}, ${visitTime.value}`;
}

function renderDoctorQueue() {
  const queue = getQueue().filter((item) => item.status === "waiting");
  doctorQueueList.innerHTML = "";

  if (!queue.length) {
    doctorQueueEmpty.classList.remove("hidden");
    return;
  }

  doctorQueueEmpty.classList.add("hidden");
  queue.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "rowItem";
    row.innerHTML = `
      <div>
        <div class="rowItem__name">${item.name}</div>
        <div class="rowItem__meta">Жалоба: ${item.complaint || "не указана"}</div>
      </div>
      <div class="pill pill--info">Номер: ${index + 1}</div>
      <div class="rowItem__meta">${item.slot || "время не выбрано"} · ${item.cabinet || "кабинет не назначен"}</div>
      <div class="rowItem__actions">
        <button class="btn btn--primary startVisit" data-id="${item.id}">Начать прием</button>
      </div>
    `;
    doctorQueueList.appendChild(row);
  });
}

function renderPatientQueueState() {
  const queue = getQueue();
  const waiting = queue.filter((item) => item.status === "waiting");
  const patientId = getCurrentPatientId();
  const myIndex = waiting.findIndex((item) => item.id === patientId);

  if (myIndex === -1) {
    patientQueueNumber.textContent = "Номер в очереди: -";
    patientQueueInfo.textContent = "Вы еще не записаны в очередь.";
    patientQueueCabinet.textContent = "Кабинет: -";
  } else {
    const ahead = myIndex;
    const myEntry = waiting[myIndex];
    patientQueueNumber.textContent = `Номер в очереди: ${myIndex + 1}`;
    patientQueueInfo.textContent = `Перед вами: ${ahead} пациент(ов). Время: ${myEntry.slot || "не выбрано"}.`;
    patientQueueCabinet.textContent = `Кабинет: ${myEntry.cabinet || "-"}`;
  }
}

function updatePatientResult(data) {
  patientResultDiagnosis.textContent = `Диагноз: ${data?.diagnosis || "пока не заполнен."}`;
  patientResultRecommendations.textContent = `Рекомендации: ${data?.recommendations || "пока не заполнены."}`;
  patientResultNext.textContent = `Следующий прием: ${data?.nextVisit || "не назначен."}`;
}

function renderPatientResult() {
  const queue = getQueue();
  const patientId = getCurrentPatientId();
  const mine = queue.find((item) => item.id === patientId);

  if (mine && mine.result) {
    updatePatientResult(mine.result);
    return;
  }
  updatePatientResult(null);
}

function openVisit(id) {
  const queue = getQueue();
  const item = queue.find((x) => x.id === id);
  if (!item) return;

  activeVisitId = id;
  visitSummaryName.textContent = `ФИО: ${item.name}`;
  visitSummaryDoctor.textContent = `Врач: ${item.doctor}`;
  visitSummarySlot.textContent = `Время: ${item.slot || "не выбрано"}`;
  visitSummaryAllergy.textContent = `Аллергии и хронические болезни: ${item.allergy || "не указаны"}`;
  visitSummaryComplaint.textContent = `Жалоба: ${item.complaint || "не указана"}`;
  visitSummaryHistory.textContent = `Преданкета: ${item.history || "не заполнена."}`;
  visitDiagnosis.value = "";
  visitRecommendations.value = "";
  visitNext.value = "";
  visitResultSuccess.classList.add("hidden");
  visitModal.classList.remove("hidden");
}

function initVisitModal() {
  doctorQueueList.addEventListener("click", (event) => {
    const target = event.target.closest(".startVisit");
    if (!target) return;
    openVisit(target.dataset.id);
  });

  closeVisitModal.addEventListener("click", () => {
    visitModal.classList.add("hidden");
  });
}

function initVisitTemplates() {
  const templates = {
    template1: {
      diagnosis: "ОРВИ",
      recommendations: "Покой, обильное питье, симптоматическая терапия.",
      nextVisit: "через 3 дня",
    },
    template2: {
      diagnosis: "Артериальная гипертензия",
      recommendations: "Контроль АД 2 раза в день, коррекция терапии.",
      nextVisit: "через 14 дней",
    },
    template3: {
      diagnosis: "Хронический гастрит",
      recommendations: "Щадящая диета, антисекреторная терапия, исключить раздражающие факторы.",
      nextVisit: "через 10 дней",
    },
    template4: {
      diagnosis: "Острый бронхит",
      recommendations: "Теплое питье, симптоматическая терапия, дыхательная гимнастика.",
      nextVisit: "через 5-7 дней",
    },
    template5: {
      diagnosis: "Мигрень без ауры",
      recommendations:
        "Снижение триггеров, режим сна, купирование приступов по схеме, дневник головной боли.",
      nextVisit: "через 14 дней",
    },
    template6: {
      diagnosis: "Острый тонзиллит",
      recommendations: "Полоскания, щадящий режим, лечение по клинической картине.",
      nextVisit: "через 5 дней",
    },
    template7: {
      diagnosis: "Сахарный диабет 2 типа",
      recommendations: "Контроль глюкозы, диета с ограничением быстрых углеводов, физическая активность.",
      nextVisit: "через 14 дней",
    },
    template8: {
      diagnosis: "Неспецифическая поясничная боль",
      recommendations: "Щадящий двигательный режим, ЛФК, противовоспалительная терапия по показаниям.",
      nextVisit: "через 7 дней",
    },
    template9: {
      diagnosis: "Аллергический ринит",
      recommendations: "Исключение аллергенов, антигистаминная терапия, промывание носа.",
      nextVisit: "через 7-10 дней",
    },
  };

  document.querySelectorAll(".visit-template").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.template;
      const template = templates[key];
      if (!template) return;
      visitDiagnosis.value = template.diagnosis;
      visitRecommendations.value = template.recommendations;
      visitNext.value = template.nextVisit || "";
      visitTemplateText.innerHTML = `<div class="quote__text"><strong>Диагноз:</strong> ${template.diagnosis}<br><strong>Рекомендации:</strong> ${template.recommendations}</div>`;
      document.querySelectorAll(".visit-template").forEach((item) => item.classList.remove("chip2--on"));
      button.classList.add("chip2--on");
    });
  });
}

enterDoctor.addEventListener("click", () => setRole("doctor"));
enterPatient.addEventListener("click", () => setRole("patient"));
switchDoctor.addEventListener("click", () => setRole("doctor"));
switchPatient.addEventListener("click", () => setRole("patient"));

bookVisit.addEventListener("click", () => {
  const nameValue = patientName.value.trim();
  if (!nameValue) {
    bookSuccess.classList.remove("hidden");
    bookSuccess.textContent = "Введите имя пациента.";
    return;
  }

  const queue = getQueue();
  const id = `p_${Date.now()}`;
  const entry = {
    id,
    name: nameValue,
    doctor: doctorName.value,
    slot: selectedSlot(),
    cabinet: roomsBySpecialty[specialtyName.value] || "Кабинет не назначен",
    complaint: complaint.value.trim(),
    history: history.value.trim(),
    allergy: allergy.value.trim(),
    status: "waiting",
    result: null,
  };
  queue.push(entry);
  setQueue(queue);
  setCurrentPatientId(id);
  bookSuccess.classList.remove("hidden");
  bookSuccess.textContent = "Вы записаны. Данные попали в живую очередь.";
  renderDoctorQueue();
  renderPatientQueueState();
  renderPatientResult();
});

saveVisitResult.addEventListener("click", () => {
  if (!activeVisitId) return;

  const queue = getQueue();
  const index = queue.findIndex((item) => item.id === activeVisitId);
  if (index === -1) return;

  const payload = {
    diagnosis: visitDiagnosis.value.trim(),
    recommendations: visitRecommendations.value.trim(),
    nextVisit: visitNext.value.trim(),
  };

  queue[index].status = "done";
  queue[index].result = payload;
  setQueue(queue);

  if (getCurrentPatientId() === activeVisitId) {
    updatePatientResult(payload);
  }

  renderDoctorQueue();
  renderPatientQueueState();
  visitResultSuccess.classList.remove("hidden");
});

initTabs();
initSlots();
initDoctorFilter();
initVisitModal();
initVisitTemplates();
renderDoctorQueue();
renderPatientQueueState();
renderPatientResult();
