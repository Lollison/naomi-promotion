import * as fs from 'fs'
import got from 'got';
import { HttpsProxyAgent } from 'hpagent';
import { Proxy } from './enum'
import UserAgent from 'user-agents'
import { ClientEntity } from "../client/clientEntity";
import { clientEntityCluster } from "../client";

export class ProxyCore {
    private readonly fileName: string;
    private readonly baseUrl: string = "https://www.youtube.com";

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    async load() {
        if(this.fileName === undefined)
            return console.log('cant open proxy file: filename undefined')

        const data = fs.readFileSync(this.fileName).toString().split('\r\n')

        let checkedAmount = 0;

        return new Promise(async (resolve, reject) => {
            await data.forEach((line, index) => {
                const proxy = line.split(':')
                const proxyFull = `http://${proxy[Proxy.LOGIN]}:${proxy[Proxy.PASS]}@${proxy[Proxy.HOST]}:${proxy[Proxy.PORT]}`;

                const deviceInformation = new UserAgent({ platform: 'Win32', deviceCategory: 'desktop' })

                const instance = got.extend({
                    prefixUrl: this.baseUrl,
                    headers: {
                        'user-agent': deviceInformation.userAgent
                    },
                    agent: {
                        https: new HttpsProxyAgent({
                            keepAlive: true,
                            keepAliveMsecs: 15 * 1000,
                            proxy: proxyFull
                        })
                    }
                })

                const v1 = Date.now()

                const client = new ClientEntity(instance, deviceInformation, proxyFull);

                client.domain('api64.ipify.org').request('GET', '').then(res => {
                    console.log(`[Proxy #${index + 1}] Success!`, Date.now() - v1)
                    //console.log(res.headers['set-cookie'])
                    clientEntityCluster.addEntity(client);

                }).catch(err => {
                    console.log(`[Proxy #${index + 1}] Error`, err)
                }).finally(() => {
                    if(++checkedAmount == data.length) {
                        return resolve(clientEntityCluster.length)
                    }
                })

            })
        })
    }
}

export const proxyCore = new ProxyCore(process.env.PROXY_FILENAME);