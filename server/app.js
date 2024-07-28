const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log("Server request");
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'application/json');

    const data = JSON.stringify([
        {
            id: 1,
            title: 'Ant Design Title 1',
            completed: false,
          },
          {
            id: 2,
            title: 'Ant Design Title 2',
            completed: false,
          },
          {
            id: 3,
            title: 'Ant Design Title 3',
            completed: false,
          },
          {
            id: 4,
            title: 'Ant Design Title 4',
            completed: false,
          },
    ])
    res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listen port ${PORT}`);
});