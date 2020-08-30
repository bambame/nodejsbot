const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;


client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  else if(message.content == '!도움') {
  let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
  let commandList = [
      {name: ';;join', desc: '자신이 들어와있는 보이스 채널로 노래봇 참가시키기'},
      {name: ';;play', desc: '노래제목 검색 노래 플레이 하기'},
      {name: ';;play', desc: '1~5번호 검색해서 나온 5개 노래 중 선택하기 '},
      {name: ';;pause', desc: ' 노래 멈추게 하기'},
      {name: ';;unpause', desc: '멈췄던 노래 다시 재생'},
      {name: ';;skip', desc: ' 지금 재생중인 노래 스킵'},
      {name: ';;queue', desc: '재생 목록'},
      {name: ';;repeat all', desc: '전체 반복'},
      {name: ';;leave', desc: '노래봇 보이스채널에서 내보내기'},
      {name: ';;fwd 시간', desc: '뒤로 감기'},
      {name: ';;rew 시간', desc: '앞으로 감기'},
      {name: ';;seek 시간 ', desc: '특정 시간 재생'},
      {name: ';;restart', desc: '다시 듣기'},
      {name: ';;destroy ', desc: ' 리셋과 Fredboat 내보내기'},
      {name: '!청소 ', desc: ' !청소 (숫자) 입력 괄호안의 숫자는 삭제할 메세지 갯수'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
    .setAuthor('Help of 바미봇', helpImg)
    .setColor('#186de6')
    .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }
});

client.on('message', (message) => {
if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);