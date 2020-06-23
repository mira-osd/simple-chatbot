import React from 'react';
import './App.css';
import axios from 'axios';
import Response from './components/Response'
 
class App extends React.Component {
  constructor(props){
    super(props);
      this.changeAnswer = this.changeAnswer.bind(this);
      this.sendAnswer = this.sendAnswer.bind(this);

      this.state = {
        currentStep : 0,
        currentQuestion : '',
        messages : [],
        answer : undefined,
        fullAnswers : []
      }
  }
   
  componentDidMount() {
    this.getStep(0);
  }

  getStep = (answer) => {
    const FA = [...this.state.fullAnswers,answer];
    this.setState({fullAnswers :  FA});
    let fullAnswersb64 = Buffer.from(JSON.stringify(FA), 'ascii').toString('base64');
     
    axios.get(`http://localhost:5000/?step=`+this.state.currentStep+'&answer='+answer+'&fullAnswers='+fullAnswersb64, {
      headers: {
        'Access-Control-Allow-Origin': '*',
    }})
    .then(res => {
      this.setState({ 
        'currentStep' : res.data.step, 
        'currentQuestion' : res.data.msg , 
        'messages' : this.state.messages.concat([{ 'data' : res.data.msg.question, 'type':'bot'}])});
    })
    .catch(error => {
      console.log(error)
    });
  }
 
  changeAnswer(event) {
    this.setState({'answer': event.target.value});  
  }

  sendAnswer(event) {
    this.setState({'messages' : this.state.messages.concat([{ 'data' : this.state.answer, 'type':'user'}])});
    this.setState({'answer': ''});
    this.getStep(this.state.answer);
    event.preventDefault();
  }
  

   
  render() {
    return (
      <div className="chat">
        {this.state.messages.map((item, i) => (
          // à modifier
          <Response key={i} type={item.type} msg={item.data} className={`${item.type === 'bot' ? "red" : "black"}`}/>
        ))}
        {this.state.currentQuestion.type === 'multiple' &&
          this.state.currentQuestion.possibility.map((choice, i) => (
            <button className="genderBtn" key={i} onClick={() => {this.getStep(choice)}}>  
              {choice}
            </button>                      
        ))}
        {
          <form onSubmit={this.sendAnswer}>
            <div class="inputs">
            <input className="bubble" placeholder="Écrivez votre message..." type="text" value={this.state.answer || ""} onChange={this.changeAnswer} /> 
            <input class="btn" type="image" value="Envoyer" src="/send.png" alt="envoyer"/>   
            </div>
          </form>                  
        }                  
      </div>
    )
  }  
}
   
export default App;