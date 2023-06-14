import {NextApiRequest, NextApiResponse} from 'next';
import { showingdate } from '../../services/helpers';
import puppeteer from 'puppeteer';

const saveAsPdf = async(url:string,title:string,date:string) => {
  const browser = await puppeteer.launch({args:["--no-sandbox"]});
  const page = await browser.newPage();
  await page.goto(url,{waitUntil:'networkidle0'});
  const filename = "MOM - "+title+" ("+showingdate(date)+").pdf";
  const path = "../uploads/mom/"+filename;
  const result = await page.pdf({
    path:path,
    format:'A4'
  });
  // await browser.close();
}

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const { url,title,date } = req.query;

  try {

    const pdf = await saveAsPdf(url as string, title as string, date as string);
    return res.status(200).json({message:'Successfully'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error.response.data.message});
  }
}
