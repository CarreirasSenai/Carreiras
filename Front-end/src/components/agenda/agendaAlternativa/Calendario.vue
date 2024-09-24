<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <v-container fluid>
        <v-card border>
            <v-card-title class="text-capitalize d-flex justify-space-between align-center">
                <div>
                    <v-btn variant="text" icon="mdi-chevron-left" @click="prevMonth"></v-btn>
                    {{ monthName }} {{ currentYear }}
                    <v-btn variant="text" icon="mdi-chevron-right" @click="nextMonth"></v-btn>
                </div>
                <CriarEvento />
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
                                        class="event" v-if="resolucao.resolucaoDesktop">
                                        {{ event.cliente.split(' ')[0] }} às {{ event.horario }}
                                    </div>
                                    <div v-if="hasMoreEvents(day) && resolucao.resolucaoDesktop" class="more-events">
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

        <ModalEvento :showModal="showModal" :eventos="getEvents(selectedDay)" :title="selectedDay"
            @FecharTabela="fecharTabela" />
    </v-container>
</template>

<script>
import { useResolucaoDesktop } from '@/stores/resolucao';
import ModalEvento from './ModalEvento.vue';

export default {
    data() {
        return {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedDay: null,
            showModal: false,
            weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            eventos: [
                {
                    cliente: 'Thiago Lima',
                    servico: ['Corte', 'Barba', 'Sobrancelha'],
                    data: '2024-09-01',
                    horario: '13:20'
                },
                {
                    cliente: 'José',
                    servico: ['Corte', 'Barba', 'Sobrancelha'],
                    data: '2024-09-01',
                    horario: '13:20'
                },
                {
                    cliente: 'José',
                    servico: ['Corte', 'Barba', 'Sobrancelha'],
                    data: '2024-09-08',
                    horario: '13:20'
                },
                {
                    cliente: 'Marcel',
                    servico: ['Corte', 'Barba'],
                    data: '2024-09-08',
                    horario: '13:20'
                },
                {
                    cliente: 'Marcel',
                    servico: ['Corte', 'Barba'],
                    data: '2024-09-08',
                    horario: '13:20'
                },
                {
                    cliente: 'Marcel',
                    servico: ['Corte', 'Barba'],
                    data: '2024-09-08',
                    horario: '13:20'
                },
                {
                    cliente: 'Marcel',
                    servico: ['Corte', 'Barba'],
                    data: '2025-01-01',
                    horario: '13:20'
                }
            ],
            maxVisibleEvents: 2, // Número máximo de eventos visíveis
        };
    },

    created() {
        this.resolucao.verificaResolucao();
    },

    computed: {
        monthName() {
            return new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
                new Date(this.currentYear, this.currentMonth)
            );
        },

        calendarDays() {
            const firstDayOfMonth = new Date(
                this.currentYear,
                this.currentMonth,
                1
            ).getDay();

            const daysInMonth = new Date(
                this.currentYear,
                this.currentMonth + 1,
                0
            ).getDate();

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
            if (day) {
                this.showModal = true;
            }
        },
        isActive(day) {
            return this.selectedDay === day;
        },
        hasEvents(day) {
            if (!day) return false;
            const date = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return this.eventos.some(evento => evento.data === date);
        },
        getEvents(day) {
            if (!day) return [];
            const date = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return this.eventos.filter(evento => evento.data === date);
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
    background-color: #303030;
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
    max-height: 100px;
    overflow: hidden;
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
    /* Definir a altura máxima para a lista de eventos */
}

.event {
    background-color: #567494;
    color: white;
    margin: 5px 0;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.8em;
    text-align: left;
}

.more-events {
    margin-top: 5px;
    font-size: 0.75em;
    color: #666;
}
</style>
