import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { readFile } from '../../utils';
import { File } from '../../components';

const About: React.FC<RouteComponentProps> = () => {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const convertFiles = async () => {
        console.log(await files.forEach(readFile));
    };

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        const newFiles = [...files, ...acceptedFiles];
        setFiles(newFiles);
        console.log({ files });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDropAccepted: onDrop });

    const onDelete = (name: string): void => {
        const newFiles = files.filter((f) => f.name !== name);
        setFiles(newFiles);
    };

    return (
        <React.Fragment>
            <h2>File Converter</h2>
            <section className="flex fill">
                <section {...getRootProps()} className="converter-section">
                    <label className="flex fill">
                        Click to add files, or drag them in
                        <input {...getInputProps()} style={{ display: 'none' }} />
                    </label>
                </section>
                <section className="converter-section">
                    <button onClick={convertFiles}>Convert Files</button>
                    {files.length > 0 &&
                        files.map((f) => (
                            <File key={f.name} name={f.name} size={f.size} onDelete={() => onDelete(f.name)} />
                        ))}
                </section>
            </section>
        </React.Fragment>
    );
};

export default About;
