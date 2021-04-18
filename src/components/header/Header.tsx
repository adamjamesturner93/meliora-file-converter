import React from 'react';
import { Link } from '@reach/router';

export const Header: React.FC = () => (
    <header>
        <h1>Meliora</h1>
        <nav>
            <Link to="/">About</Link>
            <Link to="/convert">Converter</Link>
        </nav>
    </header>
);
