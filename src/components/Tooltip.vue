<template>
  <div class="tooltip-container">
    <div class="tooltip-text">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'placement']
}
</script>

<style>
.tooltip-parent .tooltip-container {
  display: none;
}
.tooltip-parent:hover .tooltip-container {
  display: block;
}

.tooltip-parent {
  position: relative;
}
</style>

<style scoped>
  .tooltip-container {
    background: rgba(20, 20, 20, 0.9);
    color: white;
    position: absolute;
    top:-2rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: .2rem;
  }
  .tooltip-text {
    font-family: Helvetica;
    padding: 5px;
    font-size: .9rem;
    word-wrap: break-word;
  }

  .tooltip-container .tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
</style>
