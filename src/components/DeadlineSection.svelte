<script lang="ts">
  import CommaSelector from "./CommaSelector.svelte";
  import {deadlineValues} from "../stores/store";

  interface InputUpdateProps {
    data: string[];
  }

  const handleInputUpdate = (props: CustomEvent<InputUpdateProps>) => {
    let {data} = props.detail;
    deadlineValues.update((value: string[]) => value = data); 
  }

</script>

<div>
  <p>春Aの事前登録締切日、春Aの履修登録締切日、春Bの事前登録締切日...とカンマ区切りで順に入力</p>
  <p>月と日を合わせて、計4文字の半角数字で入力してください (例: 1月13日 → 0113,...)</p>
  <CommaSelector on:inputUpdate={handleInputUpdate}/>
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