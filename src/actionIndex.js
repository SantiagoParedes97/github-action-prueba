const mailService = require('./MailService')
const core = require('@actions/core');
const github = require('@actions/github');

const username = core.getInput("username", {required: true})
const password = core.getInput("password", {required: true})
const from = core.getInput("from", {required: true})
const client_email = core.getInput("google_api_client_email", {required: true})
const private_key = core.getInput("private_key", {required: true})
const config = {username,password,from,client_email,private_key}

const payload = github.context.payload;

mailService.sendMail(payload,config)
    .catch((error) => core.setFailed(error.message))
