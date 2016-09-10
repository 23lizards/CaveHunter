# CaveHunter

### Local development

`cd` to project directory

Install dependencies (node 4.x.x required)

    $ npm install

Then create file `.env` with config

For example

```
PORT=3000
```

Run local server

    $ npm start

### Production build

To build and minimize frontend files use command

    $ npm run build
    
This command puts all necessary files in directory `dist`