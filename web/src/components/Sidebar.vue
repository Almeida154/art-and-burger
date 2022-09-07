<script lang="ts">
import { defineComponent } from 'vue';
import VueFeather from 'vue-feather';

export default defineComponent({
  components: {
    VueFeather,
  },
  defineEmits: ['onCloseSidebar'],
  props: {
    title: String,
    subtitle: String,
    isOpen: Boolean,
  },
  methods: {
    closeSidebar() {
      const sidebar = document.querySelector('#sidebar');
      const sidebarOutside = document.querySelector('#sidebarOutside');

      if (sidebar && sidebarOutside) {
        sidebar.classList.remove('active');
        sidebarOutside.classList.remove('active');
      }

      this.$emit('onCloseSidebar');
    },

    openSidebar() {
      const sidebar = document.querySelector('#sidebar');
      const sidebarOutside = document.querySelector('#sidebarOutside');

      if (sidebar && sidebarOutside) {
        sidebar.classList.add('active');
        sidebarOutside.classList.add('active');
      }

      this.$emit('onOpenSidebar');
    },
  },
  watch: {
    isOpen: function (value) {
      value ? this.openSidebar() : this.closeSidebar();
    },
  },
});
</script>

<template>
  <div>
    <div class="sidebar" id="sidebar">
      <div class="header">
        <div class="header__container container">
          <vue-feather
            @click="closeSidebar"
            class="ic"
            type="arrow-left"
          ></vue-feather>
          <h5>{{ title }}</h5>
          <span>{{ subtitle }}</span>
        </div>
      </div>

      <div class="content">
        <div class="content__container container">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="sidebar-outside" id="sidebarOutside" @click="closeSidebar"></div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-outside {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;

  &.active {
    left: 0;
  }
}

.sidebar {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  width: 75%;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(27, 27, 27, 0.7))
  );
  backdrop-filter: blur(25px) saturate(180%);
  opacity: 0.7;
  transition: 0.5s ease-in-out;

  &.active {
    right: 0;
    opacity: 1;
  }

  @media (max-width: 456px) {
    width: 100%;
  }

  .header {
    background: var(--container-color);

    &__container {
      .ic {
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          color: var(--text-color);
        }
      }

      h5 {
        margin: 1rem 0;
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--title-color);
      }

      span {
        font-size: 1rem;
        font-weight: 300;
        color: var(--text-color);
      }
    }
  }
}

.container {
  margin: 0;
  padding: 2rem;
}
</style>
