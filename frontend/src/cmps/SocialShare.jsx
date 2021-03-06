import React from 'react'
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton
} from "react-share"


export const SocialShare = () => {
  const shareUrl = 'https://matchappca.herokuapp.com/#/event/'
  const title = 'Check this amazing event '
  return (

    <div className="social-share flex column space-around align-items">
      {/* <h3 className="align-self-center">Invite your friends</h3> */}
      <div className="flex space-around align-items justify-center">
        <div className="share-icon">
          <TwitterShareButton
            url={shareUrl}
            title={title}
          >
            <TwitterIcon size={50} round />
          </TwitterShareButton>
        </div>
        <div className="share-icon">
          <TelegramShareButton
            url={shareUrl}
            title={title}
          >
            <TelegramIcon size={50} round />
          </TelegramShareButton>
        </div>
        <div className="share-icon">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
          >
            <WhatsappIcon size={50} round />
          </WhatsappShareButton>
        </div>
        <div className="share-icon">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
          >
            <FacebookIcon size={50} round />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  )
}