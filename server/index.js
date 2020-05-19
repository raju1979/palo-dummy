const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const libxmljs = require("libxmljs");
var builder = require('xmlbuilder');
const { create } = require('xmlbuilder2');

const PORT = process.env.PORT || 5000;

const app = express()

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ "message": "success" });
});

app.get('/api', (req, res) => {
    var libxmljs = require("libxmljs");
    var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
               '<root>' +
                   '<child foo="bar">' +
                       '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
                   '</child>' +
                   '<sibling>with content!</sibling>' +
               '</root>';
     
    var xmlDoc = libxmljs.parseXml(xml);
     
    // xpath queries
    var gchild = xmlDoc.get('//grandchild');
     
    console.log(gchild.text());  // prints "grandchild content"
     
    var children = xmlDoc.root().childNodes();
    var child = children[0];
     
    console.log(child.attr('foo').value()); // prints "bar"

    res.header('Content-Type', 'text/xml');
    res.send(xmlDoc);
});

// app.get('/api/login', (req, res) => {
//     var xml = builder.create('response', {'status':'success'})
//     .ele('result')
//         .ele('key', 'LUFRPT02NzRZUXUyT0NMai9BUlUzYXZmWU1LdDhRNFk9M0NCZkhWTFhSK3lmaTk4SEc3bXE0YytMOWRtQ2JFbHVsaTBwUEdteTdiQT0=')
//     .end({ pretty: true});
//     console.log(xml);
//     res.header('Content-Type', 'text/xml');
//     res.send(xml);
// })

app.get('/api/login', (req, res) => {
    const root = create({ version: '1.0' })
    .ele('response', { status: 'success' })
        .ele('result')
        .ele('key').txt('LUFRPT02NzRZUXUyT0NMai9BUlUzYXZmWU1LdDhRNFk9M0NCZkhWTFhSK3lmaTk4SEc3bXE0YytMOWRtQ2JFbHVsaTBwUEdteTdiQT0=').up()
        .up()
        .ele('baz').up()
    .up();

    // convert the XML tree to string
    const xml = root.end({ prettyPrint: true });
    res.header('Content-Type', 'text/xml');
    res.send(xml);
})

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`)
});
