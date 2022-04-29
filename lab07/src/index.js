const app = require('./app');

async function main(){
    await app.listen(app.get('port'));
    console.log('Lechure Server en puerto: ', app.get('port'));
}

main();