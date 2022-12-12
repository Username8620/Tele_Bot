const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const text = require('./const');


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.replyWithHTML("добрый"));
bot.launch();

bot.command("go", async (ctx) => {
  try {
    await ctx.replyWithHTML('<b>Выберай свой путь</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Путь 1', 'btn_1'), Markup.button.callback('Путь 2', 'btn_2')],
        ]
    ))
  } catch(e) {
    console.error(e)
  }
})

function addActionBot(name, src, text) {

bot.action(name, async (ctx) => {
  try{
    if(src !== false) {
      await ctx.replyWithPhoto({
        source: src
      })
    }
  await  ctx.replyWithHTML(text,{

    })
  } catch (e) {
    console.error(e)
  }
})
}

addActionBot('btn_1', "./workspaces/codespaces-blank/img/1.jpg", text.text1)
addActionBot('btn_2',false, text.text2)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
