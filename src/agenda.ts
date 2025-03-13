import Agenda from 'agenda';

export const agenda = new Agenda({
  db: { address: 'mongodb://localhost:27017/nestjs-tasks', collection: 'agendaJobs' },
});

agenda.on('ready', () => console.log('Agenda for tasks ready'));

export const startAgenda = async () => {
  await agenda.start();
};
