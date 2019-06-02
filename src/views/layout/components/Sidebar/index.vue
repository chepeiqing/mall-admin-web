<template>
  <scroll-bar>
    <el-menu
      :default-active="activeMenu"
      :show-timeout="200"
      :collapse="isCollapse"
      collapse-transition
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.uri" :item="route" :base-path="route.uri"/>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'

  export default {
    components: { SidebarItem, ScrollBar },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      routes() {
        return this.$store.getters.menus
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
