import { expose } from "threads";
import { ClientEntity } from "../client/clientEntity";
import { HttpsProxyAgent } from "hpagent";
import { util } from '../util'
import got from "got";
import {ClientEntityCluster} from "../client";

class NaomiWatcher { // wrapper of wrapper of got instance with some yt functions
    private readonly client: ClientEntity
    private data: Object = {}

    constructor(instance: ClientEntity, streamId: string) {
        this.data['watcherId'] = util.generateRandomString(16)
        this.data['streamId'] = streamId
        this.client = instance
    }

    initYoutubePlayer() {
        if(this.client === undefined)
            return

        return new Promise( (resolve, reject) => {

            this.query.domain('www.youtube.com').request('GET', `embed/${this.data['streamId']}`).then(res => {
                const regex = new RegExp(/ytcfg.set\((.+?)\);window.ytcfg.obfuscatedData_/)

                const YTConfigRaw = regex.exec(res.body)
                const YTConfig = JSON.parse(YTConfigRaw[0].replace(');window.ytcfg.obfuscatedData_', '').replace('ytcfg.set(', ''))

                const YTClientData = util.returnRawClientDataAsObject()

                YTClientData["videoId"] = this.data['streamId']
                YTClientData["cpn"] = this.data["watcherId"]

                YTClientData["context"]["clientScreenNonce"] = util.generateRandomString(24)

                YTClientData["context"]["client"]["hl"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["hl"];
                YTClientData["context"]["client"]["gl"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["gl"];
                YTClientData["context"]["client"]["remoteHost"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["remoteHost"];
                YTClientData["context"]["client"]["visitorData"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["visitorData"];
                YTClientData["context"]["client"]["userAgent"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["userAgent"];
                YTClientData["context"]["client"]["clientName"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["clientName"];
                YTClientData["context"]["client"]["clientVersion"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["clientVersion"];
                YTClientData["context"]["client"]["originalUrl"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["originalUrl"];
                YTClientData["context"]["client"]["configInfo"]["appInstallData"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["configInfo"]["appInstallData"];
                YTClientData["context"]["client"]["timeZone"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["timeZone"];
                YTClientData["context"]["client"]["utcOffsetMinutes"] = YTConfig["INNERTUBE_CONTEXT"]["client"]["utcOffsetMinutes"];

                YTClientData["playbackContext"]["contentPlaybackContext"]["lactMilliseconds"] = util.generateRandomNumber(1, 50).toString()
                YTClientData["playbackContext"]["contentPlaybackContext"]["referer"] = `https://www.youtube.com/embed/${this.data['streamId']}`
                YTClientData["playbackContext"]["contentPlaybackContext"]["signatureTimestamp"] = util.generateRandomNumber(10000, 20000).toString()

                const query = JSON.stringify(YTClientData)

                this.query.request('POST', 'youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8', { body: query }).then(res => {
                    resolve(res)
                }).catch(err => reject)
            })
        })

    }

    get query() {
        return this.client;
    }
}

class NaomiProducer { // cluster if NaomiWatchers
    private cluster: Array<NaomiWatcher> = []

    constructor() {

    }

    add(naomi: NaomiWatcher) {
        this.cluster.push(naomi)
        return this.cluster.length
    }

    get length() {
        return this.cluster.length
    }
}

expose({

    start(id, amount, duration, data: Array<Object>)
    {
        return new Promise((resolve, reject) => {

            const cluster = new NaomiProducer()

            data.forEach(watcher => {

                // init client entity -------------------------------------------------------------------
                const client = new ClientEntity(got.extend({
                    prefixUrl: 'https://www.youtube.com',
                    headers: {
                        'user-agent': watcher['device']['userAgent']
                    },
                    agent: {
                        https: new HttpsProxyAgent({
                            keepAlive: true,
                            keepAliveMsecs: 15 * 1000,
                            proxy: watcher['proxy']
                        })
                    }
                }), {
                    userAgent: watcher['device']['userAgent']
                }, watcher['proxy'])
                // init client entity -------------------------------------------------------------------

                const wrapped = new NaomiWatcher(client, id)

                wrapped.query.domain('api64.ipify.org').request('GET').then(result => {
                    console.log(`[${watcher['proxy']}]`, result.body)

                    wrapped.initYoutubePlayer().then(res => {
                        console.log(`[${watcher['proxy']}] YT Player inited`)
                        cluster.add(wrapped)

                        wrapped.query.domain('main.rpglf.su').request('GET', 'hit.php').then(res => {
                            wrapped.query.domain('main.rpglf.su').request('GET', 'hit.php').then(res => {
                                console.log(`[${watcher['proxy']}] Cookie test`, res.body)
                            })
                        })
                    })

                })


            })
            console.log(`Start task for: ${id}: Amount - ${amount}, duration ${duration} sec`)
        })
    }
})