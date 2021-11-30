# HLS over IPFS video player

## How to use:

Accepts three query parameters:

- `hash`: required. The IPFS hash of a folder containing an HLS playlist and its files.
- `source`: optional, defaults to `master.m3u8`.
- `title`: optional, allows overriding the browser tab title.
- `time`: optional, start video at this many seconds

## Usage Examples:

- [Big Buck Bunny](https://ipfsvideo.cc/?hash=QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K&title=Big%20Buck%20Bunny)
- [What is the Royal Path? - Royal Path 001](https://ipfsvideo.cc/?hash=QmYzdc44xBkVgp8aWJW57KprjDs5j2hmN8g7eDqm5pvY8L&title=What+is+the+Royal+Path%3F+-+Royal+Path+001)

## How to make compatible videos:

Here is a Bash script you can use to encode a video into a HLS folder with a playlist:

    #!/usr/bin/env bash
    outdir=${1%.*}
    mkdir "$outdir"
    pushd "$outdir"
    ffmpeg -i "../$1" -profile:v baseline -level 3.0 -start_number 0 -hls_time 5 -hls_list_size 0 -f hls master.m3u8
    popd

(If you add that to your path as `recode-to-hls` you can convert a folder of MP4 files with the command `ls *.mp4 -1 | xargs -d "\n" -n1 recode-to-hls`.)

A folder produced this way can be posted to IPFS, and that hash is used in this page URL. Here are two hashes created following this format:

- `QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K` - Big Buck Bunny
- `QmYzdc44xBkVgp8aWJW57KprjDs5j2hmN8g7eDqm5pvY8L` - Royal Path episode 001

The output from the `ipfs` command is the hash to use with this page.

Two example URLs:

https://ipfsvideo.cc/?hash=QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K&title=Big%20Buck%20Bunny

https://ipfsvideo.cc/?hash=QmYzdc44xBkVgp8aWJW57KprjDs5j2hmN8g7eDqm5pvY8L&title=Royal+Path+001+-+What+is+the+Royal+Path%3F

## Development

### NPM commands

- start: alias, _serve_
- serve: run & navigate to a live-build server on localhost port 8888
- build: build & output to output folder dist (overwrites, doesn't delete)
- clean: remove caches and dist folder
- deploy: publish dist to GitHub Pages branch

---

Based heavily on the [browser video streaming](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-video-streaming) example from JS-IPFS.
