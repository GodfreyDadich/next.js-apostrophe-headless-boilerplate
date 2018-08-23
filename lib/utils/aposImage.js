import {ASSET_CDN_DOMAIN, ASSET_ORIGIN_DOMAIN} from './constants'

export function fetchAposImage (imgObj) {
  const useCDN = (process.env.NODE_ENV === 'production')
  const domain = useCDN ? ASSET_CDN_DOMAIN : ASSET_ORIGIN_DOMAIN
  const imgPiece = imgObj.items[0]._pieces[0].item
  const imgRatio = imgPiece.attachment.crop
    ? `.${imgPiece.attachment._crop.top}.${imgPiece.attachment._crop.left}.${imgPiece.attachment._crop.width}.${imgPiece.attachment._crop.height}` : ``
  return `${domain}/attachments/${imgPiece.attachment._id}-${imgPiece.attachment.name}${imgRatio}.${imgPiece.attachment.extension}`
}
