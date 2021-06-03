<template lang="pug">
ul.list-group.list-group-horizontal
  li.list-group-item.border-0.bg-transparent
    router-link(to="/popular") Popular
  li.list-group-item.border-0.bg-transparent
    router-link(to="/now-playing") Now Playing
  li.list-group-item.border-0.bg-transparent
    router-link(to="/upcoming") Upcoming
  li.list-group-item.border-0.bg-transparent
    router-link(to="/top-rated") Top Rated
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style lang="scss" scoped>
$acid-green: #00FC77;
$acid-green-darker: #009948;

a {
  color: $acid-green-darker;
  text-decoration: none;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
}

a:hover {
  color: $acid-green;
}

.router-link-active {
  color: $acid-green;
}
</style>