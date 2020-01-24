var unirest = require('unirest');
var req = unirest('GET', 'https://api.discogs.com/database/search?q=Nirvana&key=JkjkJaFTmHXCgDmTnwcV&secret=DDUXNYboJNDLbwhCZaazYnYmsVNSSIzO')
    .end(function (res) {
        debugger
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
    });