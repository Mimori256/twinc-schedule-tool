<script lang="ts">
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import DateSelectSection from './components/DateSelectSection.svelte';
  import HolidaySection from './components/HolidaySection.svelte';
  import RescheduleSection from './components/RescheduleSection.svelte';
  import DeadlineSection from './components/DeadlineSection.svelte';
  import {dateSelectorValues, holidayValues, rescheduleSelectorValues, deadlineValues} from "./stores/store"
  import createJSON from './lib/createJSON';

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  let nendo: number;

  if (currentMonth >= 4) {
    nendo = currentYear + 1;
  } else {
    nendo = currentYear;
  }

  const downloadObjectAsJson = (exportObj: any) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "schedule.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const handleButton = () => {
    console.log($dateSelectorValues)
    const res = createJSON($dateSelectorValues, $holidayValues, $rescheduleSelectorValues, $deadlineValues, nendo)
    downloadObjectAsJson(res);
    window.location.reload();
  }

</script>

<div>
  <Header />
  <p>{nendo}年度用のスケジュールを作成します</p>
  <DateSelectSection nendo={nendo} />
  <HolidaySection />
  <RescheduleSection />
  <DeadlineSection />
  <button on:click={handleButton}>作成</button>
  <hr />
  <Footer />
</div>

<style>
  hr {
    color: #fff;
  }

  button {
    margin-bottom: 10px;
  }
</style>
