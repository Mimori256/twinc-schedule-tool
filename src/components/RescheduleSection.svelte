<script lang="ts">
  import {onMount} from "svelte";
  import RescheduleSelector from "./RescheduleSelector.svelte";
  import {rescheduleSelectorValues} from "../stores/store"
  import type {RescheduleData} from "../types/RescheduleData"
  let selectors = [{}]; // Array to keep track of the selectors

  const nullData: RescheduleData = {
    date: null,
    replaceDay:null 
  }

  const addSelector = () => {
    selectors = [...selectors, {}]; // Add a new selector
    rescheduleSelectorValues.update((value: any) => {
      value.push(nullData)
      return value;
    })
  }

  const removeSelector = () => {
    if (selectors.length > 1) {
      selectors = selectors.slice(0, -1); // Remove the last selector
    } else {
      alert("振替は最低一つ必要です");
    }
  }

  const updateData = (e: CustomEvent<RescheduleData>, index: number) => {
    const data = e.detail;
    rescheduleSelectorValues.update((value: RescheduleData[]) => {
      value[index] = data;
      return value;
    })
  }

  rescheduleSelectorValues.subscribe((value: any) => {
    console.log(value)
  })
  
  onMount (() => {
    rescheduleSelectorValues.update((value: any) => value = [nullData])
  })
</script>

<div>
  <p>振替がある日と、その日が何曜日授業になるか入力してください</p>
  {#each selectors as _, index}
    <RescheduleSelector on:updateData={e => updateData(e, index)}/>
  {/each}
  <div>
    <button on:click={addSelector}>Add</button>
    <button on:click={removeSelector}>Remove</button>
  </div>
</div>

<style>
  div {
    background-color: #114ea0;
    border-radius: 10px;
    width: 40%;
    margin: 40px auto;
    padding: 1rem;
  }
</style>