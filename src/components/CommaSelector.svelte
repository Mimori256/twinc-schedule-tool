<script lang="ts">
  import checkValidHolidays from "../utils/checkValidHolidays";
  import {createEventDispatcher} from "svelte";

  let input: string = "";
  let isValidInput: boolean = true;

  const dispatch = createEventDispatcher();

  const handleTextChange = () => {
    isValidInput = checkValidHolidays(input);
    if (isValidInput) {
      dispatch("inputUpdate", {data: input.split(",")});
    }
  }


</script>

<input type="text" bind:value={input} on:input={handleTextChange} />
{#if !isValidInput}
  <div class="warning-section">
    <p class="warning">入力が不正です！</p>
  </div>
{/if}

<style>

  .warning-section {
    background-color: #f5f5f5;
    border-radius: 10px;
    border-color: red;
    width: 40%;
    margin:  auto;
  }

  .warning {
    color: red;
  }
</style>