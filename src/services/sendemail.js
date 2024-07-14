import nodeeailer from 'nodemailer'
export async function sendEmailService ({to,subject,message,attachments=[]}={}){
const trans = nodeeailer.createTransport({

    host:'local',
    port:'587',
    secure:false,
    service:'gmail',

    auth:{
        user:'aliakramabdelmon3em@gmail.com',
        pass:'qxww rgkm dmys pcnw',
    },

    

 
})
const emialinfo =  await trans.sendMail({
    from: '"fred foo" <aliakramabdelmon3em@gmail.com>',
    to:to ? to : 'test',
    subject:subject ? subject : 'test',
    html :message ,
    attachments,

})
}