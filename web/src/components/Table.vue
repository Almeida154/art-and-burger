<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import type { PropType } from 'vue';

export default defineComponent({
  data() {
    return {
      columnsLength: ['status', 'type'].some((condition) =>
        this.$props.columns.includes(condition)
      )
        ? this.$props.columns.length - 1
        : this.$props.columns.length,
    };
  },

  defineEmits: ['onItemClick'],

  props: {
    columns: {
      type: [] as PropType<string[]>,
      required: true,
    },
    items: {
      type: [] as PropType<any[]>,
      required: true,
    },
  },
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index" scope="col">
          {{ column }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, i) in items" :key="i" @click="$emit('onItemClick', item)">
        <td v-for="j in columnsLength" :key="j" :data-label="columns[j - 1]">
          {{
            columns[j - 1] !== 'id'
              ? item[columns[j - 1]]
              : `# ${item[columns[j - 1]].slice(0, 8)}...`
          }}
        </td>
        <td v-if="columns.includes('status')" class="status" data-label="Status">
          <span :class="item.status">{{ item.status }}</span>
        </td>
        <td v-if="columns.includes('type')" class="type" data-label="Type">
          <span :class="item.type">{{ item.type }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  width: 100%;
  table-layout: fixed;
}

table tr {
  display: flex;
  border-radius: 0.2rem;
}

table thead tr {
  background-color: var(--darker-container-color);
}

table tbody tr {
  cursor: pointer;
  outline: 1px solid var(--container-color);
  margin-top: 0.6rem;
  transition: background-color 0.3s ease;

  &:hover {
    outline: none;
    background-color: var(--darker-container-color);
  }
}

table tbody tr td span {
  text-transform: capitalize;
}

table tbody tr :where(td.status, td.type) span {
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  margin: 0;
}

table tbody tr td.status span.accepted {
  background: var(--info-color);
  color: var(--info-darker-color);
}

table tbody tr td.status span.pending {
  background: var(--warning-color);
  color: var(--warning-darker-color);
}

table tbody tr td.status span.done {
  background: var(--success-color);
  color: var(--success-darker-color);
}

table tbody tr td.type span.meat {
  background: var(--meat-color);
  color: var(--meat-darker-color);
}

table tbody tr td.type span.drink {
  background: var(--drink-color);
  color: var(--drink-darker-color);
}

table tbody tr td.type span.veggie {
  background: var(--veggie-color);
  color: var(--veggie-darker-color);
}

table th,
table td {
  flex: 1;
  padding: 1.4rem;
  text-align: center;
  font-weight: 300;
  color: var(--text-color);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

table th {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: var(--title-color);
}

@media screen and (max-width: 667px) {
  table thead {
    display: none;
  }

  table tbody tr {
    display: block;
    margin: 0;
    margin-bottom: 1rem;
  }

  table tbody td {
    border-bottom: 1px solid var(--container-color);
    display: block;
    font-size: 0.8rem;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
