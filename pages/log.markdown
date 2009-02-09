One of the most commonly used commands is the 'git log' command.  This command
shows you the commit history of your project, so you can see what has happened
up to this point.  With no options, it will start from the last commit on
the branch you're currently on and show you all the commits that are ancestors
of that in reverse chronological order.

	$ git log
	commit 166ae0c4d3f420721acbb115cc33848dfcc2121a
	Author: Scott Chacon <schacon@gmail.com>
	Date:   Sun Feb 8 16:50:43 2009 -0800

	    started write support

	commit 9fceb02d0ae598e95dc970b74767f19372d61af8
	Author: Magnus Chacon <mchacon@gmail.com>
	Date:   Sun Apr 27 20:43:35 2008 -0700

	    updated rakefile

	commit 964f16d36dfccde844893cac5b347e7b3d44abbc
	Author: Magnus Chacon <mchacon@gmail.com>
	Date:   Sun Apr 27 20:34:23 2008 -0700

	    commit the todo

There you can see three commits - each with:

* the checksum of the commit
* the author name and email
* the date the author committed it 
* the full commit message

This is the default format and the output is paged for you automatically. In 
most situations, this will be fine - you just want to see the last few commits
in the branch.  However, sometimes you want to see more interesting data, or
do some data mining, and 'git log' can do a number of interesting things.

### log output formatting ###

There are a number of other ways you can see the commit information from the
log command.

### log limiting ###

