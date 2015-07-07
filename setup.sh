#!

echo "Installing Node.js"
sudo apt-get install nodejs
echo "Installing Required Node Packages"
npm install
echo "Installing Forever Package"
sudo npm install forever -g
echo "Installing Required Bower Componenets"
cd bower_components
bower install
cd ..
