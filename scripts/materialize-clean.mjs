import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const parts = [
  ['source.clean-00', 4000, '3bcd242e317a8dc4af79f7b1f2d5e156120e9800f9600823d878e36881e264cd'],
  ['source.clean-01', 4000, '51f41322ba4fe89ceeb082146d63c2e9a405c7e0ceec7fa3bfeff94b7dd710f4'],
  ['source.clean-02', 4000, '41227a240a2e9917ba96f2d8156f3424bfae5a323574ba9ef72953ea9f651941'],
  ['source.clean-03', 4000, '5713e4ef980973a040cf9ff7451bc677693d4b98ab44af45a4461244262ed121'],
  ['source.clean-04', 4000, '7769b11170c56d57defb2d4896c441662e57467e02ee23e21a42990c21dec9b4'],
  ['source.clean-05', 4000, 'f64f472732cb2183643ecd31609361fbd9f104fa2941a112a38b9835046b3483'],
  ['source.clean-06', 4000, '136d27a3caf937477f39a8345fc5806f0bc30ab757603800df350b9162edd10e'],
  ['source.clean-07', 4000, '43c259916d30ddea1f4d751aaea57bd7009fffa8ecf1ca28bba52410301ac01a'],
  ['source.clean-08', 4000, 'c500936338929c4f57a171d192fe12eaa2017309d456550b354a3a8ade34e870'],
  ['source.clean-09', 4000, 'd7d5be0a3805f7df5ee3a5aaf9586d7c396a35ce5c955ecd7a0378555aaf71a0'],
  ['source.zip.tail-00', 4000, '77061820c6d72918fd97332fdbab112081dbbf028d57c5b394a9035352c5417c'],
  ['source.zip.tail-01', 4000, '2bf8b43ef03656b587f2d27eb35a0f188811811c5791809a26f965449b7eb88e'],
  ['source.zip.tail-02', 4000, 'dac5203dce7bebae703bf374abaedcbf6b4cba22ef8dfa0395caff611740b880'],
  ['source.zip.tail-03', 4000, '9e2c08af061ec4bea3f238267c7a3549ddee68e7a1939f3d8b3c165c4ae739e9'],
  ['source.zip.tail-04', 4000, 'c3331f43ad33e4a46bff74c5596aa8cbc4b45f7bb643384be5f9acf7e76e826f'],
  ['source.zip.tail-05', 2840, '361457718dff7e86025fc5e98e637948f6c81e99cd54bd0d9781e8fd03fff183']
];

let encoded = '';
for (const [name, expectedLength, expectedHash] of parts) {
  const text = readFileSync(resolve(name), 'utf8');
  const actualHash = createHash('sha256').update(text).digest('hex');
  if (text.length !== expectedLength || actualHash !== expectedHash) {
    throw new Error(`${name} integrity failure: length ${text.length}/${expectedLength}, sha ${actualHash}/${expectedHash}`);
  }
  encoded += text;
}

const archive = '/tmp/masondtorres-source.zip';
writeFileSync(archive, Buffer.from(encoded, 'base64'));
execFileSync('unzip', ['-t', archive], { stdio: 'inherit' });
execFileSync('unzip', ['-o', archive, '-d', process.cwd()], { stdio: 'inherit' });

for (const name of readdirSync(process.cwd())) {
  if (name.startsWith('source.clean-') || name.startsWith('source.zip.') || name.startsWith('site.bundle.')) {
    rmSync(resolve(name), { force: true });
  }
}

console.log('Materialized complete production source tree');
