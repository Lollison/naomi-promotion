import './config'
import { proxyCore } from "./proxy";
import { clientEntityCluster } from "./client";

console.log('Naomi Promotion vDEV')

proxyCore.load().then((amount: number) => {
    console.log(`[PROXY CORE] Check completed. Valid proxies: ${amount}`)
    clientEntityCluster.addTask('3IdDTyu2QEc', amount, 12).then(console.log)
})

setTimeout(() => {
    console.log('bb after 1 min')
    process.exit(1)
}, 60000)