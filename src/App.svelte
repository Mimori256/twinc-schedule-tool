<script lang="ts">
  import Header from './components/Header.svelte';
  import DateSelectSection from './components/DateSelectSection.svelte';
  import {dateSelectorValues} from "./stores/store"

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

</script>

<div>
  <Header />
  <p>{nendo}年度用のスケジュールを作成します</p>
  <DateSelectSection nendo={nendo} />
</div>

<style>
</style>
