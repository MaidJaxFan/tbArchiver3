while true
do
node index.js

if [ $? -eq 10 ]; then
    echo "Exiting because i!scheduleshutdown was used"
    break
fi
done
