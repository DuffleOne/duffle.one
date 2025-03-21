(./compile.sh)
aws s3 sync ./build s3://duffle.one --acl public-read --follow-symlinks --delete
