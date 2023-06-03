export interface YouTubeAPi {
  config: Config
  data: Data
  headers: Headers2
  status: number
  statusText: string
  request: Request
}

interface Config {
  url: string
  method: string
  userAgentDirectives: UserAgentDirec[]
  headers: Headers
  params: Params
  retry: boolean
  responseType: string
}

interface UserAgentDirec {
  product: string
  version: string
  comment: string
}

interface Headers {
  'x-goog-api-client': string
  'Accept-Encoding': string
  'User-Agent': string
  Accept: string
}

interface Params {
  part: string
  id: string
  key: string
}

interface Data {
  kind: string
  etag: string
  items: Item[]
  pageInfo: PageInfo
}

interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  statistics: Statistics
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  categoryId: string
  liveBroadcastContent: string
  defaultLanguage: string
  localized: Localized
  defaultAudioLanguage: string
}

interface Thumbnails {
  default: Default
  medium: Medium
  high: High
  standard: Standard
  maxres: Maxres
}

interface Default {
  url: string
  width: number
  height: number
}

interface Medium {
  url: string
  width: number
  height: number
}

interface High {
  url: string
  width: number
  height: number
}

interface Standard {
  url: string
  width: number
  height: number
}

interface Maxres {
  url: string
  width: number
  height: number
}

interface Localized {
  title: string
  description: string
}

interface Statistics {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

interface Headers2 {
  'alt-svc': string
  'cache-control': string
  connection: string
  'content-encoding': string
  'content-type': string
  date: string
  server: string
  'transfer-encoding': string
  vary: string
  'x-content-type-options': string
  'x-frame-options': string
  'x-xss-protection': string
}

interface Request {
  responseURL: string
}
