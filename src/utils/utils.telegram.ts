import axios from 'axios'

export function send_message(message: string, chat_id: string) {
  const encoded_message = encodeURIComponent(message)
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${encoded_message}&parse_mode=Markdown`
  return axios.post(url)
}
