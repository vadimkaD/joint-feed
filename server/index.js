import io from 'socket.io';

const server = io();

const players = {};
const actions = {};

server.on('connection', client => {
  console.log('connected', client.id);
  client.on('register', data => {
    console.log('register', data);
    players[data.owner] = client.id;
    console.log('players', players);

  });

  client.on('actions', (data) => {
    console.log('actions length', JSON.parse(data).length);
    actions[client.id] = JSON.parse(data);

    if (Object.keys(actions).length === Object.keys(players).length) {
      console.log('all actions are sent');
      const allActions = Object.values(actions).flat();
      console.log('allActions', allActions.length);
      for (let key in actions) {
        delete actions[key];
      }
      server.emit('step', JSON.stringify(allActions));
    }
  });

  client.on('disconnect', function () {
    const owner = Object.keys(players).find(key => players[key] === client.id);
    delete players[owner];
    console.log('disconnect. players', players);
  });
});
server.listen(3000);