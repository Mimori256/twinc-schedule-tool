<script lang="ts">
  import type { Module } from "../types/Module";
  import {createEventDispatcher} from "svelte";

  export let nendo: number
  export let module: Module

  let dateSelections: any
  let selectedDate: string 
  let dateMessage: string

  const dispatch = createEventDispatcher()

  switch(module) {
    case "SA":
        selectedDate = `${nendo}-04-10`
        dateMessage = "春A開始日"
        break;
    case "SB":
        selectedDate = `${nendo}-05-20`
        dateMessage = "春B開始日"
        break;
    case "SC":
        selectedDate = `${nendo}-07-01`
        dateMessage = "春C開始日"
        break;
    case "FA":
        selectedDate = `${nendo}-10-01`
        dateMessage = "秋A開始日"
        break;
    case "FB":
        selectedDate = `${nendo}-11-10`
        dateMessage = "秋B開始日"
        break;
    case "FC":
        selectedDate = `${nendo + 1}-01-05`
        dateMessage = "秋C開始日"
        break;
    case "SAE":
        selectedDate = `${nendo}-05-20`
        dateMessage = "春A終了日"
        break;
    case "SBE":
        selectedDate = `${nendo}-07-01`
        dateMessage = "春B終了日"
        break;
    case "SCE":
        selectedDate = `${nendo}-08-01`
        dateMessage = "春C終了日"
        break;
    case "FAE":
        selectedDate = `${nendo}-11-10`
        dateMessage = "秋A終了日"
        break;
    case "FBE":
        selectedDate = `${nendo}-12-25`
        dateMessage = "秋B終了日"
        break;
    case "FCE":
        selectedDate = `${nendo + 1}-02-14`
        dateMessage = "秋C終了日"
        break;
    case "SABCE":
        selectedDate = `${nendo}-08-14`
        dateMessage = "春ABC終了日"
        break;
    case "FABCE":
        selectedDate = `${nendo + 1}-02-14`
        dateMessage = "秋ABC終了日"
        break;
  }

  const handleDateChange = () => {
    dispatch("dateChange", {module: module, date: new Date(selectedDate), dateSelections: dateSelections})
  }
</script>

<div>
  <label for={module}>{dateMessage}を入力</label>
  <input type="date" id={module} value={selectedDate} on:change={handleDateChange} />
</div>

<style>
  input {
    margin: 10px 0;
  }
</style>