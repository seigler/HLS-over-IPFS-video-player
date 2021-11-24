'use strict'

import { create } from 'ipfs-core'
import Hls from 'hls.js'
import HlsjsIpfsLoader from 'hlsjs-ipfs-loader'

let node

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

function showStatus(message, hide = false) {
  const status = document.getElementById('status')
  status.classList.toggle("is-hiding", hide)
  status.innerText = message
}

document.addEventListener('DOMContentLoaded', async () => {
  const hash = getUrlParameter("hash")
  const source = getUrlParameter("source") || 'master.m3u8'
  const title = getUrlParameter("title")
  if (title) {
    document.title = title
  }
  if (hash) {
    document.getElementById("help").style.display = "none"
    const video = document.getElementById('video')
    video.style.display = "block"
    const repoPath = 'ipfs-' + Math.random()
    showStatus("Connecting to IPFS")
    node = await create({ repo: repoPath })
    showStatus("Connected")
    Hls.DefaultConfig.loader = HlsjsIpfsLoader
    Hls.DefaultConfig.debug = false
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.config.ipfs = node
      hls.config.ipfsHash = hash
      showStatus("Video loading")
      hls.loadSource(source)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        showStatus("Video loaded", true)
        video.play()
      })
    }
  }
})
