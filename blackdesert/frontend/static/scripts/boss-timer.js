/* prettier-ignore */
export let bossTimes = {};
export const loadingBossTimes = new Promise(async (resolve) => {
  const response = await fetch("/static/data/json/bossTimes.json");
  bossTimes = await response.json();
  resolve();
});
await loadingBossTimes;

export let selectedRegion = "eu";

function getNextBoss(region = "eu") {
  // Helper function to convert time to minutes since midnight
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Get current time
  const now = new Date();

  // Get current time in the region's timezone
  let currentTime;
  if (region === "na") {
    // NA servers use Pacific Time (PDT/PST)
    currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
  } else {
    // EU servers use Central European Time (CET/CEST)
    currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
    );
  }

  const currentDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
    currentTime.getDay()
  ];
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Get today's boss schedule
  const todaySchedule = bossTimes[region][currentDay];

  // Find next boss today
  for (const bossEntry of todaySchedule) {
    if (bossEntry.boss === "-") continue; // Skip empty entries

    const bossMinutes = timeToMinutes(bossEntry.time);

    if (bossMinutes > currentMinutes) {
      const result = {
        boss: bossEntry.boss,
        time: bossEntry.time,
        localTime: convertToLocalTime(bossEntry.time, region),
        localDate: createLocalDate(bossEntry.time, region, currentTime),
        day: currentDay,
        region: region,
      };
      return result;
    }
  }

  // If no boss found today, check tomorrow
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
    tomorrow.getDay()
  ];
  const tomorrowSchedule = bossTimes[region][tomorrowDay];

  // Find first boss tomorrow
  for (const bossEntry of tomorrowSchedule) {
    if (bossEntry.boss === "-") continue;

    return {
      boss: bossEntry.boss,
      time: bossEntry.time,
      localTime: convertToLocalTime(bossEntry.time, region),
      localDate: createLocalDate(bossEntry.time, region, tomorrow),
      day: tomorrowDay,
      region: region,
    };
  }

  return null; // Should never reach here
}

// Helper function to convert boss time to local time
function convertToLocalTime(bossTime, region) {
  const [hours, minutes] = bossTime.split(":").map(Number);

  if (region === "na") {
    // Create a date object representing the boss time in Pacific timezone
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    // Create date in Pacific timezone
    const pacificBossTime = new Date();
    pacificBossTime.setFullYear(year, month, date);
    pacificBossTime.setHours(hours, minutes, 0, 0);

    // Simple calculation: add 9 hours to Pacific time to get CET/CEST
    const localHours = (hours + 9) % 24;
    return `${localHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } else {
    // For EU, times are already in CET/CEST (your timezone)
    return bossTime;
  }
}

// Helper function to create a local Date object for the boss spawn time
function createLocalDate(bossTime, region, baseDate) {
  const [hours, minutes] = bossTime.split(":").map(Number);
  const localDate = new Date(baseDate);

  if (region === "na") {
    // For NA, we need to convert Pacific time to local time
    // Create date in Pacific timezone first
    const pacificHours = hours;
    const pacificMinutes = minutes;

    // Convert to local time (add 9 hours for CET/CEST)
    let localHours = (pacificHours + 9) % 24;
    let dayOffset = 0;

    // Handle day rollover
    if (pacificHours + 9 >= 24) {
      dayOffset = 1;
    }

    localDate.setDate(localDate.getDate() + dayOffset);
    localDate.setHours(localHours, pacificMinutes, 0, 0);
  } else {
    // For EU, times are already in local timezone
    localDate.setHours(hours, minutes, 0, 0);
  }

  return localDate;
}

const timerEl = document.getElementById("boss-timer");

let nextBoss = getNextBoss(selectedRegion);
updateActive();
setInterval(function () {
  // Get today's date and time (subtract 2 minutes for server time adjustment)
  var now = Date.now();

  var oldBoss = nextBoss;
  nextBoss = getNextBoss(selectedRegion);

  if (oldBoss.boss !== nextBoss.boss) {
    updateActive();
  }
  // Find the distance between now and the countdown date
  var distance = new Date(nextBoss.localDate) - now;
  nextBoss.innerHTML = nextBoss.boss;

  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the timer element
  timerEl.textContent =
    String(hours).padStart(2, "0") +
    "h " +
    String(minutes).padStart(2, "0") +
    "m " +
    String(seconds).padStart(2, "0") +
    "s";
}, 1000);

export const regionButton = document.getElementById("region-button");
regionButton.innerHTML = selectedRegion === "eu" ? "EU" : "NA";
regionButton.addEventListener("click", () => {
  selectedRegion = selectedRegion === "eu" ? "na" : "eu";
  regionButton.innerHTML = selectedRegion === "eu" ? "EU" : "NA";
});

export function updateActive() {
  const tableBody = document.getElementById("tableBody");
  if (!tableBody) return;
  for (let row of tableBody.children) {
    for (let entry of [].slice.call(row.children)) {
      entry.classList.remove("active");
    }
  }
  if (!tableBody.children[nextBoss.time]) return;
  tableBody.children[nextBoss.time].children[nextBoss.day].classList.add(
    "active"
  );
}
