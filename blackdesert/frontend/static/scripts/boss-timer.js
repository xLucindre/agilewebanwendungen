const bossTimes = {
  na: {
    mon: [
      { time: "00:00", boss: "Karanda" },
      { time: "03:00", boss: "Kzarka" },
      { time: "07:00", boss: "Kzarka, Uturi" },
      { time: "10:00", boss: "Offin" },
      { time: "12:00", boss: "Garmoth, Golden Pig King" },
      { time: "14:00", boss: "Kutum, Bulgasal" },
      { time: "17:00", boss: "Karanda, Bulgasal, Golden Pig King" },
      { time: "20:15", boss: "Kzarka, Sangoon" },
      { time: "21:15", boss: "Garmoth, Uturi" },
      { time: "22:15", boss: "Karanda, Sangoon" }
    ],
    tue: [
      { time: "00:00", boss: "Kutum" },
      { time: "03:00", boss: "Kzarka" },
      { time: "07:00", boss: "Nouver" },
      { time: "10:00", boss: "Kutum" },
      { time: "12:00", boss: "Garmoth, Golden Pig King" },
      { time: "14:00", boss: "Nouver, Bulgasal" },
      { time: "17:00", boss: "Karanda, Bulgasal" },
      { time: "20:15", boss: "Quint, Muraka, Bulgasal" },
      { time: "21:15", boss: "Garmoth, Sangoon" },
      { time: "22:15", boss: "Kzarka, Kutum, Uturi" }
    ],
    wed: [
      { time: "00:00", boss: "Karanda" },
      { time: "03:00", boss: "Kzarka" },
      { time: "07:00", boss: "Karanda" },
      { time: "10:00", boss: "Nouver" },
      { time: "12:00", boss: "Garmoth, Golden Pig King" },
      { time: "14:00", boss: "Kutum, Offin, Bulgasal" },
      { time: "17:00", boss: "Karanda" },
      { time: "20:15", boss: "Karanda, Kzarka, Uturi" },
      { time: "21:15", boss: "Garmoth" },
      { time: "22:15", boss: "Kzarka, Kutum" }
    ],
    thu: [
      { time: "00:00", boss: "Kutum" },
      { time: "07:00", boss: "Kutum" },
      { time: "10:00", boss: "Nouver, Sangoon" },
      { time: "12:00", boss: "Garmoth, Uturi" },
      { time: "14:00", boss: "Kzarka, Sangoon, Bulgasal" },
      { time: "17:00", boss: "Vell, Sangoon" },
      { time: "20:15", boss: "Karanda, Kzarka, Sangoon" },
      { time: "21:15", boss: "Garmoth, Golden Pig King" },
      { time: "22:15", boss: "Nouver, Golden Pig King" }
    ],
    fri: [
      { time: "00:00", boss: "Nouver" },
      { time: "03:00", boss: "Karanda" },
      { time: "07:00", boss: "Kutum" },
      { time: "10:00", boss: "Karanda" },
      { time: "12:00", boss: "Garmoth, Bulgasal" },
      { time: "14:00", boss: "Nouver, Uturi, Golden Pig King" },
      { time: "17:00", boss: "Kutum, Bulgasal" },
      { time: "20:15", boss: "Quint, Muraka" },
      { time: "21:15", boss: "Garmoth" },
      { time: "22:15", boss: "Karanda, Kzarka, Bulgasal" }
    ],
    sat: [
      { time: "00:00", boss: "Offin, Uturi" },
      { time: "03:00", boss: "Nouver" },
      { time: "07:00", boss: "Kutum" },
      { time: "10:00", boss: "Nouver, Sangoon" },
      { time: "12:00", boss: "Garmoth, Golden Pig King, Uturi" },
      { time: "14:00", boss: "Black Shadow, Bulgasal, Golden Pig King" },
      { time: "17:00", boss: "Karanda, Kzarka, Bulgasal" }
    ],
    sun: [
      { time: "00:00", boss: "Kzarka, Uturi" },
      { time: "03:00", boss: "Kutum" },
      { time: "07:00", boss: "Nouver" },
      { time: "10:00", boss: "Kzarka, Sangoon, Golden Pig King" },
      { time: "12:00", boss: "Garmoth" },
      { time: "14:00", boss: "Vell" },
      { time: "17:15", boss: "Kzarka, Nouver, Garmoth, Bulgasal" },
      { time: "20:15", boss: "Kzarka, Nouver, Golden Pig King, Sangoon" },
      { time: "21:15", boss: "Garmoth" },
      { time: "22:15", boss: "Karanda, Kutum" }
    ]
  },
  eu: {
    mon: [
      { time: "00:15", boss: "Karanda, Kutum, Uturi" },
      { time: "02:00", boss: "Karanda, Bulgasal" },
      { time: "05:00", boss: "Kzarka" },
      { time: "09:00", boss: "Kzarka" },
      { time: "12:00", boss: "Offin" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Kutum, Uturi" },
      { time: "19:00", boss: "Nouver, Golden Pig King, Bulgasal" },
      { time: "22:15", boss: "Kzarka, Sangoon, Uturi" },
      { time: "23:15", boss: "Garmoth" }
    ],
    tue: [
      { time: "00:15", boss: "Kutum, Golden Pig King" },
      { time: "02:00", boss: "Kutum, Sangoon" },
      { time: "05:00", boss: "Kzarka" },
      { time: "09:00", boss: "Nouver" },
      { time: "12:00", boss: "Kutum" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Nouver, Golden Pig King" },
      { time: "19:00", boss: "Karanda, Bulgasal, Uturi" },
      { time: "22:15", boss: "Quint, Muraka, Golden Pig King, Sangoon" },
      { time: "23:15", boss: "Garmoth" }
    ],
    wed: [
      { time: "00:15", boss: "Karanda, Golden Pig King" },
      { time: "02:00", boss: "Karanda, Golden Pig King" },
      { time: "05:00", boss: "Kzarka" },
      { time: "09:00", boss: "Karanda" },
      { time: "12:00", boss: "Nouver" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Kutum, Offin, Bulgasal" },
      { time: "19:00", boss: "Vell" },
      { time: "22:15", boss: "Kzarka, Karanda, Sangoon, Uturi" },
      { time: "23:15", boss: "Garmoth" }
    ],
    thu: [
      { time: "00:15", boss: "Kzarka, Kutum, Bulgasal" },
      { time: "02:00", boss: "Kutum, Sangoon" },
      { time: "05:00", boss: "Nouver" },
      { time: "09:00", boss: "Kutum" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Kzarka, Uturi" },
      { time: "19:00", boss: "Kutum, Sangoon, Bulgasal" },
      { time: "22:15", boss: "Kzarka, Golden Pig King" },
      { time: "23:15", boss: "Garmoth" }
    ],
    fri: [
      { time: "00:15", boss: "Nouver, Bulgasal" },
      { time: "02:00", boss: "Nouver, Bulgasal" },
      { time: "05:00", boss: "Karanda" },
      { time: "09:00", boss: "Kutum" },
      { time: "12:00", boss: "-" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Nouver, Uturi" },
      { time: "19:00", boss: "Kzarka, Golden Pig King" },
      { time: "22:15", boss: "Kzarka, Kutum, Bulgasal" },
      { time: "23:15", boss: "Garmoth" }
    ],
    sat: [
      { time: "00:15", boss: "Karanda, Golden Pig King, Sangoon" },
      { time: "02:00", boss: "Offin, Golden Pig King, Bulgasal" },
      { time: "05:00", boss: "Nouver" },
      { time: "09:00", boss: "Kutum" },
      { time: "12:00", boss: "Nouver" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Black Shadow, Uturi, Golden Pig King" },
      { time: "19:00", boss: "Karanda, Kzarka, Bulgasal, Sangoon" }
    ],
    sun: [
      { time: "00:15", boss: "Nouver, Kutum, Uturi" },
      { time: "02:00", boss: "Kzarka, Sangoon, Bulgasal" },
      { time: "05:00", boss: "Kutum" },
      { time: "09:00", boss: "Nouver" },
      { time: "12:00", boss: "Kzarka" },
      { time: "14:00", boss: "Garmoth" },
      { time: "16:00", boss: "Vell" },
      { time: "19:15", boss: "Garmoth" },
      { time: "22:15", boss: "Kzarka, Nouver, Golden Pig King, Sangoon" },
      { time: "23:15", boss: "Garmoth" }
    ]
  }
}

let selectedRegion = "eu"

function getNextBoss(region = 'eu') {
  // Helper function to convert time to minutes since midnight
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }



  // Get current time
  const now = new Date();
  
  // Get current time in the region's timezone
  let currentTime;
  if (region === 'na') {
    // NA servers use Pacific Time (PDT/PST)
    currentTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  } else {
    // EU servers use Central European Time (CET/CEST)
    currentTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}));
  }

  const currentDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][currentTime.getDay()];
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Get today's boss schedule
  const todaySchedule = bossTimes[region][currentDay];
  
  // Find next boss today
  for (const bossEntry of todaySchedule) {
    if (bossEntry.boss === '-') continue; // Skip empty entries
    
    const bossMinutes = timeToMinutes(bossEntry.time);
    
    if (bossMinutes > currentMinutes) {
      const result = {
        boss: bossEntry.boss,
        time: bossEntry.time,
        localTime: convertToLocalTime(bossEntry.time, region),
        localDate: createLocalDate(bossEntry.time, region, currentTime),
        day: currentDay,
        region: region
      };
      return result;
    }
  }

  // If no boss found today, check tomorrow
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][tomorrow.getDay()];
  const tomorrowSchedule = bossTimes[region][tomorrowDay];
  
  // Find first boss tomorrow
  for (const bossEntry of tomorrowSchedule) {
    if (bossEntry.boss === '-') continue;
    
    return {
      boss: bossEntry.boss,
      time: bossEntry.time,
      localTime: convertToLocalTime(bossEntry.time, region),
      localDate: createLocalDate(bossEntry.time, region, tomorrow),
      day: tomorrowDay,
      region: region
    };
  }

  return null; // Should never reach here
}

// Helper function to check if daylight saving is active
function isDaylightSaving(date) {
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);
  return Math.max(january.getTimezoneOffset(), july.getTimezoneOffset()) !== date.getTimezoneOffset();
}

// Helper function to convert boss time to local time
function convertToLocalTime(bossTime, region) {
  const [hours, minutes] = bossTime.split(':').map(Number);
  const now = new Date();
  
  if (region === 'na') {
    // Create a date object representing the boss time in Pacific timezone
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    
    // Create date in Pacific timezone
    const pacificBossTime = new Date();
    pacificBossTime.setFullYear(year, month, date);
    pacificBossTime.setHours(hours, minutes, 0, 0);
    
    // Convert Pacific time to Central European time
    // Pacific is typically UTC-8 (PST) or UTC-7 (PDT)
    // Central European is typically UTC+1 (CET) or UTC+2 (CEST)
    // The difference is usually 9 hours (CET/CEST is 9 hours ahead of PST/PDT)
    
    const pacificTimeInUTC = new Date(pacificBossTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const cetTime = new Date(pacificTimeInUTC.toLocaleString("en-US", {timeZone: "Europe/Berlin"}));
    
    // Simple calculation: add 9 hours to Pacific time to get CET/CEST
    const localHours = (hours + 9) % 24;
    return `${localHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else {
    // For EU, times are already in CET/CEST (your timezone)
    return bossTime;
  }
}

// Helper function to create a local Date object for the boss spawn time
function createLocalDate(bossTime, region, baseDate) {
  const [hours, minutes] = bossTime.split(':').map(Number);
  const localDate = new Date(baseDate);
  
  if (region === 'na') {
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

// Usage examples:
console.log('Next EU boss:', getNextBoss(selectedRegion));
console.log('Next NA boss:', getNextBoss('na'));


const timerEl = document.getElementById("boss-timer");
const bossTimer = new Date(Date(timerEl.dataset.bossTimer)).getTime();

let nextBoss = getNextBoss(selectedRegion);
updateActive()
console.log(timerEl.dataset.bossTimer);
var x = setInterval(function () {
  // Get today's date and time (subtract 2 minutes for server time adjustment)
  var now = Date.now()

  var oldBoss = nextBoss
  nextBoss = getNextBoss(selectedRegion)

  if(oldBoss.boss !== nextBoss.boss){
    updateActive()
  }
  // Find the distance between now and the countdown date
  var distance = new Date(nextBoss.localDate) - now;
  nextBoss.innerHTML = nextBoss.boss
  
  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Display the result in the timer element
  timerEl.textContent =
  String(hours).padStart(2, '0') + "h " +
  String(minutes).padStart(2, '0') + "m " +
  String(seconds).padStart(2, '0') + "s";
}, 1000);

const regionButton = document.getElementById("region-button");
regionButton.innerHTML = selectedRegion === "eu" ? "EU":"NA"
regionButton.addEventListener("click", () =>{
  selectedRegion = selectedRegion === "eu" ? "na":"eu"
  regionButton.innerHTML = selectedRegion === "eu" ? "EU":"NA"
})

function updateActive(){
  const tableBody = document.getElementById('tableBody')
  if(!tableBody) return
  console.log(selectedRegion)
  for(row of tableBody.children){
    for(entry of [].slice.call(row.children)){
      entry.classList.remove("active")
    }
  }
  console.log(nextBoss)
  tableBody.children[nextBoss.time].children[nextBoss.day].classList.add("active")
}