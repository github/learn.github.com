### common aliases ###

#### ci ####

	$ git ci

#### git serve ####

	git config --global alias.serve 'daemon --reuseaddr --verbose  --base-path=. --export-all ./.git'

Then if you want to start up a quick git server, you can do this:

	$ touch .git/git-daemon-export-ok  
	$ git serve

Then people can clone from it

	$ git clone git://your-host-name/

### autocompletion ###



### bash branch ###



### colors ###


