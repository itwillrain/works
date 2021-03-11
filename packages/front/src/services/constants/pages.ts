import { Route, Location } from 'vue-router'
import { Dictionary } from '@works/core'
export interface Page {
  name: string
  title: string
  role: 'public' | 'unauthenticated' | 'authenticated'
  layout: string
  query?: Dictionary<string | (string | null)[]>
  params?: Dictionary<string>
}
export const PAGES: Page[] = [
  {
    name: 'index',
    title: 'TOP',
    role: 'authenticated',
    layout: 'default',
  },
  {
    name: 'login',
    title: 'ログイン',
    role: 'unauthenticated',
    layout: 'auth',
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
const paramFilter = (page: Page): ((location: Location) => Location) => {
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
export function getPageTitle(route: Route) {
  return PAGES.find((page) => page.name === route.name)?.title ?? ''
}
