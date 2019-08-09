import React from 'react';


class MainApp extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
		currentWord : "",
		wordInput : "",
		timeDisplay : "",
		scoreDisplay : "",
		message : "",
		seconds : "",
		words : ['protien', 'asdf', 'ass', 'ads', 'ff', 'gh', 'lkg', 'jk', 'ask', 'all'	],
		time : 50,
		score : 0,
		isPlaying : null
		};
		this.keyUpEvent = this.keyUpEvent.bind(this);
	}
	keyChange = e => {
		this.setState({wordInput: e.target.value});
	}
	keyUpEvent( e ){
		if( this.matchWords() ) {
			this.setState({wordInput: ''});
			this.showWord();
			this.setState({score: this.state.score+1, isPlaying : true, scoreDisplay: this.state.score < 0 ? '0' : this.state.score, time: 51 });	
		}
		
	}
	matchWords() {
		if(this.state.wordInput === this.state.currentWord) {
			this.setState({message: 'Correct!!!'});
			return true;
		} else {
			this.setState({message: ''});
			return false;
		}
	}
// Initialize Game
	init() {

		// Load Word from Array
		this.showWord();
		
		//Start count down timer
		setInterval(this.keyUpEvent, 1000);
		
		//Start count down timer
    setInterval(this.countdownTime, 1000);

		//check status
		setInterval( this.checkStatus, 50);

	}
	
	
	//Count downs the time
	countdownTime = () => {
		if( this.state.time > 0) {
			this.setState({time: this.state.time-1});
		} else if (this.state.time === 0) {
			this.setState({isPlaying: false});
		}

		//Show time
		this.setState({timeDisplay : this.state.time});
	}


	//Pick and show a random word

	showWord() {
		//Choose a random array index
		const randomIndex = Math.floor(Math.random() * this.state.words.length);

		//output Inner html
		this.setState({currentWord : this.state.words[randomIndex]});

	}
	
	checkStatus = () => {
		if(!this.state.isPlaying && this.state.time === 0 ){
			this.setState({message : 'Game Over!!!', score: -1 });
		}
	}

	componentDidMount(){
		this.init();
	}
	render(){
		  return (
			<div className="App">
			 <div className="bg-dark text-white">
				<header className="bg-secondary text-center p-3 mb-5">Type It</header>
			  </div>
			   <div className="container text-center">
			   
			   <div className="row ">
					<div className="col-md-6 mx-auto">
						<p className="lead">Type the given word within <span clas="text-success" id="seconds">{this.state.seconds}</span> seconds</p>
						 <h2 className="display-m2 mb-5" id="current-word"> {this.state.currentWord}</h2>
						
						<input id="wordInput" value={this.state.wordInput} onChange={this.keyChange} onKeyUp={this.keyUpEvent} className="form-control form-control-lg" placeholder="Start Typing..." autoFocus />
						<h4 className="mt-3" id="message">{this.state.message}</h4>            
					</div>
				</div>
			   
			   <div className="row">
					<div className="col-md-6"><h3>Time Left:<span id="time">{this.state.timeDisplay}</span></h3></div>                
					<div className="col-md-6"><h3>Score:<span id="score">{this.state.scoreDisplay}</span></h3></div>
				</div>
				<div className="row mt-5">
					<div className="col-md-12">
						<div className="card card-body bg-secondary text-white">
						   <h5>Instructions</h5>
						   <p>Type each word in the given amount of seconds to score. To play again just type the current word. Your score will reset</p>
						</div>
					</div>
				</div>
			   </div>
			</div>
		  );
	}
}

export default MainApp;
