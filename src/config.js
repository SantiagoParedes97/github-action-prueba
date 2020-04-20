const username = process.env.username
const password = process.env.password
const from = process.env.from
const client_email = process.env.client_email
const private_key = process.env.private_key
const config = {username,password,from,client_email,private_key}

module.exports = config;
