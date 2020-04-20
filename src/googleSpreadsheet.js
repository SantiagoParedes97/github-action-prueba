const {GoogleSpreadsheet} = require('google-spreadsheet')
const core = require('@actions/core');

//sacar esta villereada
const tutors = [
    {
        coupleName: 'Rasta & Anto',
    },
    {
        coupleName: 'Guille & Maru'
    },
    {
        coupleName: 'Gise & Mariano'
    },
    {
        coupleName:'Santi & DaniM',
        mails: ["santiagoparedes97@gmail.com"]

    },
    {
        coupleName:
            'Gaby & Tom'
    },
    {
        coupleName:
            'Eze & NahueV'
    },
    {
        coupleName:
            'Ivo & Ale'
    },
    {
        coupleName:
            'Deby & Diana'
    },
    {
        coupleName:
            'NicoR & MatiE'
    },
    {
        coupleName:
            'Alf & Facu'
    }
]

async function getTutorsMailFor(githubUser,config) {
    const doc = new GoogleSpreadsheet('1kavXnCLLdoKoXMVlw6_wFolzBvIuuNG9oqxNbc4Dwu8')
    const clientEmail = config.client_email
    const privateKey = config.private_key

    await doc.useServiceAccountAuth({
        client_email: clientEmail,
        private_key: privateKey,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    const rows = await sheet.getRows({limit: 150, offset: 2}); // or use doc.sheetsById[id]
    const getGithubUser = (student) => student._rawData[5];
    const committerStudent = rows.find(student => getGithubUser(student) === githubUser)
    const getTutors = (student) => student._rawData[7]

    const getTutorsMail = (student) => tutors.find(tutorsCouple => tutorsCouple.coupleName === getTutors(student)).mails

    return getTutorsMail(committerStudent);
}

module.exports = getTutorsMailFor