export class Util {
    private readonly clientDataRaw: string = "{\"videoId\":\"oO2fa7tw89k\",\"context\":{\"client\":{\"hl\":\"ru\",\"gl\":\"RU\",\"remoteHost\":\"213.234.251.29\",\"deviceMake\":\"\",\"deviceModel\":\"\",\"visitorData\":\"CgtwMUZ6dElkaGNZQSithZmOBg%3D%3D\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36,gzip(gfe)\",\"clientName\":\"WEB_EMBEDDED_PLAYER\",\"clientVersion\":\"1.20211215.00.01\",\"osName\":\"Windows\",\"osVersion\":\"10.0\",\"originalUrl\":\"https://www.youtube.com/embed/oO2fa7tw89k\",\"screenPixelDensity\":1,\"platform\":\"DESKTOP\",\"clientFormFactor\":\"UNKNOWN_FORM_FACTOR\",\"configInfo\":{\"appInstallData\":\"CK2FmY4GELvH_RIQt8utBRCR160FENzrrQUQveutBRDYvq0F\"},\"screenDensityFloat\":1.25,\"browserName\":\"Chrome\",\"browserVersion\":\"96.0.4664.110\",\"screenWidthPoints\":495,\"screenHeightPoints\":754,\"utcOffsetMinutes\":420,\"userInterfaceTheme\":\"USER_INTERFACE_THEME_DARK\",\"connectionType\":\"CONN_CELLULAR_4G\",\"timeZone\":\"Asia/Novosibirsk\",\"playerType\":\"UNIPLAYER\",\"tvAppInfo\":{\"livingRoomAppMode\":\"LIVING_ROOM_APP_MODE_UNSPECIFIED\"},\"clientScreen\":\"EMBED\"},\"user\":{\"lockedSafetyMode\":false},\"request\":{\"useSsl\":true,\"internalExperimentFlags\":[],\"consistencyTokenJars\":[]},\"clientScreenNonce\":\"MC4xNjkxNTYxMTk4NjI4NjU3Mg..\",\"adSignalsInfo\":{\"params\":[{\"key\":\"dt\",\"value\":\"1640383152156\"},{\"key\":\"flash\",\"value\":\"0\"},{\"key\":\"frm\",\"value\":\"0\"},{\"key\":\"u_tz\",\"value\":\"420\"},{\"key\":\"u_his\",\"value\":\"2\"},{\"key\":\"u_h\",\"value\":\"864\"},{\"key\":\"u_w\",\"value\":\"1536\"},{\"key\":\"u_ah\",\"value\":\"824\"},{\"key\":\"u_aw\",\"value\":\"1536\"},{\"key\":\"u_cd\",\"value\":\"24\"},{\"key\":\"bc\",\"value\":\"31\"},{\"key\":\"bih\",\"value\":\"754\"},{\"key\":\"biw\",\"value\":\"495\"},{\"key\":\"brdim\",\"value\":\"-1,-1,-1,-1,1536,0,1538,826,495,754\"},{\"key\":\"vis\",\"value\":\"1\"},{\"key\":\"wgl\",\"value\":\"true\"},{\"key\":\"ca_type\",\"value\":\"image\"}],\"bid\":\"ANyPxKpogg2DoEFLt2PRWtvvR6XpCZS2heyhyFtibjB6Swube2BgpfgXqaVPlwTvH0Z9RE44M-Fa4tu7fPR03yol9rYFmq_8jw\"}},\"playbackContext\":{\"contentPlaybackContext\":{\"html5Preference\":\"HTML5_PREF_WANTS\",\"lactMilliseconds\":\"9\",\"referer\":\"https://www.youtube.com/embed/oO2fa7tw89k\",\"signatureTimestamp\":18978,\"autoCaptionsDefaultOn\":false,\"mdxContext\":{},\"playerWidthPixels\":495,\"playerHeightPixels\":754,\"ancestorOrigins\":[]}},\"cpn\":\"h7wbIMuRzYikKKJV\",\"captionParams\":{}}";

    constructor() {

    }

    returnRawClientDataAsObject() {
        return JSON.parse(this.clientDataRaw);
    }

    generateRandomString(myLength) {
        const chars =
            "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
        const randomArray = Array.from(
            { length: myLength },
            (v, k) => chars[Math.floor(Math.random() * chars.length)]
        );

        return randomArray.join("");
    }

    ytFunc_DA(a, b) { // line: 17692
        if (8 > a.byteLength - b)
            return !1;
        let c = a.getUint32(b);
        if (8 > c || a.byteLength - b < c)
            return !1;
        c = a.getUint32(b + 4);
        if (1635148593 === c || 1635148611 === c || 1937126244 === c || 1936995172 === c)
            return !0;
        for (c = 4; 8 > c; c++) {
            let d = a.getInt8(b + c);
            if (97 > d || 122 < d)
                return !1
        }
        return !0
    }

    ytFunc_oA = function(a, b, c, d, e) { // line: 17417
        e = void 0 === e ? !1 : e;
        this.data = a;
        this.offset = b;
        this.size = c;
        this.type = d;
        this.i = (this.j = e) ? 0 : 8;
        this.dataOffset = this.offset + this.i
    }

    ytFunc_EA = function(a, b) { // line: 17654
        let c = a.getUint32(b)
            , d = a.getUint32(b + 4);
        // @ts-ignore
        return new util.ytFunc_oA(a,b,c,d)
    }

    ytFunc_yA = function(a) { // line: 17528
        let b = {};
        a = a.split("\r\n");
        for (let c = 0; c < a.length; c++) {
            if (0 === a[c].length)
                return b;
            let d = a[c].match(/([^:]+):\s+([\S\s]+)/);
            null != d && (b[d[1]] = d[2])
        }
        return null
    }

    ytFunc_CA = function(a, b, c) { // line: 17625
        for (; util.ytFunc_DA(a, b); ) {
            let d = util.ytFunc_EA(a, b);
            if (d.type === c)
                return d;
            b += d.size
        }
        return null
    }

    ytFunc_hA = function(a) { // line:17355
        return String.fromCharCode.apply(null, a)
    }

    ytFunc_jA = function(a) { // line: 17359
        return iA ? iA.decode(a) : util.ytFunc_hA(a)
    }

    ytFunc_uA = function(a, b) { // line:17459
        b = void 0 === b ? NaN : b;
        if (isNaN(b))
            var c = a.size;
        else
            for (c = a.i; c < a.size && a.data.getUint8(a.offset + c) !== b; )
                ++c;
        b = new Uint8Array(a.data.buffer,a.offset + a.i + a.data.byteOffset,c - a.i);
        a.i = Math.min(c + 1, a.size);
        return util.ytFunc_jA(b)
    }

    ytFunc_sA = function(a) { // line:17445
        let b = a.data.getUint32(a.offset + a.i);
        a.i += 4;
        return b
    }

    ytFunc_Upa = function(a) { // line:17713
        a.skip(4);
        return {
            uY: util.ytFunc_uA(a, 0),
            value: util.ytFunc_uA(a, 0),
            FH: util.ytFunc_sA(a),
            zfa: util.ytFunc_sA(a),
            Zea: util.ytFunc_sA(a),
            id: util.ytFunc_sA(a),
            OM: util.ytFunc_uA(a),
            offset: a.offset
        }
    }

    ytFunc_wA = function(a, b) { // line:17506
        return Number(a.data[b]) || 0
    }

    ytFunc_xA = function(a, b) { // line:17481
        this.data = a;
        this.uri = b || "http://youtube.com/streaming/metadata/segment/102015";
        this.i = util.ytFunc_wA(this, "Sequence-Number");
        this.I = util.ytFunc_wA(this, "Segment-Count");
        this.J = this.data["Segment-Durations-Ms"] || "";
        this.ingestionTime = util.ytFunc_wA(this, "Ingestion-Walltime-Us") / 1E6;
        this.j = (util.ytFunc_wA(this, "First-Frame-Time-Us") + util.ytFunc_wA(this, "First-Frame-Uncertainty-Us")) / 1E6;
        this.dj = util.ytFunc_wA(this, "Target-Duration-Us") / 1E6;
        this.B = "T" === this.data["Stream-Finished"];
        this.C = "T" === this.data.Streamable;
        this.cryptoPeriodIndex = util.ytFunc_wA(this, "Crypto-Period-Index");
        this.u = util.ytFunc_wA(this, "Crypto-Period-Seconds")
    }

    getSegmentInfo(a) { // line: 17727 // a = ??? (определить происхождение)
        let b = util.ytFunc_CA(a, 0, 1701671783);
        if (!b)
            return null;

        let c = util.ytFunc_Upa(b)
            , d = c.uY;

        c = util.ytFunc_yA(c.OM);

        return c ? new util.ytFunc_xA(c,d) : null

    }

    generateRandomNumber(from, to) {
        return Math.floor(Math.random() * to) + from;
    }
}

export const util = new Util();