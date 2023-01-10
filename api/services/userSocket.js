const users = [];

const addUser = ({id, name, idRoom}) => {
  idUser = id;
  nameUser = name
  idRoom = idRoom;
  
  let Datauser = users.find((user) => (user.idRoom === idRoom && user.idUser === idUser));
  let user = Datauser;
  
  if(!idUser || !idRoom) return { error: 'Nama pengguna dan ruangan wajib diisi.' };
  if(!Datauser){
    
    Datauser = {idUser, nameUser, idRoom};
    user = Datauser;
    
    users.push(Datauser);
  }
  console.log(`data user join : ${user.idUser} - ${user.idRoom}`)

  return { user }
}

const removeUser = (idUser) => {
  const index = users.findIndex(user => user.idUser === idUser);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getAllUser = () => {return users}

const getUser = (idUser) =>  users.find(user => user.idUser === idUser);

const getUserInRoom = (idRoom) => users.filter(user => user.idRoom === idRoom);

const checkUserInRoom = (idUser ,idRoom) => users.filter(user => user.idRoom === idRoom && user.idUser === idUser);

module.exports = { addUser, removeUser, getUser, getUserInRoom, checkUserInRoom, getAllUser};