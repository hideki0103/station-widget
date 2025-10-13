function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // 地球半径(m)
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

navigator.geolocation.getCurrentPosition(pos => {
  const { latitude, longitude } = pos.coords;
  let nearest = stations[0];
  let minDist = getDistance(latitude, longitude, nearest.lat, nearest.lon);

  for (let s of stations) {
    const dist = getDistance(latitude, longitude, s.lat, s.lon);
    if (dist < minDist) {
      nearest = s;
      minDist = dist;
    }
  }

  document.getElementById("station").textContent =
    `${nearest.name}（約${Math.round(minDist)}m）`;
}, err => {
  document.getElementById("station").textContent = "位置情報が取得できませんでした";
});