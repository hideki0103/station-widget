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
      const dx = (lat - station.lat) * 111000; // 緯度差 → メートル
      const dy = (lon - station.lon) * 91000;  // 経度差 → メートル（東京付近の係数）
      const distance = Math.sqrt(dx * dx + dy * dy); // メートル単位の距離

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
