import { Route, Location } from 'vue-router'
import { Dictionary } from '@works/core'
export interface Page {
  name: string
  title: string
  role: 'public' | 'unauthenticated' | 'authenticated'
  layout: string
  showDrawer?: boolean
  icon?: string
  query?: Dictionary<string | (string | null)[]>
  params?: Dictionary<string>
}

export const PAGES: Page[] = [
  {
    name: 'login',
    title: 'ログイン',
    role: 'unauthenticated',
    layout: 'single',
  },
  {
    name: 'index',
    title: 'HOME',
    role: 'authenticated',
    layout: 'default',
    showDrawer: false,
    icon: 'mdi-home',
  },
  {
    name: 'users',
    title: 'ユーザー管理',
    role: 'authenticated',
    layout: 'default',
    showDrawer: true,
    icon: 'mdi-account-circle',
  },
  {
    name: 'buildings-buildingId-masters',
    title: 'マスタ管理',
    role: 'authenticated',
    layout: 'default',
    showDrawer: true,
    icon: 'mdi-database',
  },
  {
    name: 'buildings-buildingId-histories',
    title: '利用履歴',
    role: 'authenticated',
    layout: 'default',
    showDrawer: true,
    icon: 'mdi-history',
  },
]

/**
 * 未認証ページ判定
 * @param {Route} route
 * @return {boolean}
 */
export function isUnauthenticatedOnly(route: Route): boolean {
  return PAGES.filter((page) => page.role === 'unauthenticated').some(
    (page) => page.name === route.name
  )
}
/**
 * 認証ページ判定
 * @param {Route} route
 * @return {boolean}
 */
export function isAuthenticatedOnly(route: Route): boolean {
  return PAGES.filter((page) => page.role === 'authenticated').some(
    (page) => page.name === route.name
  )
}

/**
 * PublicPage 判定
 * @param route
 * @return {boolean}
 */
export function isPublicRoute(route: Route): boolean {
  return PAGES.filter((page) => page.role === 'public').some(
    (page) => page.name === route.name
  )
}

/**
 * Pageからqueryを抽出
 * @param {Page} page
 * @return {() => Location}
 */
const queryFilter = (page: Page) => {
  return (location: Location) => {
    if (Object.prototype.hasOwnProperty.call(page, 'query')) {
      location.query = page.query
    }
    return location
  }
}
/**
 * Pageからparamsを抽出
 * @param {Page} page
 * @return {() => Location}
 */
const paramFilter = (page: Page) => {
  return (location: Location) => {
    if (Object.prototype.hasOwnProperty.call(page, 'params')) {
      location.params = page.params
    }
    return location
  }
}
/**
 * PageからLocation作成
 * @param {Page} page
 * @return {() => Location}
 */
export const generateLocation = (page: Page) => (location: Location) =>
  [paramFilter(page), queryFilter(page)].reduce(
    (location, filter) => filter(location),
    location
  )

/**
 * Set Layout
 * @param {Route} route
 * @return {string}
 */
export function setLayout(route: Route): string {
  const find = PAGES.find((page) => page.name === route.name)
  return find ? find.layout : 'default'
}

/**
 * Page名取得
 * @param {Route} route
 */
export function getPageTitle(route: Route): string {
  return PAGES.find((page) => page.name === route.name)?.title ?? ''
}

/**
 * drawerに表示するページを抽出
 * @return {Page[]}
 */
export function draweMenu(): Page[] {
  return PAGES.filter((page) => page.showDrawer)
}
