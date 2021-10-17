let users = []

const addUser = (user) => {
	users.push(user)
}

const removeUser = (name) => {
	users = users.filter(user => user.name !== name)
}

const getChannelUsers = (channel) => users.filter(user => user.channel === channel)

module.exports = {users, addUser, getChannelUsers, removeUser}