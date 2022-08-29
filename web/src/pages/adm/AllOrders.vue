<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

import VueFeather from 'vue-feather';

import Navbar from '../../components/Navbar.vue';
import PageHeader from '../../components/PageHeader.vue';
import Tag from '../../components/Tag.vue';

import api from '../../services/api';
import Button from '../../components/Button.vue';

type Status = {
  id: number;
  desc: string;
};

export default defineComponent({
  data() {
    return {
      statuses: [] as Status[],
    };
  },

  async created() {
    const { data } = await api.get<{ statuses: Status[] }>('status');
    this.statuses = data.statuses;
  },

  components: {
    Navbar,
    PageHeader,
    Tag,
    Button,
    VueFeather,
  },
});
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar adm />
    </header>

    <div class="all-orders">
      <div class="all-orders__container container">
        <PageHeader
          :title="'All Orders, Admin '"
          :path="'ArtNBurger > Adm > All Orders'"
        />

        <div class="filters">
          <div class="tags">
            <Tag v-for="status in statuses" :key="status.id" :text="status.desc" />
          </div>

          <div class="update-container">
            <a class="update">
              <vue-feather type="refresh-ccw" size="1rem"></vue-feather>
            </a>
          </div>
        </div>

        <div class="orders-list">
          <table>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Total</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td data-label="Code">
                  # {{ '06a1356c-0bc7-42c1-81b9-5eedb8d249ef'.slice(0, 8) }}...
                </td>
                <td data-label="Total">R$ 260,00</td>
                <td data-label="Date">29/08/22</td>
                <td class="status" data-label="Status">
                  <span class="accepted">Accepted</span>
                </td>
              </tr>

              <tr>
                <td data-label="Code">
                  # {{ '06a1356c-0bc7-42c1-81b9-5eedb8d249ef'.slice(0, 8) }}...
                </td>
                <td data-label="Total">R$ 260,00</td>
                <td data-label="Date">29/08/22</td>
                <td class="status" data-label="Status">
                  <span class="pending">Pending</span>
                </td>
              </tr>

              <tr>
                <td data-label="Code">
                  # {{ '06a1356c-0bc7-42c1-81b9-5eedb8d249ef'.slice(0, 8) }}...
                </td>
                <td data-label="Total">R$ 260,00</td>
                <td data-label="Date">29/08/22</td>
                <td class="status" data-label="Status">
                  <span class="done">Done</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 6rem;
}

.all-orders {
  padding-top: 2rem;

  &__container {
    .filters {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags {
        display: flex;
        gap: 0.4rem;
      }

      .update-container {
        .update {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: var(--accent-color);
          padding: 0.6rem;
          border-radius: 0.4rem;
          cursor: pointer;
          color: var(--title-color);

          &:hover {
            background: var(--darker-accent-color);
          }
        }
      }
    }

    .orders-list {
      margin-top: 2rem;

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

      table tbody tr td.status span {
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

      table th,
      table td {
        flex: 1;
        padding: 1.4rem;
        text-align: center;
        font-weight: 300;
        color: var(--text-color);
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
    }
  }
}
</style>
