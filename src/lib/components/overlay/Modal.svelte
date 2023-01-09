<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'

  const dispatch = createEventDispatcher()
  const close = () => dispatch('close')

  let modal: any
  export let backgroundColor: string = '#3F589E'

  const handle_keydown = (e: any) => {
    if (e.key === 'Escape') {
      close()
      return
    }

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*')
      const tabbable: any = Array.from(nodes).filter((n: any) => n.tabIndex >= 0)

      let index = tabbable.indexOf(document.activeElement)
      if (index === -1 && e.shiftKey) index = 0

      index += tabbable.length + (e.shiftKey ? -1 : 1)
      index %= tabbable.length

      tabbable[index].focus()
      e.preventDefault()
    }
  }

  const previously_focused: any =
    typeof document !== 'undefined' && document.activeElement

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus()
    })
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-background" on:click={close} />

<div class="modal rounded-2xl bg-slate-200" style="background-color: {backgroundColor}" role="dialog" aria-modal="true" bind:this={modal}>
  <!-- svelte-ignore a11y-autofocus -->
  <slot name="header" />
  <!-- <hr /> -->
  <slot />
  <!-- <hr /> -->
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
  }
</style>
