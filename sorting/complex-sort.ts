const fetch = (await import('node-fetch')).default;
import test from './test.json' assert{type: "json"};;
type stringByString = { [key: string]: string; };
type stringByNumber = { [key: string]: number; };
const dayMap: stringByString = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};
const dayDictionary: stringByNumber = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};
const sortDays = (a: string, b: string) => {
  let day1 = a.toLowerCase();
  let day2 = b.toLowerCase();
  return dayDictionary[day1] - dayDictionary[day2];
}
const formatDays = (days: any) => {
  return Object.keys(days).filter((k: string) => days[k]).map((k: string) => {
    return dayMap[k];
  });
}

export const fetchData = async () => {
  const result = await fetch('https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsJson?OrgID=524744&Cat2=Private&Session=22/23%20School%20Year%20(Sept-June)');
  const json: any = await result.json();
  // const json = test;
  const formatted = json.rows.map((c: any) => {
    c.meeting_days = formatDays(c.meeting_days);
    c.meeting_days = c.meeting_days.sort(sortDays);
    return {
      name: c.name,
      meeting_days: c.meeting_days,
      formatted_meeting_days: c.meeting_days.join(', '),
      reg_start_date: c.reg_start_date,
      start_date: c.start_date,
      end_date: c.end_date,
    };
  });
  return formatted
    .sort((a: any, b: any) => {
      let day1 = a.meeting_days[0].toLowerCase();
      let day2 = b.meeting_days[0].toLowerCase();
      const dateCompare = Date.parse(b.reg_start_date) - Date.parse(a.reg_start_date);
      const daysCompare = dayDictionary[day1] - dayDictionary[day2];
      // console.log(dateCompare, daysCompare);
      return dateCompare || daysCompare;
    });
}