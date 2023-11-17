<script lang="ts">
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import DateSelectSection from './components/DateSelectSection.svelte';
  import HolidaySection from './components/HolidaySection.svelte';
  import RescheduleSection from './components/RescheduleSection.svelte';
  import {dateSelectorValues, holidayValues, rescheduleSelectorValues} from "./stores/store"
  import createJSON from './lib/createJSON';

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  let nendo: number;

  if (currentMonth >= 4) {
    nendo = currentYear + 1;
  } else {
    nendo = currentYear;
  }

  const handleButton = () => {
    console.log($dateSelectorValues)
    createJSON($dateSelectorValues, $holidayValues, $rescheduleSelectorValues, nendo)
  }

  dateSelectorValues.subscribe((value: any) => {
  })

  holidayValues.subscribe((value: any) => {
  })

  rescheduleSelectorValues.subscribe((value: any) => {
    console.log(value)
  })

</script>

<div>
  <Header />
  <p>{nendo}年度用のスケジュールを作成します</p>
  <DateSelectSection nendo={nendo} />
  <HolidaySection />
  <RescheduleSection />
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
