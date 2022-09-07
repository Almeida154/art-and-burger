<script lang="ts">
import { defineComponent } from 'vue';
import VueFeather from 'vue-feather';

export default defineComponent({
  components: {
    VueFeather,
  },
  defineEmits: ['onCloseModal'],
  props: {
    title: String,
    subtitle: String,
    isOpen: Boolean,
  },
  methods: {
    closeModal() {
      const modal = document.querySelector('#modal');
      const modalOutside = document.querySelector('#modalOutside');

      if (modal && modalOutside) {
        modal.classList.remove('show');
        modalOutside.classList.remove('show');

        setTimeout(() => {
          modal.classList.remove('active');
          modalOutside.classList.remove('active');
        }, 200);
      }

      this.$emit('onCloseModal');
    },

    openModal() {
      const modal = document.querySelector('#modal');
      const modalOutside = document.querySelector('#modalOutside');

      if (modal && modalOutside) {
        modal.classList.add('active');
        modalOutside.classList.add('active');

        setTimeout(() => {
          modal.classList.add('show');
          modalOutside.classList.add('show');
        }, 10);
      }

      this.$emit('onOpenModal');
    },
  },
  watch: {
    isOpen: function (value) {
      value ? this.openModal() : this.closeModal();
    },
  },
});
</script>

<template>
  <div>
    <div class="modal" id="modal">
      <div class="header">
        <div class="header__container container">
          <div>
            <h5>{{ title }}</h5>
            <span>{{ subtitle }}</span>
          </div>
          <vue-feather @click="closeModal" class="ic" type="x"></vue-feather>
        </div>
      </div>

      <div class="content">
        <div class="content__container container">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="modal-outside" id="modalOutside" @click="closeModal"></div>
  </div>
</template>

<style lang="scss" scoped>
.modal-outside {
  z-index: 999;
  position: fixed;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(10, 10, 10, 0.4))
  );
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  backdrop-filter: blur(5px) saturate(180%);
  opacity: 0;
  transition: 0.2s ease-in-out;
  display: none;

  &.active {
    display: block;
  }

  &.show {
    opacity: 1;
  }
}

.modal {
  z-index: 1000;
  position: fixed;
  top: 10%;
  bottom: 10%;
  right: 15%;
  left: 15%;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(27, 27, 27, 0.7))
  );
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 0.4rem;
  overflow: hidden;
  display: none;
  opacity: 0;
  transition: 0.2s ease-in-out;

  &.active {
    display: block;
  }

  &.show {
    opacity: 1;
  }

  @media (max-width: 456px) {
    width: 100%;
  }

  .header {
    background: var(--container-color);

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ic {
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          color: var(--text-color);
        }
      }

      h5 {
        margin-bottom: 0.4rem;
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
  padding: 1.6rem;
}
</style>
