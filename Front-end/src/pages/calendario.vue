<template>
    <div class="calendar">
        <div class="calendar-header">
            <button @click="prevMonth">Anterior</button>
            <span>{{ monthName }} {{ currentYear }}</span>
            <button @click="nextMonth">Próximo</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="day in weekDays" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, index) in calendarDays" :key="index">
                    <td v-for="day in week" :key="day" :class="{ active: isActive(day) }" @click="selectDay(day)">
                        <span v-if="day">{{ day }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDay: null,
            weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        };
    },
    computed: {
        monthName() {
            return new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
                new Date(this.currentYear, this.currentMonth)
            );
        },
        calendarDays() {
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            let days = [];
            let week = [];

            // Preencher dias em branco para a primeira semana
            for (let i = 0; i < firstDayOfMonth; i++) {
                week.push(null);
            }

            // Preencher dias do mês
            for (let date = 1; date <= daysInMonth; date++) {
                week.push(date);
                if (week.length === 7 || date === daysInMonth) {
                    days.push(week);
                    week = [];
                }
            }

            // Preencher dias em branco para a última semana
            while (week.length > 0 && week.length < 7) {
                week.push(null);
            }

            return days;
        },
    },
    methods: {
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
        },
        selectDay(day) {
            this.selectedDay = day;
        },
        isActive(day) {
            return this.selectedDay === day;
        },
    },
};
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
}

.calendar-header button {
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.calendar-header span {
  font-size: 1.5em;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

thead th {
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

tbody td {
  padding: 15px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
}

tbody td:hover {
  background-color: #f0f0f0;
}

.active {
  background-color: #d0e9ff;
}
</style>
