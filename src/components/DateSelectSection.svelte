<script lang="ts">
  import DateSelector from './DateSelector.svelte';
  import dateSelector from '../consts/dateSelections'
  import {dateSelectorValues} from "../stores/store"

  export let nendo: number;
  let dateSelections: any = {};
  let dateSectionValues: any;

  interface DateSelectorProps {
    module: string;
    date: Date;
  }

  const handleDateChange = (props: CustomEvent<DateSelectorProps>) => {
    let { module, date} = props.detail;
    dateSelections[module] = date;
    dateSelectorValues.update((value: any) => value = dateSelections)
  }

</script>

<div>
  <p>それぞれの最初の開始日、終了日を入力</p>
  {#each dateSelector as module}
    <DateSelector nendo={nendo} module={module} on:dateChange={handleDateChange} />
  {/each}
</div>

<style>
  div {
    background-color: #114ea0;
    border-radius: 10px;
    width: 40%;
    margin:  40px auto;
    padding: 1rem;
  }
</style>