<script>
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
        if (!station.lat || !station.lon || !station.name) continue;

        const dx = (lat - station.lat) * 111000;
        const dy = (lon - station.lon) * 91000;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          minDistance = distance;
          nearest = station;
        }
      }

      if (nearest) {
        const rounded = Math.round(minDistance);
        const latFixed = lat.toFixed(5);
        const lonFixed = lon.toFixed(5);
        document.getElementById("station").textContent =
          `最寄り駅：${nearest.name}（約${rounded}m）\n現在地：緯度 ${latFixed}, 経度 ${lonFixed}`;
      } else {
        document.getElementById("station").textContent = "最寄り駅が見つかりません。";
      }
    }, () => {
      document.getElementById("station").textContent = "位置情報の取得に失敗しました。";
    });
  }

  getNearestStation();
</script>
