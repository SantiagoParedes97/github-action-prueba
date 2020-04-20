const mailService = require('./MailService')
const core = require('@actions/core');
const github = require('@actions/github');

const username = core.getInput("username", {required: true})
const password = core.getInput("password", {required: true})
const from = core.getInput("from", {required: true})

const payload = github.context.payload;

mailService.sendMail(payload,{username,password,from})
    .catch((error) => core.setFailed(error.message))
