const {
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
   Browsers,
} = require("@adiwajshing/baileys")
const fs = require('fs')
const crypto = require('crypto')
const request = require('request')
const moment = require('moment-timezone')
const speed = require('performance-now')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const hx = require('hxz-api')
const yts = require( 'yt-search')
const { exec } = require('child_process')

//LIB
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/index')
const { runtime, sleep } = require('./lib/myfunc')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { asupanapi } = require('./lib/asupan')
const { asupanapi2 } = require('./lib/asupan2')
const { scraper } = require('./lib/scraper')
const { uptotele, uploadFile, RESTfulAPI, uploadImages } = require('./lib/uploadimage')
const { pinterest } = require('./lib/pinterest')
const { bahasa } = require('./lib/bahasa')
const { negara } = require('./lib/kodenegara')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { webp2gifFile, igDownloader, TiktokDownloader } = require("./lib/gif.js")
const { y2mateA, y2mateV } = require('./lib/y2mate')

//DATABASE
const register = JSON.parse(fs.readFileSync('./database/user/register.json'))
const dewasa = JSON.parse(fs.readFileSync('./database/user/dewasa.json'))
const banned = JSON.parse(fs.readFileSync('./database/user/banned.json'))
const premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))
const welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const antivirus = JSON.parse(fs.readFileSync('./database/group/antivirus.json'))
const badword = JSON.parse(fs.readFileSync('./database/group/badword.json'))
const scommand = JSON.parse(fs.readFileSync("./database/bot/scommand.json"));

//MESSAGE
const { mess } = require('./message/mess')
const { downloadmenu, asupanmenu, stickermenu, kodemenu, vnmenu, toolsmenu, ownermenu } = require('./message/help')

//TEMP
let setiker = JSON.parse(fs.readFileSync('./temp/stik.json'))
let imagenye = JSON.parse(fs.readFileSync('./temp/image.json'))
let videonye = JSON.parse(fs.readFileSync('./temp/video.json'))
let audionye = JSON.parse(fs.readFileSync('./temp/vn.json'))

//CONFIG
const apikey = JSON.parse(fs.readFileSync('./apikey.json'))
const setting = JSON.parse(fs.readFileSync('./setting.json'))

//APIKEY
ramdaniapi = apikey.RamdaniKey
danzzapi = apikey.DanzzKey
hardiantoapi = apikey.HardiantoKey
lolhumanapi = apikey.LolHumanKey
lolapi = apikey.LolKey

//SETTINGS
namabot = setting.NamaBot
namaowner = setting.NamaOwner
nomorbot = setting.NomorBot
nomorowner = setting.NomorOwner
nomorowner2 = setting.NomorOwner2
gayamenu = setting.GayaMenu
prefixx = setting.Prefix

//DONASI
gopay = setting.Gopay
dana = setting.Dana
ovo = setting.Ovo
pulsa = setting.Pulsa
urlqris = setting.Qris
saweria = setting.Saweria

//WATERMARK
wmstick = setting.WmStick
wmreply = setting.WmReply
wmtroli = setting.WmTroli
wmtext = setting.WmText

//REPLY
done = "_succeed, dont forget to subscribe_ : https://youtube.com/c/RamdaniOfficial",

//TRUE AND FALSE
public = true
self = false

//PICTURE
randompicture = ['photo1','photo2','photo3','photo4','photo5','photo6']
const randompoto = randompicture[Math.floor(Math.random() * (randompicture.length))]
const photo1 = fs.readFileSync("./media/picture/photo1.jpg");
const photo2 = fs.readFileSync("./media/picture/photo2.jpg");
const photo3 = fs.readFileSync("./media/picture/photo3.jpg");
const photo4 = fs.readFileSync("./media/picture/photo4.jpg");
const photo5 = fs.readFileSync("./media/picture/photo5.jpg");
const photo6 = fs.readFileSync("./media/picture/photo6.jpg");
const thumb = fs.readFileSync(`./media/picture/${randompoto}.jpg`)

//AUDIO
randommp3 = ['males','buatapa','anjing','apa','araara','wataisi','arigatou','mastah']
const randomaudio = randommp3[Math.floor(Math.random() * (randommp3.length))]
const males = fs.readFileSync("./media/audio/males.mp3");
const buatapa = fs.readFileSync("./media/audio/buatapa.mp3");
const anjing = fs.readFileSync("./media/audio/anjing.mp3");
const apa = fs.readFileSync("./media/audio/apa.mp3");
const araara = fs.readFileSync("./media/audio/araara.mp3");
const wataisi = fs.readFileSync("./media/audio/wataisi.mp3");
const arigatou = fs.readFileSync("./media/audio/arigatou.mp3");
const mastah = fs.readFileSync("./media/audio/mastah.mp3");

//ADD CMD
const addCmd = (id, command) => {
const obj = { id: id, chats: command }
scommand.push(obj)
fs.writeFileSync('./database/bot/scommand.json', JSON.stringify(scommand))
}
const getCommandPosition = (id) => {
let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i].id === id) {
position = i
}
})
if (position !== null) {
return position
}
}
const getCmd = (id) => {
let position = null;
Object.keys(scommand).forEach((i) => {
if (scommand[i].id === id) {
position = i;
}
});
if (position !== null) {
return scommand[position].chats;
}
};
//REGISTRASI
const addRegist = (registid, sender, age, time, serials) => {
const reg = { id: registid, name: sender, age: age, time: time, serial: serials }
register.push(reg)
fs.writeFileSync('./database/user/register.json', JSON.stringify(register))
}
const addSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}
const cekRegist = (sender) => {
let status = false
Object.keys(register).forEach((i) => {
if (register[i].id === sender) {
status = true
}
})
return status
}
//DEWASA
const addDewasa = (dewasaid, sender, age, time, serimek) => {
const dew = { id: dewasaid, name: sender, age: age, time: time, serimek: serimek }
dewasa.push(dew)
fs.writeFileSync('./database/user/dewasa.json', JSON.stringify(dewasa))
}
const addSerimek = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}
const cekDewasa = (sender) => {
let status = false
Object.keys(dewasa).forEach((i) => {
if (dewasa[i].id === sender) {
status = true
}
})
return status
} 
    function danz(seconds){
    function pad(s){
    return (s < 10 ? '0' : '') + s;
    }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
module.exports = Ramdani = async (Ramdani, mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
            const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
            const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : ''
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(mek.message[type].fileSha256.toString('base64')) !== null && getCmd(mek.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message[type].fileSha256.toString('base64')) : ""
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		var command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
        responseButton = (type == 'listResponseMessage') ? mek.message.listResponseMessage.title : ''
		button = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedDisplayText : ''
		isImage = (type === 'imageMessage')
		const arg = body.substring(body.indexOf(' ') + 1)
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const c = args.join(' ')
		var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const botNumber = Ramdani.user.jid
			const ownerNumber = setting.NomorOwner2
			const isGroup = from.endsWith('@g.us')
			let sender = isGroup ? mek.participant : mek.key.remoteJid
			let senderr = mek.key.fromMe ? Ramdani.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
			const conts = mek.key.fromMe ? Ramdani.user.jid : Ramdani.contacts[sender] || { notify: jid.replace(/@.+/, '') }
			const totalchat = await Ramdani.chats.all()
            const pushname = mek.key.fromMe ? Ramdani.user.name : conts.notify || conts.vname || conts.name || '-'
			const groupMetadata = isGroup ? await Ramdani.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBanned = banned.includes(sender)
			const isPremium= premium.includes(sender)
			const isRegister = cekRegist(sender)
			const isDewasa = cekDewasa(sender)
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const iswelcome = isGroup ? welcome.includes(from) : false
			const isAntilink = isGroup ? antilink.includes(from) : false
            const isAntivirus = isGroup ? antivirus.includes(from) : false
			const isBot = botNumber.includes(senderr)
			const isOwner = ownerNumber.includes(senderr)
		var dates = moment().tz('Asia/Jakarta').format("YYYY-MM-DDTHH:mm:ss");
        var date = new Date(dates);
        var tahun = date.getFullYear();
        var bulan = date.getMonth();
        var tanggal = date.getDate();
        var hari = date.getDay();
       
        switch(hari) {
            case 0: hari = "Minggu"; break;
            case 1: hari = "Senin"; break;
            case 2: hari = "Selasa"; break;
            case 3: hari = "Rabu"; break;
            case 4: hari = "Kamis"; break;
            case 5: hari = "Jum`at"; break;
            case 6: hari = "Sabtu"; break;
        }
		switch(bulan) {
            case 0: bulan = "Januari"; break;
            case 1: bulan = "Februari"; break;
            case 2: bulan = "Maret"; break;
            case 3: bulan = "April"; break;
            case 4: bulan = "Mei"; break;
            case 5: bulan = "Juni"; break;
            case 6: bulan = "Juli"; break;
            case 7: bulan = "Agustus"; break;
            case 8: bulan = "September"; break;
            case 9: bulan = "Oktober"; break;
            case 10: bulan = "November"; break;
            case 11: bulan = "Desember"; break;
        }
			const Tanggal= "" + hari + ", " + tanggal + " " + bulan + " " + tahun;
			const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss z')
			const timeWib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
		const timeWit= moment().tz('Asia/Makassar').format('HH:mm:ss')
        const timeWita = moment().tz('Asia/Jayapura').format('HH:mm:ss')
        
        const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
const reply = (teks) => {
Ramdani.sendMessage(from, teks, text, {quoted: mek, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true})
}
const reply2 = (teks) => {
Ramdani.sendMessage(from, teks, text, { thumbnail: thumb, sendEphemeral: true, quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: `${wmtroli}`,body:"Meng F",previewType:"PHOTO",thumbnail:thumb,sourceUrl:`https://youtube.com/c/RamdaniOfficial`}}})
}
const freply = (teks) => {
Ramdani.sendMessage(from, teks, text,{contextInfo :{text: 'hi',
"forwardingScore": 1000000000,
isForwarded: false,
sendEphemeral: false,
"externalAdReply": {
                "title": `${ucapanWaktu}`,
                "body": `${wmtroli}`,
                "mediaType": "10",
                "mediaUrl": `https://youtube.com/c/RamdaniOfficial`,
                "thumbnailUrl": "https://youtube.com/c/RamdaniOfficial",
                "thumbnail": thumb,
                "sourceUrl": `https://youtube.com/c/RamdaniOfficial`,
},mentionedJid:[sender]}, quoted : mek})
};
			const sendMess = (hehe, teks) => {
				Ramdani.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? Ramdani.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : Ramdani.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			if (budy.includes("https://chat.whatsapp.com/")) {
				if (!isGroup) return
				if (!isAntilink) return
				if (isGroupAdmins) return
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				freply(` *「 GROUP LINK DETECTOR 」*\nKamu terdeteksi mengimkan link group, maaf saya harus ngeluarin anda :(`)
				setTimeout(() => {
				Ramdani.groupRemove(from, [kic]).catch((e) => { freply(`BOT HARUS JADI ADMIN`) })
				}, 0)
			   }
			//FAKE TROLI

           const fakedoc = {key: {fromMe: false, participant: `${nomorowner}@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast" } : {}) }, message: {documentMessage: {mimetype: 'application/octet-stream', title: `${ucapanWaktu}`, pageCount: 0, fileName: `Ramdani Botz`, jpegThumbnail: fs.readFileSync(`./media/picture/${randompoto}.jpg`)}}}
			const ftoko = { key: { fromMe: false, 
			             participant: `0@s.whatsapp.net`, ...(from ? { 
			             remoteJid: 'status@broadcast' } : {}) }, 
			             message: { 'productMessage': { 'product': { 'productImage':{ 'mimetype': 'image/jpeg', 'jpegThumbnail': fs.readFileSync(`./media/picture/${randompoto}.jpg`) }, 'title': `${namabot}\nRp. 10.000`, 'productImageCount': 9999 }, 'businessOwnerJid': `0@s.whatsapp.net`}}}
    const ftrol = {key : {fromMe:false, 
	participant : '0@s.whatsapp.net'},
       message: {
              orderMessage: {
                            itemCount : 999999999,
                            status: 1,
                            surface : 1,
                            message: `${wmtroli} \nRp. 999.999.999`, 
                            orderTitle: `${wmtroli}`,
                            thumbnail: thumb, 
                            sellerJid: '0@s.whatsapp.net',
                            contextInfo: {"forwardingScore":999,"isForwarded":true}, sendEphemeral: true}}}
const fhidetag = {key : {fromMe:false, 
	participant : '0@s.whatsapp.net'},
       message: {
              orderMessage: {
                            itemCount : 999999999,
                            status: 1,
                            surface : 1,
                            message: `${wmtroli}`, 
                            orderTitle: `${wmtroli}`,
                            thumbnail: thumb, 
                            sellerJid: '0@s.whatsapp.net',
                            contextInfo: {"forwardingScore":999,"isForwarded":true}, sendEphemeral: true}}}
const ftroli = {key : {fromMe:false,
	participant : '0@s.whatsapp.net'},
       message: { 
              orderMessage: {
                            itemCount : 999999999,
                            status: 1,
                            surface : 1,
                            message: `${wmtroli}`, 
                            orderTitle: `${wmtroli}`,
                            thumbnail: thumb, 
                            sellerJid: '0@s.whatsapp.net',
                            contextInfo: {"forwardingScore":999,"isForwarded":true}, sendEphemeral: true}}}
			const fakeitem = (teks) => {
           Ramdani.sendMessage(from, teks, text, {
                   quoted: {
                           key:{
                 	       fromMe:false, 
                           participant:`0@s.whatsapp.net`, ...(from ? {
                           remoteJid :"0-1604595598@g.us" }: {})
                           },message:{"orderMessage":{
                                  "orderId":"4302154426574187",
                                  "thumbnail":fs.readFileSync(`./media/picture/${randompoto}.jpg`),
                                  "itemCount":999999999,
                                  "status":"INQUIRY",
                                  "surface":"CATALOG",
                                  "message": `${namabot}\nRp. 999.999.999.999`,
                                  "token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},
                           contextInfo: {"forwardingScore":999,"isForwarded":true}, sendEphemeral: true})}


	Ramdani.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	Ramdani.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})                                              


    const sendButImage = async (from, context, fotext, img, but) => {
    gam = img
    jadinya = await Ramdani.prepareMessage(from, gam, MessageType.image)
    buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fotext,
      buttons: but,
      headerType: 4
    }
    Ramdani.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage, {quoted: mek})
  }
    const sendButVideo = async (id, text1, desc1, gam1, but = [], options = {} ) => {
      kma = gam1;
      mhan = await Ramdani.prepareMessage(from, kma, video);
      const buttonMessages = {
        videoMessage: mhan.message.videoMessage,
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 4,
      };
      Ramdani.sendMessage(id, buttonMessages, MessageType.buttonsMessage, {quoted: mek})
    };
        
        const sendButloc = async(id, text1, desc1, gam1, but = [], options = {}) => {
               let kma = gam1
               Ramdani.sendMessage(id, {"contentText": text1,
               "footerText": desc1, 
               "buttons": but,
               "headerType": "LOCATION",
                       "locationMessage": {
                   "text": "BOT",
                   "name": "South Brisbane",
                   "address": "Cloudflare, Inc",
                   "jpegThumbnail": kma
                }}, MessageType.buttonsMessage, {quoted: mek, contextInfo:{mentionedJid: parseMention(text1, desc1)}}, options)  
              }          
      
      const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
      const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
      };
      Ramdani.sendMessage(id, buttonMessage, MessageType.buttonsMessage, {quoted: mek})
    };
    
    const sendKontak = (from, nomor, nama, org, Ponsel, descBiz = "") => {
      const vcard =
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:" +
        nama +
        "\n" +
        "ORG:" +
        org +
        "\n" +
        "TEL;type=CELL;type=VOICE;waid=" +
        nomor +
        ":+" +
        nomor +
        "\n" +
        "END:VCARD";
        let nano = `Berikut Adalah Nomor Developer Saya, Silahkan Chat/Simpan Nomor Developer Saya.\n\n*NB: Dilarang Chat Yang Tidak Berkepentingan.*`
      Ramdani.sendMessage(
        from,
        { displayname: nama, vcard: vcard },
        MessageType.contact,
        { quoted: mek, caption: nano}
      );
    }; 
    const sendWebp = async(to, url) => {
           var names = Date.now() / 10000;
           var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
           request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
           download(url, './sticker' + names + '.png', async function () {
           console.log('selesai');
           let filess = './sticker' + names + '.png'
           let asw = './sticker' + names + '.webp'
           exec(`ffmpeg -i ${filess} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=40, crop=512:512" ${asw}`, (err) => {
           fs.unlinkSync(filess)
           if (err) return freply(`${err}`)
           exec(`webpmux -set exif ./media/sticker/data.exif ${asw} -o ${asw}`, async (error) => {
           if (error) return freply(`${error}`)
           Ramdani.sendMessage(from, fs.readFileSync(asw), sticker, {sendEphemeral:true, quoted:mek})
           fs.unlinkSync(asw)
});
});
});
}
const sendMediaURL = async(to, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(to, text, mids)
                }
           const fn = Date.now() / 10000;
           const filename = fn.toString()
           let mime = ""
           var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
           mime = res.headers['content-type']
           request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
                download(url, filename, async function () {
           console.log('done');
           let media = fs.readFileSync(filename)
           let type = mime.split("/")[0]+"Message"
           if(mime === "image/gif"){
           type = MessageType.video
           mime = Mimetype.gif
}
           if(mime.split("/")[0] === "audio"){
           mime = Mimetype.mp4Audio
}
           Ramdani.sendMessage(to, media, type, {quoted: mek, mimetype: mime, caption: text, thumbnail: Buffer.alloc(0), contextInfo: {"mentionedJid": mids}})
                     
           fs.unlinkSync(filename)
});
}
      const sendFileFromUrl = async(link, type, options) => {
           hasil = await getBuffer(link)
	       Ramdani.sendMessage(from, hasil, type, options).catch(e => {
	       fetch(link).then((hasil) => {
	       Ramdani.sendMessage(from, hasil, type, options).catch(e => {
	       Ramdani.sendMessage(from, { url : link }, type, options).catch(e => {
	       freply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
	       console.log(e)
})
})
})
})
}
      function clockString(ms) {
      let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
      let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
      let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
      return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
    }
    function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}



			colors = ['red','white','black','blue','yellow','aqua']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = Ramdani.contacts[from] != undefined ? Ramdani.contacts[from].vname || Ramdani.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			const troli =  {key: { fromMe: false,remoteJid: "status@broadcast", participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 99999, status: 200, thumbnail: thumb, surface: 200, message: wmtroli, orderTitle: 'Ramdani Store', sellerJid: '0@s.whatsapp.net'} } }
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'Bot'; if (!author) author = 'By Ramdani Official';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./media/stickers/${name}.exif`)) return `./media/sticker/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	
				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	
				fs.writeFile(`./media/sticker/${name}.exif`, buffer, (err) => {	
					return `./media/sticker/${name}.exif`	
				})	
	          }
Ramdani.updatePresence(from, Presence.composing)
if (!public) {
if (!isOwner && !mek.key.fromMe) return
}
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')  
 if(time2 < "23:59:00"){
var ucapanWaktu = 'Good night🌃'
 }
 if(time2 < "19:00:00"){
var ucapanWaktu = 'Good afternoon🌉'
 }
 if(time2 < "18:00:00"){
var ucapanWaktu = 'Good afternoon🌆'
 }
 if(time2 < "15:00:00"){
var ucapanWaktu = 'Good afternoon🌇'
 }
 if(time2 < "11:00:00"){
var ucapanWaktu = 'Good morning🌄'
 }
 if(time2 < "05:00:00"){
var ucapanWaktu = 'Good Night🌃'
 }
const fdanz = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(from ? 
	 { remoteJid: "status@broadcast" } : {}) 
                },
	 message: { 
		"extendedTextMessage": {
                 "text": `${wmtroli}`,
                 "title": `${wmtroli}`,
                 'jpegThumbnail': fs.readFileSync(`./media/picture/${randompoto}.jpg`),
                        }
	                  } 
                     }
//Buat fake info bot
//DI UBAH YATIM
danzrun = process.uptime() 
           Ramdani.setStatus(`${namabot} Aktif Selama ${(danzrun)} © Creator By Ramdani Official`).catch((_)=>_); //DI UBAH YATIMM
          settingstatus = new Date() * 1;
const jmn = moment.tz('Asia/Jakarta').format('HH.mm')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
				const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				const week = d.toLocaleDateString(locale, { weekday: 'long' })
				const calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
		       })
const fakeText = (teks) => {
Ramdani.sendMessage(from, teks, text, {quoted: troli })
}
switch(command) {
case 'verify':
case 'daftar':
if (isBanned) return freply(mess.banned)
freply(mess.wait)
const serials = addSerial(20)
try {
ppimg = await Ramdani.getProfilePicture(`${sender.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
imglu = 'https://mekpa-result.herokuapp.com/bgverify.jpeg' 
veri = sender
fs.writeFileSync('./database/user/register.json', JSON.stringify(register))
addRegist(sender, serials)
textt = `┌─ ❑ *Pendaftaran Berhasil!*
├ Nama: ${pushname}
├ Seri: ${serials}
├ Nomor: ${sender.split('@')[0]}
├ Tag: @${sender.split('@')[0]}
├ Pada: ${Tanggal}
├ Pukul: ${jam}
└─ ❑`
let buff = await getBuffer(`${ppimg}`)
footer = `${wmtext}`
but = [{ buttonId: `menu`, buttonText: { displayText: 'Menu' }, type: 1 },{ buttonId: `donasi`, buttonText: { displayText: 'Donasi' }, type: 1 }]
/*Ramdani.sendMessage(from, buff, MessageType.image, {quoted: mek, caption: textt, contextInfo: {'mentionedJid': [sender]}})*/
sendButImage(from, textt, footer, buff, but, {quoted: mek, caption: textt, contextInfo: {'mentionedJid': [sender]}})
break
//DEWASA
case 'saya18':
case 'my18':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
const serimek = addSerimek(20)
try {
ppimg = await Ramdani.getProfilePicture(`${sender.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
imglu = 'https://mekpa-result.herokuapp.com/bgverify.jpeg'
veri = sender
fs.writeFileSync('./database/user/dewasa.json', JSON.stringify(dewasa))
addDewasa(sender, serimek)
const texttt = `
┌─ ❑ *Verifykasi Berhasil!*
├ Nama: ${pushname}
├ Usia: 18
├ Seri: ${serimek}
├ Nomor: ${sender.split('@')[0]}
├ Tag: @${sender.split('@')[0]}
├ Pada: ${Tanggal}
├ Pukul: ${jam}
└─ ❑ `
let bufff = await getBuffer(`${ppimg}`)
footer = `${wmtext}`
butt = [{ buttonId: `menu`, buttonText: { displayText: 'Menu' }, type: 1 },{ buttonId: `donasi`, buttonText: { displayText: 'Donasi' }, type: 1 }]
/*Ramdani.sendMessage(from, buff, MessageType.image, {quoted: mek, caption: textt, contextInfo: {'mentionedJid': [sender]}})*/
sendButImage(from, texttt, footer, bufff, butt, {quoted: mek, caption: texttt, contextInfo: {'mentionedJid': [sender]}})
break
//BOCIL
case 'my11':
case 'my12':
case 'my13':
case 'my14':
case 'my15':
case 'my16':
case 'my17':
//
case 'saya11':
case 'saya12':
case 'saya13':
case 'saya14':
case 'saya15':
case 'saya16':
case 'saya17':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(`*SKIP LU MASIH BOCIL, MENDING MAIN EP EP:V*`)
break
//MENU
case 'menu':
case 'help':
case 'h':
case 'm':
case 'danz':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(mess.wait)
teks = `*Hallo Kak ${pushname}👋 ${ucapanWaktu}*
*Silahkan Pilih Salah Satu Dibawah Ini*`
img = fs.readFileSync(`./media/picture/${randompoto}.jpg`)
footer = `${wmtext}`
but = [{ buttonId: `allmenu`, buttonText: { displayText: 'Allmenu' }, type: 1 },{ buttonId: `select`, buttonText: { displayText: 'Select Menu' }, type: 1 }]
sendButImage(from, teks, footer, img, but, {quoted: fhidetag})
break
//ALLMENU
case 'allmenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(mess.wait)
teks = `*Hallo Kak ${pushname}👋 ${ucapanWaktu}*

*⌜ Download Menu ⌟* 
${gayamenu} ${prefix}play <query>
${gayamenu} ${prefix}ytmp3 <link>
${gayamenu} ${prefix}ytmp4 <link>
${gayamenu} ${prefix}tiktok <link>
${gayamenu} ${prefix}tiktoknowm <link>
${gayamenu} ${prefix}tiktokmusic <link>
${gayamenu} ${prefix}pinterest <query>

*⌜ Asupan Menu ⌟* 
${gayamenu} ${prefix}asupan1
${gayamenu} ${prefix}asupan2
${gayamenu} ${prefix}santuy
${gayamenu} ${prefix}hijaber
${gayamenu} ${prefix}ukhty
${gayamenu} ${prefix}bocil
${gayamenu} ${prefix}gheayuby
${gayamenu} ${prefix}rikagusriani

*⌜ Sticker Menu ⌟* 
${gayamenu} ${prefix}ttp <text>
${gayamenu} ${prefix}attp <text> 
${gayamenu} ${prefix}sticker <reply stick>
${gayamenu} ${prefix}stickgif <reply gif>
${gayamenu} ${prefix}toimg <reply stick>

*⌜ Kode Menu ⌟* 
${gayamenu} ${prefix}kodenegara <country>
${gayamenu} ${prefix}kodebahasa <sountry>

*⌜ Vn Menu ⌟* 
${gayamenu} ${prefix}tts <code country> <text>

*⌜ Tools Menu ⌟* 
${gayamenu} ${prefix}ssweb <link>
${gayamenu} ${prefix}tourl <reply img>
${gayamenu} ${prefix}toimg <reply stick>
${gayamenu} ${prefix}tomp3 <reply vn>
${gayamenu} ${prefix}tovideo <reply stick>
${gayamenu} ${prefix}togif <reply stick>

*⌜ Owner Menu ⌟* 
${gayamenu} ${prefix}broadcast <text>            
${gayamenu} ${prefix}public 
${gayamenu} ${prefix}self
${gayamenu} ${prefix}setppbot <reply img>
${gayamenu} ${prefix}banned <user>
${gayamenu} ${prefix}unbanned <user>
${gayamenu} ${prefix}delete 
${gayamenu} ${prefix}clearall 
${gayamenu} ${prefix}exif <pack | author>
${gayamenu} ${prefix}join <url>
${gayamenu} ${prefix}leaveall 
${gayamenu} ${prefix}eval <text>
${gayamenu} ${prefix}start 
${gayamenu} ${prefix}restart`
img = fs.readFileSync(`./media/picture/${randompoto}.jpg`)
footer = `${wmtext}`
but = [{ buttonId: `donasi`, buttonText: { displayText: 'Donasi' }, type: 1 },{ buttonId: `owner`, buttonText: { displayText: 'Owner' }, type: 1 }]
sendButImage(from, teks, footer, img, but, {quoted: fhidetag})
break
case 'select':
case 'selectmenu':
case 'simplemenu':
case 'c':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
 listMsg = {
 buttonText: 'Click here',
 footerText: '© Creator By Ramdani Official',
 description: `Hai Kak ${pushname}👋, Silahkan Pilih Menunya Disini\nJangan Spam Ya Kak, Kasih Jeda 5 Detik!!!`,
 sections: [
                     {
                      "title": `Jangan Lupa Donasi Tod`,
 rows: [
                            {                         
                              "title": "All Menu",
                              "description" :"",
                              "rowId": `allmenu`
                           },
                           {                         
                              "title": "Download Menu",
                              "description" :"",
                              "rowId": `downloadmenu`
                           },
                           {                         
                              "title": "Asupan Menu",
                              "description" :"",
                              "rowId": `asupanmenu`
                           },
                           {                         
                              "title": "Sticker Menu",
                              "description" :"",
                              "rowId": `stickermenu`
                           },
                           {                         
                              "title": "Kode Menu",
                              "description" :"",
                              "rowId": `kodemenu`
                           },
                           {                         
                              "title": "Vn Menu",
                              "description" :"",
                              "rowId": `vnmenu`
                           },
                           {                         
                              "title": "Tools Menu",
                              "description" :"",
                              "rowId": `toolsmenu`
                           },
                           {                         
                              "title": "Owner Menu",
                              "description" :"",
                              "rowId": `ownermenu`
                           },
                        ]
                     }],
 listType: 1
}
Ramdani.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:troli})
break

case 'downloadmenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, downloadmenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break
case 'asupanmenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, asupanmenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break
case 'stickermenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, stickermenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break
case 'kodemenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, kodemenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break
case 'vnmenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, vnmenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break
case 'toolsmenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, toolsmenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break
case 'ownermenu':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
Ramdani.sendMessage(from, ownermenu(gayamenu, prefix), MessageType.text, {quoted: troli})
break

case 'donasi':
case 'donate':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(`HALLO KAK, MAU DONASI?
• *PAYMENT*
*Gopay:* ${gopay}
*Dana:* ${dana}
*Ovo:* ${ovo}
*Pulsa:* ${pulsa}
*Qris:* ${urlqris}
*Saweria:* ${saweria}`)
break
//JADIBOT
case 'jadibot':
case 'jadibotwa':
case 'carajadibot':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(`*Jika ingin menjadi bot silahkan kunjungi channel YouTube Ramdani Official*\n*link* : https://youtube.com/c/RamdaniOfficial`)
break
//SOSMET
//YOUTUBE
case 'youtube':
case 'ytb':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(`*nih channel youtube owner, jan lupa subscribe ya*\nhttps://youtube.com/c/RamdaniOfficial`)
break
//INSTAGRAM
case 'intagram':
case 'ig':
case 'ige':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(`*nih Instagram owner, jan lupa follow ya*\nhttps://www.instagram.com/muhammadramdani196453`)
break
//OWNER/CREATOR
//OWNER
case 'owner':
case 'ownerbot': 
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
const vcard = 'BEGIN:VCARD\n'  
            + 'VERSION:3.0\n'  
            + `FN: ${namaowner}\n`  
            + `ORG:${namabot};\n` 
            + `TEL;type=CELL;type=VOICE;waid=${nomorowner}:+${nomorowner}\n`  
            + 'END:VCARD'  
  Ramdani.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
titid = 'Hallo kak, itu owner ku, jangan di ganggu ya\nbtw mau tau soal apa tentang owner ku?'
           sendButMessage(from, titid, `${wmtext}\n${Tanggal}`, [
          {buttonId: `ytb`, buttonText: { displayText: `YOUTUBE`, }, type: 1, },
          {buttonId: `ig`, buttonText: { displayText: `INSTAGRAM`, }, type: 1, },
]); 
                 break;
//INFO BOT 
case 'tes':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(`dah on bang`)
break
case 'runtime':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
freply(mess.wait)
teks = `*Botz Aktif Selama ${runtime(process.uptime())}*`
img = fs.readFileSync(`./media/picture/${randompoto}.jpg`)
footer = `${wmtext}`
but = [{ buttonId: `menu`, buttonText: { displayText: 'Menu' }, type: 1 },{ buttonId: `donasi`, buttonText: { displayText: 'Donasi' }, type: 1 }]
sendButImage(from, teks, footer, img, but, {quoted: troli})
break
case 'ping':
      case 'speed': 
       if (!isRegister) return freply(mess.regist)
       if (isBanned) return freply(mess.banned)
              timestampe = speed();
              latensie = speed() - timestampe
              freply(`「 *RAMDANI BOTZ* 」\nMerespon dalam ${latensie.toFixed(4)} Sec 💬`)
              break
      case 'botstat': 
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)
              groups = Ramdani.chats.array.filter(v => v.jid.endsWith('g.us'))
              privat = Ramdani.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
              ram2 = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
              charger = `${charging ? 'lagi dicas' : 'ga dicas'}`
              uptime = process.uptime();
              timestampe = speed();
              totalChat = await Ramdani.chats.all()
              latensie = speed() - timestampe
              total = math(`${groups.length}*${privat.length}`)
teks = `\`\`\`BOT STATISTICS\`\`\`
\`\`\`• Group Chats : ${groups.length}\`\`\`
\`\`\`• Private Chats : ${privat.length}\`\`\`
\`\`\`• Total Chats : ${totalChat.length}\`\`\`
\`\`\`• Speed : ${latensie.toFixed(4)} _Second_\`\`\`
\`\`\`• Active Time : ${kyun(uptime)}\`\`\`

\`\`\`PHONE STATISTICS\`\`\`
\`\`\`• Baterai : ${baterai}% ${charger}\`\`\`
\`\`\`• Ram Usage : ${ram2}\`\`\`
\`\`\`• Platform : ${os.platform()}\`\`\`
\`\`\`• Hostname : ${os.hostname()}\`\`\`
\`\`\`• Uptime : ${runtime(process.uptime())}\`\`\`
\`\`\`• Wa Version: ${Ramdani.user.phone.wa_version}\`\`\`
\`\`\`• Os Version: ${Ramdani.user.phone.os_version}\`\`\`
\`\`\`• Device Manufacturer: ${Ramdani.user.phone.device_manufacturer}\`\`\`
\`\`\`• Device Model: ${Ramdani.user.phone.device_model}\`\`\`
\`\`\`• Os Build Number: ${Ramdani.user.phone.os_build_number}\`\`\``
             freply(teks)
             break
//DOWNLOAD MENU
case 'play':
case 'playmp3':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
if (args.length < 1) return freply('Apa Yang Mau Dicari?')
teks = args.join(' ')
freply(mess.wait)
if (!teks.endsWith("-doc")){
res = await yts(`${teks}`).catch(e => {
freply('_[ ! ] Error Query Yang Anda Masukan Tidak Ada_')
})
freply(`┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAY*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`• Title : ${res.all[0].title}\`\`\`
\`\`\`• Type : MP3\`\`\`
\`\`\`• View : ${res.all[0].views}\`\`\`
\`\`\`• Link : https://youtu.be/${res.all[0].videoId}\`\`\`
\`\`\`• Size : 4GB\`\`\`
\`\`\`• Quality : 480p\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`)
res = await y2mateA(res.all[0].url).catch(e => {
freply('_[ ! ] Error Saat Memasuki Web Y2mate_')
})
sendFileFromUrl(res[0].link, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', filename: res[0].output})
}
break
case 'ytmp3':
            if (!isRegister) return freply(mess.regist)
            if (isBanned) return freply(mess.banned)
            if (args.length < 1) return freply('Link Nya Mana?')
            if(!isUrl(args[0]) && !args[0].includes('youtu')) return freply(mess.error.link)
            teks = args.join(' ')
            freply(mess.wait)
            res = await y2mateA(teks).catch(e => {
            freply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
            result = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`• Title : ${res[0].judul}\`\`\`
\`\`\`• Type : MP3\`\`\`
\`\`\`• Size : ${res[0].size}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`

            sendFileFromUrl(res[0].thumb, image, {caption: result, quoted: mek}).then((lalu) => {
            sendFileFromUrl(res[0].link, audio, {quoted: mek, mimetype: 'audio/mp4', filename: res[0].output})
})
break
     case 'ytmp4':
            if (!isRegister) return freply(mess.regist)
            if (isBanned) return freply(mess.banned)
            if (args.length < 1) return freply('Link Nya Mana?')
            if(!isUrl(args[0]) && !args[0].includes('youtu')) return freply(mess.error.link)
            teks = args.join(' ')
            freply(mess.wait)
            res = await y2mateV(teks).catch(e => {
            freply('_[ ! ] Error Gagal Memasuki Web Y2mate_')
})
            result = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`• Title : ${res[0].judul}\`\`\`
\`\`\`• Type : MP4\`\`\`
\`\`\`• Size : ${res[0].size}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`

            sendFileFromUrl(res[0].thumb, image, {caption: result, quoted: mek}).then((lalu) => {
            sendFileFromUrl(res[0].link, video, {quoted: mek, mimetype: 'video/mp4', filename: res[0].output})
})
break
case 'tiktok': 
case 'ttdl':
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!q) return freply('Linknya?')
             if (!q.includes('tiktok')) return freply(mess.error.Iv)
             freply(mess.wait)
             anu = await TiktokDownloader(`${q}`)
            .then((data) => { sendMediaURL(from, data.result.watermark) })
            .catch((err) => { freply(String(err)) })
             break
      case 'ttnowm': 
      case 'tiktoknowm':
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!q) return freply('Linknya?')
             if (!q.includes('tiktok')) return freply(mess.error.Iv)
             freply(mess.wait)
             anu = await TiktokDownloader(`${q}`)
            .then((data) => { sendMediaURL(from, data.result.nowatermark) })
            .catch((err) => { freply(String(err)) })
             break
      case 'ttaudio': 
      case 'tiktokmusic': 
      case 'tiktokaudio':
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (args.length == 0) return freply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
             ini_link = args[0]
             get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${lolhumanapi}&url=${ini_link}`)
             Ramdani.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
             break
case 'ttaudio2':
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned) 
             if (args.length == 0) return freply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
             ini_link = args[0]
             get_audio = await getBuffer(`http://hadi-api.herokuapp.com/api/tiktok?url=${ini_link}`)
             Ramdani.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
             break
case 'pinterest':
            if (!isRegister) return freply(mess.regist)
            if (isBanned) return freply(mess.banned)
            if(!q) return freply('gambar apa?')
            let pin = await hx.pinterest(q)
            let ac = pin[Math.floor(Math.random() * pin.length)]
            let di = await getBuffer(ac)
            await Ramdani.sendMessage(from,di,image,{quoted: troli, caption: `${done}`})
            break
      
//ASUPAN MENU
				case 'asupan1':
                if (!isRegister) return freply(mess.regist)
                if (isDewasa) return freply(mess.dewasa)
                if (isBanned) return freply(mess.banned)
			    Ramdani.updatePresence(from, Presence.composing) 
				freply(mess.wait)
				data = fs.readFileSync('./lib/asupan.js');
				jsonData = JSON.parse(data);
				randIndex = Math.floor(Math.random() * jsonData.length);
				danzKey = jsonData[randIndex];
				asupan = await getBuffer(danzKey.result)
				Ramdani.sendMessage(from, asupan, video, {quoted: mek, caption: '```ASUPAN NIH:V```'})
				break        
                case 'asupan2':
                if (!isRegister) return freply(mess.regist)
                if (isDewasa) return freply(mess.dewasa)
                if (isBanned) return freply(mess.banned)
			    Ramdani.updatePresence(from, Presence.composing) 
				freply(mess.wait)
				data = fs.readFileSync('./lib/asupan2.js');
				jsonData = JSON.parse(data);
				randIndex = Math.floor(Math.random() * jsonData.length);
				danzKey = jsonData[randIndex];
				asupan = await getBuffer(danzKey.result)
				Ramdani.sendMessage(from, asupan, video, {quoted: mek, caption: '```ASUPAN NIH:V```'})
				break 
              case 'ukhty':
              if (!isRegister) return freply(mess.regist)              
              if (isBanned) return freply(mess.banned)              
              freply(mess.wait)
              const ukhty = await getBuffer(`https://api-ramdaniofficial-docs.herokuapp.com/api/asupan/ukhty?apikey=${ramdaniapi}`)
              buttons = [{buttonId: `ukhty`,buttonText:{displayText: `➡️ NEXT`},type:1}]
              videoMsg = (await Ramdani.prepareMessageMedia(ukhty, "videoMessage", { thumbnail: ukhty, })).videoMessage
              buttonsMessage = {footerText:`${wmreply}`, videoMessage: videoMsg,
              contentText:`DONE`,buttons,headerType:5}
              prep = await Ramdani.prepareMessageFromContent(from,{buttonsMessage},{quoted: troli })
              Ramdani.relayWAMessage(prep)
              break
              case 'santuy':
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)              
              freply(mess.wait)
              const santuy = await getBuffer(`https://api-ramdaniofficial-docs.herokuapp.com/api/asupan/santuy?apikey=${ramdaniapi}`)
              buttons = [{buttonId: `santuy`,buttonText:{displayText: `➡️ NEXT`},type:1}]
              videoMsg = (await Ramdani.prepareMessageMedia(santuy, "videoMessage", { thumbnail: santuy, })).videoMessage
              buttonsMessage = {footerText:`${wmreply}`, videoMessage: videoMsg,
              contentText:`DONE`,buttons,headerType:5}
              prep = await Ramdani.prepareMessageFromContent(from,{buttonsMessage},{quoted: troli })
              Ramdani.relayWAMessage(prep)
              break
              case 'bocil':
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)              
              freply(mess.wait)
              const bocil = await getBuffer(`https://api-ramdaniofficial-docs.herokuapp.com/api/asupan/bocil?apikey=${ramdaniapi}`)
              buttons = [{buttonId: `bocil`,buttonText:{displayText: `➡️ NEXT`},type:1}]
              videoMsg = (await Ramdani.prepareMessageMedia(bocil, "videoMessage", { thumbnail: bocil, })).videoMessage
              buttonsMessage = {footerText:`${wmreply}`, videoMessage: videoMsg,
              contentText:`DONE`,buttons,headerType:5}
              prep = await Ramdani.prepareMessageFromContent(from,{buttonsMessage},{quoted: troli })
              Ramdani.relayWAMessage(prep)
              break
              case 'hijaber':
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)              
              freply(mess.wait)
              const hijaber = await getBuffer(`https://api-ramdaniofficial-docs.herokuapp.com/api/asupan/hijaber?apikey=${ramdaniapi}`)
              buttons = [{buttonId: `hijaber`,buttonText:{displayText: `➡️ NEXT`},type:1}]
              videoMsg = (await Ramdani.prepareMessageMedia(hijaber, "videoMessage", { thumbnail: hijaber, })).videoMessage
              buttonsMessage = {footerText:`${wmreply}`, videoMessage: videoMsg,
              contentText:`DONE`,buttons,headerType:5}
              prep = await Ramdani.prepareMessageFromContent(from,{buttonsMessage},{quoted: troli })
              Ramdani.relayWAMessage(prep)
              break
              case 'gheayuby':
			  case 'geayubi':              
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)
              freply(mess.wait)
              const geayubi = await getBuffer(`https://api-ramdaniofficial-docs.herokuapp.com/api/asupan/gheayubi?apikey=${ramdaniapi}`)
              buttons = [{buttonId: `caca`,buttonText:{displayText: `➡️ NEXT`},type:1}]
              videoMsg = (await Ramdani.prepareMessageMedia(geayubi, "videoMessage", { thumbnail: geayubi, })).videoMessage
              buttonsMessage = {footerText:`${wmreply}`, videoMessage: videoMsg,
              contentText:`DONE`,buttons,headerType:5}
              prep = await Ramdani.prepareMessageFromContent(from,{buttonsMessage},{quoted: troli })
              Ramdani.relayWAMessage(prep)
              break
              case 'rikagusriani':              
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)
              freply(mess.wait)
              const naura = await getBuffer(`https://api-ramdaniofficial-docs.herokuapp.com/api/asupan/rikagusriani?apikey=${ramdaniapi}`)
              buttons = [{buttonId: `aura`,buttonText:{displayText: `➡️ NEXT`},type:1}]
              videoMsg = (await Ramdani.prepareMessageMedia(naura, "videoMessage", { thumbnail: naura, })).videoMessage
              buttonsMessage = {footerText:`${wmreply}`, videoMessage: videoMsg,
              contentText:`DONE`,buttons,headerType:5}
              prep = await Ramdani.prepareMessageFromContent(from,{buttonsMessage},{quoted: troli })
              Ramdani.relayWAMessage(prep)
              break
//STICKER MENU
          case 'ttp':  
          if (!isRegister) return freply(mess.regist)
          if (isBanned) return freply(mess.banned)
          if (!c) return freply(`Teks Nya Mana Kak?\nContoh :\nttp Ramdani botz Whatsapp`)
          anuu = await getBuffer(`https://api.xteam.xyz/ttp?file&text=${c}`)
          Ramdani.sendMessage(from, anuu, image, {quoted: mek, caption : `sticker`})
          break
          case 'attp':
          if (!isRegister) return freply(mess.regist)
          if (isBanned) return freply(mess.banned)
          if (args.length == 0) return freply(`Example: ${prefix + command} Hai`)
          buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
          Ramdani.sendMessage(from, buffer, sticker, { quoted: mek })
          break
          case 'toimg':
              if (!isRegister) return freply(mess.regist)
              if (isBanned) return freply(mess.banned)
              if (!isQuotedSticker) return freply('reply stickernya')
              freply(mess.wait)
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await Ramdani.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return freply('Gagal, pada saat mengkonversi sticker ke gambar')
              buffer = fs.readFileSync(ran)
              Ramdani.sendMessage(from, buffer, image, {quoted: mek, caption: `${done}`})
              fs.unlinkSync(ran)
})
            break
            case 'gifstiker':
			case 's':
			case 'stickergif':  
			case 'sticker':
			case 'stiker':
            if (!isRegister) return freply(mess.regist)
            if (isBanned) return freply(mess.banned)
	        if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await Ramdani.downloadAndSaveMediaMessage(encmedia)
            ran = '666.webp'
            await ffmpeg(`./${media}`)
            .input(media)
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
             })
                .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                freply('error')
                })
                .on('end', function () {
                console.log('Finish')
                Ramdani.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                 fs.unlinkSync(media)
                fs.unlinkSync(ran)
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(ran)
                } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                const media = await Ramdani.downloadAndSaveMediaMessage(encmedia)
            ran = '999.webp'
            freply(mess.wait)
            await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
            console.log(`Error : ${err}`)
            fs.unlinkSync(media)
            tipe = media.endsWith('.mp4') ? 'video' : 'gif'
            freply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
            })
            .on('end', function () {
            console.log('Finish')
            Ramdani.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
            fs.unlinkSync(media)
            fs.unlinkSync(ran)
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(ran)
            } else {
                freply(`Kirim gambar dengan caption sticker\nDurasi Sticker Video 1-9 Detik`)
            }
            break
//KODE MENU
case 'bahasa':
                    if (!isRegister) return freply(mess.regist)
                    if (isBanned) return freply(mess.banned)
                    Ramdani.sendMessage(from, bahasa(), text, { quoted:troli })
                    break 
                    case 'kodenegara':
                    if (!isRegister) return freply(mess.regist)
                    if (isBanned) return freply(mess.banned)
					Ramdani.sendMessage(from, negara(), text)
					break

//VN MENU
                    case 'tts':
                    if (!isRegister) return freply(mess.regist)
                    if (isBanned) return freply(mess.banned)
				    if (args.length < 1) return Ramdani.sendMessage(from, 'Diperlukan kode bahasa kak!!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return Ramdani.sendMessage(from, 'Mana teks yang mau di jadiin suara? suara setan kah?', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 500
					? freply('Textnya kebanyakan setan!! 😤')
					: gtts.save(ranm, dtt, function() {
					exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buffer = fs.readFileSync(rano)
							if (err) return freply(ind.stikga())
							Ramdani.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break

//TOOLS MENU
case 'ssweb':
case 'ssurl':
case 'sslink':
case 'ss':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
if (args.length < 1) return freply('Urlnya nya mana om')
teks = q
anu = await fetchJson(`https://shot.screenshotapi.net/screenshot?&url=${teks}`)
buffungu = await getBuffer(anu.screenshot)
Ramdani.sendMessage(from, buffungu, image, {quoted: troli, caption : teks})
break
case 'tourl':
               if (!isRegister) return freply(mess.regist)
               if (isBanned) return freply(mess.banned)
               if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedVideo ) && args.length == 0) {
               freply(mess.wait)
               boij = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
               owgi = await Ramdani.downloadMediaMessage(boij)
               res = await uploadImages(owgi)
               freply(res)
               } else {
               freply('kirim/reply gambar/video')
}
               break
case 'togif':
               if (!isRegister) return freply(mess.regist)
               if (isBanned) return freply(mess.banned)
               if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
               freply(mess.wait)
               encmediaaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
               mediaaa = await Ramdani.downloadAndSaveMediaMessage(encmediaaa)
               a = await webp2gifFile(mediaaa)
               mp4 = await getBuffer(a.result)
               Ramdani.sendMessage(from, mp4, video, {mimetype: 'video/gif', quoted: mek, caption: mess.success})
               fs.unlinkSync(mediaaa)
               } else {
               freply(mess.error.format)
}
               break
        case 'tovideo':
               if (!isRegister) return freply(mess.regist)
               if (isBanned) return freply(mess.banned)
               if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
               freply(mess.wait)
               encmediaaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
               mediaaa = await Ramdani.downloadAndSaveMediaMessage(encmediaaa)
               a = await webp2gifFile(mediaaa)
               mp4 = await getBuffer(a.result)
               Ramdani.sendMessage(from, mp4, video, {mimetype: 'video/mp4', quoted: mek, caption: mess.success})
               fs.unlinkSync(mediaaa)
               } else {
               freply(mess.error.format)
}
               break
        case 'tomp3':
               if (!isRegister) return freply(mess.regist)
               if (isBanned) return freply(mess.banned)
               if (isQuotedVideo || isQuotedAudio){
               freply(mess.wait)
               encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
               media = await Ramdani.downloadAndSaveMediaMessage(encmedia)
               ran = getRandom('.mp3')
               exec(`ffmpeg -i ${media} ${ran}`, (err) => {
               fs.unlinkSync(media)
               if (err) return freply(`Err: ${err}`)
               buffer453 = fs.readFileSync(ran)
               Ramdani.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
               fs.unlinkSync(ran)
})
               } else {
               freply(mess.error.format)
}
               break
//OWNER MENU
case 'bc':
case 'broadcast': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!isOwner) return  freply(mess.only.ownerB)
             if (args.length < 1) return freply('teks?')
             anu = await Ramdani.chats.all()
             if (isMedia && !mek.message.videoMessage || isQuotedImage) {
             const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
             bc = await Ramdani.downloadMediaMessage(encmedia)
             for (let _ of anu) {
             Ramdani.sendMessage(_.jid, bc, image, {quoted:freply,caption: `*「 PESAN SIARAN BOT 」*\n\n${body.slice(4)}`})
}
             freply('Suksess broadcast')
             } else {
             for (let _ of anu) {
Ramdani.sendMessage(_.jid, 
			{"contentText": `*「 BROADCAST 」*\n ${body.slice(4)}`,
			"footerText": '© ʙʏ ʀᴀᴍᴅᴀɴɪ ᴏғғɪᴄɪᴀʟ',
			"buttons": [
			{"buttonId": `${prefix}menu`,
			"buttonText": {"displayText": "MENU"
			},"type": "RESPONSE"}
			], "headerType": 1,
			}, MessageType.buttonsMessage )
}
             freply('Suksess broadcast')
}
             break
case 'public':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
if (!isBot) return freply(mess.only.bot)
if (!isOwner) return freply(mess.only.ownerB)
publik = true
freply('*Sukses mengubah mode public*')
break
case 'self':
if (!isRegister) return freply(mess.regist)
if (isBanned) return freply(mess.banned)
if (!isBot) return freply(mess.only.bot)
if (!isOwner) return freply(mess.only.ownerB)
publik = false
freply('*Sukses mengubah mode self*')
break
case 'setppbot': 
                    if (!isRegister) return freply(mess.regist)
                    if (isBanned) return freply(mess.banned)
                    if (!isBot) return freply(mess.only.bot)
					if (!isOwner) return freply(mess.only.ownerb)
					Ramdani.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return freply(`Kirim gambar dengan caption ${prefix}setppbot atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Ramdani.downloadAndSaveMediaMessage(enmedia)
					await Ramdani.updateProfilePicture(botNumber, media)
					freply('Makasih profil barunya😗')
					break 
                    case 'ban':
                    case 'banned':
                    if (!isRegister) return freply(mess.regist)
                    if (isBanned) return freply(mess.banned)
                    if (!isBot) return freply(mess.only.bot)
					if (!isOwner) return freply(mess.only.ownerB)
					bnnd = body.slice(6)
					ban.push(`${bnnd}@s.whatsapp.net`)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					freply(`Nomor wa.me/${bnnd} telah dibanned !`)
	                break
                    case 'unban':
                    case 'unbanned':
                    if (!isRegister) return freply(mess.regist)
                    if (isBanned) return freply(mess.banned)
                    if (!isBot) return freply(mess.only.bot)
					if (!isOwner) return freply(mess.only.ownerB)
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					freply(`Nomor wa.me/${bnnd} telah di unban!`)
		break
        case 'd':
        case 'del':
        case 'delete': 
        if (!isRegister) return freply(mess.regist)
        if (isBanned) return freply(mess.banned)
        if (!isBot) return freply(mess.only.bot)
        if (!isOwner) return freply(mess.only.ownerB)
					Ramdani.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
case 'clearall': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!isOwner) return  freply(mess.only.ownerB)
             anu = await Ramdani.chats.all()
             Ramdani.setMaxListeners(25)
             for (let _ of anu) {
             Ramdani.deleteChat(_.jid)
}
             freply('Sukses delete all chat :)')
             break
             case 'exif': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!isOwner) return  freply(mess.only.ownerB)
             if (!q) return freply(mess.format)
             if (!arg.split('|')) return freply(`Penggunaan ${prefix}exif nama|author`)
             exif.create(arg.split('|')[0], arg.split('|')[1])
             freply('sukses')
             break      
      case 'join':  
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!q) return freply('Linknya?')
             if (!isOwner) return freply(mess.only.ownerB)
             if (!isUrl(args[0]) && !args[0].includes('https://chat.whatsapp.com/')) return freply('Linknya Invalid Tod')
             link = args[0].replace('https://chat.whatsapp.com/','')
             fak = Ramdani.query({ json: ['action', 'invite', link],
             expect200: true })
             freply('Berhasil Masuk Grup')
             break
case 'leaveall': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!isOwner) return  freply(mess.only.ownerB)
             let totalgroup = Ramdani.chats.array.filter(u => u.jid.endsWith('@g.us')).map(u => u.jid)
             for (let id of totalgroup) {
             sendMess(id, 'Byee', null)
             await sleep(3000)
             Ramdani.groupLeave(id)
}
             break
case 'eval': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             try {
             if (!isBot) return freply(mess.only.bot)
             if (!isOwner) return
             sy = args.join(' ')
             return eval(sy)
             } catch(e) {
             freply(`${e}`)
}
             break
case 'start': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!isOwner) return  freply(mess.only.ownerB)
             freply(`SEDANG MENGHIDUPKAN MESIN`)
             await sleep(3000)
             process.exit()
             break             
      case 'restart': 
             if (!isRegister) return freply(mess.regist)
             if (isBanned) return freply(mess.banned)
             if (!isOwner) return  freply(mess.only.ownerB)
             freply(mess.wait)
             exec(`node main`)
             freply('_Restarting Bot Success_')
             break
default:
if (budy.includes(`Assalamualaikum`)) {

                  freply(`Waalaikumsalam ${pushname}`)

                  }
                  if (budy.includes(`assalamualaikum`)) {

                  freply(`Waalaikumsalam ${pushname}`)

                  }
                  if (budy.includes(`ramdani`)) {

                  freply(`Ada Apa Manggil Tuan Ku?`)

                  }
}
if (budy.startsWith('x')){
try {
return Ramdani.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: mek})
} catch(err) {
e = String(err)
freply(e)
}
}  

	
if (isGroup && budy != undefined) {
	} else {
	console.log(color('[TEXT]', 'aqua'), 'Message From', color(sender.split('@')[0]))
	}		
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Message : %s', color(e, 'aqua'))
        }
	}
}