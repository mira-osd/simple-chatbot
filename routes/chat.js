const express = require('express');
const router = express.Router();
const moment = require('moment');

router.get('/', function(req, res) {
    step = Number(req.query.step);
    answer = req.query.answer;
    fullAnswers = req.query.fullAnswers;
   
    if (!step) {
        step = 0;
    }
   
    if (checkStep(step,answer)) {
        step = step + 1;
    }
   
    res.json(
        {
            'msg' : getStep(step, fullAnswers),
            'step' : step
        }
    );
})

function checkStep(step, answer) {
    switch(step) {
        case 1 :
            if (answer !== 'Homme' && answer !== 'Femme') {
                console.log('wrong answer');
                return false;
            }
        break;
        case 2 :
            if (!answer) {
                return false;
            }
        break;
        case 3 :
            if (!moment(answer, 'DD/MM/YYYY', true).isValid()) {
                console.log('wrong format date');
                return false;
            }
        break;
        default :
            return true;
    }
    return true;
}

 
function getStep(step, fullAnswers = null) {
    switch(step) {
        case 0 :
        case 1 :
            return {
                question : "Bonjour, êtes-vous un homme ou une femme ?",
                type : "multiple",
                possibility : ['Homme','Femme']
            }
            
        break;
        case 2 :
            return {
                question : "Merci, quel est votre prénom ?",
                type: "libre"
            }
        break;
        case 3 :
            return {
                question : "Joli prénom, 😃 ! Quelle est votre date de naissance ?",
                type: "libre"
            }
        break;
        case 4 :
            // création d'un objet encodé en base64 qui contient toutes les réponses précédentes 
            fullAnswers = JSON.parse(Buffer.from(fullAnswers, 'base64').toString('ascii'));
            console.log(fullAnswers)
            return {
                question : "Merci " + getTitre(fullAnswers[1]) + " " + fullAnswers[2] + " vous êtes " + getMajority(fullAnswers[3]) + " !",
                type: "libre"
            }
        break;     
        default :
            return {
                question : "Fini",
                type: "libre"
            }  
    }  
}
 
function getTitre(gender) {
    console.log(gender);
    if (gender === "Homme") {
        return "Monsieur";
    }
    if (gender === "Femme") {
        return "Madame";
    }  
}
 
function getMajority(dateFR) {
    momentDate = moment(dateFR, 'DD/MM/YYYY').format('YYYY-MM-DD')
   
    if (moment().diff(momentDate, 'years',false) >= 18) {
        return "majeur";
    }
    return "mineur";
}

module.exports = router;