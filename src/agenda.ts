import { Agenda } from 'agenda';

export const agenda = new Agenda({
  db: { address: 'mongodb://localhost:27017/reservation-tasks-module', collection: 'agendaJobs' },
});

agenda.on('ready', () => console.log('Agenda is ready'));

export const startAgenda = async () => {
  await agenda.start();
};