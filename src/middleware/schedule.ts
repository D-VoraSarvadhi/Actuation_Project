import { scheduleJob } from 'node-schedule';

import Items from '../models/sellerModel';
import { DATE, TIMESTAPS } from '../utils/dateFormate';
import moment from 'moment';

export default ()=>{
  const DT:any = new Date('2023-08-15 16:02:00');
  console.log(DT);
  scheduleJob('32 4 * * *',async ()=>{
    console.log('here1');
    const time = moment(new Date()).format('DD-MM-YYYY hh:mm:ss');
    console.log(time);

  });
};
// console.log(activeAuction);
// const activeAuction = await Items.findOne({ where: {
//   startTime: date
// }});