(cd home && ./compile.sh)
aws s3 sync ./home/build s3://duffle.one --acl public-read --follow-symlinks --delete
# aws s3 sync ./display s3://display.duffle.one --acl public-read --follow-symlinks --delete
