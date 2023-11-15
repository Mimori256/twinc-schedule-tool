<script lang="ts">
  import HolidaySelector from "./HolidaySelector.svelte";
  import {holidayValues} from "../stores/store";

  interface InputUpdateProps {
    data: string[];
  }

  const handleInputUpdate = (props: CustomEvent<InputUpdateProps>) => {
    let {data} = props.detail;
    holidayValues.update((value: string[]) => value = data); 
  }
</script>

<div>
  <p>祝日、授業がない日をカンマ区切りで入力してください</p>
  <p>月と日を合わせて、計4文字の半角数字で入力してください (例: 1月13日 → 0113,...)</p>
  <HolidaySelector on:inputUpdate={handleInputUpdate}/>
</div>

<style>
  div {
    background-color: #114ea0;
    border-radius: 10px;
    width: 40%;
    margin:  auto;
    padding: 1rem;
  }
</style>