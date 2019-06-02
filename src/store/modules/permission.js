import { constantRouterList, asyncRouterMap } from '@/router'

/* Layout */
import Layout from '@/views/layout/Layout'

/**
 * 根据后台返回数据组装菜单
 * @param menus
 * @param first
 */
function assemblyRouter(menus, first) {
  const res = {}
  const menuConfig = asyncRouterMap[menus.path]
  if (!menuConfig && !first) {
    return
  }
  res.path = first ? '/' + menus.path : menus.path
  res.component = first ? Layout : menuConfig.component
  res.name = menus.name || menuConfig.name
  if (menuConfig && menuConfig.hidden) {
    res.hidden = menuConfig.hidden
  }
  res.meta = {
    title: menus.name || menuConfig.name,
    icon: menus.icon || 'xitongguanli'
  }
  return res
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, first) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    const menuMap = assemblyRouter(tmp, first)
    if (menuMap) {
      if (tmp.children) {
        menuMap.children = filterAsyncRouter(tmp.children, false)
        if (first) {
          menuMap.redirect = menuMap.path + '/' + tmp.children[0].path
        }
      }
      if (first && (!menuMap || !menuMap.children || menuMap.children.length === 0)) {
        return res
      }
      res.push(menuMap)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterList,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterList.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, menuList) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(menuList, true)
        const route404 = { path: '*', redirect: '/404', hidden: true }
        accessedRouters.push(route404)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
