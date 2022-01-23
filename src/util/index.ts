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

    generateRandomNumber(from, to) {
        return Math.floor(Math.random() * to) + from;
    }
}

export const util = new Util();