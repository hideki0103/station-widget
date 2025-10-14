function getNearestStation() {
  if (!navigator.geolocation) {
    document.getElementById("station").textContent = "位置情報が取得できません。";
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    let nearest = null;
    let minDistance = Infinity;

    for (const station of stations) {
      const dx = lat - station.lat;
      const dy = lon - station.lon;
      const distance = Math.sqrt(dx * dx + dy * dy) * 111000; // 緯度経度差 → メートル換算

      if (distance < minDistance) {
        minDistance = distance;
        nearest = station;
      }
    }

    if (nearest) {
      const rounded = Math.round(minDistance);
      document.getElementById("station").textContent =
        `最寄り駅：${nearest.name}（約${rounded}m）`;
    } else {
      document.getElementById("station").textContent = "最寄り駅が見つかりません。";
    }
  }, () => {
    document.getElementById("station").textContent = "位置情報の取得に失敗しました。";
  });
}
