import Document, { Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import htmlescape from 'htmlescape'
const { STAGE, GOOGLE_CLOUD_PROJECT, API_DOMAIN } = process.env
const env = { STAGE, GOOGLE_CLOUD_PROJECT, API_DOMAIN }

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }
  render () {
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>Default Page Title</title>
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no height=device-height' />
          <meta name='description' content='Default Page Description' />
          {/* add external styles,fonts, and other header-loaded items here
          <link rel='shortcut icon' type='image/x-icon' href='/static/assets/favicon.ico' />
          <link rel='apple-touch-icon' href='https://d11b794nw2x0wi.cloudfront.net/img/apple-touch-icon.png' />
          <link rel='preload' href='https://d11b794nw2x0wi.cloudfront.net/css/fonts.css' as='style' />
          <link rel='stylesheet' href='https://d11b794nw2x0wi.cloudfront.net/css/fonts.css' /> */}
          {this.props.styles}
        </head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }} />
          <NextScript />
        </body>
      </html>
    )
  }
}
