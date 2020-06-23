// import React from 'react';
// import Response from '../App'


// class Chat extends React.Component {
 
//   state = {
//     currentStep : 0,
//     currentQuestion : '',
//     messages : [],
//     answer : undefined,
//     fullAnswers : {}
//   }
 
//   constructor(props){
//       super(props);
       
//       this.changeAnswer = this.changeAnswer.bind(this);
//       this.sendAnswer = this.sendAnswer.bind(this);
//   }
   
//     componentDidMount(){
//       this.getStep(0);
//     }
   
//     render(){
 
//         return(
//                 <div>
//                     {
//                         this.state.messages.map((item, i) => (
//                             <Response key={i} type={item.type} msg={item.data}/>
//                         ))
//                     }
//                     { this.state.currentQuestion.type === 'multiple' &&
//                         this.state.currentQuestion.possibility.map((choix, i) => (
//                             <button key={i} onClick={() => {this.getStep(choix)}}>  
//                                 {choix}
//                             </button>                      
//                         ))                 
                       
//                     }
//                     { this.state.currentQuestion.type === 'libre' &&
//                       <form onSubmit={this.sendAnswer}>
//                         <label>
//                           Réponse :
//                           <input type="text" value={this.state.answer} onChange={this.changeAnswer} />        
//                         </label>
//                         <input type="submit" value="Envoyer" />
//                       </form>                  
//                     }                  
//                 </div>
//         )
//     }
   
 
//     changeAnswer(event) {
//         this.setState({'answer': event.target.value});  
//     }
   
//     sendAnswer(event) {
//         this.setState({'messages' : this.state.messages.concat([{ 'data' : this.state.answer, 'type':'user'}])});
//         this.setState({'answer': null});
//         this.getStep(this.state.answer);
//         event.preventDefault();
//     }
 
//      getStep = (answer) => {
//           let fullAnswersb64 = Buffer.from(JSON.stringify(this.state.fullAnswers), 'ascii').toString('base64');
         
//           axios.get('http://127.0.0.1:5000/?step='+this.state.currentStep+'&answer='+answer+'&fullAnswers='+fullAnswersb64, {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//           }})
//           .then(res => {
           
//             this.setState({ 'currentStep' : res.data.step,'currentQuestion' : res.data.msg , 'messages' : this.state.messages.concat([{ 'data' : res.data.msg.question, 'type':'bot'}])});
           
//             let an = {};
//             an[res.data.msg.an] = answer;
//             let FA = this.state.fullAnswers;
//             this.setState({'fullAnswers' : Object.assign(FA,an)});
   
//           })
//           .catch(error => {
//                 console.log(error)
//             });
//     }
   
// }
   
// export default Chat;