import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDropzone, FileWithPath } from 'react-dropzone';
import prettybyte from 'pretty-bytes';
import mammoth from 'mammoth';

const readFile = async (file: FileWithPath) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = async () => {
        // Do whatever you want with the file contents
        const arrayBuffer = reader.result;
        const body = await mammoth.convertToHtml({ arrayBuffer });

        const head = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${file.name}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" >
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
            <style>
              body {
                font-family: Calibri;
                font-size: 12;
                color: black;
              }  
              h1 {
                font-size: 16;
                font-weight: bold;
              }
              h2 {
                font-size: 14;
                font-weight: bold;
              }
              h3 {
                font-size: 12;
                font-weight: bold;
              }
              h4 {
                font-size: 12;
                font-style: italic;
              }
            </style>
          </head>
          <body>
            <div>`;
        const tail = '</div></body></html>';
        const doc = `${head}${body.value}${tail}`;
        console.log(doc);
    };
    reader.readAsArrayBuffer(file);
};

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

    return (
        <React.Fragment>
            <h2>Converter</h2>
            <section style={{ display: 'flex', width: '100%', height: '100%' }}>
                <section
                    {...getRootProps()}
                    style={{
                        flex: 1,
                        padding: '3%',
                        margin: '3%',
                        border: '1px solid black',
                    }}
                >
                    <input {...getInputProps()} style={{ width: '100%', height: '90%' }} />
                </section>
                <section style={{ flex: 1, padding: '3%', margin: '3%', border: '1px solid black' }}>
                    {files.length > 0 &&
                        files.map((f) => (
                            <section key={f.name}>
                                <span>
                                    {f.name} - {prettybyte(f.size)}
                                </span>
                            </section>
                        ))}
                    <button onClick={convertFiles}>Convert Files</button>
                </section>
            </section>
        </React.Fragment>
    );
};

export default About;
