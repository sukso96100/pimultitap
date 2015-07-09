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

echo "Installing Python3 and pip"
suao apt-get install python3
sudo python get-pip.py
echo "Installing Python Packages - daemonocle"
sudo pip install daemonocle
echo "Installing Python Packages - pymongo"
sudo pip install pymongo
