<script lang="ts">
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import DateSelectSection from './components/DateSelectSection.svelte';
  import HolidaySection from './components/HolidaySection.svelte';
  import {dateSelectorValues, holidayValues} from "./stores/store"

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  let nendo: number;

  if (currentMonth >= 4) {
    nendo = currentYear + 1;
  } else {
    nendo = currentYear;
  }

  dateSelectorValues.subscribe((value: any) => {
    console.log(value)
  })

  holidayValues.subscribe((value: any) => {
    console.log(value)
  })

</script>

<div>
  <Header />
  <p>{nendo}年度用のスケジュールを作成します</p>
  <DateSelectSection nendo={nendo} />
  <HolidaySection />
  <hr />
  <Footer />
</div>

<style>
  hr {
    color: #fff;
  }
</style>
