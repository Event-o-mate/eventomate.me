# -*- mode: ruby -*-
# vi: set ft=ruby :
#
$script = <<SCRIPT
  !/usr/bin/env bash
  sudo apt-mark hold grub-pc
  
  # upgrade system
  sudo apt-get update

  # install git
  sudo apt-get -y install git

  # install ruby developer packages   
  sudo apt-get -y install make build-essential libcurl4-openssl-dev libmysqlclient-dev libreadline-dev libssl-dev libxml2-dev libxslt-dev python-dev zlib1g-dev libpq-dev 

  # install rbenv and ruby-build
  sudo -u vagrant -H git clone git://github.com/rbenv/rbenv.git /home/vagrant/.rbenv
  sudo -u vagrant echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> /home/vagrant/.profile
  sudo -u vagrant echo 'eval "$(rbenv init -)"' >> /home/vagrant/.profile
  sudo -u vagrant -H git clone git://github.com/rbenv/ruby-build.git /home/vagrant/.rbenv/plugins/ruby-build

  # no rdoc for installed gems
  sudo -u vagrant echo 'gem: --no-ri --no-rdoc' >> /home/vagrant/.gemrc

  # install required ruby versions
  sudo -u vagrant -i rbenv install 2.3.2
  sudo -u vagrant -i rbenv global 2.3.2
  sudo -u vagrant -i ruby -v

  # install bundler
  sudo -u vagrant -i gem install bundler --no-ri --no-rdoc

  # install sinatra
  sudo -u vagrant -i gem install sinatra

  # rehash rbenv
  sudo -u vagrant -i rbenv rehash

  # install thin
  sudo -u vagrant -i gem install thin

  # install ansible 
  sudo apt-get install software-properties-common
  apt-get update
  apt-get install ansible -y

  # nvaigate to app root dir
  cd `dirname $0`
  if [ ! -f db_setup.yaml ]; then
      cd /home/vagrant
      echo $0
  fi

  # run ansible playbook for db setup
  ansible-playbook db_setup.yaml --connection=local -i localhost,  
SCRIPT

$run_thin = <<SCRIPT
  # run thin as daemon after provision
  sudo -u vagrant -i thin -R /var/www/app/config.ru -p 8080 -P /var/www/app/thin/thin.pid -l /var/www/app/thin/thin.log -d start
SCRIPT

Vagrant.configure(2) do |config|
  config.ssh.forward_agent = true
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true

  if !Vagrant.has_plugin?('vagrant-hostmanager')
    puts 'Required plugin vagrant-hostmanager is not installed! Install with "vagrant plugin install vagrant-hostmanager"'
    exit
  end

  config.vm.define 'Eventomate Box' do |node|
    node.vm.box = "ubuntu/trusty64"
    node.vm.network :private_network, ip: "192.168.100.103"
    node.vm.synced_folder "./", "/var/www/app/", :mount_options => ["dmode=777", "fmode=664"]
    node.vm.hostname = 'eventomate.dev'
    node.hostmanager.aliases = %w(www.eventomate.dev eventomate.dev)
    node.vm.provision :shell, inline: $script
    node.vm.provision :shell, inline: $run_thin, run: 'always'
  end
end