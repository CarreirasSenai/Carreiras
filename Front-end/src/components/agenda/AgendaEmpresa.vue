<template>
  <v-container fluid class="bg-deep-purple-lighten-4 fill-height" style="width: 100%;">
    <div style="border-radius: 5px; overflow: hidden; margin: 30px 30px 0px;">
      <v-btn @click="showModalEntrevista" class="v-btn--size-x-large bg-purple-darken-4 v-btn--density-comfortable me-2">Entrevista</v-btn>
      <v-btn @click="showModalVaga" class="v-btn--size-x-large v-btn--density-comfortable" variant="outlined">Vaga</v-btn>
    </div>
    <div class="calendar">
      <div class="calendar-header">
        <button @click="prevMonth">◀</button>
        <span>{{ formattedMonthYear }}</span>
        <button @click="nextMonth">▶</button>
      </div>
      <div class="calendar-body">
        <div class="calendar-weekdays">
          <div v-for="day in weekdays" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-days">
          <div v-for="(day, index) in days" :key="index" :class="{ 'out-of-month': day.isOutOfMonth }" class="day"
            style="border: solid; padding: 5px !important; border-color: #cbcbcb !important; border-width: 1px; height: 140px; position: relative;">
            {{ day.date }}
            <div v-for="(event, eventIndex) in (showMore[index] ? day.events : day.events.slice(0, 3))"
              :key="eventIndex" :style="eventStyle(event)" @click="showModal(event.title, event.description)"
              class="event">
              {{ event.title }}
            </div>
            <v-btn v-if="day.events.length > 3" @click="toggleShowMore(index)" class="more-events" style="z-index: 10;">
              {{ showMore[index] ? '-Menos' : '+Mais ' }}{{ day.events.length - 3 }}
            </v-btn>
            <div v-if="showMore[index]" class="show-more-content" style="z-index: 20; top: 76%; left: 0; width: 100%;">
              <div v-for="(event, eventIndex) in day.events.slice(3)" :key="eventIndex" :style="eventStyle(event)"
                @click="showModal(event.title, event.description)" class="event">
                {{ event.title }}
              </div>
              <v-btn v-if="day.events.length > 3" @click="toggleShowMore(index)" class="more-events"
                style="z-index: 10;">
                {{ showMore[index] ? '-Menos ' : '+Mais ' }}{{ day.events.length - 3 }}
              </v-btn>
            </div>
          </div>
        </div>
        <Modal :isVisible="isModalVisible" :title="eventTitle" :description="eventDescription"
          @update:isVisible="isModalVisible = $event" />
        <ModalEntrevista :isVisible="isModalEntrevistaVisible" @save-event="addEvent" @update:isVisible="isModalEntrevistaVisible = $event" />
        <ModalInserirVaga :isVisible="isModalVagaVisible" @update:isVisible="isModalVagaVisible = $event"/>
      </div>
    </div>
  </v-container>
</template>

<script>
import Modal from './ModalEvent.vue';
import ModalEntrevista from './ModalInserirEntrevista.vue';
import { ref, reactive, computed } from 'vue';

export default {
  components: {
    Modal,
    ModalEntrevista,
  },
  setup() {
    const isModalVisible = ref(false);
    const eventTitle = ref('');
    const eventDescription = ref('');

    const showModal = (title, description) => {
      eventTitle.value = title;
      eventDescription.value = description;
      isModalVisible.value = true;
    };

    const isModalEntrevistaVisible = ref(false);

    const showModalEntrevista = () => {
      isModalEntrevistaVisible.value = true;
    };

    const isModalVagaVisible = ref(false);

    const showModalVaga = () => {
      isModalVagaVisible.value = true;
    }

    const currentMonth = ref(new Date().getMonth());
    const currentYear = ref(new Date().getFullYear());
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const events = reactive([
      { date: '2024-08-12', title: 'Entrevista', description: 'Descrição do evento 1', type: 'event' },
      { date: '2024-08-12', title: 'Entrevista', description: 'Vacas azuis caem do céu as sabados pra falar Jesus...', type: 'event' },
      { date: '2024-08-12', title: 'Vaga', description: 'O feijão é um alimento que causa gases. Boa sorte!', type: 'job' },
      { date: '2024-08-12', title: 'Entrevista', description: 'Oi, meu nome é Paula e eu gosto de mais de laranjas e mais de sorvete.', type: 'event' },
      { date: '2024-08-12', title: 'Entrevista', description: 'Aqui é onde o inferno queima as galinhas e deixam elas bem assadas. Uma diliça com Ç. Show de bola e coisa de velho.', type: 'event' },
      { date: '2024-08-12', title: 'Vaga', description: 'Olha só que descrição grande... Olha só como eu não sei mais o que escrever aqui lalalalala. Ta bom Cludia?', type: 'job' },
      { date: '2024-08-12', title: 'Entrevista', description: 'Aqui é a ultima descrição uhullll', type: 'event' },
      { date: '2024-08-20', title: 'Vaga', description: 'Descrição do evento 2', type: 'job' },
      { date: '2024-08-22', title: 'Vaga', description: 'Descrição do evento 3', type: 'job' },
      { date: '2024-08-17', title: 'Entrevista', description: 'Descrição do evento 4', type: 'event' },
      { date: '2024-08-28', title: 'Entrevista', description: 'Descrição do evento 5', type: 'event' },
      { date: '2024-08-29', title: 'Entrevista', description: 'Descrição do evento 6', type: 'event' },
      { date: '2024-08-26', title: 'Vaga', description: 'Descrição do evento 7', type: 'job' },
      { date: '2024-08-26', title: 'Vaga', description: 'Descrição do evento 7', type: 'job' },
    ]);

    const eventStyle = (event) => {
      if (event.type === 'event') {
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
      } else {
        return {
          backgroundColor: '#3A1C76',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          padding: '2px',
          fontSize: '0.8em',
          borderRadius: '3px',
          margin: '2px',
        };
      }
    };

    const formattedMonthYear = computed(() => {
      const date = new Date(currentYear.value, currentMonth.value);
      return date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase() + ' ' + currentYear.value;
    });

    const days = computed(() => {
      const firstDay = new Date(currentYear.value, currentMonth.value, 1);
      const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
      const prevLastDay = new Date(currentYear.value, currentMonth.value, 0);

      const daysInMonth = lastDay.getDate();
      const daysInPrevMonth = prevLastDay.getDate();
      const firstDayIndex = firstDay.getDay();
      const lastDayIndex = lastDay.getDay();
      const nextDays = 7 - lastDayIndex - 1;

      const daysArray = [];
      const showMore = reactive([]);

      for (let x = firstDayIndex; x > 0; x--) {
        daysArray.push({
          date: daysInPrevMonth - x + 1,
          isOutOfMonth: true,
          events: []
        });
        showMore.push(false);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === date);
        daysArray.push({
          date: i,
          isOutOfMonth: false,
          events: dayEvents
        });
        showMore.push(false);
      }

      for (let j = 1; j <= nextDays; j++) {
        daysArray.push({
          date: j,
          isOutOfMonth: true,
          events: []
        });
        showMore.push(false);
      }

      return daysArray;
    });

    const prevMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
    };

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
      } else {
        currentMonth.value++;
      }
    };

    const showMore = reactive([]);

    const toggleShowMore = (index) => {
      showMore[index] = !showMore[index];
    };

    const addEvent = (newEvent) => {
      events.push(newEvent);
    };

    return {
      isModalVisible,
      eventTitle,
      eventDescription,
      showModal,
      isModalEntrevistaVisible,
      showModalEntrevista,
      isModalVagaVisible,
      showModalVaga,
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
      addEvent,
    };
  },
};
</script>

<style scoped>
.show-more-content {
  position: absolute;
  z-index: 20;
  background-color: white;
  padding: 6px;
}

.more-events {
  margin-top: 5px;
  color: rgb(255, 102, 67);
  box-shadow: none !important;
  font-size: 15px;
  padding: 3px !important;
  height: auto;
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


/* Media query for mobile devices */
@media (max-width: 955px) {
  .calendar-header {
    padding: 0px !important;
  }
}
</style>