const {GoogleSpreadsheet} = require('google-spreadsheet')
const core = require('@actions/core');

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
        mails: ["santiagoparedes97@gmail.com,mdmereles30@gmail.com"]
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

 const getSheetBy= async(config,index) => {
    const doc = new GoogleSpreadsheet('1kavXnCLLdoKoXMVlw6_wFolzBvIuuNG9oqxNbc4Dwu8')
    const clientEmail = config.client_email
    const privateKey = config.private_key

    await doc.useServiceAccountAuth({
        client_email: clientEmail,
        private_key: privateKey,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    return doc.sheetsByIndex[index];
}
const getStudentBy = async (githubUser,config,index) => {
    const sheet = await getSheetBy(config,index);
    const rows = await sheet.getRows({limit: 150, offset: 2}); // or use doc.sheetsById[id]
    const getGithubUser = (student) => student._rawData[5];
    return rows.find(student => getGithubUser(student) === githubUser)
}

async function getTutorsMailFor(githubUser,config) {
    const committerStudent = await getStudentBy(githubUser,config,0)
    const getTutors = (student) => student._rawData[7]
    const getTutorsMail = (student) => tutors.find(tutorsCouple => tutorsCouple.coupleName === getTutors(student)).mails
    return getTutorsMail(committerStudent);
}


async function updateTp(githubUser,repository,config){
    const committerStudent = await getStudentBy(githubUser,config,0)
    index = committerStudent._rawData.findIndex(data => data === repository);
    if(index >=0 ){
        committerStudent._rawData[index-1] = 'E';
        committerStudent.save();
    }
}

module.exports = {getTutorsMailFor,updateTp}