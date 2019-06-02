<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <app-link :to="resolvePath(onlyOneChild.uri)">
        <el-menu-item :index="resolvePath(onlyOneChild.uri)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.children" :icon="onlyOneChild.icon||item.icon" :title="onlyOneChild.name" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.uri)">
      <template slot="title">
        <item v-if="item.children" :icon="item.icon" :title="item.name" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />

        <app-link v-else :to="resolvePath(child.uri)" :key="child.name">
          <el-menu-item :index="resolvePath(child.uri)">
            <item v-if="child.children" :icon="child.icon" :title="child.name" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
  import path from 'path'
  import { isExternal } from '@/utils'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            this.onlyOneChild = item
            return true
          }
        })

        if (showingChildren.length === 1) {
          return true
        }

        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }
        return false
      },
      resolvePath(routePath) {
        if (this.isExternalLink(routePath)) {
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      },
      isExternalLink(routePath) {
        return isExternal(routePath)
      }
    }
  }
</script>
