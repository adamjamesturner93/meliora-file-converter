import mammoth from 'mammoth';
import { FileWithPath } from 'react-dropzone';
import { downloadBlob } from './download-file';

export const readFile = async (file: FileWithPath): Promise<void> => {
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

        doc.replace(/‘/, '&apos;');
        doc.replace(/’/, '&apos;');
        doc.replace(/–/, '&ndash;');
        doc.replace(/-/, '&ndash;');
        doc.replace(/'/, '&apos;');
        doc.replace(/"/, '&quot;');
        doc.replace(/“/, '&quot;');
        doc.replace(/”/, '&quot;');
        doc.replace(/£/, '&pound;');
        doc.replace(/©/, '&copy;');
        doc.replace(/src=&quot;/, 'src="');
        doc.replace(/&quot; \/>/, '" />');
        doc.replace(/<table>/, "<table class='table table-sm'>");

        const blob = new Blob([doc], { type: 'text/html' });

        const { name } = file;
        const parts = name.split('.');
        parts.pop();
        const newName = parts.join('.') + '.html';

        downloadBlob(blob, newName);
    };
    reader.readAsArrayBuffer(file);
};
