import prettyBytes from 'pretty-bytes';
import React from 'react';

interface Props {
    name: string;
    size: number;
    onDelete: () => void;
}

const File: React.FC<Props> = ({ name, size, onDelete }) => {
    return (
        <section>
            <button onClick={onDelete}>x</button>
            <span>
                {name} - {prettyBytes(size)}
            </span>
        </section>
    );
};

export default File;
