const puppeteer = require('puppeteer');

const urlAlvo = 'https://www.reclameaqui.com.br/busca/?q=itau';

async function extrai() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.goto(urlAlvo);
  await page.waitForSelector('#onetrust-accept-btn-container');
  await page.click('#onetrust-accept-btn-container');

  const reclamacoes = await page.$$eval('.complain-status-top > a[title]', (options) => options.map(

    (option) => `${option.innerText} : https://www.reclameaqui.com.br${option.getAttribute('href')}`,
  ));

  await browser.close();

  console.log(reclamacoes);
};

extrai();