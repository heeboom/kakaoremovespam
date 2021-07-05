
/*
 * Login using email, password using AuthApiClient.
 */

import { AuthApiClient, ChatBuilder, KnownChatType, MentionContent, ReplyContent, TalkClient, TalkOpenChannel } from 'node-kakao';
import { chat } from 'node-kakao/dist/packet';
require('dotenv').config();

// Supply env variables or replace to value.
const DEVICE_UUID = process.env['deviceUUID'] as string;
const DEVICE_NAME = process.env['deviceName'] as string;

const EMAIL = process.env['accountEmail'] as string;
const PASSWORD = process.env['accountPwd'] as string;

const CLIENT = new TalkClient();

CLIENT.on('chat', (data, channel) => { //channelList.open
  const sender = data.getSenderInfo(channel);
  if (!sender) return;



});

async function main() {
  const api = await AuthApiClient.create(DEVICE_NAME, DEVICE_UUID);
  const loginRes = await api.login({
    email: EMAIL,
    password: PASSWORD,

    // This option force login even other devices are logon
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await CLIENT.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
}


main().then();