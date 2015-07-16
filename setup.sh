#!

echo "=====Installing Node.js, Npm, node-semver====="
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
echo "Installing Required Node Packages"
npm install
echo "Installing Forever Package"
sudo npm install forever -g
echo "Installing Required Bower Componenets"
cd bower_components
bower install
cd ..

echo "Installing Python and pip"
suao apt-get install python
sudo python get-pip.py
echo "Installing Python Packages - daemonocle"
sudo pip install daemonocle
echo "Installing Python Packages - peewee"
sudo pip install peewee
