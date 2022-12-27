import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
 
import { atcb_action } from 'add-to-calendar-button';

const Example = () => {
  
  
  return (
    <div style={{backgroundColor:"white"}} onClick={e => {
      e.preventDefault();
      atcb_action({
        name: "My Name",
        startDate: "2022-10-14",
        endDate: "2022-10-18",
        options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
        timeZone: "Europe/Berlin",
        iCalFileName: "Reminder-Event",
      });
    }}>A
    </div>
  );
}

export default Example