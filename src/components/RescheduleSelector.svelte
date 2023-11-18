<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import {rescheduleSelectorValues} from "../stores/store";

  let date: Date | null;
  let replaceDay: string;
  let isValid: boolean = false;

  if ($rescheduleSelectorValues.length > 1) {
    date = $rescheduleSelectorValues[$rescheduleSelectorValues.length -2].date;
  }

  const dispatch = createEventDispatcher();

  const dayList = ["月", "火", "水", "木", "金", "土"];

  const checkValues = () => {
    if (!date || !replaceDay) {
      isValid = false;
    } else if (!dayList.includes(replaceDay)) {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  const handleDateChange = () => {
    checkValues();
    if (isValid) 
      dispatch("updateData", {"date": date, "replaceDay": replaceDay});
  }

  const handleReplaceDayChange = () => {
    checkValues();
    if (isValid)
      dispatch("updateData", {"date": date, "replaceDay": replaceDay});
  }
</script>

<div>
  日付
  <input type="date" bind:value={date} on:change={handleDateChange} />
  <input type="text" bind:value={replaceDay} placeholder="曜日(例:水)" on:input={handleReplaceDayChange}/>
  {#if !isValid}
    <p>無効な入力です</p>
  {/if}
</div>

<style>
  div {
    margin-bottom: 30px;
  }
</style>