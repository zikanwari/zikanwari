while true
do
    sleep 10;
    for f in *.mov; do
        ffmpeg -y -i "$f" -c:a copy -vn "../mp4/${f%.mov}.mp4";
        mv $f ../mov
        done
done