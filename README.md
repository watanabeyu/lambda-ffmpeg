# lambda-ffmpeg
Create gif from .mov or .mp4 by ffmpeg, when uploaded file to s3.  
Please adjust time and memory.

## install
```
$ vi .envrc
$ direnv allow
$ tar xvf ffmpeg.3.4.1.tar.xz
$ mkdir functions/ffmpeg/bin
$ mv ffmpeg-3.4.1-64bit-static/ffmpeg functions/ffmpeg/bin/ffmpeg
$ rm -rf ffmpeg-3.4.1-64bit-static
```