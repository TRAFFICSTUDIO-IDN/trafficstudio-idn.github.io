    // Fungsi untuk memuat data dari JSON
    function loadEventData() {
        // Dalam implementasi nyata, ini akan mengambil data dari file JSON
        // fetch('data.json')
        //   .then(response => response.json())
        //   .then(data => {
        //       updateEventInfo(data);
        //       initMap(data.coordinates);
        //       startCountdown(data.endDateTime);
        //   });
        
        // Untuk demo, kita gunakan data statis
        const eventData = {
            eventName: "ALPHANTARA FEST 2025",
            location: "Gedung PKM Politeknik Negeri Padang",
            date: "15 Juni 2025",
            time: "18.00 WIB",
            endDateTime: "2025-06-15T18:00:00", // Format ISO 8601
            coordinates: {
                lat: -0.913094, 
                lng: 100.466320
            }
        };
        
        updateEventInfo(eventData);
        initMap(eventData.coordinates);
        startCountdown(eventData.endDateTime);
    }
    
    // Fungsi untuk memperbarui informasi acara
    function updateEventInfo(data) {
        document.getElementById('event-name').textContent = data.eventName;
        document.getElementById('event-location').textContent = data.location;
        document.getElementById('event-date').textContent = data.date;
        document.getElementById('event-time').textContent = data.time;
    }
    
    // Fungsi untuk menginisialisasi peta
    function initMap(coords) {
        const map = L.map('map').setView([coords.lat, coords.lng], 16);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([coords.lat, coords.lng]).addTo(map)
            .bindPopup('Traffic Studio Booth')
            .openPopup();
    }
    
    // Fungsi untuk countdown
    function startCountdown(endDateTime) {
        const countdownDate = new Date(endDateTime).getTime();
        
        const countdownFunction = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            if (distance < 0) {
                clearInterval(countdownFunction);
                document.getElementById('countdown').innerHTML = "<p>Acara telah berakhir. Nantikan kami di event berikutnya yaa :)</p>";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        }, 1000);
    }
    
    // Panggil fungsi saat halaman dimuat
    document.addEventListener('DOMContentLoaded', loadEventData);