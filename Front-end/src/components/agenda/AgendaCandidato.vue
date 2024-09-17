<template>
  <v-container fluid class="bg-deep-purple-lighten-4 fill-height estilo" style="width: 100%;">
    <div class="calendar">
      <div class="calendar-header">
        <button @click="prevMonth">◀</button>
        <span>{{ formattedMonthYear }}</span>
        <button @click="nextMonth">▶</button>
      </div>
      <div class="calendar-body">
        <div class="calendar-weekdays">
          <div v-for="(day, index) in weekdaysToShow" :key="index">
            {{ day }}
          </div>
        </div>
        <component :is="currentCalendarDaysComponent" :days="days" :dayStyle="dayStyle" :eventStyle="eventStyle"
          :showMore="showMore" :showModal="showModal" :toggleShowMore="toggleShowMore"
          class="calendar-days-component" />
        <Modal :isVisible="isModalVisible" :title="eventTitle" :description="eventDescription"
          @update:isVisible="isModalVisible = $event" />
        <ModalEntrevista :isVisible="isModalEntrevistaVisible" @save-event="addEvent"
          @update:isVisible="isModalEntrevistaVisible = $event" />
      </div>
    </div>
  </v-container>
</template>

<script>
import Modal from './ModalEvent.vue';
import ModalEntrevista from './ModalInserirEntrevista.vue';
import CalendarDays from './CalendarDays.vue';
import CalendarDaysMedia from './CalendarDaysMedia.vue';
import { ref, reactive, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';
import axios from 'axios';

export default {
  components: {
    Modal,
    ModalEntrevista,
    CalendarDaysMedia,
    CalendarDays
  },
  props: {
    dayStyle: {
      type: Function,
      required: true
    }
  },
  setup() {
    const display = useDisplay();
    const isModalVisible = ref(false);
    const isModalEntrevistaVisible = ref(false);
    const eventTitle = ref('');
    const eventDescription = ref('');

    const showModal = (title, description) => {
      eventTitle.value = title;
      eventDescription.value = description;
      isModalVisible.value = true;
    };

    const showModalEntrevista = () => {
      isModalEntrevistaVisible.value = true;
    };

    const currentCalendarDaysComponent = computed(() => {
      return display.width.value <= 700 ? CalendarDaysMedia : CalendarDays;
    });

    const currentMonth = ref(new Date().getMonth());
    const currentYear = ref(new Date().getFullYear());
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const events = reactive([]);

    const fetchEvents = async () => {
      try {
        const month = String(currentMonth.value + 1).padStart(2, '0');
        const year = currentYear.value;
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/entrevista/list_vagas`, {
          params: { month, year }
        });
        events.splice(0, events.length, ...response.data);
        calculateDays();
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    const eventStyle = () => {
      return {
        backgroundColor: 'rgba(104, 50, 210, 1)',
        color: 'white',
        fontWeight: '500',
        display: 'flex',
        justifyContent: 'center',
        padding: '2px',
        margin: '2px',
        fontSize: '0.8em',
        borderRadius: '3px'
      };
    };

    const formattedMonthYear = computed(() => {
      const date = new Date(currentYear.value, currentMonth.value);
      return date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase() + ' ' + currentYear.value;
    });

    const days = ref([]);
    const showMore = ref([]);

    const calculateDays = () => {
      const firstDay = new Date(currentYear.value, currentMonth.value, 1);
      const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
      const prevLastDay = new Date(currentYear.value, currentMonth.value, 0);

      const daysInMonth = lastDay.getDate();
      const daysInPrevMonth = prevLastDay.getDate();
      const firstDayIndex = firstDay.getDay();
      const lastDayIndex = lastDay.getDay();
      const nextDays = 7 - lastDayIndex - 1;

      const daysArray = [];
      const showMoreArray = [];

      for (let x = firstDayIndex; x > 0; x--) {
        daysArray.push({
          date: daysInPrevMonth - x + 1,
          isOutOfMonth: true,
          events: []
        });
        showMoreArray.push(false);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === date);
        daysArray.push({
          date: i,
          isOutOfMonth: false,
          events: dayEvents
        });
        showMoreArray.push(false);
      }

      for (let j = 1; j <= nextDays; j++) {
        daysArray.push({
          date: j,
          isOutOfMonth: true,
          events: []
        });
        showMoreArray.push(false);
      }

      days.value = daysArray;
      showMore.value = showMoreArray;
    };

    watch([currentMonth, currentYear], () => {
      fetchEvents();
      calculateDays();
    }, { immediate: true });

    const prevMonth = () => {
      currentMonth.value--;
      if (currentMonth.value < 0) {
        currentMonth.value = 11;
        currentYear.value--;
      }
    };

    const nextMonth = () => {
      currentMonth.value++;
      if (currentMonth.value > 11) {
        currentMonth.value = 0;
        currentYear.value++;
      }
    };

    const toggleShowMore = (index) => {
      showMore.value[index] = !showMore.value[index];
    };

    return {
      display,
      isModalVisible,
      isModalEntrevistaVisible,
      eventTitle,
      eventDescription,
      showModal,
      showModalEntrevista,
      currentMonth,
      currentYear,
      weekdays,
      formattedMonthYear,
      days,
      prevMonth,
      nextMonth,
      eventStyle,
      showMore,
      toggleShowMore,
      currentCalendarDaysComponent
    };
  }
};
</script>


<style scoped>
.day {
  border: solid;
  padding: 5px !important;
  border-color: #cbcbcb !important;
  border-width: 1px;
  height: 150px;
  position: relative;
}

.botoes-estilo {
  border-radius: 5px;
  overflow: hidden;
  margin: 30px 30px 0px;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: aquamarine;
}

.calendar {
  border-radius: 5px;
  overflow: hidden;
  margin: 30px;
  width: 100%;
  position: relative;
}

.calendar-days-component {
  position: absorelativelute;
  z-index: 10;
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
  font-size: 20px;
  font-weight: bold;
}

.calendar-body {
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  z-index: 1;
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
  grid-template-columns: repeat(7, minmax(0, 1fr));
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

.out-of-month {
  background-color: rgb(217, 217, 217);
}

@media (max-width: 700px) {

  .calendar-days .event,
  .calendar-days .more-events,
  .calendar-days .show-more-content {
    display: none;
  }

  .day.has-events {
    background-color: rgb(141, 50, 210);
    color: white;
    font-weight: bold;
    font-size: 18px;
  }

  .botoes-estilo {
    margin: 30px 30px 30px;
  }

  .v-container.fill-height {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }

  .calendar-header {
    padding: 0px !important;
    margin-bottom: 35px;
  }

  .estilo {
    justify-content: center;
  }

  .calendar {
    margin: 0px 10px 20px;
  }

  .calendar-weekdays div {
    margin: 20px 0px;
  }

  .calendar-body {
    padding: 10px 10px;
  }

  .more-events {
    display: none !important;
  }

  .show-more-content {
    display: block !important;
  }

  .calendar-days .day .event {
    display: block !important;
  }
}
</style>