while true
do
    sleep 10;
    for f in *; do
        ffmpeg -y -i "$f" -c:a copy -vn "../mp4/${f%.*}.mp4";
        mv $f ../mov
        done