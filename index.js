import axios from "axios";
import moment from "moment";
import Audic from "audic";

const audic = new Audic("audio.mp3");
audic.volume = 1;
audic.loop = true;

const minutes = 1,
  REFRESH_TIME = minutes * 60 * 1000;

const refreshId = setInterval(async () => {
  fullRun();
}, REFRESH_TIME);

async function fullRun() {
  logTime();

  const { data } = await axios.get(
    "https://sto.imi.gov.my/STO/availabledate.php?slotku=16&urusku=1290"
  );
  if (!data.includes("NO AVAILABLE DATE")) {
    clearInterval(refreshId);
    console.log(data);
    await audic.play();
  } else {
    // test here
  }
}

fullRun();

function logTime() {
  console.log("-------------------------------------------------------");
  console.log(`Running Now: ${moment().format("DD MMM YYYY h:mmA")}`);
  console.log(
    `Next Run: ${moment()
      .add({ minutes: minutes })
      .format("DD MMM YYYY h:mmA")}`
  );
  console.log("-------------------------------------------------------");
}
