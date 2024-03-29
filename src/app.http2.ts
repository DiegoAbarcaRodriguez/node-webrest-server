import http from "http2";
import fs from 'fs'

const server = http.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {
    console.log(req.url);

    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write(`<h1>URL ${req.url}</h1>`);
    // res.end();

    // const data = { name: 'Diego Abarca', age: 24, city: 'Guanajuato' };
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(data));// Equivalente al res.write() seguido del end()

    if (req.url == '/') {

        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(htmlFile);
        res.end();
        return;
    }


    if (req.url?.endsWith('.css')) {
        res.writeHead(200, { "Content-Type": "text/css" });
    } else if (req.url?.endsWith('.js')) {
        res.writeHead(200, { "Content-Type": "application/javascript" });
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }



});

server.listen(8080, () => {
    console.log('Server Running on port 8080')
});