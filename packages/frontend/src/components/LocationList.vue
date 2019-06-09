<template>
  <v-card>
    <v-list two-line>
      <template v-for="location in locations">
        <v-list-tile :key="location.id" @click="() => $emit('locationSelected', location)">
          <v-list-tile-content>
            <v-list-tile-title v-html="location.name"></v-list-tile-title>
            <v-list-tile-sub-title>
              <v-chip color="#00818a" v-if="location.open">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                Open
              </v-chip>
              <v-chip color="#404b69" v-else>
                <v-avatar>
                  <v-icon>close</v-icon>
                </v-avatar>
                Closed
              </v-chip>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-card-text style="position: relative">
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="#00818a"
        @click="() => $emit('locationSelected', {})"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'LocationList',
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
