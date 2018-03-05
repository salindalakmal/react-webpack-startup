import React from 'react';

import 'bootstrap'; 

import { Header } from './Header.js';
import { Slider } from './Slider.js';
import { Footer } from './Footer.js';

class App extends React.Component {
  	render() {
      	return (
      		<div className="wrapper">
      			<Header />
      			<Slider />
	         	<main className="container">
	            	<h2>Content</h2>
	            	<p>The content text!!!</p>
	         	</main>
	         	<Footer />
      		</div>
      	);
    }
}

export default App;

