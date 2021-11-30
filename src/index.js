'use strict'

import { create } from 'ipfs-core'
import Hls from 'hls.js'
import HlsjsIpfsLoader from 'hlsjs-ipfs-loader'

document.addEventListener('DOMContentLoaded', async () => {
  setBodyHeight()
  window.addEventListener('resize', setBodyHeight)
  const hash = getUrlParameter('hash')
  const source = getUrlParameter('source')
  const title = getUrlParameter('title')
  const time = getUrlParameter('time')
  setUpContextMenu() // todo move back inside if(hash)
  if (title) {
    document.title = title
  }
  if (hash) {
    document.getElementById('help').style.display = 'none'
    const video = document.getElementById('video')
    video.style.display = 'block'
    const repoPath = 'ipfs-' + Math.random()
    showStatus('Connecting to IPFS')
    const node = await create({ repo: repoPath })
    showStatus('Connected')
    Hls.DefaultConfig.loader = HlsjsIpfsLoader
    Hls.DefaultConfig.debug = false
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.config.ipfs = node
      hls.config.ipfsHash = hash
      showStatus('Video loading')
      hls.loadSource(source || 'master.m3u8')
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        showStatus('Video loaded', true)
        if (time) {
          video.currentTime = time
        }
        video.play()
      })
    }
  }

  function setUpContextMenu() {
    const video = document.getElementById('video')
    const background = document.getElementById('contextBackground')
    const menu = document.getElementById('contextMenu')
    video.oncontextmenu = e => {
      background.classList.toggle('is-hidden')
      menu.style.left = e.pageX + 'px'
      menu.style.top = e.pageY + 'px'
      e.preventDefault()
    }
    background.onClick = e => {
      e.stopPropagation()
      background.classList.toggle('is-hidden')
    }
    const url = `http://ipfsvideo.cc?hash=${
      hash
    }${
      title && '&title=' + encodeURIComponent(title)
    }${
      source && '&source=' + encodeURIComponent(source)
    }`
    document.getElementById('contextMenu-url').onClick = e => {
      e.stopPropagation()
      navigator.clipboard.writeText(url)
      background.classList.toggle('is-hidden')
    }
    document.getElementById('contextMenu-urlWithTime').onClick = e => {
      e.stopPropagation()
      navigator.clipboard.writeText(`${url}&time=${Math.round(video.currentTime)}`)
      background.classList.toggle('is-hidden')
    }
  }
})

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

function showStatus(message, hide = false) {
  const status = document.getElementById('status')
  status.classList.toggle('is-hiding', hide)
  status.innerText = message
}

function setBodyHeight() {
  document.body.style.height = window.innerHeight + 'px'
}
