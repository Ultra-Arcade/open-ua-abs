<script lang="ts">
  import ArcadeBuilder from './components/ArcadeBuilder.svelte';
</script>

<main>
  <h1>Arcade Builder</h1>
  <ArcadeBuilder />
</main>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Arial, sans-serif;
}
h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}
</style>
