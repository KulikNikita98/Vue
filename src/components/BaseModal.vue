<template>
  <Teleport v-if="isOpen" to="#teleport-target">
    <div class="teleport-blackout"></div>
    <div class="teleport-modal" @click="onOutsideClick">
      <div ref="content" class="teleport-modal__content" >
        <button @click="closeModal" class="teleport-modal__close">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.teleport-blackout {
  z-index: 1010;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: #000;
}
.teleport-modal {
  z-index: 1010;
  overflow: auto;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.teleport-modal__content {
  position: relative;
  max-width: 1000px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 40px;
  background-color: #fff;
}

.teleport-modal__close {
  position: absolute;
  top: -1.25rem;
  right: -1.25rem;
  padding: 10px;
  line-height: 1;
}
</style>

<script>

let openedCount = 0;
let atleastOneOpen = null;

export default {
  props: {
    isOpen: { type: Boolean },
  },
  methods: {
    closeModal() {
      this.$emit('update:isOpen', false);
    },
    onOutsideClick($event) {
      if ($event.target !== this.$refs.content && $event.target.contains(this.$refs.content)) {
        this.$emit('update:isOpen', false);
      }
    },
    checkBlackoutState() {
      if (!openedCount) {
        atleastOneOpen = false;
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
      } else if (!atleastOneOpen && openedCount === 1) {
        atleastOneOpen = true;
        document.body.style.paddingRight = `${window.innerWidth
        - document.documentElement.clientWidth}px`;
        document.body.style.overflow = 'hidden';
      }
    },
  },
  watch: {
    isOpen: {
      handler(open) {
        if (open) {
          openedCount += 1;
        } else {
          openedCount -= 1;
        }
        this.checkBlackoutState();
      },
    },
  },
  created() {
    if (this.isOpen) {
      openedCount += 1;
      this.checkBlackoutState();
    }
  },
};
</script>
