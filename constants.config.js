export const serverUrl = {
    EvodDevUrl: "https://evoddev.prosoft.sk",
    EvodTestUrl: "https://evodtest.ikvc.slovakrail.sk/evod/login.jsp",
    EvodJAVA17Url: "http://evoddev:8085/evod",
}

export const webTitle = {
        PTTWeb: "PTTWeb",
        FotenieDok: "PTT Fotenie dokumentov"
}

export const api = {
        VDSUrl: "http://localhost:8001/vds/EvodService",
        turnusy: "http://dockerdev.prosoft.sk:8086/turnusy",
        fotenie: "http://dockerdev.prosoft.sk:8085",
        SMTPServer: "SMTP server",
        verziaCp: "Úspešný (verzia VISv2.28 (lib:1.10.3.0))"
}

export const numberOfClick = 20
export const progressBarRetryTimeout = 240000
export const downloadRetryTimeout = 240000

export const user_data = {
    serverUrl: serverUrl.EvodDevUrl,
    personalNumber: "P089",
    password: "Aa123456",
    accessType: "Java17_all2",
    browserDebug: false
}

const path = require('path');
const relativeFilePath = path.join(__dirname, 'images', 'TEST-IMAGE.jpg');

export const imgFolder = {
  relativeFilePath,
};




