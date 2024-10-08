
<template>
    <v-container fluid>
        <v-card border>
            <v-card-title class="text-capitalize d-flex justify-space-between align-center">
                <div>
                    <v-btn variant="text" icon="mdi-chevron-left" @click="prevMonth"></v-btn>
                    {{ monthName }} {{ currentYear }}
                    <v-btn variant="text" icon="mdi-chevron-right" @click="nextMonth"></v-btn>
                </div>
                <CriarEvento showModal="showModal" @FecharTabela="fecharTabela"/>
            </v-card-title>
            <v-card-text>
                <table>
                    <thead>
                        <tr>
                            <th v-for="(day, index) in weekDays" :key="index" v-if="resolucao.resolucaoDesktop">{{ day
                                }}</th>
                            <th v-for="(day, index) in weekDays" :key="index" v-if="!resolucao.resolucaoDesktop">{{
                                day.charAt(0) }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(week, weekIndex) in calendarDays" :key="weekIndex">
                            <td v-for="(day, dayIndex) in week" :key="dayIndex"
                                :class="{ active: isActive(day), hasEvents: hasEvents(day) }" @click="selectDay(day)">
                                <span v-if="day" class="position-absolute left-0 top-0 ma-1">{{ day }}</span>
                                <div v-if="day" class="events-list">
                                    <div v-for="(event, eventIndex) in getLimitedEvents(day)" :key="eventIndex"
                                        class="event">
                                        <div>
                                            {{ event.title }}
                                        </div>
                                    </div>
                                    <div v-if="hasMoreEvents(day)" class="more-events">
                                        +{{ getMoreEventsCount(day) }} mais
                                    </div>
                                    <div v-if="getEvents(day).length != 0 && !resolucao.resolucaoDesktop"
                                        class="more-events">
                                        +{{ getEvents(day).length }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </v-card-text>
        </v-card>

        <div v-if="dadosCarregados">
            <ModalEvento :showModal="showModal" :eventos="getEvents(selectedDay)"
            :title="selectedDay" @FecharTabela="fecharTabela" />
        </div>
    </v-container>
</template>

<script>
import { useResolucaoDesktop } from '@/stores/resolucao';
import ModalEvento from './ModalEvento.vue';
import CriarEvento from './CriarEvento.vue';
import axios from 'axios';

export default {
    data() {
        return {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDay: null,
            showModal: false,
            weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            eventos: [],
            maxVisibleEvents: 2,
            dadosCarregados: false,
        };
    },
    async created() {
        this.resolucao.verificaResolucao();
        await this.fetchEvents();
    },

    computed: {
        monthName() {
            return new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(this.currentYear, this.currentMonth));
        },

        calendarDays() {
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

            let days = [];
            let week = [];

            for (let i = 0; i < firstDayOfMonth; i++) {
                week.push(null);
            }

            for (let date = 1; date <= daysInMonth; date++) {
                week.push(date);
                if (week.length === 7) {
                    days.push(week);
                    week = [];
                }
            }

            while (week.length < 7 && week.length > 0) {
                week.push(null);
            }

            if (week.length > 0) {
                days.push(week);
            }

            return days;
        },

        resolucao() {
            return useResolucaoDesktop();
        }
    },

    watch: {
        currentMonth() {
            this.fetchEvents();
        },
        currentYear() {
            this.fetchEvents();
        }
    },

    methods: {
        async fetchEvents() {
            const month = String(this.currentMonth + 1).padStart(2, '0');
            const year = String(this.currentYear);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/agendamento/read`, {
                    params: {
                        month: month,
                        year: year
                    }
                });
                setTimeout(() => {
                    this.eventos = response.data;
                    this.dadosCarregados = true;
                }, 500);
            } catch (error) {
                console.error('Erro ao buscar eventos na agenda:', error);
                this.$notify({
                    title: 'Erro',
                    message: 'Não foi possível carregar os eventos. Tente novamente mais tarde.',
                    type: 'error'
                });
            }
        },

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
            if (day) {
                this.showModal = true;
            }
        },

        isActive(day) {
            return this.selectedDay === day;
        },

        hasEvents(day) {
            if (!day) return false;

            const selectedDate = new Date(this.currentYear, this.currentMonth, day).toLocaleDateString('pt-BR');

            return this.eventos.some(evento => {
                const eventDate = new Date(evento.data).toLocaleDateString('pt-BR');
                return eventDate === selectedDate;
            });
        },

        getEvents(day) {
            if (!day) return [];
            const selectedDate = new Date(this.currentYear, this.currentMonth, day).toLocaleDateString('pt-BR');

            return this.eventos.filter(evento => {
                const eventDate = new Date(evento.data).toLocaleDateString('pt-BR');
                return eventDate === selectedDate;
            });
        },

        getLimitedEvents(day) {
            const events = this.getEvents(day);
            return events.slice(0, this.maxVisibleEvents);
        },

        hasMoreEvents(day) {
            return this.getEvents(day).length > this.maxVisibleEvents;
        },

        getMoreEventsCount(day) {
            return this.getEvents(day).length - this.maxVisibleEvents;
        },

        fecharTabela() {
            this.showModal = false;
        }
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

thead th {
    padding: 10px;
    background-color: rgb(83, 14, 220);
    color: #fff;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}

tbody td {
    padding: 10px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
    vertical-align: top;
    width: 14.28%;
    max-height: 140px;
    overflow: hidden;
    height: 140px;
}

tbody td:hover {
    background-color: #f0f0f0;
}

.day-number {
    position: absolute;
    top: 5px;
    left: 5px;
    font-weight: bold;
}

.events-list {
    margin-top: 20px;
    overflow-y: hidden;
    max-height: 100px;
}

.event {
    background-color: rgba(58, 28, 118, 1);
    color: white;
    margin: 5px 0;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
}

.more-events {
    margin-top: 5px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(58, 28, 118, 1);
}

@media (max-width: 700px) {
    tbody td {
        padding: 10px;
        border: 1px solid #e0e0e0;
        cursor: pointer;
        position: relative;
        vertical-align: top;
        width: 14.28%;
        max-height: 65px;
        overflow: hidden;
        height: 65px;
    }

    .more-events {
        font-size: 12px;
        font-weight: 500;
        background-color: #e1cbff;
        border-radius: 9px;
        color: rgba(58, 28, 118, 1);
    }
}
</style>
