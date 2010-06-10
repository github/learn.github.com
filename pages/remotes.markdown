So you've heard that Git is a **distributed** version control system.  What
does that really mean and how do you take advantage of it?

One of the cool things about Git versus centralized systems is that you can
have more than one 'server' that you can push to and pull from.  In Git, this
is called a 'remote' and you can have several of them - some of which you can
write to and others you can only read from. Here we'll really explore how to use
the concept of having remote repositories to share and collaborate on Git
projects with others.

### what is a remote? ###

A `remote` in Git is basically a way to tell Git where another version of your
repository is.  Then you can ask Git to fetch data from it that you don't have
yet, or push your commits up to it (if you have write access).  This is much like
the main Subversion server, but you can have several of them.

### adding remotes  ###

When you do a clone of a repository, Git will automatically add a remote reference
for the repository you cloned, automatically naming it 'origin'.  This is an
alias, so you don't have to type the whole URL again when getting updates from
it.  Instead you can just run `git fetch origin` (instead of
`git fetch git://server/path.git`).

	$ git clone git://github.com/schacon/grack.git
	Initialized empty Git repository in /opt/grack/.git/
	remote: Counting objects: 85, done.
	remote: Compressing objects: 100% (76/76), done.
	remote: Total 85 (delta 31), reused 0 (delta 0)
	Receiving objects: 100% (85/85), 19.89 KiB, done.
	Resolving deltas: 100% (31/31), done.
	$ cd grack
	$ git remote
	origin

If you created your repository with `git init` or would simply like to add
another remote to a repository that you cloned, you can do so with the
`git remote` command.

	$ git remote add writey git@github.com:schacon/grack.git
	$ git remote
	origin
	writey

### fetching and pulling ###

The name of the alias doesn't really matter - you can call it just about
anything you want.  Now you have an alias for that URL, so you can use it to
push to or fetch from.  For instance, in this case if someone pushed to the
URL I cloned my project from originally and I wanted to get the updates, I can
just run:

	$ git fetch origin

That will fetch down any branches on that remote repository and add bookmarks
(or `remote`)

### pushing to remotes ###

If I want to then write to my URL (which I named 'writey' when I added it),
I can run this:

	$ git push writey master

That pushes my `master` branch to the `writey` aliased server.
