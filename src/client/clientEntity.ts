import * as got from "got";
import * as tough from 'tough-cookie';

export class ClientEntity {
    private instance: got.Got;
    public readonly device: Object;
    private readonly cookieJar: tough.CookieJar;
    private currentDomain: string;

    constructor(instance: got.Got, device: Object, proxy: string) {
        this.cookieJar = new tough.CookieJar();

        this.instance = instance.extend({
            cookieJar: this.cookieJar,
            hooks: {
                beforeRequest: [
                     options => {

                        const cookies = this.cookieJar.getCookiesSync(`https://${this.currentDomain}`)

                        if(cookies.length === 0)
                            return;

                        let parsedCookies = []

                        cookies.forEach(cookie => {
                            parsedCookies.push(`${cookie.key}=${cookie.value}`)
                        })

                        options.headers['cookie'] = parsedCookies.join(';')
                    }
                ],
                afterResponse: [
                    (response, retryWithMergedOptions) => {

                        // @ts-ignore
                        response.headers['set-cookie']?.map(tough.Cookie.parse).forEach((cookie, d) => {
                            // @ts-ignore
                            this.cookieJar.setCookieSync(`${cookie}=${cookie.name}`, `https://${this.currentDomain}`)
                        })

                        return response
                    }
                ]
            }
        });
        device['proxy'] = proxy;
        this.device = device;
    }

    domain(domain: string) {
        this.currentDomain = domain;

        this.instance = this.instance.extend({
            prefixUrl: `https://${domain}`
        })
        return this
    }

    async request(method: string, url: string = '', ...args: any) {
        if (this.instance === undefined)
            return console.log(`[ClientEntity] instance is empty`)

        args.push(this.cookieJar)
        return this.instance?.[method.toLowerCase()](url, ...args)
    }
}