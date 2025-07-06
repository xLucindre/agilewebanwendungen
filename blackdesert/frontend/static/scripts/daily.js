function updateResetTimer() {
    const now = new Date();
  
    // Ziel: 2:00 Uhr deutscher Zeit (entspricht 24:00 UTC bei MESZ)
    let resetTime = new Date(now);
    resetTime.setUTCHours(24, 0, 0, 0);
  
    if (now >= resetTime) {
      resetTime.setUTCDate(resetTime.getUTCDate() + 1);
    }
  
    const diffMs = resetTime - now;
    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    document.getElementById('reset-timer').textContent = `${hours}h ${minutes}m`;
  }
  
  updateResetTimer();
  setInterval(updateResetTimer, 30000);