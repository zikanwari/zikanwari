FROM jrottenberg/ffmpeg

COPY ./convert.sh /

WORKDIR /upload/temp

ENTRYPOINT [ "bash", "/convert.sh", "&& tail -f /dev/null" ]