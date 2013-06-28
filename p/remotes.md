---
layout: redirect
redirecturl: http://youtube.com/GitHubGuides
redirectdelay: 3000
---

<embed src="http://www.youtube.com/v/KWNIKb6sftw" type="application/x-shockwave-flash" width="790" height="430" allowscriptaccess="always" allowfullscreen="true"></embed>

So you've heard that Git is a **distributed** version control system.  What
does that really mean and how do you take advantage of it?

One of the cool things about Git versus centralized systems is that you can
have more than one 'server' that you can push to and pull from.  In Git, this
is called a 'remote' and you can have several of them - some of which you can
write to and others you can only read from. Here we'll really explore how to use
the concept of having remote repositories to share and collaborate on Git
projects with others.

### what is a remote? ###

A `remote` is basically a way to tell Git where another version of your
repository is.  You can then ask Git to fetch data from it that you don't have
yet, or push your commits up to it (if you have write access).  This is much like
the main Subversion server, but you can have several remotes.

### adding remotes  ###

When you clone a repository, Git will automatically add a remote reference
for the repository and name it 'origin'.  This is an
alias, so you don't have to type the whole URL again when getting updates from
it.  Instead, you can just run `git fetch origin` (instead of
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
`git remote add` command along with the necessary details. 

For example, we'll add a new remote named "writey" located
at "git@github.com:schacon/grack.git" and then see the list of remotes
attached to the repository.

	$ git remote add writey git@github.com:schacon/grack.git
	$ git remote
	origin
	writey
	
To see a list of all the named remotes with their corresponding URLs, 
add the `-v` flag.

	$ git remote -v	
	origin git://github.com/schacon/grack.git (fetch)
	origin git://github.com/schacon/grack.git (push)
	writey git@github.com:schacon/grack.git (fetch)
	writey git@github.com:schacon/grack.git (push)

Note that the remote aliases will be listed twice as Git allows 
you to have different push and fetch URLs per remote.

### fetching and pulling ###

The name of the alias doesn't really matter - you can call it just about
anything you want.  Now you have an alias for that URL, so you can use it to
push to or fetch from.  For instance, if someone pushed to the
URL I cloned my project from originally and I wanted to get the updates, I can
just run:

	$ git fetch origin

This will fetch any branches on that remote repository and add bookmarks of 
the remote branches at the time of synchronization. You can then merge from, 
diff or run logs on these branches.

`git pull` is a related command that will run a `git fetch` followed by a 
`git merge` and try to merge any pulled commits to the local branch you 
are currently working in.

A pull will try and merge without review, and if you're not careful, you 
may find some conflicts waiting on the other side.

### pushing to remotes ###

If I want to then write to my URL (which I named 'writey' when I added it),
I can run this:

	$ git push writey master

That pushes my `master` branch to the `writey` aliased server.
<div class="page-turns">
  <a href="branching.html" class="page-prev">&laquo; Branching and Merging</a><a href="log.html" class="page-next">Git History &raquo;</a>
</div>
