<template>
    <div class="calendar">
        <div class="calendar-header">
            <button id="prev">◀</button>
            <span id="monthYear"></span>
            <button id="next">▶</button>
        </div>
        <div class="calendar-body">
            <div class="calendar-weekdays">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sáb</div>
            </div>
            <div class="calendar-days" id="calendar-days"></div>
        </div>
    </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('monthYear');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const events = [
        { date: '2024-06-12', title: 'Entrevista', type: 'event' },
        { date: '2024-06-20', title: 'Entrevista', type: 'event' },
        { date: '2024-06-22', title: 'Entrevista', type: 'event' },
        { date: '2024-06-17', title: 'Entrevista', type: 'event' },
        { date: '2024-06-28', title: 'Entrevista', type: 'event' },
        { date: '2024-06-29', title: 'Entrevista', type: 'event' },
        { date: '2024-06-26', title: 'Entrevista', type: 'event' },
    ];

    const renderCalendar = () => {
        calendarDays.innerHTML = '';
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const prevLastDay = new Date(currentYear, currentMonth, 0);

        const daysInMonth = lastDay.getDate();
        const daysInPrevMonth = prevLastDay.getDate();
        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();

        const nextDays = 7 - lastDayIndex - 1;

        monthYear.innerText = `${firstDay.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()} ${currentYear}`;

        for (let x = firstDayIndex; x > 0; x--) {
            calendarDays.innerHTML += `<div style="border: solid;padding: 5px !important;border-color: #cbcbcb!important;border-width: 1px; background-color:#ededed !important">${daysInPrevMonth - x + 1}</div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayEvents = events.filter(event => event.date === date);
            let eventHTML = '';
            dayEvents.forEach(event => {
                if (event.type == "event") {
                    eventHTML += `<div style="background-color:rgba(104, 50, 210, 1); color:white;     font-weight: 500; display:flex;justify-content:center; padding:2px; font-size:0.8em; border-radius:3px; margin:10px;">${event.title}</div>`;
                } else {
                    eventHTML += `<div style="background-color: #ff7a4e;display: flex;justify-content: center;padding: 2px;font-size: 0.8em;border-radius: 3px; margin: 10px;">${event.title}</div>`;
                }

            });
            const today = new Date();
            const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isPastDay = !isCurrentMonth && new Date(currentYear, currentMonth, i) < today;
            calendarDays.innerHTML += `<div style="border: solid;padding: 5px !important;border-color: #cbcbcb!important;border-width: 1px;" class="day${isPastDay ? ' out-of-month' : ''}">${i}${eventHTML}</div>`;
        }

        for (let j = 1; j <= nextDays; j++) {
            calendarDays.innerHTML += `<div style="border: solid;padding: 5px !important;border-color: #cbcbcb!important;border-width: 1px; background-color:#ededed !important">${j}</div>`;
        }
    };

    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
});
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.calendar {
    border-radius: 5px;
    overflow: hidden;
    margin: 30px;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    padding-right: 40px;
    padding-left: 40px;
}

.calendar-header span {
    font-size: 1.6em;
    font-weight: bold;
}

.calendar-body {
    padding: 10px;
    background-color: white;
    border-radius: 5px;
}

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.calendar-weekdays div {
    text-align: center;
    margin: 20px;
    font-weight: 500;
    font-size: 18px;
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 100px;
}

.calendar-days .day,
.calendar-days .prev-date,
.calendar-days .next-date {
    text-align: center;
    padding: 10px;
    border: 1px solid #000;
    box-sizing: border-box;
}

#next {
    color: none;
    border: black;
    padding: 5px 5px;
    cursor: pointer;
    border-radius: 1px;
}

#prev {
    color: black;
    border: none;
    padding: 5px 5px;
    cursor: pointer;
    border-radius: 5px;
}
</style>