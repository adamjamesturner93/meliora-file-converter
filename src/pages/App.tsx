import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { Header } from '../components';
const About: React.FC<RouteComponentProps> = () => <h2>About</h2>;
const Convert: React.FC<RouteComponentProps> = () => <h2>Converter</h2>;

const App: React.FC = () => (
    <div className="App">
        <Header />
        <main>
            <Router>
                <About path="/" />
                <Convert path="/convert" />
            </Router>
        </main>
        <footer>&copy;2021 - AdamJTurner93</footer>
    </div>
);

export default App;
