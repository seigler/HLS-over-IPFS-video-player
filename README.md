Based heavily on the [browser video streaming](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-video-streaming) example from JS-IPFS.

## How to use

Accepts three query parameters:

- `hash`: required. The IPFS hash of a folder containing an HLS playlist and its files.
- `source`: optional, defaults to `master.m3u8`.
- `title`: optional, allows overriding the browser tab title.

Here are commands you can use to encode and upload a video to IPFS:

```
mkdir output
cd output
ffmpeg -i ../yourVideoFilename.mp4 -profile:v baseline -level 3.0 -start_number 0 -hls_time 5 -hls_list_size 0 -f hls master.m3u8
ipfs add -Qr .
```

The output from the `ipfs` command is the hash to use with this page.

Two example URLs:

http://ipfs.io/ipfs/QmQkJRPbmqcYeQcyN6mFmSYGoLWT7731GggCrTKo9tHBqF/?hash=QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K&title=Big%20Buck%20Bunny

## How to build from source

### NPM commands

- start: alias, _serve_
- serve: run & navigate to a live-build server on localhost port 8888
- build: build & output to output folder dist (overwrites, doesn't delete)
- clean: remove caches and dist folder
