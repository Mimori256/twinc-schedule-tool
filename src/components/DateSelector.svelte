<script lang="ts">
  import type { Module } from "../types/Module";
  import {createEventDispatcher} from "svelte";
  import {dateSelectorValues} from "../stores/store"

  export let nendo: number
  export let module: Module

  let dateSelections: any
  let dateMessage: string
  let selectedDate: string 
  const dispatch = createEventDispatcher()

  switch(module) {
    case "beginSpringA":
        selectedDate = `${nendo}-04-10`
        dateMessage = "春A開始日"
        break;
    case "beginSpringB":
        selectedDate = `${nendo}-05-20`
        dateMessage = "春B開始日"
        break;
    case "beginSpringC":
        selectedDate = `${nendo}-07-01`
        dateMessage = "春C開始日"
        break;
    case "beginFallA":
        selectedDate = `${nendo}-10-01`
        dateMessage = "秋A開始日"
        break;
    case "beginFallB":
        selectedDate = `${nendo}-11-10`
        dateMessage = "秋B開始日"
        break;
    case "beginFallC":
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
    case "springABCEndDate":
        selectedDate = `${nendo}-08-14`
        dateMessage = "春ABC終了日"
        break;
    case "fallABCEndDate":
        selectedDate = `${nendo + 1}-02-14`
        dateMessage = "秋ABC終了日"
        break;
  }

  dateSelectorValues.update((value: any) => { value[module] = new Date(selectedDate)
    return value
  })

  const handleDateChange = (event: Event) => {
     const newDate = (event.target as HTMLInputElement).value;
    dateSelectorValues.update((value: any) => { value[module] = new Date(newDate);
      return value
    })
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