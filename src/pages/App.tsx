import React from 'react';
import './App.scss';
import { Router, Link, RouteComponentProps } from '@reach/router';

const About: React.FC<RouteComponentProps> = () => <h2>About</h2>;
const Convert: React.FC<RouteComponentProps> = () => <h2>Converter</h2>;

const App: React.FC = () => (
    <div className="App">
        <header>
            <h1>Meliora</h1>
            <nav>
                <Link to="/">About</Link>
                <Link to="/convert">Converter</Link>
            </nav>
        </header>
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
