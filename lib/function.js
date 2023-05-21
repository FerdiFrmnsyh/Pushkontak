const { proto, getContentType } = (await import("@adiwajshing/baileys"))
  .default;

export async function serialize(conn, m) {
  m.isGroup = m.key.remoteJid.endsWith("@g.us");
  try {
    const berak = Object.keys(m.message)[0];
    m.type = berak;
  } catch {
    m.type = null;
  }
  try {
    const context = m.message[m.type].contextInfo.quotedMessage;
    if (context["ephemeralMessage"]) {
      m.quotedMsg = context.ephemeralMessage.message;
    } else {
      m.quotedMsg = context;
    }
    m.isQuotedMsg = true;
    m.quotedMsg.sender = m.message[m.type].contextInfo.participant;
    m.quotedMsg.fromMe =
      m.quotedMsg.sender === conn.user.id.split(":")[0] + "@s.whatsapp.net"
        ? true
        : false;
    m.quotedMsg.type = Object.keys(m.quotedMsg)[0];
    let ane = m.quotedMsg;
    m.quotedMsg.chats =
      ane.type === "conversation" && ane.conversation
        ? ane.conversation
        : ane.type == "imageMessage" && ane.imageMessage.caption
        ? ane.imageMessage.caption
        : ane.type == "documentMessage" && ane.documentMessage.caption
        ? ane.documentMessage.caption
        : ane.type == "videoMessage" && ane.videoMessage.caption
        ? ane.videoMessage.caption
        : ane.type == "extendedTextMessage" && ane.extendedTextMessage.text
        ? ane.extendedTextMessage.text
        : ane.type == "buttonsMessage" && ane.buttonsMessage.contentText
        ? ane.buttonsMessage.contentText
        : "";
    m.quotedMsg.id = m.message[m.type].contextInfo.stanzaId;
  } catch {
    m.quotedMsg = null;
    m.isQuotedMsg = false;
  }

  try {
    const mention = m.message[m.type].contextInfo.mentionedJid;
    m.mentioned = mention;
  } catch {
    m.mentioned = [];
  }

  if (m.isGroup) {
    m.sender = m.participant;
  } else {
    m.sender = m.key.remoteJid;
  }
  if (m.key.fromMe) {
    m.sender = conn.user.id.split(":")[0] + "@s.whatsapp.net";
  }

  m.from = m.key.remoteJid;
  m.now = m.messageTimestamp;
  m.fromMe = m.key.fromMe;

  return m;
}

export async function smsg(conn, m, store) {
  if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
        if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = getContentType(quoted)
			m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
				type = getContentType(m.quoted)
				m.quoted = m.quoted[type]
			}
            if (typeof m.quoted === 'string') m.quoted = {
				text: m.quoted
			}
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
			m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
			if (!m.quoted.id) return false
			let q = await store.loadMessage(m.chat, m.quoted.id, conn)
 			return exports.smsg(conn, q, store)
            } 
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })

            /**
             * 
             * @returns 
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })

	   /**
		* 
		* @param {*} jid 
		* @param {*} forceForward 
		* @param {*} options 
		* @returns 
	   */
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
              *
              * @returns
            */
            m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
        }
    }
    if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
    /**
	* Reply to this message
	* @param {String|Object} text 
	* @param {String|false} chatId 
	* @param {Object} options 
	*/
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
    /**
	* Copy this message
	*/
	m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    return m
}
