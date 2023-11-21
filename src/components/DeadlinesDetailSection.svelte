<script lang="ts">
import deadlinesDetails from "../consts/deadlinesDetails";
import {deadlineValues} from "../stores/store"

export let nendo: number;

$: detailList = createDetail($deadlineValues)

const parseDate = (date: string) => {
  let month = parseInt(date.slice(0, 2));
  let day = parseInt(date.slice(2, 4));

  if (month < 4) {
    return `${nendo + 1}-${month}-${day}`;
  } else {
    return `${nendo}-${month}-${day}`;
  }
}

const createDetail = (deadlines: string[]) => {
  let detailList = [];
  for (let i=0; i<deadlines.length; i++) {
    detailList.push(deadlinesDetails[i] + ":  " + parseDate(deadlines[i]))
  }

  return detailList;
}

</script>

<div>
{#each detailList as detail}
  <p>{detail}</p>
{/each}
</div>

<style>
</style>