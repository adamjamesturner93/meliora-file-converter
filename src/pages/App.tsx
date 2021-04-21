import React from 'react';
import { Router } from '@reach/router';
import { Header } from '../components';
import { About, Converter } from '.';

const App: React.FC = () => (
    <div className="App">
        <Header />
        <main>
            <Router>
                <About path="/about" />
                <Converter default />
            </Router>
        </main>
        <footer>&copy;2021 - AdamJTurner93</footer>
    </div>
);

export default App;
