document.addEventListener("DOMContentLoaded", function() {
    // Odliczanie do Walentynek
    function updateCountdown() {
        const targetDate = new Date("February 14, 2025 00:00:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = 
            `${days} dni, ${hours} godz., ${minutes} min., ${seconds} sek.`;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Obsługa ukrytej wiadomości
    document.getElementById("reveal").addEventListener("click", function() {
        document.getElementById("hiddenMessage1").classList.remove("hidden");
        document.getElementById("hiddenMessage2").classList.remove("hidden");
    });
    //osczasu
    async function loadTimeline() {
        const response = await fetch('get_timeline.php');
        const events = await response.json();
        const timeline = document.getElementById('timeline');

        events.forEach((event, index) => {
            const eventContainer = document.createElement('div');
            eventContainer.classList.add('event-container');
            eventContainer.style.left = `${(index / (events.length - 1)) * 100}%`;

            const eventElement = document.createElement('div');
            eventElement.classList.add('event');

            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = `<strong>${event.title}</strong><br>${event.description}`;

            const dateElement = document.createElement('div');
            dateElement.classList.add('event-date');
            dateElement.textContent = event.date;

            eventElement.appendChild(tooltip);
            eventContainer.appendChild(eventElement);
            eventContainer.appendChild(dateElement);
            timeline.appendChild(eventContainer);
        });
    }

    loadTimeline();
});
