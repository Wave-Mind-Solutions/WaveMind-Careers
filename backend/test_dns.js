const dns = require('dns');

const host = 'smtp.gmail.com';

console.log('Testing dns.lookup with family: 4...');
dns.lookup(host, { family: 4 }, (err, address, family) => {
    if (err) console.error('Error (family 4):', err);
    else console.log('Result (family 4):', address, '(family:', family, ')');
});

console.log('Testing dns.lookup with family: 6...');
dns.lookup(host, { family: 6 }, (err, address, family) => {
    if (err) console.error('Error (family 6):', err);
    else console.log('Result (family 6):', address, '(family:', family, ')');
});

console.log('Testing dns.lookup without options...');
dns.lookup(host, (err, address, family) => {
    if (err) console.error('Error (default):', err);
    else console.log('Result (default):', address, '(family:', family, ')');
});

setTimeout(() => {
    console.log('Done.');
    process.exit(0);
}, 2000);
