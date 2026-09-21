// Developers Community Pokhara - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.querySelector('.td-header__hamburger');
  const mobileMenu = document.querySelector('.td-header__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('td-header__mobile-menu--open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }


  const mobileLinks = document.querySelectorAll('.td-header__mobile-inner .td-header__link');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) {
        mobileMenu.classList.remove('td-header__mobile-menu--open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

/*
  Developers Community Pokhara
  --------------------------------
  Add new events to the "events" array below.

  IMPORTANT:
  - date must use YYYY-MM-DD
  - startTime and endTime use 24-hour format: "HH:MM" (e.g., "14:00" = 2:00 PM)
  - Display is automatic: 12-hour format with AM/PM (e.g., "2:00 PM")
  - All times are in Nepal Time (GMT+5:45)
  - JavaScript automatically checks current Nepal time.
  - If current time is BEFORE event start -> UPCOMING EVENT
  - If current time is BETWEEN start and end -> ONGOING EVENT
  - If current time is AFTER event end -> EVENT COMPLETED
  - The closest upcoming/ongoing event is selected first.
  - If no upcoming/ongoing events, the most recent past event is shown.
*/

const NEPAL_OFFSET_HOURS = 5;
const NEPAL_OFFSET_MINUTES = 45;

function getNepalTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + (NEPAL_OFFSET_HOURS * 60 + NEPAL_OFFSET_MINUTES) * 60000);
}

function parseTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return { hours, minutes };
}

const events = [
  {
    id: 37,
    date: "2026-08-01",
    title: "Digital Marketing, SEO and Brand Building",
    subtitle:
      "Why Great Products Fail? The Marketing Problem! — with Rahul Rauniyar.",
    startTime: "12:00",
    endTime: "14:00",
    venue: "Informatics College Pokhara, Lions Marga, Pokhara",
    speaker: "Rahul Rauniyar",
    description:
      "An insightful session on digital marketing, SEO and brand-building strategies, exploring why great products can fail in the market and how better marketing can change the outcome.",
    poster: "/images/event-poster.jpg",
    registrationUrl: "#"
  },

  {
    id: 38,
    date: "2026-08-22",
    title: "Reading Unites Developers",
    subtitle:
      "“Reading Unites Developers” — a dialogue-driven gathering designed to discuss why reading matters for developers and what we can build from a stronger culture of reading.",
    startTime: "12:00",
    endTime: "14:00",
    venue: "Pokhara Research Center",
    speaker: "Bikram Adhikari",
    description:
      "“Reading Unites Developers” — a dialogue-driven gathering designed to discuss why reading matters for developers and what we can build from a stronger culture of reading.",
    poster: "/images/dev-bikram.png",
    registrationUrl: "#"
  }

  // Add future events here:
  // {
  //   id: 3,
  //   date: "2026-09-15",
  //   title: "Your New Event",
  //   subtitle: "Short event description.",
  //   startTime: "11:00",    // 11:00 AM
  //   endTime: "13:00",      // 1:00 PM
  //   venue: "Pokhara, Nepal",
  //   speaker: "Speaker Name",
  //   description: "Full event description.",
  //   poster: "new-event-poster.jpg",
  //   registrationUrl: "https://lu.ma/your-event"
  // }
];

const eventCard = document.getElementById("eventCard");
const eventStatus = document.getElementById("eventStatus");
const eventNumber = document.getElementById("eventNumber");
const eventTitle = document.getElementById("eventTitle");
const eventSubtitle = document.getElementById("eventSubtitle");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const eventVenue = document.getElementById("eventVenue");
const eventSpeaker = document.getElementById("eventSpeaker");
const eventDescription = document.getElementById("eventDescription");
const eventPoster = document.getElementById("eventPoster");
const eventButton = document.getElementById("eventButton");
const eventNavigation = document.getElementById("eventNavigation");
const nextEventButton = document.getElementById("nextEventButton");

let selectedEventId = null;

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatTime12h(time24) {
  const { hours, minutes } = parseTime(time24);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function formatEventTime(event) {
  return `${formatTime12h(event.startTime)} – ${formatTime12h(event.endTime)} (NPT)`;
}

function formatDate(dateString) {
  return parseLocalDate(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getEventState(event) {
  const nepalNow = getNepalTime();
  const nepalToday = new Date(nepalNow.getFullYear(), nepalNow.getMonth(), nepalNow.getDate());

  const eventDate = parseLocalDate(event.date);
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

  // STEP 1: Check DATE first
  if (eventDay > nepalToday) {
    return "upcoming";  // Event date is in the future
  }

  if (eventDay < nepalToday) {
    return "past";  // Event date is in the past
  }

  // STEP 2: Same date - Now check TIME
  const start = parseTime(event.startTime);
  const end = parseTime(event.endTime);

  const eventStart = new Date(nepalNow.getFullYear(), nepalNow.getMonth(), nepalNow.getDate(), start.hours, start.minutes, 0);
  const eventEnd = new Date(nepalNow.getFullYear(), nepalNow.getMonth(), nepalNow.getDate(), end.hours, end.minutes, 0);

  if (nepalNow >= eventStart && nepalNow <= eventEnd) {
    return "ongoing";  // Current time is between start and end
  }

  if (nepalNow < eventStart) {
    return "upcoming";  // Same date but event hasn't started yet
  }

  return "past";  // Same date but event has ended
}

function chooseDefaultEvent() {
  const sorted = [...events].sort(
    (a, b) => parseLocalDate(a.date) - parseLocalDate(b.date)
  );

  const ongoing = sorted.filter(event => getEventState(event) === "ongoing");
  if (ongoing.length > 0) return ongoing[0];

  const upcoming = sorted.filter(event => getEventState(event) === "upcoming");
  if (upcoming.length > 0) return upcoming[0];

  return sorted[sorted.length - 1];
}

function renderEvent(event) {
  if (!event) return;

  const state = getEventState(event);
  selectedEventId = event.id;

  eventCard.classList.remove("past", "ongoing", "upcoming");
  eventStatus.classList.remove("past", "ongoing");

  if (state === "upcoming") {
    eventStatus.textContent = "UPCOMING EVENT";
    eventButton.textContent = "Register on Luma →";
    eventButton.style.display = "inline-flex";
    eventButton.classList.remove("disabled");
    eventButton.removeAttribute("disabled");
    eventCard.classList.add("upcoming");
  } else if (state === "ongoing") {
    eventStatus.textContent = "ONGOING EVENT";
    eventButton.textContent = "Join Now →";
    eventButton.style.display = "inline-flex";
    eventButton.classList.remove("disabled");
    eventButton.removeAttribute("disabled");
    eventCard.classList.add("ongoing");
  } else {
    eventStatus.textContent = "EVENT COMPLETED";
    eventStatus.classList.add("past");
    eventButton.textContent = "Event Completed";
    eventButton.style.display = "inline-flex";
    eventButton.classList.add("disabled");
    eventButton.setAttribute("disabled", "true");
    eventCard.classList.add("past");
  }

  eventNumber.textContent = `Event #${event.id}`;
  eventTitle.textContent = event.title;
  eventSubtitle.textContent = event.subtitle;
  eventDate.textContent = formatDate(event.date);
  eventTime.textContent = formatEventTime(event);
  eventVenue.textContent = event.venue;
  eventSpeaker.textContent = event.speaker;
  eventDescription.textContent = event.description;

  eventPoster.src = event.poster;
  eventPoster.alt = `${event.title} poster`;

  if ((state === "upcoming" || state === "ongoing") && event.registrationUrl && event.registrationUrl !== "#") {
    eventButton.href = event.registrationUrl;
    eventButton.target = "_blank";
    eventButton.rel = "noopener";
  } else if (state === "upcoming" || state === "ongoing") {
    eventButton.href = "#";
    eventButton.target = "_self";
  }

  renderNavigation();
}

function renderNavigation() {
  eventNavigation.innerHTML = "";

  const sortedEvents = [...events].sort(
    (a, b) => parseLocalDate(a.date) - parseLocalDate(b.date)
  );

  sortedEvents.forEach(event => {
    const button = document.createElement("button");
    button.className = "event-nav-btn";
    button.type = "button";
    button.textContent = `${formatShortDate(event.date)} · ${event.title}`;

    if (event.id === selectedEventId) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => renderEvent(event));
    eventNavigation.appendChild(button);
  });
}

function formatShortDate(dateString) {
  return parseLocalDate(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function setupNextEventButton() {
  nextEventButton.addEventListener("click", () => {
    const sorted = [...events].sort(
      (a, b) => parseLocalDate(a.date) - parseLocalDate(b.date)
    );

    const currentIndex = sorted.findIndex(
      event => event.id === selectedEventId
    );

    const nextIndex = (currentIndex + 1) % sorted.length;
    renderEvent(sorted[nextIndex]);
  });
}

function initialize() {
  if (!eventCard) return; // pages without the featured event card (e.g. blog.html)
  if (!events.length) {
    eventTitle.textContent = "No events available";
    eventDescription.textContent = "Please add an event in script.js.";
    return;
  }

  renderEvent(chooseDefaultEvent());
  setupNextEventButton();

  document.getElementById("year").textContent = new Date().getFullYear();
}

initialize();
