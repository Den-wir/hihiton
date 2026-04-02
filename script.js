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
const therapistVisitTypeWrap = document.getElementById("therapistVisitTypeWrap");
const therapistVisitType = document.getElementById("therapistVisitType");
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
const patientResultProtocol = document.getElementById("patientResultProtocol");
const visitModal = document.getElementById("visitModal");
const closeVisitModal = document.getElementById("closeVisitModal");
const saveVisitResult = document.getElementById("saveVisitResult");
const visitResultSuccess = document.getElementById("visitResultSuccess");
const visitPulse = document.getElementById("visitPulse");
const visitBp = document.getElementById("visitBp");
const visitTemp = document.getElementById("visitTemp");
const visitWeight = document.getElementById("visitWeight");
const visitObjective = document.getElementById("visitObjective");
const visitDiagnosis = document.getElementById("visitDiagnosis");
const visitRecommendations = document.getElementById("visitRecommendations");
const visitNext = document.getElementById("visitNext");
const visitTemplateText = document.getElementById("visitTemplateText");
const visitSummaryName = document.getElementById("visitSummaryName");
const visitSummaryDoctor = document.getElementById("visitSummaryDoctor");
const visitSummarySlot = document.getElementById("visitSummarySlot");
const visitEditComplaint = document.getElementById("visitEditComplaint");
const visitEditHistory = document.getElementById("visitEditHistory");
const visitEditAllergy = document.getElementById("visitEditAllergy");
const templateFilter = document.getElementById("templateFilter");
const doctorTemplatesChips = document.getElementById("doctorTemplatesChips");
const templateText = document.getElementById("templateText");
const diagnosis = document.getElementById("diagnosis");
const recommendations = document.getElementById("recommendations");
const nextVisit = document.getElementById("nextVisit");
const visitTemplatesChips = document.getElementById("visitTemplatesChips");

let activeVisitId = null;

const TEMPLATE_CATALOG = [
  {
    key: "template1",
    label: "ОРВИ (базовый)",
    diagnosis: "ОРВИ",
    recommendations: "Покой, обильное питье, симптоматическая терапия.",
    nextVisit: "через 3 дня",
  },
  {
    key: "template2",
    label: "Гипертония (контроль)",
    diagnosis: "Артериальная гипертензия",
    recommendations: "Контроль АД 2 раза в день, коррекция терапии.",
    nextVisit: "через 14 дней",
  },
  {
    key: "template3",
    label: "Гастрит (поддержка)",
    diagnosis: "Хронический гастрит",
    recommendations: "Щадящая диета, антисекреторная терапия, исключить раздражающие факторы.",
    nextVisit: "через 10 дней",
  },
  {
    key: "template4",
    label: "Бронхит (острый)",
    diagnosis: "Острый бронхит",
    recommendations: "Теплое питье, симптоматическая терапия, дыхательная гимнастика.",
    nextVisit: "через 5-7 дней",
  },
  {
    key: "template5",
    label: "Мигрень",
    diagnosis: "Мигрень без ауры",
    recommendations: "Снижение триггеров, режим сна, купирование приступов по схеме, дневник головной боли.",
    nextVisit: "через 14 дней",
  },
  {
    key: "template6",
    label: "Тонзиллит",
    diagnosis: "Острый тонзиллит",
    recommendations: "Полоскания, щадящий режим, лечение по клинической картине.",
    nextVisit: "через 5 дней",
  },
  {
    key: "template7",
    label: "Сахарный диабет 2 типа",
    diagnosis: "Сахарный диабет 2 типа",
    recommendations: "Контроль глюкозы, диета с ограничением быстрых углеводов, физическая активность.",
    nextVisit: "через 14 дней",
  },
  {
    key: "template8",
    label: "Поясничная боль",
    diagnosis: "Неспецифическая поясничная боль",
    recommendations: "Щадящий двигательный режим, ЛФК, противовоспалительная терапия по показаниям.",
    nextVisit: "через 7 дней",
  },
  {
    key: "template9",
    label: "Аллергический ринит",
    diagnosis: "Аллергический ринит",
    recommendations: "Исключение аллергенов, антигистаминная терапия, промывание носа.",
    nextVisit: "через 7-10 дней",
  },
  {
    key: "template10",
    label: "ГЭРБ",
    diagnosis: "ГЭРБ (гастроэзофагеальная рефлюксная болезнь)",
    recommendations: "Питание дробно, исключить поздние приемы пищи, терапия по симптомам и показаниям.",
    nextVisit: "через 14 дней",
  },
  {
    key: "template11",
    label: "Острый гастроэнтерит",
    diagnosis: "Острый гастроэнтерит",
    recommendations: "Регидратация, щадящая диета, симптоматическая терапия. При ухудшении — повторный осмотр.",
    nextVisit: "через 2-3 дня",
  },
  {
    key: "template12",
    label: "Цистит",
    diagnosis: "Острый цистит",
    recommendations: "Питьевой режим, терапия по клиническим рекомендациям, контроль симптомов.",
    nextVisit: "через 3-5 дней",
  },
  {
    key: "template13",
    label: "Отит",
    diagnosis: "Острый средний отит",
    recommendations: "Обезболивание, местная терапия по показаниям, контроль динамики.",
    nextVisit: "через 3 дня",
  },
  {
    key: "template14",
    label: "Синусит",
    diagnosis: "Острый риносинусит",
    recommendations: "Промывание носа, местная терапия, при показаниях — системная терапия. Контроль симптомов.",
    nextVisit: "через 5 дней",
  },
  {
    key: "template15",
    label: "Конъюнктивит",
    diagnosis: "Острый конъюнктивит",
    recommendations: "Гигиена глаз, местная терапия по клинической картине, контроль симптомов.",
    nextVisit: "через 3-5 дней",
  },
  {
    key: "template16",
    label: "Дерматит",
    diagnosis: "Контактный дерматит",
    recommendations: "Исключить раздражитель, уход за кожей, местная терапия по показаниям.",
    nextVisit: "через 7-10 дней",
  },
  {
    key: "template17",
    label: "Тревожность",
    diagnosis: "Тревожное расстройство (под вопросом)",
    recommendations: "Режим сна, снижение кофеина, техники релаксации. При необходимости — консультация специалиста.",
    nextVisit: "через 14 дней",
  },
  {
    key: "template18",
    label: "ЖДА",
    diagnosis: "Железодефицитная анемия (под вопросом)",
    recommendations: "Обследование по показаниям, коррекция питания, терапия по результатам анализов.",
    nextVisit: "через 14-21 день",
  },
  {
    key: "template19",
    label: "Дефицит Vit D",
    diagnosis: "Дефицит витамина D (под вопросом)",
    recommendations: "Подбор дозировки после анализа, режим приема, контроль эффективности.",
    nextVisit: "через 30 дней",
  },
  {
    key: "template20",
    label: "ГБ напряжения",
    diagnosis: "Головная боль напряжения",
    recommendations: "Режим сна, снижение стресса, физическая активность, симптоматическая терапия по показаниям.",
    nextVisit: "через 14 дней",
  },
];

const templatesByKey = Object.fromEntries(TEMPLATE_CATALOG.map((t) => [t.key, t]));

function norm(s) {
  return (s || "").toString().trim().toLowerCase();
}

function matchesTemplate(query, template) {
  const q = norm(query);
  if (!q) return true;
  const hay = norm(`${template.label} ${template.diagnosis}`);
  return hay.includes(q);
}

function setActiveChip(rootEl, activeBtn) {
  if (!rootEl) return;
  rootEl.querySelectorAll(".chip2").forEach((b) => b.classList.remove("chip2--on"));
  if (activeBtn) activeBtn.classList.add("chip2--on");
}

function filterChips(rootEl, query) {
  if (!rootEl) return;
  rootEl.querySelectorAll(".chip2").forEach((btn) => {
    const key = btn.dataset.template;
    const t = templatesByKey[key];
    const ok = t ? matchesTemplate(query, t) : true;
    btn.classList.toggle("hidden", !ok);
  });
}

function renderTemplateButtons(rootEl, buttonClass, onClick) {
  if (!rootEl) return;
  rootEl.innerHTML = "";
  TEMPLATE_CATALOG.forEach((t) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip2 ${buttonClass}`;
    btn.dataset.template = t.key;
    btn.dataset.diagnosis = t.diagnosis;
    btn.textContent = t.label;
    btn.addEventListener("click", () => onClick(t, btn));
    rootEl.appendChild(btn);
  });
}
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
const baseTimeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];

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
  updateTherapistVisitType();
  doctorName.dispatchEvent(new Event("change"));
}

function updateTherapistVisitType() {
  const isTherapist = specialtyName.value === "Терапевт";
  therapistVisitTypeWrap.classList.toggle("hidden", !isTherapist);
  if (!isTherapist) {
    therapistVisitType.value = "";
  }
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
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  visitDate.min = dateStr;
  if (!visitDate.value) {
    visitDate.value = dateStr;
  }

  const renderTimesByDay = () => {
    const date = visitDate.value;
    const doctor = doctorName.value;
    const occupiedTimes = new Set(
      getQueue()
        .filter((item) => item.visitDateIso === date && item.doctor === doctor)
        .map((item) => item.visitTime)
        .filter(Boolean)
    );

    visitTime.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Выберите время";
    visitTime.appendChild(defaultOption);

    baseTimeSlots.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = occupiedTimes.has(time) ? `${time} (занято)` : time;
      option.disabled = occupiedTimes.has(time);
      visitTime.appendChild(option);
    });

    const firstFreeSlot = baseTimeSlots.find((time) => !occupiedTimes.has(time));
    if (firstFreeSlot) {
      visitTime.value = firstFreeSlot;
    } else {
      visitTime.value = "";
    }
  };

  renderTimesByDay();
  visitDate.addEventListener("change", renderTimesByDay);
  doctorName.addEventListener("change", renderTimesByDay);
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
  return `${visitDate.value} ${visitTime.value}`;
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
        <div class="rowItem__meta">Тип приема: ${item.visitReason || "Стандартный прием"}</div>
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

function dash(v) {
  const s = v == null ? "" : String(v).trim();
  return s ? s : "—";
}

function passportBlock(item) {
  const s = dash(item.passportSeries);
  const n = dash(item.passportNumber);
  const docLine =
    s !== "—" || n !== "—"
      ? `паспорт гражданина Российской Федерации, серия ${s}, номер ${n}`
      : "—";
  return `ПАСПОРТНЫЕ ДАННЫЕ
Дата рождения: 27.07.2007 
Документ, удостоверяющий личность: 12 34 123456
Кем выдан: Петров Д.И
Дата выдачи документа: 01.01.2001`;
}

function buildFullProtocol(item, form) {
  return `ПРОТОКОЛ КОНСУЛЬТАЦИИ

Пациент (ФИО): ${dash(item.name)}
${passportBlock(item)}

Время записи: ${dash(item.slot)}
Врач: ${dash(item.doctor)}
Кабинет: ${dash(item.cabinet)}
Тип приёма: ${dash(item.visitReason)}

Анамнез (из анкеты)
Жалоба: ${dash(item.complaint)}
Преданкета: ${dash(item.history)}
Аллергии и сопутствующие: ${dash(item.allergy)}

Осмотр
Пульс: ${dash(form.pulse)} уд/мин
Артериальное давление: ${dash(form.bp)} мм рт. ст.
Температура: ${dash(form.temp)} °C
Вес: ${dash(form.weight)} кг

Объективно:
${dash(form.objective)}

Заключение
Диагноз: ${dash(form.diagnosis)}
Рекомендации: ${dash(form.recommendations)}
Следующий приём: ${dash(form.nextVisit)}
`.trim();
}

function resultToProtocolText(data) {
  if (!data) return "";
  if (data.fullProtocol) return data.fullProtocol;
  return `ПРОТОКОЛ КОНСУЛЬТАЦИИ

Диагноз: ${dash(data.diagnosis)}
Рекомендации: ${dash(data.recommendations)}
Следующий приём: ${dash(data.nextVisit)}
`.trim();
}

function updatePatientResult(data) {
  const text = resultToProtocolText(data);
  patientResultProtocol.textContent = text || "Протокол пока не сформирован.";
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
  visitEditComplaint.value = item.complaint || "";
  visitEditHistory.value = item.history || "";
  visitEditAllergy.value = item.allergy || "";
  visitPulse.value = "";
  visitBp.value = "";
  visitTemp.value = "";
  visitWeight.value = "";
  visitObjective.value = "";
  visitDiagnosis.value = "";
  visitRecommendations.value = "";
  visitNext.value = "";
  visitResultSuccess.classList.add("hidden");
  if (visitTemplateText) {
    visitTemplateText.classList.add("hidden");
    visitTemplateText.innerHTML = "";
  }
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
  renderTemplateButtons(visitTemplatesChips, "visit-template", (template, btn) => {
    visitDiagnosis.value = template.diagnosis;
    visitRecommendations.value = template.recommendations;
    visitNext.value = template.nextVisit || "";
    if (visitTemplateText) {
      visitTemplateText.classList.remove("hidden");
      visitTemplateText.innerHTML = `<div class="quote__text"><strong>Диагноз:</strong> ${template.diagnosis}<br><strong>Рекомендации:</strong> ${template.recommendations}<br><strong>Следующий приём:</strong> ${template.nextVisit || "—"}</div>`;
    }
    setActiveChip(visitTemplatesChips, btn);
  });

  if (visitDiagnosis) {
    visitDiagnosis.addEventListener("input", () => {
      filterChips(visitTemplatesChips, visitDiagnosis.value);
    });
    filterChips(visitTemplatesChips, visitDiagnosis.value);
  }
}

function initDoctorTemplates() {
  renderTemplateButtons(doctorTemplatesChips, "doc-template", (template, btn) => {
    if (diagnosis) diagnosis.value = template.diagnosis;
    if (recommendations) recommendations.value = template.recommendations;
    if (nextVisit) nextVisit.value = template.nextVisit || "";
    if (templateText) {
      templateText.classList.remove("hidden");
      templateText.innerHTML = `<div class="quote__text"><strong>Диагноз:</strong> ${template.diagnosis}<br><strong>Рекомендации:</strong> ${template.recommendations}<br><strong>Следующий приём:</strong> ${template.nextVisit || "—"}</div>`;
    }
    setActiveChip(doctorTemplatesChips, btn);
  });

  if (templateFilter) {
    templateFilter.addEventListener("input", () => {
      filterChips(doctorTemplatesChips, templateFilter.value);
    });
    filterChips(doctorTemplatesChips, templateFilter.value);
  }

  if (diagnosis) {
    diagnosis.addEventListener("input", () => {
      if (!templateFilter || templateFilter.value.trim()) return;
      filterChips(doctorTemplatesChips, diagnosis.value);
    });
  }
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

  if (!visitDate.value || !visitTime.value) {
    bookSuccess.classList.remove("hidden");
    bookSuccess.textContent = "Выберите дату и свободное время приема.";
    return;
  }
  if (specialtyName.value === "Терапевт" && !therapistVisitType.value) {
    bookSuccess.classList.remove("hidden");
    bookSuccess.textContent = "Для терапевта выберите тип приема.";
    return;
  }

  const queue = getQueue();
  const isOccupied = queue.some(
    (item) =>
      item.visitDateIso === visitDate.value &&
      item.visitTime === visitTime.value &&
      item.doctor === doctorName.value
  );
  if (isOccupied) {
    bookSuccess.classList.remove("hidden");
    bookSuccess.textContent = "Это время уже занято. Выберите другой слот.";
    visitDate.dispatchEvent(new Event("change"));
    return;
  }

  const id = `p_${Date.now()}`;
  const visitReasonText =
    specialtyName.value === "Терапевт"
      ? therapistVisitType.options[therapistVisitType.selectedIndex].textContent
      : "Стандартный прием";
  const entry = {
    id,
    name: nameValue,
    doctor: doctorName.value,
    slot: selectedSlot(),
    visitDateIso: visitDate.value,
    visitTime: visitTime.value,
    visitReason: visitReasonText,
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
  visitDate.dispatchEvent(new Event("change"));
});

saveVisitResult.addEventListener("click", () => {
  if (!activeVisitId) return;

  const queue = getQueue();
  const index = queue.findIndex((item) => item.id === activeVisitId);
  if (index === -1) return;

  queue[index].complaint = visitEditComplaint.value.trim();
  queue[index].history = visitEditHistory.value.trim();
  queue[index].allergy = visitEditAllergy.value.trim();

  const form = {
    pulse: visitPulse.value.trim(),
    bp: visitBp.value.trim(),
    temp: visitTemp.value.trim(),
    weight: visitWeight.value.trim(),
    objective: visitObjective.value.trim(),
    diagnosis: visitDiagnosis.value.trim(),
    recommendations: visitRecommendations.value.trim(),
    nextVisit: visitNext.value.trim(),
  };
  const fullProtocol = buildFullProtocol(queue[index], form);
  const payload = {
    ...form,
    fullProtocol,
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
initDoctorTemplates();
renderDoctorQueue();
renderPatientQueueState();
renderPatientResult();
