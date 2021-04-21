import React from 'react';
import { Link } from '@reach/router';

export const Header: React.FC = () => (
    <header>
        <h1>Meliora</h1>
        <nav>
            <Link to="/">Converter</Link>
            <Link to="/about">About</Link>
        </nav>
    </header>
);
