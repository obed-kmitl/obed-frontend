GIT_BRANCH="main"

echo
echo "[[ Step 1: Checkout ]]"
echo
git checkout $GIT_BRANCH
git fetch
git pull

echo
echo "[[ Step 2: Build ]]"
echo
yarn install
yarn build

echo
echo "[[ Step 3: Deploy ]]"
echo
service nginx restart

echo
echo "[[ COMPLETED ]]"
echo
exit